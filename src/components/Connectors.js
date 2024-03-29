import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image, Button, FlatList, ScrollView } from 'react-native';
//Library
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CommonActions } from '@react-navigation/native';
// import RNPickerSelect from 'react-native-picker-select';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { showMessage } from "react-native-flash-message";
import { StyleSheet, Dimensions } from "react-native";

//Api
import HttpRequest from "../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { chargingStationInfo, chargingPointInfo } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Components
import Header from '../../components/Header';

import COLORS from "../../constants/colors";
//Styles
import styles from './styles';

import { strings } from '../../utils/translations';
import { Platform } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const queryString = require('query-string');

const iconScanColor = "#fff";


const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

class quickCharge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            scan: false,
            scanResult: false,
            isScanning: false,
            add_vehicle: false,
            vehicle: '',
            refreshing: false,
            dataa:'',
            vehicle1:'',
            vehicleData: '',
            vehicles: null,
            isAndroidPickerVisible: false,
            dataAvailable: '',
            connectors:[],
            vehicle_name: ''
        }

        this.inputRefs = { vehicle: null };
    }

    componentDidMount = () => {
        let { navigation } = this.props;
        this._unsubscribe = navigation.addListener('focus', () => {
            this.pickerRef = React.createRef();
            this.vehicleDetails();
            this.setState({dataa: ''});
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    onStart = e => {
        this.setState({ isScanning: true });
        wait(2000).then(() => this.onSuccess(e));
    }

    // onPickerValueChange = (value, index) => {
    //     console.log("vehiclwww",value);
    //     if (value == null) {
    //         this.setState({ isScanning: false, vehicle: '' });
    //     } else {
    //         const { vehicle,vehicles } = this.state;

    //         if (vehicle != value && value != '') {
    //             console.log("vehiclwww",vehicles[index].model);
    //             this.setState({ vehicle: value });
    //             this.setState({ vehicle1: vehicles[index].model });
    //         }
    //         if (Platform.OS == 'android') {
    //             this.setState({ isAndroidPickerVisible: false });
    //         }
    //     }
    // }

    open() {
        if (Platform.OS == "ios") {
            this.inputRefs.vehicle.togglePicker(true);
        } else {
            this.setState({ isAndroidPickerVisible: true });
        }
    }

    //When QR code is scanned
    onSuccess = (e) => {
        let { vehicle, dataAvailable } = this.state;
        //  let scannedData = e.data;
        console.log('Scanned QR Data: ', e.data);
        dataAvailable = e.data;
        console.log('Scanned QR Data: ', dataAvailable);
        this.setState({ dataAvailable: e.data });
        if (dataAvailable.includes("@")) {
            //  console.log("data");
            dataAvailable = dataAvailable.split("@");
            //  console.log("station",dataAvailable);
        }else if(dataAvailable.includes("*"))
        {
            dataAvailable = dataAvailable.split("*");
        }
        else {
            dataAvailable = dataAvailable.split("-");
        }


        if (dataAvailable.length != 6 && dataAvailable.length != 7 && dataAvailable.length != 3) {
            console.log('Scanned Result Length: 1 ', dataAvailable.length);
            this.setState({ isScanning: false });
            showMessage({
                message: strings.quickCharge.response.error.title,
                description: strings.quickCharge.response.error.invalidQR,
                type: "danger",
            });
        } else {
            let payLoad = {};
            if (e.data.includes("@")) {
                console.log("@data");
                payLoad = {
                    cs_name: dataAvailable[0],
                    cp_name: dataAvailable[3],
                    connector_type_id: dataAvailable[4],
                    vehicle: vehicle != '' ? vehicle : '',
                    connector_id: dataAvailable[5],
                    device_status: 1,
                };
            }
        else if(e.data.includes("*")){
            payLoad = {
                cs_name: "",
                cp_name: dataAvailable[0],
                connector_type_id:dataAvailable[2],
                vehicle: vehicle != '' ? vehicle : '',
                connector_id: dataAvailable[1],
                device_status: 2,
            };

            }
            else {
                payLoad = {
                    cs_name: dataAvailable[0],
                    cp_name: dataAvailable[3],
                    connector_type_id: dataAvailable[4],
                    vehicle: vehicle != '' ? vehicle : '',
                    connector_id: dataAvailable[5],
                    device_status: 0,
                };
            }

            if (dataAvailable.length > 0 && dataAvailable.length == 7) {
                payLoad = {
                    cs_name: dataAvailable[0],
                    cp_name: dataAvailable[3],
                    connector_type_id: dataAvailable[4],
                    connector_id: dataAvailable[6],
                    vehicle: vehicle != '' ? vehicle : ''
                };
            }

            // console.log('Request Payload: ', payLoad);

            if (dataAvailable.length > 0 && (dataAvailable.length == 6 || dataAvailable.length == 7 || dataAvailable.length == 3)) {
                if (vehicle != '') {

                    this.checkConnectorAvailable(payLoad, e);
                } else {
                    this.vehicleDetails(payLoad, e);
                }
            } else {
                console.log("data not found");
                showMessage({

                    message: strings.quickCharge.response.error.title,
                    description: strings.quickCharge.response.error.invalidQR,
                    type: "danger",
                });
            }
        }
    }

    checkConnectorAvailable = (payLoad, e) => {
        let { vehicle, vehicles, dataAvailable } = this.state;
        let is_connector_available = false;
        // console.log('verify3',vehicles);
        // console.log('verify1',vehicle);
        vehicles = vehicles.filter((item) => { return item.id == vehicle });
        if (vehicles != null) {
       
            if (vehicles[0].connector.length > 0) {
                
                is_connector_available = vehicles[0].connector.filter((item, i) => {
                    console.log(dataAvailable, "scan");
                    if (dataAvailable.includes("@")) {
                        return item.id == payLoad.connector_type_id
                    }else if(dataAvailable.includes("*"))
                    {
                        return item.id == payLoad.connector_type_id
                    }
                    else {
                        return item.connector_type == payLoad.connector_type_id
                    }
                }).length > 0;



                console.log('is_connector_available....' + is_connector_available);
                if (is_connector_available) {
                    // console.log('verify');
                    this.verifyQRCode(payLoad, e);
                } else {
                    this.setState({ isScanning: false, vehicle: '' });
                    showMessage({
                        message: strings.error.title,
                        description: strings.error.connectorUnmatched,
                        type: "danger",
                    });
                }
            } else {
                this.setState({ isScanning: false, vehicle: '' });
                showMessage({
                    message: strings.error.title,
                    description: strings.error.connectorUnmatched,
                    type: "danger",
                });
            }
        }
    }
    onRefresh = () => {
        this.setState({ refreshing : true})
        wait(2000).then(() =>  this.vehicleDetails());
    }

    vehicleDetails = (payLoad = '', e = '') => {
        const vehicles = [];
        this.setState({
            isLoading: false,
            scan: false,
            scanResult: false,
            isScanning: false,
            add_vehicle: false,
            vehicle: '',
            vehicleData: '',
            connector:[]
        });
        HttpRequest.getVehicles(this.props.token)
            .then(res => {
                const result = res.data;
                // console.log("res", result);
                if (res.status == 200 && !result.error) {
                      console.log("All Vehicles  API Response ---------- ", result);
                    if (payLoad != '' && vehicle != '') {
                        this.checkConnectorAvailable(payLoad, e);
                    }
                    result.data.map((item, i) => {
                        vehicles.push({
                            key: i,
                            label: item.model,
                            value: item.id,
                            connector:item.connector 
                        });
                    });
                    console.log("All Vehicles  API Response ---------- ", result.data);
                    this.setState({ vehicleData: vehicles, vehicles: result.data, add_vehicle: false });
                } else {
                    this.setState({ add_vehicle: true })
                }
            })
            .catch(err => {
                this.setState({ add_vehicle: true });
            });
    }

    //Check if QR code is valid
    verifyQRCode = (payLoad, e) => {
        let { vehicle1 } = this.state;
        console.log(this.state.vehicle1,"vehicle1");
        let index;
        HttpRequest.checkQRcode(payLoad, this.props.token)
            .then(res => {
                this.setState({ isScanning: false });
                const result = res.data;
                // console.log("QR Code Validity Check API Response ---------- ", result);
                if (res.status == 200 && !result.error) {
                    console.log("QR Code Validity Check API Response 12345---------- ", result);
                    let charging_point = {
                        ...result.charging_point,
                        ...result.connector
                    };

                    this.props.chargingStationInfo(result.charging_station);
                    if (result.charging_point.connector.length > 0) {
                        result.charging_point.connector.filter(function (obj, i) {
                            let id = (typeof payLoad.connector_id === 'undefined') ? obj.id : payLoad.connector_id;
                            if (obj.id == id) return (index = i + 1);
                        });

                        result.charging_point.connector.filter(obj => obj.id == ((typeof payLoad.connector_id === 'undefined') ? obj.id : payLoad.connector_id)).map((sub, i) => {
                            console.log("valuepassed2");
                            const newPoint = {
                                "id": result.charging_point.id,
                                "name": result.charging_point.name,
                                "capacity": result.charging_point.capacity,
                                "unitPrice": result.charging_point.unitPrice,
                                "connector_type_id": sub.connector_id,
                                "connector_id": sub.id,
                                "connector_no": index,
                                "vehicleType": sub.vehicleType,
                                "connector_type": sub.connectorType,
                                "connectorName": sub.connectorName,
                                "connectorImage": sub.connectorImage
                            }
                            console.log("newpoint", newPoint);
                            this.props.chargingPointInfo(newPoint);
                        });

                    } else {
                        const newPoint = {
                            "id": result.charging_point.id,
                            "name": result.charging_point.name,
                            "capacity": result.charging_point.capacity,
                            "unitPrice": result.charging_point.unitPrice,
                            "connector_type_id": '',
                            "connector_id": '',
                            "connector_no": '',
                            "vehicleType": '',
                            "connector_type": '',
                            "connectorName": '',
                            "connectorImage": ''
                        }
                        this.props.chargingPointInfo(newPoint);
                    }

                    console.log("newpoint", vehicle1);
                    this.props.navigation.dispatch(
                        
                        CommonActions.reset({
                            index: 1,
                            routes: [
                                { name: 'Home' },
                                {
                                    
                                    name: 'PaymentGateway',
                                    params: { processType: 2, vehicle_id: vehicle1 },
                                },
                            ],
                        })
                    );
                    console.log("newpoint", vehicle1);
                } else {
                    console.log("QR Code Validity Check API Error : ", result);
                    showMessage({
                        message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false });
                console.log("QR Code Validity Check API Catch Exception: ", err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
    }

    goBack = () => {
        let { isScanning } = this.state;
        if (!isScanning) {
            this.props.navigation.goBack();
        } else {
            showMessage({
                message: strings.error.oops,
                description: strings.error.pleaseWait,
                type: "warning",
            });
        }

    }
    navigateToDetails = (item) => {
        
      this.setState({vehicle: item.id,vehicle1:item.model});
    
        // this.props.navigation.navigate('ChargingStationDetails',{ itemId: item.id })
   }

   WholeNews(tmp_array) {
    console.log("tmp",tmp_array);
    return tmp_array.connector.map(function(news, i){
      return(
        <View key={i}>
            <Image source={{uri:news.icon}} style={styles.image1}/>
          {/* <Text>{news.icon}</Text> */}
          
        </View>
      );
    });
  }

    getSelectedVehicle = (value) => {
        let { vehicleData } = this.state;
        let selectedVehicle =  vehicleData.find(item => item.value === value);
        return selectedVehicle != undefined ? selectedVehicle.label : strings.bookCharger.vehicleNumberPlaceholder;
    }

    // navigateProfile = () => {
    //     this.props.navigation.navigate("MyProfile", { screen: "MyProfile", quick_charge: true })
    // }

    // renderResultItem = ({ item }) => {
    //     <TouchableOpacity activeOpacity={0.8} style={styles.resultItem} onPress={() => this.onPickerValueChange(item.value, item.key)}>
    //         <Text style={[styles.resultText, styles.resultName]}>ABCD</Text>
    //     </TouchableOpacity>
    // }
   

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.navigateToDetails(item)} style={styles.item} activeOpacity={.7} >
              <Icon style={styles.icon}
                        size={20}
                        name={'radio-button-unchecked'}
                        color={'#fff'}
                        suppressHighlighting={true}
                    />
            <View style={styles.itemHeader}>
                {/* Charging Station Image & Ratings */}
                 <View style={styles.row}>
                    <Image source={{uri:item.model_icon}} style={styles.image}/>
                    <View style={styles.content}>
                        <View style={styles.row}>                
                            <Text style={[styles.text, styles.title]} numberOfLines={1}>{item.model}</Text>    
                        </View>
                        <View style={styles.row}>
                        {this.WholeNews(item)}
                        </View>
                      
                           
                       
                     </View>
                   
                </View> 
                
              
            </View>
           
        </TouchableOpacity>
    );

    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>{strings.chargingStation.response.error.message}</Text>
        </View>
    )

    render() {
        let { navigation, info } = this.props;
        let { isLoading, vehicle, isScanning, vehicleData, add_vehicle, refreshing, vehicles, dataa ,connectors} = this.state;
        // console.log(vehicle,'dataa');
        // console.log(vehicleData,'vehicleData');
        //  console.log(vehicles,'vehicles');
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.quickCharge.title} />
                </View>

                <View style={styles.container1}>
              
                { isLoading ?  
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
                   
                </View>
            </View>
        );
    }
}


const mapStateToProps = state => {

    return {
        info: state.info,
        token: state.token,
        charging_station_info: state.charging_station_info,
        charging_point_info: state.charging_point_info,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        chargingStationInfo: bindActionCreators(chargingStationInfo, dispatch),
        chargingPointInfo: bindActionCreators(chargingPointInfo, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(quickCharge);


// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors


const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: COLORS.PRIMARY
    },
    container1: {
        flex:8,
        backgroundColor: COLORS.PRIMARY,
        marginTop:5,
        //  paddingVertical: 25,
        // paddingBottom:10,
      },
    //   container2: {
    //     flex:1,
    //     backgroundColor: COLORS.PRIMARY,
    //     // paddingVertical: 25,
    //     paddingBottom:10,
    //   },
    header: {
         flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
       
    },
    image: {
        width: 120,
        height: 90,
        resizeMode: 'contain',
        borderRadius: 0,
        justifyContent: 'center'

    },
    // description: {
    //     fontSize: 12,
    //     color: COLORS.INPUT_LABEL,
    //     fontWeight: '500',
    //     paddingVertical: 5,
    // },
    image1: {
        width: 40,
        height: 30,
        resizeMode: 'contain',
        borderRadius: 30,
         marginLeft:10,
        // paddingLeft:60,
        alignSelf: 'center'
    },
    // text: {
    //     color: COLORS.DEFAULT,
    //     fontSize: 14,
    //     fontFamily: "Poppins-medium",
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
   
    title: {
        fontSize: 13,
        fontWeight: '600',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:20,
        color:"#C0C0C0"
        // backgroundColor:COLORS.HEADER_BACKGROUND,
        // borderRadius:30,
    },
    // content: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'flex-start',
    //     paddingLeft: 10
    // },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    bodyContent: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemHeader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon:{
        marginTop:25,
    },
    item: {
        flex: 1,
        height:75,
        flexDirection: 'row',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
         paddingTop: 2,
        zIndex: 998,
    },
    // qrContainer: {
    //     flex: 1,
    //     justifyContent: 'flex-start',
    //     alignItems: 'center',
    //     width: screenWidth/1.2,
    //     height: screenHeight/1.9,
    //     marginHorizontal: 20,
    //     borderRadius: 30,
    //     backgroundColor: '#fff',
    //     padding: 20,
    //     position: 'absolute',
    //     top: 50
    // },
    // 
    // permissionText: {
    //     textAlign: 'center',
    //     fontSize: 12, 
    //     alignSelf: 'center', 
    //     color: COLORS.ERROR,
    //     fontFamily: "Poppins-Regular"
    // },
    // statusText: {
    //     flex:3,
    //     height: '100%',
    //     color: COLORS.ERROR,
    //     fontSize: 16,
    //     fontFamily: "Poppins-Regular",
    //     fontWeight: '700',
    //     textAlign: 'center',
    // },
    // noDataFoundContainer: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // noDataFoundText: {
    //     color: COLORS.DEFAULT,
    //     fontSize: 14,
    //     fontFamily: "Poppins-medium",
    // },
    // addVehicleContainer: {
    //     flex: 1,
    //     backgroundColor: COLORS.HEADER_BACKGROUND, 
    //     justifyContent: 'center', 
    //     alignItems: 'center',
    // },
    // vehicleText: {
    //     color: COLORS.BLACK,
    //     fontSize: 16,
    //     padding: 20,
    //     borderRadius: 20,
    //     alignSelf: 'center',
    //     fontFamily: "Poppins-Regular",
    // },
    // signInButton: {
    //     width: screenWidth/2,
    //     height: 60,
    //     justifyContent: 'center',
    //     alignSelf: 'center',
    //     alignItems: 'center',
    //     borderRadius: 30,
    //     zIndex: 999,
    //     position: 'absolute',
    //     bottom : -10
    // },
   
    // footer: {
    //     flex: 4,
    //     backgroundColor: COLORS.HEADER_BACKGROUND,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderTopLeftRadius: 40,
    //     borderTopRightRadius: 40,
    //     paddingVertical: 50,
    //     paddingHorizontal: 30
    // },
   
    // selectBoxField: {
    //     width: screenWidth/1.1,
    //     height: 60,
    //     flexDirection: 'row',
    //     marginVertical: 20,
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     backgroundColor: COLORS.DEFAULT,
    //     color: COLORS.black,
    //     borderRadius: 30,
    // },
    // pickerContainer: {
    //     flexDirection: 'row',
    //     width: screenWidth - 40 ,
    //     height: 60,
    //     marginTop: 40,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: COLORS.DEFAULT,
    //     paddingLeft: 20,
    //     paddingRight: 20,
    //     color: COLORS.BLACK,
    //     borderRadius: 30,
    // },
    // IOS: {
    //     width: screenWidth/1.3,
    //     height: '100%',
    //     fontSize: 16,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     fontFamily: "Poppins-Regular",
    //     color: COLORS.BLACK,
    //     paddingVertical: 12,
    //     paddingHorizontal: 30,
        
    // },
    // android: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     width: screenWidth/1.3,
    //     height: '100%',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     fontSize: 16,
    //     color: COLORS.BLACK,
    //     borderRadius: 30,
    //     paddingHorizontal: 20,
    // },
    // pickerText: {
    //    // margin:10,
    //     marginTop:10,
    //     marginBottom:5,
    //     color: "#31906E",
    //     fontSize: 14,
    //     //fontWeight:'bold',
    //     // minHeight:40,
       
    //     justifyContent:'center',
    //     textAlign: 'center',
    //     fontFamily: "Poppins-Regular",
    // },
    // modalBody: {
    //     flex: 1, 
    //     alignItems: 'center', 
    //     justifyContent: 'center', 
    //     backgroundColor: 'rgba(0,0,0,0.5)'
    // },
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
    // resultItem: {
    //     padding: 15,
    //     width: '100%',
    //     borderColor: COLORS.BORDER_COLOR,
    //     borderTopWidth: 0.5,
    //     borderBottomWidth: 0.5,
    //     zIndex: 998,
    //     borderRadius: 16,
    // },
    // resultName: {
    //     fontSize: 12,
    //     fontFamily: "Poppins-medium",
    //     fontWeight: '600',
    // },
    // resultAddress: {
    //     fontSize: 12,
    //     fontFamily: "Poppins-medium",
    //     fontWeight: '500'
    // },
    // resultText: {
    //     color: COLORS.PRIMARY,
    //     fontSize: 14,
    //     fontFamily: "Poppins-medium",
    //     margin: 5
    // }, 
    // resultContainer: {
    //     flex: 1, 
    //     marginHorizontal: 10,
    //     width: '100%',
    //     position: 'absolute',
    //     height: '40%'
    // }
});