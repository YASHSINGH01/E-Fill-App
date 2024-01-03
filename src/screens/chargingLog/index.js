//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, ActivityIndicator, BackHandler, Platform, AppState } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { CommonActions } from '@react-navigation/native';
import {db} from "../../utils/FirebaseConfig";
import { showMessage } from "react-native-flash-message";
import BackgroundTimer from 'react-native-background-timer';
import moment from "moment";
import AsyncStorage from "../../utils/AsyncStorage";
//Components
import Header from '../../components/Header';
import Indicator from '../../components/SvgComponent';
//Api
import HttpRequest from "../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
// import {  } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Styles
import styles from './styles';
import { strings } from '../../utils/translations';

let screenWidth = Dimensions.get('window').width;

class ChargingLog extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            refreshing: false,
            charging_count: 0,
            charging_details: {},
            charging_status: 0,
            status: true,
            statusNotification: '',
            transactionId: '',
            seconds: 0,
            current_meter_value: 0,
            start_meter_value: 0,
            energy_consumed: 0,
            total_amount: 0,
            charging_start_time: '',
            termination_time: '',
            payloadData: {},
            transaction_id: '',
            totalStopTransactions: 0,
            submit_temp_order: false
        };

        this.meterValueRef = db.ref(props.route.params.historyData.data.protocol == 'ocpp2.0' ? '/EFILLXOCPP20' : '/EFILLXOCPP16JV1' +'/'+props.route.params.historyData.data.connector_point_name +'/MeterValues/');

        this.startMeterValueRef = db.ref(props.route.params.historyData.data.protocol == 'ocpp2.0' ? '/EFILLXOCPP20' : '/EFILLXOCPP16JV1' +'/'+props.route.params.historyData.data.connector_point_name +'/StartTransaction/');

        this.statusNotificationRef = db.ref(props.route.params.historyData.data.protocol == 'ocpp2.0' ? '/EFILLXOCPP20' : '/EFILLXOCPP16JV1' +'/'+props.route.params.historyData.data.connector_point_name +'/StatusNotification/');

        this.stopTransactionRef = db.ref(props.route.params.historyData.data.protocol == 'ocpp2.0' ? '/EFILLXOCPP20' : '/EFILLXOCPP16JV1' +'/'+props.route.params.historyData.data.connector_point_name +'/StopTransaction/');

        this.stopTransactionLastRef = db.ref(props.route.params.historyData.data.protocol == 'ocpp2.0' ? '/EFILLXOCPP20' : '/EFILLXOCPP16JV1' +'/'+props.route.params.historyData.data.connector_point_name +'/StopTransaction/');
    }

    _interval;

    componentDidMount = () => {
        this._checkStatus = this.props.navigation.addListener('focus', () => {
            if (Platform.OS =="ios") {
                BackgroundTimer.start();
            }  
            this.submitTempOrder();
            this.checkStatusNotification(this.statusNotificationRef);
            this.checkCurrentMeterValues(this.meterValueRef, this.stopTransactionLastRef);
            this.checkStartMeterValues(this.startMeterValueRef);
            // this.checkStopTransactionTotalRecord(this.stopTransactionLastRef);
          
            this._retrieveAsyncData();
          
        });
        
        //Add Back Button Press Listener
        BackHandler.addEventListener('hardwareBackPress',this.onBackPress);
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount = () => {
        //Remove Back Button Press Listener
        this.statusNotificationRef.off();
        this.meterValueRef.off();
        this.stopTransactionRef.off();
        BackgroundTimer.clearInterval(this._interval);
        BackHandler.removeEventListener('hardwareBackPress',this.onBackPress);
        AppState.removeEventListener('change', this.handleAppStateChange);
        this._checkStatus();
    }

    _storeAsyncData = async (value) => {
        try {
          await AsyncStorage.setChargingLogInfo(value);
        } catch (e) {
          // saving error
          console.log("Async Saving Error: ", e)
        }
    }

    _retrieveAsyncData = async () => {
        try {
            await AsyncStorage.getChargingLogInfo().then(val => {
                if(JSON.parse(val) != null){
                    let value = JSON.parse(val);
                    console.log("log",value);
                     console.log("log1",value.payloadData.chargingPoint);
                                           console.log("log2",this.props.route.params.payloadData.chargingPoint);
                                           console.log("log3",value.payloadData.scheduleId);
                                           console.log("log4",this.props.route.params.payloadData.scheduleId);
                    if(value.payloadData.chargingPoint ==  this.props.route.params.payloadData.chargingPoint && value.payloadData.scheduleId == this.props.route.params.payloadData.scheduleId){

                        var today = new Date();

                        let current_time = ("0" + today.getHours()).slice(-2) + ':' + ("0" + today.getMinutes()).slice(-2) + ':' + ("0" + today.getSeconds()).slice(-2);
                        let charging_start = JSON.parse(val).charging_start_time;
    
                        let moment_right_now = moment(current_time, "hh:mm:ss");
                        let moment_start_charging = moment(charging_start, "hh:mm:ss");
                       
                        let timeDifference  = moment_right_now.diff(moment_start_charging, 'seconds');
    
                        this.setState(JSON.parse(val));
                        
                        this._updateSeconds(timeDifference);
                    } 
                }
            });
        } catch(e) {
            // Error reading value
            console.log("Async Reading Value Error: ", e);
        }
    }

    handleAppStateChange = (nextAppState) => {
    console.log("test");
        if (nextAppState != 'active') {

            var today = new Date();
            let current_time = ("0" + today.getHours()).slice(-2) + ':' + ("0" + today.getMinutes()).slice(-2) + ':' + ("0" + today.getSeconds()).slice(-2);
                
            this.setState({ termination_time: current_time, payloadData: this.props.route.params.payloadData, charging_details: this.props.route.params.historyData.data});
            
            this._storeAsyncData(this.state);
        } else {
            var today = new Date();

            let current_time = ("0" + today.getHours()).slice(-2) + ':' + ("0" + today.getMinutes()).slice(-2) + ':' + ("0" + today.getSeconds()).slice(-2);
            let charging_start =  this.state.charging_start_time

            let moment_right_now = moment(current_time, "hh:mm:ss");
            let moment_start_charging = moment(charging_start, "hh:mm:ss");
                   
            let timeDifference  = moment_right_now.diff(moment_start_charging, 'seconds');
          
            this._updateSeconds(timeDifference);
        } 
    }

    _updateSeconds = (seconds) => {
        AsyncStorage.setChargingLogInfo(null);
     
        this.setState({ seconds: seconds});
    }

    //Real Time Status Notification Check
    checkStatusNotification = (statusNotificationRef) => {
        let { historyData } =  this.props.route.params;
        try {
            statusNotificationRef.orderByChild("connectorId").equalTo(historyData.data.connector_no).on('child_changed', snapshot => { //child_changed
                if (snapshot.val()) {
                    // data exist, do something else
                    let first_key = Object.keys(snapshot.val())[0];
                    let status = snapshot.val()[first_key]['status'];

                    var today = new Date();
                        console.log('Status Notification From Charger: ', status);
                        if(status != 'Charging' && this.state.statusNotification == 'Charging'){
                            console.log('status != Charging && this.state.statusNotification == Charging : ', status);
                            //Charging was in progress previously
                            this.getTransactionId();
                        } else if(status != 'Charging' && this.state.statusNotification == '' ){
                            //Charing was never started and still in preparing 
                            console.log('Status Notification: ', status);
                        } else if (status == 'Charging'){
                            //If Status is Charging
                            

                            this.setState({ statusNotification: 'Charging' });

                            if (Platform.OS =="ios") {
                                BackgroundTimer.start();
                            }

                            this._interval = BackgroundTimer.setInterval(() => {
                            
                                    if(!this.state.status) {
                                        this.setState({ 
                                            charging_count: this.state.charging_count,
                                            seconds: this.state.seconds
                                        })
                                        BackgroundTimer.clearInterval(this._interval);
                                    } else {
                                        var today = new Date();
                                        let current_time = ("0" + today.getHours()).slice(-2) + ':' + ("0" + today.getMinutes()).slice(-2) + ':' + ("0" + today.getSeconds()).slice(-2);
                    
                                        let current         = moment(current_time, "hh:mm:ss"); //Current Time
                                        let endTime         = moment(this.props.route.params.historyData.data.end_time, "hh:mm:ss"); //End Time

                                        if(endTime.isSame(current) && this.state.status){
                                            this.getTransactionId();
                                        }else{
                                            if(this.state.charging_count < 100){
            
                                                let startTime       = moment(this.props.route.params.historyData.data.charge_time, "hh:mm:ss"); //Start Time
                                                let endTime         = moment(this.props.route.params.historyData.data.end_time, "hh:mm:ss"); //End Time
                                                let timeDifference  = endTime.diff(startTime, 'seconds');
                                        
                                                let charge_count = (100 * (this.state.seconds + 1))/timeDifference;
                                                
                                                this.setState({ 
                                                    charging_count: Math.floor(charge_count),
                                                    seconds: this.state.seconds + 1,
                                                    charging_start_time: this.state.charging_start_time == '' ? current_time : this.state.charging_start_time
                                                });
                                            } else if(this.state.charging_count >= 100 && endTime.isSameOrAfter(current)){
                                                this.getTransactionId();
                                            }
                                        }
                                    } 
                            
                            }, 1000);
                            return () => {
                                BackgroundTimer.clearInterval(this._interval);
                            };
                        } else {
                            showMessage({
                                message: strings.error.title,
                                description: strings.chargingLog.faulted,
                                type: "warning",
                            });
                            var today = new Date();
                            let current_time = ("0" + today.getHours()).slice(-2) + ':' + ("0" + today.getMinutes()).slice(-2) + ':' + ("0" + today.getSeconds()).slice(-2);
                                
                            this.setState({ termination_time: current_time, payloadData: this.props.route.params.payloadData, charging_details: this.props.route.params.historyData.data});
                            
                            this._storeAsyncData(this.state);
                        }
                }else {
                    console.log('Status Notification Not Found');
                }
            });
        } catch(e) {
            console.log('Exception: ', e);
        }
    }

    //Real Time Register Meter Value Check
    checkCurrentMeterValues = (meterValueRef, stopTransactionLastRef) => {
        let { historyData } =  this.props.route.params;
        try {
            meterValueRef.orderByChild("connectorId").equalTo(historyData.data.connector_no).on('value', snapshot => {
                if (snapshot.val()) {
                    // data exist, do something else
                    let first_key                  = Object.keys(snapshot.val())[0];
                    let meterValues                = snapshot.val()[first_key]['meterValue'][0]['sampledValue'];
                    let meterValueTime             = snapshot.val()[first_key]['meterValue'][0]['timestamp'];
                    let converted_meter_value_time = moment(meterValueTime).format('HH:mm:ss');
                    let startTime                  = moment(historyData.data.charge_time, "hh:mm:ss");            //Start Time
                    let meter_value_date           = moment(meterValueTime).format('YYYY-MM-DD');
                    let charging_date              = historyData.data.charge_date;

                    // console.log('Current meter value date is same as charging date:  ', moment(meter_value_date).isSame(charging_date));
                    // console.log('Current meter value time is same or after as charging start time:  ', moment(converted_meter_value_time, "hh:mm:ss").isSameOrAfter(startTime));

                    // console.log('Current meter value timestamp:  ', moment(converted_meter_value_time, "hh:mm:ss"));
                    // console.log('Charging Start timestamp:  ',startTime);

                    // console.log('Current meter value Formatted time:  ', converted_meter_value_time);
                    // console.log('Charging Start Formatted time:  ', moment(startTime).format('HH:mm:ss'));

                    if(moment(meter_value_date).isSame(charging_date) && moment(converted_meter_value_time, "hh:mm:ss").isSameOrAfter(startTime)){

                        var current_meter_value =  meterValues.filter(function(meterValue) {
                            return meterValue.measurand == "Energy.Active.Import.Register";
                        });
    
                        try {
                            if(current_meter_value[0] != undefined){
                                if(current_meter_value[0]['value'] != undefined) {
                                    let meter_value               = current_meter_value[0]['value'];
                                    let previous_meter_stop_value = 0;
                                    
                                    stopTransactionLastRef.once('value', snapshot => {
                                        if (snapshot.val()) {
                                            // data exist, do something else
                                            let key = Object.keys(snapshot.val());
                                            let last_key = Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 1];
                                            previous_meter_stop_value = snapshot.val()[last_key]['meterStop'];
                                        }else {
                                            previous_meter_stop_value = null;
                                        }
                                    });
    
                                    if(meter_value >= this.state.start_meter_value) {
                                        //Current Meter Value is greater than Start Transaction Meter Start Value
                                        if(previous_meter_stop_value == 0 || previous_meter_stop_value == null ){
                                            //This is the first start transaction i.e., no previous meter stop record found
                                            let energy_consumed =  meter_value/1000 - this.state.start_meter_value;
    
                                            let total_amount = historyData.data.unit_price != undefined && historyData.data.unit_price != null ? energy_consumed * historyData.data.unit_price : 0 ;

                                            // console.log("Energy consumed meter Value: ", energy_consumed);
                                            // console.log("Energy consumed meter Value: ", energy_consumed >= 0 ? energy_consumed : 0);
    
                                            this.setState({ 
                                                current_meter_value: meter_value/1000, 
                                                energy_consumed: energy_consumed >= 0 ? energy_consumed : 0,
                                                total_amount: energy_consumed >= 0 ? total_amount : 0,
                                            });
                                        }else {
                                            //This is not the first start transaction i.e., previous meter stop record found
                                            if((previous_meter_stop_value < meter_value && previous_meter_stop_value != 0)){
                                                let energy_consumed =  meter_value/1000 - this.state.start_meter_value;

                                                //console.log("Energy consumed meter Value 2: ", energy_consumed);
        
                                                let total_amount = historyData.data.unit_price != undefined && historyData.data.unit_price != null ? energy_consumed * historyData.data.unit_price : 0 ;
        
                                                this.setState({ 
                                                    current_meter_value: meter_value/1000, 
                                                    energy_consumed: energy_consumed >= 0 ? energy_consumed : 0,
                                                    total_amount: energy_consumed >= 0 ? total_amount : 0,
                                                });
                                            }
                                        }
                                    }
                                } else {
                                    // console.log('current_meter_value getting updated', current_meter_value);
                                }
                            }
                        } catch(e) {
                            console.log('Exception With Firebase Current Meter Value: ', e);
                        }
                    }
                   
                }
            });
        } catch(e) {
            console.log('Exception With Firebase Current Meter Value: ', e);
        }
    }

    //Real Time Start Meter Value Check
    checkStartMeterValues = (startMeterValueRef) => {
        let { historyData } =  this.props.route.params;
        try {
            startMeterValueRef.orderByChild("connectorId").equalTo(historyData.data.connector_no).on('value', snapshot => {
                if (snapshot.val()) {
                    
                    // data exist, do something else
                    let last_key          = Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 1];
                    let start_meter_value = snapshot.val()[last_key]['meterStart'];
                   // console.log('start_meter_value Meter Value: ', start_meter_value);

                    this.setState({ start_meter_value: start_meter_value/1000 });
                }
            });
        } catch(e) {
            console.log('Exception With Firebase Start Transaction Meter Value: ', e);
        }
    }

    //Once Stop Transaction Value Check
    checkStopTransactionTotalRecord = (stopTransactionLastRef) => {
        let { historyData } =  this.props.route.params;
        try {
            stopTransactionLastRef.once('value', snapshot => {
                if (snapshot.val()) {
                    // data exist, do something else
                    let key = Object.keys(snapshot.val());
                    let totalRecords = Object.keys(snapshot.val()).length ;
                    this.setState({
                        totalStopTransactions: totalRecords
                    });
                   
                }
            });
        } catch(e) {
            console.log('Exception With Firebase Start Transaction Meter Value: ', e);
        }
    }

    onBackPress = () => {
        return true;
    };

    secondsToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let time = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" +  + ("0" + seconds).slice(-2)
        return time;
    }

    setProgress = () => {
        let { charging_count } = this.state;
        // console.log('Charging Count: ', charging_count);
        let amt = charging_count;
        amt = (amt < 0) ? 0 : (amt > 1) ? 1 : amt;
        if(charging_count*100 == 100){
            this.setState({ 
                charging_count: 0
            });
        }
        this.setState({ 
            charging_count: charging_count + 0.01
        });
    }

    getTransactionId = () => {
        let { status, charging_status } = this.state;
        let { details, payloadData, historyData } =  this.props.route.params;
        if(status != false) {
            if((details != '' || details != undefined )) {
                HttpRequest.getTransactionId({ connector_type_id: payloadData.evseId, cp_name: payloadData.chargingPoint, remoteStartId: payloadData.remoteStartId }, this.props.token)
                .then(res => {
                    const result = res.data;
                    if (res.status == 200 && !result.error) {
                        // if(result.transaction_id != 0){
                        if(payloadData.transaction_id != 0){
                            payloadData.transactionId = result.transaction_id; 
                            this.setState({ transactionId: result.transaction_id});
                            //Allow user to Stop the transaction 
                            this.sendStopTransactionRequest(details, payloadData, historyData );
                        }else {
                            showMessage({
                                message: strings.error.title,
                                description: result.message != undefined ? result.message : result.status,
                                type: "warning",
                            });
                        }
                    } else {
                        console.log("Get Transaction Id API Catch Exception: ",result);
                        showMessage({
                        message: strings.error.title,
                            description: result.message != undefined ? result.message : result.status,
                            type: "warning",
                        });
                    }
                })
                .catch(err => {
                    //console.log("Get Transaction Id API Catch Exception: ",err);
                    showMessage({
                        message: strings.error.oops,
                        description: strings.error.transactionDetailsError,
                        type: "warning",
                    });
                });
            } else {
                showMessage({
                    message: strings.error.oops,
                    description: strings.error.transactionDetailsError,
                    type: "warning",
                });
            }
        }
    }

    //Stop current Charging Transaction 
    sendStopTransactionRequest = (details, payloadData, historyData) => {
        
        const ws = new WebSocket('ws://cms.efillelectric.com:6002/EFILLXOCPP16J/STINT-EF-STOP-001', details.protocol);
        
        ws.onopen = () => {
            // console.log('WebSocket Client Connected. Sending "RequestStopTransactionApp"');
            let random = Math.floor(1000000 + Math.random() * 9999999); // Transaction Id added into STOP payload
                
            let payload = [
                2, random , "RequestStopTransactionApp",
                payloadData
            ];
                
            //console.log('Payload sent in "RequestStopTransactionApp" : ', payload);
                
            ws.send(JSON.stringify(payload));
            ws.onclose();
                
            // console.log('WebSocket Client Disconnected.');

            this.setState({ transaction_id: payloadData.transaction_id, status : false });  
            this.checkStopTransaction(this.stopTransactionRef);         
        }
        ws.onmessage = (event) => { 
            console.log("Received: '" + event.data + "'");
        }
        ws.onerror = (error) => { 
            console.log('Connection Error', error);
        }
        ws.onclose = () => {
            console.log('echo-protocol Client Closed');
        }
    }

    checkStopTransaction = (stopTransactionRef) => {
        let { details, payloadData, historyData } =  this.props.route.params;
        let { transactionId } = this.state;
        try {
            stopTransactionRef.orderByChild("transactionId").equalTo(transactionId).on('value', snapshot => {
                if (snapshot.val()) {
                    // if((this.state.totalStopTransactions != 0 && Object.keys(snapshot.val()).length > this.state.totalStopTransactions) || (this.state.totalStopTransactions == 0 && Object.keys(snapshot.val()).length == 1 && transactionId != '')) {
                        // data exist, and transaction id also exist
                        this.submitOrder(details, historyData, payloadData);
                    // }
                }
            });
        } catch(e) {
            console.log('Exception: ', e);
        }
    }

    //Submit Order on Successful Charging
    submitOrder = (details, historyData, payloadData) => {
        let { status, charging_status } = this.state;
        let { info } = this.props;
        let payLoad = {};
        if(info.role == '2'){
            payLoad = {
                transaction_id: payloadData.transactionId,
                cs_id: details.charging_station_id,
                cp_name: details.connector_point_name,
                connector_id: details.connector_type_id,
                vehicle_id: details.vehicleId,
            }
        }else {
            payLoad = {
                order_id: historyData.data.order_id,
                transaction_id: payloadData.transactionId,
                cs_id: details.charging_station_id,
                cp_name: details.connector_point_name,
                connector_id: details.connector_type_id,
                vehicle_id: details.vehicleId,
                total_amount: historyData.data.total_amount,
            }
        }

        AsyncStorage.setChargingLogInfo(null);

        if(charging_status == 0){
            HttpRequest.orderSubmit(payLoad,this.props.token, info.role)
            .then(res => {
                const result = res.data;
                if (res.status == 200 && !result.error ) {

                    BackgroundTimer.clearInterval(this._interval);

                    this.setState({ charging_status : 1});

                    this.props.navigation.dispatch(
                        CommonActions.reset({
                        index: 1,
                        routes: [
                            { name: 'Home' },
                            { name: 'OrderHistory'},
                        ],
                        })
                    ); 
                
                } else {
                    console.log("Submit Order  API Error : ",result);
                        
                    var today = new Date();
                    let current_time = ("0" + today.getHours()).slice(-2) + ':' + ("0" + today.getMinutes()).slice(-2) + ':' + ("0" + today.getSeconds()).slice(-2);
                            
                    this.setState({ termination_time: current_time, payloadData: this.props.route.params.payloadData, charging_details: this.props.route.params.historyData.data});
                        
                    this._storeAsyncData(this.state);
                    BackgroundTimer.clearInterval(this._interval);
                    this.setState({ charging_status : 1});
                    
                    this.props.navigation.dispatch(
                        CommonActions.reset({
                        index: 1,
                        routes: [
                            { name: 'Home' },
                        ],
                        })
                    ); 
                }
                 
            })
            .catch(err => {
                console.log("Submit Order  API Catch Exception: ",err);
                showMessage({
                    message: strings.signIn.response.error.title,
                    description: strings.signIn.response.error.message,
                    type: "danger",
                });
            });
        }else {
            console.log("Order Already Created");
        }
    }

    //Submit Temp Order when charging is started
    submitTempOrder = () => {
        let { details, payloadData, historyData } =  this.props.route.params;
        let { submit_temp_order } = this.state;
        let { info } = this.props;
        let payLoad = {
            total_amount   : historyData.data.total_amount,
            order_id       : historyData.data.order_id,
            cs_id          : details.charging_station_id,
            cp_name        : details.connector_point_name,
            connector_id   : details.connector_type_id,
            vehicle_id     : details.vehicleId,
            type           : info.role == '2' ? '1'       : '0',
            remote_start_id: payloadData.remoteStartId
        };

        if(!submit_temp_order){
            HttpRequest.tempOrderSubmit(payLoad, this.props.token)
                .then(res => {
                    const result = res.data;
                    if (res.status == 200 && !result.error ) {
                        this.setState({ submit_temp_order: true });
                        //console.log("Submit Temp Order API Success : ",result);  
                
                    } else {
                        //console.log("Submit Temp Order API Error : ",result);  
                    }   
                })
                .catch(err => {
                    //console.log("Submit Temp Order API Catch Exception: ",err);
                });
        }
    }

    render() {
        let { navigation } =  this.props;
        let { isLoading, charging_count, total_amount, charging_status, refreshing, status, statusNotification, seconds, energy_consumed } = this.state;

        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.chargingLog.title} readAll={this.readAllNotifications} token={this.props.token} count={this.state.count}/>
                  </View>
                { !isLoading ?
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                  
                   <View style={styles.contentBody}>
                        <View style={styles.iconContainer}>
                            <Indicator width={screenWidth * 0.35} height={screenWidth * 0.35} counter={charging_count/100} />
                        </View>
                   </View>
                    <View style={styles.contentFooter}>
                        <View style={styles.row}>
                            <View style={styles.col}>
                                {/* <Text style={[styles.text, styles.percentage]}>{charging_count} %</Text> */}
                                { !status &&  <ActivityIndicator size='small' color='#fff' /> }
                                <View style={styles.row}>
                                    <Icon name="ios-flash-sharp" size={30} color="#9dbb52"/>
                                    <Text style={[styles.text]}>{statusNotification}</Text>
                                </View>
                            </View>
                        </View>
                        {/* { total_amount != 0 &&
                        <View style={styles.row}>
                            <Text style={[styles.text]}>{strings.chargingLog.totalAmount}</Text>
                            <Text style={[styles.text]}>{total_amount.toFixed(2)}</Text>
                        </View>
                        }
                        { energy_consumed != 0 &&
                        <View style={styles.row}>
                            <Text style={[styles.text]}>{strings.chargingLog.energyConsumed}</Text>
                            <Text style={[styles.text]}>{energy_consumed.toFixed(2)+' (KWh)'}</Text>
                        </View>
                        } */}
                        <View style={[styles.row,styles.border, styles.rowBackground]}>
                            <View style={styles.col}>
                                <View style={styles.row}>
                                    <Text style={[styles.text, styles.title]} numberOfLines={1}>{strings.chargingLog.energyConsumed}</Text>
                                </View>
                                <Text style={[styles.text]}>{energy_consumed.toFixed(3)+' (KWh)'}</Text>
                            </View>
                            <View style={[styles.col,styles.colBorder]}>
                                <View style={styles.row}>
                                    <Text style={[styles.text, styles.title]} numberOfLines={2}>{strings.chargingLog.totalAmount}</Text>
                                </View>
                                <Text style={[styles.text]}>{total_amount.toFixed(2)}</Text>
                            </View>
                        </View>
                        <View style={[styles.row,styles.border, styles.rowBackground]}>
                            <View style={styles.col}>
                                <View style={styles.row}>
                                    <Text style={[styles.text, styles.title]} numberOfLines={1}>{strings.chargingLog.elapsedTime}</Text>
                                </View>
                                <Text style={[styles.text]}>{this.secondsToTime(seconds)}</Text>
                            </View>
                            <View style={[styles.col,styles.colBorder]}>
                                <View style={styles.row}>
                                    <Text style={[styles.text, styles.title]} numberOfLines={1}>{strings.chargingLog.chargingPointStatus}</Text>
                                </View>
                                <Text style={[styles.text]}>{statusNotification}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity  style={styles.signInButton} onPress={() =>  this.getTransactionId()}>
                                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.linearGradient}>
                                    { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                                    <Text style={styles.checkinText}>{ status ? strings.chargingLog.stopCharging : strings.chargingLog.stoppingCharging}</Text>
                                    } 
                                    </LinearGradient>
                                </TouchableOpacity> 
                        </View>
                    </View>
                </Animatable.View>:
                <Animatable.View animation="fadeInUpBig" style={[styles.footer, styles.alignCenter ]}>
                    <ActivityIndicator size='large' color='#fff' /> 
                </Animatable.View>
                }
            </View>
        )
    }
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
  
export default connect(mapStateToProps,mapDispatchToProps)(ChargingLog);
