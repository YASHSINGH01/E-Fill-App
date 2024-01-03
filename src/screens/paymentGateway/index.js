import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, Keyboard, ActivityIndicator, Dimensions, Platform } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import RazorpayCheckout from 'react-native-razorpay';
import { showMessage } from "react-native-flash-message";
import { Modalize } from 'react-native-modalize';
import moment from "moment";
import _ from "lodash";
//Api
import HttpRequest from "../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { orderID, orderAmount, couponStatus, couponApplied } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Components
import Header from '../../components/Header';
//Constants
import { Images } from "../../constants/";
//Styles
import styles from './styles';

import { strings } from '../../utils/translations';
import colors from '../../constants/colors';

const Amount = [
    {
        id: '1',
        value: 200,
        unit: '/-'
    },
    {
        id: '2',
        value: 300,
        unit: '/-'
    },
    {
        id: '3',
        value: 400,
        unit: '/-'
    },
    {
        id: '4',
        value: 500,
        unit: '/-'
    }
]

const Unit = [
    {
        id: '1',
        value: 5.00,

    },
    {
        id: '2',
        value: 10.00
    },
    {
        id: '3',
        value: 15.00
    },
    {
        id: '4',
        value: 20.00
    }
]

const Time = [
    {
        id: '1',
        value: 0.30
    },
    {
        id: '2',
        value: 1.00
    },
    {
        id: '3',
        value: 2.00
    },
    {
        id: '4',
        value: 3.00
    }
]

const HEIGHT = Dimensions.get('window').height;

class PaymentGateway extends Component {
    constructor(props){
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitInput = this.onSubmitInput.bind(this);
        this.inputRef = this.updateRef.bind(this, 'input');
        this.modalizeRef = React.createRef();

        this.state = {
            isLoading: false,
            type: 'Amount',
            min_order_amount: '',
            user_order_amount: '',
            user_order_unit: '',
            user_order_time: '',
            input: 0,
            height: HEIGHT/2,
            mapHeight: HEIGHT/2,
            order_id: '',
            userinfo:'',
             user_wallet_balance: ''
        };
    }

    componentDidMount = () => {
        this.userprofile();
        try{
            let { processType } = this.props.route.params;
           // console.log("route",this.props.params);

            let min_order_amount = '';

            if(processType == 1){
                min_order_amount = parseFloat((this.props.charging_point_info.unitPrice * parseFloat(this.props.charging_point_info.capacity).toFixed(2) * this.getScheduleTimeDuration())).toFixed(2);
            } else {
                min_order_amount = parseFloat(this.props.charging_point_info.unitPrice * parseFloat(this.props.charging_point_info.capacity).toFixed(2)).toFixed(2);
            }

            this.props.orderAmount(min_order_amount);
            this.setState({ input: min_order_amount });
        } catch(e){
           // console.log(e, "sunny");
        }
        // this.createOrder();
        this.walletOrder();
    }

    UNSAFE_componentWillMount = () => {
        this.props.couponStatus(false);
        // this.props.couponApplied('');
    }

    onFocus(){
        let { errors = {} } = this.state;

        for (let name in errors) {
          let ref = this[name];

          if (ref && ref.isFocused()) {
            delete errors[name];
          }
        }

        this.setState({ errors });
    }

    onBlur(){
        this.onSubmitInput();
    }

    onChangeText(text) {
        ['input']
          .map((name) => ({ name, ref: this[name] }))
          .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
              this.setState({ [name]: text });
            }
        });
    }

    onSubmitInput(){
        let { type, input } = this.state;
        Keyboard.dismiss();
        if(input > 0){
            this.onBalanceUpdate(type, input);
        }
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

     //Create Wallet order through API
     walletOrder = () => {
        // let { processType } = this.props.route.params;
        // let { input, type } = this.state;
        // let {user_wallet_balance} = this.props;

       //console.log(this.prop,"value token");

        HttpRequest.walletOrder( this.props.token)
        .then(res => {
            console.log("connector",this.props.connectorName);
            const result = res.data;
             console.log("walletorder",result);
            if (res.status == 200 && !result.error) {
                console.log("Create Razorypay order11111 ------ ", result);

                this.setState({user_wallet_balance: result.balance});

            } else {
                console.log("Create Razorypay order API Error11111 : ",result);

            }
        })
        .catch(err => {
            this.setState({ isLoading: false });
            console.log("Create Razorypay order API Catch Exception:1111 ",err);
            showMessage({
                message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    }

    //Create Razorypay order through API
    createOrder = (price = '') => {
        let { processType } = this.props.route.params;
        let min_order_amount = '';
        let { input, type } = this.state;

        if(processType == 1){

            min_order_amount = parseFloat((this.props.charging_point_info.unitPrice * parseFloat(this.props.charging_point_info.capacity).toFixed(2) * this.getScheduleTimeDuration())).toFixed(2);
        } else {
            min_order_amount = parseFloat(this.props.charging_point_info.unitPrice * parseFloat(this.props.charging_point_info.capacity).toFixed(2)).toFixed(2);
        }


        HttpRequest.createOrder({ orderAmount: price != '' ? price : min_order_amount }, this.props.token)
        .then(res => {
            this.setState({ isLoading: false, input:  price != '' ? price : min_order_amount });
            const result = res.data;
            if (res.status == 200 && !result.error) {
                console.log("Create Razorypay order ------ ", result);
                this.setState({ min_order_amount: min_order_amount, input: type == 'Amount' ? price != '' ? price : min_order_amount : input });
                this.props.orderID(result.orderId);
                this.props.orderAmount(price != '' ? price : min_order_amount);
                if(price != '') {
                   // this.checkIfAnyScheduleExists();
                   this.initiatePayment();
                }
            } else {
                console.log("Create Razorypay order API Error : ",result);
                showMessage({
                    message: strings.error.title,
                    description: result.message != undefined ? result.message : result.status,
                    type: "danger",
                });
            }
        })
        .catch(err => {
            this.setState({ isLoading: false });
            console.log("Create Razorypay order API Catch Exception: ",err);
            showMessage({
                message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    }

    getScheduleTimeDuration = () => {
        let { booking_info } = this.props;
        if( booking_info.selected_startTime != '' && booking_info.selected_endTime != '') {
            console.log('Booking Info received: ', booking_info);
            let startTime       = moment(booking_info.selected_startTime, "hh:mm:ss"); //Start Time
            let endTime         = moment(booking_info.selected_endTime, "hh:mm:ss"); //End Time
            let timeDifference  = endTime.diff(startTime, 'minutes');
             console.log('Time Difference: ', Math.abs(timeDifference/60));
            return Math.abs(timeDifference/60);
        }
    }

    // Remove Specific Coupons Through Api
    removeSpecificCoupons = (amountUpdate = false) => {
        let { order_id } = this.props;
        let { min_order_amount, user_order_amount } = this.state;
        // console.log("Remove Specific Coupons API Response ---------- ", order_id);
        HttpRequest.removeCoupons({ coupon_id: this.props.coupon_applied.id, order_id: this.props.coupon_applied.order_id }, this.props.token)
        .then(res => {
            const result = res.data;
            if (res.status == 200 && !result.error) {
                // console.log("Remove Specific Coupons API Response ---------- ", result);
                if(!amountUpdate) {
                    this.props.orderAmount(user_order_amount == '' ? min_order_amount : user_order_amount);
                    this.setState({ min_order_amount: min_order_amount, input:  user_order_amount == '' ? min_order_amount : user_order_amount});
                }
                this.props.couponStatus(false);
                // this.props.couponApplied('');
                showMessage({
                    message: strings.signIn.response.success.title,
                    description: strings.paymentMode.couponRemoveSuccess,
                    type: "success",
                });
            } else {
               console.log('Error: ',result);
            }
        })
        .catch(err => {
            console.log("Remove Specific Coupons API Catch Exception: ",err);
        });
    }

    onProceed1 = () => {
    this.checkIfAnyScheduleExists();

    }

    userprofile=()=>{
        let{userinfo}=this.state;
    HttpRequest.UserInfo(this.props.token)
       .then(res => {
         const result = res.data;
         console.log("Response ---------- ", result);
         if (res.status == 200 && !result.error) {
           this.setState({ userinfo: result.detail });
            console.log("Response2 ---------- ", this.state.userinfo);
         } else {
           this.setState({ refreshing: false });
           console.log("User Profile API Error : ", result);
           //                            showMessage({
           //                               message: strings.error.title,
           //                                description: result.message != undefined ? result.message : result.status,
           //                                type: "danger",
           //                            });
         }
       })
       .catch(err => {
         this.setState({ isLoading: false, refreshing: false });
         console.log("User Profile API Catch Exception: ", err);
         showMessage({
           message: strings.error.title,
           description: strings.error.message,
           type: "danger",
         });
       });
   }
    onProceed = () => {
        let { min_order_amount } = this.state;
        let { order_amount } = this.props;
         let { unitPrice } = this.props.charging_point_info;

        if(parseInt(order_amount) != unitPrice && parseInt(order_amount) > unitPrice*2) {  // order amount should be eqaual or greater than unit price
            this.setState({ isLoading: true });
            //create order again for the new amount
            // console.log("order amount",this.props);
            this.createOrder(this.props.order_amount);
        } else if(order_amount == unitPrice) {
            //Check Schedule
           // this.initiatePayment();
            //this.checkIfAnyScheduleExists();
        } else {
            console.log("value1111");
            showMessage({
                message: strings.paymentMode.warning,
                description: strings.paymentMode.minAmount+" "+unitPrice*2,
                type: "danger",
            });
        }
    }

    getCurrentDate = () =>{
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        return year + '-' + month + '-' + date;
    }

    getCurrentTime = () => {
        var time = new Date();
        time =  ("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2) + ":" +  + ("0" + time.getSeconds()).slice(-2)
        return time;
    }

    checkIfAnyScheduleExists = () => {
        let { charging_station_info, charging_point_info, booking_info, order_id,order_amount } = this.props;
        let { processType } = this.props.route.params;
        console.log("schedule1",this.props);
        HttpRequest.checkSchedule({ order_amount: order_amount ,capacity:charging_point_info.capacity,unitPrice:charging_point_info.unitPrice, cs_id: charging_station_info.id, cp_id: charging_point_info.id, connector_type: charging_point_info.connector_type_id, connector_id: charging_point_info.connector_id , charge_date: processType == 1 ? booking_info.selected_date : this.getCurrentDate() , charge_time: processType == 1 ? booking_info.selected_startTime : this.getCurrentTime(), end_time: processType == 1 ? booking_info.selected_endTime : this.getCurrentTime()},this.props.token)
        .then(res => {
            const result = res.data;
            console.log("Check Schedule API Response ---------- ", result);
            if (res.status == 200 && !result.error) {

                this.onProceed();
                //this.initiatePayment();
            } else {
                // this.initiatePayment();
                showMessage({
                    message: strings.paymentMode.warning,
                    description: processType == 1 ? strings.paymentMode.unavailableTimeSlot : strings.paymentMode.unavailableCharger,
                    type: "danger",
                });
            }
        })
        .catch(err => {
            showMessage({
                message: strings.paymentMode.warning,
                description: processType == 1 ? strings.paymentMode.unavailableTimeSlot : strings.paymentMode.unavailableCharger,
                type: "danger",
            });
        });
    }

    evaluateTimeSlots = (start_time, amount ) => {
        let { unitPrice, capacity } = this.props.charging_point_info;
        capacity = parseFloat(capacity).toFixed(2);

        var time = moment(start_time,'HH:mm:ss');
        let time_in_minutes = parseFloat((amount /(unitPrice * capacity))*60).toFixed(2);
        // console.log("Amount: ",amount);
        // console.log("Unit price: ",unitPrice);
        // console.log("Capacity: ",capacity);
        time.add(time_in_minutes,'m');
        //console.log("End Time: ",time.format("HH:mm:ss"));
        return time.format("HH:mm:ss");
    }

    initiatePayment = () => {
        let{userinfo}=this.state;
        let { processType, vehicle_id }                                                  = this.props.route.params;
        let { info, charging_station_info, charging_point_info, order_id, order_amount } = this.props;

        let quick_charge_payload = {
            selected_date: this.getCurrentDate(),
            selected_startTime: this.getCurrentTime(),
            vehicle_id: vehicle_id,
        }

        let key = info.is_live ? 'rzp_live_r9WlsJwZGngSBa' : 'rzp_live_r9WlsJwZGngSBa' ;
        'rzp_test_3whE64xyXFy3J5';


        if(info.role == '2'){
            //Corporate User Scheduled Charging
            if(processType == 1) {
                this.createBooking(order_id);
            }else {
                quick_charge_payload.selected_endTime = this.evaluateTimeSlots(quick_charge_payload.selected_startTime, order_amount)
                this.createBooking(order_id, quick_charge_payload);
            }
        } else {

            if((this.props.order_id).indexOf('wallet') !== -1)
            {
                if(processType == 1) {
                    this.createBooking(this.props.order_id);
                }else {
                    quick_charge_payload.selected_endTime = this.evaluateTimeSlots(quick_charge_payload.selected_startTime, order_amount)
                    this.createBooking(order_id, quick_charge_payload);
                }
            }else {
            console.log(this.props.order_id,"order karle");

            var options = {
                description: 'Charging at '+ charging_station_info.name +' using charging point '+charging_point_info.name+'.',
                currency   : 'INR',
                key        :  key, //rzp_test_3whE64xyXFy3J5 - rzp_live_r9WlsJwZGngSBa
                // key        : 'rzp_test_3whE64xyXFy3J5',
                amount     : this.props.order_amount,
                name       : ' E-Fill Electric  ',
                order_id   : this.props.order_id,
                prefill    : {
                    contact: userinfo.phone,
                    name   : userinfo.name,
                    email  : userinfo.user_email
                },
                readonly    : {
                                    contact: "1",

                                },
                theme: {color: '#05294b'}
            }
            RazorpayCheckout.open(options).then((data) => {
                //Scheduled Charging
                if(processType == 1) {
                    this.createBooking(data.razorpay_order_id);
                }else {
                    quick_charge_payload.selected_endTime = this.evaluateTimeSlots(quick_charge_payload.selected_startTime, order_amount)
                    this.createBooking(order_id, quick_charge_payload);
                }
                ///////////////////Remove Charging station info, charging point info from state if successful////////////////
            }).catch((error) => {
                this.onTabChange('Amount')
                console.log(`Error: ${error.code} | ${error.description}`);
                showMessage({
                    message    : strings.paymentMode.warning,
                    description: Platform.OS == "ios" ? error.description :  error.error.description,
                    type       : "danger",
                });
            });
        }
    }

    }

    //Create a booking/Schedule
    createBooking = (order_id = this.props.order_id, quick_charge_payload = '') => {
        let { charging_station_info, charging_point_info, booking_info, book_charger_info } = this.props;
        let { type, input }                                                                 = this.state;
        let { order_amount }                                                                = this.props;
        let { processType }                                                                 = this.props.route.params;
         console.log('Connector id++ ',charging_point_info );

        let payload = {
            cs_id           : charging_station_info.id,
            cp_id           : charging_point_info.id,
            connector_type  : charging_point_info.connector_type_id,
            connector_id    : charging_point_info.connector_id,
            connector_no    : charging_point_info.connector_no,
            charge_date     : processType == 1 ? booking_info.selected_date     : quick_charge_payload.selected_date,
            charge_time     : processType == 1 ? booking_info.selected_startTime: quick_charge_payload.selected_startTime,
            order_id        : order_id,
            vehicle_id      : processType == 1 ? book_charger_info.vehicle      : quick_charge_payload.vehicle_id,
            end_time        : processType == 1 ? booking_info.selected_endTime  : quick_charge_payload.selected_endTime,
            charge_parameter: type.toLowerCase(),
            parameter_value : input,
            coupon_applied  : this.props.coupon_status ? '1'                    : '0',
            total_amount    : order_amount,
            booking_mode    : processType,
            unitPrice : charging_point_info.unitPrice,
            capacity : charging_point_info.capacity
        }
            console.log("payload",payload);
        HttpRequest.createBooking(payload, this.props.token)
        .then(res => {
            this.setState({ isLoading: false });
            const result = res.data;
            if (res.status == 200 && !result.error) {
                console.log("Create Booking/Schedule API Response ---------- ", result);
                this.setToInitialState();
                 this.props.navigation.replace('ChargingHistory', { id: result.order_id, status: 0});
                // this.props.navigation.push('ChargingHistory');

//                this.props.navigation.dispatch(
//                    CommonActions.reset({
//                      index : 1,
//                      routes: [
//                        { name: 'Home' },
//                        {
//                          name: 'ChargingHistory'
//                        },
//                      ],
//                    })
//                );
            } else {
                // console.log("Create Booking/Schedule API Error : ",result);
                showMessage({
                    message: strings.signIn.response.error.title,
                    description: result.message != undefined ? result.message: result.status,
                    type       : "danger",
                });
            }
        })
        .catch(err => {
            this.setState({ isLoading: false });
            console.log("Create Booking/Schedule API Catch Exception: ",err);
            showMessage({
                message: strings.signIn.response.error.title,
                description: strings.signIn.response.error.message,
                type: "danger",
            });
        });
    }
    //Set back initial state
    setToInitialState = () => {
        this.setState({
            isLoading        : false,
            type             : 'Amount',
            min_order_amount : this.props.charging_point_info.unitPrice,
            user_order_amount: '',
            user_order_unit  : '',
            user_order_time  : '',
            input            : '',
            height           : HEIGHT/2,
            mapHeight        : HEIGHT/2,
            order_id         : '',
        });
        this.props.couponStatus(false);
        // this.props.couponApplied('');
        this.props.orderAmount('');
    }

    onTabChange = (mode) => {
        let { type, input, user_order_unit } = this.state;
        let {  unitPrice } = this.props.charging_point_info;
        // console.log("mode input",type)
        if(mode == 'Amount'){
            this.setState({ type: mode, input: this.props.order_amount });
        } else if(mode == 'Unit'){
            this.setState({ type: mode, input: user_order_unit !== '' ? parseFloat(user_order_unit).toFixed(2) : this.props.order_amount/(unitPrice) });
            // console.log("unit input",input)
        }else {
            this.setState({ type: mode, input: input });
        }
    }

    onBalanceUpdate = (type, value) => {
        let { unitPrice } = this.props.charging_point_info;
        let { coupon_status } = this.props;
        let obj = {
            user_order_amount: '',
            user_order_unit  : '',
            user_order_time  : ''
        }
        if(coupon_status){
            this.removeSpecificCoupons(true);
        }
        if(type == 'Amount') {
            obj.user_order_amount = parseFloat(value).toFixed(2);
        } else if(type == 'Unit') {
            obj.user_order_amount = parseFloat(value * unitPrice).toFixed(2);
            obj.user_order_unit = value
        }

        obj.input = parseFloat(value).toFixed(2);
console.log('unitupdate',obj);
        this.setState(obj);
        this.props.orderAmount(obj.user_order_amount);
    }

    renderOptions = () => {
        let { type, input, min_order_amount } = this.state;
        if(type == 'Amount'){
            return (
                <View style={styles.row}>
                    { Amount.map((data) => {
                        return (
                            <TouchableOpacity onPress={() => this.onBalanceUpdate(type,data.value)} style={[styles.optionBox, data.value == input ? styles.active : null]} key={data.id}>
                                <Text style={[styles.optionText, data.value == input ? styles.activeText : null]}>{data.value}</Text>
                            </TouchableOpacity>
                        )
                        })
                    }
                </View>
            )
        } else if(type == 'Unit'){
            return (
                <View style={styles.row}>
                    { Unit.map((data) => {
                        return (
                            <TouchableOpacity onPress={() => this.onBalanceUpdate(type,data.value)} style={[styles.optionBox, data.value == input ? styles.active : null]} key={data.id}>
                                <Text style={[styles.optionText, data.value == input ? styles.activeText : null]}>{data.value}</Text>
                            </TouchableOpacity>
                        )
                        })
                    }
                </View>
            )
        } else {
            return (
                <View style={styles.row}>
                    { Time.map((data) => {
                        return (
                            <TouchableOpacity onPress={() => this.onBalanceUpdate(type,data.value)} style={[styles.optionBox, data.value == input ? styles.active : null]}  key={data.id}>
                                <Text style={[styles.optionText, data.value == input ? styles.activeText : null]}>{data.value}</Text>
                            </TouchableOpacity>
                        )
                        })
                    }
                </View>
            )
        }

    }

    closeSuccess = (chargingDetails = '', payloadData = '', type = '') => {
        this.setState({modalVisible: !this.state.modalVisible});
        if(type == 1){
           
            this.props.navigation.push('ChargingHistory');
        } else if(chargingDetails != '' && payloadData != '' && type == 2) {
            this.props.navigation.navigate('ChargingLog', { details: chargingDetails, payloadData: payloadData});
        } else {
            this.props.navigation.navigate("Home", {
                screen: "Home"
            });
        }
    }

    _onScroll(e){
        // from the nativeEvent we can get the contentOffsett
        var offset_y = e.nativeEvent.contentOffset.y;
        if (offset_y > 0 ) {
         if (this.state.height>=0){
          // we are scrolling down the list, decrease height of the empty view
          this.setState({height: this.state.height-offset_y});
         }
        }
        if (offset_y <0){
          if (this.state.height <= this.state.mapHeight){
            // we are scrolling up the list, increase size of empty view/map view
            this.setState({height: this.state.height-offset_y});
          }
        }
    }

    render() {
        // console.log(this.props,"value 1");
        let { navigation, charging_station_info, info } =  this.props;
        let { isLoading, type, input, order_id, min_order_amount, user_order_amount, user_order_unit,  user_order_time, inputEnabled } = this.state;
        let { processType , charging_station_data} = this.props.route.params;
        console.log("wall",charging_station_data.loc_icon);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.paymentMode.title} token={this.props.token}/>
                </View>
                <View style={styles.body}>
                    <View style={styles.row1}>
                        <Text style={styles.head} numberOfLines={1}>{charging_station_info.name}</Text>
                    </View>
                   {/* <View style={[styles.row, { paddingHorizontal: 20}]}>
                        <Text style={styles.text} numberOfLines={2}> <Icon name="ios-location" size={16} color="#5dda96"/> {charging_station_info.address} </Text>
                    </View>*/}

                    <View style={[styles.circle, styles.chargingStationDetailsContainer]}>
                        <View style={{backgroundColor:colors.HEADER_BACKGROUND,borderRadius:10,padding:10}}>
                        <Image source={{uri:charging_station_data.loc_icon}} style={styles.image}/></View>
                        <View style={styles.col}>
                            <Text style={styles.head} numberOfLines={1}>{this.props.charging_point_info.connector_type}</Text>
                            <View style={styles.subRows}>
                                <Text style={styles.symbol}>₹</Text>
                                <Text style={styles.text}> {this.props.charging_point_info.unitPrice} / kWh</Text>

                            </View>

                        </View>
                    </View>
                </View>
                <Modalize ref={this.modalizeRef} adjustToContentHeight={true} avoidKeyboardLikeIOS={true} alwaysOpen={HEIGHT/1.6} keyboardAvoidingBehavior={'position'} modalStyle={{ backgroundColor: '#113C60'}}>
                <View  style={styles.footer}>
                    <View style={{flexGrow: 1 }} onScroll={(e) => this._onScroll(e)} scrollEventThrottle={10}  >
                        <View style={[styles.row, styles.balanceContainer]}>
                            <View style={[styles.row, { justifyContent: 'flex-start'}]}>
                                <Image source={Images.paytm} style={styles.paymentLogo}/>
                                <Text style={styles.balanceText}>{strings.paymentMode.pay}:</Text>
                                <Text style={styles.symbol}>₹</Text>
                                <Text style={styles.balanceText}>{this.props.order_amount}</Text>
                            </View>
                            {/* <TouchableOpacity style={styles.applyCoupon} onPress={() => this.setState({ modalVisible: true})}> */}
                            {/*{ this.props.coupon_status == false ?
                            <TouchableOpacity style={styles.applyCoupon} onPress={() => navigation.navigate('Coupons')}>
                                <Text style={styles.couponText}>{strings.paymentMode.coupon}</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.removeCoupon} onPress={() => this.removeSpecificCoupons()}>
                                <Text style={styles.couponText}>{this.props.coupon_applied.code}</Text>
                                <Icon name="ios-close" size={18} color="#fff"/>
                            </TouchableOpacity>
                            }*/}
                        </View>
                        <View style={[styles.wallet_row, { justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }]}>
                                                    <Text style={styles.textBold}>{"Wallet Balance   :  RS.  "}{this.state.user_wallet_balance}</Text>
                                                    </View>
                        {/*<View style={[styles.wallet_row, { justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }]}>
                            <Text style={styles.textBold}>{strings.paymentMode.basis}</Text>
                        </View>*/}
                            <View style={[styles.row, { justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }]}>
                        {/* <TouchableOpacity onPress={() => this.onTabChange('Wallet')} style={styles.item}>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={ type == 'Wallet' ? ['#A4FF8B', '#22BC9D'] : ['#ffff','#fff']} >

                                    <Text style={styles.textDark}>{this.props.info.user_wallet_balance}</Text>
                                </LinearGradient>
                            </TouchableOpacity> */}


                            <TouchableOpacity onPress={() => this.onTabChange('Amount')} style={styles.item}>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={ type == 'Amount' ? ['#A4FF8B', '#22BC9D'] : ['#ffff','#fff']} style={styles.linearView}>
                                    <Text style={styles.textDark}>{strings.paymentMode.amount}</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() =>  this.onTabChange('Unit') } style={styles.item}>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={ type == 'Unit' ? ['#A4FF8B', '#22BC9D'] : ['#ffff','#fff']} style={styles.linearView}>
                                        <Text style={styles.textDark}>{strings.paymentMode.unit}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.row, { justifyContent: 'flex-start', alignItems: 'center', marginVertical: 0,  marginHorizontal: 5 }]}>
                        <TextInput
                            ref={this.inputRef}
                            autoCompleteType='off'
                            keyboardType={'numeric'}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            placeholderTextColor={'#fff'}
                            onChangeText={this.onChangeText}
                            maxLength={6}
                            onSubmitEditing={this.onSubmitInput}
                            value={String(input)}
                            style={styles.inputText}
                        />
                        <Text style={[styles.balanceText,{alignSelf: 'center'}]}>{type =='Amount' ? strings.paymentMode.amountSymbol : type =='Unit' ? strings.paymentMode.unitSymbol : strings.paymentMode.timeSymbol }</Text>
                        </View>
                        <View style={[styles.row, { justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5}]}>
                            {this.renderOptions(type)}
                        </View>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'flex-start'}]}>
                            <Text style={styles.noticeText}>{strings.paymentMode.notice}</Text>
                        </View>

                        <TouchableOpacity onPress={!isLoading ? this.onProceed1 : null }>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                            { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                                <Text style={styles.buttonText}>{strings.paymentMode.proceed}</Text>
                            }
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
                </Modalize>
            </View>
        )
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

export default connect(mapStateToProps,mapDispatchToProps)(PaymentGateway);

