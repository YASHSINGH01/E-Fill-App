import React, {Component} from 'react'
import { ScrollView, Text, View, Image, Alert, BackHandler, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from "react-native-flash-message";
import { db } from "../../utils/FirebaseConfig";
import { CommonActions } from '@react-navigation/native';
import moment from "moment";
//Redux
import { connect } from 'react-redux';
import { orderID, orderAmount, couponStatus, couponApplied } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Styles
import styles from './styles';
//Constants
import { Images } from "../../constants/";
import { strings } from "../../utils/translations";

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

class ChargingTransaction extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isWebsocketConnected: false,
            statusNotification: '',
            payloadData: '',
            isChecking: false,
            current_meter_value: 0,
            start_meter_value: 0,
            energy_consumed: 0,
            isChargerAvailable: ''
        };

        this.StatusNotificationRef = db.ref(props.route.params.historyData.data.protocol == 'ocpp2.0' ? '/EFILLXOCPP20' : '/EFILLXOCPP16JV1' +'/'+props.route.params.historyData.data.connector_point_name +'/StatusNotification/');
    }

    componentDidMount = () => {
        this.checkStatusNotification(this.StatusNotificationRef);
        //Add Back Button Press Listener
        BackHandler.addEventListener('hardwareBackPress',this.onBackPress);
    }

    componentWillUnmount = () => {
        this.StatusNotificationRef.off();
         
        //Remove Back Button Press Listener
        BackHandler.removeEventListener('hardwareBackPress',this.onBackPress);


    }
    onSuccess1 = () => {
        this.setState({ isLoading: false });

    }

    checkStatusNotification = (StatusNotificationRef) => {
        let { historyData } =  this.props.route.params;
        try {
            StatusNotificationRef.orderByChild("connectorId").equalTo(historyData.data.connector_no).on('value', snapshot => {
                if (snapshot.val()) {
                    
                    let first_key = Object.keys(snapshot.val())[0];
                
                    let status = snapshot.val()[first_key]['status'];

                    this.setState({ statusNotification: status, isChecking: historyData.data.connector_type_name != "TYPE - 1" && historyData.data.connector_type_name != "BHARAT-AC001" ? status == 'Available' ? true: false : false });

                    //console.log("Status: ",status, " | Payload: ",this.state.payloadData );

                    if(this.state.payloadData != '' && status == 'Charging') {
                        this.setState({ payload: '', isLoading: false });
                        this.props.navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [
                                    { name: 'Home' },
                                    {
                                    name: 'ChargingLog',
                                    params:  { details: historyData.data, payloadData: this.state.payloadData, historyData: historyData },
                                    },
                                ],
                            })
                        );
                    }
                } else {
                    console.log('CheckStatusNotification: No Entry found for charging point '+historyData.data.connector_point_name);
                }
            });
        } catch(e) {
            console.log('Exception: ', e);
        }
    }

    onBackPress = () => {
        let { processType } =  this.props.route.params;
        if(processType == 2 ) {
            this.closeSuccess();
            return true;
        } else {
           return false;
        }

    };

    closeSuccess = () => {
        let { processType } =  this.props.route.params;
        if(processType == 2 ) {
            Alert.alert(
                "Are you sure you want to go leave?",
                "You will not be able to charge your EV via Quick Charge.",
                [
                    {
                        text: "No",
                        style: "cancel"
                    },
                    {   
                        text: "Yes", 
                        onPress: () =>  this.goHome()
                    }
                ],
            );
        } else {
            this.props.navigation.goBack();
        }
    }

    goHome = () => {
        this.props.orderAmount('');
        this.props.couponStatus(false);
        this.props.couponApplied('');
        this.props.navigation.push("Home")
    }

    formatTime = (time = '') => {
        var H = +time.substr(0, 2);
        var h = (H % 12) || 12;
        var ampm = H < 12 ? " AM" : " PM";
        time = h + time.substr(2, 3) + ampm;
        return time;
    }

    checkStatus = () => {
        let { historyData } =  this.props.route.params;
        let { isLoading } = this.state;

        if(!isLoading){
            //Schedule Charging
            var today = new Date();
            let current_date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);
            let current_time = ("0" + today.getHours()).slice(-2) + ':' + ("0" + today.getMinutes()).slice(-2) + ':' + ("0" + today.getSeconds()).slice(-2);
                
            if(current_date == historyData.data.charge_date){
                //Current date is equal to charge date
                current_time = moment(current_time, "hh:mm:ss"); //Current Time
                let charge_time = moment(historyData.data.charge_time, "hh:mm:ss"); //Charging  Time
        
                if(current_time.isSame(charge_time) || (current_time.isAfter(charge_time) && charge_time.diff(current_time, 'minutes') > -10 )){
                    //If current time is equal to charge time OR current time has passed the scheduled time and 10 mins of buffer time is remaining
                    this.startTransactionRequest();
                } else {
                    //Current time has passed the scheduled time & buffer time of 10 mins 
                    console.log('check Status in Check Transaction: ', strings.error.processRequest);
                    showMessage({
                        message: strings.error.title,
                        description: strings.error.processRequest,
                        type: "danger",
                    });
                }
            } else {
                //Current date is not equal to scheduled date
                showMessage({
                    message: strings.error.title,
                    description: strings.error.chargingDatePassed,
                    type: "danger",
                });
            }
        } else {
            this.setState({ isLoading: true }); 
        }
    }

    startTransactionRequest = () => {
        let { historyData } =  this.props.route.params;
        let statusNotification = '';

        this.StatusNotificationRef.orderByChild("connectorId").equalTo(historyData.data.connector_no).once('value', snapshot => {
            if (snapshot.val()) {
                
                let first_key = Object.keys(snapshot.val())[0];

                statusNotification = snapshot.val()[first_key]['status'];
                //console.log('Get Status Notification Once Value From Firebase: ', statusNotification);

                let random = Math.floor(1000000 + Math.random() * 9999999);
                let remoteStartId = Math.floor(Math.random() * 1000000000);
                
        
                let statusNotificationType = historyData.data.connector_type_name != "TYPE - 1" && historyData.data.connector_type_name != "BHARAT-AC001" ? 'Preparing' : 'Available';
        
                // console.log('Start Status Notification From Firebase: ', statusNotification );
                // console.log('Start Connector: ', historyData.data.connector_type_name );
                
        
                const ws = new WebSocket('ws://socket.efillelectric.com/mobiletest', historyData.data.protocol);
        
                if(statusNotificationType == statusNotification) {
                    this.setState({ isLoading: true }); 
                   
                    // console.log('Status Notification Matched Successfully. ');
                    ws.onopen = () => {
                        let payloadData = {
                            "idToken"      : this.props.info.id,                      //User Id
                            "evseId"       : historyData.data.connector_no,           //Connector
                            "chargingPoint": historyData.data.connector_point_name,   //Charging Point Name 
                            "remoteStartId": remoteStartId,
                            "scheduleId"   : historyData.data.id
                        };
                        
                        let payload = [
                            2, random , "RequestStartTransactionApp",
                            payloadData
                        ];
        
                        console.log('Payload sent in "RequestStartTransactionApp" : ', payload);
        
                        ws.send(JSON.stringify(payload));
                        ws.onclose();
                            
                        //Start checking the charging Status notification & set thw payload Data
                        this.setState({  payloadData: payloadData, isChargerAvailable: true, isWebsocketConnected: true }); 
                        

                        //Clean Props
                        this.props.orderAmount('');
                        this.props.couponStatus(false);
                        this.props.couponApplied('');
                    }
                    ws.onmessage = (event) => { 
                        console.log("Received: '" + event.data + "'");
                    }
                    ws.onerror = (error) => { 
                        console.log('Connection Error', error.message);
//                        showMessage({
//                            message: strings.error.title,
//                            description: strings.error.processRequest,
//                            type: "danger",
//                        });
                        
                        this.setState({ isWebsocketConnected: false, isLoading: false });
                    }
                    ws.onclose = () => {
                        console.log('echo-protocol Client Closed');

                        this.setState({ isWebsocketConnected: false });
                        wait(5000).then(() => this.onSuccess1());
                    }
                } 
                else {
                    console.log('Firebase status notification is != statusNotificationType available as per connector type.')
                    console.log("Firebase Status Notification is: ",statusNotification);
                    showMessage({
                        message: strings.error.title,
                        description: strings.error.chargerUnavailable,
                        type: "danger",
                    });
        
                    this.setState({ isChargerAvailable: false });
                }
            } else {
                console.log('CheckStatusNotification: No Entry found for charging point '+historyData.data.connector_point_name);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.chargerUnavailable,
                    type: "danger",
                });
                this.setState({ isChargerAvailable: false });
            }
        });
    }
      
    render() {
        let { historyData } =  this.props.route.params;
        let { payload, isChecking, isLoading, isChargerAvailable  } = this.state;

        return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.content}>
                    <View style={styles.buttonContainer}>
                        <Icon name="md-checkmark-sharp" size={30} color="#fff"/>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.titleText} numberOfLines={1}>{historyData.data.charging_station_name}</Text>
    
                    </View>
                    <Image source={Images.seperator} style={styles.seperator}/>
                    <View style={styles.body}>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.label]}>{strings.successTransaction.orderId}</Text>
                            <Text style={[styles.text, styles.value]}>{historyData.data.order_id}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.label]}>{strings.successTransaction.date}</Text>
                            <Text style={[styles.text, styles.value]}>{historyData.data.charge_date == 'Now' ? moment().format("dddd, MMMM Do YYYY") : historyData.data.charge_date }</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.label]}>{strings.successTransaction.time}</Text>
                            <Text style={[styles.text, styles.value]}>{historyData.data.charge_time == 'Now' ? moment().format("h:mm a") : this.formatTime(historyData.data.charge_time)}</Text>
                        </View>
                        <View style={styles.row}>
                            { historyData.data.payment && historyData.data.payment.length > 0 &&
                            <View style={[styles.row, styles.column]}>
                                <Text style={[styles.text, styles.value ]}>{strings.successTransaction.totalPrice}</Text>
                                <Text style={[styles.text, styles.value, styles.active]}>{ historyData.data.payment[0].currency+' '+ historyData.data.payment[0].amount }</Text>
                            </View>
                            }
                            { payload != '' && isChecking ? 
                            <View style={[styles.row, styles.column, styles.centerLoader, { justifyContent: 'center', alignItems: 'center' }]}>
                                <ActivityIndicator size='large' color='#05294b' />
                            </View>
                            :
                            <TouchableOpacity onPress={this.checkStatus} style={[styles.row, styles.column, styles.button]}>
                                <View>
                                { isLoading &&
                                    <ActivityIndicator size='small' color='#05294b' />                                
                                }
                                { !isLoading &&
                                    <Text style={[styles.text, styles.value ]}>{ strings.successTransaction.start}</Text>
                                }
                                </View>
                            </TouchableOpacity>
                            }
                        </View>
                        { payload != '' && isChecking && !isLoading &&
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.error]}>{strings.successTransaction.plugConnector} </Text>
                        </View>
                        }
                        { payload != '' && isLoading && !isChecking &&
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.error]}>{strings.successTransaction.processRequest}</Text>
                        </View>
                        }
                        { isChargerAvailable != '' && !isChargerAvailable &&
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.error]}>{strings.successTransaction.chargerUnavailable}</Text>
                        </View>
                        }
                    </View>
                    <Image source={Images.seperator} style={styles.seperator}/>
                    <View style={styles.footer}>
  
                        <Text style={styles.subTitleText} numberOfLines={2}>{historyData.data.address}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={this.closeSuccess} style={styles.closeContainer}>
                    <Icon name="ios-close-circle-outline" size={60} color="#fff"/>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
    }
}

const mapStateToProps = state => {
    
    return {
        info: state.info,
        token: state.token,
        order_id: state.order_id,
        order_amount: state.order_amount,
        coupon_status: state.coupon_status,
        coupon_applied: state.coupon_applied,
        charging_station_info: state.charging_station_info,
        charging_point_info: state.charging_point_info,
        book_charger_info: state.book_charger_info,
        booking_info: state.booking_info
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        orderID: bindActionCreators(orderID, dispatch),
        orderAmount: bindActionCreators(orderAmount, dispatch),
        couponStatus: bindActionCreators(couponStatus, dispatch),
        couponApplied: bindActionCreators(couponApplied, dispatch)
    };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(ChargingTransaction);

