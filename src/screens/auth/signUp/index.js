TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
//Constants
import { Images } from "../../../constants/";
//Components
import Header from "../../../components/Header";
//Styles
import styles from './styles';
import { strings } from '../../../utils/translations';

export default class CreateAccount extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let { navigation } =  this.props;
        return (
            <View style={styles.container}>
                 <View style={styles.header}>
                  <Header navigation={navigation} type={strings.welcome.createAccount}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <View style={styles.ImageContainer}>
                        <Animatable.Image  animation="bounceIn" duration={1500} source={Images.userCategory} style={styles.userCategory} resizeMode={'contain'}/>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => {
                            navigation.navigate("SelfUser", {
                            screen: "SelfUser"
                            });
                        }}>
                        <Text style={styles.buttonText}>{strings.auth.selfUser}</Text>
                    </TouchableOpacity>
                   {/* <TouchableOpacity style={styles.button} onPress={() => {
                            navigation.navigate("CorporateUser", {
                            screen: "CorporateUser"
                            });
                        }}>
                        <Text style={styles.buttonText}>{strings.auth.corporateUser}</Text>
                    </TouchableOpacity>*/}

                    <Text style={[styles.text,{ marginTop: 50, fontSize: 10}]}>{strings.terms.description}</Text>
                </Animatable.View>
            </View>
        )
    }
}
