import React, { Component } from 'react';

import { View, Text, Alert,TouchableOpacity, Dimensions, ActivityIndicator, Vibration, Modal, FlatList, ScrollView } from 'react-native';
//Library
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';
// import RNPickerSelect from 'react-native-picker-select';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { showMessage } from "react-native-flash-message";

//Api
import HttpRequest from "../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { chargingStationInfo, chargingPointInfo } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Components
import Header from '../../components/Header';
import OTPVerify from '../../components/OTPVerify';
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

class scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            scan: false,
            scanResult: false,
            isScanning: false,

            dataAvailable: ''
        }

    }

    componentDidMount = () => {
        let { navigation } = this.props;

    }

    componentWillUnmount() {
        // this._unsubscribe();
    }

    onStart = e => {
        this.setState({ isScanning: true });
        wait(1000).then(() => this.onSuccess(e));
    }

    //When QR code is scanned
    onSuccess = (e) => {
        let { vehicle, dataAvailable } = this.state;
        //  let scannedData = e.data;

        dataAvailable = e.data;
        //console.log('Scanned QR Data: ', dataAvailable);
        this.setState({ dataAvailable: e.data });
        if (dataAvailable.includes("@")) {
             //console.log("data");
           dataAvailable= dataAvailable.split("@");
            //console.log("station",dataAvailable);
        }else if(dataAvailable.includes("*"))
        {
            dataAvailable = dataAvailable.split("*");
            console.log('*',dataAvailable);
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
                        console.log('*1',dataAvailable);
                                payLoad = {

                                    cp_name: dataAvailable[0],
                                };
                }
                else if(e.data.includes("*")){
                    console.log('*2',dataAvailable);
                    payLoad = {                
                        cp_name: dataAvailable[0],            
                    };
        
                    }
                else {
                    console.log('*3',dataAvailable);
                                payLoad = {
                                    
                                    cp_name: dataAvailable[0],

                                };
                }


            if (dataAvailable.length > 0 && dataAvailable.length == 7 || dataAvailable.length == 6) {
                payLoad = {

                    cp_name: dataAvailable[3],


                };
            }

            console.log('Request Payload: ', payLoad);

            if (dataAvailable.length > 0 && (dataAvailable.length == 6 || dataAvailable.length == 7||dataAvailable.length == 3)) {


                    this.checkRfidCard(payLoad, e);

            } else {
                console.log("data not found");

            }
        }
    }
    checkRfidCard = (payLoad, e) => {
    let{data}=this.props;
       // let { token} = this.props;
        HttpRequest.checkRfidCard(payLoad, this.props.token)
            .then(res => {
                this.setState({ isScanning: false });
                const result = res.data;
                if (res.status == 200 && !result.error) {
                    this.props.navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [
                                { name: 'Home' },
                                {
                                    name: 'rfidCard',
                                    params: {data:result.data},
                                },
                            ],
                        })
                    );
                } else {
               Alert.alert(
                         "",
                         result.message,
                         [
                             {
                                 text: "OK",
                                 onPress: () =>    this.props.navigation.goBack()
                             }
                          ],
                      )
                    console.log("RFID  API Error : ", result);
                }
            })
            .catch(err => {
                this.setState({ isLoading: false });
               // console.log("RFID CARD  API Catch Exception: ", err);

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

    navigateProfile = () => {
        this.props.navigation.navigate("MyProfile", { screen: "MyProfile", quick_charge: true })
    }

    renderResultItem = ({ item }) => {
        <TouchableOpacity activeOpacity={0.8} style={styles.resultItem} onPress={() => this.onPickerValueChange(item.value, item.key)}>
            <Text style={[styles.resultText, styles.resultName]}>ABCD</Text>
        </TouchableOpacity>
    }

    render() {
        let { navigation, info } = this.props;
        let { isLoading,  isScanning } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.rfid.title} />
                </View>

                {info.id != "38" ?
                    <Animatable.View animation="fadeInDownBig" style={styles.bodyContent}>
                        <View style={styles.body}>
                            <View style={styles.qrContainer}>
                                <View style={styles.qrView}>

                                        <QRCodeScanner

                                            onRead={this.onStart}
                                            reactivate={false}
                                            checkAndroid6Permissions={true}
                                            ref={(node) => { this.scanner = node }}
                                            fadeIn={false}
                                            vibrate={true}
                                            cameraStyle={styles.qrView}

                                        />




                                </View>
                                {isScanning &&
                                    <Text style={styles.statusText}>{strings.quickCharge.scanning}</Text>
                                }
                                <Text style={styles.statusText}>Scan the QR Code displayed on the Charger</Text>
                                <TouchableOpacity activeOpacity={1} style={styles.signInButton} onPress={() => this.goBack()}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} onPress={() => this.goBack()} style={styles.signInButton}>
                                        {isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                                            <Text style={styles.buttonText}>{strings.quickCharge.goBack}</Text>
                                        }
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </Animatable.View>
                    :
                    <OTPVerify />
                }



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

export default connect(mapStateToProps, mapDispatchToProps)(scanner);

