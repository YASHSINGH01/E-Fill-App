TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, TextInput, Image, StyleSheet ,Dimensions, ActivityIndicator, Alert } from 'react-native'
//Library
import messaging from '@react-native-firebase/messaging';
import * as Animatable from 'react-native-animatable';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage, hideMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Components
import Header from '../../../../components/Header';
//API
import HttpRequest from '../../../../utils/HTTPRequest';


import AsyncStorage from "../../../../utils/AsyncStorage";
// Theme Colors
import COLORS from "../../../../constants/colors";

import { strings } from '../../../../utils/translations';
import { Images } from '../../../../constants';
import { Avatar, GiftedChat } from 'react-native-gifted-chat';


const { width, height } = Dimensions.get('window');
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
export default class Warrantyques extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
     this.onChangeText = this.onChangeText.bind(this);
    // this.onSubmitName = this.onSubmitName.bind(this);
    // this.onSubmitPhone = this.onSubmitPhone.bind(this);
    // this.onSubmitPassword = this.onSubmitPassword.bind(this);
    // this.onSubmitEmail = this.onSubmitEmail.bind(this);
    // this.onRefId = this.onRefId.bind(this);

    this.onAccessoryPress1 = this.onAccessoryPress1.bind(this);
    this.onAccessoryPress2 = this.onAccessoryPress2.bind(this);

    this.nameRef = this.updateRef.bind(this, 'customer_name');
    // this.phoneRef = this.updateRef.bind(this, 'customer_contact');
    // this.passwordRef = this.updateRef.bind(this, 'customer_doc_type');
    // this.emailRef = this.updateRef.bind(this, 'customer_doc_no');
    // this.refIdRef = this.updateRef.bind(this, 'refId');

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
    ['customer_name']
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
    this.password.focus();
    this.onSubmitPhone();
  }

  onSubmitPhone() {
    // this.password.focus();
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

        // ['customer_name']
        //   .forEach((name) => {
        //     let value = this.state[name];

        //     if (!value) {
        //       errors[name] = strings.error.emptyError;
        //       console.log('sign ue1',);
        //     } 
        //     else {
        //       if ('customer_contact' === name && value.length < 10 ) {
        //         errors[name] = strings.error.phoneError;
        //       } else if ('customer_name' === name && value.length < 6) {
        //         errors[name] = strings.error.name;
        //       }
        //        else if ('repeatPass' === name && value.length < 6) {
        //         errors[name] = strings.error.passwordLengthError;
        //       } else if('repeatPass' === name && value !== this.state.password){
        //         errors[name] = strings.error.passwordUnmatchedError;
        //       }
    //         //   else if ('email' === name && reg.test(this.state.email)===false ){
    //         //      console.log('sign ue',this.state.email);
    //         //     errors[name] = strings.error.emailLengthError;
    //         //    }
    //           //  else if ('refId' === name && value==) {
    //           //   errors[name] = strings.error.passwordLengthError;
    //           // }
        //     }
        //   });

    //     this.setState({ errors });
    //     if(Object.entries(errors).length === 0 && isSelected){
    //       console.log('sign ue3',);
    // this.onSignupPressed(item);
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

 

  document ()
  {
      let{item}=this.props.route.params;
      console.log(item.warranty_id);
    HttpRequest.chat_bot({warranty_id:item.warranty_id})
    .then(res => {
      this.setState({ isLoading: false });
      //  console.log("Phone Number Check api response ---------- ", res);
      const result = res.data;
      console.log("Service list api response ---------- ", result);
      if (res.status == 200 && result.error==false) {
       console.log("service list",result.data);
    //    this.setState({document_type:result.data})
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

    let {chargingPointData, filePath} = this.state;
    //  this.setState({chargingPointData:this.state.tax});
  
  };

  handleCheckbox = (checkbox) => {
    this.setState({ isSelected: checkbox });
  }

  labelCheck = () => {
    let { isSelected } = this.state;
    this.setState({ isSelected: !isSelected });
  }

  render() {
    let { navigation } = this.props;
    let { item } = this.props.route.params;
    // console.log(item);
    let { isLoading, errors = {}, secureTextEntry1, document_type, customer_name, filePath, refId, percentage,customer_doc_no, customer_contact, customer_doc_type, repeatPass, isSelected } = this.state;
    const errorName = errors.customer_name == undefined ? '#808080' : '#ff0000';
    const errorPhone = errors.customer_contact == undefined ? '#808080' : '#ff0000';
    const errorPassword = errors.password == undefined ? '#808080' : '#ff0000';
    const errorRfId = errors.efid == undefined ? '#808080' : '#ff0000';
    const errorEmail = errors.email == undefined ? '#808080' : '#ff0000';
     console.log(errors.name);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header navigation={navigation} type={strings.dmc.soldForm.title} />
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} contentContainerStyle={styles.scrollView}>
           
          
            <View style={[styles.goku,styles.iconButton,styles.imageIcon]}>
            <Avatar rounded source={Images.play} showAvatarForEveryMessage={true} >
                </Avatar>
            </View>
            <View style={styles.luffy}>
            <TouchableOpacity activeOpacity={0.8} style={styles.iconButton} onPress={()=>this.props.navigation.navigate('Cart')} >
                  <Image source={Images.cart} style={styles.imageIcon} />
                </TouchableOpacity>
            </View>
           

            {/* <TouchableOpacity onPress={!isLoading ? () => this.onSubmit(item) : null}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                {isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                  <Text style={styles.buttonText}>Submit</Text>
                }
              </LinearGradient>
            </TouchableOpacity> */}
            <View style={styles.formField}>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={this.phoneRef}
                  placeholder="answers"
                 
                  autoCapitalize='none'
                  autoCompleteType='off'
                  autoCorrect={false}
                
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  onSubmitEditing={this.onSubmitPhone()}
                  returnKeyType='next'
                  value={customer_name}
                  placeholderTextColor={errorPhone}
                  style={[styles.inputText, { color: errorPhone }]}
                />
              </View>
              {errors.customer_contact != undefined &&
                <Text style={styles.error}>{errors.customer_contact}</Text>
              }
            </View>
          </KeyboardAwareScrollView>
        </Animatable.View>
      </View>
    )
  }
}

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
    availabilityIconContainer: {
        position: 'relative',
        // top: '42%',
       
         alignSelf: 'center',
        marginTop:10,
       
    },
    
    scrollView: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
   
    footer: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '3%'
    },
    iconButton: {
        position: 'relative',
        width:45,
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAULT,
        borderRadius: 55 / 2,
    },
    imageIcon: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
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
    buttonText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    formField: {
        top:'70%',
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
    goku: {
        position:"relative",
        top: '1%',
        alignSelf: 'flex-start',
        paddingRight:20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:7,
        // marginHorizontal: '1%',
    },
    luffy: {
        position:"relative",
        top: '4%',
        alignSelf: 'flex-start',
        paddingRight:20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:7,
        // marginHorizontal: '1%',
    },
   
    inputContainer: {
        width: screenWidth - 40 ,
        height: 50, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.black,
        borderRadius: 10,
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
        width: screenWidth - 40 ,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 15,
        bottom:'4%'
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
   
   
});