import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, Switch } from 'react-native';
//Library
import * as Animatable from 'react-native-animatable';
import messaging from '@react-native-firebase/messaging';
//Components
import Header from '../../../components/Header';
import AsyncStorage from "../../../utils/AsyncStorage";
//Redux
import { connect } from 'react-redux';
import { notification } from '../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Styles
import styles from './styles';
import { strings } from '../../../utils/translations'; 

class NotificationSetting extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            allNotifications: 1,
            statusNotifications: 0,
            DATA: [
                { 
                    id: '1',
                    title: strings.preferences.allNotification, 
                },
                { 
                    id: '2',
                    title: strings.preferences.statusAlert, 
                },
            ]
        };
    }

    componentDidMount = () => {
        this._checkNotification = this.props.navigation.addListener('focus', () => {
            AsyncStorage.getNotification().then(val => {
                // console.log('toggle',val);
                if(val != null && val != '') {
                     console.log('toggle1',val);

                    this.setState({
                        allNotifications: val
                    })
                } 
                AsyncStorage.getStatusNotification().then(value => {
                    if(value != null && value != '') {
                        this.setState({
                            statusNotifications: value
                        })
                    } 
                });
            });
        });
    }

    componentWillUnmount() {
        this._checkNotification();
    }

    
    _toggleAllNotifications() {
        let notificationStatus;
        const { allNotifications } = this.state;

        if(allNotifications == 1){
            notificationStatus = 0
        } else {
            notificationStatus = 1
        }
        this.setState({
            allNotifications: notificationStatus
        })
        this.firebaseUpdate(notificationStatus);
        AsyncStorage.setNotification(notificationStatus);
        this.props.notification(notificationStatus); 
        console.log('Subscribed to topics!',this.props.notification);
    }

    //Notification Updates
    firebaseUpdate = async (notification) => {
        if(notification == 1){
            messaging().subscribeToTopic('notification')
            .then(() => console.log('Subscribed to topics!'));
        } else {
            messaging().unsubscribeFromTopic('notification')
            .then(() => console.log('Unsubscribed fom the topic!'));
        }
    }

    _toggleStatusNotifications() {
        let { statusNotifications } = this.state;
        if(statusNotifications == 1){
            statusNotifications = 0
        } else {
            statusNotifications = 1
        }
        this.setState({
            statusNotifications: statusNotifications
        })
        AsyncStorage.setStatusNotification(statusNotifications);
    }

    renderItem = ({ item, index }) => (
        <View style={[styles.item, index == 0 ? styles.topRadius : styles.bottomRadius, this.state.selectedLanguage == item.title ? styles.active : null]}>
            <View style={[styles.row, { justifyContent: 'center'}]}>
                <Text style={[styles.title, styles.font,  this.state.selectedLanguage == item.title ? styles.activeText : null]} numberOfLines={2}>{item.title}</Text>         
                <View style={styles.switch}>
                    { index == 0 ?
                        <Switch
                            trackColor={{ false: "#F44336", true: "#4CAF50" }}
                            thumbColor={this.state.allNotifications == 1 ? "#fff" : "#fff"}
                            ios_backgroundColor="#F44336" 
                            value={ this.state.allNotifications == 0 ? false : true} 
                            onChange={() => this._toggleAllNotifications()}  
                        /> 
                        :
                        <Switch 
                            trackColor={{ false: "#F44336", true: "#4CAF50" }}
                            thumbColor={this.state.statusNotifications == 1 ? "#fff" : "#fff"}
                            ios_backgroundColor="#F44336" 
                            value={ this.state.statusNotifications == 0 ? false : true} 
                            onChange={() => this._toggleStatusNotifications()} 
                        />
                    }
                </View>
            </View>
       </View>
    );

    render() {
            let { navigation } =  this.props;
            let { isLoading, DATA } = this.state;
    // console.log('notidata',DATA);
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                      <Header navigation={navigation} type={strings.preferences.allNotification}/>
                    </View>
                    <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                        <FlatList
                            data={DATA}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id+''}
                            ListHeaderComponent={ 
                                <View style={styles.Intro}>
                                    <Text style={[styles.introTitle]}>{strings.preferences.notification}</Text>
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
        notification: bindActionCreators(notification, dispatch),
    };
}
  
  export default connect(mapStateToProps,mapDispatchToProps)(NotificationSetting);
  
