// Enter new password & confirm password Screen
//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage, hideMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//API
import HttpRequest from '../../../../utils/HTTPRequest';
//Components
import Header from '../../../../components/Header';
//Constants
import { Images } from "../../../../constants/";
//Styles
import styles from './styles';
import { strings } from "../../../../utils/translations";

export default class resetPassword extends Component {
    constructor(props){
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.onSubmitRepeatPassword = this.onSubmitRepeatPassword.bind(this);
    
        this.onAccessoryPress1 = this.onAccessoryPress1.bind(this);
        this.onAccessoryPress2 = this.onAccessoryPress2.bind(this);
    
        this.passwordRef = this.updateRef.bind(this, 'password');
        this.repeatPassRef = this.updateRef.bind(this, 'repeatPass');
    
        this.renderPasswordAccessory1 = this.renderPasswordAccessory1.bind(this);
        this.renderPasswordAccessory2 = this.renderPasswordAccessory2.bind(this);
    
        this.state = {
            isLoading: false,
            phone: "",
            password: "",
            repeatPass: "",
            secureTextEntry1: true,
            secureTextEntry2: true
        };
    }

    componentDidMount = () => {
      this.setState({
        phone: this.props.route.params.phone
      })
    }

    static getDerivedStateFromProps(props, state) {
      if (props.route.params.phone !== state.phone) {
        return {
          phone: props.route.params.phone
        }
    }  
      return null;
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
        ['password','repeatPass']
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
    
    onSubmitPassword() {
        this.repeatPass.focus();
    }
    
    onSubmitRepeatPassword() {
        this.repeatPass.blur();
        this.onSubmit();
    }
    
    onSubmit() {
        let errors = {};
    
        ['password','repeatPass']
          .forEach((name) => {
            let value = this.state[name];
    
            if (!value) {
              errors[name] = strings.error.emptyError;
            } 
            else {
              if ('password' === name && value.length < 6) {
                errors[name] = strings.error.passwordLengthError;
              } else if ('repeatPass' === name && value.length < 6) {
                errors[name] = strings.error.passwordLengthError;
              } else if('repeatPass' === name && value !== this.state.password){
                errors[name] = strings.error.passwordUnmatchedError;
              }
            }
          });
    
        this.setState({ errors });
        if(Object.entries(errors).length === 0){
          this.onResetPressed();
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

    // Reset Password Through Api
    onResetPressed = () => {
        this.setState({ isLoading: true });
        let { phone, password, repeatPass } = this.state;
        this.setState({ isLoading: true });
        HttpRequest.resetPassword({ phone:  phone, password: password, password_confirmation: repeatPass})
        .then(res => {
          this.setState({ isLoading: false });
          // console.log("Reset Password api response ---------- ", res);
          const result = res.data;
          if (res.status == 200 && !result.error) {
            showMessage({
              message: strings.newPassword.response.success.title,
              description:  strings.newPassword.response.success.message,
              type: "success",
            });
            this.props.navigation.navigate('Success');
          } else {
            // console.log("Reset Password API Error : ",result);
            showMessage({
              message: strings.error.title,
              description: strings.error.message,
              type: "danger",
            });
          }
        })
        .catch(err => {
          this.setState({ isLoading: false });
          console.log("Reset Password API Catch Exception: ",err);
          showMessage({
            message: strings.error.title,
            description: strings.error.message,
            type: "danger",
          });
        });
    };
    
    render() {
        let { navigation } =  this.props;
        let { isLoading, errors = {}, secureTextEntry1, secureTextEntry2, password, repeatPass } = this.state;
        const errorPassword = errors.password == undefined ? '#808080' : '#ff0000';
        const errorRepeatPassword = errors.repeatPass == undefined ? '#808080' : '#ff0000';

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                  <Header navigation={navigation} type={strings.newPassword.title}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                  <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} contentContainerStyle={styles.scrollView}>
                    <View style={styles.ImageContainer}>
                        <Animatable.Image  animation="bounceIn" duration={1500} source={Images.resetPassword} style={styles.resetPassword} resizeMode={'contain'}/>
                    </View>
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.newPassword.title}</Text>
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
                                
                                value={password}
                                onFocus={this.onFocus}
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
                        <Text style={styles.label}>{strings.newPassword.confirmPassword}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                ref={this.repeatPassRef}
                                placeholder='********' 
                                secureTextEntry={secureTextEntry2}
                                allowFontScaling={false} 
                                autoCapitalize='none'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                clearTextOnFocus={true}
                                value={repeatPass}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitRepeatPassword}
                                placeholderTextColor={errorRepeatPassword} 
                                style={[styles.inputText,{ color: errorRepeatPassword}]}/>
                                {this.renderPasswordAccessory2()}
                        </View>
                        { errors.repeatPass != undefined &&
                            <Text style={styles.error}>{errors.repeatPass}</Text>
                        }
                    </View>
                    <TouchableOpacity onPress={!isLoading ? this.onSubmit : null }>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                        { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                          <Text style={styles.buttonText}>{strings.newPassword.passwordChange}</Text>
                        } 
                        </LinearGradient>
                    </TouchableOpacity>  
                    </KeyboardAwareScrollView>
                </Animatable.View>
            </View>
        )
    }
}
