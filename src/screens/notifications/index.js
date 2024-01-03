TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, RefreshControl, Animated, ActivityIndicator } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage, hideMessage } from "react-native-flash-message";
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
//Components
import Header from '../../components/Header';
//Api
import HttpRequest from "../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
// import {  } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Constants
import { Images } from "../../constants/";
//Styles
import styles from './styles';
import { strings } from '../../utils/translations';


const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

class Notification extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            refreshing: false,
            count: 0
            //Object.values(DATA).length
        };
    }

    componentDidMount = () => {
        this.getNotifications();
    }
   
    // Get Notifications Through Api
    getNotifications = () => {
        HttpRequest.getAllNotifications(this.props.token)
        .then(res => {
            this.setState({ isLoading: false });
            const result = res.data;
            if (res.status == 200 && !result.error) {
                // console.log("Notification API Response ---------- ", result);
                 this.setState({ refreshing: false})
                this.setState({ notificationData:  result.data, count: result.notification_count, refreshing: false})
            } else {
                console.log("Notification API Error : ",result);
            }
        })
        .catch(err => {
            this.setState({ isLoading: false });
            console.log("Notification API Catch Exception: ",err);
            showMessage({
               message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    }
    
    // Read Specific Notifications Through Api
    readSpecificNotifications = (id = '') => {
        let { notificationData } = this.state;
        console.log("Notification Id: ", id);
        HttpRequest.readSpecificNotification({notification_id: id }, this.props.token)
        .then(res => {
            this.setState({ isLoading: false });
            const result = res.data;
            if (res.status == 200 && !result.error) {
                console.log("Notification API Response ---------- ", result);
                // this.setState({ notificationData:  result.data})
                notificationData = notificationData.filter((item) => item.id !== id);
                this.setState({ notificationData:  notificationData, count:  Object.values(notificationData).length});
            } else {
                console.log("Notification API Error : ",result);
                showMessage({
               message: strings.error.title,
                description: result.message != undefined ? result.message : result.status,
                type: "danger",
                });
            }
        })
        .catch(err => {
            this.setState({ isLoading: false });
            console.log("Notification API Catch Exception: ",err);
            showMessage({
               message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    };

    // Read All Notifications Through Api
    readAllNotifications = () => {
        HttpRequest.readAllNotification(this.props.token)
        .then(res => {
            const result = res.data;
            if (res.status == 200 && !result.error) {
                // console.log("Notification API Response ---------- ", result);
                this.setState({ notificationData: '', count: 0});
            } else {
               console.log('Error: ',result);
            }
        })
        .catch(err => {
            console.log("Notification API Catch Exception: ",err);
        }); 
    }

    onRefresh = () => {
        this.setState({ refreshing : true})
        this.getNotifications();
    }

    renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [0, 50, 100, 101],
          outputRange: [-30, 0, 0, 1],
        });
        return (
          <RectButton style={styles.leftAction} onPress={this.close}>
            <Animated.Text
              style={[
                styles.textAction,
                {
                  transform: [{ translateX: trans }],
                },
              ]}>
              Mark as Read
            </Animated.Text>
          </RectButton>
        );
    };

    // listEmptyComponent = () => (
    //     <View style={styles.noDataFoundContainer}>
    //         <Text style={styles.noDataFoundText}>No new notifications found.</Text>
    //     </View>
    // )

    renderItem = ({ item, index }) => (
        <Swipeable
            renderLeftActions={this.renderLeftActions}
            onSwipeableLeftOpen={() => this.readSpecificNotifications(item.id)}
        >
            <View style={styles.item}>
                <View style={styles.IconContainer}>
                    {/* Notification Icon */}
                    <Icon name="ios-notifications" size={32} color="#5dda96"/>
                </View>
                <View style={styles.content}>
                    {/* Title */}
                        <Text style={[styles.text, styles.title]} numberOfLines={5}>{item.message}</Text>
                
                    {/* Desctiption */}
                    {/* <Text style={[styles.text,styles.description]}>{item.message}</Text> */}
                
                    {/* Created At */}
                    <Text style={[styles.text,styles.createdAt]}>{item.date}</Text>
                    
                </View>
            </View>
        </Swipeable>
    );

    render() {
        let { navigation } =  this.props;
        let { isLoading, notificationData, refreshing, count} = this.state;

        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.notification.title} readAll={this.readAllNotifications} token={this.props.token} count={this.state.count}/>
                </View>
                { !isLoading ? count > 0 ?
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <FlatList
                        data={notificationData}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={'#fff'}/>
                        }
                    />
                </Animatable.View>: 
                <Animatable.View animation="fadeInUpBig" style={[styles.footer, styles.alignCenter ]}>
                    <Image source={Images.notificationNotFound} style={styles.notFoundImage} />
                    <Text style={[styles.headingText]}>{strings.notification.noNotification}</Text>
                </Animatable.View>
                :
                <Animatable.View animation="fadeInUpBig" style={[styles.footer, styles.alignCenter ]}>
                    <ActivityIndicator size='large' color='#fff' /> 
                </Animatable.View>
                }
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
      return bindActionCreators({}, dispatch);
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Notification);
