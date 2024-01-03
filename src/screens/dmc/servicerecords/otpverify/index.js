import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, TextInput, Keyboard, ActivityIndicator, KeyboardAvoidingView, Alert } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage } from "react-native-flash-message";
import { CommonActions } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Components
import Header from '../../../../components/Header';
//Redux
import { connect } from 'react-redux';
import { userInfo, loginToken, subscribed, buycharger } from '../../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Constants
import { Images } from "../../../../constants/";
//API
import HttpRequest from '../../../../utils/HTTPRequest';
//Styles
import styles from './styles';
import { strings } from "../../../../utils/translations";

import AsyncStorage from "../../../../utils/AsyncStorage";


const RESEND_OTP_TIME_LIMIT = 30; // 30 secs
const AUTO_SUBMIT_OTP_TIME_LIMIT = 4; // 4 secs

let resendOtpTimerInterval;
let autoSubmitOtpTimerInterval;

 class serviceotp extends Component {
    constructor(props){
        super(props);

        this.firstTextInputRef = React.createRef();
        this.secondTextInputRef = React.createRef();
        this.thirdTextInputRef = React.createRef();
        this.fourthTextInputRef = React.createRef();
        this.fifthTextInputRef = React.createRef();
        this.sixthTextInputRef = React.createRef();
        this.autoSubmitOtpTimerIntervalCallbackReference = React.createRef();
       
        this.state = {
            submittingOtp: false,
            phone: this.props.route.params.mobile,
            type: this.props.route.params.type,
            otpArray: ['', '', '', '', '', ''],
            attemptsRemaining: 3,
            passkey:'',
            resendButtonDisabledTime: RESEND_OTP_TIME_LIMIT,
            autoSubmitOtpTime: AUTO_SUBMIT_OTP_TIME_LIMIT,
            
            isEmpty: false
        };
    }

    componentDidMount = () => {
        this.dealerpasskey();

        this.autoSubmitOtpTimerIntervalCallbackReference.current = this.autoSubmitOtpTimerIntervalCallback;

        this.startResendOtpTimer();

        this.sendOTP();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.route.params.type !== state.type) {
            return {
                type: props.route.params.type
            }
        } 
        return null;
    }

    componentDidUpdate(prevProps) {
        if (this.props.route.params.mobile !== prevProps.route.params.mobile) {
            // this.sendOTP();
            // console.log('Component Did Update: ', this.props.route.params.mobile )
        }
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    componentWillUnmount = () => {
        clearInterval(resendOtpTimerInterval);
    }

    dealerpasskey(){
        AsyncStorage.getDealer_pass_key().then(result => {
            // console.log('toggle', val);
            if (result != null && result != '') {
                console.log('passkey', result);

                this.setState({
                    passkey: result
                });
                 this.getChargingStations();
            }

        });
    }
    sendOTP = () => {
        let { phone } = this.state;
        HttpRequest.serive_otp({ phone: phone })
        .then(res => {
            // console.log("Send OTP api response ---------- ", res);
            const result = res.data;
            if (res.status == 200 && !result.error) {
//            console.log("well done otp send part");
//                showMessage({
//                    message: strings.enterOtp.response.success.title,
//                    description: strings.enterOtp.response.success.message,
//                    type: "success",
//                });
            } else {
                // console.log("Send OTP  API Error : ",result);
                showMessage({
                    message: strings.enterOtp.response.error.title,
                    description: strings.enterOtp.response.error.message,
                    type: "danger",
                });
            }
        })
        .catch(err => {
            console.log("Send OTP  Catch Exception: ",err);
            showMessage({
                message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    }
   
    onSubmit = () => {
        let errors = {};
        ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']
          .forEach((name) => {
            let value = this.state[name];
    
            if (!value) {
              errors[name] = strings.error.emptyError;
            } 
          });
    
        this.setState({ errors });
        if(Object.entries(errors).length === 0){
          this.onVerifyOTP();
        } else {
            showMessage({
                message: strings.error.title,
                description: strings.error.enterOtpError,
                type: "danger",
            });
        }
    }

    startResendOtpTimer = () => {
        if (resendOtpTimerInterval) {
          clearInterval(resendOtpTimerInterval);
        }
        resendOtpTimerInterval = setInterval(() => {
            if (this.state.resendButtonDisabledTime <= 0) {
                clearInterval(resendOtpTimerInterval);
            } else {
                this.setState({
                    resendButtonDisabledTime: this.state.resendButtonDisabledTime - 1
                })
            }
        }, 1000);
    };

    autoSubmitOtpTimerIntervalCallback = () => {
        if (autoSubmitOtpTime <= 0) {
          clearInterval(autoSubmitOtpTimerInterval);
    
          // submit OTP
          onSubmitButtonPress();
        }
        this.setState({ autoSubmitOtpTime: autoSubmitOtpTime - 1});
    };

    startAutoSubmitOtpTimer = () => {
        if (autoSubmitOtpTimerInterval) {
          clearInterval(autoSubmitOtpTimerInterval);
        }
        autoSubmitOtpTimerInterval = setInterval(() => {
          autoSubmitOtpTimerIntervalCallbackReference.current();
        }, 1000);
    };

    refCallback = textInputRef => node => {
        textInputRef.current = node;
    };

    onResendOtpButtonPress = () => {
        let { phone } = this.state;
        // clear last OTP
        if (this.firstTextInputRef) {
            this.setState({
                otpArray : ['', '', '', '', '', '']
            });
          this.firstTextInputRef.current.focus();
        }
        this.setState({
            resendButtonDisabledTime: RESEND_OTP_TIME_LIMIT
        });
        this.startResendOtpTimer();
    
        // resend OTP Api call
        HttpRequest.serive_otp({ phone: phone })
        .then(res => {
            // console.log("Resend OTP api response ---------- ", res);
            const result = res.data;
            if (res.status == 200 && result.error == false) {
                showMessage({
                    message: strings.enterOtp.response.success.title,
                    description: strings.enterOtp.response.success.resend.message,
                    type: "success",
                });
            } else {
                // console.log("Resend OTP API Error : ",result);
                showMessage({
                    message: strings.enterOtp.response.error.title,
                    description: strings.enterOtp.response.error.message,
                    type: "danger",
                });
            }
        })
        .catch(err => {
            console.log("Resend OTP API Catch Exception: ",err);
            showMessage({
                message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    };

    onSubmitButtonPress = () => {
        let errors = {};
        let  { otpArray } = this.state;
        otpArray
          .forEach((name) => {
            let value = name;
    
            if (!value) {
              errors[name] = strings.error.emptyError;
            } 
          });
    
        this.setState({ errors });

        if(Object.entries(errors).length === 0){
          this.signUp();
        } else {
            showMessage({
                message: strings.error.title,
                description: strings.error.enterOtpError,
                type: "danger",
            });
        }
    };

    // API call
    submitOtp = () => {
        let {chessis_no,Service_Type,Service_Detail}=this.props.route.params;;
        let { otpArray, phone, type ,passkey} = this.state;
        // sconsole.log('formadata',formaData);
        let{props}=this;
        // this.setState({ submittingOtp: true });
        // console.log('otp',otpArray);
        HttpRequest.serive_register({ phone: phone,chessis_no:chessis_no,service_name:Service_Type, service_detail:Service_Detail,distributor_code:props.info.phone })
        .then(res => {
            this.setState({ submittingOtp: false });
            // console.log("Verify OTP api response ---------- ", res);
            const result = res.data;
            if (res.status == 200 && result.error == false) {
//            console.log("well done verified otp part");
this.props.navigation.navigate("Dealers");
//                showMessage({
//                    message: strings.enterOtp.response.success.title,
//                    description: strings.enterOtp.response.success.verified.message,
//                    type: "success",
//                });
               
            } else {
                // console.log("Verify OTP API Error : ",result);
                showMessage({
                    message: strings.enterOtp.response.error.title,
                    description: strings.enterOtp.response.error.verified.message,
                    type: "danger",
                });
            }
        })
        .catch(err => {
            this.setState({ submittingOtp: false });
            console.log("Verify OTP API Catch Exception: ",err);
            showMessage({
                message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    }

    signUp = () => {
        let { otpArray, phone, type } = this.state;
        this.setState({ submittingOtp: true });
        console.log('otp',otpArray);
       
        HttpRequest.serive_otpverify({ phone: phone, otp: otpArray.join("") })
        .then(res => {
            this.setState({ submittingOtp: false });
            const result = res.data;
            console.log('signup',result);
            if (res.status = 201 && !result.error) {
                // Alert.alert("OTP  is correct");
                this.submitOtp();
                    // this.props.navigation.dispatch(
                    //     CommonActions.reset({
                    //     index: 1,
                    //     routes: [
                    //         { name: 'Auth' },
                    //         {
                    //         name: 'SignIn',
                    //         params: { screen: "SignIn", status: 1, formData: formData },
                    //         },
                    //     ],
                    //     })
                    // );
            } else {
                // console.log("Register Self User API Error : ",result);
                showMessage({
                   message: strings.error.title,
                    description: result.message != undefined ? result.message : result.status,
                    type: "danger",
                });
            }
        })
        .catch(err => {
          console.log("Register Self User API Catch Exception: ",err);
          showMessage({
           message: strings.error.title,
            description: strings.error.message,
            type: "danger",
          });
        });
    }

    onOtpChange = index => {
        let { otpArray } = this.state;
        return value => {
            if (isNaN(Number(value))) {
                // do nothing when a non digit is pressed
                return;
            }
            const otpArrayCopy = otpArray.concat();
            otpArrayCopy[index] = value;
            this.setState({
                otpArray : otpArrayCopy
            });
    
            // auto focus to next InputText if value is not blank
            if (value !== '') {
                if (index === 0) {
                    this.secondTextInputRef.current.focus();
                } else if (index === 1) {
                    this.thirdTextInputRef.current.focus();
                } else if (index === 2) {
                    this.fourthTextInputRef.current.focus();
                } else if (index === 3) {
                    this.fifthTextInputRef.current.focus();
                } else if (index === 4) {
                    this.sixthTextInputRef.current.focus();
                }
                //  else if (index === 5) {
                //     Keyboard.dismiss(); 
                // }
            }
        };
    };

    //Backspace logic
    onOtpKeyPress = index => {
        let { otpArray } = this.state;
        return ({nativeEvent: {key: value}}) => {
        // auto focus to previous InputText if value is blank and existing value is also blank
        if (value === 'Backspace' && otpArray[index] === '') {
            if (index === 1) {
                this.firstTextInputRef.current.focus();
            } else if (index === 2) {
                this.secondTextInputRef.current.focus();
            } else if (index === 3) {
                this.thirdTextInputRef.current.focus();
            } else if (index === 4) {
                this.fourthTextInputRef.current.focus();
            } else if (index === 5) {
                this.fifthTextInputRef.current.focus();
            } 
            
            if (Platform.OS == 'android' && index > 0) {
            const otpArrayCopy = otpArray.concat();
            otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
            this.setState({
                otpArray : otpArrayCopy
            });
            }
        }
        };
    };

    render() {
        let { navigation } =  this.props;
        let {  mobile,chessis_no } = this.props.route.params;
        let { otpArray, submittingOtp, resendButtonDisabledTime } = this.state;
        console.log('mobile',this.props.route.params);
        let protectedNumber = mobile.replace(/^.{1,6}/, m=> "X".repeat(m.length));

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                  <Header navigation={navigation} type={strings.enterOtp.title}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} contentContainerStyle={styles.scrollView}>
                    <View style={styles.ImageContainer}>
                        <Animatable.Image  animation="bounceIn" duration={1500} source={Images.otp} style={styles.getUser} resizeMode={'contain'}/>
                    </View>
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.enterOtp.title}</Text>
                        <Text style={styles.text}>{strings.enterOtp.customer_otp+' '+protectedNumber+' '+strings.enterOtp.get}</Text>
                        <View style={styles.otpContainer} >
                        {[
                            this.firstTextInputRef,
                            this.secondTextInputRef,
                            this.thirdTextInputRef,
                            this.fourthTextInputRef,
                            this.fifthTextInputRef,
                            this.sixthTextInputRef
                            ].map((textInputRef, index) => (
                            <View style={styles.inputContainer} key={'mykey' + index}>
                                <TextInput
                                    ref={textInputRef}
                                    placeholder='*'
                                    value={otpArray[index]}
                                    onFocus={this.onFocus}
                                    onKeyPress={this.onOtpKeyPress(index)}
                                    onChangeText={this.onOtpChange(index)}
                                    keyboardType={'numeric'}
                                    maxLength={1}
                                    autoFocus={index === 0 ? true : undefined}
                                    refCallback={this.refCallback(textInputRef)}
                                    style={styles.inputText}
                                />
                            </View>
                        ))}
                        </View>
                    </View>
                    
                    <TouchableOpacity onPress={!submittingOtp ? this.onSubmitButtonPress: null }>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                        {submittingOtp ? <ActivityIndicator size='large' color='#fff' /> :
                          <Text style={styles.buttonText}>{strings.enterOtp.verifyOTP}</Text>
                        } 
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={styles.resendContainer} >
                        <Text style={styles.text}>{strings.enterOtp.notReceivedCode}</Text>
                        { resendButtonDisabledTime > 0 ? 
                        <Text style={styles.centerAlignedText}>{strings.enterOtp.resendIn} 
                        <Text style={styles.bold}>{' ' + resendButtonDisabledTime}</Text></Text>
                        : 
                        <TouchableOpacity onPress={this.onResendOtpButtonPress}>
                            <Text style={styles.resendText}>{strings.enterOtp.resend}</Text>
                        </TouchableOpacity> 
                        }   
                    </View>
                </KeyboardAwareScrollView>
                </Animatable.View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        info: state.info,
        token: state.token
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        userInfo: bindActionCreators(userInfo, dispatch),
        loginToken: bindActionCreators(loginToken, dispatch),
        subscribed: bindActionCreators(subscribed, dispatch),
    };
  }
  export default connect(mapStateToProps,mapDispatchToProps)(serviceotp);
  