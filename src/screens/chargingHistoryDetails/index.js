TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions, RefreshControl, ScrollView, ActivityIndicator } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage } from "react-native-flash-message";
import { CommonActions } from '@react-navigation/native';
import {db} from "../../utils/FirebaseConfig";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import moment from "moment";
import AsyncStorage from "../../utils/AsyncStorage";
//Components
import Header from '../../components/Header';
//Api
import HttpRequest from "../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Styles
import styles from './styles';
import { strings } from '../../utils/translations';
import { isAirplaneModeSync } from 'react-native-device-info';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = parseFloat("28.439450");
const LONGITUDE = parseFloat("77.299860");
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO; 

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

class ChargingHistoryDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            isChecking: false,
            refreshing: false,
            historyData: '',
            details: '',
            historyData:'',
            chargerStatus:'',
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            start: false,
            notification: '',
            chargingAvailable: false,
            payloadData: '',
            count: 0,
            totalStopTransactions: 0,
            isReloading: false
        };

        // this.statusNotificationRef = db.ref('/EFILLXOCPP16J/EFILLAC001_00004/StatusNotification/').orderByChild("connectorId").equalTo(1);

        // this.meterValueRef = db.ref('/EFILLXOCPP16J/EFILLAC001_00004/MeterValues/').orderByChild("connectorId").equalTo(1);

        // this.startMeterValueRef = db.ref('/EFILLXOCPP16J/EFILLAC001_00004/StartTransaction/').orderByChild("connectorId").equalTo(1);

        // this.stopTransactionRef = db.ref('/EFILLXOCPP16J/EFILLAC001_00004/StopTransaction/');

        // this.stopTransactionLastRef = db.ref('/EFILLXOCPP16J/EFILLAC001_00004/StopTransaction/');

    }

    componentDidMount = () => {
        this.getBookingDetails();
    }

    componentWillUnmount = () => {
        clearInterval(this.intervalPointer);
    }
    
    checkStatusNotification = () => {
        let { historyData } = this.state;
       // console.log("history", historyData);
        try {
            db.ref('/EFILLXOCPP16JV1' + '/' + historyData.data.connector_point_name + '/ChargerStatus/').orderByChild("chargerId").equalTo(historyData.data.connector_point_name).on('value', snapshot => {
                if (snapshot.val()) {
                    console.log('Status Notification Snapshot Value: ', snapshot.val());
                    // data exist, do something else
                    let first_key = Object.keys(snapshot.val())[0];
                    let status = snapshot.val()[first_key]['chargerstatus'];
                    console.log('Status Notification Snapshot Value2: ', status);
                    this.state.chargerStatus = status;
                    console.log('Status Notification Snapshot Value3: ', this.state.chargerStatus);
                    this.setState({ chargerStatus: status });
                } else {
                    console.log('Charger Status  Not Found');
                }
            });

        } catch (e) {
            console.log('Exception: ', e);
        }
    }
    // Get Booking History Details Through Api
    getBookingDetails = (type = '') => {
        let { id } = this.props.route.params == undefined ? '1' : this.props.route.params ;
    let{historyData}=this.state;
        if(type == 'reload'){
            this.setState({ isReloading: true});
        }
        HttpRequest.scheduleDetails({ id: id},this.props.token)
        .then(res => {
            this.setState({ isLoading: false });
            const result = res.data;
            if (res.status == 200 && !result.error) {
                this.setState({
                    historyData: result, details: result.data, refreshing: false, region: {
                        latitude: parseFloat(result.data.latitude),
                        longitude: parseFloat(result.data.longitude),
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                        isReloading: false
                    }
                });
                this.checkStatusNotification();
                console.log(historyData, 'valueeeee');
                if(this.props.route.params.status == 0 || this.props.route.params.status == 3)
                {
                    this.intervalPointer = setInterval(() => this.checkChargingStatus(), 2000)
                }
            } else {
                if(type == 'reload'){
                    this.setState({ isLoading: false, isReloading: false});
                }
                //console.log("Booking History Details API Error : ",result);
                showMessage({
                    message: strings.error.title,
                    description: result.message != undefined ? result.message : result.status,
                    type: "danger",
                });
            }
        })
        .catch(err => {
            this.setState({ isLoading: false, isReloading: false });
            console.log("Booking History Details API Catch Exception: ",err);
            // showMessage({
            //    message: strings.error.title,
            //     description: strings.error.message,
            //     type: "danger",
            // });
        });
    }

    checkChargingStatus = () => {
        let { details } = this.state;
        let message = '';
        if(details != '') {
            var today = new Date();
            let current_date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);
            let current_time = ("0" + today.getHours()).slice(-2) + ':' + ("0" + today.getMinutes()).slice(-2) + ':' + ("0" + today.getSeconds()).slice(-2);
     console.log("charhe_log",details);
            if(current_date == details.charge_date ) {

                current_time = moment(current_time, "hh:mm:ss"); //Current Time
                let charge_time = moment(details.charge_time, "hh:mm:ss"); //Charging  Time
                let end_time = moment(details.end_time, "hh:mm:ss"); //Charging End Time
                let timeRemaining = moment(charge_time.diff(current_time)); //Different Between both times

                timeRemaining = moment.duration(timeRemaining).humanize();

                if(current_time.isBefore(charge_time)) { 
                    if(timeRemaining == '2 minutes'){
                        message = strings.chargingHistoryDetails.notification.first;
                    } else if(timeRemaining == 'a minute'){
                        message = strings.chargingHistoryDetails.notification.second;
                    } else if(timeRemaining == 'a few seconds'){
                        message = strings.chargingHistoryDetails.notification.third;
                    } else {
                        message = timeRemaining +' '+strings.chargingHistoryDetails.notification.fourth;
                    }
                    this.setState({ notification: message });
                   
                } 
                else if(current_time.isAfter(charge_time) && charge_time.diff(current_time, 'minutes') < -10 && this.props.route.params.status == 0){
                    this.setState({ chargingAvailable: false, notification: strings.chargingHistoryDetails.notification.fifth});
                    clearInterval(this.intervalPointer);
                } 
                else if(current_time.isAfter(charge_time) && current_time.isBefore(end_time) && this.props.route.params.status == 3){
                    this.setState({ chargingAvailable: true, notification: strings.chargingHistoryDetails.notification.seventh});
                }
                else if(current_time.isAfter(end_time) && this.props.route.params.status == 3){
                    this.setState({ chargingAvailable: false, notification: strings.chargingHistoryDetails.notification.error});
                }
                else {
                    this.setState({ chargingAvailable: true, notification: strings.chargingHistoryDetails.notification.sixth});
                } 
            } else {
                this.setState({ chargingAvailable: false, notification: ''});
            }
        }
       
    }
    
    onRefresh = () => {
        this.setState({ refreshing : true})
        this.getBookingDetails();
    }

    renderItem = ({ item, index }) => (
            <View style={styles.item}>
                <View style={styles.IconContainer}>
                    {/* Notification Icon */}
                    <Icon name="ios-notifications" size={32} color="#5dda96"/>
                </View>
                <View style={styles.content}>
                    {/* Title */}
                        <Text style={[styles.text, styles.title]}>{item.title}</Text>
                
                    {/* Desctiption */}
                    <Text style={[styles.text,styles.description]}>{item.description}</Text>
                
                    {/* Created At */}
                    <Text style={[styles.text,styles.createdAt]}>{item.createdAt}</Text>
                    
                </View>
            </View>
    );

    getCurrentDate = () =>{
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        console.log("Date", year + '-' + month + '-' + date);
        return year + '-' + month + '-' + date;
    }

    getCurrentTime = () => {
        var time = new Date();
        time =  ("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2) + ":" +  + ("0" + time.getSeconds()).slice(-2)
        return time;
    }

    giveFeedback = () => {
        let { details } = this.state;
        this.setState({isChecking: false});
        this.props.navigation.navigate('ChargingFeedback', { chargingHistoryDetails: details });
    }

    checkStatus = (date, start_time, end_time) => {
        let { chargingAvailable } = this.state;
        this.setState({isChecking: true});

        if(chargingAvailable){
            //Interval has allowed user & Proceed button is displayed to the user
            var today = new Date();
            let current_date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);
            let current_time = ("0" + today.getHours()).slice(-2) + ':' + ("0" + today.getMinutes()).slice(-2) + ':' + ("0" + today.getSeconds()).slice(-2);

            if(current_date == date){
                //Current date is equal to charge date
                current_time = moment(current_time, "hh:mm:ss"); //Current Time
                let charging_start_time = moment(start_time, "hh:mm:ss"); //Charging Start Time
                let charging_end_time = moment(end_time, "hh:mm:ss"); //Charging End Time
    
                if(current_time.isSame(charging_start_time) || (current_time.isAfter(charging_start_time) && charging_start_time.diff(current_time, 'minutes') > -10 && this.props.route.params.status == 0 )){
                    //If current time is equal to charge time OR current time has passed the scheduled time and 10 mins of buffer time is remaining
                    this.proceedToStartTransaction();
                } 
                else if(current_time.isAfter(charging_start_time) && current_time.isBefore(charging_end_time) && this.props.route.params.status == 3){
                   this.checkChargerAvailability();
                }
                else {
                    console.log('check Status in Charging History Details: ', strings.error.processRequest);
                    //Current time has passed the scheduled time & buffer time of 10 mins 
                    showMessage({
                        message: strings.error.title,
                        description: strings.error.processRequest,
                        type: "danger",
                    });
                    this.setState({isChecking: false});
                }
            } else {
                //Current date is not equal to scheduled date
                showMessage({
                   message: strings.error.title,
                    description: strings.error.chargingDatePassed,
                    type: "danger",
                });
                this.setState({isChecking: false});
            }
        }  
    }

    checkChargerAvailability = () => {
        let { historyData } =  this.state;
        try {
            db.ref(historyData.data.protocol == 'ocpp2.0' ? '/EFILLXOCPP20' : '/EFILLXOCPP16JV1' +'/'+historyData.data.connector_point_name +'/StatusNotification/').orderByChild("connectorId").equalTo(historyData.data.connector_no).once('value', snapshot => {
                if (snapshot.val()) {
                        
                    let first_key = Object.keys(snapshot.val())[0];
                    
                    let status = snapshot.val()[first_key]['status'];

                    this.setState({isChecking: false});

                    if(status == 'Charging') {
                        try {
                            AsyncStorage.getChargingLogInfo().then(val => {
                                //console.log("PayloadData 1: ",JSON.parse(val).payloadData);
                                if(JSON.parse(val) != null){
                                    this.props.navigation.dispatch(
                                        CommonActions.reset({
                                            index: 1,
                                            routes: [
                                                { name: 'Home' },
                                                {
                                                    name: 'ChargingLog',
                                                    params:  { details: historyData.data, payloadData:  JSON.parse(val).payloadData, historyData: historyData },
                                                    },
                                                ],
                                        })
                                    );
                                }else {
                                    showMessage({
                                        message: strings.error.title,
                                        description: strings.error.transactionDetailsError,
                                        type: "danger",
                                    });
                                }
                            });
                        } catch(e) {
                            // Error reading value
                            console.log("Async Reading Value Error: ", e);
                        }
                    }
                    else {
                        showMessage({
                            message: strings.error.title,
                            description: strings.error.chargingPointUnavailable,
                            type: "danger",
                        });
                    }
                } else {
                    console.log("err1");
                    this.setState({isChecking: false});
                    showMessage({
                        message: strings.error.title,
                        description: strings.error.chargingPointUnavailable,
                        type: "danger",
                    });
                }
            });
        } catch(e) {
            this.setState({isChecking: false});
            console.log('Exception: ', e);
        }   
    }


    proceedToStartTransaction = () => {
        let { historyData } = this.state;
        this.setState({isChecking: false});
        this.props.navigation.navigate('ChargingTransaction', { historyData: historyData, processType: 1 });
    }

    render() {
        let { navigation } =  this.props;
        let { isLoading, chargerStatus,isChecking, isReloading, historyData, details, region, notification, chargingAvailable } = this.state;

        return (
            <View style={[styles.container, historyData == '' ? styles.background : null ]}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.chargingHistoryDetails.title} />
                </View>
                { !isLoading ? 
                   
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                {historyData != '' ?
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                   {/* <MapView
                        ref={ref => this.map = ref}
                        provider={PROVIDER_GOOGLE}
                        style={ styles.mapView }
                        showsMyLocationButton={true}
                        showsCompass={true}
                        loadingEnabled={true}
                        zoomControlEnabled={true}
                        zoomEnabled={true}
                        enableZoomControl={true}
                        zoomTapEnabled={true}
                        scrollEnabled={true}
                        pitchEnabled={true}
                        initialRegion={ region }
                    >
                        <Marker coordinate={{ latitude : region.latitude , longitude : region.longitude }}/>
                   </MapView>*/}
                    <View style={[styles.cardView, { marginTop: 10}]}>
                        <Text style={[styles.text, styles.title]}>{details.charging_station_name}</Text>
                        <Text style={[styles.text, styles.address]} numberOfLines={1}>{details.address}</Text>
                    </View>
                    <View style={styles.cardViewNoPadding}>
                        <View style={styles.paddr}>
                            <Text style={[styles.text, styles.title]}>{strings.chargingHistoryDetails.chargingPoint}</Text>
                            <View style={styles.row}>
                                <Text style={[styles.text ]} numberOfLines={1}>{details.connector_point_name}</Text>
                            </View>
                            <View style={styles.row}>
                                            <Text style={[styles.text]} numberOfLines={1}>Charger Status</Text>
                                            <Text style={[styles.text]} numberOfLines={1}>{chargerStatus}</Text>
                                        </View>
                        </View>
                        { details.payment && details.payment.length > 0 &&
                        <View style={styles.seperator}></View>
                        }
                        { details.payment && details.payment.length > 0 &&
                        <View style={styles.paddr}>
                            <Text style={[styles.text, styles.title]}>{strings.chargingHistoryDetails.payment}</Text>
                            <View style={styles.row}>
                                <Text style={[styles.text]} numberOfLines={1}>{strings.chargingHistoryDetails.description}</Text>
                                <Text style={[styles.text, styles.active, styles.amount]} numberOfLines={1}>{details.payment[0].currency+' '+details.payment[0].amount }</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.text]}>{strings.chargingHistoryDetails.paymentMode}</Text>
                                <Text style={[styles.text, styles.active]} numberOfLines={1}>{ details.payment[0].method }</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.text]}>{strings.chargingHistoryDetails.orderId}</Text>
                                <Text style={[styles.text, styles.active]} numberOfLines={1}>{details.payment[0].orderId}</Text>
                            </View>
                            {details.payment.length == 2 &&
                            <View style={styles.row}>
                                <Text style={[styles.text]}>{strings.chargingHistoryDetails.refunded}</Text>
                                <Text style={[styles.text, styles.active]} numberOfLines={1}>{details.payment[0].refund_amount}</Text>
                            </View>
                            }
                        </View>
                        }
                        <View style={styles.seperator}></View>
                        <View style={[styles.paddr, {marginBottom: 30}]}>
                            <View style={styles.row}>
                                <Text style={[styles.text, styles.title]}>{strings.chargingHistoryDetails.chargingDetail}</Text>
                                {/* { details.payment && details.payment.length > 0 && */}
                                    <Text style={[styles.text, styles.status, this.props.route.params.status == 1 ? styles.completed : this.props.route.params.status == 2 ?  styles.cancelled : styles.pending]}>{this.props.route.params.status == 1 ? 'COMPLETED' : this.props.route.params.status == 2 ? details.payment && details.payment.length > 0 && details.payment.length == 2 ? 'REFUNDED' : 'CANCELLED' : 'PENDING'}</Text>
                                {/* }e */}
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.text]} numberOfLines={1}>{strings.chargingHistoryDetails.connectorType}</Text>
                                <Text style={[styles.text, styles.active]} numberOfLines={1}>{details.connector_type_name}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.text]}>{strings.chargingHistoryDetails.chargingDate}</Text>
                                <Text style={[styles.text, styles.active]} numberOfLines={1}>{details.charge_date1}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.text]}>{strings.chargingHistoryDetails.chargingTime}</Text>
                                <Text style={[styles.text, styles.active]} numberOfLines={1}>{details.charge_time}</Text>
                            </View>
                            {this.props.route.params.status == 2 && details.payment && details.payment.length > 0 &&
                            <View style={styles.seperator}></View>
                            }
                            {this.props.route.params.status == 2 && details.payment && details.payment.length > 0 &&
                            <View style={styles.row}>
                                <Text style={[styles.text, styles.title]}>{strings.chargingHistoryDetails.userDetail}</Text>
                            </View>
                            }
                            {this.props.route.params.status == 2 && details.payment && details.payment.length > 0 &&
                            <View style={styles.row}>
                                <Text style={[styles.text]} numberOfLines={1}>{strings.chargingHistoryDetails.userEmail}</Text>
                                <Text style={[styles.nonCapitalText, styles.active]} numberOfLines={1}>{details.payment[0].email}</Text>
                            </View>
                            }
                            {this.props.route.params.status == 2 && details.payment && details.payment.length > 0 &&
                            <View style={styles.row}>
                                <Text style={[styles.text]} numberOfLines={1}>{strings.chargingHistoryDetails.userPhone}</Text>
                                <Text style={[styles.text, styles.active]} numberOfLines={1}>{details.payment[0].phone }</Text>
                            </View> 
                            }
                            { notification != '' && (this.props.route.params.status == 0 || this.props.route.params.status == 3) &&
                                <Text style={[styles.text, styles.notifications]} numberOfLines={2}>{notification}</Text>
                            }
                            {this.props.route.params.status != 1 && this.props.route.params.status != 2 && chargingAvailable ? 
                            <View style={styles.row}>
                                <TouchableOpacity  style={styles.signInButton} onPress={() =>  this.checkStatus(details.charge_date, details.charge_time, details.end_time)}>
                                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.linearGradient}>
                                    { isChecking ? <ActivityIndicator size='large' color='#fff' /> :
                                    <Text style={styles.checkinText}>{strings.chargingHistoryDetails.proceed}</Text>
                                    } 
                                    </LinearGradient>
                                </TouchableOpacity> 
                            </View>
                            : null  }
                            {this.props.route.params.status == 1 ? 
                            <View style={styles.row}>
                                <TouchableOpacity  style={styles.signInButton} onPress={() =>  this.giveFeedback()}>
                                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.linearGradient}>
                                    { isChecking ? <ActivityIndicator size='large' color='#fff' /> :
                                    <Text style={styles.checkinText}>{strings.chargingHistoryDetails.feedback}</Text>
                                    } 
                                    </LinearGradient>
                                </TouchableOpacity> 
                            </View>
                            : null  }
                        </View>
                    </View>
                </ScrollView>
                :
                <View style={styles.noDataFoundContainer}>
                    <Text style={styles.noDataFoundText}>{strings.chargingHistory.response.error.notFound}</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.tabItemContainer}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.tabItem}>
                            {!isReloading ?
                            <View>
                                <Text style={styles.headerText}>{strings.quickCharge.goBack}</Text></View>
                                :
                                <ActivityIndicator size='small' color='#05294b' /> 
                            }
                        </LinearGradient> 
                    </TouchableOpacity>
                </View>
                }
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
  
export default connect(mapStateToProps,mapDispatchToProps)(ChargingHistoryDetails);
