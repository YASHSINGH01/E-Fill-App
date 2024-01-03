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
//Redux
import { connect } from 'react-redux';
import { subscribed } from '../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
import prompt from 'react-native-prompt-android';
//Api
import HttpRequest from "../../../utils/HTTPRequest";
//Styles
import styles from './styles';
import { strings } from '../../../utils/translations';
class StationVisibility extends Component {
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
                    title: strings.preferences.mobility,
                },

            ]
        };
    }
    componentDidMount = () => {
        // this.tokenn();
        // this.unique();
        this._checkNotification = this.props.navigation.addListener('focus', () => {
            AsyncStorage.getSubScription().then(val => {
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
            DevSettings.reload()
        }
       
        AsyncStorage.setSubScription(subscription, subscribe);
         console.log('subscribed0', subscription);
        this.props.subscribed(subscription, subscribe);
        
        console.log('subscribed', this.props.subscribed);

    }
    unique = (input) => {
        console.log(input);
        let { subscribe, subscription } = this.state;
        HttpRequest.subscription({ passkey: input })
            .then(res => {
                const result = res.data;
                if (res.status == 200 && !result.error) {
                    console.log(result);
                    if (result.status == 1 && !result.error) {
                        subscription = 1;
                        this.setState({subscription: subscription})
                        AsyncStorage.setSubScription(subscription,subscribe);
                        this.props.subscribed(subscription, subscribe);
                        DevSettings.reload()
                    }
                    
            
                } else {
                    subscription = 0;
                    this.setState({subscription: subscription});
                    AsyncStorage.setSubScription(subscription,subscribe);
                    this.props.subscribed(subscription, subscribe);
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
        AsyncStorage.setSubScription(subscription,subscribe);
        this.props.subscribed(subscription, subscribe);
        
        console.log('cacenl')
    }
    _toggleStatusNotifications() {
let code=this.state;
        prompt(
            'Telematrix Subscription ',
            'Enter your unique code ',
            [
                { text: 'Cancel', onPress: () => this.cancel(), style: 'cancel' },
                { text: 'OK', onPress: code => this.unique(code) },
            ],
            {
                type: 'default',
                cancelable: false,
                defaultValue: this.setState({ input: code }),
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
                    <Header navigation={navigation} type={strings.preferences.mobility} />
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <FlatList
                        data={DATA}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id + ''}
                        ListHeaderComponent={
                            <View style={styles.Intro}>
                                <Text style={[styles.introTitle]}>{strings.preferences.mobility}</Text>
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
        subscribed: bindActionCreators(subscribed, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StationVisibility);

