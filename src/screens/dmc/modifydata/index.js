TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, TextInput, Image, CheckBox,Dimensions, ActivityIndicator, Alert } from 'react-native'
//Library
import messaging from '@react-native-firebase/messaging';
import * as Animatable from 'react-native-animatable';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage, hideMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Components
import Header from '../../../components/Header';

import { connect } from 'react-redux';
import { userInfo } from '../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//API
import HttpRequest from '../../../utils/HTTPRequest';
//Styles
import styles from './styles';

import AsyncStorage from "../../../utils/AsyncStorage";

import { strings } from '../../../utils/translations';
import { Images } from '../../../constants';
// import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import axios from "axios";
import { SelectList } from 'react-native-dropdown-select-list'

const { width, height } = Dimensions.get('window');
 class Updatedata extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitName = this.onSubmitName.bind(this);
    this.onSubmitBattery = this.onSubmitBattery.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onRefId = this.onRefId.bind(this);

    this.onAccessoryPress1 = this.onAccessoryPress1.bind(this);
    this.onAccessoryPress2 = this.onAccessoryPress2.bind(this);

    this.nameRef = this.updateRef.bind(this, 'customer_name');
    this.batteryRef = this.updateRef.bind(this, 'customer_contact');
    this.passwordRef = this.updateRef.bind(this, 'customer_doc_type');
    this.controllerRef = this.updateRef.bind(this, 'controller_no');
    this.convertorRef = this.updateRef.bind(this, 'convertor_no');
    this.motorRef = this.updateRef.bind(this, 'motor_no');
    this.ignitionRef = this.updateRef.bind(this, 'ignition_lock_no');
    this.differentialRef = this.updateRef.bind(this, 'differntial_no');
    this.fmRef = this.updateRef.bind(this, 'fm');
    this.rimRef = this.updateRef.bind(this, 'rim');
    this.speedometerRef = this.updateRef.bind(this, 'speedometer');
    
    this.front_shockerRef = this.updateRef.bind(this, 'front_shocker');
    this.tyreRef = this.updateRef.bind(this, 'tyre_no');
    this.throttleRef = this.updateRef.bind(this, 'throttle');
    this.hornRef = this.updateRef.bind(this, 'horn');
    this.chargerRef = this.updateRef.bind(this, 'charger');
    

    this.renderPasswordAccessory1 = this.renderPasswordAccessory1.bind(this);
    this.renderPasswordAccessory2 = this.renderPasswordAccessory2.bind(this);


    this.state = {
      secureTextEntry: true,
      isLoading: false,
      customer_name: "",
      customer_contact: "",
      document_type:[],
      customer_doc_type: "",
      chassis_no:"",
      controller_no:"",
      customer_doc_no: "",
      refId: "",
      convertor_no:"",
      motor_no:"",
      ignition_lock_no:"",
      differntial_no:"",
      fm:"",
      rim:"",
      speedometer:"",
      front_shocker:"",
      tyre_no:"",
      horn:"",
      charger:"",

      filePath: "",
      passkey: "",
      percentage:"",
      userInfo: null,
      loginToken: null,
      deviceToken: null,
      secureTextEntry1: true,
      secureTextEntry2: true,
      isSelected: false
    };
  }
  componentDidMount = () => {
    this.aisekaise();
    this.document();
    this._getChargingStation = this.props.navigation.addListener('focus', () => {
      AsyncStorage.getDealer_pass_key().then(result => {
        // console.log('toggle', val);
        if (result != null && result != '') {
          console.log('passkey', result);

          this.setState({
            passkey: result
          });
          // this.getChargingStations();
        }

      });

      // this.getCurrentLocation();
      // this.dealervalue();
      // this.getChargingStations();


    });
    //   this.tokenn();

  }

  componentWillUnmount() {
    this._getChargingStation();
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
    ['convertor_no','customer_contact','controller_no','motor_no','ignition_lock_no','differntial_no','fm','rim','speedometer',
    'tyre_no','front_shocker','throttle','horn','charger']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          console.log('iii',name);
          console.log('thkt',text);
          this.setState({ [name]: text });
        }
      });
  }
  aisekaise ()
  {
      let{props}=this;
      console.log('ppod',props.chessis);
    HttpRequest.dealer_sale_details({chessis_no:props.chessis})
    .then(res => {
      this.setState({ isLoading: false });
       console.log("Phone Number Check api response ---------- ", res);
      const result = res.data;
     console.log("Dealer slaes api response ---------- ", result);
      if (res.status == 200 && result.error==false) {
      //  console.log("service list",result.data[0].chassis_no);
       this.setState({chassis_no:result.data[0].chassis_no,customer_contact:result.data[0].battery_no,motor_no:result.data[0].motor_no,
        controller_no:result.data[0].controller_no,convertor_no:result.data[0].converter_no,ignition_lock_no:result.data[0].ignition_lock_no,
        ignition_lock_no:result.data[0].ignition_lock_no,differntial_no:result.data[0].differential_no,fm:result.data[0].fm_no,rim:result.data[0].rim_no,
        speedometer:result.data[0].speedometer_no,front_shocker:result.data[0].front_shocker_no,tyre_no:result.data[0].tyre_no,throttle:result.data[0].throttle_no,
        horn:result.data[0].horn_no,charger:result.data[0].charger_no});

      }
      else {
          Alert.alert("Alert",result.message);
          // this.props.navigation.navigate("OtpVerification", { mobile: phone, type: 0, formData: { name: name, phone: phone, password: password,email:email,refId:refId,device_token:deviceToken, role: 1 } });
      }
    })
    .catch(err => {
      this.setState({ isLoading: false });
      console.log("Dealer sales API Catch Exception: ",err);
      showMessage({
        message: strings.signIn.response.error.title,
        description: strings.signIn.response.error.message,
        type: "danger",
      });
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

  onSubmitBattery() {
    this.passwordRef.focus();
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
  tokenn() {
    messaging().getToken().then(token => {
      // this.props.deviceToken(token);
      this.setState({ deviceToken: token })
      console.log(this.state.deviceToken, 'asdfgh');
    });
  }

  onSubmit(item) {
    console.log('sign ue', this.state.passkey);

    let errors = {};
    let { isSelected } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //     ['customer_name', 'customer_contact','customer_doc_no']
    //       .forEach((name) => {
    //         let value = this.state[name];

    //         if (!value) {
    //           errors[name] = strings.error.emptyError;
    //           console.log('sign ue1',);
    //         } 
    //         else {
    //           if ('customer_contact' === name && value.length < 10 ) {
    //             errors[name] = strings.error.phoneError;
    //           } else if ('customer_name' === name && value.length < 6) {
    //             errors[name] = strings.error.name;
    //           }
    //            else if ('repeatPass' === name && value.length < 6) {
    //             errors[name] = strings.error.passwordLengthError;
    //           } else if('repeatPass' === name && value !== this.state.password){
    //             errors[name] = strings.error.passwordUnmatchedError;
    //           }
    // //         //   else if ('email' === name && reg.test(this.state.email)===false ){
    // //         //      console.log('sign ue',this.state.email);
    // //         //     errors[name] = strings.error.emailLengthError;
    // //         //    }
    // //           //  else if ('refId' === name && value==) {
    // //           //   errors[name] = strings.error.passwordLengthError;
    // //           // }
    //         }
    //       });

    //     this.setState({ errors });
    //     if(Object.entries(errors).length === 0 && isSelected){
    //       console.log('sign ue3',);
     this.onSignupPressed(item);
    //     } else if(Object.entries(errors).length === 0 && !isSelected) {
    //       showMessage({
    //           message: strings.error.warningTitle,
    //           description: strings.error.termsAndConditions,
    //           type: "warning",
    //           duration: 2000
    //         });
      // }
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  

  document ()
  {
    HttpRequest.document_type()
    .then(res => {
      this.setState({ isLoading: false });
      //  console.log("Phone Number Check api response ---------- ", res);
      const result = res.data;
      console.log("Service list api response ---------- ", result);
      if (res.status == 200 && result.error==false) {
      // console.log("service list",result.data);
       this.setState({document_type:result.data})
      // console.log(this.state.Service_Type,'service');
      //  this.props.navigation.navigate("serviceotp",{mobile:this.state.customer_contact,chessis_no:this.state.customer_name,Service_Type:this.state.Service_Type,Service_Detail:this.state.Service_Detail});
         
      }
      else {
          Alert.alert("Alert",result.message);
          // this.props.navigation.navigate("OtpVerification", { mobile: phone, type: 0, formData: { name: name, phone: phone, password: password,email:email,refId:refId,device_token:deviceToken, role: 1 } });
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

  }
  renderPasswordAccessory1() {
    let { secureTextEntry1 } = this.state;

    let name = secureTextEntry1 ?
      'visibility-off' :
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
      'visibility-off' :
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
  onSignupPressed = (item) => {

    let { chassis_no,charger,throttle,horn, tyre_no,front_shocker,controller_no, convertor_no, motor_no, ignition_lock_no, differntial_no,customer_doc_no, customer_contact, fm, rim, speedometer} = this.state;
    //  this.setState({chargingPointData:this.state.tax});
    HttpRequest.vehicledata_update({chessis_no:chassis_no,charger_no:charger,throttle_no:throttle,horn_no:horn, tyre_no:tyre_no,front_shocker_no:front_shocker,controller_no:controller_no, converter_no:convertor_no, motor_no:motor_no, ignition_lock_no:ignition_lock_no, differential_no:differntial_no, battery_no:customer_contact, fm_no:fm, rim_no:rim, speedometer_no:speedometer}).then(res=>{
      const result = res.data;
           
    if (res.status == 200 ) {
      this.props.navigation.navigate("Producthistory");
    }
  }).catch(err => {
    this.setState({ isLoading: false, refreshing: false });
    console.log("Charging Station API Catch Exception: ",err);
    // showMessage({
    //    message: strings.error.title,
    //     description: strings.error.message,
    //     type: "danger",
    // });
});
  
    
}

  

  // handleCheckbox = (checkbox) => {
  //   this.setState({ isSelected: checkbox });
  // }

  labelCheck = () => {
    let { isSelected } = this.state;
    this.setState({ isSelected: !isSelected });
  }

  render() {
    let { navigation } = this.props;
    let { item } = this.props.route.params;
    // console.log(item);
    let { isLoading, errors = {}, chassis_no,charger,throttle,horn, tyre_no,front_shocker,controller_no, convertor_no, motor_no, ignition_lock_no, differntial_no,customer_doc_no, customer_contact, fm, rim, speedometer ,refId} = this.state;
    const errorName = errors.customer_name == undefined ? '#808080' : '#ff0000';
    const errorPhone = errors.customer_contact == undefined ? '#808080' : '#ff0000';
    const errorPassword = errors.password == undefined ? '#808080' : '#ff0000';
    const errorRfId = errors.efid == undefined ? '#808080' : '#ff0000';
    const errorEmail = errors.email == undefined ? '#808080' : '#ff0000';
    //  console.log(errors.name);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header navigation={navigation} type={strings.dmc.soldForm.title} />
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} contentContainerStyle={styles.scrollView}>
            <View style={styles.formField}>
              <Text style={styles.label}>{strings.dmc.update.chassis_no}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={this.nameRef}
                  placeholder={strings.corporateUser.name}
                  autoCapitalize='none'
                  autoCompleteType='off'
                  editable={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  // onSubmitEditing={this.onSubmitName}
                  returnKeyType='next'
                  value={chassis_no}
                  placeholderTextColor={errorName}
                  style={[styles.inputText, { color: errorName }]}
                />
              </View>
              {errors.customer_name != undefined &&
                <Text style={styles.error}>{errors.customer_name}</Text>
              }
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>{strings.dmc.update.battery_no}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={this.batteryRef}
                  placeholder="Enter the battery no"
                  keyboardType="default"
                  autoCapitalize='none'
                  autoCompleteType='off'
                  autoCorrect={false}
                 
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  // onSubmitEditing={this.onSubmitBattery}
                  blurOnSubmit={false}
                  returnKeyType='next'
                  value={customer_contact}
                  placeholderTextColor={errorPhone}
                  style={[styles.inputText, { color: errorPhone }]}
                />
              </View>
              {errors.customer_contact != undefined &&
                <Text style={styles.error}>{errors.customer_contact}</Text>
              }
            </View>
            {/* <View style={styles.formField}>
                        <Text style={styles.label}>{strings.dmc.soldForm.doc_no}</Text>
                        <View style={styles.inputContainer}>
                        <TextInput
                                ref={this.emailRef}
                                placeholder='Enter documnet number'
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                returnKeyType='next'
                                value={customer_doc_no}
                                placeholderTextColor={errorEmail}
                                style={[styles.inputText,{ color: errorEmail}]}
                            />
                                
                        </View>
                        {errors.email != undefined &&
                        <Text style={styles.error}>{errors.email}</Text>
                        }
                    </View> */}
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.dmc.update.motor_no}</Text>
                        <View style={styles.inputContainer}>
                        <TextInput
                                ref={this.motorRef}
                                placeholder='Enter the motor no'
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                // onSubmitEditing={this.onRefId}
                                returnKeyType='next'
                                value={motor_no}
                                // placeholderTextColor={errorRfId}
                                style={[styles.inputText,{ color: errorRfId}]}
                            />
                                
                        </View>
                        {errors.email != undefined &&
                        <Text style={styles.error}>{errors.email}</Text> 
                        }
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>{strings.dmc.update.controller_no}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={this.controllerRef}
                  placeholder="Enter the Controller no"
                  autoCapitalize='none'
                  autoCompleteType='off'
                  autoCorrect={false}
                  keyboardType={'default'}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  // onSubmitEditing={this.onSubmitPhone}
                  returnKeyType='next'
                  value={controller_no}
                  placeholderTextColor={errorPhone}
                  style={[styles.inputText, { color: errorPhone }]}
                />
              </View>
              {errors.customer_contact != undefined &&
                <Text style={styles.error}>{errors.customer_contact}</Text>
              }
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>{strings.dmc.update.converter_no}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={this.convertorRef}
                  placeholder="Enter the Convertor no"
                  autoCapitalize='none'
                  autoCompleteType='off'
                  autoCorrect={false}
                  keyboardType={'default'}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  // onSubmitEditing={this.onSubmitPhone}
                  returnKeyType='next'
                  value={convertor_no}
                  placeholderTextColor={errorPhone}
                  style={[styles.inputText, { color: errorPhone }]}
                />
              </View>
              {errors.customer_contact != undefined &&
                <Text style={styles.error}>{errors.customer_contact}</Text>
              }
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>{strings.dmc.update.ignition_lock_no}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={this.ignitionRef}
                  placeholder="Enter the Ignition no"
                  autoCapitalize='none'
                  autoCompleteType='off'
                  autoCorrect={false}
                  keyboardType={'default'}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  // onSubmitEditing={this.onSubmitPhone}
                  returnKeyType='next'
                  value={ignition_lock_no}
                  placeholderTextColor={errorPhone}
                  style={[styles.inputText, { color: errorPhone }]}
                />
              </View>
              {errors.customer_contact != undefined &&
                <Text style={styles.error}>{errors.customer_contact}</Text>
              }
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>{strings.dmc.update.differential_no}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={this.differentialRef}
                  placeholder="Enter the Differential no"
                  autoCapitalize='none'
                  autoCompleteType='off'
                  autoCorrect={false}
                  keyboardType={'default'}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  // onSubmitEditing={this.onSubmitPhone}
                  returnKeyType='next'
                  value={differntial_no}
                  placeholderTextColor={errorPhone}
                  style={[styles.inputText, { color: errorPhone }]}
                />
              </View>
              {errors.customer_contact != undefined &&
                <Text style={styles.error}>{errors.customer_contact}</Text>
              }
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>{strings.dmc.update.fm_no}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={this.fmRef}
                  placeholder="Enter the F.M. no"
                  autoCapitalize='none'
                  autoCompleteType='off'
                  autoCorrect={false}
                  keyboardType={'default'}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                   onChangeText={this.onChangeText}
                  // onSubmitEditing={this.onSubmitPhone}
                  returnKeyType='next'
                  value={fm}
                  placeholderTextColor={errorPhone}
                  style={[styles.inputText, { color: errorPhone }]}
                />
              </View>
              {errors.customer_contact != undefined &&
                <Text style={styles.error}>{errors.customer_contact}</Text>
              }
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>{strings.dmc.update.rim_no}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={this.rimRef}
                  placeholder={strings.corporateUser.phoneNumber}
                  autoCapitalize='none'
                  autoCompleteType='off'
                  autoCorrect={false}
                  keyboardType={'default'}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  // onSubmitEditing={this.onSubmitPhone}
                  returnKeyType='next'
                  value={rim}
                  placeholderTextColor={errorPhone}
                  style={[styles.inputText, { color: errorPhone }]}
                />
              </View>
              {errors.customer_contact != undefined &&
                <Text style={styles.error}>{errors.customer_contact}</Text>
              }
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>{strings.dmc.update.speedometer_no}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={this.speedometerRef}
                  placeholder={strings.corporateUser.phoneNumber}
                  autoCapitalize='none'
                  autoCompleteType='off'
                  autoCorrect={false}
                  keyboardType={'default'}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  // onSubmitEditing={this.onSubmitPhone}
                  returnKeyType='next'
                  value={speedometer}
                  placeholderTextColor={errorPhone}
                  style={[styles.inputText, { color: errorPhone }]}
                />
              </View>
              {errors.customer_contact != undefined &&
                <Text style={styles.error}>{errors.customer_contact}</Text>
              }
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>{strings.dmc.update.front_shocker_no}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={this.front_shockerRef}
                  placeholder={strings.corporateUser.phoneNumber}
                  autoCapitalize='none'
                  autoCompleteType='off'
                  autoCorrect={false}
                  keyboardType={'default'}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  // onSubmitEditing={this.onSubmitPhone}
                  returnKeyType='next'
                  value={front_shocker}
                  placeholderTextColor={errorPhone}
                  style={[styles.inputText, { color: errorPhone }]}
                />
              </View>
              {errors.customer_contact != undefined &&
                <Text style={styles.error}>{errors.customer_contact}</Text>
              }
            </View>

            <View style={styles.formField}>
                        <Text style={styles.label}>{strings.dmc.update.tyre_no}</Text>
                        <View style={styles.inputContainer}>
                        <TextInput
                                ref={this.tyreRef}
                                placeholder='Enter documnet number'
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={this.onChangeText}
                                returnKeyType='next'
                                value={tyre_no}
                                placeholderTextColor={errorEmail}
                                style={[styles.inputText,{ color: errorEmail}]}
                            />
                                
                        </View>
                        {errors.email != undefined &&
                        <Text style={styles.error}>{errors.email}</Text>
                        }
                    </View>
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.dmc.update.throttle_no}</Text>
                        <View style={styles.inputContainer}>
                        <TextInput
                                ref={this.throttleRef}
                                placeholder='Temp. RC Number'
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                // onSubmitEditing={this.onRefId}
                                returnKeyType='next'
                                value={throttle}
                                // placeholderTextColor={errorRfId}
                                style={[styles.inputText,{ color: errorRfId}]}
                            />
                                
                        </View>
                        {errors.email != undefined &&
                        <Text style={styles.error}>{errors.email}</Text> 
                        }
            </View>
            <View style={styles.formField}>
                        <Text style={styles.label}>{strings.dmc.update.horn_no}</Text>
                        <View style={styles.inputContainer}>
                        <TextInput
                                ref={this.hornRef}
                                placeholder='Temp. RC Number'
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                // onSubmitEditing={this.onRefId}
                                returnKeyType='next'
                                value={horn}
                                // placeholderTextColor={errorRfId}
                                style={[styles.inputText,{ color: errorRfId}]}
                            />
                                
                        </View>
                        {errors.email != undefined &&
                        <Text style={styles.error}>{errors.email}</Text> 
                        }
            </View>
            <View style={styles.formField}>
                        <Text style={styles.label}>{strings.dmc.update.charger_no}</Text>
                        <View style={styles.inputContainer}>
                        <TextInput
                                ref={this.chargerRef}
                                placeholder='Temp. RC Number'
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                // onSubmitEditing={this.onRefId}
                                returnKeyType='next'
                                value={charger}
                                // placeholderTextColor={errorRfId}
                                style={[styles.inputText,{ color: errorRfId}]}
                            />
                                
                        </View>
                        {errors.email != undefined &&
                        <Text style={styles.error}>{errors.email}</Text> 
                        }
            </View>
              <TouchableOpacity onPress={!isLoading ? () => this.onSubmit(item) : null}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                {isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                  <Text style={styles.buttonText}>Submit</Text>
                }
              </LinearGradient>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </Animatable.View>
      </View>
    )
  }
}const mapStateToProps = state => {

  return {
    chessis: state.Chessis_no,
    info: state.info,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    userInfo: bindActionCreators(userInfo, dispatch),
   
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Updatedata);

