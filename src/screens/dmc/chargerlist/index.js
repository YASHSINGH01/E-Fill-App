//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, Dimensions, Alert } from 'react-native';
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
// import {  } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
import { strings } from '../../../utils/translations';
//Styles
import styles from './styles';

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
class ChargerList extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            chargingPointData: '',
             favorite: false,
             distance:0,
             count:'',
             orders: 0,
            refreshing: false,
            region: {
                latitude: this.props.current_location.latitude != undefined ? this.props.current_location.latitude : LATITUDE,
                longitude: this.props.current_location.longitude != undefined ? this.props.current_location.longitude : LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              },
        };
    }

    componentDidMount = () => {
        this._getChargingStation = this.props.navigation.addListener('focus', () => {
            this.dealervalue();
            this.getChargingStations();
            // this.getCurrentLocation();
           
        });
    }

    componentWillUnmount() {
        this._getChargingStation();
    }

    // getCurrentLocation = () => {
  
    //     Geolocation.getCurrentPosition(
    //       position => {
    //         const region = {
    //           latitude: position.coords.latitude,
    //           longitude: position.coords.longitude,
    //           latitudeDelta: LATITUDE_DELTA,
    //           longitudeDelta: LONGITUDE_DELTA,
    //         }
    //         this.setState({
    //           region
    //         });
         
    //         // this.props.currentLocation(region);
    //         // try {
    //         //   if (Object.keys(region).length != 0) {
    //         //     this.map.current.animateToRegion(region, 2000);
    //         //     // console.log('userlocation1');
    //         //   }
    //         // } catch (e) {
    //         //   console.log(e);
    //         // }
    //       },
    //       (error) => console.log(error.message),
    //       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    //     );
    
    //   }

    dealervalue =()=>{
        try{
            AsyncStorage.getDealer_vehicle_storage().then(val => {
                console.log('val',val);
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
                    df="";
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
        let { current_location } = this.props;
        let { radius, region } = this.state;
        console.log(region,'region')
      
        HttpRequest.chargerlist()
            .then(res => {
                //  AsyncStorage.clearDealer_vehicle_storage();
                const result = res.data;
                // console.log("Vehicle API Response ---------- ", result);
                if (res.status == 200 ) {
                // var rt=[];
                //     AsyncStorage.getDealer_vehicle_storage().then(val => {
                //         console.log('toffle',val);
                //          //df=val;
                //           var arrs=val.split("@");
                         
                //            for(let f=0;f<arrs.length;f++){
                //             //    console.log('ff',arrs[f]);
                //                var arrs1=arrs[f].split("#");
                //                console.log('ff',arrs1);
                //                rt.push(arrs1[0]);
                //            }
             
                //        });

                //        var rt1=[];

                //        console.log('yyy',rt);

                //        for(let t=0;t<result.length;t++){
                //         console.log(rt.indexOf(result[t].id) > -1,'uurt');
                //        }





                    this.setState({ chargingPointData: result, refreshing: false,favorite: result.favorite, isLoading: false})
                    // console.log("distance",distance);
                } else {
                    this.setState({ isLoading: false });
                    console.log("Vehicle API Error : ",result);
                    showMessage({
                       message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false, refreshing: false });
                console.log("Vehicle API Catch Exception: ",err);
                showMessage({
                   message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });


    }

    // pluscount = (item) => {
    //     // amd.push(item);
    //     console.log(item,"dfdf");
    //     if(df=="" || df==null)
    //     {
    //     console.log("ok");
    //     df=item.id+"#"+1;   
    //    AsyncStorage.setDealer_vehicle_storage(df); 
    //    this.rgk();
    //     }else
    //     {
    //      console.log("includes");
    //     if(df.includes(item.id))
    //     {
    //      console.log("okk1");
    //      this.pluscountfunc(item);
    //     }else
    //     {
    //      df=df+"@"+item.id+"#"+1;
    //     AsyncStorage.setDealer_vehicle_storage(df);
    //     this.rgk();
    //     }
    //     }
     
    //  }
    //  pluscountfunc = (item) => {
    //     // console.log('dc1');
    //     AsyncStorage.getDealer_vehicle_storage().then(res => {
    //         // console.log('dc2');
    //         var arr = res.split("@");
    //         var id = item.id;
    //         var ds=[];
    //         // console.log('dc3');
    //        // var index = arr.indexOf(id);
    //        AsyncStorage.clearDealer_vehicle_storage();
    //     //    console.log('dc4',arr);
    //         for(let i=0;i<arr.length;i++) { 
    //           var lts=arr[i];
    //         //   console.log('dee',lts);
    //           var lts1=lts.split("#");
    //         //   console.log('dee2',lts1);
    //           var qty=lts1[1];
    //           if(id==lts1[0]){
    //           qty=parseInt(qty)+1; 
    //           }
    //           console.log('dee1',qty);
    //           var fstring=lts1[0]+"#"+qty;
    //           console.log('dee2',fstring);
    //           ds.push(fstring);
    //          }
    //          console.log('dc5',ds);
    //          var dc=ds.join("@");
    //          console.log('dcc',dc);
    //          AsyncStorage.setDealer_vehicle_storage(dc);
    //          AsyncStorage.getDealer_vehicle_storage().then(res => {
    //              console.log('rr',res)});
    //     })

    //  }

//      minuscount = (item) => {
//         // amd.push(item);
//         console.log(item,"dfdf");
//         if(df=="" || df==null)
//         {
        
//         }else
//         {
         
//         if(df.includes(item.id))
//         {
        
//          this.minuscountfunc(item);
//         }else
//         {
         
//         }
//         }
     
//      }
//      minuscountfunc = (item) => {
//         // console.log('dc1');
//         AsyncStorage.getDealer_vehicle_storage().then(res => {
//             // console.log('dc2');
//             var arr = res.split("@");
//             var id = item.id;
//             var ds=[];
//             // console.log('dc3');
//            // var index = arr.indexOf(id);
//            AsyncStorage.clearDealer_vehicle_storage();
//         //    console.log('dc4',arr);
//             for(let i=0;i<arr.length;i++) { 
//               var lts=arr[i];
//             //   console.log('dee',lts);
//               var lts1=lts.split("#");
//             //   console.log('dee2',lts1);
//               var qty=lts1[1];
//               if(id==lts1[0]){
//               qty=parseInt(qty)-1; 
//               } else if(lts1.length==0){
//                 console.log('stop',qty);
// Alert.alert('stop');
//               }
//               console.log('dee1',qty);
//               var fstring=lts1[0]+"#"+qty;
//               console.log('dee2',fstring);
//               ds.push(fstring);
//              }
//              console.log('dc5',ds);
//              var dc=ds.join("@");
//              console.log('dcc',dc);
            
//              AsyncStorage.setDealer_vehicle_storage(dc);
//              AsyncStorage.getDealer_vehicle_storage().then(res => {
//                  console.log('rr',res)});
//         })

//      }

    navigateToDetails = (item) => {
       
        this.setState({count:item.id});
        console.log("index",item.id===this.state.count);
        // this.addded(this.state.count);
        console.log("index22",this.state.chargingPointData);
        var tr=this.state.chargingPointData;

        //const data = tr.map(x => ({ ...x, status: active.includes(x.userid) }));
        // var data = tr.map(user => ({
        //     userid: user.userid,
        //     username: user.username,
        //     active: active.includes(user.userid)
        //   }));
        //   const updateAge = (id = item.id, status = true) => {
        //    var g= setList([...tr, tr.filter((item) => item.id === id)]);
        //     console.log("update",g);
        //   };
        var atr=[];
        for(let i=0;i<tr.length;i++){
            if(tr[i].id==item.id)
            {
atr.push({
    "id":tr[i].id,
    "name":tr[i].name,
    "cosr":tr[i].cosr,
    "colr":tr[i].colr,
    "image":tr[i].image,
    "status":true,
});
            }
            else{
                atr.push({
                    "id":tr[i].id,
                    "name":tr[i].name,
                    "cosr":tr[i].cosr,
                    "colr":tr[i].colr,
                    "image":tr[i].image,
                    "status":tr[i].status,
                });

            }
           
        }
        this.setState({chargingPointData:atr});
        console.log("update",atr);
        //   console.log("update",data);
        // AsyncStorage.setDealer_pass_key(this.state.count); 
       // amd.push(item);
    //    console.log(item,"dfdf");
       if(df=="" || df==null)
       {
       console.log("ok",item.id);
       df=item.id+"#"+1;   
      AsyncStorage.setDealer_vehicle_storage(df); 
      console.log("ok1");
      this.rgk();
       }else
       {
        console.log("includes");
       if(df.includes(item.id))
       {
        console.log("okk1");
        this.rgk();
       }else
       {
        df=df+"@"+item.id+"#"+1;
       AsyncStorage.setDealer_vehicle_storage(df);
       this.rgk();
       }
       }
    
    }

    rgk (){
        try{
            AsyncStorage.getDealer_vehicle_storage().then(val => {
                console.log('toffle',val);
                 //df=val;
                  var arrs=val.split("@");
                 
                   if (arrs.length !=0) {
                        console.log('toggle1', val);
       
                         this.setState({
                             orders: arrs.length
                         });
                     }
     
               });
        }catch{
            console.log('catch');
        }
    }
  
addded(data){
    console.log('added',data);
    var dd=data.toString().split("#");
    console.log('added',dd);
    // dd.forEach(function(element) {
    //     console.log('element',element.indexOf[0]);
    // });
    // this.getChargingStations();
    
}
    renderItem = ({ item,index }) => (
        <View style={styles.item} activeOpacity={.7} >
            <View style={styles.itemHeader}>
                {/* Charging Station Image & Ratings */}
                <View style={styles.row}>
                {/* {this.WholeNews(item)} */}
                    <Image source={{uri:item.image}} style={styles.image}/>
                    <View style={styles.content}>
                        {/* <View style={styles.row}>
                            <Text style={[styles.text, styles.title]} numberOfLines={2}>{item.name}</Text>
                           
                        </View> */}
                        <View style={[styles.row, { justifyContent: 'flex-end',marginLeft:10}]}>
                            
                            <Text style={styles.text1}>₹ {item.cosr}</Text>
                        </View>
                      
                     </View>         
                    </View>
                <View style={styles.row}>
                    
                    <View style={[styles.row,{paddingLeft:35}]}>
                    <Text style={[styles.text, styles.title]} numberOfLines={2}>{item.name}</Text>                    
                    </View>
                    <View style={[ {flexDirection:'row', marginRight:80,justifyContent: 'space-between', alignItems: 'center'}]}>
                            
                            
                            <Icon style={styles.icon}
                        size={20}
                        name={'radio-button-on'}
                        color={item.colr}
                        suppressHighlighting={true}
                    />
                        </View>
                        {/* {
                            item.status==true? 
                            <TouchableRipple style={{flex: 1}}  rippleColor="rgba(255, 255, 255, .32)">
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FF6A00', '#EE0979']} style={styles.linearGradient}>
                              <Text style={styles.buttonText}>Added</Text>
                            </LinearGradient>
                        </TouchableRipple>  : */}
                         <TouchableRipple onPress={() => this.navigateToDetails(item)} style={{flex: 1}}  rippleColor="rgba(255, 255, 255, .32)">
                         <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                           <Text style={styles.buttonText}>Add to Cart</Text>
                         </LinearGradient>
                     </TouchableRipple>  
                        {/* } */}
                    {/* <TouchableRipple onPress={() => this.navigateToDetails(item,index)} style={{flex: 1}}  rippleColor="rgba(255, 255, 255, .32)">
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                          <Text style={styles.buttonText}>Add to Cart</Text>
                        </LinearGradient>
                    </TouchableRipple>   */}
                    
                </View>
            </View>
           
        </View>
    );

    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>{strings.chargingStation.response.error.message}</Text>
        </View>
    )
    
    render() {
        let { navigation } =  this.props;
        let { isLoading, chargingPointData, refreshing,favorite,orders} = this.state;
        //   console.log(df,'this.props');
        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.dmc.product}/>
                </View>
                {orders != 0 ?
                <View style={styles.goku}>
                  {orders > 0 ?
                    <Badge style={styles.badge} size={20}>{orders}</Badge> : null
                  }
                <TouchableOpacity activeOpacity={0.8} style={styles.iconButton} onPress={()=>this.props.navigation.navigate('Cart')} >
                  <Image source={Images.cart} style={styles.imageIcon} />
                </TouchableOpacity>
             
                </View>
                : null}
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


const mapStateToProps = state => {
    
    return {
        token: state.token,
        current_location: state.current_location
    };
};
  
  
const mapDispatchToProps = (dispatch) => {
      return bindActionCreators({}, dispatch);
}
  
export default connect(mapStateToProps,mapDispatchToProps)(ChargerList);
  