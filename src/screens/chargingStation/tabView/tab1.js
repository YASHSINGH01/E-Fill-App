import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Platform, Linking, Modal, Dimensions, Alert } from 'react-native'
//Library
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated from 'react-native-reanimated';
import ImageView from "react-native-image-viewing";
import { showMessage } from "react-native-flash-message";
import StarRating from 'react-native-star-rating';

//Api
import HttpRequest from "../../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
// import {  } from '../../Redux/Actions/Actions
import { bindActionCreators } from 'redux';
// Theme Colors
import COLORS from "../../../constants/colors";
import { Images } from '../../../constants';
import { strings } from "../../../utils/translations";
import { Button } from 'react-native-paper';


const images = [
    Images.img1, Images.img2,
];

class tab1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            visible: false,
            points: [],
            modalVisible: false,
            index: 0,
            favorite: false,
            routes: [
                { key: 'first', title: strings.chargingStationDetails.overview },
                { key: 'second', title: strings.chargingStationDetails.review },
            ],
            details: ''
        }
    }

    componentDidMount = () => {
        this.getAvailablePoints();
        {this.props.data.isFavorite==true?this.setState({favorite:true}):this.setState({favorite:false})}
    }

    dialCall = () => {
        let { data } = this.props;
        let phoneNumber = data.phone;
        phoneNumber = phoneNumber;
        if (phoneNumber.startsWith("+")) {
            var temp = phoneNumber.substring(3, phoneNumber.length);
            phoneNumber = "0" + temp;
        }
        console.log("phone: ", phoneNumber);
        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${' + phoneNumber + '}';
        }
        else {
            phoneNumber = 'telprompt:${' + phoneNumber + '}';
        }
        //
        Linking.canOpenURL(phoneNumber)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(phoneNumber)
                        .catch(() => null);
                }
            });
    };

    sendEmail = () => {
        let { data } = this.props;

        if (data.email != '' || data.email != null) {
            Linking.openURL('mailto:' + data.email + '?subject=' + data.name + ' | Charging Station Query')
        }
    }

    navigate = () => {
        console.log("naviagte", this.props);
        let { name, lat, long, address } = this.props.data;
        const latitude = lat;
        const longitude = long;
        const label = name;
        const daddr = `${latitude},${longitude}`;
        const url = Platform.select({
            ios: `http://maps.google.com/?daddr=${daddr}&directionsmode=driving&q=${address}`,
            android: `http://maps.google.com/?daddr=${daddr}&directionsmode=driving&q=${address}`,
        });
        Linking.openURL(url);
    }

    getAvailablePoints = () => {
        let { id } = this.props.data;

        HttpRequest.getAvailablePoints({ cs_id: id }, this.props.token)
            .then(res => {
                const result = res.data;
                if (res.status == 200 && result.error == false) {
                    console.log("Available Charging Points API Response ---------- ", result.data);
                    this.setState({ points: result.data })
                } else {
                    this.setState({ points: [] })
                }
            })
            .catch(err => {
                console.log("Available Charging Points API Catch Exception: ", err);
                this.setState({ points: [] })
            });
    }

    showAvailablePoint = () => {
        this.setState({ modalVisible: true });
    }

    bookCharger = () => {
        let { data, navigation, info } = this.props;
         console.log("chargerdd",this.props);
        if (info.id != "38") {
            if (data.status == 1) {
                navigation.navigate('BookCharger', { cs_id: data.id, phone: data.phone });
            } else {
                let status = data.status == 0 ? "Deactivated" : data.status == 2 ? "busy" : "unavailable";
                Alert.alert(
                    "Unfortunately!",
                    "The charging point is currently " + status,
                    [
                        {
                            text: "OK",
                            onPress: () => console.log("Ok"),
                            style: "cancel"
                        }
                    ],
                );
            }
        } else {
            showMessage({
                message: strings.error.warningTitle,
                description: strings.error.skipLoginMessage,
                type: "danger",
            });
        }

    }
    bookcharger = (item) => {
        let { data } = this.props;
        let { navigation } = this.props;
        console.log("connector",item);
        this.setState({ modalVisible: false });
        navigation.push('booking', { charger: data, item: item });

    }
    navigateToQuickCharger = () => {
        let { navigation } = this.props;

        // console.log("navigate", navigation);
        navigation.navigate('quickCharge');
    }

    formatTime = (time = '') => {
        return time.split(':')[0] + ":" + time.split(':')[1]
    }
    addToWishlist = (item) => {
        console.log("fav",item.id)
        HttpRequest.addFavorite({ id: item.id }, this.props.token)
        .then(res => {
            const result = res.data;
             console.log("Add Favorite API Response ---------- ", result);
            if (res.status == 200 && result.error == false) {
                this.setState({
                    favorite: true
                });
                showMessage({
                    message: strings.success.title,
                    description: strings.success.favouriteList,
                    type: "success",
                });
            } else {
                console.log("Add Favorite API Error : ",result);
                showMessage({
               message: strings.error.title,
                description: result.message != undefined ? result.message : result.status,
                type: "danger",
                });
            }
        })
        .catch(err => {
            console.log("Add Favorite API Catch Exception: ",err);
            showMessage({
                message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    }

    removeFromWishlist = (item) => {
        HttpRequest.removeFavorite({ id: item.id }, this.props.token)
        .then(res => {
            const result = res.data;
             console.log("Remove Favorite API Response ---------- ", result);
            if (res.status == 200 && result.error == false) {
                this.setState({
                    favorite: false
                });
                showMessage({
                    message: strings.success.title,
                    description: strings.success.removedFavouriteList,
                    type: "success",
                });
            } else {
                //console.log("Remove Favorite API Error : ",result);
                showMessage({
               message: strings.error.title,
                description: result.message != undefined ? result.message : result.status,
                type: "danger",
                });
            }
        })
        .catch(err => {
            //console.log("Remove Favorite API Catch Exception: ",err);
            showMessage({
                message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    }
    fault = (item) => {
        let { data } = this.props;
        let { navigation } = this.props;
        console.log("connector",item);
        this.setState({ modalVisible: false });
        navigation.push('Error', { item: item });

    }


    render() {
        let { isLoading, visible, modalVisible, points,favorite} = this.state;
        let { item, data } = this.props;
         console.log( this.props,'data');
        //    console.log('item',this.props.data[1]);
          
        return (
            <ScrollView contentContainerStyle={styles.container} persistentScrollbar={true}
            showsVerticalScrollIndicator={false}>
                <View style={styles.row}>
                  <View style={styles.colLeft}>
                  { favorite  ?
                            <Icon name={"ios-heart"} size={36}   color="#F44336" onPress={() => this.removeFromWishlist(data)}/>
                            : 
                            <Icon name={'ios-heart-outline'} size={36}  color="#fff" onPress={() => this.addToWishlist(data)} />
                            }
                            </View>
                            <View style={styles.colRight}>
                                {/* <Text style={[styles.text, styles.small]}>{details.rating != "No rating yet"  ? details.rating+' '+strings.chargingStation.ratings : strings.chargingStation.noRating }</Text> */}
                                <View>
                                    { data.rating != strings.chargingStation.noRating ?
                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        rating={parseInt(data.rating)}
                                        fullStarColor={'#5dda96'}
                                        emptyStarColor={'#fff'}
                                        starSize={18}
                                    /> : null }
                                </View>
                            </View> 
                            </View> 
                <Text style={[styles.title, styles.bold]} numberOfLines={2}>{data.name}</Text>
                <View style={[styles.row, styles.divider]}>
                    <View style={styles.bodyContainer}>
                        <TouchableOpacity onPress={() => this.showAvailablePoint()} style={styles.iconView}>
                            <View style={styles.iconContainer}>
                                <Image source={Images.dob} style={styles.iconn} />
                            </View>
                            <Text style={styles.essentialsLabel}>{strings.chargingStationDetails.bookCharger}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.dialCall} style={styles.iconView}>
                        < View style={styles.iconContainer}>
                                <Image source={Images.mobile} style={styles.iconn} />
                            </View>
                            <Text style={styles.essentialsLabel}>{strings.chargingStationDetails.call}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.navigate} style={styles.iconView}>
                        <  View  style={styles.iconContainer}>
                                <Image source={Images.address} style={styles.iconn} />
                            </View>
                            <Text style={styles.essentialsLabel}>{strings.chargingStationDetails.navigate}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddReviews', { item: this.props.data })} style={styles.iconView}>
                            <View style={styles.iconContainer}>
                                <Image source={Images.star} style={styles.iconn} />
                            </View>
                            <Text style={styles.essentialsLabel}>Reviews</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.row, { justifyContent: 'flex-start', margin: 10 }]}>
                    {/* <Text style={styles.text} >{strings.chargingStationDetails.basicDetails}</Text> */}
                </View>
                <View style={styles.card}>
                    <View style={styles.row}>
                    < View style={styles.iconContainer1}>
                        <Image source={Images.price} style={styles.iconn1} />
                        </View>
                        <Text style={styles.label}>{strings.chargingStationDetails.chargingPrice} {"Rs. " + data.charging_price + "/kWh"}</Text>
                    </View>
                    {/* <View style={styles.row}>
                    < View  style={styles.iconContainer1}>
                        <Image source={Images.chargingStation} style={styles.iconn} />
                        </View>
                        <Text style={styles.label}>{strings.chargingStationDetails.Capacity} {data.charger_capacity + "kW"}</Text>
                   
                    </View> */}

                    {/* <TouchableOpacity onPress={this.dialCall} style={styles.row}>
                        <Image source={Images.mobile} style={styles.icon} />
                        <Text style={styles.label}>{data.phone}</Text>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity onPress={this.sendEmail} style={styles.row}>
                        <Image source={Images.email} style={styles.icon} />
                        <Text style={styles.label}>{data.email}</Text>
                    </TouchableOpacity> */}
                    <View style={styles.row}>
                    < View style={styles.iconContainer1}>
                        <Image source={Images.chargingHistory} style={[styles.iconn1]} />
                        </View>
                        <Text style={styles.label}>{this.formatTime(data.start_time_system) + '-' + this.formatTime(data.end_time_system)}</Text>
                 
                    </View>
                    <View style={styles.row}>
                    < View style={styles.iconContainer1}>
                        <Image source={Images.address} style={styles.iconn1} />
                        </View>
                        <Text style={styles.label} numberOfLines={2}>{data.address}</Text>
                                            </View>
                </View>
                <View style={[styles.row, { justifyContent: 'flex-start', margin: 10 }]}>
                    {/* <Text style={styles.text} >{strings.chargingStationDetails.facilities}</Text> */}
                </View>
                <View style={styles.card}>
                    <View style={[styles.row, { justifyContent: 'flex-start', }]}>
                        <Text style={styles.tex}>{strings.chargingStationDetails.services}</Text>
                        <View style={styles.bodyContainer}>
                            {data.cafe == 1 ?
                                <View style={styles.iconView}>
                                    <View style={styles.facilitiesContainer}>
                                        <Image source={Images.coffee} style={styles.imageIcon} />
                                    </View>
                                    <Text style={styles.essentialsLabel}>{strings.chargingStationDetails.coffee}</Text>
                                </View> : null}
                            {data.washroom == 1 ?
                                <View style={styles.iconView}>
                                    <View style={styles.facilitiesContainer}>
                                        <Image source={Images.toilet} style={styles.imageIcon} />
                                    </View>
                                    <Text style={styles.essentialsLabel}>{strings.chargingStationDetails.washroom}</Text>
                                </View> : null}
                            {data.WIFI = 1 ?
                                <View style={styles.iconView}>
                                    <View style={styles.facilitiesContainer}>
                                        <Image source={Images.wifi} style={styles.imageIcon} />
                                    </View>
                                    <Text style={styles.essentialsLabel}>Wifi</Text>
                                </View> : null}
                            {data.restaurant == 1 ?
                                <View style={styles.iconView}>
                                    <View style={styles.facilitiesContainer}>
                                        <Image source={Images.shop} style={styles.imageIcon} />
                                    </View>
                                    <Text style={styles.essentialsLabel}>{strings.chargingStationDetails.shops}</Text>
                                </View> : null}
                        </View>
                    </View>
                    <View style={[styles.row, { justifyContent: 'flex-start' }]}>
                        <Text style={styles.text}>{strings.chargingStationDetails.parking}</Text>
                        <View style={styles.bodyContainer}>
                            <Text style={styles.text}>{data.parking == 0 ? strings.chargingStationDetails.charges : strings.chargingStationDetails.chargesNotApplicable}</Text>
                        </View>
                    </View>
                    <View style={[styles.row, { justifyContent: 'flex-start' }]}>
                        <Text style={styles.text}>{strings.chargingStationDetails.type}</Text>
                        <View style={styles.bodyContainer}>
                            <Text style={styles.text}>{data.type}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.row, { marginBottom: 60 }]}>

                    <TouchableOpacity style={styles.signInButton} onPress={() => this.showAvailablePoint()}>
                         <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.LinearGradient}> 
                            {isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                                <Text style={styles.checkinText}>{strings.chargingStationDetails.checkIn}</Text>
                            }
                        </LinearGradient>
                    </TouchableOpacity>

                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    backdropOpacity={0.3}
                >
                    <ScrollView contentContainerStyle={styles.modalScrollView}
                     showsVerticalScrollIndicator={false}>
                        <View style={styles.modalContainer}>
                            <View style={styles.formField}>

                                <View style={styles.headerContainer}>
                                    <Text style={styles.headerTitle}>{strings.chargingStationDetails.availablePoints} {" (" + this.state.points.length + ") "}</Text>
                                    <TouchableOpacity style={styles.modalHeaderContainer} onPress={() => this.setState({ modalVisible: false })} >
                                        <Icon name="ios-close-circle" size={24} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.listContainer}>
                                    {this.state.points.length > 0 ?
                                        this.state.points.map((item, i) => {
                                            return (
                                                <View key={i} style={styles.listView} >
                                                    {item.connectorImage != '' ?
                                                        <Image source={{ uri: item.connectorImage }} style={styles.image} />
                                                        :
                                                        <Image source={Images.imagePlaceholder} style={styles.image} />
                                                    }
                                                    <Text style={styles.availableConnectorText}>{ item.connectorType +  '  ' +'(' + item.cp_power + 'kW' + ')' }</Text>
                                                    {item.connectorStatus == "Available" || item.connectorStatus == "Preparing"
                                                        ?
                                                        <Button style={styles.onlinebutton} mode="outlined" color='black' uppercase={false} onPress={() => this.bookcharger(item)}>
                                                            Book Charger
                                                        </Button>
                                                        :
                                                        item.connectorStatus == "Charging" 
                                                        ?      
                                                        <Button style={styles.busybutton} mode="outlined" color='white' uppercase={false}>
                                                        Charging {/* <Text>{ status == 2 ? strings.home.currentlyBusy : status == 3 ? strings.home.notConnected : strings.home.notConnected }</Text> */}
                                                    </Button>
                                                    :
                                                        <Button style={styles.offlinebutton} mode="outlined" color='white' uppercase={false} onPress={() => this.fault(item)}>
                                                            Unavailable
                                                        </Button>
                                                    }
                                                </View>
                                            )
                                        })

                                        :
                                        <View style={styles.listView} >
                                            <Text style={styles.availableConnectorText}>{strings.chargingStationDetails.noPointAvailable}</Text>

                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </Modal>
            </ScrollView>

        )
    }
}

// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 8,
        position: 'absolute',
        flexDirection: 'column',
        //  margin: 6,
        //  marginStart:10,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth:'100%'
    },
    colLeft: {
        flex:2, 
        margin:2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    colRight: { 
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight:-10,
        alignItems: 'center'
    },
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
        marginBottom: 3
    },
    onlinebutton: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth:'40%',
        borderColor: 'green',
        borderRadius: 5,
        shadowColor: 'green',
    },
    busybutton: {
        backgroundColor: '#DB4914',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'green',
        borderRadius: 5,
        minWidth:'41%',
        shadowColor: 'green',
    },
    offlinebutton: {
        backgroundColor: '#8b0000',
        minWidth:'40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'green',
        borderRadius: 5,
        paddingLeft:8,
        paddingRight:6,
        shadowColor: 'green',
    },
    icons: {
        width: 25,
        height: 20,
        resizeMode: 'contain',
        flex: 0.2,
    },
    text: {
        fontSize: 11,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
        fontWeight: '600',
    },
    tex: {
        marginTop: -20,
        fontSize: 10,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
        fontWeight: '600',
    },
    divider: {
        padding: 10,
        borderBottomColor: COLORS.DEFAULT,
        borderBottomWidth: 1
    },
    card: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingLeft:15,
        paddingTop:5,
        paddingBottom:5,
        marginTop:10,
        // marginLeft:5,
        // marginRight:5,
        marginBottom:0,
        backgroundColor:COLORS.HEADER_BACKGROUND,
    },
    // bodyContainer: {
    //     flex: 2,
    //     flexDirection: 'row',
    //     justifyContent: 'space-evenly',
    //     alignItems: 'center',
    //     marginVertical: 10,
    // },
    listContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginVertical: 10,
    },
    listView: {
        flex: 0.4,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 6,
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        borderRadius: 30,
        alignSelf: 'center'
    },
    availableConnector: {
        fontSize: 12,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
        flexDirection: 'row',
        textAlign: 'right',
        marginHorizontal: 10
    },
    availableConnectorText: {
        fontSize: 12,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
        fontWeight:'bold',
        flex: 1.9,
        marginHorizontal: 10
    },
    iconView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        flex: 1,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:COLORS.HEADER_BACKGROUND,
        borderRadius: 5,
        marginBottom: 0
    },
    iconContainer1: {
       
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:COLORS.PRIMARY,
        borderRadius: 5,
        marginBottom: 0
    },
    facilitiesContainer: {
        flex: 1,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 5,
        // marginBottom: 10
    },
    imageIcon: {
        height:160,
        width:20,
        resizeMode: 'contain'
        
    },
    icon: {
      
        resizeMode: 'center',
    },
    iconn: {
        width: 30,
        height: 30,
        marginLeft: 3,
        resizeMode: 'contain',
        padding:10
    },
    iconn1: {
        width: 20,
        height: 20,
        marginLeft: 3,
        resizeMode: 'contain',
        padding:10
    },
    label: {
        flex: 1,
        fontSize: 13,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
        // fontWeight:'600',
        marginLeft: 20,
    },
    essentialsLabel: {
        fontSize: 10,
        fontFamily: "Poppins-Regular",
        // fontWeight:'bold',
        color: COLORS.DEFAULT,
        textAlign: 'center',
    },
    title: {
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        color: COLORS.DEFAULT
    },
    bold: {
        fontWeight: '700'
    },
    basicButton: {
        flex: 0.5,
        alignItems: 'center',
        color: COLORS.BUTTON_TEXT,
        margin: 5,
        borderRadius: 20,
        padding: 8,
        backgroundColor: COLORS.PRIMARY
    },
    buttonText: {
        fontSize: 10,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        color: COLORS.BUTTON_TEXT
    },
    signInButton: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 20,
    },
    LinearGradient: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    checkinText: {
        color: COLORS.BLACK,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    modalScrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalContainer: {
        margin: 30,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.PRIMARY
    },
    formField: {
        width: screenWidth - 40,
        margin: 5
    },
    modalLabel: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: COLORS.PRIMARY,
        margin: 5,
        marginLeft: 15
    },
    modalHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#000',
        padding: 10
    },
    headerTitle: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,

    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chargingPointItem: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.DEFAULT,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    IconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chargingPointContent: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginLeft: 5
    },
    chargingPointTitle: {
        fontSize: 16,
        fontFamily: "Poppins-medium",
        fontWeight: '600'
    },
    chargingPointDescription: {
        fontSize: 12,
        color: COLORS.INPUT_LABEL,
        fontFamily: "Poppins-medium",
        fontWeight: '500'
    },
})

const mapStateToProps = state => {

    return {
        info: state.info,
        token: state.token,
    };
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(tab1);