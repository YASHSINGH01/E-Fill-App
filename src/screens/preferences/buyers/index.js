import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, Alert, Switch } from 'react-native';
//Library
import * as Animatable from 'react-native-animatable';
//Components
import Header from '../../../components/Header';
import AsyncStorage from "../../../utils/AsyncStorage";
import messaging from '@react-native-firebase/messaging';
import { CommonActions } from '@react-navigation/native';
import {DevSettings} from 'react-native';
import RNRestart from 'react-native-restart';
//Redux
import { connect } from 'react-redux';
import { buycharger } from '../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
import prompt from 'react-native-prompt-android';
//Api
import HttpRequest from "../../../utils/HTTPRequest";
//Styles
import styles from './styles';
import { strings } from '../../../utils/translations';

class Buyers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            subscrib: 1,
            token: null,
            input: '',
            subscription: 0,
            DATA: [
                {
                    id: '1',
                    title: strings.preferences.distributer,
                },

            ]
        };
    }
    componentDidMount = () => {
        // this.tokenn();
        // this.unique();
        this._checkNotification = this.props.navigation.addListener('focus', () => {
            AsyncStorage.getDealer_pass_key().then(val => {
                // console.log('toggle', val);
                if (val != null && val != '') {
                  console.log('toggle1', val);

                    this.setState({
                        subscription: val
                    })
                }

            });
        });
    }

    componentWillUnmount() {
        this._checkNotification();
    }

    tokenn() {
        messaging().getToken().then(token => {
            // this.props.deviceToken(token);
            this.setState({ deviceToken: token })
            console.log(this.state.deviceToken, 'asdfgh');
        });
    }

    uniquetext() {

        let { subscribe, subscription } = this.state;
        if (subscription == 0) {
            //  subscription = 1
            this._toggleStatusNotifications();
        } else {
            subscription = 0
            this.setState({
                subscription: subscription,
            })
            // DevSettings.reload()
            // RNRestart.Restart();
        }
       
        AsyncStorage.setDealer_pass_key(subscription);
          console.log('subscribed0', subscription);
        this.props.buycharger(subscription, subscribe);
        
    //  console.log('subscribed', this.props.buycharger);

    }
    unique = (input) => {
        console.log(input);
        let { subscribe, subscription } = this.state;
        HttpRequest.dealersubscribe({ passkey: input })
            .then(res => {
                const result = res.data;
                // console.log('uue',subscribe);
                if (res.status == 200 && !result.error) {
                    // console.log(result);
                   
                    if (result.status == 1 && !result.error) {
                        subscription = input;
                        console.log('input',input);
                        
                        this.setState({subscription: subscription})
                        AsyncStorage.setDealer_pass_key(input);
                        this.props.buycharger(subscription, subscribe);
                        // DevSettings.reload()
                        // RNRestart.Restart();
                    }
                    
            
                } else {
                    subscription = 0;
                    this.setState({subscription: subscription});
                    AsyncStorage.setDealer_pass_key(subscription,subscribe);
                    this.props.buycharger(subscription, subscribe);
                    Alert.alert(
                        "",
                        result.message,
                        [
                            {
                                text: "OK",
                                onPress: () =>  {}
                            }
                         ],
                     )
                    console.log("API Error : ", result);
                }
                
            })
            .catch(err => {
                this.setState({ isLoading: false, });
                console.log("User Profile API Catch Exception: ", err);
            });
            
    }

    // configure(){
    //     let { subscribe, subscription } = this.state;
    //     subscription = 1;
    //     this.setState({subscription: subscription})
    //     AsyncStorage.setSubScription(subscription,subscribe);
    //     this.props.subscribed(subscription, subscribe);
    // }

    cancel(){
        let subscription,subscribe=this.state;
        subscription=0;
        this.setState({subscription: subscription});
        AsyncStorage.setDealer_pass_key(subscription);
        this.props.buycharger(subscription, subscribe);
        
        console.log('cacenl')
    }
    _toggleStatusNotifications() {
let code=this.state;
        prompt(
            'Vehicle Dealers ',
            'Enter your unique code ',
            [
                { text: 'Cancel', onPress: () => this.cancel(), style: 'cancel' },
                { text: 'OK', onPress: code => this.unique(code) },
            ],
            {
                type: 'default',
                cancelable: false,
                // defaultValue: this.setState({ input: code }),
                placeholder: 'Enter the code'
            }
        );


    }

    renderItem = ({ item }) => (
        <View style={[styles.item, styles.topRadius]}>
            <View style={[styles.row, { justifyContent: 'center' }]}>
                <Text style={[styles.title, styles.font, this.state.subscription == item.title ? styles.activeText : null]} numberOfLines={2}>{item.title}</Text>
                <View style={styles.switch}>

                    <Switch
                        trackColor={{ false: "#F44336", true: "#4CAF50" }}
                        thumbColor={this.state.subscription == 1 ? "#fff" : "#fff"}
                        ios_backgroundColor="#F44336"
                        value={this.state.subscription == 0 ? false : true}
                        onChange={() => this.uniquetext()}
                    />


                </View>
            </View>
        </View>
    );

    render() {
        let { navigation } = this.props;
        let { isLoading, DATA } = this.state;
        // console.log('notidata', DATA);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.preferences.distributer} />
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <FlatList
                        data={DATA}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id + ''}
                        ListHeaderComponent={
                            <View style={styles.Intro}>
                                <Text style={[styles.introTitle]}>{strings.preferences.distributer}</Text>
                            </View>
                        }
                    />
                </Animatable.View>
            </View>
        )
    }
}


const mapStateToProps = state => {

    return {
        token: state.token,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        buycharger: bindActionCreators(buycharger, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Buyers);

