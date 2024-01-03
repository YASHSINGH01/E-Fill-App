import React, { Component } from 'react'
import { ScrollView, Text, View, Image, StyleSheet, Keyboard, Dimensions,SafeAreaView, TouchableOpacity, ActivityIndicator, Platform, Modal, FlatList } from 'react-native'
//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
// import RangeSlider from 'rn-range-slider';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import Slider from '@react-native-community/slider';
import { showMessage } from "react-native-flash-message";
//Components
import Radio from "../components/Radio";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
//Api
import HttpRequest from "../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { chargingStation, distanceInfo, filterInfo } from '../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Theme Colors
import COLORS from "../constants/colors";
import { Images } from "../constants";
//Localization
import { strings } from "../utils/translations";
//Utils
import Stars from "../utils/stars.json";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;

class FilterContent extends Component {
    constructor(props) {
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitName = this.onSubmitName.bind(this);
        this.onSubmitLocation = this.onSubmitLocation.bind(this);

        this.nameRef = this.updateRef.bind(this, 'name');
        this.locationRef = this.updateRef.bind(this, 'location');
        this.inputRefs = { picker: null }
        this.inputRefs2 = { picker: null }

        this.state = {
            isLoading: false,
            isClear: false,
            name: '',
            type: 'distance',
            location_lat: '',
            selectedItem:null,
            location_long: '',
            vehicle: '',
            marker: [],
            distance: 100,
            connector: '',
            search: '',
            isSearching: '',
            lat_filter: '',
            long_filter: '',
            rating: '',
            connectors: [],
            vehicles: [],
            image: '',
            filtered_stations: [],
            isAndroidPickerVisible1: false,
            isAndroidPickerVisible2: false
        };
    }

    componentDidMount = () => {
        this.getConnectorsList();
        // this. renderOptions();

    }


    //Get Connectors List through API
    getConnectorsList = () => {
        const connectors = [];
        HttpRequest.getConnectorsList(this.props.token)
            .then(res => {
                const result = res.data;
                //  console.log('connectors',result)
                if (res.status == 200 && !result.error) {
                    result.data.map((item, i) => {
                        connectors.push({
                            key: i,
                            label: item.connector_name + ' (' + item.connector_type + ') ',
                            value: item.connector_name,
                            image: item.icon

                        });
                    });
                    if (connectors != this.state.connectors) {
                        this.setState({ connectors: connectors});
                        // console.log('connectors', connectors);

                    }
                    if (Object.keys(this.props.formData).length > 0) {
                        this.setState({
                            name: this.props.formData.name != undefined ? this.props.formData.name : '',
                            location: this.props.formData.location != undefined ? this.props.formData.location : '',
                            vehicle: this.props.formData.vehicle_type != undefined ? this.props.formData.vehicle_type : '',
                            distance: this.props.formData.distance != undefined ? this.props.formData.distance : 0,
                            connector: this.props.formData.connector_type != undefined ? this.props.formData.connector_type : '',
                            rating: this.props.formData.rating != undefined ? this.props.formData.rating : '',
                        })
                    }

                    this.getVehiclesList();
                } else {
                    console.log("Get Connectors List API Error : ", result);
                }
            })
            .catch(err => {
                //console.log("Get Connectors List API Catch Exception: ",err);
            });
    }

    //Get Vehicle Type List through API
    getVehiclesList = () => {
        const vehicles = [];
        
        HttpRequest.getVehicleTypeList(this.props.token)
            .then(res => {
                const result = res.data;
                // console.log('vehicle.list',result);
                if (res.status == 200 && !result.error) {
                    result.data.map((item, i) => {
                        vehicles.push({
                            key: i,
                            label: item.name,
                            value: item.id,

                        });
                    })
                    if (vehicles != this.state.vehicles) {
                        this.setState({ vehicles: vehicles ,selectedItem:1});
                        // console.log('setvale',this.state.selectedItem);
                    }
                } else {
                    console.log("Get Vehicle List API Error : ", result);
                }
            })
            .catch(err => {
                //console.log("Get Vehicle List API Catch Exception: ",err);
            });
    }

    onFocus() {
        let { errors = {} } = this.state;

        for (let name in errors) {
            let ref = this[name];

            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }

        this.setState({ errors });
    }

    onChangeText(text) {
        ['name', 'location']
            .map((name) => ({ name, ref: this[name] }))
            .forEach(({ name, ref }) => {
                if (ref.isFocused()) {
                    this.setState({ [name]: text });
                }
            });
    }

    onSubmitName() {
        this.location.focus();
    }

    onSubmitLocation() {
        this.location.blur();
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    closeFilter = () => {
        this.props.closeModal();
    }

    radiusFilter = () => {
        this.props.updateRadius(this.state.location);
    }

    // onPickerValueChange = (value, index) => {
    //     const { connector } = this.state;
    //     if(connector != value && value != '') {
    //         if(Platform.OS == 'android') {
    //             this.setState({connector: value, isAndroidPickerVisible1: false});
    //         }else {
    //             this.setState({connector: value });
    //             this.inputRefs.picker.togglePicker()
    //         }
    //     }
    // }

    // onPickerValueChange2 = (value, index) => {
    //     const { vehicle } = this.state;
    //     if(vehicle != value && value != '') {
    //         if(Platform.OS == 'android') {
    //             this.setState({vehicle: value, isAndroidPickerVisible2: false});
    //         }else {
    //             this.setState({vehicle: value });
    //             this.inputRefs2.picker.togglePicker()
    //         }
    //     }
    // }

    open() {
        if (Platform.OS == "ios") {
            this.inputRefs.picker.togglePicker(true);
        } else {
            this.setState({ isAndroidPickerVisible1: true });
        }
    }

    open2() {
        if (Platform.OS == "ios") {
            this.inputRefs2.picker.togglePicker(true);
        } else {
            this.setState({ isAndroidPickerVisible2: true });
        }
    }

    handleCheckbox = (checkbox, val) => {
        // console.log(val,'value');
        // console.log(checkbox,'check');
        if (checkbox == false) {
            this.setState({ rating: '' });
        } else {
            this.setState({ rating: val });
        }


    }

    onFilter = () => {
        let { distance, connector, rating, lat_filter, long_filter, location } = this.state;
        console.log('this.state', this.state);
        let formData = {
            connector: connector,
            lat_filter: lat_filter,
            long_filter: long_filter,
            rating: rating,
            distance: distance
        }
        let radius = location == 'Near Me' ? 2500 : distance == 0 ? 550 * 1000 : distance * 1000;

        Object.keys(formData).forEach((key) => (formData[key] == null || formData[key] == ""));
        this.setState({ isLoading: true, filtered_stations: [] });
          console.log('filterstate',formData);

        this.props.filterInfo({
            long_filter: formData.long_filter,
            lat_filter: formData.lat_filter,
            distance: formData.distance,
            connector: formData.connector_type,
            rating: formData.rating,
        });
        console.log('hfhjf',this.props.filterInfo)
        if (Object.keys(formData).length != 0) {
            this.filterChargingStations(formData, radius);
        } else {
            this.onClear();
        }
    }

    //Get Charging stations List via filter parameters
    filterChargingStations = (formData, radius) => {
        let { distance, marker } = this.state;
        console.log("formData", formData,radius);

        HttpRequest.filterChargingStations(formData, this.props.token)
            .then(res => {
                const result = res.data;
                console.log("filtettr", result);
                if (res.status == 200 && !result.error) {
                    //    this.props.chargingStation(result);
                    // console.log("filter", result);
                    this.props.filterMap(5000, result, formData, this.state.lat_filter = 28.9345800, this.state.long_filter = 77.0923800);
                } else {
                    this.props.filterMap(5000, result, formData, this.state.lat_filter = 28.9345800, this.state.long_filter = 77.0923800);
                }
            })
            .catch(err => {
                console.log("Get Charging stations List API Catch Exception: ", err);
            });
    }

    onClear = () => {
        this.setState({ isClear: true });
        setTimeout(() => {
            this.setState({
                isClear: false,
                lat_filter: '',
                long_filter: '',
                vehicle: '',
                distance: 0,
                connector: '',
                rating: '',
            })
            this.props.clearModalData();
        }, 200);
    }

    nearMe = () => {
        this.setState({
            location: 'Near Me'
        });
    }

    getSelectedVehicle = (value) => {
        let { vehicles } = this.state;
        let selectedVehicle = vehicles.find(item => item.value === value);
        return selectedVehicle != undefined ? selectedVehicle.label : strings.filter.byVehicle;
    }

    getSelectedConnector = (value) => {
        let { connectors } = this.state;
        let selectedConnector = connectors.find(item => item.value === value);
        return selectedConnector != undefined ? selectedConnector.label : strings.filter.byConnector;
    }
    getSearchResults = (data, details) => {
        let { search } = this.state;
        search = search.toLowerCase();
        Keyboard.dismiss();
        this.setState({
            lat_filter: details.geometry.location.lat,
            long_filter: details.geometry.location.lng
        });
        // console.log(this.state.lat_filter,'lat');
        // console.log(this.state.long_filter,'long');
    }
    navigateToDetails = (item) => {
let{selectedItem}=this.state;
        this.setState({ connector: item.value ,selectedItem:item.key});
        console.log('select', this.state.selectedItem);
        // this.props.navigation.navigate('ChargingStationDetails',{ itemId: item.id })
    }
    // renderOptions = (item) => {
    //     let { connector, input } = this.state;
    //     console.log('options', item);
    //     // if (type == 'Amount') {
    //     return (
    //         <View style={styles.row}>
    //             {/* {
    //             connector.map((data) => { */}
    //                 return (
    //                     <TouchableOpacity onPress={() => this.navigateToDetails(item)} style={[styles.card, data.value == input ? styles.active : null]} key={data.id}>
    //                         <Text style={[styles.title, data.value == input ? styles.activeText : null]}>{data.value}</Text>
    //                     </TouchableOpacity>
    //                 )
    //             {/* }
    //             )
    //             } */}
    //         </View>
    //     )
    // }

    renderItem = ({ item }) =>
    
    (
        <View style={styles.row} >
            <TouchableOpacity onPress={() => this.navigateToDetails(item)} activeOpacity={.7} style={styles.item}>
                <View style={styles.card}>
                    <View style={this.state.selectedItem === item.key ? {
                                   height: 70,
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   backgroundColor: '#a1a1a1',
                                   borderRadius: 10,
                                   marginBottom: 0
                                } : {   width: 100,
                                    height: 70,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: COLORS.HEADER_BACKGROUND,
                                    borderRadius: 10,
                                    marginBottom: 0}}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={[styles.text, styles.title]} numberOfLines={2}>{item.label}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>

    )
    render() {
        let { isLoading, isClear, name, location, distance, vehicle, connector, rating, connectors, vehicles, isAndroidPickerVisible1, isAndroidPickerVisible2 } = this.state;
         console.log('filter',this.props);
        return (
            <SafeAreaView style={styles.content}>
                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollView}>
                    <TouchableOpacity style={styles.closeButton} onPress={this.closeFilter}>
                        <Icon name="close-circle" size={25} color="#fff" style={styles.closeIcon} />
                    </TouchableOpacity>
                    <View style={styles.header}>
                        {/* Close button */}

                        {/* Title */}
                        <Text style={styles.headerText}>{strings.filter.title}</Text>
                    </View>
                    {/* <View style={styles.body}> */}

                    <Text style={styles.label}>{strings.filter.byConnector}</Text>
                    {isLoading ?
                        <View style={styles.noDataFoundContainer}>
                            <ActivityIndicator size='large' color='#fff' />
                        </View>
                        :

                        <FlatList
                            numColumns={3}
                            data={connectors}
                            scrollEnabled={false}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.key + ""}
                        />

                    }

                    {/* </View> */}
                    {/* Search by name */}
                    {/* <View style={styles.formField}>
                            <View style={styles.inputContainer}>
                                <GooglePlacesAutocomplete
                                    placeholder="Search the Location"
                                    placeholderTextColor="#000000"
                                    autoCapitalize="none"

                                    style={{ flex: 2, paddingLeft: 0 }}
                                    query={{
                                        key: 'AIzaSyCJP5zV4FJ7Kbg7k2aH76_xOsUIqcONIcw',
                                        language: 'en',
                                    }}
                                    GooglePlacesDetailsQuery={{
                                        fields: 'geometry',
                                    }}
                                    fetchDetails={true}
                                    onPress={this.getSearchResults}
                                />
                                <Icon
                                    size={20}
                                    name={'ios-search'}
                                    color={'#05294b'}
                                />
                            </View>
                        </View> */}
                    {/* Search by Connecter Type */}
                    {/* <View style={styles.formField}> */}
                    {/* { Platform.OS == 'ios' &&
                        <View style={styles.pickerContainer} >
                            <RNPickerSelect
                                ref={el => {this.inputRefs.picker = el}}
                                style={{inputIOS: styles.IOS, inputAndroid: styles.android}}
                                placeholder={{label: strings.filter.byConnector ,value: null}}
                                onValueChange={(value, index) => this.onPickerValueChange(value, index)}
                                value={this.state.connector}
                                items={connectors}
                            />
                           
                                <TouchableOpacity activeOpacity={5} onPress={() => { this.open()}}>
                                    <Icon
                                        size={20}
                                        name={'ios-chevron-down'}
                                        color={'#05294b'}
                                    /> 
                                </TouchableOpacity>
                        </View>
                        } */}
                    {/* { Platform.OS == "android" &&
                        <TouchableOpacity style={styles.pickerContainer} activeOpacity={1} onPress={() => { this.open()}} >
                            <View style={styles.androidRow}>
                                <Text style={[styles.pickerText, this.state.connector != '' ? this.getSelectedConnector(this.state.connector) != strings.filter.byConnector ? styles.activePickerText : null : null ]}>{ this.state.connector != '' ? this.getSelectedConnector(this.state.connector)  : strings.filter.byConnector}</Text>
                                <Icon
                                    size={20}
                                    name={'ios-chevron-down'}
                                    color={'#05294b'}
                                /> 
                            </View>              
                        </TouchableOpacity>
                        } */}
                    {/* </View> */}
                    {/* { connectors != '' &&
                    <Modal animationType="fade" transparent={true} visible={isAndroidPickerVisible1} >
                        <TouchableOpacity activeOpacity={1} style={styles.modalBody} onPress={()=> this.setState({isAndroidPickerVisible1: false})}>
                            <View style={styles.modalContainer}>
                                <ScrollView vertical contentContainerStyle={styles.modalScrollView}>
                                    <View  style={[styles.resultItem, styles.resultItemBorder ]}>
                                        <Text style={[styles.resultText, styles.resultName, styles.resultPlaceholder]}>{strings.filter.byConnector}</Text>
                                    </View>
                                    {connectors.map((item, i) => (
                                        <TouchableOpacity activeOpacity={0.4} key={item.key} style={[styles.resultItem, i != connectors.length - 1 ? styles.resultItemBorder : null]} onPress={()=> this.onPickerValueChange(item.value, item.key)}>
                                            <Text style={[styles.resultText, styles.resultName]}>{item.label}</Text>
                                        </TouchableOpacity>
                                ))}
                                </ScrollView>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                    } */}

                    {/* Search by Distance range slider */}
                    <View style={styles.formField}>
                        {/* <Text style={styles.label}>{strings.filter.distance} {distance != 0 ? '( ' + distance + ' ' + strings.filter.km + ' )' : null}</Text> */}
                        {/* <View style={styles.rangeContainer}>
                            <Slider
                                style={styles.rangeSlider}
                                minimumValue={0}
                                maximumValue={150}
                                minimumTrackTintColor="#A4FF8B"
                                maximumTrackTintColor="#EFEDFB"
                                thumbTintColor="#5dda96"
                                value={parseInt(distance)}
                                onValueChange={(value) => this.setState({ distance: value.toFixed() })}
                            />
                        </View> */}
                        {/* </View> */}


                        {vehicles != '' &&
                            <Modal animationType="fade" transparent={true} visible={isAndroidPickerVisible2} >
                                <TouchableOpacity activeOpacity={1} style={styles.modalBody} onPress={() => this.setState({ isAndroidPickerVisible2: false })}>
                                    <View style={styles.modalContainer}>
                                        <ScrollView vertical contentContainerStyle={styles.modalScrollView}>
                                            <View style={[styles.resultItem, styles.resultItemBorder]}>
                                                <Text style={[styles.resultText, styles.resultName, styles.resultPlaceholder]}>{strings.filter.byVehicle}</Text>
                                            </View>
                                            {vehicles.map((item, i) => (
                                                <TouchableOpacity activeOpacity={0.4} key={item.key} style={[styles.resultItem, i != vehicles.length - 1 ? styles.resultItemBorder : null]} onPress={() => this.onPickerValueChange2(item.value, item.key)}>
                                                    <Text style={[styles.resultText, styles.resultName]}>{item.label}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </TouchableOpacity>
                            </Modal>
                        }



                        {/* Search by Ratings */}
                        <View style={[styles.formFieldd, { marginTop: 0 }]}>
                            <Text style={styles.label}>{strings.filter.rating}</Text>
                            <View style={styles.ratingContainer}>
                                {Stars.map((stars) => {
                                    return (
                                        <View style={styles.ratings} key={"" + stars.id}>
                                            <View style={styles.radioContainer}>
                                                <Radio status={this.state.rating === stars.value ? 'checked' : 'unchecked'}
                                                    circleSize={5}
                                                    onCheckBoxToggle={this.handleCheckbox}
                                                    rating={stars.value} />
                                            </View>
                                            <View style={styles.filterStarContainer}>
                                                <StarRating
                                                    disabled={true}
                                                    maxStars={5}
                                                    rating={parseInt(stars.value)}
                                                    fullStarColor={'#A4FF8B'}
                                                    emptyStarColor={'#fff'}
                                                    starSize={16}
                                                    starStyle={{ marginLeft: 15 }}
                                                />
                                            </View>
                                            <View style={styles.filterStarContainer}>
                                                <Text style={{ color: '#fff' }}>{stars.value < 5 && '& above'}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                                }
                            </View>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        {/* Apply Filter */}
                        <TouchableOpacity onPress={!isLoading ? this.onFilter : null}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                                {isLoading ? <ActivityIndicator size='large' color={COLORS.PRIMARY} /> :
                                    <Text style={styles.buttonText}>{strings.filter.applyFilter}</Text>
                                }
                            </LinearGradient>
                        </TouchableOpacity>
                        {/* Clear / Trash Button */}
                        <TouchableOpacity onPress={!isClear ? this.onClear : null}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.trashButton}>
                                {isClear ? <ActivityIndicator size='large' color={COLORS.PRIMARY} /> :
                                    <Icon
                                        size={24}
                                        name={'ios-trash-outline'}
                                        color={'#fff'}
                                    />
                                }
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        backgroundColor: COLORS.PRIMARY,
    },
    alphabetContainer: {
        width: 24,
        height: 24,
        marginLeft: 14,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
    alphabetContainerSelected: {
        width: 24,
        height: 24,
        marginLeft: 14,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    content: {
        flex: 1,
    },
    item: {
        flex: 1,
        // height:75,
        // flexDirection: 'row',
        // backgroundColor: COLORS.HEADER_BACKGROUND,
        // padding: 5,
        // marginVertical: 5,
        // marginHorizontal: 15,
        // borderRadius: 10,
    },
    image: {
        width: 30,
        height: 50,
        // marginLeft:20,

        resizeMode: 'contain',
        borderRadius: 30
    },

    noDataFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flex: 1,
        paddingLeft: 20,
        maxHeight: 30,

        //    marginTop:10,
        //    marginLeft:50,
        //    backgroundColor:COLORS.ACTIVE,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        //  marginBottom: 10,
    },
    closeButton: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    closeIcon: {
        width: 30,
        height: 30,
        // resizeMode: 'contain'
    },
    iconContainer: {

        width: 100,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        borderRadius: 10,
        marginBottom: 0
    },
    card: {
        //flex: 0.5,
        // margin:10,
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        // flex: 0.6,
        fontSize: 18,
        // marginTop:20,
        fontWeight: '600',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        color: COLORS.DEFAULT,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        // backgroundColor:COLORS.ACTIVE,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // marginBottom: 20,
        marginTop:-90,
        paddingBottom: 0
    },
    formField: {
        marginTop: -180,
        // backgroundColor:COLORS.ACTIVE,
        flex: 1,
    },
    formFieldd: {
        flex: 1,
        height: 70,
        marginTop: -90,
    },
    label: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        margin: 5,
        paddingTop: 10,
        marginLeft: 20,
    },
    inputContainer: {
        width: screenWidth - 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Platform.OS == 'ios' ? 10 : null,
        paddingHorizontal: 30,
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.BLACK,
        borderRadius: 30,
        margin: 10
    },
    rangeContainer: {
        width: screenWidth - 40,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        color: COLORS.BLACK,
    },
    rangeSlider: {
        width: '100%',
        height: 20,
    },
    inputText: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK,
        marginLeft: '2%'
    },
    pickerContainer: {
        flexDirection: 'row',
        width: screenWidth - 40,
        height: 60,
        marginTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAULT,
        paddingLeft: 20,
        paddingRight: 20,
        color: COLORS.BLACK,
        borderRadius: 30,
    },
    androidRow: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth / 1.3,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 16,
        color: COLORS.BLACK,
        borderRadius: 30,
        paddingHorizontal: 10,
    },
    pickerText: {
        color: COLORS.DISABLED,
        fontSize: 14,
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    card: {
        flex: 1,
    },
    activePickerText: {
        color: COLORS.BLACK,
    },
    IOS: {
        width: screenWidth / 1.3,
        height: '100%',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK,
        paddingVertical: 12,
        paddingHorizontal: 30,
    },
    android: {
        flex: 1,
        width: screenWidth / 1.2,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 30,
        paddingHorizontal: 30,
    },
    ratingContainer: {
        flex: 0,
        flexDirection: 'column',
        width: screenWidth - 40,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // maxHeight:120,

    },
    ratings: {
        // flex:1,
        flexDirection: 'row',
        // backgroundColor: COLORS.ERROR,
        // justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5
    },
    signInButton: {
        width: screenWidth / 1.6,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.ACTIVE,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: -27,
    },
    buttonText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    trashButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: -27
    },
    nearMe: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: COLORS.PRIMARY,
    },
    radioContainer: {
        flex: 1,
        // backgroundColor:COLORS.SUCCESS,
        justifyContent: 'flex-start'
    },
    filterStarContainer: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor:COLORS.ACTIVE,
        alignItems: 'center'
    },

    modalBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContainer: {
        width: '80%',
        height: '30%',
        marginHorizontal: '50%',
        justifyContent: 'center',
        backgroundColor: COLORS.DEFAULT,
        borderRadius: 6,
    },
    modalScrollView: {
        flexGrow: 1,
        width: '100%',
    },
    text: {
        color: COLORS.DEFAULT,
        fontSize: 10,
        fontFamily: "Poppins-medium",
        textAlign: 'center',

    },
    title: {
        fontSize: 9,
        fontWeight: 'bold'
    },
    row: {
        flex: 1,
        marginLeft: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        // display: 'flex',
        // flexWrap: 'wrap',

    },
    resultItem: {
        padding: 15,
        width: '100%',
        zIndex: 998,
    },
    resultItemBorder: {
        borderColor: COLORS.BORDER_COLOR,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderRadius: 16,
    },
    resultName: {
        fontSize: 12,
        fontFamily: "Poppins-medium",
        fontWeight: '600',
    },
    resultText: {
        color: COLORS.PRIMARY,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        margin: 5
    },
    resultPlaceholder: {
        color: COLORS.DISABLED,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        margin: 5
    },
    resultContainer: {
        flex: 1,
        marginHorizontal: 10,
        width: '100%',
        position: 'absolute',
        height: '40%'
    }
});


const mapStateToProps = state => {
    return {
        token: state.token,
        charging_stations: state.charging_stations,
        distance: state.distance,
        filter: state.filter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        chargingStation: bindActionCreators(chargingStation, dispatch),
        distanceInfo: bindActionCreators(distanceInfo, dispatch),
        filterInfo: bindActionCreators(filterInfo, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterContent);