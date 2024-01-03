TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, TextInput, BackHandler, ActivityIndicator } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import messaging from '@react-native-firebase/messaging';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from "../../../utils/AsyncStorage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EncryptedStorage from 'react-native-encrypted-storage';
//Redux
import { connect } from 'react-redux';
import { userInfo, loginToken } from '../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Components
import Header from '../../../components/Header';
//API
import HttpRequest from '../../../utils/HTTPRequest';
//Styles
import styles from './styles';
import { strings } from '../../../utils/translations';
import { AuthContext } from "../../../utils/authContext";

class SignIn extends Component {
    static contextType = AuthContext
    constructor(props){
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitPhone = this.onSubmitPhone.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);
  
        this.phoneRef = this.updateRef.bind(this, 'phone');
        this.passwordRef = this.updateRef.bind(this, 'password');
  
        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

        this.state = {
            secureTextEntry: true,
            isLoading: false,
            phone: '',
            password: '',
            skipLogin: '9891761273',
            skipPass: '12345678',
            userInfo: null,
            deviceToken:null,
            loginToken: null,
        };
    }

    componentDidMount = () => {
      this.tokenn();
      // console.log("Params on Mount: ", this.props.route.params.formData);
      if(this.props.route.params.formData != undefined){
        this.setState({
          phone: this.props.route.params.formData.phone,
          password: this.props.route.params.formData.password,
        });
        this.onLoginPressed(this.props.route.params.formData.phone, this.props.route.params.formData.password);
      }
    }

    tokenn(){
      messaging().getToken().then(token => {
        // this.props.deviceToken(token);
        this.setState({deviceToken: token})
        console.log(this.state.deviceToken,'asdfgh');
    });
    }

    // Function to use Login API
    onLoginPressed = (skipPhone = '', skipPass = '') => {
        let { phone, password, deviceToken } = this.state;
        this.setState({ isLoading: true });
        HttpRequest.login({ phone: skipPhone != '' ? skipPhone : phone, password: skipPass  != '' ? skipPass: password, device_token: deviceToken})
        .then(res => {
          this.setState({ isLoading: false });
         // console.log("Login api response ---------- ", res);
          const result = res.data;
          if (res.status == 200 && !result.error) {
            if(skipPhone == '' &&  skipPass == '' ){
//              showMessage({
//                message: strings.signIn.response.success.title,
//                description:  strings.signIn.response.success.message,
//                type: "success",
//              });
            }
            try {   
              EncryptedStorage.setItem(
                "user_session",
                JSON.stringify({
                  token : result.token,
                  info : result.detail,
                })
              );
              console.log(info,"info");
            }
            catch (error) {
           //   console.log("encrypted",error);
            }
            AsyncStorage.setUserInfo(result.detail);
            this.props.userInfo(result.detail);

            this.context.signIn();
          console.log("okk1",this.props.device_token);
          } else {
            console.log("Login API Error : ",result.message);
            showMessage({
             message: '',
                description: result.message != undefined ? result.message : result.status,
              type: "danger",
            });
          }
        })
        .catch(error => {
          console.log("SignIn: ", error);
          this.setState({ isLoading: false });
          if (error.response && error.response.status == '401') {
              showMessage({
                message: strings.signIn.response.error.title,
                description: strings.signIn.response.error.unAuthorized,
                type: "danger",
              });
          }else {
            showMessage({
              message: strings.signIn.response.error.title,
               description: strings.signIn.response.error.message,
              type: "danger",
          });
          }
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
        ['phone', 'password']
          .map((name) => ({ name, ref: this[name] }))
          .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
              this.setState({ [name]: text });
            }
          });
    }
  
    onAccessoryPress() {
        this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }
  
    onSubmitPhone() {
        this.passwordRef.focus();
    }
  
    onSubmitPassword() {
        this.onSubmit();
    }
  
    onSubmit() {
        
        let errors = {};
  
        ['phone', 'password']
          .forEach((name) => {
            let value = this.state[name];
  
            if (!value) {
              errors[name] = strings.error.emptyError;
            } 
            else {
              if ('password' === name && value.length < 6) {
                errors[name] = strings.error.passwordLengthError;
              } else if ('phone' === name && value.length < 10) {
                errors[name] = strings.error.phoneError;
              }
            }
          });
  
        this.setState({ errors });
        if(Object.entries(errors).length === 0){
          this.onLoginPressed();
        }
    }
  
    updateRef(name, ref) {
        this[name] = ref;
    }
  
    renderPasswordAccessory() {
        let { secureTextEntry } = this.state;
  
        let name = secureTextEntry?
          'visibility-off':
          'visibility';
  
        return (
          <MaterialIcon
            size={20}
            name={name}
            color={'#05294b'}
            style={styles.icon}
            onPress={this.onAccessoryPress}
            suppressHighlighting={true}
          />
        );
    }

    skipLogin = () => {
      let { skipLogin, skipPass } = this.state;
      this.onLoginPressed(skipLogin, skipPass);
    }
    
    render() {
        let { navigation } =  this.props;
        let { isLoading, errors = {}, secureTextEntry, phone, password } = this.state;
        const errorPhone = errors.phone == undefined ? '#808080' : '#ff0000';
        const errorPassword = errors.password == undefined ? '#808080' : '#ff0000';
        let { status } = this.props.route.params == undefined ? '0' : this.props.route.params ;
        // console.log('props1',this.state);
         console.log('props2',status);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                 <Header navigation={navigation} type={strings.signIn.title}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                  <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={styles.scrollView}>
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.signIn.phoneNumber}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                ref={this.phoneRef}
                                placeholder={strings.signIn.phonePlaceholder}
                                autoCompleteType='off'
                                autoCapitalize='none'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                keyboardType={'phone-pad'}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitPhone}
                                maxLength={10}
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
                        <Text style={styles.label}>{strings.signIn.password}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                ref={this.passwordRef}
                                placeholder='********' 
                                secureTextEntry={secureTextEntry}
                                allowFontScaling={false} 
                                autoCapitalize='none'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                clearTextOnFocus={true}
                                value={password}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitPassword}
                                placeholderTextColor={errorPassword} 
                                style={[styles.inputText,{ color: errorPassword}]}/>
                                {this.renderPasswordAccessory()}
                        </View>
                        { errors.password != undefined &&
                        <Text style={styles.error}>{errors.password}</Text>
                        }
                    </View>
                    <TouchableOpacity onPress={!isLoading ? this.onSubmit : null }>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                          { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                            <Text style={styles.buttonText}>{strings.signIn.title}</Text>
                          } 
                        </LinearGradient>
                    </TouchableOpacity>  
                    <TouchableOpacity onPress={() => {
                            navigation.navigate("ForgetPassword");
                        }}>
                      <Text style={styles.text}>{strings.signIn.recoverPassword}</Text>
                    </TouchableOpacity>
                   {/* <TouchableOpacity style={[styles.button,{ marginTop: 50 }]} onPress={() => {
                            navigation.navigate("GuestUserSignIn");
                        }}>
                        <Text style={styles.buttonText}>{strings.signIn.guestUser}</Text>
                    </TouchableOpacity>*/}
                    <Text style={styles.infoText} >
                     {strings.terms.initial}<Text style={{ fontSize: 12, color:'#A4FF8B',fontWeight: 'bold'  }} onPress={()=>this.props.navigation.navigate('LegalDocumentDetails', { item: { id: '2', title: strings.legalDocuments.terms } } )}>{strings.terms.termsConditions}</Text>
                     {'\n'}{strings.terms.concent}<Text style={{ fontSize: 12, color:'#A4FF8B', fontWeight: 'bold'  }} onPress={()=>this.props.navigation.navigate('LegalDocumentDetails', { item: { id: '1', title: strings.legalDocuments.privacy } } )}>{strings.terms.privacyPolicy}</Text>{strings.terms.end}
                     </Text>
                    </KeyboardAwareScrollView>
                </Animatable.View>
            </View>
        )
    }
}


const mapStateToProps = state => {
  
  return {
    token: state.token,
    device_token: state.device_token
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
      userInfo: bindActionCreators(userInfo, dispatch),
      loginToken: bindActionCreators(loginToken, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
