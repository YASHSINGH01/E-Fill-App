TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage, hideMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Components
import Header from '../../../../components/Header';
import Checkbox from '../../../../components/Checkbox';
//Constants
import { Images } from "../../../../constants/";
//API
import HttpRequest from '../../../../utils/HTTPRequest';
//Styles
import styles from './styles';
import { strings } from '../../../../utils/translations';

export default class guestUser extends Component {
    constructor(props){
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitPhone = this.onSubmitPhone.bind(this);
        this.onSubmitName = this.onSubmitName.bind(this);

        this.nameRef = this.updateRef.bind(this, 'name');
        this.phoneRef = this.updateRef.bind(this, 'phone');

        this.state = {
            isLoading: false,
            phone: "",
            password: "",
            userInfo: null,
            loginToken: null,
            isSelected: false
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
        ['name', 'phone']
          .map((name) => ({ name, ref: this[name] }))
          .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
              this.setState({ [name]: text });
            }
          });
    }

    onSubmitName() {
        this.phone.focus();
    }
    
    onSubmitPhone() {
        this.phone.blur();
        this.onSubmit();
    }
    
    onSubmit() {
        let errors = {};
        let { isSelected } = this.state;
    
        ['name', 'phone']
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
        if(Object.entries(errors).length === 0 && isSelected){
          this.onSignupPressed();
          // this.props.navigation.navigate("OtpVerification", { mobile: this.state.phone, type: 0 });
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
  
    // Guest Signup Through Api
    onSignupPressed = () => {
      let { name, phone } = this.state;
      this.props.navigation.navigate("OtpVerification", { mobile: phone, type: 0, formData: { name: name, phone: phone, role: 0 } });
    };

    handleCheckbox = (checkbox) => {
        this.setState({isSelected: checkbox});
    }

    labelCheck = () => {
      let { isSelected } = this.state;
      this.setState({isSelected: !isSelected});
    }

    render() {
        let { navigation } =  this.props;
        let { isLoading, errors = {}, name, phone, isSelected } = this.state;
        const errorName = errors.name == undefined ? '#808080' : '#ff0000';
        const errorPhone = errors.phone == undefined ? '#808080' : '#ff0000';

        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.guestSignupUser.title}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                  <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} contentContainerStyle={styles.scrollView}>
                    <View style={styles.ImageContainer}>
                        <Animatable.Image  animation="bounceIn" duration={1500} source={Images.guestUser} style={styles.getUser} resizeMode={'contain'}/>
                    </View>
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.guestSignupUser.name}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                ref={this.nameRef}
                                placeholder={strings.guestSignupUser.namePlaceholder}
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
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
                        <Text style={styles.label}>{strings.guestSignupUser.phoneNumber}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                ref={this.phoneRef}
                                placeholder={strings.guestSignupUser.phonePlaceholder}
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
                          <Text style={styles.buttonText}>{strings.guestSignupUser.registerButton}</Text>
                        } 
                        </LinearGradient>
                    </TouchableOpacity>  
                    <View style={styles.checkboxContainer}> 
                        <Checkbox onCheckBoxToggle={this.handleCheckbox} status={this.state.isSelected}/>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.labelCheck() }>
                          <Text style={styles.checkboxLabel}>{strings.guestSignupUser.iAccept}</Text>
                        </TouchableOpacity>
                    </View> 
                     
                    </KeyboardAwareScrollView>
                </Animatable.View>
            </View>
        )
    }
}
