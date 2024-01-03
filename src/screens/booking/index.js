//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator, TextInput, Image, Keyboard, FlatList, Linking, Modal, Platform, Alert } from 'react-native'
//Library
import Animated from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';
import RazorpayCheckout from 'react-native-razorpay';
import DatePicker from 'react-native-date-picker';
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from "react-native-flash-message";
import moment from "moment";
//Api
import HttpRequest from "../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { chargingPointInfo, bookChargerInfo, bookingInfo ,couponStatus, couponApplied } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Components
import Header from '../../components/Header';
//Styles
import styles from './styles';
import StarRating from 'react-native-star-rating';
import { Images } from "../../constants/";
import { strings } from '../../utils/translations';
import Coupons from '../coupons';


const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const Amount = [
    {
        id: '1',
        value: 100,
        unit: '/-'
    },
    {
        id: '2',
        value: 200,
        unit: '/-'
    },

    {
        id: '3',
        value: 500,
        unit: '/-'
    }
]

class Book extends Component {
    constructor(props) {
        super(props);

        this.inputRefs1 = { picker: null }
        this.inputRefs2 = { picker: null }
        this.inputRefs3 = { picker: null }
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitInput = this.onSubmitInput.bind(this);
        this.inputRef = this.updateRef.bind(this, 'input');
        this.modalizeRef = React.createRef();

        this.state = {
            isLoading: false,
            isLoading1: false,
            vehicle: '',
            type: '',
            dataa: '',
            disc_owner:'',
            input: 0.00,
            types: 'Amount',
            filter: '',
            disc_type:'',
            vehicleData: [],
            date: '',
            dateVal: '',
            final_to: 0,
            calloutVisible: false,
            min_order_amount: '',
            user_order_amount: '',
            order_id: '',
            station_name:'',
            capacity:'',
            rate:'',
            startTime: '',
            sub_total: '',
            total: '',
            new_coupon:'',
            connectorName:'',
            connectorType:"",
            tax: '',
            disc: 0,
            Open: false,
            userinfo: '',
            isDatePickerVisible: false,
            isStartTimePickerVisible: false,
            show: false,
            user_wallet_balance: '',
            mode: 'datetime',
            isAndroidVehiclePickerVisible: false,

        };
    }

    componentDidMount = () => {
        
        this.walletOrder();
       
        this.getAllVehicles();
         this.userprofile();
         this._checkData = this.props.navigation.addListener("focus", () => {
            let { coupon } = this.props.route.params;
        console.log('cc',coupon);
            {(coupon==undefined || coupon=="" )?null:this.coupon()}
            {this.state.disc_owner==""?this.setState({coupon_code:""}):null}
            });
       
         
         


    }
    componentWillUnmount() {
        this._checkData();
    }

    walletOrder = () => {
        
        let {item,coupon}=this.props.route.params;
        {item.vehicleType!=undefined?null:this.setState({vehicle:item.vehicle_name})}
        console.log('ufhfs',coupon)
        HttpRequest.new_walletOrder({cp_id:item.cp_id,con_id:item.system_con_id},this.props.token)
            .then(res => {

                const result = res.data;
                console.log('Wallet API',result)
                if (res.status == 200 && !result.error) {

                    this.setState({ user_wallet_balance: result.wallet_balance,capacity:result.capacity,rate:result.rate,station_name:result.station_name, connectorName:result.con_name,
                    connectorType:result.con_type, });

                } else {
                    //    console.log("Wallet Updation Error : ", result);

                }
            })
            .catch(err => {
                this.setState({ isLoading: false });
                 console.log("walletOrder API Catch Exception: ", err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
    }

    getAllVehicles = () => {

        const vehicles = [];
        HttpRequest.getVehicles(this.props.token)
            .then(res => {
                const result = res.data;
                //  console.log("vehivle", result);
                if (res.status == 200) {
                    // console.log("All Vehicles  API Response ---------- ", result);
                    result.data.map((item, i) => {
                        vehicles.push({
                            key: i,
                            label: item.model,
                            value: item.model,
                            image: item.model_icon
                        });
                    });

                    this.setState({ vehicleData: vehicles, dataa: result.data });
                } else {
                    console.log("All Vehicles API Error : ", result);
                }
            })
            .catch(err => {
                console.log("All Vehicles  API Catch Exception: ", err);
            });
    }

    initiateByPayment = (result) => {
        // console.log(result, "asdf");
        let { userinfo } = this.state;

        let key = "rzp_live_r9WlsJwZGngSBa";
        var options = {
            currency: 'INR',
            key: key,
            amount: result.amount,
            name: ' E-Fill Electric  ',
            order_id: result.orderId,
            prefill: {
                contact: result.user_contact,
                name: result.user_name,
                email: userinfo.user_email
            },
            readonly: {
                contact: "1",

            },
            theme: { color: '#05294b' }
        }
        // console.log(options, "razor value")
        RazorpayCheckout.open(options).then((data) => {
            // console.log(data, "dataaa");
            // console.log("valll", (data.razorpay_order_id == result.orderId));
            if (data.razorpay_order_id == result.orderId) {
                this.walletProceed();
            } else {

            }
        }).catch((error) => {
            // console.log(error, "error");
            this.onTabChange('Amount')
        });
    }

    getSelectedVehicle = (value) => {
        let { vehicleData } = this.state;
        let {item}=this.props.route.params;
        
        let selectedVehicle = vehicleData.find(item => item.value === value);
       
         return selectedVehicle != undefined ? selectedVehicle.label : strings.bookCharger.vehicleNumberPlaceholder;
    }

    onPickerValueChange = (value, index, input) => {
        const { vehicle, type, filter, chargingPointData, charging_points } = this.state;
        if (vehicle != value && input == 'vehicle') {

            if (Platform.OS == 'ios' || Platform.OS == 'android') {
                // console.log("picker",this.state)
                this.setState({ vehicle: value, isAndroidVehiclePickerVisible: false });
            } else {
                this.setState({ vehicle: value });
                this.inputRefs1.picker.togglePicker();
            }

        } else if (filter != value && input == 'filter') {
            if (Platform.OS == 'ios') {
                // console.log("picker",this.state)
                this.setState({ filter: value, isAndroidFilterPickerVisible: true });
            } else {
                this.setState({ filter: value });
                this.inputRefs3.picker.togglePicker();
            }
            if (value == 0 || value == 1) {
                //sort by capacity
                chargingPointData.sort((a, b) => { return parseInt(b.capacity) - parseInt(a.capacity) });

            } else {
                //sort by price
                chargingPointData.sort((a, b) => { return parseInt(a.unitPrice) - parseInt(b.unitPrice) });
            }
        }
    }





    open(type) {
        let { vehicle } = this.state;
        console.log('open');
        if (type == 'vehicle') {
            if (Platform.OS == "ios") {
                this.inputRefs1.picker.togglePicker(true);
            } else {
                this.setState({ isAndroidVehiclePickerVisible: true });
            }
        } else if (type == 'date') {
            this.showDatepicker();
        }
    }

    showMode = (currentMode) => {
        this.setState({
            mode: 'datetime',
            show: true
        })
    }

    setToInitialState = () => {
        this.setState({
            isLoading: false,
            types: 'Amount',
            min_order_amount: this.props.charging_point_info.unitPrice,
            user_order_amount: '',
            input: '',
            height: HEIGHT / 2,
            mapHeight: HEIGHT / 2,
            order_id: '',
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
        ['input']
            .map((name) => ({ name, ref: this[name] }))
            .forEach(({ name, ref }) => {
                if (ref.isFocused()) {
                    this.setState({ [name]: text });
                }
            });
    }

    onSubmitInput() {
        let { types, input } = this.state;
        Keyboard.dismiss();
        if (input > 0) {
            this.onBalanceUpdate(types, input);
        }
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    showDatepicker = () => {
        this.showMode('datetime');
    }


    formatDate = (date = '') => {
        return date;

    }

    userprofile = () => {
        let { userinfo } = this.state;
        HttpRequest.UserInfo(this.props.token)
            .then(res => {
                const result = res.data;
                 console.log("Response ---------- ", result);
                if (res.status == 200 && !result.error) {
                    this.setState({ userinfo: result.detail });
                    // console.log("Response2 ---------- ", this.state.userinfo);
                } else {
                    this.setState({ refreshing: false });
                    //    console.log("User Profile API Error : ", result);
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
    // getCurrentDate = () => {
    //     var date = new Date().getDate();
    //     var month = new Date().getMonth() + 1;
    //     var year = new Date().getFullYear();

    //     return year + '-' + ("0" + month).slice(-2) + '-' + ("0" + date).slice(-2);
    // }


    hideDatePicker = () => {
        this.setState({ Open: false });
    };

    handleDateConfirm = (date) => {
        let { dateVal } = this.state;
        // console.log(date,"dateeee");
        let as = String(date);
        // this.setState({ dateVal: as.slice(0, -15), Open: false });

        this.setState({ date: as.slice(0, 21), Open: false });
        // console.log(date,"dateeee");
    };
    onTabChange = (mode) => {
        // console.log(mode,'qwertyui');
        // console.log(this.state.user_order_amount,'edwed');


        let { input } = this.state;
        // console.log(input,'edwedasdfgh');
        if (mode == 'Amount') {
            this.coupon();
            this.setState({ types: mode, input: this.state.user_order_amount });

        } else {
            this.setState({ types: mode, input: input });
        }
    }

    onBalanceUpdate = (types, value) => {
        this.setState({ isLoading1: true })
        let obj = {
            user_order_amount: '',
        }

        if (types == 'Amount') {

            obj.user_order_amount = parseFloat(value).toFixed(2);
            this.setState({disc:0,final_to:0,sub_total: obj.user_order_amount})
            this.setState({ isLoading1: false })
        }


        obj.input = parseFloat(value).toFixed(2);

        this.setState(obj);
       

        // this.props.orderAmount(obj.user_order_amount);

    }

    onBlur() {
        this.onSubmitInput();
    }
    open1 = () => {
        let { Open } = this.state;
        // console.log('valuecgvhbjn');
        this.setState({ Open: true });
    }

    coupon = () => {
        let { new_coupon, discount, final_to } = this.state;
        let{coupon,item}=this.props.route.params;
         this.setState({new_coupon:coupon});
        console.log('coupon12',coupon)
        this.setState({ isLoading: true });
        HttpRequest.coupon_charger({ coupon_code: coupon, amount: this.state.input,cp_id:item.cp_id })
            .then(res => {
                const result = res.data;
                //  console.log("vehivle", result);
                if (res.status == 200 && !result.error) {
                    console.log("Coupon Response ---------- ", result);

                    this.setState({ sub_total: result.amount, disc: result.discount_value, disc_owner:result.code_owner,final_to: result.final_amount, disc_type:result.discount_type,isLoading: false });
                    console.log("coupan applied", this.state.final_to);
                    showMessage({
                        message: strings.success.title,
                        description: strings.success.couponSuccess,
                        type: "success",
                    });
                    // this.setState({ vehicleData: vehicles,dataa:result.data });
                } else {
                    this.setState({ isLoading: false });
                    this.setState({disc:0,input:this.state.sub_total, final_to:this.state.input,new_coupon:""})
                    console.log("Coupon API  : ", this.state.final_to);
                    showMessage({
                        message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false });
                console.log("Coupon API Catch Exception: ", err);
            });


    }


    walletProceed = () => {

        let { input, vehicle, date, connectorName,connectorType,new_coupon,final_to,disc_type ,disc_owner,disc} = this.state;
        let { item, charger } = this.props.route.params;
       
        console.log("sdfsdfdsdfd", item);
        if (vehicle != null && vehicle != "") {
            if (input != 0) {
                if (parseFloat(input).toFixed(2)) {
                    this.setState({ input: input });
                    let payLoad = {};

                    payLoad = {
                        cp_id: item.cp_id,
                        system_con_id:parseInt(item.connector_id),
                        dateTimeValue: date,
                        vehicle: vehicle,
                        Amount: input,
                        connectorName: connectorName,
                        connectorType: connectorType,
                        final_amount:final_to,
                        coupon_code:new_coupon,
                        discount_type:disc_type,
                        discount_value:disc,
                        code_owner:disc_owner,

                    };
                    console.log("hahaha", payLoad);
                    this.bookCharger(payLoad);
                }
            } else {

                showMessage({
                    message: strings.Wallet.warning,
                    description: strings.Wallet.minAmount + " ",
                    type: "danger",
                });
            }
        } else {
            showMessage({
                message: strings.Wallet1.warning,
                description: strings.Wallet1.minAmount,
                type: "danger",
            });
        }
    }


    bookCharger = (payLoad) => {
        let { navigation } = this.props;
        this.setState({ isLoading: true });
        HttpRequest.bookCharger(payLoad, this.props.token)
            .then(res => {

                const result = res.data;
                this.setState({ isLoading: false });
                 console.log("api result", result);
                if (res.status == 200 && !result.error) {
                  
                    // console.log("api result", result);
                    if (result.status == 10) {

                        if (result.tstatus == 1) {
                            this.props.navigation.replace('ChargingHistory');
                        }
                        else {
                            this.props.navigation.replace('ChargingHistory', { id: result.order_id, status: 0 });
                        }
                        // this.props.navigation.navigate('ChargingHistory');
                    }
                    else {
                        this.initiateByPayment(result);
                    }
                } else {
                    Alert.alert(
                        "",
                        result.message,
                        [
                            {
                                text: "OK",
                                onPress: () => { }
                            }
                        ],
                    )

                }
            })
            .catch(err => {
                this.setState({ isLoading: false });
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
    }

    openCallout = (item) => {
        console.log('pgg',item)
        this.props.navigation.navigate('Couponpage',{item:item});
        // this.setState({
        //     calloutVisible: true,

        // })
    }
    //Marker Callout Close Action
    closeCallout = () => {
        this.setState({
            calloutVisible: false,

        });
    }

    // WholeNews(item) {
    //     console.log("tmp",item);

    //     return item.connector.map((news, i)=>{
    //       return(
    //         <View key={i}>
    //             <Image source={{uri:news.icon}} style={styles.image1}/>
    //           {/* <Text>{news.icon}</Text> */}

    //         </View>
    //       );
    //     });
    //   }

    renderOptions = () => {
        let { types, input } = this.state;
        if (types == 'Amount') {
            return (
                <View style={styles.row}>
                    {Amount.map((data) => {
                        return (
                            <TouchableOpacity onPress={() => this.onBalanceUpdate(types, data.value)} style={[styles.optionBox, data.value == input ? styles.active : null]} key={data.id}>
                                <Text style={[styles.optionText, data.value == input ? styles.activeText : null]}>{data.value}</Text>
                            </TouchableOpacity>
                        )
                    })
                    }
                </View>
            )
        }

    }





    render() {
        let { navigation } = this.props;
         let { item, charger,coupon } = this.props.route.params;

        let { capacity,rate,station_name, isLoading1, vehicleData, final_to, calloutVisible,vehicle, date, sub_total, total, disc, tax, types, input, isLoading, isAndroidVehiclePickerVisible } = this.state;

         console.log("bookig",item);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.bookCharger.title} />
                </View>
                {calloutVisible &&
                    <Coupons navigation={this.props.navigation} cart={this.coupon} closeCallout={this.closeCallout} formData={this.state.new_coupon} />
                }
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>

                    <FlatList
                        ListHeaderComponent={

                            <View style={styles.scrollView}>
                                <View style={styles.formField}>
                                    <View style={styles.itemHeader}>
                                        <View style={styles.label}>
                                            <Text style={styles.textSign}>{station_name}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.iconView}>
                                                <View style={styles.iconContainer}>
                                                    <Image source={Images.chargingHistory} style={styles.imageIcon} />
                                                </View>
                                                <Text style={styles.essentialsLabel}>Capacity: {capacity} kW</Text>
                                            </View>

                                            <View style={styles.iconView}>
                                                <View style={styles.iconContainer}>
                                                    <Image source={Images.paytm} style={[styles.imageIcon, styles.paymentLogo]} />
                                                </View>
                                                <Text style={styles.essentialsLabel}>Rate: Rs.{rate}/kWH</Text>
                                            </View>


                                            {/* <Image source={{ uri: item.connectorImage }} style={styles.image} />
                                            <View style={[styles.widthh, styles.basicButton, styles.coloumn, { justifyContent: 'center' }]}>
                                                <Animated.Text style={styles.buttonText}>{item.connectorName}</Animated.Text>
                                                <Animated.Text style={styles.buttonText}>Rs.{item.cp_rate}/kWH</Animated.Text>
                                                <Animated.Text style={styles.buttonText}>{item.cp_power}/kWh</Animated.Text>

                                            </View> */}
                                        </View>

                                        <View style={styles.column}>
                                            <View style={[styles.row, { justifyContent: 'flex-start', marginTop: 10 }]}>
                                                <Image source={Images.wallet} style={styles.imagee} />

                                                <Animated.Text style={styles.buttonTextt} >{"E-Fill Credit :"}</Animated.Text>
                                                <Animated.Text style={styles.buttonTextt} >{this.state.user_wallet_balance}</Animated.Text>

                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {item.vehicleType!=undefined?
                                <View style={styles.selectBoxField}>
                                    <Icon size={30} name={'ios-car-outline'} color={'#000000'} style={styles.icon} />
                                   
                                    {Platform.OS == "ios" &&
                                        <TouchableOpacity activeOpacity={5} style={styles.pickerContainer} onPress={() => { this.open('vehicle') }}>
                                           
                                            <RNPickerSelect
                                                ref={el => { this.inputRefs1.picker = el }}
                                                useNativeAndroidPickerStyle={false}
                                                style={{ inputIOS: styles.IOSDark, inputAndroid: styles.androidDark }}
                                                placeholder={{ label: strings.bookCharger.vehicleModelPlaceholder, value: null }}
                                                onValueChange={(value, index) => this.onPickerValueChange(value, index, 'vehicle')}
                                                value={vehicle}
                                                items={vehicleData}
                                            />
                                            <Icon
                                                size={20}
                                                name={'ios-chevron-down'}
                                                color={'#05294b'}
                                            />
                                        </TouchableOpacity>
                                    }
                                    {Platform.OS == "android" &&
                                        <TouchableOpacity style={styles.pickerContainer} activeOpacity={1} onPress={() => { this.open('vehicle') }} >
                                            <View style={styles.androidRow}>
                                                <Text style={[styles.pickerText, vehicle != '' ? this.getSelectedVehicle(vehicle) != strings.bookCharger.vehicleModelPlaceholder ? styles.activePickerText : null : null]}>{vehicle != '' ? this.getSelectedVehicle(vehicle) : strings.bookCharger.vehicleModelPlaceholder}</Text>
                                                <Icon
                                                    size={20}
                                                    name={'ios-chevron-down'}
                                                    color={'#05294b'}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    }
                                </View>
                                :
                                <View style={styles.formField1}>
                                <View style={styles.inputContainer}>
                                  <TextInput
                                    
                                    placeholder={strings.corporateUser.name}
                                    autoCapitalize='none'
                                    autoCompleteType='off'
                                    editable={false}
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                   
                                    // onSubmitEditing={this.onSubmitName}
                                    returnKeyType='next'
                                    value={item.vehicle_name}
                                  
                                    style={[styles.inputText1]}
                                  />
                                </View>
                               
                              </View>
                              }

                                {vehicleData != '' &&
                                    <Modal animationType="fade" transparent={true} visible={isAndroidVehiclePickerVisible} >
                                        <TouchableOpacity activeOpacity={1} style={styles.modalBody} onPress={() => this.setState({ isAndroidVehiclePickerVisible: false })}>
                                            <View style={styles.modalContainer}>
                                                <ScrollView vertical contentContainerStyle={styles.modalScrollView}>
                                                    {/* <View style={[styles.resultItem, styles.resultItemBorder]}>
                                                        <Text style={[styles.resultText, styles.resultName, styles.resultPlaceholder]}>{strings.bookCharger.vehicleModelPlaceholder}</Text>
                                                    </View> */}
                                                    {vehicleData.map((item, i) => (
                                                        <TouchableOpacity activeOpacity={0.4} key={item.key} style={[styles.resultItem, i != vehicleData.length - 1 ? styles.resultItemBorder : null]} onPress={() => this.onPickerValueChange(item.value, item.key, 'vehicle')}>
                                                            <View style={styles.row}>
                                                                <Image source={{ uri: item.image }} style={styles.image} />
                                                                <Text style={[styles.resultText, styles.resultName]}>{item.label}</Text>

                                                            </View>
                                                            {/* <View style={styles.row}>
                                                           {this.WholeNews(dataa)}
                                                            </View> */}
                                                        </TouchableOpacity>
                                                    ))}
                                                </ScrollView>
                                            </View>
                                        </TouchableOpacity>
                                    </Modal>
                                }
                                {/* <View style={styles.formField}>
                                    <View style={styles.itemBoxContainer}>
                                        <View style={styles.itemBoxField}>
                                            <Icon size={30} name={'ios-calendar-outline'} color={'#000000'} style={styles.icon} />
                                            <TouchableOpacity activeOpacity={5} style={styles.pickerContainer} onPress={() => { this.open1() }}>
                                                <Text style={styles.pickerText}>{date !== '' ? this.formatDate(date) : strings.bookCharger.now}</Text>
                                                <Icon
                                                    size={20}
                                                    name={'ios-chevron-down'}
                                                    color={'#000000'}
                                                />
                                            </TouchableOpacity>

                                            <DatePicker
                                                modal
                                                placeholderTextColor={'#000000'}
                                                open={Open}
                                                mode="datetime"
                                                date={new Date()}
                                                minimumDate={new Date()}
                                                onConfirm={this.handleDateConfirm}
                                                onCancel={this.hideDatePicker}

                                            />

                                        </View>
                                    </View>
                                </View> */}


                                <View style={[styles.roww, { justifyContent: 'flex-start', alignItems: 'center', marginVertical: 0, marginHorizontal: 5 }]}>
                                    <Text style={styles.label2}>Enter Amount:         </Text>
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
                                    <Text style={[styles.balanceText, { alignSelf: 'center' }]}>{types == 'Amount' ? strings.paymentMode.amountSymbol : types == 'Unit' ? strings.paymentMode.unitSymbol : strings.paymentMode.timeSymbol}</Text>
                                </View>
                                <View style={[styles.roww, { justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5 }]}>
                                    {this.renderOptions(types)}
                                </View>

                                {input != 0 ?
                                    <TouchableOpacity style={styles.signInButton1} onPress={() => this.openCallout(item)}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#05294b', '#05294b']} style={styles.linearGradient1}>
                                       <View style={{flexDirection:'row'}}>
                                           
                                                <Text style={styles.signText1}>Apply Coupon</Text>
                                                <Image source={Images.discount} style={[styles.icon1]} />
                                                </View>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    : null}
                                {isLoading1 ?
                                    <View style={styles.noDataFoundContainer}>
                                        <ActivityIndicator size='large' color='#fff' />
                                    </View>
                                    :
                                    <View>
                                        {input != 0 ?
                                            <View>
                                                <View style={styles.row2}>

                                                    <Text style={{ color: '#fff', paddingRight: 100, justifyContent: 'flex-end', textAlign: 'left', fontWeight: 'bold', fontSize: 16 }}>
                                                        {strings.orderHistory.invoice.subTotal}</Text>
                                                    {sub_total != "" ?
                                                        <Text style={{ color: '#fff', justifyContent: 'flex-start', textAlign: 'right', fontWeight: 'bold', fontSize: 16 }}>
                                                            ₹ {sub_total}</Text>
                                                        :
                                                        <Text style={{ color: '#fff', justifyContent: 'flex-start', textAlign: 'right', fontWeight: 'bold', fontSize: 16 }}>
                                                            ₹ {input}</Text>
                                                    }
                                                </View>
                                                <View style={styles.row2}>

                                                    <Text style={{ color: '#fff', justifyContent: 'flex-end', textAlign: 'left', fontWeight: 'bold', fontSize: 16 }}>
                                                        {strings.orderHistory.invoice.discount}</Text>

                                                    <Text style={{ color: '#fff', justifyContent: 'flex-start', textAlign: 'right', fontWeight: 'bold', fontSize: 16 }}>
                                                        ₹ {disc}</Text>

                                                </View>


                                                <View style={styles.row2}>
                                                    <Text style={{ color: '#fff', justifyContent: 'flex-end', textAlign: 'left', fontWeight: 'bold', fontSize: 16 }}>
                                                        {strings.orderHistory.invoice.final}</Text>
                                                    {disc == "" ?
                                                        <Text style={{ color: '#fff', justifyContent: 'flex-start', textAlign: 'right', fontWeight: 'bold', fontSize: 16 }}>
                                                            ₹ {input}</Text>
                                                        :
                                                        <Text style={{ color: '#fff', justifyContent: 'flex-start', textAlign: 'right', fontWeight: 'bold', fontSize: 16 }}>
                                                            ₹ {final_to}</Text>
                                                    }
                                                </View>
                                            </View>
                                            : null}
                                    </View>
                                    }


                                <TouchableOpacity style={styles.signInButton} onPress={() => this.walletProceed()}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.linearGradient}>
                                        {isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                                            <Text style={styles.signText}>Book Now</Text>
                                        }
                                    </LinearGradient>
                                </TouchableOpacity>


                            </View>
                        }
                    />
                </Animatable.View>
            </View>
        )
    }
}

const mapStateToProps = state => {

    return {
        token: state.token,
        charging_station_info: state.charging_station_info,
        charging_point_info: state.charging_point_info,
        book_charger_info: state.book_charger_info,
        coupon_applied: state.coupon_applied
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        chargingPointInfo: bindActionCreators(chargingPointInfo, dispatch),
        bookChargerInfo: bindActionCreators(bookChargerInfo, dispatch),
        bookingInfo: bindActionCreators(bookingInfo, dispatch),
        couponApplied: bindActionCreators(couponApplied, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Book);

