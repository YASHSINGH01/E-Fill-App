TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, TextInput, CheckBox, ActivityIndicator ,Alert} from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import messaging from '@react-native-firebase/messaging';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage, hideMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Components
import Header from '../../../../components/Header';
import Checkbox from '../../../../components/Checkbox';
//API
import HttpRequest from '../../../../utils/HTTPRequest';
//Styles
import styles from './styles';

import { strings } from '../../../../utils/translations';

export default class SelfUser extends Component {
    constructor(props){
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitName = this.onSubmitName.bind(this);
        this.onSubmitPhone = this.onSubmitPhone.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.onSubmitEmail = this.onSubmitEmail.bind(this);
        this.onRefId = this.onRefId.bind(this);
    
        this.onAccessoryPress1 = this.onAccessoryPress1.bind(this);
        this.onAccessoryPress2 = this.onAccessoryPress2.bind(this);
    
        this.nameRef = this.updateRef.bind(this, 'name');
        this.phoneRef = this.updateRef.bind(this, 'phone');
        this.passwordRef = this.updateRef.bind(this, 'password');
        this.emailRef = this.updateRef.bind(this, 'email');
        this.refIdRef = this.updateRef.bind(this, 'refId');
    
        this.renderPasswordAccessory1 = this.renderPasswordAccessory1.bind(this);
        this.renderPasswordAccessory2 = this.renderPasswordAccessory2.bind(this);
    

        this.state = {
            secureTextEntry: true,
            isLoading: false,
            name: "",
            phone: "",
            password: "",
            repeatPass: "",
            email:"",
            refId:"",
            userInfo: null,
            deviceToken: null,
            loginToken: null,
            secureTextEntry1: true,
            secureTextEntry2: true,
            isSelected: false
        };
    }
    componentDidMount = () => {
        
      this.tokenn();
      
  }

  tokenn(){
    messaging().getToken().then(token => {
      // this.props.deviceToken(token);
      this.setState({deviceToken: token})
      console.log(this.state.deviceToken,'asdfgh');
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
        ['name', 'phone', 'email','password','refId']
          .map((name) => ({ name, ref: this[name] }))
          .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
              this.setState({ [name]: text });
            }
          });
    }
  
    onAccessoryPress1() {
        this.setState(({ secureTextEntry1 }) => ({ secureTextEntry1: !secureTextEntry1 }));
    }
    
    onAccessoryPress2() {
        this.setState(({ secureTextEntry2 }) => ({ secureTextEntry2: !secureTextEntry2 }));
    }
    
    onSubmitName() {
        this.phone.focus();
    }
    
    onSubmitPhone() {
        this.password.focus();
    }
    
    onSubmitPassword() {
        this.repeatPass.focus();
    }
    onSubmitEmail() {
      this.email.focus();
  }
  onRefId() {
          this.refral.focus();
        this.onSubmit();
    }
    
    onSubmit() {
      console.log('sign ue',);
        let errors = {};
        let { isSelected } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
        ['name', 'phone', 'password','email']
          .forEach((name) => {
            let value = this.state[name];
    
            if (!value) {
              errors[name] = strings.error.emptyError;
              console.log('sign ue1',);
            } 
            else {
              if ('phone' === name && value.length < 10 ) {
                errors[name] = strings.error.phoneError;
              } else if ('password' === name && value.length < 6) {
                errors[name] = strings.error.passwordLengthError;
              }
              //  else if ('repeatPass' === name && value.length < 6) {
              //   errors[name] = strings.error.passwordLengthError;
              // } else if('repeatPass' === name && value !== this.state.password){
              //   errors[name] = strings.error.passwordUnmatchedError;
              // }
              else if ('email' === name && reg.test(this.state.email)===false ){
                 console.log('sign ue',this.state.email);
                errors[name] = strings.error.emailLengthError;
               }
              //  else if ('refId' === name && value==) {
              //   errors[name] = strings.error.passwordLengthError;
              // }
            }
          });
    
        this.setState({ errors });
        if(Object.entries(errors).length === 0 && isSelected){
          console.log('sign ue3',);
          this.onSignupPressed();
        } else if(Object.entries(errors).length === 0 && !isSelected) {
          showMessage({
              message: strings.error.warningTitle,
              description: strings.error.termsAndConditions,
              type: "warning",
              duration: 2000
            });
      }
    }
  
    updateRef(name, ref) {
        this[name] = ref;
    }
  
    renderPasswordAccessory1() {
        let { secureTextEntry1 } = this.state;
    
        let name = secureTextEntry1?
          'visibility-off':
          'visibility';
    
        return (
          <MaterialIcon
            size={20}
            name={name}
            color={'#05294b'}
            style={styles.icon}
            onPress={this.onAccessoryPress1}
            suppressHighlighting={true}
          />
        );
    }
    
    renderPasswordAccessory2() {
        let { secureTextEntry2 } = this.state;
    
        let name = secureTextEntry2 ?
          'visibility-off':
          'visibility';
    
        return (
          <MaterialIcon
            size={20}
            name={name}
            color={'#05294b'}
            style={styles.icon}
            onPress={this.onAccessoryPress2}
            suppressHighlighting={true}
          />
        );
    }

    // Self User Signup Through Api
    onSignupPressed = () => {
      let { name, phone, password ,email,refId,deviceToken} = this.state;
      // this.setState({ isLoading: true });
              HttpRequest.checkPhoneNumber({ phone: phone})
              .then(res => {
                this.setState({ isLoading: false });
                //  console.log("Phone Number Check api response ---------- ", res);
                const result = res.data;
                console.log("Phone Number Check api response ---------- ", result);
                if (res.status == 200 && !result.error) {
                console.log("result",result);
                    Alert.alert("Alert",result.message);
                }
                else {
                    this.props.navigation.navigate("OtpVerification", { mobile: phone, type: 0, formData: { name: name, phone: phone, password: password,email:email,refId:refId, device_token:deviceToken,role: 1 } });
                }
              })
              .catch(err => {
                this.setState({ isLoading: false });
                console.log("Phone Number Check API Catch Exception: ",err);
                showMessage({
                  message: strings.signIn.response.error.title,
                  description: strings.signIn.response.error.message,
                  type: "danger",
                });
              });

    };

    handleCheckbox = (checkbox) => {
      this.setState({isSelected: checkbox });
    }

    labelCheck = () => {
      let { isSelected } = this.state;
      this.setState({isSelected: !isSelected});
    }
    
    render() {
        let { navigation } =  this.props;
        let { isLoading, errors = {}, secureTextEntry1, secureTextEntry2, name, refId,email,phone, password, repeatPass, isSelected } = this.state;
        const errorName = errors.name == undefined ? '#808080' : '#ff0000';
        const errorPhone = errors.phone == undefined ? '#808080' : '#ff0000';
        const errorPassword = errors.password == undefined ? '#808080' : '#ff0000';
        const errorRfId = errors.efid == undefined ? '#808080' : '#ff0000';
        const errorEmail = errors.email == undefined ? '#808080' : '#ff0000';

        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.welcome.createAccount}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                  <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} contentContainerStyle={styles.scrollView}>
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.selfUser.name}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                ref={this.nameRef}
                                placeholder={strings.selfUser.namePlaceholder}
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                // onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitName}
                                returnKeyType='next'
                                value={name}
                                placeholderTextColor={errorName}
                                style={[styles.inputText,{ color: errorName}]}
                            />
                        </View>
                        {errors.name != undefined &&
                        <Text style={styles.error}>{errors.name}</Text>
                        }
                    </View>
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.selfUser.phoneNumber}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                ref={this.phoneRef}
                                placeholder={strings.selfUser.phonePlaceholder}
                               
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                keyboardType={'phone-pad'}
                                maxLength={10}
                                enablesReturnKeyAutomatically={true}
                                // onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitPhone}
                                returnKeyType='next'
                                value={phone}
                                placeholderTextColor={errorPhone}
                                style={[styles.inputText,{ color: errorPhone}]}
                            />
                        </View>
                        {errors.phone != undefined &&
                            <Text style={styles.error}>{errors.phone}</Text>
                        }
                    </View>
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.selfUser.email}</Text>
                        <View style={styles.inputContainer}>
                        <TextInput
                                ref={this.emailRef}
                                placeholder='Enter you email address'
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                // onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitEmail}
                                returnKeyType='next'
                                value={email}
                                placeholderTextColor={errorEmail}
                                style={[styles.inputText,{ color: errorEmail}]}
                            />
                                
                        </View>
                        {errors.email != undefined &&
                        <Text style={styles.error}>{errors.email}</Text>
                        }
                    </View>
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.selfUser.password}</Text>
                        <View style={styles.inputContainer}>
                        <TextInput 
                                ref={this.passwordRef}
                                placeholder='********' 
                                secureTextEntry={secureTextEntry1}
                                allowFontScaling={false} 
                                autoCapitalize='none'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                clearTextOnFocus={true}
                                textContentType="oneTimeCode"
                                value={password}
                                // onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitPassword}
                                placeholderTextColor={errorPassword} 
                                style={[styles.inputText,{ color: errorPassword}]}/>
                                {this.renderPasswordAccessory1()}
                        </View>
                        { errors.password != undefined &&
                        <Text style={styles.error}>{errors.password}</Text>
                        }
                    </View>
                    <View style={styles.formField}>
                        <Text style={styles.label}>Referral Code</Text>
                        <View style={styles.inputContainer}>
                        <TextInput
                                ref={this.refIdRef}
                                placeholder='Enter you Referral code'
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                // onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onRefId}
                                returnKeyType='next'
                                value={refId}
                                // placeholderTextColor={errorRfId}
                                style={[styles.inputText,{ color: errorRfId}]}
                            />
                                
                        </View>
                        {/* {errors.email != undefined &&
                        <Text style={styles.error}>{errors.email}</Text> 
                        }*/}
                    </View>
                     <View style={styles.checkboxContainer}>
                                            <Checkbox onCheckBoxToggle={this.handleCheckbox} status={this.state.isSelected}/>
                                            <TouchableOpacity activeOpacity={1} onPress={() => this.labelCheck() }>
                                              <Text style={styles.checkboxLabel}>{strings.selfUser.iAccept}</Text>
                                            </TouchableOpacity>
                                        </View>
                    <TouchableOpacity onPress={!isLoading ? this.onSubmit : null }>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                        { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                          <Text style={styles.buttonText}>{strings.selfUser.registerButton}</Text>
                        } 
                        </LinearGradient>
                    </TouchableOpacity>
                    </KeyboardAwareScrollView>
                </Animatable.View>
            </View>
        )
    }
}

