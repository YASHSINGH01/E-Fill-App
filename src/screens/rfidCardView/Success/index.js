//Password Reset Success Screen
// Enter new password & confirm password Screen
TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { CommonActions } from '@react-navigation/native';
//Constants
import { Images } from "../../../constants/";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../../constants/colors";
import { strings } from "../../../utils/translations";


export default class success extends Component {
    constructor(props){
        super(props);
    }

    goBack = () => {
        this.props.navigation.navigate('Home');
    }

    render() {
        let { navigation } =  this.props;
        return (
            <View style={styles.container}>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.ImageContainer}>
                        <Animatable.Image  animation="bounceIn" duration={1500} source={Images.success} style={styles.resetPassword} resizeMode={'contain'}/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={[styles.buttonText, {color: '#fff', fontSize: 16}]}>{strings.rfid.message}</Text>
                       <Text style={[styles.buttonText, {color: '#fff', fontSize: 16}]}>{strings.rfid.message1}</Text>

                    </View>
                   
                    <TouchableOpacity onPress={() => this.goBack()}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                          <Text style={styles.buttonText}>{strings.newPassword.goBack}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    </ScrollView>
                </Animatable.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: COLORS.PRIMARY,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageContainer: {
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        width: screenWidth * 0.7,
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    resetPassword: {
        width: screenHeight * 0.5,
        height: screenHeight * 0.3,
        resizeMode:'contain'
    },
    footer: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '10%'
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
        justifyContent: 'center',
        alignItems: 'center',
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
    inputContainer: {
        width: screenWidth - 40 ,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.black,
        borderRadius: 30,
    },
    inputText: {
        flex:1,
        height:'100%',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.black,
        marginLeft: '2%'
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
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 30
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
        textAlign: 'center',
        // position: 'absolute',
        // bottom : '10%'
    },
    checkboxContainer: {
        flex:1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
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