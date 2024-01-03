//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
//Library
import * as Animatable from 'react-native-animatable';

import LinearGradient from 'react-native-linear-gradient';

import { showMessage, hideMessage } from "react-native-flash-message";
import { TouchableRipple } from 'react-native-paper';
//Components
import Header from '../../../components/Header';

//Api
import HttpRequest from "../../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { userInfo, Chessis_no ,buycharger,remove} from '../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
import { strings } from '../../../utils/translations';
// Theme Colors
import COLORS from "../../../constants/colors";

import AsyncStorage from "../../../utils/AsyncStorage";



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
class UserOrders extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            chargingPointData: [],
             favorite: false,
             distance:0,
             orders: 0,
             passkey:'',

             items:'',
            refreshing: false,
        };
    }

    componentDidMount = () => {
        let {user}=this.props.route.params;
        console.log( user,'this.props');
        this._getChargingStation = this.props.navigation.addListener('focus', () => {
            // this.dealerpasskey();
            // let { props } = this;
            // let { radius, region } = this.state;
            //   console.log(props,'region')
            // this.getCurrentLocation();
            // this.dealervalue();
            {user=="charger"?this.Chargerlist(): this.getChargingStations();}
            
           
        });
        // setTimeout(this.getChargingStations,2000);
    }

    componentWillUnmount() {
        this._getChargingStation();
    }

    getChargingStations = () => {
        let { props } = this;
        let { radius, region } = this.state;
         console.log(props.info,'region1')
      
        HttpRequest.users_order({contact_no:props.info.phone})
            .then(res => {
                
                const result = res.data;
                console.log("Orders API Response ---------- ", result);
                if (res.status == 200 ) {
                    this.setState({ chargingPointData: result.data, refreshing: false, isLoading: false});
                
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

    Chargerlist = () => {
        let { props } = this;
        let {user}=this.props.route.params;
        var users={};
        let { radius, region ,items} = this.state;
         console.log(props.info,'region1')
      
        HttpRequest.franchisee_order({contact_no:props.info.phone})
            .then(res => {
                
                const result = res.data;
                console.log("Orders API Response ---------- ", result);
                if (res.status == 200 ) {
                    this.setState({ items: result.data, refreshing: false, isLoading: false})
                    
                    let dd=this.state.items.map((data)=>{
                        return{...data,user:user};
                    })
                    this.setState({chargingPointData:dd})
                    // var data=[];
                    // data.push(this.state.chargingPointData);
                    // data.push(users.role="charger");
                     console.log("distance",this.state.items);
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
         console.log('navi',item);
         if(item.user!="charger"){
         this.props.Chessis_no(item.chassis_no);
         this.props.buycharger("");
        this.props.navigation.navigate('Users',{items:item});
         }
         else{
            this.props.Chessis_no("");
            this.props.buycharger(item.chargePointSerialNumber);
         this.props.navigation.navigate('Users',{items:item});

         }
    }

    renderItem = ({ item }) => (
        <View style={styles.item} activeOpacity={.7}>
           <View style={styles.itemHeader}>
                {/* Charging Station Image & Ratings */}
                <View style={styles.row}>
                    <Image source={{ uri: item.stock_image }} style={styles.image} />
                    <View style={[styles.content, { flex: 3 }]}>
                    {item.user=="charger"?
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.title]} numberOfLines={1}>{item.chargePointSerialNumber}</Text>
                        </View>
                        :
                        <View style={styles.row}>
                        <Text style={[styles.text, styles.title]} numberOfLines={1}>{item.rc_no}</Text>
                    </View>}
                        
                        {/* <View style={[styles.row, styles.descriptionContent ]}>
                            <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.connector}</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.connector_type_name}</Text>
                        </View> */}
  {item.user=="charger"?
  <View>
                        <View style={[styles.row, styles.descriptionContent,{ marginTop: 10 }]}>
                            <Text style={[styles.text, styles.description, styles.label]}>Charger Model</Text>
                            <Text style={[styles.text, styles.description, styles.leftAlign]}>{item.stock_name}</Text>
                        </View>
                         {/* <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text, styles.description, styles.label]}>Charger Point Vendor</Text>
                            <Text style={[styles.text, styles.description, styles.leftAlign]}>{item.chargePointVendor}</Text>
                        </View> */}
                        {item.i_n_c_status==false?
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text, styles.description, styles.label]}>I & C Status</Text>
                            <Text style={[styles.text, styles.description, styles.leftAlign,{color: COLORS.ERROR}]}>Pending</Text>
                        </View>
                        :
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text, styles.description, styles.label]}>I & C Status</Text>
                            <Text style={[styles.text, styles.description, styles.leftAlign,{color: COLORS.SUCCESS}]}>Completed</Text>
                        </View>}
                        </View>:
                         <View>
                         <View style={[styles.row, styles.descriptionContent,{ marginTop: 10 }]}>
                             <Text style={[styles.text, styles.description, styles.label]}>Vehicle Name</Text>
                             <Text style={[styles.text, styles.description, styles.leftAlign]}>{item.stock_name}</Text>
                         </View>
                          <View style={[styles.row, styles.descriptionContent]}>
                             <Text style={[styles.text, styles.description, styles.label]}>Chassis No.</Text>
                             <Text style={[styles.text, styles.description, styles.leftAlign]}>{item.chassis_no}</Text>
                         </View>
                         </View>
                        
                        }
                       {/* <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text, styles.description, styles.label]}>Total Price</Text>
                            <Text style={[styles.text, styles.description, styles.leftAlign]} numberOfLines={1}>Rs. {item.order_total}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text,styles.description, styles.label]}>Date</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.order_date}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text,styles.description, styles.label]}>Total Items</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.cont}</Text>
                        </View> */}
                        {/* <View style={[styles.row, styles.descriptionContent]}>
                          <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.endtime}</Text>
                          <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.end_time}</Text>
                          </View> */}
                           <View style={[styles.rows, { justifyContent: 'space-between', alignItems: 'center'}]}>
                      {item.order_status!="Order is Approved" ?
                      <Text style={styles.text1s}>{item.order_status}</Text>
                      :
                      <Text style={styles.text2s}>{item.order_status}</Text>
}
                  </View>
                  <TouchableRipple onPress={() => this.navigate(item)} style={{flex: 1}}  rippleColor="rgba(255, 255, 255, .32)" activeOpacity={.7}>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButtons}>
                    <Text style={styles.buttonTexts}>View Details</Text>
                  </LinearGradient>
              </TouchableRipple>  
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
        // let { user } = this.props.route.params;
        let {user}=this.props.route.params;
        let { isLoading, item, refreshing,favorite,orders,chargingPointData} = this.state;
       console.log('order',user)
        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                {user=="charger"?
                  <Header navigation={navigation} type={strings.users.charger}/>:
                  <Header navigation={navigation} type={strings.users.ev}/>
        }
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
    buttonTexts: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    description: {
        fontSize: 12,
        color: COLORS.DEFAULT,
        fontWeight: '900',
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
    label: {
         fontWeight: '700',
        //  fontSize:18,
        color: COLORS.LIGHT_BLACK
    },
    leftAlign: {
       
        textAlign: 'left'
    },
    descriptionContent: {
        justifyContent: 'space-between',
        alignItems: 'center'
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
        width: 140,
        height: 80,
        resizeMode: 'contain',
        borderRadius: 10
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
    rows: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text1s: {
        color: COLORS.ERROR,
        fontSize: 14, 
        margin:5,
        fontWeight:'700',
        fontFamily: "Poppins-medium",
      
    },
    text2s: {
        color: COLORS.SUCCESS,
        fontSize: 14, 
        margin:5,
        fontWeight:'700',
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
    noDataFoundText: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",
    }
});

const mapStateToProps = state => {  
    return {
        token: state.token,
        info: state.info,
        chessis: state.Chessis_no,
        buycharger:state.buycharger,
        remove:state.Chessis_no
        
    };
};
  
  
const mapDispatchToProps = (dispatch) => {
    return{
    userInfo: bindActionCreators(userInfo, dispatch),
    Chessis_no: bindActionCreators(Chessis_no, dispatch),
    buycharger:bindActionCreators(buycharger,dispatch),
    remove:bindActionCreators(remove,dispatch)
    }
     
}
  
export default connect(mapStateToProps,mapDispatchToProps)(UserOrders);
  