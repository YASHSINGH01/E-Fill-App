import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native'
//Library
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as Animatable from 'react-native-animatable';
//Styles
import styles from './styles';
//Resource
import { Images } from "../../../constants";
import { strings } from '../../../utils/translations';

const slides = [
    {
      key: 'one',
      title: strings.splash1.title,
      text: strings.splash1.description,
      image: Images.onBoard1,
      backgroundColor: '#FFFF',
    },
    {
      key: 'two',
      title: strings.splash2.title,
      text: strings.splash2.description,
      image: Images.onBoard2,
      backgroundColor: '#FFFF',
    },
    {
      key: 'three',
      title: strings.splash3.title,
      text: strings.splash3.description,
      image: Images.onBoard3,
      backgroundColor: '#FFFF',
    }
];

export default class OnBoarding extends Component {
    constructor(props){
        super(props);
    }
    
    _renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image  animation="bounceIn" duration={1500} source={item.image} style={styles.onBoardImage} resizeMode={'contain'}/>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
            </Animatable.View>
        </View>
        );
    }
    _renderNextButton = () => {
        return (
        <View style={styles.buttonCircle}>
            <Icon
            name="arrow-forward"
            color="#84cf96"
            size={30}
            />
        </View>
        );
    };
    _renderDoneButton = () => {
        let { navigation } =  this.props;
        return (
        <TouchableOpacity style={[styles.buttonCircle, styles.active]} onPress={() => {
            navigation.navigate("Auth", {
              screen: "Auth"
            });
          }}>
            <Icon
            name="checkmark"
            color="#fff"
            size={30}
            />
        </TouchableOpacity>
        );
    };
    render() {
        return (
        <AppIntroSlider
            data={slides}
            renderItem={this._renderItem} 
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}
            activeDotStyle={styles.activeDot}
        />
        );
    }
}