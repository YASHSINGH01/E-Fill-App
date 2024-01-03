import React, {Component} from 'react'
import { ScrollView, Text, View, Image, StyleSheet, Linking, Dimensions, SafeAreaView, TouchableOpacity, Platform } from 'react-native'
//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
import WS from 'react-native-websocket';
import { showMessage, hideMessage } from "react-native-flash-message";
import moment from "moment";
//Redux
import { connect } from 'react-redux';
import { orderID, orderAmount, couponStatus, couponApplied } from '../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Api
import HttpRequest from "../utils/HTTPRequest";
// Theme Colors
import COLORS from "../constants/colors";
//Constants
import { Images } from "../constants/";
import { strings } from "../utils/translations";

// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;

class Success extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isWebsocketConnected: false
        };
      
    }

    componentDidMount = () => {
        console.log("Charging Point Info: ",this.props.charging_point_info);
    }

    closeSuccess = () => {
        let { type } = this.state;
        if(type != 2) {
            this.props.closeModal();
        } else {
            Alert.alert(
                "Are you sure ?",
                "Do you want to start the charging ?",
                [
                    {
                        text: "No",
                        onPress: () =>   this.props.closeModal()
                    },
                    {   
                        text: "Yes", 
                        onPress: () =>  this.startTransactionRequest()
                    }
                ],
            );
           
        }
        
    }

    formatTime = (time = '') => {
        var H = +time.substr(0, 2);
        var h = (H % 12) || 12;
        var ampm = H < 12 ? " AM" : " PM";
        time = h + time.substr(2, 3) + ampm;
        return time;
    }

    call = (data) => {
        let phoneNumber = data.phone;
        phoneNumber = phoneNumber.replace(/\s/g, '');
        if(phoneNumber.startsWith("+")){
            var temp = phoneNumber.substring(3, phoneNumber.length);
            phoneNumber = temp;
        }
       
        if (Platform.OS === 'android') {
          phoneNumber = 'tel:${'+phoneNumber+'}';
        }
        else {
          phoneNumber = 'telprompt:${'+phoneNumber+'}';
        }
        console.log("phone: ",phoneNumber);
        Linking.canOpenURL(phoneNumber)
		.then((supported) => {
			if (supported) {
				return Linking.openURL(phoneNumber)
					.catch(() => console.log('Unable to make a call'));
			}
		});
    };
      
    navigate = (data) => {
        const latitude = data.lat;
        const longitude = data.long;
        const label = data.name;
        const url = Platform.select({
            ios: "maps:" + latitude + "," + longitude + "?q=" + label,
            android: "geo:" + latitude + "," + longitude + "?q=" + label
        });
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                browser_url =
                    "https://www.google.de/maps/@" +
                    latitude +
                    "," +
                    longitude +
                    "?q=" +
                    label;
                return Linking.openURL(browser_url);
            }
        });
    }

    startTransactionRequest = () => {
        let { charging_station_info, charging_point_info, order_id } = this.props;

        let random = Math.floor(1000000 + Math.random() * 9999999);
        let remoteStartId = Math.floor(Math.random() * 1000000000);

        const ws = new WebSocket('ws://cms.efillelectric.com:6002/EFILLXOCPP16J/STINT-EF-START-001', 'ocpp1.6');

        ws.onopen = () => {
            // console.log('WebSocket Client Connected. Sending "RequestStartTransactionApp"');
            let payloadData = {
                "idToken": this.props.info.id, //User Id
                "evseId": charging_point_info.connector_type_id, //Connector
                "chargingPoint": charging_point_info.connector_point_name, //Charging Point Name
                "remoteStartId": remoteStartId
            };

            let payload = [
                2, random , "RequestStartTransactionApp",
                payloadData
            ];
            console.log('Payload sent in "RequestStartTransactionApp" : ', payload);

            ws.send(JSON.stringify(payload));
            ws.onclose();

            let chargingDetails = {
                "id": 2,
                "charging_station_id": charging_station_info.id,
                "charging_point_id": charging_point_info.id,
                "order_id": order_id,
                "connector_type_id": charging_point_info.connector_type_id,
                "charge_date": moment().format("dddd, MMMM Do YYYY"),
                "charge_time":  moment().format("h:mm:ss a"),
                "chargin_station_name": charging_station_info.name,
                "address": charging_station_info.address,
                "longitude": charging_station_info.long,
                "latitude": charging_station_info.lat,
                "connector_type_name": charging_point_info.connector_type,
                "connector_point_name": charging_point_info.name,
                "image": charging_station_info.image
            };
           
            this.getTransactionId(chargingDetails, payloadData);
        }
        ws.onmessage = (event) => { 
              console.log("Received: '" + event.data + "'");
        }
        ws.onerror = (error) => { 
            console.log('Connection Error', error);
        }
        ws.onclose = () => {
            console.log('echo-protocol Client Closed');
        }
    }

    getTransactionId = (details, payloadData) => {
        HttpRequest.getTransactionId({ connector_type_id: payloadData.evseId, cp_name: payloadData.chargingPoint, remoteStartId: payloadData.remoteStartId }, this.props.token)
        .then(res => {
            const result = res.data;
            if (res.status == 200 && !result.error) {
               //console.log("Get Transaction Id API Response ---------- ", result);
               //console.log("Transaction Id :", result.transaction_id);
                if(result.transaction_id != 0){
                    payloadData.transactionId = result.transaction_id; 
                    this.props.closeModal(details, payloadData, 2);
                } else {
                    showMessage({
                        message: strings.error.oops,
                        description: strings.error.chargingPointUnavailable,
                        type: "error",
                    });
                }
            } else {
                showMessage({
                    message: strings.error.oops,
                    description: strings.error.chargingPointUnavailable,
                    type: "danger",
                });
            }
        })
        .catch(err => {
            this.setState({ isLoading: false });
            //console.log("Get Transaction Id API Catch Exception: ",err);
            showMessage({
               message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    }
      
    render() {
        let { units, date, time, amount, charging_station, type } = this.props.data;
        return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.content}>
                    <View style={styles.buttonContainer}>
                        <Icon name="md-checkmark-sharp" size={30} color="#fff"/>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.titleText} numberOfLines={1}>{strings.successTransaction.status}</Text>
                        <Text style={styles.subTitleText} numberOfLines={2}>{strings.successTransaction.message}</Text>
                    </View>
                    <Image source={Images.seperator} style={styles.seperator}/>
                    <View style={styles.body}>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.label]}>{strings.successTransaction.noOfUnits}</Text>
                            <Text style={[styles.text, styles.value]}>{units} Units</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.label]}>{strings.successTransaction.date}</Text>
                            <Text style={[styles.text, styles.value]}>{date == 'Now' ? moment().format("dddd, MMMM Do YYYY") : date }</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.label]}>{strings.successTransaction.time}</Text>
                            <Text style={[styles.text, styles.value]}>{time == 'Now' ? moment().format("h:mm:ss a") : this.formatTime(time)}</Text>
                        </View>
                        <View style={styles.row}>
                        <View style={[styles.row, styles.column]}>
                            <Text style={[styles.text, styles.value ]}>{strings.successTransaction.totalPrice}</Text>
                            <Text style={[styles.text, styles.value, styles.active]}>Rs. {amount}</Text>
                        </View>
                        { type == 2 &&
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.startTransactionRequest()} style={[styles.row, styles.column, styles.button]}>
                            <Text style={[styles.text, styles.value ]}>START</Text>
                        </TouchableOpacity>
                        }
                        </View>
                    </View>
                    <Image source={Images.seperator} style={styles.seperator}/>
                    <View style={styles.footer}>
                        <Text style={styles.titleText} numberOfLines={1}>{charging_station.name}</Text>
                        <Text style={styles.subTitleText} numberOfLines={2}>{charging_station.address}</Text>
                    </View>
                    {/* <View style={styles.footerButtonContainer}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.navigate(charging_station)} style={styles.footerButtonContent}>
                            <Icon name="md-navigate" size={30} color="#fff"/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.call(charging_station)} style={styles.footerButtonContent}>
                            <Icon name="md-call" size={30} color="#fff"/>
                        </TouchableOpacity>
                    </View> */}
                </View>
                <TouchableOpacity onPress={this.closeSuccess} style={styles.closeContainer}>
                    <Icon name="ios-close-circle-outline" size={60} color="#fff"/>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        paddingTop: 15
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '80%',
        justifyContent: 'center',
        marginVertical: 20,
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: COLORS.DEFAULT
    },
    seperator: {
        flex: 0.1,
        width: '100%',
        resizeMode: 'contain',
    },
    header: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    footer:{
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerButtonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        fontWeight: '800',
        color: COLORS.PRIMARY,
        margin: 5,
        marginLeft: 20,
    },
    subTitleText: {
        fontSize: 12,
        fontWeight: '500',
        fontFamily: "Poppins-Regular",
        color: COLORS.INPUT_LABEL,
        textAlign: 'center',
        marginHorizontal: 10
    },
    buttonContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop: -30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.DEFAULT,
        borderWidth: 2,
        backgroundColor: COLORS.SUCCESS
    },
    footerButtonContent: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: -30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.DEFAULT,
        borderWidth: 2,
        backgroundColor: COLORS.WARNING
    },
    buttonIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    column: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    text: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
    },
    label: {
        color: COLORS.INPUT_LABEL
    },
    value: {
        color: COLORS.PRIMARY,
        fontWeight: '700'
    },
    active: {
        fontSize: 20,
    },
    button: {
        alignSelf: 'center',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.SUCCESS,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 30
    },
    closeContainer: {
        width: '100%',
        marginTop: 20,
        bottom: 2,
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
   
});


const mapStateToProps = state => {
    
    return {
        info: state.info,
        token: state.token,
        order_id: state.order_id,
        order_amount: state.order_amount,
        coupon_status: state.coupon_status,
        coupon_applied: state.coupon_applied,
        charging_station_info: state.charging_station_info,
        charging_point_info: state.charging_point_info,
        book_charger_info: state.book_charger_info,
        booking_info: state.booking_info
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        orderID: bindActionCreators(orderID, dispatch),
        orderAmount: bindActionCreators(orderAmount, dispatch),
        couponStatus: bindActionCreators(couponStatus, dispatch),
        couponApplied: bindActionCreators(couponApplied, dispatch)
    };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Success);

