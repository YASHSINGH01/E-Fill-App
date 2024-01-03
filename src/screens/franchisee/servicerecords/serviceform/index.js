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
//Redux
import { connect } from 'react-redux';
import { userInfo, loginToken, subscribed, buycharger } from '../../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//API
import HttpRequest from '../../../../utils/HTTPRequest';
//Styles
import styles from './styles';

import AsyncStorage from "../../../../utils/AsyncStorage";

import { strings } from '../../../../utils/translations';

import ImagePicker from 'react-native-image-picker';
import { SelectList } from 'react-native-dropdown-select-list'


class Serviceform extends Component {
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
    
        // this.nameRef = this.updateRef.bind(this, 'customer_name');
        this.phoneRef = this.updateRef.bind(this, 'customer_contact');
        // this.passwordRef = this.updateRef.bind(this, 'Service_Type');
        // this.emailRef = this.updateRef.bind(this, 'customer_doc_no');
        this.refIdRef = this.updateRef.bind(this, 'Service_Detail');
    
        this.renderPasswordAccessory1 = this.renderPasswordAccessory1.bind(this);
        this.renderPasswordAccessory2 = this.renderPasswordAccessory2.bind(this);
       

        this.state = {
            secureTextEntry: true,
            isLoading: false,
            chessislist: [],
            customer_contact: "",
            Service_Type: [],
            repeatPass: "",
            chessis:"",
            Service_Detail:"",
            refId:"",
            filePath:"",
            passkey:"",
            userInfo: null,
            loginToken: null,
            deviceToken:null,
            secureTextEntry1: true,
            secureTextEntry2: true,
            isSelected: false
        };
    }
    componentDidMount = () => {
      this.servicelist();
      this.dealerpasskey();
            
       
      
  }

  
dealerpasskey(){
  AsyncStorage.getDealer_pass_key().then(result => {
      // console.log('toggle', val);
      if (result != null && result != '') {
          console.log('passkey', result);

          this.setState({
              passkey: result
          });
           
      }
      this.chessislist();
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
        [ 'customer_contact','Service_Detail']
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
  
    onSubmit() {
      console.log('sign ue',this.state.passkey);
      
        let errors = {};
        let { isSelected } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

          this.onSignupPressed();
  
    }
  
    updateRef(name, ref) {
        this[name] = ref;
    }
  
//     Scanner() {
        
//       let options = {
//           title: 'Select Image',
//           base64:true,
//           customButtons: [
//               {
//                   name: 'customOptionKey',
//                   title: 'Choose Photo from Custom Option'
//               },
//           ],
//           storageOptions: {
//               skipBackup: true,
//               path: 'images',
//           },
          
//       };

//       // const result = await launchImageLibrary(cameraType);
//       ImagePicker.showImagePicker(options, (response) => {
//           console.log('Response = ', response);

//           if (response.didCancel) {
//               console.log('User cancelled image picker');
//           } else if (response.error) {
//               console.log('ImagePicker Error: ', response.error);
//           } else if (response.customButton) {
//               console.log(
//                   'User tapped custom button: ',
//                   response.customButton
                  
//               );
//               alert(response.customButton);
//           } else {
//               let source = response;
//               // You can also display the image using data:
//               // let source = {
//               //   uri: 'data:image/jpeg;base64,' + response.data
//               // };
//               this.setState({ filePath: source });
//               console.log("filepath",this.state.filePath.uri);
//           }
//       });

//   }
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

    HttpRequest.serive_list()
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
  
    // Self User Signup Through Api
    onSignupPressed = () => {

      let chargingPointData,filePath=this.state;
      //  this.setState({chargingPointData:this.state.tax});
      // console.log('ok',this.state.filePath.fileName);

      if (filePath != null) {
          // console.log('okkkk',this.state.passkey);
          //If file selected then create FormData
          const fileToUpload = filePath;
          const files = new FormData();
          // datas.append('name', 'Image Upload');
          files.append(fileToUpload);
      
      // let { customer_name, customer_contact, customer_doc_no ,customer_doc_type,} = this.state;
    // console.log('pressed',this.state.data);
    // console.log('itempaas',item);
      // this.setState({ isLoading: true });
      this.props.navigation.navigate("serviceotp",{mobile:this.state.customer_contact,chessis_no:this.state.chessis,Service_Type:this.state.service_name,Service_Detail:this.state.Service_Detail});

           
            };

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
        let { isLoading, errors = {}, secureTextEntry1, service_name,secureTextEntry2, Service_Type,Service_Detail,chessis,chessislist,filePath, refId,customer_doc_no,customer_contact, customer_doc_type, repeatPass, isSelected } = this.state;
      
        const errorPhone = errors.phone == undefined ? '#808080' : '#ff0000';
        const errorRfId = errors.efid == undefined ? '#808080' : '#ff0000';
        // console.log(this.state.filePath);
        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.dmc.soldForm.title1}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                  <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} contentContainerStyle={styles.scrollView}>
                    <View style={styles.formField}>
                        <Text style={styles.label}>Chassis Number </Text>
                        <View >
                        <SelectList boxStyles={styles.box}
                          search={false}
                          setSelected={(data)=>this.setState({chessis:data})}
                          placeholder="Chessis List"
                            data={chessislist}
                           notFoundText="No data found"
                           dropdownItemStyles={styles.dropdown}
                            // save="service_name"
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
                                placeholder={strings.corporateUser.phoneNumber}
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                keyboardType={'phone-pad'}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitPhone}
                                returnKeyType='next'
                                value={customer_contact}
                                placeholderTextColor={errorPhone}
                                style={[styles.inputText,{ color: errorPhone}]}
                            />
                        </View>
                        {errors.phone != undefined &&
                            <Text style={styles.error}>{errors.phone}</Text>
                        }
                    </View>
                    
                    <View style={styles.formField}>
                        <Text style={styles.label}>Service Type</Text>
                        <View>
                        <SelectList boxStyles={styles.box}
                          search={false}
                          setSelected={(data)=>this.setState({service_name:data})}
                          placeholder="Service Type"
                            data={Service_Type}
                           notFoundText="No data found"
                           dropdownItemStyles={styles.dropdown}
                            // save="service_name"
                          />
                       
                        </View>
                       
                    </View>
                      <View style={styles.formField}>
                        <Text style={styles.label}>Service Issues</Text>
                        <View style={styles.inputContainer}>
                        <TextInput
                                ref={this.refIdRef}
                                placeholder='Enter Service Detail'
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                multiline={true}
                                maxLength={250}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onRefId}
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
                     {/* <View style={styles.checkboxContainer}>
                                            <Checkbox onCheckBoxToggle={this.handleCheckbox} status={this.state.isSelected}/>
                                            <TouchableOpacity activeOpacity={1} onPress={() => this.labelCheck() }>
                                              <Text style={styles.checkboxLabel}>{strings.selfUser.iAccept}</Text>
                                            </TouchableOpacity>
                                        </View> */}
                 
                      

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
export default connect(mapStateToProps,mapDispatchToProps)(Serviceform);

