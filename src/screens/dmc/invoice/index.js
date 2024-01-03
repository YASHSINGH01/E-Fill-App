TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, TextInput, Image, CheckBox,Dimensions, ActivityIndicator, Alert } from 'react-native'
//Library
import messaging from '@react-native-firebase/messaging';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import { showMessage, hideMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Components
import Header from '../../../components/Header';
import Checkbox from '../../../components/Checkbox';
//API
import HttpRequest from '../../../utils/HTTPRequest';
//Styles
import styles from './styles';

import AsyncStorage from "../../../utils/AsyncStorage";

import { strings } from '../../../utils/translations';
import { Images } from '../../../constants';
import ImagePicker from 'react-native-image-crop-picker';
// import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import axios from "axios";
import { SelectList } from 'react-native-dropdown-select-list'

const { width, height } = Dimensions.get('window');

export default class Soldform extends Component {
  constructor(props) {
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

    this.nameRef = this.updateRef.bind(this, 'customer_name');
    this.phoneRef = this.updateRef.bind(this, 'customer_contact');
    this.passwordRef = this.updateRef.bind(this, 'customer_doc_type');
    // this.emailRef = this.updateRef.bind(this, 'customer_doc_no');
    this.refIdRef = this.updateRef.bind(this, 'refId');

    this.renderPasswordAccessory1 = this.renderPasswordAccessory1.bind(this);
    this.renderPasswordAccessory2 = this.renderPasswordAccessory2.bind(this);


    this.state = {
      secureTextEntry: true,
      isLoading: false,
      customer_name: "",
      customer_contact: "",
      document_type:[],
      customer_doc_type: "",
      repeatPass: "",
      customer_doc_no: "",
      refId: "",
      date: '',
      image1:'',
      filePath: "",
      passkey: "",
      percentage:"",
      Open: false,
      userInfo: null,
      loginToken: null,
      deviceToken: null,
      secureTextEntry1: true,
      secureTextEntry2: true,
      isSelected: false
    };
  }
  componentDidMount = () => {
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
    ['customer_name', 'customer_contact']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          console.log('iii',name);
          console.log('thkt',text);
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
  tokenn() {
    messaging().getToken().then(token => {
      // this.props.deviceToken(token);
      this.setState({ deviceToken: token })
      console.log(this.state.deviceToken, 'asdfgh');
    });
  }

  onSubmit(item) {
    console.log('sign ue', this.state.passkey);
    let { role} = this.props.route.params;
    let errors = {};
    let { isSelected } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        [ 'customer_contact']
          .forEach((name) => {
            let value = this.state[name];

            if (!value) {
              errors[name] = strings.error.emptyError;
              console.log('sign ue1',);
            } 
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
          });

        this.setState({ errors });
        if(Object.entries(errors).length === 0 ){
          console.log('sign ue3',);
if(role=="franchisee"){
this.onSignupfranchisee(item);
}else{
  this.onSignupPressed(item);
}
     
        } else if(Object.entries(errors).length === 0) {
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

  Scanner() {
    Alert.alert(
      'Choose Options',
      '',
      [
        {
          text: 'Cancel',
          style:'cancel',
          onPress: console.log('cancel'),
        },
        
        {
          text: 'Camera',
          onPress: () => this.camera(),
        },
        
        {
          text: 'Gallery',
          onPress: () => this.gallery(),
        },
       
      ],
      { cancelable: false }
    );

    // let options = {
    //   title: 'Select Image',
    //   base64: true,
    //   customButtons: [
    //     {
    //       name: 'customOptionKey',
    //       title: 'Choose Photo from Custom Option'
    //     },
    //   ],
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },

    // };

    // // const result = await launchImageLibrary(cameraType);
    // ImagePicker.showImagePicker(options, (response) => {
    //   console.log('Response = ', response);

    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log(
    //       'User tapped custom button: ',
    //       response.customButton

    //     );
    //     alert(response.customButton);
    //   } else {
    //     let source = response;
    //     // You can also display the image using data:
    //     // let source = {
    //     //   uri: 'data:image/jpeg;base64,' + response.data
    //     // };
    //     this.setState({ filePath: source });
    //     console.log("filepath", this.state.filePath.uri);
    //   }
    // });

  }
  gallery(){
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        includeBase64:true,
        cropping: true
      }).then(image => {
        console.log('image',image.path)
        this.setState({image1:image.path});
        this.setState({ filePath: image.data });
        console.log('image11',this.state.filePath)
      });
}
camera(){
    ImagePicker.openCamera({
        width: 300,
        height: 400,
        includeBase64:true,
        cropping: true
      }).then(image => {
        console.log('image',image.path)
        this.setState({image1:image.path});
        this.setState({ filePath: image.data });
        console.log('image11',this.state.filePath)
      });
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
  onSignupfranchisee = (item) => {

    let {chargingPointData, filePath} = this.state;
    //  this.setState({chargingPointData:this.state.tax});
     console.log('ok',this.state.filePath.fileName);
    if (filePath == null || filePath =="") {
       
      Alert.alert("Please Select ID proof");
      console.log('ok1');
  }else{
    console.log('pics',this.state.filePath);
      var pics=filePath;
      
      
      //If file selected then create FormData
      // const fileToUpload = filePath;
      // console.log('datas',filePath)
      // const files = new FormData();
      // // datas.append('name', 'Image Upload');
      // files.append(fileToUpload);
        console.log('datas',this.state.date)
      //  this.uploadProgress(files);
      this.setState({isLoading:true});
  // axios.post('https://iot.efillelectric.com/api/v1/franchisee-sell-record', {pics,dates:this.state.data,temp_no:this.state.refId,order_id: item.order_id, stock_id: item.stock_id, files:pics, distributor_code: this.state.passkey, customer_name: this.state.customer_name, customer_contact: this.state.customer_contact, customer_doc_type: this.state.customer_doc_type}, {
  //     onUploadProgress: progressEvent => {
  //         //  AsyncStorage.clearDealer_vehicle_storage();
  //       var percentComplete = progressEvent.loaded / progressEvent.total
  //       percentComplete = parseInt(percentComplete * 100);
  //       console.log(percentComplete);
  //     this.setState({percentage:percentComplete});
  //     // if(percentComplete=="100"){
  //     //     this.setState({isLoading:true});
          
  //     // }
      
  //     //   this.uploadProgress(percentComplete);
  //      // updateProgress(percentComplete);
  //     }
  //   }).then(response => {
  //     this.setState({isLoading:true})
  //     const result=response.data;
  //     console.log('ok2',response)
  // if(result.status==1 && result.error==false)
  // this.setState({isLoading:false});
  // this.props.navigation.navigate('Frann');
  // });
  var data = new FormData();
  data.append('image',pics);
  // data.append('dt',props.info.phone);
  // data.append('chargingPointData',JSON.stringify( chargingPointData));
  data.append('customer_doc_type',this.state.customer_doc_type);
  data.append( 'customer_contact', this.state.customer_contact);
  data.append('customer_name',this.state.customer_name,);
  data.append('distributor_code',this.state.passkey);
  data.append('order_id',item.order_id);
  data.append('stock_id',item.stock_id);
  data.append('dates',this.state.date)
  console.log('hfff',data);
  this.setState({ isLoading: true })
  fetch('https://iot.efillelectric.com/api/v1/franchisee-sell-record', {
                          method: 'POST',
                          body: data,
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data',
                          },
                        })
                        
                          .then((response) => response.json())
                          .then((response) => {
                            AsyncStorage.clearFranchisee_product();
                        //     console.log('upload succes', response);
                        this.setState({isLoading:false});
                        this.props.navigation.navigate('Frann');
                          })
                          .catch((error) => {
                            console.log('upload error', error);
                            alert('Upload failed!',error);
                        this.setState({isLoading:false});
                          });
        
    
}

  };

  // Self User Signup Through Api
  onSignupPressed = (item) => {

    let {chargingPointData, filePath} = this.state;
    //  this.setState({chargingPointData:this.state.tax});
     console.log('ok',this.state.filePath.fileName);
  //   if (filePath == null || filePath =="") {
       
  //     Alert.alert("Please Select ID proof");
  //     console.log('ok1');
  // }else{
    // console.log('pics',this.state.filePath);
      var pics=filePath;
      
      
      //If file selected then create FormData
      // const fileToUpload = filePath;
      // console.log('datas',filePath)
      // const files = new FormData();
      // // datas.append('name', 'Image Upload');
      // files.append(fileToUpload);
        console.log('datas',this.state.date)
      //  this.uploadProgress(files);
      this.setState({isLoading:true});
  axios.post('https://mobility.efillelectric.com/api/v1/distributor-sell-record', {dates:this.state.date,temp_no:this.state.refId,order_id: item.order_id, stock_id: item.stock_id, files:pics, distributor_code: this.state.passkey, customer_name: this.state.customer_name, customer_contact: this.state.customer_contact, customer_doc_type: this.state.customer_doc_type}, {
      onUploadProgress: progressEvent => {
          //  AsyncStorage.clearDealer_vehicle_storage();
        var percentComplete = progressEvent.loaded / progressEvent.total
        percentComplete = parseInt(percentComplete * 100);
        console.log(percentComplete);
      this.setState({percentage:percentComplete});
      // if(percentComplete=="100"){
      //     this.setState({isLoading:true});
          
      // }
      
      //   this.uploadProgress(percentComplete);
       // updateProgress(percentComplete);
      }
    }).then(response => {
      this.setState({isLoading:true})
      const result=response.data;
      console.log('ok2',response)
  if(result.status==1 && result.error==false)
  this.setState({isLoading:false});
  this.props.navigation.navigate('Dealers');
  });
    
// }

  };

  handleCheckbox = (checkbox) => {
    this.setState({ isSelected: checkbox });
  }

  labelCheck = () => {
    let { isSelected } = this.state;
    this.setState({ isSelected: !isSelected });
  }
  hideDatePicker = () => {
    this.setState({ Open: false });
};

handleDateConfirm = (date) => {
    let { dateVal } = this.state;
    // console.log(date,"dateeee");
    let as = String(date);
    // this.setState({ dateVal: as.slice(0, -15), Open: false });
   
    this.setState({ date: as.slice(0, 21), Open: false });
    // console.log(date,"dateeee");
};
open1 = () => {
  let { Open } = this.state;
  // console.log('valuecgvhbjn');
  this.setState({ Open: true });
}

formatDate = (date = '') => {
  return date;

}

  render() {
    let { navigation } = this.props;
    let { item ,role} = this.props.route.params;
    //  console.log('soldd',role);
    let { isLoading, errors = {}, image1, document_type, customer_name,date, filePath, refId,Open, percentage,customer_doc_no, customer_contact, customer_doc_type, repeatPass, isSelected } = this.state;
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
              <Text style={styles.label}>{strings.selfUser.name}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={this.nameRef}
                  placeholder={strings.corporateUser.name}
                  autoCapitalize='none'
                  autoCompleteType='off'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  // onSubmitEditing={this.onSubmitName}
                  returnKeyType='next'
                  value={customer_name}
                  placeholderTextColor={errorName}
                  style={[styles.inputText, { color: errorName }]}
                />
              </View>
              {errors.customer_name != undefined &&
                <Text style={styles.error}>{errors.customer_name}</Text>
              }
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>{strings.selfUser.phoneNumber}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={this.phoneRef}
                  placeholder={strings.corporateUser.phoneNumber}
                maxLength={10}
                  autoCapitalize='none'
                  autoCompleteType='off'
                  autoCorrect={false}
                  keyboardType={'phone-pad'}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  // onSubmitEditing={this.onSubmitPhone}
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
            <View style={styles.formField}>
                        <Text style={styles.label}>{strings.dmc.soldForm.select}</Text>
                        <View style={styles.inputContainer}>
                        <Icon size={30} name={'ios-calendar-outline'} color={'#000000'} style={styles.icon} />
                        <TouchableOpacity activeOpacity={5} style={styles.pickerContainer} onPress={() => { this.open1() }}>
                                                <Text style={styles.pickerText}>{date !== '' ? this.formatDate(date) : strings.bookCharger.now}</Text>
                                                <Icon
                                                style={{paddingLeft:40}}
                                                    size={20}
                                                    name={'ios-chevron-down'}
                                                    color={'#000000'}
                                                />
                                            </TouchableOpacity>
                        <DatePicker
                                                modal
                                                 placeholderTextColor={'#000000'}
                                                 textColor='#000000'
                                                open={Open}
                                                mode="datetime"
                                                date={new Date()}
                                                // minimumDate={new Date("2023-04-01")}
                                                onConfirm={this.handleDateConfirm}
                                                onCancel={this.hideDatePicker}

                                            />
                                
                        </View>
                        {errors.email != undefined &&
                        <Text style={styles.error}>{errors.email}</Text>
                        }
                    </View>
                    {role!=""?null:
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.dmc.temp_rc}</Text>
                        <View style={styles.inputContainer}>
                        <TextInput
                                ref={this.refIdRef}
                                placeholder={strings.dmc.temp_rc}
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onRefId}
                                returnKeyType='next'
                                value={refId}
                                // placeholderTextColor={errorRfId}
                                style={[styles.inputText,{ color: errorRfId}]}
                            />
                                
                        </View>
                        {errors.email != undefined &&
                        <Text style={styles.error}>{errors.email}</Text> 
                        }
            </View>
  }
            <View style={styles.formField}>
              <Text style={styles.label}>{strings.dmc.soldForm.doc_type}</Text>
              <View >
              <SelectList boxStyles={styles.box}
                          search={false}
                          setSelected={(data)=>this.setState({customer_doc_type:data})}
                          placeholder={strings.dmc.soldForm.doc_type}
                            data={document_type}
                           notFoundText="No data found"
                           dropdownItemStyles={styles.dropdown}
                            // save="service_name"
                          />
               
              </View>
             
            </View>
             
            {/* <View style={styles.checkboxContainer}>
                                            <Checkbox onCheckBoxToggle={this.handleCheckbox} status={this.state.isSelected}/>
                                            <TouchableOpacity activeOpacity={1} onPress={() => this.labelCheck() }>
                                              <Text style={styles.checkboxLabel}>{strings.selfUser.iAccept}</Text>
                                            </TouchableOpacity>
                                        </View> */}
            {filePath != '' ?
              <Image
                source={{ uri: image1 }}
                style={styles.imageStyle}
              />
              : null}
               <Text style={{textAlign:'center',fontWeight:'800',color:'#fff',marginTop:10}}>{percentage}</Text>
                    <View style={{paddingTop:10,justifyContent:'center',alignContent:'center',}}>
                    {percentage!=''?
                    <Progress.Bar progress={percentage}  width={width-40}/>
                    :null}
                    </View>
                    <View style={styles.availabilityIconContainer}>
            <TouchableOpacity onPress={!isLoading ? () => this.Scanner() : null}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.IconButton}>
                {isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                 <Image source={Images.camera} style={styles.imageIcon} />
                }
              </LinearGradient>
            </TouchableOpacity>
            </View>
            <Text style={{textAlign:'center',fontWeight:'800',color:'#fff',marginTop:5}}>{strings.dmc.poof}</Text>
            <TouchableOpacity onPress={!isLoading ? () => this.onSubmit(item) : null}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                {isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                  <Text style={styles.buttonText}>{strings.dmc.submit}</Text>
                }
              </LinearGradient>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </Animatable.View>
      </View>
    )
  }
}

