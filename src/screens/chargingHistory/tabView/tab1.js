import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, FlatList, RefreshControl, Alert, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
//Library
import { showMessage } from "react-native-flash-message";
import LinearGradient from 'react-native-linear-gradient';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import moment from "moment";
//Api
import HttpRequest from "../../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Theme Colors
import COLORS from "../../../constants/colors";
import { Images } from '../../../constants';

import { strings } from "../../../utils/translations";

class tab1 extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            isLoading: true,
            historyData: '',
            refreshing: false
        };
    }

    componentDidMount = () => {
        
        this._checkNotificationCount = this.props.navigation.addListener('focus', () => {
            this.getBookingHistory();
      
          });
    }
    componentWillUnmount() {
        // this._unsubscribe();
         this._checkNotificationCount();
      
      
            }

    onRefresh = () => {
        this.setState({ refreshing : true, historyData: ''})
        this.getBookingHistory()
    }

    //Get Pending/New booking history through API 
    getBookingHistory = () => {
        HttpRequest.getBookingHistory({ status: 0 }, this.props.token)
        .then(res => {
            this.setState({ isLoading: false });
            const result = res.data;
           console.log("Get Pending/New booking history  API Response ---------- ", result.data);
            if (res.status == 200 && !result.error) {
            //    console.log("Get Pending/New booking history  API Response ---------- ", res);
                this.filterPendingHistory(result.data, false);
               // this.setState({ historyData: result.data, refreshing: refreshing});
            } else {
                this.setState({ refreshing: false });
                console.log("Get Pending/New booking history  API Error : ",result);
            }
        })
        .catch(err => {
            this.setState({ isLoading: false, refreshing: false });
            console.log("Get Pending/New booking history API Catch Exception: ",err);
        });
    }

    filterPendingHistory = (data, refreshing) => {
        this.setState({ historyData: data, refreshing: refreshing});
    }

    //Cancel Booking through API
    cancelBooking = (id = '', order_id = '') => {
        let { historyData } = this.state;
        HttpRequest.cancelBooking({ id: id }, this.props.token)
        .then(res => {
            this.setState({ isLoading: false });
            const result = res.data;
             console.log("Cancel Booking API Response ---------- ", result);
            if (res.status == 200 && !result.error) {
                // console.log("Cancel Booking API Response ---------- ", result);
                historyData = historyData.filter((item) => item.id !== id);
                this.setState({ historyData:  historyData });
                // showMessage({
                //     message: strings.chargingHistory.response.success.title,
                //     description: strings.chargingHistory.response.success.message,
                //     type: "success",
                // });
                //Display success screen
            } else {
                console.log("Cancel Booking API Error : ",result);
                showMessage({
                   message: strings.error.title,
                    description: result.message != undefined ? result.message : result.status,
                    type: "danger",
                });
            }
        })
        .catch(err => {
            this.setState({ isLoading: false });
            console.log("Cancel Booking API Catch Exception: ",err);
            showMessage({
               message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    }

    //View Booking Details navigation
    viewDetails = (item) => {
        this.props.navigation.navigate('ChargingLog', { id: item.id,item:item, status: 0});
    }

    getDetails = (item) => {
        this.props.navigation.navigate('ChargingLog', { id: item.id,item:item, status: 3});
    }

    cancel = (item) => {
        Alert.alert(
            strings.chargingHistory.areYouSure,
            strings.chargingHistory.cancelMessage,
            [
                {
                    text: strings.chargingHistory.no,
                    style: "cancel"
                },
                {   
                    text: strings.chargingHistory.yes, 
                    onPress: () => this.cancelBooking(item.id, item.order_id) 
                }
            ],
        );
    }

    renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={styles.itemHeader}>
                {/* Charging Station Image & Ratings */}
                <View style={styles.row}> 
                    <Image source={{uri:item.icon}} style={styles.image}/>
                    <View style={[styles.content, { flex: 3}]}>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.title]}  numberOfLines={1}>{item.charging_station_name}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent, {marginTop: 10}]}>
                            <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.chargingPoint}</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.connector_point_name}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent ]}>
                            <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.connector}</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.charger_type}</Text>
                        </View>
                       
                       <View style={[styles.row, styles.descriptionContent]}>
                                                  <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.connectorno}</Text>
                                                  <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.connector_no}</Text>
                                              </View>
                                              <View style={[styles.row, styles.descriptionContent ]}>
                            <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.kWh}</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.estimated_kwh}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.date}</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.charge_date1}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.time}</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.charge_time}</Text>
                        </View>
                         <View style={[styles.row, styles.descriptionContent]}>
                          <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.endtime}</Text>
                          <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.end_time}</Text>
                          </View>
                    </View>
                </View>
                <View style={styles.seperator} />
                { item.booking_status == 1 ?
                <View style={styles.row}>
                    <TouchableOpacity style={styles.signInButton} onPress={() => this.viewDetails(item)}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.linearGradient}>
                                <Text style={styles.cancelText}>{strings.chargingHistory.viewDetails}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signInButton} onPress={() => this.cancel(item)}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FF6A00','#EE0979']} style={styles.linearGradient}>
                        <Text style={styles.cancelText}>{strings.chargingHistory.cancelBooking}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                : 
                <View style={styles.row}>
                    <TouchableOpacity style={styles.signInButton} onPress={() => this.getDetails(item)}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.linearGradient}>
                                <Text style={styles.cancelText}>{strings.chargingHistory.resume}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                }
            </View>
        </View>
    )

    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>{strings.chargingHistory.response.error.notFound}</Text>
        </View>
    )

    render() {
        let { historyData, isLoading, refreshing } = this.state;
        return (
            <View style={styles.container}>
             { isLoading ? 
                <ActivityIndicator size='large' color='#fff' /> 
                :
                <FlatList
                    data={historyData}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id+''}
                    ListEmptyComponent={() => this.listEmptyComponent()}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={'#fff'}/>
                    }
                />
            }
            </View> 
        )
    }
}

let screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center', 
    },
     //List view
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.DEFAULT,
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    itemHeader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    seperator: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row', 
        borderTopColor: '#ccc', 
        borderTopWidth: 1, 
        margin: 5
    },
    button: {
        flex: 1,  
        height: 50,
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 10,  
        margin: 5,
        borderRadius: 10, 
    },
    signInButton: {
        flex: 1,  
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5, 
        margin: 5,
    },
    linearGradient: {
        width: '90%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5, 
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    success : {
        backgroundColor: COLORS.SUCCESS
    },
    danger: {
        backgroundColor: COLORS.ERROR
    },
    leftAlign: {
        textAlign: 'left'
    },
    customImage: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 40
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 10
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
    },
    descriptionContent: {
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    col: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK
    },
    cancelText: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: "Poppins-Regular",
        color: COLORS.PRIMARY
    },
    label: {
        // fontWeight: '700',
        color: COLORS.LIGHT_BLACK
    },
    description: {
        fontSize: 12,
        color: COLORS.DEFAULT,
        fontWeight: '400',
        fontFamily: "Poppins-Regular",
        color: COLORS.LIGHT_BLACK
    },
    createdAt: {
        fontSize: 10,
        color: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        fontWeight: '400',
        color: COLORS.INPUT_LABEL
    },
    noDataFoundContainer: {
        flex: 1,
        height: screenHeight/2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataFoundText: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",
    }
});

const mapStateToProps = state => {
    
    return {
      token: state.token,
    };
};
  
  
const mapDispatchToProps = (dispatch) => {
      return bindActionCreators({}, dispatch);
}
  
export default connect(mapStateToProps,mapDispatchToProps)(tab1);
