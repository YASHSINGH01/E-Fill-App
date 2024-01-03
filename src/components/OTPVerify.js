import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Modal, ScrollView, Keyboard, ActivityIndicator, TextInput, Dimensions  } from 'react-native'
//Library
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "../utils/AsyncStorage";
//Api
import HttpRequest from "../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { userInfo, loginToken } from '../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
// Theme Colors
import COLORS from "../constants/colors";
import { strings } from '../utils/translations';
import { AuthContext } from "../utils/authContext";

const RESEND_OTP_TIME_LIMIT = 30; // 30 secs
const AUTO_SUBMIT_OTP_TIME_LIMIT = 4; // 4 secs

let resendOtpTimerInterval;
let autoSubmitOtpTimerInterval;

class OtpVerify extends Component {
    static contextType = AuthContext
    constructor(props){
        super(props);
        this.onFocus = this.onFocus.bind(this);
        
        this.mobileTextInputRef = React.createRef();
        this.firstTextInputRef = React.createRef();
        this.secondTextInputRef = React.createRef();
        this.thirdTextInputRef = React.createRef();
        this.fourthTextInputRef = React.createRef();
        this.fifthTextInputRef = React.createRef();
        this.sixthTextInputRef = React.createRef();
        this.autoSubmitOtpTimerIntervalCallbackReference = React.createRef();

        this.state = {
            isLoading: false,
            isVerifying: false,
            modalVisible: true,
            mobile: '',
            mobile_disable_status: true,
            otpVisible: false,
            submittingOtp: false,
            otpArray: ['', '', '', '', '', ''],
            attemptsRemaining: 3,
            resendButtonDisabledTime: RESEND_OTP_TIME_LIMIT,
            autoSubmitOtpTime: AUTO_SUBMIT_OTP_TIME_LIMIT,
            isEmpty: false
        };
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

    onChangeMobile = (text) => {
        this.setState({ mobile: text });
        if(text.length == 10) {
            this.registerGuestUser(text);
        }
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    closeModal = () => {
        clearInterval(resendOtpTimerInterval);
        this.setState({ modalVisible: false, otpVisible: false });
    }

    //Initialise OTP Handler
    initializeOTP = (mobile) => {
        this.autoSubmitOtpTimerIntervalCallbackReference.current = this.autoSubmitOtpTimerIntervalCallback;
        this.startResendOtpTimer();
        this.sendOTP(mobile);

    }
    
    //Send OTP API
    sendOTP = (phone) => {
        Keyboard.dismiss();
        
        HttpRequest.sendOtp({ phone: phone })
        .then(res => {
            // console.log("Send OTP api response ---------- ", res);
            const result = res.data;
            if (res.status == 200 && result.error == false) {
                showMessage({
                    message: "Success!",
                    description: "Well done! OTP Sent",
                    type: "success",
                });
               
                this.setState({ otpVisible: true, mobile_disable_status: false});
            } else {
                console.log("Send OTP  API Error : ",result);
                showMessage({
                   message: strings.error.title,
                    description: result.message != undefined ? result.message : result.status,
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

    //On Resend Button Submit
    onResendOtpButtonPress = () => {
        let { mobile } = this.state;
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
        HttpRequest.resendOtp({ phone: mobile })
        .then(res => {
             console.log("Resend OTP api response ---------- ", res);
            const result = res.data;
            if (res.status == 200 && result.error == false) {
                showMessage({
                    message: "Success!",
                    description: "OTP Sent Again.",
                    type: "success",
                });
            } else {
                 console.log("Resend OTP API Error : ",result);
                showMessage({
                   message: strings.error.title,
                    description: result.message != undefined ? result.message : result.status,
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

    //On OTP submit
    onSubmitButtonPress = () => {
        let errors = {};
        let  { otpArray } = this.state;
        otpArray
          .forEach((name) => {
            let value = name;
    
            if (!value) {
              errors[name] = 'Should not be empty';
            } 
          });
    
        this.setState({ errors });

        if(Object.entries(errors).length === 0){
          this.submitOtp();
        } else {
            showMessage({
               message: strings.error.title,
                description: "Please Enter Complete OTP",
                type: "danger",
            });
        }
    };

    //Verify OTP API
    submitOtp = () => {
        let { otpArray, mobile } = this.state;
        this.setState({ submittingOtp: true });

        HttpRequest.verifyOtp({ phone: mobile, otp: otpArray.join("") })
        .then(res => {
            this.setState({ submittingOtp: false });
            // console.log("Verify OTP api response ---------- ", res);
            const result = res.data;
            if (res.status == 200 && result.error == false) {
                this.onGuestLogin(mobile);
               
            } else {
                // console.log("Verify OTP API Error : ",result);
                showMessage({
                   message: strings.error.title,
                    description: result.message != undefined ? result.message : result.status,
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

    onGuestLogin = (phone) => {
        HttpRequest.login({ phone: phone, password: phone})
        .then(res => {
            // console.log("Login api response ---------- ", res.data);
            const result = res.data;
            if (res.status == 200 && !result.error) {
                showMessage({
                    message: "Success!",
                    description: "Well done! OTP Verified",
                    type: "success",
                });
            
                AsyncStorage.setLoginToken(result.token);
                this.props.loginToken(result.token);
    
                //Get Info of the Logged in user
                AsyncStorage.setUserInfo(result.detail);
                this.props.userInfo(result.detail);

                this.context.signIn();

            } else {
                // console.log("Login API Error : ",result);
                showMessage({
               message: strings.error.title,
                description: result.message != undefined ? result.message : result.status,
                type: "danger",
                });
            }
        })
        .catch(err => {
          console.log("Login API Catch Exception: ",err);
          showMessage({
           message: strings.error.title,
            description: strings.error.message,
            type: "danger",
          });
        });
    }
  

    registerGuestUser = (mobile) => {
        HttpRequest.signUp({ phone: mobile, role: 0 })
        .then(res => {
            this.setState({ isLoading: false });
            // console.log("Register Guest User api response ---------- ", res);
            const result = res.data;
            if (res.status == 201 && !result.error) {
                this.initializeOTP(mobile);
            } else {
                // console.log("Register Guest User API Error : ",result);
                showMessage({
               message: strings.error.title,
                description: result.message != undefined ? result.message : result.status,
                type: "danger",
                });
            }
        })
        .catch(err => {
          this.setState({ isLoading: false });
          console.log("Register Guest User  API Catch Exception: ",err);
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
                // else if (index === 5) {
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
        let { isLoading, isVerifying, otpVisible, errors = {}, mobile, mobile_disable_status, otpArray, submittingOtp, resendButtonDisabledTime } = this.state;
        let protectedNumber = mobile.replace(/^.{1,6}/, m=> "X".repeat(m.length));

        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={styles.scrollViewContainer}>
                {/* Mobile Number Verify & Update */}
                    <View style={styles.modalContainer}>
                        <View style={styles.formField}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.headerTitle}>{strings.profile.changeMobile}</Text>
                            </View>
                        </View>
                        {/* Mobile Number */}
                        <View style={styles.formField}>
                                    <Text style={styles.modalLabel}>{strings.profile.phoneNumber}</Text>
                                    <View style={[styles.inputContainer , { backgroundColor: !mobile_disable_status ? '#cccc' : '#ffff'  }]}>
                                        <TextInput
                                            ref={this.mobileTextInputRef}
                                            placeholder={strings.profile.phonePlaceholder}
                                            onFocus={this.onFocus}
                                            autoCapitalize='none'
                                            autoCompleteType='off'
                                            keyboardType={'numeric'}
                                            autoCorrect={false}
                                            maxLength={10}
                                            editable={mobile_disable_status}  
                                            onChangeText={this.onChangeMobile}
                                            value={mobile}
                                            autoFocus={mobile.length === 0 ? true : undefined}
                                            refCallback={this.refCallback(this.mobileTextInputRef)}
                                            placeholderTextColor={'#808080'}
                                            style={styles.inputModalText}
                                        />
                                    </View>
                                </View>
                        {otpVisible ?
                        <View style={styles.formField}>
                                    <Text style={styles.modalLabel}>{strings.enterOtp.title} </Text>
                                    <Text style={styles.modalLabel}>{strings.enterOtp.otpSentMessage} {protectedNumber}</Text>
                                    <View style={styles.otpContainer}>
                                    {[
                                        this.firstTextInputRef,
                                        this.secondTextInputRef,
                                        this.thirdTextInputRef,
                                        this.fourthTextInputRef,
                                        this.fifthTextInputRef,
                                        this.sixthTextInputRef
                                        ].map((textInputRef, index) => (
                                        <View style={styles.inputOtpContainer} key={'mykey' + index}>
                                            <TextInput
                                                ref={textInputRef}
                                                placeholder='*'
                                                value={otpArray[index]}
                                                onFocus={this.onFocus}
                                                onKeyPress={this.onOtpKeyPress(index)}
                                                onChangeText={this.onOtpChange(index)}
                                                keyboardType={'numeric'}
                                                maxLength={1}
                                                autoFocus={textInputRef === this.firstTextInputRef ? true : undefined}
                                                refCallback={this.refCallback(textInputRef)}
                                                style={styles.inputOtpText}
                                            />
                                        </View>
                                    ))}
                                    </View>
                                </View>
                        : null }
                        {otpVisible ?
                        <View style={styles.formField}>
                                    <TouchableOpacity onPress={!submittingOtp ? this.onSubmitButtonPress: null }> 
                                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.modalButton}>
                                        { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                                        <Text style={styles.buttonText}>{strings.enterOtp.verifyOTP}</Text>
                                        } 
                                        </LinearGradient>
                                    </TouchableOpacity>  
                                </View>
                        : null }
                        {otpVisible ?
                        <View style={styles.resendContainer} >
                                    <Text style={styles.resendText}>{strings.enterOtp.notReceivedCode} </Text>
                                    { resendButtonDisabledTime > 0 ? 
                                    <Text style={styles.centerAlignedText}>{strings.enterOtp.resendIn}
                                    <Text style={styles.bold}>{' ' + resendButtonDisabledTime}s</Text></Text>
                                    : 
                                    <TouchableOpacity onPress={this.onResendOtpButtonPress}>
                                        <Text style={styles.resendText}>{strings.enterOtp.resend}</Text>
                                    </TouchableOpacity> 
                                    }   
                                </View>
                        : null }
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 8,
        justifyContent: 'center', 
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    icon: {
        width: 30,
        height:  30,
        resizeMode: 'contain',
    },
    label: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
        marginLeft: 20,
    },
    signInButton: {
        width: '80%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 30
    },
    LinearGradient: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    buttonText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    inputText: {
        flex: 1,
        height:'100%',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        borderBottomColor: COLORS.DEFAULT,
        borderBottomWidth: 1,
        color: COLORS.DEFAULT,
        marginHorizontal: '5%',
    },
    dobText: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        justifyContent: 'center',
        alignItems: 'center',
        color: COLORS.DEFAULT,
    },
    error: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        marginLeft: 15,
        padding: 5,
        color:COLORS.ERROR,
    },
    changeButton: {
        width: '50%',
        height: 30,
    },
    changeGradient: {
        flex: 1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    changeText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },

    
    formField: {
        width: screenWidth - 40 ,
        margin: 5
    },
    modalHeaderContainer: {
        flex: 0.5 ,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    headerContainer: {
        flex:1,
        flexDirection: 'row',
        marginTop: 20,
        margin: 10,
        borderBottomWidth: 1, 
        borderColor: '#fff'
    },
    headerTitle: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        marginBottom: 5
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconView: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageIcon : {
        width: screenWidth/5,
        resizeMode: 'contain'
    },
    inputContainer: {
        width: screenWidth - 40 ,
        height: 60, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.black,
        borderRadius: 30,
    },
    inputModalText: {
        flex:1,
        height:'100%',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.black,
        marginLeft: '2%'
    },
    modalLabel: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        margin: 10,
        marginLeft: 15
    },
    modalButton: {
        flex:1,
        flexDirection: 'row',
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 30
    },

    otpContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputOtpContainer: {
        width: 40 ,
        height: 40, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.black,
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 15
    },
    inputOtpText: {
        width: '100%',
        height:'100%',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.black,
        textAlign: 'center'
    },
    resendText: {
        color: COLORS.DEFAULT,
        fontSize: 12,
        fontFamily: "Poppins-medium",
        
    },
    resendContainer : {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    centerAlignedText: {
        fontSize: 12,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center'
    },
    bold: {
        fontWeight: 'bold',
    }

})


const mapStateToProps = state => {
    
    return {
        info: state.info,
        token: state.token,
    };
};
  
  
const mapDispatchToProps = (dispatch) => {
    return {
        userInfo: bindActionCreators(userInfo, dispatch),
        loginToken: bindActionCreators(loginToken, dispatch)
    };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(OtpVerify);