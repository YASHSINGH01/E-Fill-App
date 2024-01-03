import React, { useEffect, useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Dimensions, ActivityIndicator,Alert, BackHandler, Image, AppState,Platform  } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { CommonActions } from '@react-navigation/native';
import { db } from "../../utils/FirebaseConfig";
import { showMessage } from "react-native-flash-message";
import BackgroundTimer from 'react-native-background-timer';
import moment from "moment";
import AsyncStorage from "../../utils/AsyncStorage";
//Components
import Header from '../../components/Header';
import Indicator from '../../components/SvgComponent';
//Api
import HttpRequest from "../../utils/HTTPRequest";
import { Images } from "../../constants/";
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CircularProgress } from 'react-native-svg-circular-progress';
// import CircularProgress from 'react-native-circular-progress-indicator';
//Styles
import styles from './styles';
import { strings } from '../../utils/translations';

let screenWidth = Dimensions.get('window').width;
var transaction_id_1 = 0;
var cp_id1 = "";
var charge_date1 = "";
var charge_time1 = "";
var order_id1 = "";
var connector_type_name1 = "";
var con_number1 = 0;
var intervalId;
var new_status="";
var new_connectorstatus="";

const ChargingLog = (props) => {
    const [chargingState, setChargingState] = useState({
        isLoading: false,
        isLoading1: false,
        refreshing: false,
        charging_count: 0,
        charging_details: {},
        status: true,
        statusNotification: '',
        current_meter_value_timeStamp: '',
        transaction_id: 0,
        order_id: '',
        cp_id: '',
        message:'',
        model_icon:'',
        estimated_kwh:'',
        con_number: 0,
        unit_rate: '',
        charge_time: '',
        charge_date: '',
        connector_type_name: '',
        seconds: 0,
        station_name:'',
        current_meter_value: 0,
        start_meter_value: null,
        energy_consumed: 0,
        total_amount: 0,
        car_name:'',
        charging_start_time: moment(moment(new Date()).format("HH:mm:ss"), "hh:mm:ss"),
        termination_time: '',
        payloadData: {},
        totalStopTransactions: 0,
        submit_temp_order: false,
        soc: 0,
        energy_percent:0,
        isActive: false,
        stopRequestSent: false,
        connector_status: '',
        notification: '',
        chargingAvailable: false,
        cstatus: '',
    });



    useEffect(() => {
    
        submitTempOrder();
        checkChargingStatus();
        const intervalId = setInterval(() => {
            checkChargingStatus();
            // checkvalue();
        }, 4000);

        return () => clearInterval(intervalId);
    }, []);



    const submitTempOrder = () => {
        let { item } = props.route.params;
        let payLoad = {
            id: item.id,
        };
        if (!chargingState.submit_temp_order) {
            HttpRequest.tempOrderSubmit1(payLoad)
                .then(res => {
                    // console.log("valuesmeter", res.data)
                    const result = res.data;
                    // console.log("valuesmeter", result);
                    if (res.status == 200 && !result.error) {
                        transaction_id_1 = result.transaction_id;
                        cp_id1 = result.cp_id;
                        charge_date1 = result.charge_date;
                        charge_time1 = result.charge_time;
                        order_id1 = result.order_id;
                        connector_type_name1 = result.connector_type_name;
                        con_number1 = result.con_number;
                        chargingState.submit_temp_order = true;
                        chargingState.transaction_id = result.transaction_id;
                        chargingState.cp_id = result.cp_id;
                        chargingState.con_number = result.con_number;
                        chargingState.order_id = result.order_id;
                        chargingState.unit_rate = result.unit_rate;
                        chargingState.charge_date = result.charge_date1;
                        chargingState.charge_time = result.charge_time;
                        chargingState.connector_type_name = result.connector_type_name;
                        chargingState.model_icon=result.model_icon;
                        chargingState.estimated_kwh=result.estimated_kwh;
                        chargingState.station_name=result.location_name;
                        chargingState.car_name=result.model_name;

                        // chargingState.start_meter_value = result.start_meter;
                        chargingState.cstatus = result.cstatus;
                        if (result.cstatus == 'Offline') {
                            chargingState.notification == 'Charger not Available';

                        }
                        setChargingState({ ...chargingState });
                        checkStatusNotification();
                        checkChargingStatus();
                        if (chargingState.submit_temp_order = true) {
                            // intervalPointer = setInterval(() => checkChargingStatus(), 4000)
                        }
                        checkStartTransaction();
                        checkStartMeterValues();
                        checkCurrentMeterValues1();
                        checkCurrentMeterValues();

                        checkStopTransaction_me();
                    }
                })
                .catch(err => {
                    console.log("Submit Temp Order API Catch Exception: ", err);
                });
        }
    }



    const checkChargingStatus = () => {
        let { item } = props.route.params;
        let message = '';
        if (chargingState.connector_status !== "Charging") {
            if (chargingState.submit_temp_order == true) {
                if (chargingState.booking_status == 2) {
                    chargingState.chargingAvailable = false;
                    chargingState.notification = chargingState.cancel_status;
                    setChargingState({ ...chargingState });
                }
                else {
                    var date1 = new Date();
                    // console.log(date1, "min");

                    var date2 = new Date(chargingState.charge_date);
                    date2.setHours(date2.getHours() - 5);
                    date2.setMinutes(date2.getMinutes() - 30);
                    var firstDateInSeconds = date1.getTime() / 1000;
                    var secondDateInSeconds = date2.getTime() / 1000;
                    var difference = Math.floor(secondDateInSeconds - firstDateInSeconds);
                    var minutes = Math.floor(difference / 60);
                    var hours = Math.floor(difference / (60 * 60));
                    // console.log(difference, "dif");
                    if (difference > 3600) {
                        message = "You have " + hours + " hours left to start the charging.";
                    }
                    else if (difference > 60) {
                        message = "You have " + minutes + " minutes left to start the charging.";
                    } else if (minutes < -10) {
                        message = "Sorry you couldn't start your charging on the scheduled time.Your booking has been cancelled.";
                        chargingState.chargingAvailable = false;

                        setChargingState({ ...chargingState });
                        clearInterval(intervalId);
                    }
                    else if (difference <= 0) {
                        chargingState.chargingAvailable = true;

                        setChargingState({ ...chargingState });
                        clearInterval(intervalId);

                    }
                    else {
                        message = "You have " + difference + " seconds left to start the charging. Please be prepared to start charging.";

                    }

                    chargingState.notification = message;
                    setChargingState({ ...chargingState });

                }
            }

        } else {
            chargingState.chargingAvailable = true;
            setChargingState({ ...chargingState });

        }
    }




    const checkStatusNotification = () => {
        try {
            db.ref('/EFILLXOCPP16JV1' + '/' + cp_id1 + '/StatusNotification/').orderByChild("connectorId").equalTo(con_number1).on('value', snapshot => {
                if (snapshot.val()) {
                    // console.log('Status Notification Snapshot Value: ', snapshot.val());
                    // data exist, do something else
                    let first_key = Object.keys(snapshot.val())[0];
                    let status = snapshot.val()[first_key]['status'];
                    console.log('Status Notification Snapshot Value2: ', status);
                    chargingState.connector_status = status;
                    new_connectorstatus=status;
                    console.log('checkstatus1',status)
                    chargingState.statusNotification = status;
                    new_status=status;
                    console.log('Status Notification Snapshot Value3: ', chargingState.connector_status);
                    if (chargingState.connector_status == 'Available') {
                        chargingState.connector_status = "Charger is Available";
                        new_connectorstatus="Charger is Available";
                        console.log('checkstatus1',chargingState.connector_status );
                        setChargingState({ ...chargingState });

                    }
                    if(chargingState.connector_status == 'Faulted')
                    {
                     if(snapshot.val()[first_key]['v_error_code']=='[E003]')
                     {
                        chargingState.connector_status = "Rotate emergency button clockwise";
                        new_connectorstatus="Rotate emergency button clockwise";
                        console.log('checkstatus2',chargingState.connector_status );
                        chargingState.v_error_code = "[E003]";

                        setChargingState({ ...chargingState });
                     }

                    }
                    setChargingState({ ...chargingState });
                } else {
                    console.log('Status Notification Not Found');
                }
            });

        } catch (e) {
            console.log('Exception: ', e);
        }
    }




    //Real Time Register Meter Value Check
    const checkCurrentMeterValues = () => {
        let { item } = props.route.params;
        try {
            db.ref('/EFILLXOCPP16JV1' + '/' + cp_id1 + '/MeterValues/').orderByChild("connectorId").equalTo(con_number1).on('child_changed', snapshot => {
                // console.log('abc')
                if (snapshot.val()) {
                    // console.log(snapshot.val(), 'meter valuesssss');

                    // let tid = snapshot.val()['transactionId'];
                    //
                    if (order_id1 == snapshot.val()['idtag']) {
                        // console.log('trans');
                        let meterValues = snapshot.val()['meterValue'][0]['sampledValue'];
                        let meterValueTime = snapshot.val()['meterValue'][0]['timestamp'];
                        let meter_value_time = moment.utc(meterValueTime, "YYYY-MM-DD HH:mm:ss");
                        let meter_value_date = moment(meterValueTime).format('YYYY-MM-DD');
                        let converted_meter_value_time = moment(meter_value_time.local().format('HH:mm:ss'), "hh:mm:ss");
                        let startTime = moment(charge_time1, "hh:mm:ss");
                        let charging_date = charge_date1;
                        if (chargingState.seconds = 10) {
                            var current_meter_value = meterValues.filter(function (meterValue) {
                                return meterValue.measurand == "Energy.Active.Import.Register";
                            });
                            var soc = meterValues.filter(function (meterValue) {
                                return meterValue.measurand == "SoC";
                            });

                            if (soc[0] != undefined && soc[0]['value'] != undefined) {
                                chargingState.soc = soc[0]['value'];
                                chargingState.charging_count = soc[0]['value'];
                                setChargingState({ ...chargingState });
                            }


                            if (current_meter_value[0] != undefined && current_meter_value[0]['value'] != undefined) {
                                let meter_value = current_meter_value[0]['value'];
                                if (meter_value >= chargingState.start_meter_value) {
                                    let energy_consumed = meter_value / 1000 - chargingState.start_meter_value;
                                    let total_amount = item.unit_price != undefined && item.unit_price != null ? energy_consumed * item.unit_price : 0;
                                    chargingState.current_meter_value = meter_value / 1000;
                                    chargingState.current_meter_value_timeStamp = converted_meter_value_time;
                                    chargingState.energy_consumed = energy_consumed >= 0 ? energy_consumed : 0;
                                    chargingState.total_amount = energy_consumed >= 0 ? total_amount : 0;

                                    var erg_m=current_meter_value[0]['value'];
                                    var erg_start=chargingState.start_meter_value;
                                    var erg_diff=erg_m-erg_start*1000;
                                    var erg_estimated=parseFloat(chargingState.estimated_kwh)*1000 ;
                                    var percent=0;
                                    if(erg_diff>0)
                                    {
                                percent=parseFloat(erg_diff*100)/erg_estimated;
                                    }else{

                                  percent=0;
                                    }
                                    // console.log('erg_m',erg_m);
                                    // console.log('erg_m1',erg_start);
                                    // console.log('erg_m2',erg_diff);
                                    // console.log('erg_m3',erg_estimated);



                                    chargingState.energy_percent = percent;
                                    setChargingState({ ...chargingState });
                                } else {
                                    console.log('Error: Current Meter Value is not greater than Start Transaction Meter Start Value');
                                }
                            } else {
                                console.log('Error: Energy.Active.Import.Register Meter Value Not Available');
                            }
                        }
                    }
                    else {
                        console.log('no meter value found');

                    }

                } else {
                    console.log('No Data found..');
                }
            });
        } catch (e) {
            console.log('Exception With Firebase Current Meter Value: ', e);
        }
    }


    const checkCurrentMeterValues1 = () => {
        let { item } = props.route.params;
        try {
            db.ref('/EFILLXOCPP16JV1' + '/' + cp_id1 + '/MeterValues/').orderByChild("connectorId").equalTo(con_number1).once('child_added', snapshot => {
                // console.log('abc')
                if (snapshot.val()) {
                    // console.log(snapshot.val(), 'meter valuesssss');

                    // let tid = snapshot.val()['transactionId'];
                    //
                    if (order_id1 == snapshot.val()['idtag']) {
                        // console.log('trans');
                        let meterValues = snapshot.val()['meterValue'][0]['sampledValue'];
                        let meterValueTime = snapshot.val()['meterValue'][0]['timestamp'];
                        let meter_value_time = moment.utc(meterValueTime, "YYYY-MM-DD HH:mm:ss");
                        let meter_value_date = moment(meterValueTime).format('YYYY-MM-DD');
                        let converted_meter_value_time = moment(meter_value_time.local().format('HH:mm:ss'), "hh:mm:ss");
                        let startTime = moment(charge_time1, "hh:mm:ss");
                        let charging_date = charge_date1;
                        if (chargingState.seconds = 10) {
                            var current_meter_value = meterValues.filter(function (meterValue) {
                                return meterValue.measurand == "Energy.Active.Import.Register";
                            });
                            var soc = meterValues.filter(function (meterValue) {
                                return meterValue.measurand == "SoC";
                            });

                            if (soc[0] != undefined && soc[0]['value'] != undefined) {
                                chargingState.soc = soc[0]['value'];
                                chargingState.charging_count = soc[0]['value'];
                                setChargingState({ ...chargingState });
                            }

                            if (current_meter_value[0] != undefined && current_meter_value[0]['value'] != undefined) {
                                let meter_value = current_meter_value[0]['value'];
                                if (meter_value >= chargingState.start_meter_value) {
                                    let energy_consumed = meter_value / 1000 - chargingState.start_meter_value;
                                    let total_amount = item.unit_price != undefined && item.unit_price != null ? energy_consumed * item.unit_price : 0;
                                    chargingState.current_meter_value = meter_value / 1000;
                                    chargingState.current_meter_value_timeStamp = converted_meter_value_time;
                                    chargingState.energy_consumed = energy_consumed >= 0 ? energy_consumed : 0;
                                    chargingState.total_amount = energy_consumed >= 0 ? total_amount : 0;

                                    setChargingState({ ...chargingState });
                                } else {
                                    console.log('Error: Current Meter Value is not greater than Start Transaction Meter Start Value');
                                }
                            } else {
                                console.log('Error: Energy.Active.Import.Register Meter Value Not Available');
                            }
                        }
                    }
                    else {
                        console.log('no meter value found');

                    }

                } else {
                    console.log('No Data found..');
                }
            });
        } catch (e) {
            console.log('Exception With Firebase Current Meter Value: ', e);
        }
    }

    //Real Time Start Meter Value Check
    const checkStartMeterValues = () => {
        try {
            db.ref('/EFILLXOCPP16JV1' + '/' + cp_id1 + '/StartTransaction/').orderByChild("connectorId").equalTo(con_number1).limitToLast(1).once('child_added', snapshot => {

                if (snapshot.val() && snapshot.val()['idTag'] == order_id1) {
                    let start_meter_value = snapshot.val()['meterStart'];
                    chargingState.start_meter_value = start_meter_value / 1000;
                    chargingState.connector_status = 'Charging';
                    new_connectorstatus='Charging';
                    console.log('checkstatus3',chargingState.connector_status );
                    setChargingState({ ...chargingState });
                }


            });
        } catch (e) {
            console.log('Exception With Firebase Start Transaction Meter Value: ', e);
        }
    }



    const checkStartTransaction = () => {
        try {
            db.ref('/EFILLXOCPP16JV1' + '/' + cp_id1 + '/StartTransaction/').limitToLast(1).on('child_added', snapshot => {
                if (snapshot.val() && snapshot.val()['idTag'] == order_id1) {
                    // console.log('Start Transaction Snapshot Value: ', snapshot.val());
                    chargingState.isActive = true;
                    let start_meter_value = snapshot.val()['meterStart'];
                    chargingState.start_meter_value = start_meter_value / 1000;
                    chargingState.connector_status = 'Charging';
                    new_connectorstatus='Charging';
                    console.log('checkstatus4',chargingState.connector_status );
                    setChargingState({ ...chargingState });
                } else {
                    let { item } = props.route.params;

                    // console.log('No Start Transaction Found for Transaction Id: ', item.order_id);
                }
            });
        } catch (e) {
            console.log('Exception: ', e);
        }
    }




    //Real Time Stop Transaction Check
    const checkStopTransaction_me = () => {
        try {
            db.ref('/EFILLXOCPP16JV1' + '/' + cp_id1 + '/StopTransaction/').limitToLast(1).on('child_added', snapshot => {
                if (snapshot.val() && snapshot.val()['transactionId'] == transaction_id_1) {
                    props.navigation.navigate('ChargingError',{order_id1});

                    // console.log('Stop Transaction Snapshot Value: ', transaction_id_1);
                //     if(snapshot.val() && snapshot.val()['reason']=="Reboot")
                //     {
                //    var message="Sorry, You could not complete your charging session due to some network issues.";
                //    props.navigation.navigate('ChargingError',{message});
                //     }else if(snapshot.val() && snapshot.val()['reason']=="EmergencyStop")
                    
                //     {
                //    var message="We guess you pressed emergency button. Please press it back to normal.";
                //    props.navigation.navigate('ChargingError',{message});
                //     }else if(snapshot.val() && snapshot.val()['reason']=="EVDisconnected")
                //     {
                //     var message="We guess your EV got disconnected.You can try charging again.";
                //     props.navigation.navigate('ChargingError',{message});
                //     }else if(snapshot.val() && snapshot.val()['reason']=="PowerLoss")
                //     {
                //     var message="Sorry, You could not complete your charging session due to powerloss.";
                //     props.navigation.navigate('ChargingError',{message});
                //     }else
                //     {
                //         props.navigation.navigate('Home');
                //     }
                    
                } else {
                    // let { item } = props.route.params;

                    // console.log('No Stop Transaction Found for Transaction Id new: ', transaction_id_1);
                }
            });

        } catch (e) {
            console.log('Exception: ', e);
        }
    }




    const getTransactionId = () => {
        Alert.alert(
            strings.chargingLog.areYouSure,
            strings.chargingLog.cancelMessage,
            [
                {
                    text: strings.chargingLog.no,
                    style: "cancel"
                },
                {
                    text: strings.chargingLog.yes,
                    onPress: () => {
                       sendStopTransactionRequest();

                    }
                }

            ],
        );
        // let tt=new Date();    
        // tt.setHours(tt.getHours() +5);
        // tt.setMinutes(tt.getMinutes() + 30);
       
    
        // var ch_date=new Date(chargingState.charge_date);
       
        // var firstDateInSeconds = ch_date.getTime() / 1000;
        // var secondDateInSeconds = tt.getTime() / 1000;
      
        // var difference = Math.floor(secondDateInSeconds - firstDateInSeconds);
       
        // var sec=100-difference;
        // console.log('diff',sec);
        // if(difference>100)
        // {
       
       
        //  }
        //  else{
        //     showMessage({
        //         message: "Please wait for "+sec+" Seconds",
        //         type: "danger",
        //     });
        //  }

    }




    const startTransactionRequest = () => {
        let random = Math.floor(1000000 + Math.random() * 9999999);
        const ws = new WebSocket('ws://socket.efillelectric.com/mobiletest', chargingState.protocol);
        console.log('Status Notification Matched Successfully. ');
        ws.onopen = () => {
            let payloadData = {
                "idToken": order_id1,
                "evseId": con_number1,
                "chargingPoint": cp_id1,
                "remoteStartId": order_id1,
                "scheduleId": order_id1,
            };
            // console.log(payloadData)
            let payload = [
                2, random, "RequestStartTransactionApp",
                payloadData
            ];

            console.log('Payload sent in "RequestStartTransactionApp" : ', payload);
            ws.send(JSON.stringify(payload));

            ws.onclose();
        }
        ws.onmessage = (event) => {
            console.log("Received: '" + event.data + "'");
        }
        ws.onerror = (error) => {
            console.log('Connection Error', error.message);
        }
        ws.onclose = () => {
            console.log('echo-protocol Client Closed');
        }
        chargingState.isLoading1 = true;

        setTimeout(() => {
            chargingState.isLoading1 = false;
            setChargingState({ ...chargingState });
        }, 10000);
        setChargingState({ ...chargingState });
    }



    const getTransactionIds = () => {
        if (chargingState.connector_status == 'Preparing') {
            startTransactionRequest();
        }
        else if(chargingState.connector_status == 'Rotate emergency button clockwise')
        {
if(chargingState.v_error_code=='[E003]')
{
    chargingState.connector_status = "Rotate emergency button clockwise";
    new_connectorstatus="Rotate emergency button clockwise";
    console.log('checkstatus5',chargingState.connector_status );
    setChargingState({ ...chargingState });
}
        }
        else {
            if (connector_type_name1 == "BHARAT-AC001" || connector_type_name1 == "TYPE - 1") {
                startTransactionRequest();

            }
            else {
                chargingState.connector_status = "Please connect the charging cable";
                new_connectorstatus="Please connect the charging cable";
                console.log('checkstatus6',chargingState.connector_status );
                setChargingState({ ...chargingState });

            }
        }
    }



    //Stop current Charging Transaction
    const sendStopTransactionRequest = () => {

        const ws = new WebSocket('ws://socket.efillelectric.com/mobtest');

        ws.onopen = () => {
            console.log('WebSocket Client Connected. Sending "RequestStopTransactionApp"');
            let random = Math.floor(1000000 + Math.random() * 9999999);
            let payloadData = {

                "chargingPoint": cp_id1,
                "transactionId": transaction_id_1,
            };
            let payload = [
                2, random, "RequestStopTransactionApp",
                payloadData

            ];
            // console.log('Payload sent in "RequestStopTransactionApp" : ', payload);

            ws.send(JSON.stringify(payload));
            chargingState.stopRequestSent = true;
            setChargingState({ ...chargingState });
            // ws.onclose();
            ws.close();
        }
        ws.onmessage = (event) => {
            console.log("Received: '" + event.data + "'");
        }
        ws.onerror = (error) => {
            // console.log("Error: '" + error + "'");
            // if (!chargingState.stopRequestSent) {
            //     chargingState.stopRequestSent = false;
            //     setChargingState({ ...chargingState });
            // }
        }
        ws.onclose = () => {
            console.log('echo-protocol Client Closed');
            checkStopTransaction_me();

        }
        chargingState.isLoading1 = true;

        setTimeout(() => {
            chargingState.isLoading1 = false;
            setChargingState({ ...chargingState });
        }, 10000);
        setChargingState({ ...chargingState });
    }
    console.log('checkstatus7',chargingState.connector_status);
    return (
        
        <View style={styles.container}>
            <View style={styles.header}>
                <Header navigation={props.navigation} type={strings.chargingLog.title} token={props.token} />
            </View>
            {!chargingState.isLoading ?
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>

                    <View style={styles.contentBody}>
                   {/* <View styles={{flex:2,marginTop:30}}> */}
                    <Text style={styles.text3} numberOfLines={2}>{chargingState.station_name}</Text>
                    {/* </View> */}
                        <View style={styles.iconContainer}>

                            {/* <CircularProgress
                                value={97}
                                radius={120}
                                inActiveStrokeOpacity={0.5}
                                activeStrokeWidth={15}
                                inActiveStrokeWidth={20}
                                progressValueStyle={{ fontWeight: '100', color: 'white' }}
                                activeStrokeSecondaryColor="yellow"
                                inActiveStrokeColor="black"
                                duration={5000}
                                dashedStrokeConfig={{
                                    count: 50,
                                    width: 4,
                                }}
                            /> */}
                            <CircularProgress  progressWidth={75} 
                            size={170} 
                            fillColor  ={'#05294b'}
                            blankColor={'#778899'}
                            percentage={chargingState.energy_percent}
                            >
                                <View>
                                {/* <Image source={{uri:chargingState.model_icon}} style={styles.image}/> */}
                                <Text style={[styles.text1]}>{chargingState.energy_consumed != undefined ? chargingState.energy_consumed.toFixed(2) + ' ' : '0'}</Text>

                                <Text style={[styles.text1, styles.title]} numberOfLines={1}>{strings.chargingLog.energyConsumed}(kWh)</Text>
                                </View>
                            </CircularProgress>
                            {/* <Image source={Images.battery} style={styles.iconss} /> */}
                            {/* <Indicator width={screenWidth * 0.35} height={screenWidth * 0.35} counter={chargingState.charging_count / 100} /> */}
                        </View>
                    </View>

                    {chargingState.chargingAvailable == true ?
                        <View style={styles.contentFooter}>
                            <View style={styles.row}>
                                <View style={styles.col}>

                                    {/* {!chargingState.status && <ActivityIndicator size='small' color='#fff' />}
                                    
                                    <View style={styles.roww}>
                                        <Icon name="ios-flash-sharp" size={26} color="#9dbb52" />
                                        <Text style={[styles.text]}>{chargingState.connector_status}</Text>
                                    </View> */}
                                </View>
                            </View>
                            <View style={[styles.margin1, styles.rowBackground, styles.col]}>
                            {!chargingState.status && <ActivityIndicator size='small' color='#fff' />}
                                    
                                    <View style={styles.roww1}>
                                        <Icon name="ios-flash-sharp" size={26} color="#9dbb52" styles={{marginTop:-30}}/>
                                        <Text style={[styles.text2]}>{new_connectorstatus}</Text>
                                    </View>
                                     <View  style={[styles.col,styles.row]}>
                                    <Image source={{uri:chargingState.model_icon}} style={styles.image}/>
                                    </View>
                                </View>
                            
                                   
                                   
                                

                            <View style={[styles.row, styles.box]}>
                            <View style={[styles.margin, styles.rowBackground, styles.col]}>
                                    <View style={styles.roww}>
                                        <Text style={[styles.text, styles.tittle1]} numberOfLines={2}>{strings.chargingLog.totalAmount}</Text>
                                    </View>
                                    <Text style={[styles.textt]}>{chargingState.total_amount != undefined ? chargingState.total_amount.toFixed(2) : '0.00'}</Text>
                                </View>
                                {/* <View style={[styles.margin, styles.rowBackground, styles.col]}>
                                    <View style={styles.row}>
                                        <Text style={[styles.text, styles.title]}
                                            numberOfLines={1}>
                                            Start Meter Value</Text>
                                    </View>
                                    {chargingState.start_meter_value != null ?
                                        <Text style={[styles.textt]}>


                                            {chargingState.start_meter_value}


                                        </Text>
                                        : <Text style={[styles.textt]}>{0} (kWh) </Text>
                                    }

                                </View> */}

                                <View style={[styles.margin, styles.rowBackground, styles.col]}>
                                    <View style={styles.row}>
                                        <Text style={[styles.text, styles.tittle1]} numberOfLines={1}>SOC</Text>
                                    </View>
                                    {chargingState.soc != 0 ?
                                        <Text style={styles.percentage}>{chargingState.soc} %</Text>
                                        :
                                        <Text style={[styles.textt, styles.percentage]}>N/A</Text>
                                    }
                                </View>
                            </View>


                            {/* <View style={[styles.row, styles.box]}>
                                <View style={[styles.margin, styles.rowBackground, styles.col]}>
                                    <View style={styles.row}>
                                        <Text style={[styles.text, styles.title]} numberOfLines={1}>{strings.chargingLog.energyConsumed}</Text>
                                    </View>
                                    <Text style={[styles.textt]}>{chargingState.energy_consumed != undefined ? chargingState.energy_consumed.toFixed(3) + ' (kWh)' : '0 (kWh)'}</Text>
                                </View>
                                <View style={[styles.margin, styles.rowBackground, styles.col]}>
                                    <View style={styles.row}>
                                        <Text style={[styles.text, styles.title]} numberOfLines={2}>{strings.chargingLog.totalAmount}</Text>
                                    </View>
                                    <Text style={[styles.textt]}>{chargingState.total_amount != undefined ? chargingState.total_amount.toFixed(2) : '0.00'}</Text>
                                </View>
                            </View> */}

                            <View style={styles.row}>
                                {new_status == "Charging" ?
                                    <TouchableOpacity style={styles.signInButton} onPress={() => getTransactionId()} disabled={chargingState.isLoading1}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF6A00', '#EE0979']} style={styles.linearGradient}>
                                            {chargingState.isLoading1 ? <ActivityIndicator size='large' color='#fff' /> : <Text style={styles.checkinText}>{strings.chargingLog.stopCharging}</Text>
                                            }
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    : <TouchableOpacity style={styles.signInButton} onPress={() => getTransactionIds()} disabled={chargingState.isLoading1}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.linearGradient}>
                                            {chargingState.isLoading1 ? <ActivityIndicator size='large' color='#fff' /> : <Text style={styles.checkinText}>Start Charging</Text>
                                            }
                                        </LinearGradient>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View> :
                        <View style={styles.content}>
                            <Text style={[styles.text]}>{chargingState.notification}</Text>
                        </View>
                    }
                </Animatable.View> :
                <Animatable.View animation="fadeInUpBig" style={[styles.footer, styles.alignCenter]}>
                    <ActivityIndicator size='large' color='#fff' />
                </Animatable.View>
            }
        </View>
    )
}

const mapStateToProps = state => {
    return {
        info: state.info,
        token: state.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChargingLog);