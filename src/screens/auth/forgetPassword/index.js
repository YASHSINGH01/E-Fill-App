// Enter email & phone no to verify via otp and rest passwordTouchableOpacity
import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Keyboard, TextInput, ActivityIndicator } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Components
import Header from '../../../components/Header';
//Constants
import { Images } from "../../../constants/";
//API
import HttpRequest from '../../../utils/HTTPRequest';
//Styles
import styles from './styles';
import { strings } from '../../../utils/translations';

export default class forgetPassword extends Component {
    constructor(props){
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitPhone = this.onSubmitPhone.bind(this);

        this.phoneRef = this.updateRef.bind(this, 'phone');

        this.state = {
            isLoading: false,
            phone: "",
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

    onChangeText(text) {
        ['phone']
          .map((name) => ({ name, ref: this[name] }))
          .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
              this.setState({ [name]: text });
            }
        });
        if(text.length == 10){
          Keyboard.dismiss();
        }
    }
    
    onSubmitPhone() {
        this.phone.blur();
        this.onSubmit();
    }
    
    onSubmit() {
        let errors = {};
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
        ['phone']
          .forEach((name) => {
            let value = this.state[name];
    
            if (!value) {
              errors[name] = strings.error.emptyError;
            } 
            else {
              if ('phone' === name && value.length < 10) {
                errors[name] = strings.error.phoneError;
              }
            }
          });
    
        this.setState({ errors });
        if(Object.entries(errors).length === 0){
          this.onForgetPasswordPressed();
        } 
    }
  
    updateRef(name, ref) {
        this[name] = ref;
    }
  
    // Forget Password Through Api
    onForgetPasswordPressed = () => {
        let { phone } = this.state;
        this.setState({ isLoading: true });
        HttpRequest.checkPhoneNumber({ phone: phone})
        .then(res => {
          this.setState({ isLoading: false });
          // console.log("Phone Number Check api response ---------- ", res);
          const result = res.data;
          if (res.status == 200 && !result.error) {
              this.props.navigation.navigate("OtpVerification", { mobile: phone, type: 1 });
          }
          else {
            console.log("Phone Number Check API Error : ",result);
            showMessage({
              message: strings.forgetPassword.response.error.title,
              description: strings.forgetPassword.response.error.message,
              type: "danger",
            });
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

    render() {
        let { navigation } =  this.props;
        let { isLoading, errors = {}, phone } = this.state;
        const errorPhone = errors.phone == undefined ? '#808080' : '#ff0000';

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                  <Header navigation={navigation} type={strings.forgetPassword.title}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                  <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} contentContainerStyle={styles.scrollView}>
                    <View style={styles.ImageContainer}>
                        <Animatable.Image  animation="bounceIn" duration={1500} source={Images.forgetPassword} style={styles.getUser} resizeMode={'contain'}/>
                    </View>
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.forgetPassword.forgetPassword}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                ref={this.phoneRef}
                                placeholder={strings.forgetPassword.phonePlaceholder}
                                keyboardType="numeric"
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                keyboardType={'phone-pad'}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitPhone}
                                returnKeyType='next'
                                value={phone}
                                maxLength={10}
                                placeholderTextColor={errorPhone}
                                style={[styles.inputText,{ color: errorPhone}]}
                            />
                        </View>
                        {errors.phone != undefined &&
                            <Text style={styles.error}>{errors.phone}</Text>
                        }
                    </View>
                    <TouchableOpacity onPress={!isLoading ? this.onSubmit : null }>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                        { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                          <Text style={styles.buttonText}>{strings.forgetPassword.sendOTP}</Text>
                        } 
                        </LinearGradient>
                    </TouchableOpacity>  
                    </KeyboardAwareScrollView>
                </Animatable.View>
            </View>
        )
    }
}
