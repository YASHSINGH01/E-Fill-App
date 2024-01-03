//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, RefreshControl,Alert, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Colors, TouchableRipple } from 'react-native-paper';
//Components
import Header from '../../../components/Header';
//Api
import HttpRequest from "../../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { userInfo, loginToken, subscribed, buycharger } from '../../../Redux/Actions/Actions';

import { bindActionCreators } from 'redux';
import { strings } from '../../../utils/translations';
// Theme Colors
import COLORS from "../../../constants/colors";

import AsyncStorage from "../../../utils/AsyncStorage";
import prompt from 'react-native-prompt-android';
import UploadDoc from '../../../components/UploadDoc';

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
class VehilceDocument extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            chargingPointData: '',
             favorite: false,
             distance:0,
             orders: 0,
             imageData:'',
             calloutVisible: false,
             passkey:'',
             item:[
                 {
                id:'AD001',
               name:'Muver',
               price:'100000',
               tax:'36000',
               date:'02 Feb 2023',
               totalprice:'136000',
               image:'https://mobility.efillelectric.com/model_images/p1673940418643.png'
            },
            {
                id:'AD002',
               name:'Hauler',
               price:' 200000',
               tax:'36000',
               date:'02 Feb 2023',
               totalprice:'236000',
               image:'https://mobility.efillelectric.com/model_images/p1673940418643.png'
            }
        ],
            refreshing: false,
        };
    }

    componentDidMount = () => {
        this._getChargingStation = this.props.navigation.addListener('focus', () => {
            this.getChargingStations();
            // this.getCurrentLocation();
            // this.dealervalue();
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


    getImage=(data)=>{
        let { chassis_no } = this.props.route.params;
        // this.setState({imageData:data})
         console.log('imagedata',data);
         if(data=="")
         {
            Alert.alert(
                "Please Upload the Document"  
               );
         }
         else{
            HttpRequest.UploadVehicle_Data({chessis_no:chassis_no,doc_name:this.state.imageData,pics:data}).then(res=>{
                
                const result = res.data;
                console.log("Send API Response ---------- ", result);
                if (res.status == 200 ) {
                  
           Alert.alert(
            "Document Updated"  
           );

           this.getChargingStations();
        
      }
      else{
     
      }
            })
            .catch(err => {
                this.setState({ isLoading: false, refreshing: false });
                console.log("Send API Catch Exception: ",err);
                showMessage({
                   message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
         }
       
            
        
      console.log('imagedata1',chassis_no);
      console.log('imagedata1',data);

   }
    getChargingStations = () => {
        let { chassis_no } = this.props.route.params;
        // console.log(chassis_no,'region')
      
        HttpRequest.UploadVehicle_Document({chessis_no:chassis_no})
            .then(res => {
                
                const result = res.data;
                console.log("Sold records API Response ---------- ", result);
                if (res.status == 200 ) {
                    this.setState({ chargingPointData: result.data, refreshing: false, isLoading: false})
                    //  console.log("distance",this.state.chargingPointData);
                } else {
                    this.setState({ isLoading: false });
                    console.log("Sold records API Error : ",result);
                    showMessage({
                       message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false, refreshing: false });
                console.log("Sold records API Catch Exception: ",err);
                showMessage({
                   message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
    }



  handleEmail = (item) => {
    console.log('propmpt',item);
//    {
       
//        Platform.OS=='ios'?

       prompt(
        'Update final RC No. ',
        '',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: (password) =>this.sendinvoice(password,item.part_detail.chassis_no)
          }
          
        ],
        'plain-text',item.user_email
      )

}

openCallout = (data) => {
    // console.log('image',data)

    this.setState({
      calloutVisible: true,
      imageData:data,
   
    })
  }
  //Marker Callout Close Action
  closeCallout = () => {
    this.setState({
      calloutVisible: false,
      
    });
  }
  onRefresh = () => {
    this.setState({ refreshing : true})
    wait(2000).then(() =>  this.getChargingStations());
}
    renderItem = ({ item }) => (
        <View style={styles.item} activeOpacity={.7} >
        <View style={styles.itemHeader}>
             {/* Charging Station Image & Ratings */}

             <View style={[styles.row,]}>
                        
                         <Text style={[styles.text,{marginLeft:screenWidth/2.6}]}>{item.name}</Text>
                     </View>
             <View style={styles.row}>
             {item.image==""?
                    <Image  style={styles.image} />
                    
                    :
                    <Image source={{uri:item.image}} style={styles.image} />
                    }
               
                 
             </View>
             
            
                     
             <View style={styles.row}>
                {item.status==0?
                  <Text style={[styles.text1s]} numberOfLines={2}>Not Uploaded</Text>
               : item.status==1?
               <Text style={[styles.text1s]} numberOfLines={2}>Pending</Text>
               :item.status==2?
             
             
             <Text style={[styles.text1s]} numberOfLines={2}>Rejected</Text>:
             
            //  <Text style={[styles.text1s]} numberOfLines={2}>Rejected</Text>:
             
             <Text style={[styles.text2s]} numberOfLines={2}>Accepted</Text>
                }
                
          {item.status==3?null:
          <TouchableRipple onPress={()=>this.openCallout(item.name)} style={{flex: 1}}  rippleColor="rgba(255, 255, 255, .32)" activeOpacity={.7}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButtons}>
            <Text style={styles.buttonTexts}>Upload</Text>
          </LinearGradient>
      </TouchableRipple>
          }
           

           </View>
             {/* <View style={styles.seperator} /> */}


         </View>
     </View>
        // <View style={styles.item} activeOpacity={.7} >
       
        //    <View style={styles.itemHeader}>
        //         {/* Charging Station Image & Ratings */}
        //         <View style={styles.row}>
        //             {item.image==""?
        //             <Image  style={styles.image} />
                    
        //             :
        //             <Image source={{uri:item.image}} style={styles.image} />
        //             }
        //             <View style={[styles.content,styles.leftAlign]}>
                       
        //                     <Text style={[styles.text, styles.title]} numberOfLines={2}>{item.name}</Text>
                           
                        
        //                 <View>
        //                 {/* {item.image==""? */}
        //                 <TouchableRipple onPress={()=>this.openCallout(item.name)} rippleColor="rgba(255, 255, 255, .32)" activeOpacity={.7}>
        //           <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButtons}>
        //             <Text style={styles.buttonTexts}>Upload Document</Text>
        //           </LinearGradient>
        //       </TouchableRipple>
        //       {/* :null} */}
        //                 </View>
        //             </View>
        //         </View>
               

        //     </View>

        // </View>
    );

    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>No Data Found</Text>
        </View>
    )
    
    render() {
        let { navigation } =  this.props;
        let { isLoading, item,chargingPointData, refreshing,calloutVisible,orders,imageData} = this.state;
        //   console.log(orders,'this.props');
        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.users.upload}/>
                </View>
                {calloutVisible &&
                <UploadDoc  navigation={this.props.navigation} upload={this.getImage} closeCallout={this.closeCallout} />
              }
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
    label: {
        // fontWeight: '700',
        color: COLORS.LIGHT_BLACK
    },
    leftAlign: {
        textAlign: 'center',
        // marginLeft:90,
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
    signInButtons: {
        marginBottom:5,
        marginTop:2,
         width: screenWidth/3.5 ,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 5,
        //  marginLeft:120,
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
    image: {
        flex: 4,
        width: 120,
        height: 80,
        resizeMode: 'stretch',
        // backgroundColor:Colors.amber50,
        // borderRadius: 10

    },
    row: {
        flex: 1,
         width: '100%',
        flexDirection: 'row',
       
     alignItems: 'center',
        // borderWidth:1,
        // backgroundColor:Colors.amber400,
        // borderColor:"#000"
        
    },
    title: {

        fontSize: 14,
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
  
export default connect(mapStateToProps,mapDispatchToProps)(VehilceDocument);
  