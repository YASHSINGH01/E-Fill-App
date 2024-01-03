TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import { CommonActions } from '@react-navigation/native';
//Redux
import { connect } from 'react-redux';
import { userInfo,loginToken } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Constants
import { Images } from "../../constants/";
//Styles
import styles from './styles';
import { strings } from '../../utils/translations';
import AsyncStorage from "../../utils/AsyncStorage";

class Auth extends Component {
    constructor(props){
        super(props);
    }
    
    componentDidMount = () => {
        AsyncStorage.getAlreadyLaunched().then(val => {
            if(val === null || val == '') {
                Alert.alert(
                    "Welcome!",
                    "Please select your preferred language",
                    [
                        { text: "English", onPress: () => this.handleSetLanguage('en-US') },
                        { text: "Hindi", onPress: () => this.handleSetLanguage('en-IN') },
                            
                    ],
                );    
            }
        }); 
    }

    handleSetLanguage = key => {
        // console.log(key)
        AsyncStorage.setAlreadyLaunched('true');
        if(strings.getLanguage() != key){
            strings.setLanguage(key);
            
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'OnBoarding' },
                        { name: 'Auth'},
                    ],
                })
            );
        }
    }
    
    render() {
        let { navigation } =  this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Animatable.Image  animation="bounceIn" duration={1500} source={Images.auth} style={styles.onBoardImage} resizeMode={'contain'}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                            navigation.navigate("SignIn", {
                            screen: "SignIn",
                            });
                        }}>
                        <Text style={styles.buttonText}>{strings.welcome.signIn}</Text>
                    </TouchableOpacity>    
                    <TouchableOpacity style={styles.button} onPress={() => {
                            navigation.navigate("SelfUser", {
                            screen: "SelfUser"
                            });
                        }}>
                        <Text style={styles.buttonText}>{strings.welcome.createAccount}</Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity onPress={() => {
                            navigation.navigate("ForgetPassword");
                        }}>  
                        <Text style={styles.text}>{strings.welcome.recoverPassword}</Text>
                    </TouchableOpacity> */}
                    <Text style={[styles.text,{ marginTop: 50, fontSize: 10, textAlign:'center'}]}>
                     {strings.terms.initial}<Text style={{ fontSize: 12, color:'#A4FF8B',fontWeight: 'bold'  }} onPress={()=>this.props.navigation.navigate('LegalDocumentDetails', { item: { id: '2', title: strings.legalDocuments.terms } } )}>{strings.terms.termsConditions}</Text>
                     {'\n'}{strings.terms.concent}<Text style={{ fontSize: 12, color:'#A4FF8B', fontWeight: 'bold'  }} onPress={()=>this.props.navigation.navigate('LegalDocumentDetails', { item: { id: '1', title: strings.legalDocuments.privacy } } )}>{strings.terms.privacyPolicy}</Text>{strings.terms.end}
                     </Text>
                </Animatable.View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
      info: state,
      token: state.token,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      userInfo: bindActionCreators(userInfo, dispatch),
      loginToken: bindActionCreators(loginToken, dispatch)
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Auth);
