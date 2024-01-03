import React, { Component } from 'react'
import { View, Image, ActivityIndicator } from 'react-native'
import styles from './styles';

export default class Splash extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image  style={styles.splashImage} source={require('../../../assets/images/splash.png')}/>
                <ActivityIndicator size='large' color={'#fff'} style={styles.loader}/>
            </View>
        )
    }
}


