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
import Header from '../../../components/Header';
//Constants
import { Images } from "../../../constants/";
//Api
import HttpRequest from "../../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { userInfo,Chessis_no } from '../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
import { strings } from '../../../utils/translations';
// Theme Colors
import COLORS from "../../../constants/colors";

import AsyncStorage from "../../../utils/AsyncStorage";
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
class Document extends Component {
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
            // this.getChargingStations();
            {this.props.buycharger!=""?this.Chargerservice():this.getChargingStations()}
            // this.getCurrentLocation();
            // this.dealervalue();
            // this.getChargingStations();
           
        });
        // setTimeout(this.getChargingStations,2000);
    }

    componentWillUnmount() {
        this._getChargingStation();
    }

    Chargerservice = () => {
        let {props} = this;
        let { radius, region } = this.state;
         console.log(props.info,'chager')
      
        HttpRequest.charger_user_docs({chargePointSerialNumber:props.buycharger})
            .then(res => {            
               const result = res.data;
                console.log("Orders History Response ---------- ", result);
                if (res.status == 200 ) {
                    this.setState({ chargingPointData: result.data, refreshing: false, isLoading: false})
                    //  console.log("distance",this.state.chargingPointData);
                } else {
                    this.setState({ isLoading: false });
                    console.log("Orders History Error : ",result);
                    showMessage({
                       message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false, refreshing: false });
                console.log("Orders History Catch Exception: ",err);
                showMessage({
                   message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });


    }

    getChargingStations = () => {
        let { props } = this;
        let { radius, region } = this.state;
        console.log(props,'region')
      
        HttpRequest.user_docs({chessis_no:props.chessis})
            .then(res => {
                
                const result = res.data;
                console.log("Orders API Response ---------- ", result.data);
                if (res.status == 200 ) {
                     this.setState({ chargingPointData: result.data, refreshing: false, isLoading: false})
                    console.log("distance",this.state.chargingPointData);
                } else {
                    this.setState({ isLoading: false });
                    console.log("Orders API Error : ",result);
                    showMessage({
                       message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false, refreshing: false });
                console.log("Orders API Catch Exception: ",err);
                showMessage({
                   message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });


    }

   
  
    navigate(item){
        console.log('navi',item)
        this.props.navigation.navigate('detailsOrder',{item});
    }

    renderItem = ({ item }) => (
        <View style={styles.item}>
           <View style={styles.itemHeader}>
                {/* Charging Station Image & Ratings */}
                <View style={styles.row}>
                    <Image source={{ uri: item.customer_doc_image }} style={styles.image} />
                    <View style={[styles.content]}>
                        <View>
                            <Text style={[styles.text, styles.title]} numberOfLines={1}>{item.doc_name}</Text>
                        </View>
                    </View>
                </View>
               

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
        //   console.log(orders,'this.props');
        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.users.doc}/>
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
        // justifyContent:'center',
        marginBottom:20,
        // marginTop: '10%',
    },
    
    title: {
marginLeft:10,
        fontSize: 12,
        fontWeight: '800'
    },
   
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.DEFAULT,
        padding: 5,
        marginTop:20,
        marginVertical: 3,
        marginHorizontal: 15,
        borderRadius: 10,
    },
    itemHeader: {
        flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    image: {
    //     borderWidth:5,
    //    borderColor:'#000',
        width: screenWidth/1.5,
        height: screenHeight/5.5,
        resizeMode:'stretch',
        borderRadius: 10
    },
    row: {
        flex: 1,
    //    borderWidth:1,
    //    borderColor:'#000',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        
    },
    // row1: {
    //     flex: 1,
    //    borderWidth:1,
    //    borderColor:'#000',
    //     width: '100%',
    //     marginRight:20,
    //     flexDirection: 'row',
    //     justifyContent: 'flex-end',
    //     alignItems: 'center',
        
    // },
    
    noDataFoundText: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",
    }
});

const mapStateToProps = (state) => {
    return {
        chessis:state.Chessis_no,  
        buycharger:state.buycharger 
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        userInfo: bindActionCreators(userInfo, dispatch)
    };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Document);
  