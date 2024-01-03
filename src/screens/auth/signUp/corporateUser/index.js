TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Image, KeyboardAvoidingView, SafeAreaView } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
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
import { Images } from "../../../../constants/";
import { strings } from '../../../../utils/translations';
import { getFontScaleSync } from 'react-native-device-info';

export default class CorporateUser extends Component {
    constructor(props){
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitName = this.onSubmitName.bind(this);
        this.onSubmitPhone = this.onSubmitPhone.bind(this);
        this.checkCompanyCode = this.checkCompanyCode.bind(this);

        this.onSubmitCorporateCode = this.onSubmitCorporateCode.bind(this);
        this.onSubmitRegistrationNumber = this.onSubmitRegistrationNumber.bind(this);
        this.onSubmitVinNumber = this.onSubmitVinNumber.bind(this);

        this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.onSubmitRepeatPassword = this.onSubmitRepeatPassword.bind(this);
    
        this.onAccessoryPress1 = this.onAccessoryPress1.bind(this);
        this.onAccessoryPress2 = this.onAccessoryPress2.bind(this);
    
        this.nameRef = this.updateRef.bind(this, 'name');
        this.phoneRef = this.updateRef.bind(this, 'phone');

        this.corporateCodeRef = this.updateRef.bind(this, 'corporateCode');
        this.registrationNumberRef = this.updateRef.bind(this, 'registrationNumber');
        this.vinNumberRef = this.updateRef.bind(this, 'vinNumber');

        this.passwordRef = this.updateRef.bind(this, 'password');
        this.repeatPassRef = this.updateRef.bind(this, 'repeatPass');
    
        this.renderPasswordAccessory1 = this.renderPasswordAccessory1.bind(this);
        this.renderPasswordAccessory2 = this.renderPasswordAccessory2.bind(this);

        this.inputRefs1 = { picker: null }
        this.inputRefs2 = { picker: null }
    
        this.state = {
            secureTextEntry: true,
            isLoading: false,
            name: "",
            phone: "",
            corporateCode: "",
            vehicleType: "LMV",
            registrationNumber: "",
            vinNumber: "",
            vehicleManufacturer: "",
            vehicleModel: "",
            manufacturers: [],
            models: [],
            password: "",
            repeatPass: "",
            userInfo: null,
            loginToken: null,
            secureTextEntry1: true,
            secureTextEntry2: true,
            isSelected: false,
            corporateCodeError: '',
            isAndroidPickerVisible: false
        };
    }

    componentDidMount = () => {
        this.getAllManufacturers();
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
        ['name', 'phone', 'corporateCode', 'password','repeatPass', 'registrationNumber','vinNumber']
          .map((name) => ({ name, ref: this[name] }))
          .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
                if(name == 'registrationNumber'){
                    this.setState({ [name]: text.toUpperCase() });
                }else{
                    this.setState({ [name]: text });
                }
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
        this.corporateCode.focus();
    }

    onSubmitCorporateCode(){
        this.password.focus();
    }
    
    onSubmitPassword() {
        this.repeatPass.focus();
    }
    
    onSubmitRepeatPassword() {
        this.repeatPass.blur();
    }

    onSubmitRegistrationNumber() {
        this.vinNumber.focus();
    }

    onSubmitVinNumber() {
        this.vinNumber.blur();
    }
    
    onSubmit() {
        var errors = {};

        let reg = /^[A-Z\d\-_\s]+$/i;

        ['name', 'phone', 'corporateCode', 'password', 'repeatPass', 'vehicleType', 'vehicleManufacturer', 'vehicleModel','registrationNumber']
            .forEach((name) => {
                let value = this.state[name];
                
                if (!value && name != 'registrationNumber') {
                    errors[name] = strings.error.emptyError;
                } 
                else {
                    if ('phone' === name && value.length < 10) {
                        errors[name] = strings.error.phoneError;
                    } else if ('password' === name && value.length < 8) {
                        errors[name] = strings.error.passwordLengthError;
                    } else if ('repeatPass' === name && value.length < 8) {
                        errors[name] = strings.error.passwordLengthError;
                    } else if('repeatPass' === name && value !== this.state.password){
                        errors[name] = strings.error.passwordUnmatchedError;
                    } else if('registrationNumber' === name && reg.test(value) == false && value != ''){
                        errors[name] = strings.profile.response.error.invalidRegistrationNumberError;
                    } else if('corporateCode' === name && value.length > 0) {  
                        HttpRequest.companyCode({ company_code: value })
                        .then(res => {
                            // console.log("Corporate User Check Company Code  api response ---------- ", res);
                            const result = res.data;
                            if (result.error ) {
                                //console.log("Corporate User Check Company Code  API Error : ",result);
                                this.setState({ corporateCodeError: 'Invalid Corporate Code.'});
                            }  else {
                                this.setState({ corporateCodeError: ''});
                            }
                        })
                        .catch(err => {
                            this.setState({ corporateCodeError: 'Invalid Corporate Code.'});
                        });  
                    }
                }
            });
    
        this.setState({ errors });
        if(Object.entries(errors).length === 0 && this.state.corporateCodeError == ''){
          this.onSignupPressed();
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

    onSelect = (value) => {
        this.setState({
            vehicleType: value
        })
    }

    //Check Company  Code
    checkCompanyCode = () => {
        let { corporateCode, errors } = this.state;
            HttpRequest.companyCode({ company_code: corporateCode })
            .then(res => {
                // console.log("Corporate User Check Company Code  api response ---------- ", res);
                const result = res.data;
                if (res.status == 200 && !result.error ) {
                    // console.log("Corporate User Check Company Code  API Error : ",result);
                    
                    this.setState({ })
                } else {
                    console.log("Corporate User Check Company Code  API Error : ",result);
                    errors['corporateCode'] = 'Invalid Corporate Code.';
                    this.setState({ errors });
                }
            })
            .catch(err => {
                console.log("Corporate User Check Company Code Catch Exception: ",err);
                return false;
            });
    };

    //Corporate User Signup Through Api
    onSignupPressed = () => {
        let { name, phone, corporateCode, vehicleType, registrationNumber, vinNumber, vehicleManufacturer, vehicleModel, password } = this.state;
        this.props.navigation.navigate("OtpVerification", { mobile: phone, type: 0, formData: { name: name, phone: phone, company_code: corporateCode, vehicle_type: vehicleType, vehicle_number: registrationNumber, vin_number: vinNumber, manufacturer: vehicleManufacturer, model: vehicleModel, password: password, role: 1  } });
        this.setState({ isLoading: true });
    };

    handleCheckbox = (checkbox) => {
      this.setState({isSelected: checkbox});
    }

    onPickerValueChange = (value, index, type) => {
        const { vehicleManufacturer, vehicleModel } = this.state;
               if(vehicleManufacturer != value && type == 'vehicleManufacturer') {
               if(Platform.OS=='android'){
                   this.setState({vehicleManufacturer: value ,isAndroidPickerVisible:false});
                   }
                   else
                   {
                    this.setState({vehicleManufacturer: value});
                   this.inputRefs1.picker.togglePicker(true);
                   }
                   this.getVehicleModel(value);

               } else if(vehicleModel != value) {
               if(Platform.OS=='android'){
                           this.setState({vehicleManufacturer: value ,isAndroidPickerVisible:false});
                           }
                           else
                           {
                   this.setState({vehicleModel: value });
                   this.inputRefs2.picker.togglePicker();
               }
               }
    }

    open(type) { 
        if(type == 'vehicleManufacturer'){
            this.inputRefs1.picker.togglePicker()
        } else {
            this.inputRefs2.picker.togglePicker()
        }
        
    }

    // Get All Manufacturers Through Api
    getAllManufacturers = () => {
        const manufacturers = [];
        HttpRequest.getAllManufacturersSignUp()
        .then(res => {
            const result = res.data;
            if (res.status == 200 && result.error == false) {
                // console.log("All Manufacturers API Response ---------- ", result);
                result.data.map((item, i) => {
                    manufacturers.push({
                        key: i,
                        label: item.name,
                        value: item.id
                    });
                });
                this.setState({ manufacturers: manufacturers });
            } else {
                console.log("All Manufacturers API Error : ",result);
            }
        })
        .catch(err => {
            console.log("All Manufacturers API Catch Exception: ",err);
        });
    }

    // Get Vehicle Models Through Api
    getVehicleModel = (manufacturer_id) => {
        const vehicles = [];
        HttpRequest.getVehicleModelSignUp({ manufacturer_id: manufacturer_id})
        .then(res => {
            const result = res.data;
            if (res.status == 200 && result.error == false) {
                // console.log("Vehicle Models API Response ---------- ", result.data);
                result.data.map((item, i) => {
                    vehicles.push({
                        key: i,
                        label: item.model_name,
                        value: item.id
                    });
                });
                this.setState({ models: vehicles })
            } else {
                //console.log("Vehicle Models API Error : ",result);
                showMessage({
                   message: strings.error.title,
                    description: result.message != undefined ? result.message : result.status,
                    type: "danger",
                });
            }
        })
        .catch(err => {
            this.setState({ isLoading: false });
            //console.log("Vehicle Models API Catch Exception: ",err);
            showMessage({
                message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    }

    labelCheck = () => {
        let { isSelected } = this.state;
        this.setState({isSelected: !isSelected});
    }
    
    render() {
        let { navigation } =  this.props;
        let { isLoading, errors = {}, secureTextEntry1, secureTextEntry2, name, phone, corporateCode, corporateCodeError, password, repeatPass, vehicleType, registrationNumber, vinNumber, vehicleManufacturer, vehicleModel, isSelected } = this.state;

        const errorName = errors.name == undefined ? '#808080' : '#ff0000';
        const errorPhone = errors.phone == undefined ? '#808080' : '#ff0000';
        const errorCorporateCode = errors.corporateCode == undefined ? corporateCodeError == '' ? '#808080' : '#ff0000' : '#ff0000';
        const errorVehicleType = errors.vehicleType == undefined ? '#808080' : '#ff0000';
        const errorVehicleManufacturer = errors.vehicleManufacturer == undefined ? '#808080' : '#ff0000';
        const errorVehicleModel= errors.vehicleModel == undefined ? '#808080' : '#ff0000';
        const errorPassword = errors.password == undefined ? '#808080' : '#ff0000';
        const errorRepeatPassword = errors.repeatPass == undefined ? '#808080' : '#ff0000';
        const errorRegistrationNumber = errors.registrationNumber == undefined ? '#808080' : '#ff0000';

        return (
             <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.corporateUser.title}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} contentContainerStyle={styles.scrollView}>
                    {/* Name */}
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.corporateUser.name}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                ref={this.nameRef}
                                placeholder={strings.corporateUser.namePlaceholder}
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
                    {/* Phone */}
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.corporateUser.phoneNumber}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                ref={this.phoneRef}
                                placeholder={strings.corporateUser.phonePlaceholder}
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
                    {/* Corporate Code */}
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.corporateUser.corporateCode}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                ref={this.corporateCodeRef}
                                placeholder={strings.corporateUser.corporateCodePlaceholder}
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitCorporateCode}
                                returnKeyType='next'
                                value={corporateCode}
                                placeholderTextColor={errorCorporateCode}
                                style={[styles.inputText,{ color: errorCorporateCode}]}
                            />
                        </View>
                        {errors.corporateCode != undefined  &&
                            <Text style={styles.error}>{errors.corporateCode}</Text>
                        }
                        {corporateCodeError != ''  && errors.corporateCode == undefined &&
                            <Text style={styles.error}>{corporateCodeError}</Text>
                        }
                    </View>
                    {/* Password */}
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.corporateUser.password}</Text>
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
                                textContentType="oneTimeCode"
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
                    {/* Confirm Password */}
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.corporateUser.confirmPassword}</Text>
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
                    {/* Vehicle Details Header + Vehicle Type */}
                    <View style={styles.formField}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerTitle}>{strings.corporateUser.vehicleDetails}</Text>
                        </View>
                        <View style={styles.bodyContainer}>
                            <TouchableOpacity onPress={() => this.onSelect('2W')} style={styles.iconView}>
                                <Image source={Images.twoWheelerVehicle} style={[styles.imageIcon, this.state.vehicleType == '2W' ? styles.active : styles.inactive]}/>
                                <Text style={[styles.vehicleLabel,this.state.vehicleType == '2W' ? styles.activeFont: null]}>{strings.corporateUser.twoWheeler}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onSelect('3W')} style={styles.iconView}>
                                <Image source={Images.threeWheelerVehicle} style={[styles.imageIcon, this.state.vehicleType == '3W' ? styles.active : styles.inactive]}/>
                                <Text style={[styles.vehicleLabel,this.state.vehicleType == '3W' ? styles.activeFont: null]}>{strings.corporateUser.threeWheeler}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onSelect('LMV')} style={styles.iconView}>
                                <Image source={Images.lightMotorVehicle} style={[styles.imageIcon, this.state.vehicleType == 'LMV' ? styles.active : styles.inactive]}/>
                                <Text style={[styles.vehicleLabel,this.state.vehicleType == 'LMV' ? styles.activeFont: null]}>{strings.corporateUser.lmv}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onSelect('HMV')} style={styles.iconView}>
                                <Image source={Images.heavyMotorVehicle} style={[styles.imageIcon, this.state.vehicleType == 'HMV' ? styles.active : styles.inactive]}/>
                                <Text style={[styles.vehicleLabel,this.state.vehicleType == 'HMV' ? styles.activeFont: null]}>{strings.corporateUser.hmv}</Text>
                            </TouchableOpacity>
                        </View>
                        { errors.vehicleType != undefined &&
                            <Text style={styles.error}>{errors.vehicleType}</Text>
                        }
                    </View>
                    {/* Registration Number */}
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.corporateUser.registrationNumber}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                ref={this.registrationNumberRef}
                                placeholder={strings.corporateUser.registrationNumberPlaceholder}
                                autoCapitalize="characters"
                                autoCompleteType='off'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitRegistrationNumber}
                                returnKeyType='next'
                                value={registrationNumber}
                                placeholderTextColor={errorRegistrationNumber}
                                style={[styles.inputText,{ color: errorRegistrationNumber}]}
                            />
                        </View>
                        { errors.registrationNumber != undefined && 
                            <Text style={styles.error}>{errors.registrationNumber}</Text>
                        }
                    </View>
                    
                    {/* Vin Number */}
                    <View style={styles.formField}>
                        <Text style={styles.label}>{strings.corporateUser.vinNumber}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                ref={this.vinNumberRef}
                                placeholder={strings.corporateUser.vinNumberPlaceholder}
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitVinNumber}
                                value={vinNumber}
                                placeholderTextColor={'#808080'}
                                style={styles.inputText}
                            />
                        </View>
                    </View>
                    {/* Select Vehicle Manufacturer & Model */}
                    <View style={styles.formField}>
                        <View style={styles.selectBoxContainer}>
                            <View style={styles.selectBoxField}>
                                <Image source={Images.manufacturer} style={[styles.imageIcon, { width: '20%'}]}/>
                                <TouchableOpacity activeOpacity={5} style={styles.pickerContainer} onPress={() => { this.open('vehicleManufacturer')}}>
                                    <RNPickerSelect
                                        ref={el => {this.inputRefs1.picker = el}}
                                        useNativeAndroidPickerStyle={false}
                                        style={{inputIOS: styles.IOS, inputAndroid: styles.android}}
                                        placeholder={{label: strings.corporateUser.selectManufacturer,value: null}}
                                        onValueChange={(value, index) => this.onPickerValueChange(value, index, 'vehicleManufacturer')}
                                        value={vehicleManufacturer}
                                        items={this.state.manufacturers}
                                    />
                                    <Icon
                                        size={20}
                                        name={'ios-chevron-down'}
                                        color={'#fff'}
                                    /> 
                                </TouchableOpacity>
                            </View>
                            <View style={styles.selectBoxDivider}>
                            </View>
                            <View style={styles.selectBoxField}>
                                <Image source={Images.model} style={[styles.imageIcon, { width: '20%'}]}/>
                                <TouchableOpacity activeOpacity={5} style={styles.pickerContainer} onPress={() => { this.open('vehicleModel')}}>
                                    <RNPickerSelect
                                        ref={el => {this.inputRefs2.picker = el}}
                                        useNativeAndroidPickerStyle={false}
                                        style={{inputIOS: styles.IOS, inputAndroid: styles.android}}
                                        placeholder={{label: strings.corporateUser.selectModel ,value: null}}
                                        onValueChange={(value, index) => this.onPickerValueChange(value, index, 'vehicleModel')}
                                        value={vehicleModel}
                                        items={this.state.models}
                                    />
                                    <Icon
                                        size={20}
                                        name={'ios-chevron-down'}
                                        color={'#fff'}
                                    /> 
                                </TouchableOpacity>
                            </View>
                        </View>
                        { errors.vehicleManufacturer != undefined &&  errors.vehicleModel == undefined &&
                            <Text style={styles.error}>{strings.profile.response.error.errorManufacturer}</Text>
                        }
                        { errors.vehicleManufacturer == undefined &&  errors.vehicleModel != undefined &&
                            <Text style={styles.error}>{strings.profile.response.error.errorModel}</Text>
                        }
                        { errors.vehicleManufacturer != undefined &&  errors.vehicleModel != undefined &&
                            <Text style={styles.error}>{strings.profile.response.error.errorSelect}</Text>
                        }
                    </View>
                    {/* Submit Button */}
                    <TouchableOpacity onPress={!isLoading ? this.onSubmit : null }>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                        { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                          <Text style={styles.buttonText}>{strings.corporateUser.registerButton}</Text>
                        } 
                        </LinearGradient>
                    </TouchableOpacity>  
                    {/* Check Box */}
                    <View style={styles.checkboxContainer}> 
                        <Checkbox onCheckBoxToggle={this.handleCheckbox} status={this.state.isSelected}/>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.labelCheck() }>
                          <Text style={styles.checkboxLabel}>{strings.corporateUser.iAccept}</Text>
                        </TouchableOpacity>
                    </View> 
                    </KeyboardAwareScrollView>
                </Animatable.View>
            </View>
        )
    }
}
