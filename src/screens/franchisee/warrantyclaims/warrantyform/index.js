TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, TextInput, Image,CheckBox, ActivityIndicator ,Alert} from 'react-native'
//Library
import messaging from '@react-native-firebase/messaging';
import * as Animatable from 'react-native-animatable';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
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
//Redux
import { connect } from 'react-redux';
import { userInfo, loginToken, subscribed, buycharger } from '../../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
import AsyncStorage from "../../../../utils/AsyncStorage";
import { Images } from "../../../../constants/";
import { strings } from '../../../../utils/translations';

import ImagePicker from 'react-native-image-picker';
import { SelectList } from 'react-native-dropdown-select-list'


 class warrantyform extends Component {
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
    
        // this.chassisRef = this.updateRef.bind(this, 'chassis_no');
         this.phoneRef = this.updateRef.bind(this, 'customer_contact');
        // this.passwordRef = this.updateRef.bind(this, 'Service_Type');
        // this.emailRef = this.updateRef.bind(this, 'customer_doc_no');
        this.refIdRef = this.updateRef.bind(this, 'Service_Detail');
    
        // this.renderPasswordAccessory1 = this.renderPasswordAccessory1.bind(this);
        // this.renderPasswordAccessory2 = this.renderPasswordAccessory2.bind(this);
       

        this.state = {
            secureTextEntry: true,
            isLoading: false,
            chessislist: [],
            customer_contact: "",
            Service_Type: [],
            Service_details: [],
            repeatPass: "",
            service_name:"",
            chessis:"",
            service_no:"",
            photo:"",
            Service_Detail:"",
            refId:"",
            filePath:"",
            passkey:"",
            userInfo: null,
            loginToken: null,
            deviceToken:null,
            isSelected: false
        };
    }
    componentDidMount = () => {
      this.servicelist();
      this.dealerpasskey();
            
       
      
  }

  
dealerpasskey(){
  // AsyncStorage.getDealer_pass_key().then(result => {
  //     // console.log('toggle', val);
  //     if (result != null && result != '') {
  //         console.log('passkey', result);

  //         this.setState({
  //             passkey: result
  //         });
           
  //     }
      this.chessislist();
  // });
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
        ['Service_Detail']
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
  tokenn(){
    messaging().getToken().then(token => {
      // this.props.deviceToken(token);
      this.setState({deviceToken: token})
      console.log(this.state.deviceToken,'asdfgh');
  });
  }

  onChangeText(text) {
    let { errors = {} } = this.state;
    ['Service_Detail']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
          console.log('customer sign ue2',  errors[name]);
        }
      });
  }

  onSubmit(item) {
    console.log('sign ue', this.state.passkey);

    let errors = {};
    let { isSelected } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //     ['Service_Detail']
    //       .forEach((name) => {
    //         let value = this.state[name];

    //         if (!value) {
    //           errors[name] = strings.error.emptyError;
    //           console.log('sign ue1',);
    //         } 
    // //         else {
    // //           if ('customer_contact' === name && value.length < 10 ) {
    // //             errors[name] = strings.error.phoneError;
    // //           } else if ('customer_name' === name && value.length < 6) {
    // //             errors[name] = strings.error.name;
    // //           }
    // //            else if ('repeatPass' === name && value.length < 6) {
    // //             errors[name] = strings.error.passwordLengthError;
    // //           } else if('repeatPass' === name && value !== this.state.password){
    // //             errors[name] = strings.error.passwordUnmatchedError;
    // //           }
    // // //         //   else if ('email' === name && reg.test(this.state.email)===false ){
    // // //         //      console.log('sign ue',this.state.email);
    // // //         //     errors[name] = strings.error.emailLengthError;
    // // //         //    }
    // // //           //  else if ('refId' === name && value==) {
    // // //           //   errors[name] = strings.error.passwordLengthError;
    // // //           // }
    // //         }
    //       });

    //     this.setState({ errors });
        // if(Object.entries(errors).length === 0 && isSelected){
        //   console.log('sign ue3',);
     this.onSignupPressed();
        // } else if(Object.entries(errors).length === 0 && !isSelected) {
          // showMessage({
          //     message: strings.error.warningTitle,
          //     description: strings.error.termsAndConditions,
          //     type: "warning",
          //     duration: 2000
          //   });
      // }
  }
    // onSubmit() {
    //   console.log('sign ue',this.state.passkey);
      
    //       this.onSignupPressed();
  
    // }
  
    updateRef(name, ref) {
        this[name] = ref;
    }
  

    Scanner() {

      let options = {
        title: 'Select Image',
        base64: true,
        customButtons: [
          {
            name: 'customOptionKey',
            title: 'Choose Photo from Custom Option'
          },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
  
      };
  
      // const result = await launchImageLibrary(cameraType);
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log(
            'User tapped custom button: ',
            response.customButton
  
          );
          alert(response.customButton);
        } else {
          // var photo=new Array(2);
          // for(let i=0;i<=2;i++){
          //   let source = response;

          //   this.setState({ filePath: source });
          // }
          let source = response;
          // You can also display the image using data:
          // let source = {
          //   uri: 'data:image/jpeg;base64,' + response.data
          // };
          this.setState({ filePath: source });
          console.log("filepath", this.state.filePath.uri);
        }
      });
  
    }

    Scanner1() {

      let options = {
        title: 'Select Image',
        base64: true,
        customButtons: [
          {
            name: 'customOptionKey',
            title: 'Choose Photo from Custom Option'
          },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
  
      };
  
      // const result = await launchImageLibrary(cameraType);
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log(
            'User tapped custom button: ',
            response.customButton
  
          );
          alert(response.customButton);
        } else {
       
          let source = response;
         
          this.setState({ photo: source });
          console.log("filepath", this.state.filePath.uri);
        }
      });
  
    }
    
 
    chessislist(){
      let{props}=this
      HttpRequest.dealer_chaessis({distributor_code:props.info.phone,status:2})
      .then(res => {
        this.setState({ isLoading: false });
        //  console.log("Phone Number Check api response ---------- ", res);
        const result = res.data;
        console.log("Chessis Check api response ---------- ", result);
        if (res.status == 200 && result.error==false) {
        console.log("chessis list",result.data);
         this.setState({chessislist:result.data})
       
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
        console.log("Chesiise Catch Exception: ",err);
        showMessage({
          message: strings.signIn.response.error.title,
          description: strings.signIn.response.error.message,
          type: "danger",
        });
      });
    };

    servicelist(){

    HttpRequest.warranty_list()
    .then(res => {
      this.setState({ isLoading: false });
      //  console.log("Phone Number Check api response ---------- ", res);
      const result = res.data;
      console.log("Service list api response ---------- ", result);
      if (res.status == 200 && result.error==false) {
      // console.log("service list",result.data);
       this.setState({Service_Type:result.data})
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
  };
  
  details(data){
    HttpRequest.dealer_chessis_no({chessis_no:data})
    .then(res => {
      this.setState({ isLoading: false });
      //  console.log("Phone Number Check api response ---------- ", res);
      const result = res.data;
      console.log("hk api response ---------- ", result);
      if (res.status == 200 && result.error==false) {
       console.log("service list",result.data);
       this.setState({Service_details:result.data})
    console.log(this.state.Service_details,'service');
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
    // Self User Signup Through Api
    onSignupPressed = () => {

      let {photo,filePath}=this.state;
      let{props}=this;
      //  this.setState({chargingPointData:this.state.tax});
     console.log('fliepath',this.state.filePath,);
      console.log('photo',this.state.photo);
       console.log('ok4',filePath);
      if (filePath == null || filePath == "") {
       
        Alert.alert("Please Upload the Damage Part Image");
        console.log('ok1');
    }else if (photo == null || photo == "") {
       
      Alert.alert("Please Upload the Shipment Image");
      console.log('ok2');
  }else{
      var pics=filePath.data;
      var data = new FormData();
      data.append('distributor_code',props.info.phone);
      data.append('warranty_image',this.state.filePath.data);
      data.append('track_image',this.state.photo.data);
      data.append('chessis_no',this.state.chessis)
      data.append('warranty_name',this.state.service_name)
      data.append('details',this.state.Service_Detail);
      data.append('service_no',this.state.service_no);
      
      // let { customer_name, customer_contact, customer_doc_no ,customer_doc_type,} = this.state;
    console.log('pressed',data);
    // console.log('itempaas',item);
      this.setState({ isLoading: true });
      fetch('https://mobility.efillelectric.com/api/v1/warranty-register', {
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

     this.props.navigation.goBack();
  })
  .catch((error) => {
    console.log('upload error', error);
    alert('Upload failed!',error);
  });
  }

              // HttpRequest.warranty_register({formdata:data})
              // .then(res => {
              //   this.setState({ isLoading: false });
              //   //  console.log("Phone Number Check api response ---------- ", res);
              //   const result = res.data;
              //   console.log("Phone Number Check api response ---------- ", result);
              //   if (res.status == 200 && result.error==false) {
              //    console.log("result",result);
              //    this.props.navigation.goBack();
                   
              //   }
              //   else {
              //       Alert.alert("Alert",result.message);
              //       // this.props.navigation.navigate("OtpVerification", { mobile: phone, type: 0, formData: { name: name, phone: phone, password: password,email:email,refId:refId,device_token:deviceToken, role: 1 } });
              //   }
              // })
              // .catch(err => {
              //   this.setState({ isLoading: false });
              //   console.log("Phone Number Check API Catch Exception: ",err);
              //   showMessage({
              //     message: strings.signIn.response.error.title,
              //     description: strings.signIn.response.error.message,
              //     type: "danger",
              //   });
              // });
            

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
        // let {item}=this.props.route.params;
        // console.log(item);
        let { isLoading, errors = {}, secureTextEntry1,service_name, service_no,photo, Service_Type,Service_details,Service_Detail,chessis,chessislist,filePath, refId,customer_doc_no,customer_contact, customer_doc_type, repeatPass, isSelected } = this.state;
        const errorName = errors.name == undefined ? '#808080' : '#ff0000';
        const errorPhone = errors.phone == undefined ? '#808080' : '#ff0000';
        const errorPassword = errors.password == undefined ? '#808080' : '#ff0000';
        const errorRfId = errors.efid == undefined ? '#808080' : '#ff0000';
        const errorEmail = errors.email == undefined ? '#808080' : '#ff0000';
        // console.log(this.state.filePath);
        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.dmc.warranty_c}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                  <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} contentContainerStyle={styles.scrollView}>
                    <View style={styles.formField}>
                        <Text style={styles.label}>Chassis Number </Text>
                        <View >
                        <SelectList boxStyles={styles.box}
                    
                          search={false}
                          setSelected={(data)=>this.setState({chessis:data})}
                          placeholder="Select Chessis No"
                            data={chessislist}
                            onSelect={() => this.details(chessis)}
                           notFoundText="No data found"
                           dropdownItemStyles={styles.dropdown}
                            // save="service_name"
                          />
                           
                        </View>
                    </View>
                   
                 
                    <View style={styles.formField}>
                        <Text style={styles.label}>Warranty Type</Text>
                        <View>
                        <SelectList boxStyles={styles.box}
                          search={false}
                          setSelected={(data)=>this.setState({service_name:data})}
                          placeholder="Warranty Type"
                            data={Service_Type}
                           notFoundText="No data found"
                           dropdownItemStyles={styles.dropdown}
                            // save="service_name"
                          />
                       
                        </View>
                        {/* { errors.password != undefined &&
                        <Text style={styles.error}>{errors.password}</Text>
                        } */}
                    </View>
                      <View style={styles.formField}>
                        <Text style={styles.label}>Detail</Text>
                        <View style={styles.inputContainer}>
                        <TextInput
                                ref={this.refIdRef}
                                placeholder=''
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                maxLength={250}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                // onSubmitEditing={this.onRefId}
                                returnKeyType='next'
                                value={Service_Detail}
                                // placeholderTextColor={errorRfId}
                                style={[styles.inputText,{ color: errorRfId}]}
                            />
                                
                        </View>
                         {errors.email != undefined &&
                        <Text style={styles.error}>{errors.email}</Text> 
                        }
                     </View>   
                     <View style={styles.formField}>
                        <Text style={styles.label}>Service Number</Text>
                        <View >
                        <SelectList boxStyles={styles.box}
                          search={false}
                          setSelected={(data)=>this.setState({service_no:data})}
                          //  placeholder={Service_details}
                            data={Service_details}
                            onSelect={() => this.details(chessis)}
                           notFoundText="No data found"
                           dropdownItemStyles={styles.dropdown}
                            // save="service_name"
                          />
                                
                        </View>
                         {errors.email != undefined &&
                        <Text style={styles.error}>{errors.email}</Text> 
                        }
                     </View>  
                     <View style={{flexDirection:'row'}}>
                     <View style={{flexDirection:'column', }}>
                     <View style={{flexDirection:'row'}}>
                     {filePath != '' ?
              <Image
                source={{ uri: filePath.uri }}
                style={styles.imageStyle}
              />
              : null}
              </View>

              </View>
              <View style={{flexDirection:'column', }}>
                     <View style={{flexDirection:'row'}}>
              {photo != '' ?
              <Image
                source={{ uri: photo.uri }}
                style={styles.imageStyle}
              />
              : null}
             </View>
             </View>
              </View>
              <View style={{flexDirection:'column',width:20,alignSelf:'flex-start'}}>
                     <View style={{flexDirection:'row'}}>
              <View style={[styles.availabilityIconContainer,{justifyContent:'center',marginLeft:55}]}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.IconButton}>
                            <TouchableOpacity activeOpacity={5} onPress={() => { this.Scanner() }}>
                            <Image source={Images.camera} style={styles.imageIcon} />
                            </TouchableOpacity>
                        </LinearGradient>
                        <Text style={{textAlign:'center',fontWeight:'800',color:'#fff',marginTop:5,marginLeft:Platform.OS=="android"?16:14,paddingRight:5}}>Part Image</Text>
                        </View>
                        <View style={[styles.availabilityIconContainer,{ felx:1,justifyContent:'center',marginLeft:115}]}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.IconButton}>
                            <TouchableOpacity activeOpacity={5} onPress={() => { this.Scanner1() }}>
                            <Image source={Images.camera} style={styles.imageIcon} />
                            </TouchableOpacity>
                        </LinearGradient>
                        <Text style={{textAlign:'center',fontWeight:'800',color:'#fff',marginTop:5,marginLeft:14}}>Track Image</Text>
                        </View>
                        </View>
                        </View>
                    {/* <TouchableOpacity onPress={!isLoading ? ()=>this.Scanner() : null }>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                        { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                          <Text style={styles.buttonText}>Submit</Text>
                        } 
                        </LinearGradient>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={!isLoading ? ()=>this.onSubmit() : null }>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                        { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                          <Text style={styles.buttonText}>Submit</Text>
                        } 
                        </LinearGradient>
                    </TouchableOpacity>
                    </KeyboardAwareScrollView>
                </Animatable.View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      info: state.info,
      token: state.token
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      userInfo: bindActionCreators(userInfo, dispatch),
      loginToken: bindActionCreators(loginToken, dispatch),
      subscribed: bindActionCreators(subscribed, dispatch),
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(warrantyform);
