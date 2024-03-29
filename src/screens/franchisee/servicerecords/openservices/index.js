//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import StarRating from 'react-native-star-rating';
import { showMessage, hideMessage } from "react-native-flash-message";
import { TouchableRipple } from 'react-native-paper';
//Components
import Header from '../../../../components/Header';
//Constants
import { Images } from "../../../../constants/";
//Api
import HttpRequest from "../../../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { userInfo, loginToken, subscribed, buycharger } from '../../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';

import { strings } from '../../../../utils/translations';
// Theme Colors
import COLORS from "../../../../constants/colors";

import AsyncStorage from "../../../../utils/AsyncStorage";
import { Badge } from 'react-native-paper';

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 28.9345800;
const LONGITUDE = 77.0923800;
const LATITUDE_DELTA = 0.0522;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var  df="";
const geolib = require('geolib');
const amd=[];
class fopenservices extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            chargingPointData: '',
             favorite: false,
             distance:0,
             orders: 0,
             passkey:'',
            
             
    
            refreshing: false,
        };
    }

    componentDidMount = () => {
        this._getChargingStation = this.props.navigation.addListener('focus', () => {
            this.getChargingStations();
            // this.getCurrentLocation();
            this.dealervalue();
        });
    }

    componentWillUnmount() {
        this._getChargingStation();
    }
    dealerpasskey(){
        AsyncStorage.getDealer_pass_key().then(result => {
            // console.log('toggle', val);
            if (result != null && result != '') {
                console.log('passkey', result);

                this.setState({
                    passkey: result
                });
                 this.getChargingStations();
            }

        });
    }
    dealervalue =()=>{
        try{
            AsyncStorage.getDealer_vehicle_storage().then(val => {
                if (val) {
                    df = val;
                    var arr = df.split("@");

                    console.log('lenght', arr.length);
                    if (arr.length != 0) {
                        console.log('toggle1');

                        this.setState({
                            orders: arr.length
                        })
                    }
                    else {

                    }


                } else {
                    console.log("dd");
                    this.setState({
                        orders: 0
                    });
                }

            });
        }catch{
            console.log('catch');
        }
       
    }

    getChargingStations = () => {
        let { props } = this;
        let { radius, region } = this.state;
        console.log(region,'region')
      
        HttpRequest.service_open({franchisee_code:props.info.phone})
            .then(res => {
                
                const result = res.data;
                console.log(" Charger Service open Response ---------- ", result);
                if (res.status == 200 ) {
                    this.setState({ chargingPointData: result.data, refreshing: false,favorite: result.favorite, isLoading: false});
                   
                    // list1.push({icon:Images.product});
                 
                   
                    // this.setState({chargingPointData:...list1t})
                    console.log("distance",this.state.chargingPointData);
                } else {
                    this.setState({ isLoading: false });
                    console.log("Stock API Error : ",result);
                    showMessage({
                       message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false, refreshing: false });
                console.log("Charging Station API Catch Exception: ",err);
                showMessage({
                   message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });


    }

  invoice(item){
      
      console.log('invoice',item);
      let { navigation } = this.props;
      navigation.navigate('fServiceinvoice', { item });

  }

  renderItem = ({ item }) => (
    <View style={styles.item} activeOpacity={.7} >
       <View style={styles.itemHeader}>
            {/* Charging Station Image & Ratings */}
            <View style={styles.row}>
                <Image source={{ uri: item.service_icon }} style={styles.image} />
                <View style={[styles.content, { flex: 3 }]}>
                    <View style={styles.row}>
                        <Text style={[styles.text, styles.title]} numberOfLines={1}>{item.chessis_no}</Text>
                    </View>
                    <View style={[styles.row, styles.descriptionContent, { marginTop: 0 }]}>
                        <Text style={[styles.text, styles.description, styles.label]}>Customer Name</Text>
                        <Text style={[styles.text, styles.description, styles.leftAlign]} numberOfLines={1}>{item.customer_name}</Text>
                    </View>
                    <View style={[styles.row, styles.descriptionContent ]}>
                        <Text style={[styles.text,styles.description, styles.label]}>Service Name</Text>
                        <Text style={[styles.text,styles.description,, styles.leftAlign]} numberOfLines={1}>{item.service_name}</Text>
                    </View>

                     <View style={[styles.row, styles.descriptionContent]}>
                        <Text style={[styles.text, styles.description, styles.label]}>Date & Time</Text>
                        <Text style={[styles.text, styles.description, styles.leftAlign]}>{item.service_open_date}</Text>
                    </View>
                    {/*<View style={[styles.row, styles.descriptionContent]}>
                        <Text style={[styles.text, styles.description, styles.label]}>Tax</Text>
                        <Text style={[styles.text, styles.description, styles.leftAlign]}>{item.order_tax}</Text>
                    </View>
                    <View style={[styles.row, styles.descriptionContent]}>
                        <Text style={[styles.text, styles.description, styles.label]}>Total Price</Text>
                        <Text style={[styles.text, styles.description, styles.leftAlign]} numberOfLines={1}>{item.order_total}</Text>
                    </View>
                    <View style={[styles.row, styles.descriptionContent]}>
                        <Text style={[styles.text,styles.description, styles.label]}>Sold Date</Text>
                        <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.order_date}</Text>
                    </View> */}
                    {/* <View style={[styles.row, styles.descriptionContent]}>
                      <Text style={[styles.text,styles.description, styles.label]}>Service Detail</Text>
                      </View>
                     
                      <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.service_detail}</Text> */}
                     
                       <TouchableRipple onPress={() => this.invoice(item)} style={{flex: 1}}  rippleColor="rgba(255, 255, 255, .32)" activeOpacity={.7}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButtons}>
                <Text style={styles.buttonTexts}>View Detail</Text>
              </LinearGradient>
          </TouchableRipple>  
                </View>
            </View>
            <View style={styles.seperator} />


        </View>
    </View>
);

listEmptyComponent = () => (
    <View style={styles.noDataFoundContainer}>
        <Text style={styles.noDataFoundText}>No Data Found</Text>
    </View>
)

render() {
    let { navigation } =  this.props;
    let { isLoading, item, refreshing,favorite,orders,chargingPointData} = this.state;
      console.log(orders,'this.props');
    return (
        <View style={styles.container}>
            <View  style={styles.header}>
              <Header navigation={navigation} type={strings.dmc.open_service}/>
            </View>
            {/* {orders != 0 ?
            <View style={styles.goku}>
              {orders > 0 ?
                <Badge style={styles.badge} size={20}>{orders}</Badge> : null
              }
            <TouchableOpacity activeOpacity={0.8} style={styles.iconButton} onPress={()=>this.props.navigation.navigate('Cart')} >
              <Image source={Images.cart} style={styles.imageIcon} />
            </TouchableOpacity>
         
            </View>
            : null} */}
            <Animatable.View animation="zoomInUp" style={styles.footer}>
                { isLoading ?  
                    <View style={styles.noDataFoundContainer}>
                        <ActivityIndicator size='large' color='#fff' /> 
                    </View>
                : 
                <FlatList
                    data={chargingPointData}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id+""}
                    ListEmptyComponent={() => this.listEmptyComponent()}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={'#fff'}/>
                    }
                /> }
            </Animatable.View>
        </View>
    )
}
}
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
container: {
  flex:1,
  justifyContent: 'center',
  backgroundColor: COLORS.PRIMARY,
//   zIndex: 9999,
},
header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
},
footer: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom:20,
    // marginTop: '10%',
},
description: {
    fontSize: 12,
    color: COLORS.DEFAULT,
    fontWeight: '400',
    fontFamily: "Poppins-Regular",
    color: COLORS.LIGHT_BLACK
},
text1: {
    color: COLORS.ERROR,
    fontSize: 14, 
    // margin:5,
    fontWeight:'bold',
    fontFamily: "Poppins-medium",
  
},
signInButtons: {
    marginTop:10,
     width: screenWidth/2.5 ,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 5,
    backgroundColor: COLORS.DEFAULT,
    fontFamily: "Poppins-Regular",
    color: 'black',
},
buttonTexts: {
    color: COLORS.BUTTON_TEXT,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: "Poppins-Regular",
},
label: {
    // fontWeight: '700',
    color: COLORS.LIGHT_BLACK,
    paddingTop:15,
},
leftAlign: {
    paddingTop:10,
    fontWeight:'bold',
    fontSize:14,
    // textAlign: 'left'
},
descriptionContent: {
    justifyContent: 'space-between',
    alignItems: 'center'
},
goku: {
    position:"relative",
    top: '1%',
    alignSelf: 'flex-end',
    paddingRight:20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:7,
    // marginHorizontal: '1%',
},
badge: {
    position: 'absolute',
    // top: 0,
    right:12,
    color: '#fff',
    fontWeight: '800',
    zIndex: 1
},
iconButton: {
    position: 'relative',
    width:45,
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DEFAULT,
    borderRadius: 55 / 2,
},
imageIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
},
item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.DEFAULT,
    padding: 5,
    marginTop:10,
    marginVertical: 3,
    marginHorizontal: 15,
    borderRadius: 10,
},
itemHeader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
},
image: {
    width: 90,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 30
},
row: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center', 
},
title: {

    fontSize: 16,
    fontWeight: 'bold'
},

text: {
    color: COLORS.BLACK,
    fontSize: 12,
    fontWeight:'700',
    fontFamily: "Poppins-medium",
  
}, 
signInButton: {
    width: screenWidth/3.5 ,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 5,
    backgroundColor: COLORS.DEFAULT,
    fontFamily: "Poppins-Regular",
    color: 'black',
},
buttonText: {
    color: COLORS.BUTTON_TEXT,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: "Poppins-Regular",
},
noDataFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
noDataFoundText: {
    color: COLORS.DEFAULT,
    fontSize: 14,
    marginTop:60,
    fontFamily: "Poppins-medium",
}
});

const mapStateToProps = (state) => {
    return {
        info: state.info,
        token: state.token
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        userInfo: bindActionCreators(userInfo, dispatch),
        loginToken: bindActionCreators(loginToken, dispatch),
        subscribed: bindActionCreators(subscribed, dispatch),
    };
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(fopenservices);
  