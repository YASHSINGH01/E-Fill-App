//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator, PermissionsAndroid, Platform, Alert, Linking } from 'react-native';

//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage, hideMessage } from "react-native-flash-message";
import { TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ImagePicker from 'react-native-image-picker/lib/commonjs';
import {check, request, PERMISSIONS, RESULTS, openLimitedPhotoLibraryPicker} from 'react-native-permissions';
//Api
import HttpRequest from "../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Components
import Header from '../../components/Header';
//Styles
import styles from './styles';
import { Images } from "../../constants/";
import { strings } from '../../utils/translations';
import HTTPRequest from '../../utils/HTTPRequest';

class ListCharger extends Component {
    constructor(props){
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    
        this.nameRef = this.updateRef.bind(this, 'name');
        this.addressRef = this.updateRef.bind(this, 'address');
        this.latRef = this.updateRef.bind(this, 'lat');
        this.lngRef = this.updateRef.bind(this, 'lng');
        this.powerRatingRef = this.updateRef.bind(this, 'power_rating');
        this.connectorRef = this.updateRef.bind(this, 'connector');
        this.slotsRef = this.updateRef.bind(this, 'slots');
        this.areaRef = this.updateRef.bind(this, 'area');

        this.openTimeRef = { picker: null }
        this.closedTimeRef = { picker: null }

        this.state = {
            isLoading: false,
            filepath: {
                data: '',
                uri: ''
            },
            fileData: '',
            fileUri: '',
            name: '',
            address: '',
            lat: '',
            lng: '',
            power_rating: '',
            connector: [],
            slots: '',
            area: '',
            open_time: '',
            closed_time: '',
            isOpenTimePickerVisible: false,
            isCloseTimePickerVisible: false,
            connectorTypeData: []
        };
    }

    componentDidMount = () => {
        this.getAllConnectors();
    }

    getAllConnectors = () => {
        HttpRequest.getConnectorsList(this.props.token)
        .then(res => {
            const result = res.data;
            // console.log("Get Connectors List API Response ---------- ", result);
            if (res.status == 200 && !result.error) {
              
               this.setState({ connectorTypeData: result.data });
            } else {
                console.log("Get Connectors List API Error : ",result);
            }
        })
        .catch(err => {
            console.log("Get Connectors List API Catch Exception: ",err);
        });
    }

    onSelect = (value) => {
        let { connector } = this.state;
        const index = connector.indexOf(value);
        if (index > -1) {
            connector.splice(index, 1);
        }else {
            connector.push(value);
        }
        this.setState({
            connector: connector
        });
        
    }

    formatTime = (time = '') => {
        if(time != ''){
            return ("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2)
        }else {
            return ''
        }
        
    }

    handleOpenTimeConfirm = (time) => {
        this.setState({open_time: time})
        this.hideOpenTimePicker();
    };

    hideOpenTimePicker = () => {
        this.setState({ isOpenTimePickerVisible: false});
    };

    handleCloseTimeConfirm = (time) => {
        this.setState({closed_time: time});
        console.log("Done: ");
        this.hideCloseTimePicker();
    };

    hideCloseTimePicker = () => {
        this.setState({ isCloseTimePickerVisible: false});
    };

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

    updateRef(name, ref) {
        this[name] = ref;
    }

    onChangeText(text) {
        ['name','address','lat','lng','power_rating','slots','area']
          .map((name) => ({ name, ref: this[name] }))
          .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
              this.setState({ [name]: text });
            }
          });
    }

    onSubmit = () =>  {  
        let errors = {};
  
        ['name','address','lat','lng','power_rating','connector','slots']
          .forEach((name) => {
            let value = this.state[name];
  
            if (!value) {
              errors[name] = strings.error.emptyError;
            } 
            if(name=== 'connector' && value.length == 0){
                errors[name] = strings.error.emptyError;
            }
        });
  
        this.setState({ errors });
        if(Object.entries(errors).length === 0){
          this.onSubmitted();
        }
    }

    checkPermission = async() => {
        if(Platform.OS == "android") {
            const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{ title: 'We need your permission' },);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the camera');
                    this.chooseImage();
                } else {
                    console.log('Camera permission denied');
                }
        } else {
            check(PERMISSIONS.IOS.CAMERA)
            .then((result) => {
                switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log('This feature is not available (on this device / in this context)');
                    break;
                case RESULTS.DENIED:
                    console.log('The permission has not been requested / is denied but requestable');
                    this.requestPermissionIOS();
                    break;
                case RESULTS.LIMITED:
                    console.log('The permission is limited: some actions are possible');
                    break;
                case RESULTS.GRANTED:
                    console.log('The permission is granted');
                    this.chooseImage();
                    break;
                case RESULTS.BLOCKED:
                    console.log('The permission is denied and not requestable anymore.');
                    Alert.alert(
                        'Permission Denied!',
                        'Please make sure you have turned on the permission for camera.',
                        [
                            {
                                text: "No",
                                onPress: () =>   {}
                            },
                            {   
                                text: "Ok", 
                                onPress: () =>  {
                                    Linking.openSettings();
                                }
                            }
                        ]
                      );
                    break;
                }
            })
            .catch((error) => {
                console.log('Something Went Wrong. '+error);
            });
           
        }     
    }

    requestPermissionIOS = () => {
        request([PERMISSIONS.IOS.CAMERA]).then((statuses) => {
            console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);

            switch (statuses) {
                case RESULTS.UNAVAILABLE:
                  console.log('This feature is not available (on this device / in this context)');
                  break;
                case RESULTS.DENIED:
                  console.log('The permission has not been requested / is denied but requestable');
                  break;
                case RESULTS.LIMITED:
                  console.log('The permission is limited: some actions are possible');
                  break;
                case RESULTS.GRANTED:
                  console.log('The permission is granted');
                  this.chooseImage();
                  break;
                case RESULTS.BLOCKED:
                  console.log('The permission is denied and not requestable anymore');
                  break;
            }
        });
    }

    chooseImage = () => {
        let options = {
            title: 'You can choose one image',
            mediaType: 'photo',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }  else {
                const source = { uri: response.uri };
                    
                this.setState({
                    filePath: response,
                    fileData: 'data:image/jpeg;base64,' + response.data,
                    fileUri: response.uri
                });
            }
          });
    }
  
    // Add a charger
    onSubmitted = () => {
        this.setState({ isLoading: true });
        let { name, address, lat, lng, power_rating, connector, slots, area, open_time, closed_time, fileData } = this.state;

        HttpRequest.listACharger({company_name: name, address: address, latitude: lat, longitude: lng, power_rating: power_rating , connector_id: JSON.stringify(connector), no_of_slots: slots, media: fileData, area: area, open_time: this.formatTime(open_time), close_time: this.formatTime(closed_time) }, this.props.token)
            .then(res => {
               
                const result = res.data;
                if (res.status == 200 && result.error == false) {
                    // console.log("Add a charger API Response ---------- ", result.data);
                    showMessage({
                        message: strings.listCharger.response.success.title,
                        description: strings.listCharger.response.success.message,
                        type: "success"
                    });
                    this.props.navigation.goBack();
                } else {
                    console.log("Add a charger API Error : ",result);
                    showMessage({
                        message: strings.error.title,
                        description: strings.listCharger.response.error.message,
                        type: "danger",
                    });
                }
                this.setState({ isLoading: false });
            })
            .catch(err => {
                this.setState({ isLoading: false });
                console.log("Add a charger API Catch Exception: ",err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
    }

    render() {
   // console.log("image",item.icon);
        let { navigation } =  this.props
        let { isLoading, errors = {}, connectorTypeData, name, address, lat, lng, power_rating, connector, slots, area, open_time, closed_time, fileUri, isOpenTimePickerVisible, isCloseTimePickerVisible } = this.state;
    
        const errorName = errors.name == undefined ? '#DCDCDC' : '#ff0000';
        const errorAddress = errors.address == undefined ? '#DCDCDC' : '#ff0000';
        const errorLatitude = errors.lat == undefined ? '#DCDCDC' : '#ff0000';
        const errorLongitude = errors.lng == undefined ? '#DCDCDC' : '#ff0000';
        const errorPowerRating = errors.power_rating == undefined ? '#DCDCDC' : '#ff0000';
        const errorConnector = errors.connector == undefined ? '#DCDCDC' : '#ff0000';
        const errorSlots = errors.slots == undefined ? '#DCDCDC' : '#ff0000';

        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                    <Header navigation={navigation} type={strings.listCharger.title}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} contentContainerStyle={styles.scrollView}>
                        <View style={styles.row}>
                            <TextInput
                                ref={ref => this.nameRef=ref}
                                label={strings.listCharger.companyName}
                                mode='outlined'
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                text='#DCDCDC'
                                editable={true}
                                onChangeText={(text) => this.setState({ name: text })}
                                onFocus={this.onFocus}
                                value={name}
                                underlineColor='transparent'
                                theme={{ 
                                    colors: { 
                                        placeholder: errorName, 
                                        text: '#DCDCDC', 
                                        primary:'#DCDCDC', 
                                        underlineColor:'transparent',
                                        background : '#05294b',
                                    }
                                }}
                                style={styles.input}
                            />
                        </View>
                        {errors.name != undefined &&
                            <Text style={styles.error}>{errors.name}</Text>
                        }
                        <View style={styles.row}>
                            <TextInput
                                ref={this.addressRef}
                                label={strings.listCharger.address}
                                mode='outlined'
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                text='#DCDCDC'
                                editable={true}
                                onChangeText={(text) => this.setState({ address: text })}
                                value={address}
                                underlineColor='transparent'
                                theme={{ 
                                    colors: { 
                                    placeholder: errorAddress, 
                                    text: '#DCDCDC', 
                                   primary:'#DCDCDC', 
                                    underlineColor:'transparent',
                                    background : '#05294b',
                                
                                    }
                                }}
                               style={styles.input}
                            />
                        </View>
                        {errors.address != undefined &&
                            <Text style={styles.error}>{errors.address}</Text>
                        }
                        <View style={styles.row}>
                            <TextInput
                                ref={this.latRef}
                                label={strings.listCharger.latitude}
                                mode='outlined'
                                keyboardType="numeric"
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                text='#DCDCDC'
                                editable={true}
                                onChangeText={(text) => this.setState({ lat: text })}
                                value={lat}
                                underlineColor='transparent'
                                theme={{ 
                                    colors: { 
                                    placeholder: errorLatitude, 
                                    text: '#DCDCDC', 
                                    primary: errorLatitude,
                                    underlineColor:'transparent',
                                    background : '#05294b',
                                
                                    }
                                }}
                                style={{ flex: 1, borderRadius: 30,  margin: '2%',  }}
                            />
                            <TextInput
                                ref={this.lngRef}
                                label={strings.listCharger.longitude}
                                mode='outlined'
                                keyboardType="numeric"
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                text='#DCDCDC'
                                editable={true}
                                onChangeText={(text) => this.setState({ lng: text })}
                                value={lng}
                                underlineColor='transparent'
                                theme={{ 
                                    colors: { 
                                    placeholder: errorLongitude, 
                                    text: '#DCDCDC', 
                                    primary: errorLongitude,
                                    underlineColor:'transparent',
                                    background : '#05294b',
                                
                                    }
                                }}
                                style={{flex: 1, borderRadius: 30, margin: '2%',  }}
                            />
                        </View>
                        <View style={styles.row}>
                            <TextInput
                                ref={this.powerRatingRef}
                                label={strings.listCharger.powerRating}
                                mode='outlined'
                                keyboardType="numeric"
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                text='#DCDCDC'
                                editable={true}
                                onChangeText={(text) => this.setState({ power_rating: text })}
                                value={power_rating}
                                underlineColor='transparent'
                                theme={{ 
                                    colors: { 
                                    placeholder: errorPowerRating, 
                                    text: '#DCDCDC', 
                                    primary: errorPowerRating,
                                    underlineColor:'transparent',
                                    background : '#05294b',
                                
                                    }
                                }}
                               style={styles.input}
                            />
                        </View>
                        {errors.power_rating != undefined &&
                            <Text style={styles.error}>{errors.power_rating}</Text>
                        }
                        <View style={styles.formField}>
                            <Text style={styles.label}>{strings.listCharger.connectors}</Text>
                            <View style={styles.connectorContainer}>
                                <FlatList
                                    data={connectorTypeData}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => this.onSelect(item.id)} style={[styles.iconView, , connector.some(val => item.id === val) ? styles.active : styles.inactive]}>
                                            <Image source={{ uri: HTTPRequest.liveImageUrl+''+item.icon}} style={[styles.imageIcon]}/>
                                            <Text style={[styles.connectorLabel]}>{item.connector_name}</Text>
                                        </TouchableOpacity>
                                    )}
                                    //Setting the number of column
                                    numColumns={5}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </View>
                        {errors.connector != undefined &&
                            <Text style={styles.error}>{errors.connector}</Text>
                        }
                        <View style={styles.row}>
                            <TextInput
                                ref={this.slotsRef}
                                label={strings.listCharger.slots}
                                mode='outlined'
                                keyboardType="numeric"
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                text='#DCDCDC'
                                editable={true}
                                onChangeText={(text) => this.setState({ slots: text })}
                                value={slots}
                                underlineColor='transparent'
                                theme={{ 
                                    colors: { 
                                    placeholder: errorSlots, 
                                    text: '#DCDCDC', 
                                    primary: errorSlots,
                                    underlineColor:'transparent',
                                    background : '#05294b',
                                
                                    }
                                }}
                               style={styles.input}
                            />
                        </View>
                        {errors.slots != undefined &&
                            <Text style={styles.error}>{errors.slots}</Text>
                        }
                        <TouchableOpacity onPress={this.checkPermission} style={styles.connectorContainer}>
                        { fileUri != '' ?
                        <View style={styles.imageContent}>
                            <Image
                                source={{ uri: fileUri }}
                                style={styles.imagePreview}
                                resizeMode='contain'
                            />
                        </View>
                        : 
                        <View style={[styles.imageContent, styles.imageContentBackground]}>
                           <Icon size={36} name={'ios-image-outline'} color={'#DCDCDC'} /> 
                            <Text style={{ color: '#DCDCDC', fontSize: 16, margin: '2%'}}>{strings.listCharger.imageUpload}</Text>
                        </View>
                        } 
                        </TouchableOpacity>

                        <View style={styles.row}>
                            <TextInput
                                ref={this.areaRef}
                                label={strings.listCharger.area}
                                mode='outlined'
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                text='#DCDCDC'
                                editable={true}
                                onChangeText={(text) => this.setState({ area: text })}
                                value={area}
                                underlineColor='transparent'
                                theme={{
                                        colors: { 
                                            placeholder: '#DCDCDC', 
                                            text: '#DCDCDC', 
                                            primary: '#DCDCDC',
                                            underlineColor:'transparent',
                                            background : '#05294b',
                                        
                                            }
                                    }}
                               style={styles.input}
                            />
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity activeOpacity={5}  onPress={() => { this.setState({ isOpenTimePickerVisible: true })}} style={styles.input}>
                                <TextInput
                                    label={strings.listCharger.openTime}
                                    mode='outlined'
                                    underlineColorAndroid={'rgba(0,0,0,0)'}
                                    text='#DCDCDC'
                                    editable={false}
                                    onPressIn={() => { this.setState({ isOpenTimePickerVisible: true })}}
                                    value={this.formatTime(open_time)}
                                    underlineColor='transparent'
                                    theme={{
                                        colors: { 
                                            placeholder: '#DCDCDC', 
                                            text: '#DCDCDC', 
                                            primary: '#DCDCDC',
                                            underlineColor:'transparent',
                                            background : '#05294b',
                                        
                                            }
                                    }}
                                    style={styles.input}
                                />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isOpenTimePickerVisible}
                                mode="time"
                                headerTextIOS={strings.listCharger.openTime}
                                onConfirm={this.handleOpenTimeConfirm}
                                onCancel={this.hideOpenTimePicker}
                            />
                            
                            <TouchableOpacity activeOpacity={5}  onPress={() => { this.setState({ isCloseTimePickerVisible: true })}} style={styles.input}>
                            <TextInput
                                label={strings.listCharger.closeTime}
                                mode='outlined'
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                text='#DCDCDC'
                                editable={false}
                                onPressIn={() => { this.setState({ isCloseTimePickerVisible: true })}}
                                value={this.formatTime(closed_time)}
                                underlineColor='transparent'
                                theme={{
                                        colors: { 
                                            placeholder: '#DCDCDC', 
                                            text: '#DCDCDC', 
                                            primary: '#DCDCDC',
                                            underlineColor:'transparent',
                                            background : '#05294b',
                                        
                                            }
                                    }}
                                style={styles.input}
                            />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isCloseTimePickerVisible}
                                mode="time"
                                headerTextIOS={strings.listCharger.closeTime}
                                onConfirm={this.handleCloseTimeConfirm}
                                onCancel={this.hideCloseTimePicker}
                            />
                        </View>
                       
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                            <TouchableOpacity onPress={!isLoading ? this.onSubmit : null } style={styles.signInButton}>
                            
                                { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                                    <Text style={styles.buttonText}>{strings.listCharger.submit}</Text>
                                } 
                                
                            </TouchableOpacity> 
                        </LinearGradient> 
                    </KeyboardAwareScrollView>
                </Animatable.View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    
    return {
      token: state.token,
    };
};
  
  
const mapDispatchToProps = (dispatch) => {
      return bindActionCreators({}, dispatch);
}
  
export default connect(mapStateToProps,mapDispatchToProps)(ListCharger);
