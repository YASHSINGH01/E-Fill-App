import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Alert ,ScrollView, TextInput, Keyboard, ActivityIndicator, Dimensions, Platform } from 'react-native'
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
import styles from './style';

import { strings } from '../../utils/translations';

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


const HEIGHT = Dimensions.get('window').height;

class Wallet extends Component {
    constructor(props) {
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
            input: 0.00,
            height: HEIGHT / 2,
            mapHeight: HEIGHT / 2,
            order_id: '',
            userinfo:'',
            user_wallet_balance: ''
        };
    }

    componentDidMount = () => {
        this.walletOrder();
        this.userprofile();
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

    onBlur() {
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

    onSubmitInput() {
        let { type, input } = this.state;
        Keyboard.dismiss();
        if (input > 0) {
            this.onBalanceUpdate(type, input);
        }
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    //Create Wallet order through API
    walletOrder = () => {
        HttpRequest.walletOrder(this.props.token)
            .then(res => {

                const result = res.data;
                if (res.status == 200 && !result.error) {

                    this.setState({ user_wallet_balance: result.balance });

                } else {
                //    console.log("Wallet Updation Error : ", result);

                }
            })
            .catch(err => {
                this.setState({ isLoading: false });
               // console.log("walletOrder API Catch Exception: ", err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
    }

    //Create Razorypay order through API
    createOrderWallet = (price = '') => {
        let min_order_amount = '';
        let { input, type } = this.state;
        HttpRequest.createOrderWallet({ orderAmount: price != '' ? price : min_order_amount }, this.props.token)
            .then(res => {
                this.setState({ isLoading: false, input: price != '' ? price : min_order_amount });
                const result = res.data;
                if (res.status == 200 && !result.error) {
                    this.setState({ min_order_amount: min_order_amount, input: type == 'Amount' ? price != '' ? price : min_order_amount : input });
                    this.props.orderID(result.orderId);
                    if (price != '') {
                        this.initiateByPayment();
                    }
                } else {
                  //  console.log("Createwallet order API Error : ", result);
                    showMessage({
                        message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false });
               // console.log("Create wallet order API Catch Exception: ", err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
    }


    walletProceed = () => {
        let { order_amount } = this.props;
        let{input}= this.state;
        if(order_amount!=0 && input!=0){
        if (parseFloat(order_amount).toFixed(2)) {
            this.setState({ isLoading: true, order_amount: order_amount });
            this.createOrderWallet(this.props.order_amount);
        }
        }else {
            showMessage({
                message: strings.Wallet.warning,
                description: strings.Wallet.minAmount + " " ,
                type: "danger",
            });
        }
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

    initiateByPayment = () => {
        let { info } = this.props;
let{userinfo}=this.state;
        let key = info.is_live ? 'rzp_live_r9WlsJwZGngSBa' : 'rzp_live_r9WlsJwZGngSBa';
        var options = {
            currency: 'INR',
            key: key,
            amount: this.props.order_amount,
            name: ' E-Fill Electric  ',
            order_id: this.props.order_id,
            prefill: {
                contact: userinfo.phone,
                name: userinfo.name,
                email: userinfo.user_email
            },
         readonly: {
                        contact:"1",

                    },
            theme: { color: '#05294b' }
        }
        RazorpayCheckout.open(options).then((data) => {
            if (data.razorpay_order_id == this.props.order_id) {
                this.orderCreate(data);
            } else {

            }
        }).catch((error) => {
            this.onTabChange('Amount')
           // console.log(`Error: ${error.code} | ${error.description}`);
            showMessage({
                message: strings.paymentMode.warning,
                description: Platform.OS == "ios" ? error.description : error.error.description,
                type: "danger",
            });
        });
    }
    orderCreate = (data) => {
        let { order_amount } = this.props;
        HttpRequest.orderCreate({ razorpayId: data.razorpay_order_id, amount: order_amount, paymentId: data.razorpay_payment_id, signature: data.razorpay_signature }, this.props.token)
            .then(res => {
                const result = res.data;
                if (res.status == 200 && !result.error) {
                    this.props.navigation.goBack();
                } else {
            //        console.log("orderCreate  API Error : ", result);
                }
            })
            .catch(err => {
                this.setState({ isLoading: false });
             //   console.log("Create orderCreate API Catch Exception:1111 ", err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
    }



    // Set back initial state
    setToInitialState = () => {
        this.setState({
            isLoading: false,
            type: 'Amount',
            min_order_amount: this.props.charging_point_info.unitPrice,
            user_order_amount: '',
            input: '',
            height: HEIGHT / 2,
            mapHeight: HEIGHT / 2,
            order_id: '',
        });

        this.props.orderAmount('');
    }

    onTabChange = (mode) => {
        let { type, input } = this.state;
        if (mode == 'Amount') {
            this.setState({ type: mode, input: this.props.order_amount });

        } else {
            this.setState({ type: mode, input: input });
        }
    }

    onBalanceUpdate = (type, value) => {

        let obj = {
            user_order_amount: '',
        }

        if (type == 'Amount') {
            obj.user_order_amount = parseFloat(value).toFixed(2);
        }


        obj.input = parseFloat(value).toFixed(2);

        this.setState(obj);
        this.props.orderAmount(obj.user_order_amount);
    }

    renderOptions = () => {
        let { type, input } = this.state;
        // if (type == 'Amount') {
            return (
                <View style={styles.row}>
                    {Amount.map((data) => {
                        return (
                            <TouchableOpacity onPress={() => this.onBalanceUpdate(type, data.value)} style={[styles.optionBox, data.value == input ? styles.active : null]} key={data.id}>
                                <Text style={[styles.optionText, data.value == input ? styles.activeText : null]}>{data.value}</Text>
                            </TouchableOpacity>
                        )
                    })
                    }
                </View>
            )
        // } else {
        //     return (
        //         <View style={styles.row}>
        //             {Time.map((data) => {
        //                 return (
        //                     <TouchableOpacity onPress={() => this.onBalanceUpdate(type, data.value)} style={[styles.optionBox, data.value == input ? styles.active : null]} key={data.id}>
        //                         <Text style={[styles.optionText, data.value == input ? styles.activeText : null]}>{data.value}</Text>
        //                     </TouchableOpacity>
        //                 )
        //             })
        //             }
        //         </View>
        //     )
        // }

    }

    render() {
       // console.log(this.props,"value 1");
        let { navigation, charging_station_info, charging_point_info, info } =  this.props;
        let { isLoading, type, input, order_id, min_order_amount, user_order_amount, user_order_unit,  user_order_time, inputEnabled } = this.state;
       // let { processType } = this.props.route.params;


        console.log(this.props,"wallet");
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.sidebar.wallet} token={this.props.token}/>
                </View>
               <View style={styles.body}>

                                   <View style={[styles.row, styles.chargingStationDetailsContainer]}>
                                       <Image source={Images.wallet} style={styles.image}/>
                                   </View>
                                   <View style={[styles.wallet_row, { justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }]}>
                                   <Text style={styles.textBold}>{"E-Fill Credit   :  RS.  "}{this.state.user_wallet_balance}</Text>
                                  </View>
                                  <Text style={styles.textBold}>{"1 credit = RS. 1.00"}</Text>
                               </View>
                <Modalize ref={this.modalizeRef} adjustToContentHeight={true} avoidKeyboardLikeIOS={true} alwaysOpen={HEIGHT/1.9} keyboardAvoidingBehavior={'position'} modalStyle={{ backgroundColor: '#113C60'}}>
                <View  style={styles.footer}>
                    <View style={{flexGrow: 1 }} onScroll={(e) => this._onScroll(e)} scrollEventThrottle={10}  >


                       {/* <View style={[styles.row, { justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }]}>
                         <TouchableOpacity onPress={() => this.onTabChange('Wallet')} style={styles.item}>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={ type == 'Wallet' ? ['#A4FF8B', '#22BC9D'] : ['#ffff','#fff']} >

                                    <Text style={styles.textDark}>{this.props.info.user_wallet_balance}</Text>
                                </LinearGradient>
                            </TouchableOpacity> */}


                         {/*   <TouchableOpacity onPress={() => this.onTabChange('Amount')} style={styles.item}>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={ type == 'Amount' ? ['#A4FF8B', '#22BC9D'] : ['#ffff','#fff']} style={styles.linearView}>
                                    <Text style={styles.textDark}>{strings.paymentMode.amount}</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() =>  this.onTabChange('Unit') } style={styles.item}>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={ type == 'Unit' ? ['#A4FF8B', '#22BC9D'] : ['#ffff','#fff']} style={styles.linearView}>
                                        <Text style={styles.textDark}>{strings.paymentMode.unit}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>*/}
                        <View style={[styles.roww, { justifyContent: 'flex-start', alignItems: 'center', marginVertical: 0,  marginHorizontal: 5 }]}>
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
                        <View style={[styles.roww, { justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5}]}>
                            {this.renderOptions(type)}
                        </View>
                        {/* <View style={[styles.row, { justifyContent: 'center', alignItems: 'flex-start'}]}>
                            <Text style={styles.noticeText}>{strings.paymentMode.notice}</Text>
                        </View> */}

                        <TouchableOpacity onPress={!isLoading ? this.walletProceed : null}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                                    {isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                                       <Text style={styles.buttonText}>Add Money</Text>
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
//        coupon_status: state.coupon_status,
//        coupon_applied: state.coupon_applied,
//        charging_station_info: state.charging_station_info,
//        charging_point_info: state.charging_point_info,
//        book_charger_info: state.book_charger_info,
//        booking_info: state.booking_info
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

export default connect(mapStateToProps,mapDispatchToProps)(Wallet);

