TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, TextInput, Image, StyleSheet,PermissionsAndroid,Dimensions, ActivityIndicator, Alert } from 'react-native'
//Library
import messaging from '@react-native-firebase/messaging';
import * as Animatable from 'react-native-animatable';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';
import { showMessage, hideMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Components
import Header from '../../../../components/Header';
import Checkbox from '../../../../components/Checkbox';
//API
import HttpRequest from '../../../../utils/HTTPRequest';
import { Images } from '../../../../constants';
import COLORS from "../../../../constants/colors";
import AsyncStorage from "../../../../utils/AsyncStorage";

import { strings } from '../../../../utils/translations';
//Redux
import { connect } from 'react-redux';
import { userInfo, Chessis_no } from '../../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';

import ImagePicker from 'react-native-image-crop-picker';
// import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import axios from "axios";
import { SelectList } from 'react-native-dropdown-select-list'

import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AVModeIOSOption,
    AudioSourceAndroidType,
  } from "react-native-audio-recorder-player";
  import { FlatGrid, SimpleGrid } from 'react-native-super-grid';

const audioRecorderPlayer = new AudioRecorderPlayer();

const { width, height } = Dimensions.get('window');
class freeservice extends Component {
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

    // this.nameRef = this.updateRef.bind(this, 'customer_name');
    this.phoneRef = this.updateRef.bind(this, 'customer_contact');
    this.passwordRef = this.updateRef.bind(this, 'customer_doc_type');
    // this.emailRef = this.updateRef.bind(this, 'customer_doc_no');
    this.refIdRef = this.updateRef.bind(this, 'refId');

   


    this.state = {
      secureTextEntry: true,
      isLoading: false,
    //   customer_name: "",
      customer_contact: "",
      document_type:[],
      customer_doc_type: "",
      repeatPass: "",
      customer_doc_no: "",
      refId: "",
      filePath: "",
      passkey: "",
      image1:"",
      audio:"",
      userInfo: null,
      
     recording:false,
      recordSecs: 0,
      recordTime: "00:00:00",
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: "00:00:00",
      duration: "00:00:00",
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.01);
  }
  componentDidMount = () => {
    {this.props.buycharger!=""?this.free_list():this.document()}
    // this.document();
    console.log('passkey', this.props.buycharger);
   this.requestLocationPermission();
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
    [ 'customer_contact']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
    
        console.log('write external stroage', grants);
    
        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
         
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

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
      // console.log(this.state.deviceToken, 'asdfgh');
    });
  }

onStartRecord = async () => {
   
    const result = await this.audioRecorderPlayer.startRecorder();
  this.audioRecorderPlayer.addRecordBackListener((e) => {
    // console.log(e,'e');
    this.setState({
      recordSecs: e.currentPosition,
      recordTime: this.audioRecorderPlayer.mmssss(
        Math.floor(e.currentPosition),
      ),recording:true
    });
    return;
  });
//    console.log('record',this.state.recordTime);
 
  };

onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
this.setState({audio:result,recording:false});
     console.log("audio result",result);
}
onStartPlay = async (e) => {
    console.log('onStartPlay');
    const msg = await this.audioRecorderPlayer.startPlayer();
    console.log('hdgg',msg);
    this.audioRecorderPlayer.addPlayBackListener((e) => {
  console.log('hd526g',e);
      this.setState({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration).toFixed(2)),
      });
// console.log('play',this.state.playTime);
// console.log('play1',this.state.duration);
      return;
    });
  };


onPausePlay = async (e) => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  onStopPlay = async (e) => {
    console.log("onStopPlay");
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };

  onSubmit() {
    console.log('sign ue');

    let errors = {};
    let { isSelected } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //     ['customer_name', 'customer_contact', 'password','customer_doc_no']
    //       .forEach((name) => {
    //         let value = this.state[name];

    //         if (!value) {
    //           errors[name] = strings.error.emptyError;
    //           console.log('sign ue1',);
    //         } 
    //         else {
    //           if ('phone' === name && value.length < 10 ) {
    //             errors[name] = strings.error.phoneError;
    //           } else if ('password' === name && value.length < 6) {
    //             errors[name] = strings.error.passwordLengthError;
    //           }
    //           //  else if ('repeatPass' === name && value.length < 6) {
    //           //   errors[name] = strings.error.passwordLengthError;
    //           // } else if('repeatPass' === name && value !== this.state.password){
    //           //   errors[name] = strings.error.passwordUnmatchedError;
    //           // }
    //         //   else if ('email' === name && reg.test(this.state.email)===false ){
    //         //      console.log('sign ue',this.state.email);
    //         //     errors[name] = strings.error.emailLengthError;
    //         //    }
    //           //  else if ('refId' === name && value==) {
    //           //   errors[name] = strings.error.passwordLengthError;
    //           // }
    //         }
    //       });

    //     this.setState({ errors });
    //     if(Object.entries(errors).length === 0 && isSelected){
    //       console.log('sign ue3',);
    this.onSignupPressed();
    //     } else if(Object.entries(errors).length === 0 && !isSelected) {
    //       showMessage({
    //           message: strings.error.warningTitle,
    //           description: strings.error.termsAndConditions,
    //           type: "warning",
    //           duration: 2000
    //         });
    //   }
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  Scanner() {
// console.log('scan');
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
    //   // console.log('Response = ', response);

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
    let { items } = this.props.route.params;
    HttpRequest.free_service({ status: items.service_no })
    .then(res => {
      this.setState({ isLoading: false });
      //  console.log("Phone Number Check api response ---------- ", res);
      const result = res.data;
      console.log("Free Service list api response ---------- ", result);
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

  free_list ()
  {
    let { items } = this.props.route.params;
    HttpRequest.charger_free_service({ status: items.service_no })
    .then(res => {
      this.setState({ isLoading: false });
      //  console.log("Phone Number Check api response ---------- ", res);
      const result = res.data;
      console.log("Free Service list api response ---------- ", result);
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

 

  // Self User Signup Through Api
  onSignupPressed = () => {
let {props}=this;
console.log('redux',props);
    let {chargingPointData, filePath} = this.state;
    //  this.setState({chargingPointData:this.state.tax});
    // console.log('ok',this.state.filePath.fileName);
    if (filePath == null || filePath =="") {
       
      Alert.alert("Please Upload the Damage Part Image");
      console.log('ok1');
  }else{
    // console.log('pics',this.state.filePath);
      var pics=filePath;
      this.setState({isLoading:true});
      var data = new FormData();
data.append('image',pics);
{props.buycharger!=""?data.append('chargerPointSerialNumber',props.buycharger):data.append('chessis_no',props.chessis)};
data.append('phone_no',props.info.phone);
data.append('service_detail',this.state.customer_contact);
data.append('service_status_type',3);
if(this.state.audio==""){

}else{
  // this.setState({isLoading:true});
  data.append('file', {
      uri:
        Platform.OS === 'android'
          ? this.state.audio
          : this.state.audio.replace('file://', ''),
     name: 'sound.mp4',
      type: 'audio/mp4',
      // name: 'sound.mp4',
      // type: 'video/mp4',
      // uri: result,
    });
}

data.append('service_type',"Free Service");
 console.log(data,'data');
 {this.props.buycharger!=""?this.chargersubmit(data):this.evsubmit(data)}
};

  };

evsubmit=(data)=>{
  console.log('ev',data);
  fetch('https://mobility.efillelectric.com/api/user/service-submit', {
  method: 'POST',
  body: data,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  },
})

  .then((response) => response.json())
  .then((response) => {
    console.log('upload succes', response);
this.setState({isLoading:false});
    this.props.navigation.navigate('Services');
  })
  .catch((error) => {
    console.log('upload error', error);
    alert('Upload failed!',error);
  });
}

chargersubmit=(data)=>{
  console.log(data,'charger');
  fetch('https://iot.efillelectric.com/api/user/service-submit', {
  method: 'POST',
  body: data,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  },
})

  .then((response) => response.json())
  .then((response) => {
   console.log('upload succes', response);
this.setState({isLoading:false});
    this.props.navigation.navigate('Services');
  })
  .catch((error) => {
    console.log('upload error', error);
    alert('Upload failed!',error);
  });
}
  
 


  handleCheckbox = (checkbox) => {
    this.setState({ isSelected: checkbox });
  }

  labelCheck = () => {
    let { isSelected } = this.state;
    this.setState({ isSelected: !isSelected });
  }
  renderItem = ( {item} ) => (
   
    <View style={styles.row}>
      <View style={styles.checkboxContainer}>
      <Text style={styles.checkboxLabel}>{item.value}</Text>
       
          <Text style={styles.checkboxLabel}>{item.message}</Text>
      

      </View>
    </View>

  )

  render() {
    let { navigation } = this.props;
    let { items } = this.props.route.params;
    let { isLoading, errors = {}, recording,image1, document_type, playTime, filePath, recordTime, percentage,customer_doc_no, customer_contact, customer_doc_type, repeatPass, duration } = this.state;
  
    const errorPhone = errors.phone == undefined ? '#808080' : '#ff0000';
    
    //  console.log(this.state.recording);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header navigation={navigation} type={strings.dmc.soldForm.title1} />
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={[{height:screenHeight/4,flex:1,margin:10}]}>
          <Text style={styles.checkboxLabel1}> Service Number {items.service_no} </Text>
          <FlatList
                        data={document_type}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id+''}
                        // ListHeaderComponent={this.renderHeader}
                        // ListEmptyComponent={() => this.listEmptyComponent()}
                        // refreshControl={
                        //     <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={'#fff'}/>
                        // }
                    />
                   
           </View>
            {/* <View style={styles.formField}>
              <Text style={styles.label}>{strings.users.types}</Text>
              <View>
              <SelectList boxStyles={styles.box}
                          search={false}
                          setSelected={(data)=>this.setState({service_name:data})}
                        //   setSelected={(data)=>this.setState({customer_doc_type:data})}
                          placeholder="Service Type"
                            data={document_type}
                           notFoundText="No data found"
                           dropdownItemStyles={styles.dropdown}
                            // save="service_name"
                          />
              </View>
              {errors.name != undefined &&
                <Text style={styles.error}>{errors.name}</Text>
              }
            </View> */}
 {filePath != '' ?
              <Image
                source={{ uri: image1 }}
                style={styles.imageStyle}
              />
              : null}
<View style={styles.formField}>
              <Text style={styles.label}>{strings.users.other_issues}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={this.phoneRef}
                  placeholder="Enter the Service details"
                  autoCapitalize='none'
                  autoCompleteType='off'
                  autoCorrect={false}

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
              {/* {errors.phone != undefined &&
                <Text style={styles.error}>{errors.phone}</Text>
              } */}
            </View>
           
            <View style={styles.row}>
               {/* <Text style={{textAlign:'center',fontWeight:'800',color:'#fff',marginTop:10}}>{percentage}</Text> */}
               
                    <View style={{paddingTop:10,justifyContent:'center',alignContent:'center',marginLeft:8}}>
                      {recording==true?

                          <Text style={{ flexDirection:'row',textAlign: 'center', fontWeight: '800', color: '#fff' }}>{recordTime}</Text>
                        
                      : 
                      <Text style={{ textAlign: 'center', fontWeight: '800', color: '#fff', marginTop: 10 }}>{playTime}</Text>
                      }
                   
                    {/* /<Progress.Bar progress={playTime} width={width-20}/> */}
                    </View>
                    </View>
                   
                        
                    <View style={styles.row1}>
                      
                    <View style={styles.availabilityIconContainer}>
                <TouchableOpacity activeOpacity={0.8} style={styles.IconButton} onPress={()=>this.onStartRecord()}>
                  <Image source={Images.voice} style={styles.imageIcon} />
                </TouchableOpacity>
                <Text style={{textAlign:'center',fontWeight:'800',color:'#fff',marginTop:5}}>Record</Text>
              </View>  
              {recording==true?
              <View style={styles.availabilityIconContainer}>
             
                <TouchableOpacity activeOpacity={0.8} style={styles.IconButton} onPress={()=>this.onStopRecord()}>
                
                  <Image source={Images.stop} style={styles.imageIcon} />

                </TouchableOpacity>
               
                <Text style={{textAlign:'center',fontWeight:'800',color:'#fff',marginTop:5}}>Stop</Text>
              </View> 
               : 
               <View style={[styles.availabilityIconContainer,{marginEnd:20}]}>
               <TouchableOpacity activeOpacity={0.8} style={styles.IconButton} onPress={()=>this.onStartPlay()}>
                 <Image source={Images.play} style={styles.imageIcon} />
                
               </TouchableOpacity>
               <Text style={{textAlign:'center',fontWeight:'800',color:'#fff',marginTop:5}}>Play</Text>
           
             </View>  } 
             
              </View>
              <View style={styles.availabilityIconContainer}>
            <TouchableOpacity onPress={!isLoading ? () => this.Scanner() : null}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.IconButton}>
               
                  <Image source={Images.camera} style={styles.imageIcon} />
                  
                
                
              </LinearGradient>
              
            </TouchableOpacity>
            </View>
            <Text style={{textAlign:'center',fontWeight:'800',color:'#fff',marginTop:5}}>Upload Image</Text>
            <View style={{justifyContent:'center',marginLeft:10,marginTop:10}}>
            {this.props.buycharger!=""?
       null
        :
        <Text numberOfLines={2} style={{color:'#fff',textAlign:'left',fontSize:12,margin:2}}>Charges - Service Charge Including Oil  ₹ 150 </Text>
              }

        <Text numberOfLines={2} style={{color:'#fff',textAlign:'left',fontSize:12,margin:2}}>Note - You will be charged for the parts replaced outside of warranty period. </Text>
        {this.props.buycharger!=""?
          <Text numberOfLines={2} style={{color:'#fff',textAlign:'left',fontSize:12,margin:2,marginVertical:5}}>Above mentioned services will be provided to you.Please Confirm before sharing OTP with the Franchisee.</Text>:
      <Text numberOfLines={2} style={{color:'#fff',textAlign:'left',fontSize:12,margin:2,marginVertical:5}}>Above mentioned services will be provided to you.Please Confirm before sharing OTP with the dealer.</Text>
            }
</View>
            <TouchableOpacity onPress={!isLoading ? () => this.onSubmit() : null}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                {isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                  <Text style={styles.buttonText}>Submit</Text>
                }
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </Animatable.View>
      </View>
    )
  }
}
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: COLORS.PRIMARY,
      zIndex: 9999,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    flatstyle:{
      height:screenHeight/4,
      flex:1,
      margin:10
    },
    onBoardImage: {
        width: screenHeight * 0.5,
        height: screenHeight * 0.2,
        resizeMode:'contain'
    },
    footer: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '3%'
    },
    title: {
        color: COLORS.DEFAULT,
        fontSize: 38,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        lineHeight: 40,
    },
    text: {
        color: COLORS.DEFAULT,
        fontSize: 12,
        fontFamily: "Poppins-medium",
        marginTop: 20
    }, 
    button: {
        width: screenWidth - 40 ,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop:  20
    },
    row: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    row2: {
      flexDirection: 'row',
      
  },
    row1: {
        width:screenWidth-90,
        flexDirection: 'row',
        justifyContent:'space-evenly',
         marginVertical: 5,
        //  backgroundColor:'#fff',
        marginRight:20,
        marginLeft:40,
  
    },
    item: {
      flex: 1,
      flexDirection: 'row',
      // backgroundColor: COLORS.DEFAULT,
      padding: 5,
      marginVertical: 5,
      marginHorizontal: 15,
      borderRadius: 10,
  },
    buttonText: {
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
    label: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        margin: 5,
        marginLeft: 15
    },
    IconButton: {
        position: 'relative',
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        borderRadius: 55 / 2,
    },
    imageIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    box:{
        flexGrow:1,
        flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    width: screenWidth - 40 ,
    paddingHorizontal: 10,
    zIndex: 1,
    },
    dropdown: {
        flexGrow:1,
        flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    width: screenWidth - 40 ,
    paddingHorizontal: 10,
    zIndex: 999,
      },
    inputContainer: {
        width: screenWidth - 40 ,
        height: 80, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.black,
        borderRadius: 10,
    },
    checkboxLabel1: {
      color: COLORS.DEFAULT,
      fontSize: 16,
      fontFamily: "Poppins-medium",
      marginLeft: 5,
      marginTop:10,
      marginBottom:10,
      fontWeight:'bold'
    },
    imageStyle: {
        marginTop:10,
     width: screenWidth-90 ,
        height: 100,
        // top:'30%',
        // margin: 5,
        //  marginTop:-50,
        marginLeft:50,
        marginRight:50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      availabilityIconContainer: {
        position: 'relative',
        // top: '42%',
       
         alignSelf: 'center',
        marginTop:10,
       
    },
    availIconContainer: {
        position: 'relative',
        // top: '42%',
         alignSelf: 'center',
       marginLeft:20,
    },
    inputText: {
        flex:1,
        height:'100%',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.black,
        marginLeft: '3%'
    },
    error: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        marginLeft: 15,
        padding: 5,
        color: '#ff0000',
    },
    signInButton: {
        width: screenWidth - 80 ,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 15
    },
    uploadButton: {
        width: screenWidth - 200 ,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 15
    },
    signIn: {
       width: 70,
       height: 70,
       justifyContent: 'center', 
       alignItems: 'center',
       borderRadius: 70/2,
    },
    backIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    textSign: {
        color: COLORS.DEFAULT,
        fontWeight: 'bold',
        margin: 5
    },
    infoText: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        marginTop: 50,
        marginBottom: 50,
        textAlign: 'center'
    },
    checkboxContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 20
    },
    checkbox: {
        width: 20,
        height: 20,
        alignSelf: "center",
        color: '#fff',
        borderColor: '#A4FF8B',
        borderRadius: 5
    },
    checkboxLabel:{
        color: COLORS.DEFAULT,
        fontSize: 12,
        fontFamily: "Poppins-medium",
        marginLeft: 5
    }
});
const mapStateToProps = state => {
    
    return {
        chessis: state.Chessis_no,
        info: state.info,
        buycharger:state.buycharger
    };
  };
  
  
  const mapDispatchToProps = (dispatch) => {
    return{
    userInfo: bindActionCreators(userInfo, dispatch),
    }
     
  }
  export default connect(mapStateToProps,mapDispatchToProps)(freeservice);

