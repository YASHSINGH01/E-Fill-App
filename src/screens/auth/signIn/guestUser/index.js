TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, TextInput, BackHandler, ActivityIndicator } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from "../../../../utils/AsyncStorage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EncryptedStorage from 'react-native-encrypted-storage';
//Redux
import { connect } from 'react-redux';
import { userInfo, loginToken } from '../../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Components
import Header from '../../../../components/Header';
//API
import HttpRequest from '../../../../utils/HTTPRequest';
//Styles
import styles from './styles';
import { strings } from '../../../../utils/translations';
import { AuthContext } from "../../../../utils/authContext";

class GuestUserSignIn extends Component {
    static contextType = AuthContext
    constructor(props){
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitPhone = this.onSubmitPhone.bind(this);
       
        this.phoneRef = this.updateRef.bind(this, 'phone');

        this.state = {
            isLoading: false,
            phone: '',
            userInfo: null,
            loginToken: null,
        };
    }
    
    // Function to use Login API
    onLoginPressed = () => {
        let { phone } = this.state;
        this.setState({ isLoading: true });

        HttpRequest.login({ phone: phone, password: phone, device_token: this.props.device_token})
        .then(res => {
          this.setState({ isLoading: false });
          // console.log("Login api response ---------- ", res.data);
          const result = res.data;
          if (res.status == 200 && !result.error) {
            showMessage({
              message: strings.signIn.response.success.title,
              description:  strings.signIn.response.success.message,
              type: "success",
            });
          
            try {   
              EncryptedStorage.setItem(
                "user_session",
                JSON.stringify({
                  token : result.token,
                  info : result.detail,
                })
              );
            }
            catch (error) {
              console.log(error);
            }
  
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
          this.setState({ isLoading: false });
          console.log("Login API Catch Exception: ",err);
          showMessage({
            message: strings.signIn.response.error.title,
            description: strings.signIn.response.error.message,
            type: "danger",
        });
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
        ['phone']
          .map((name) => ({ name, ref: this[name] }))
          .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
              this.setState({ [name]: text });
            }
          });
    }
  
    onSubmitPhone() {
        this.password.focus();
    }
  
    onSubmit() {
        
        let errors = {};
  
        ['phone']
          .forEach((name) => {
            let value = this.state[name];
  
            if (!value) {
              errors[name] = strings.emptyError;
            } 
            else {
                if ('phone' === name && value.length < 10) {
                    errors[name] = 'The phone must be between 9 and 10 digits.';
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
    
    render() {
        let { navigation } =  this.props;
        let { isLoading, errors = {}, phone } = this.state;
        const errorPhone = errors.phone == undefined ? '#808080' : '#ff0000';
       
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                  <Header navigation={navigation} type={strings.guestUser.title}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                  <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} contentContainerStyle={styles.scrollView}>
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.guestUser.phoneNumber}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                ref={this.phoneRef}
                                placeholder={strings.guestUser.phonePlaceholder}
                                autoCompleteType='off'
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType={'phone-pad'}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                maxLength={10}
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
                            <Text style={styles.buttonText}>{strings.guestUser.signIn}</Text>
                          } 
                        </LinearGradient>
                    </TouchableOpacity>     
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

export default connect(mapStateToProps,mapDispatchToProps)(GuestUserSignIn);
