//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, RefreshControl, Modal,PermissionsAndroid,ScrollView,ActivityIndicator, Alert,Dimensions } from 'react-native';
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import StarRating from 'react-native-star-rating';
import ConfettiCannon from 'react-native-confetti-cannon';
import { showMessage, hideMessage } from "react-native-flash-message";
import { TouchableRipple } from 'react-native-paper';
import axios from "axios";
//Components
import Header from '../../../components/Header';
//Constants
import { Images } from "../../../constants/";
//Api
import HttpRequest from "../../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
 import { userInfo, couponApplied, subscribed ,orderAmount} from '../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
import { strings } from '../../../utils/translations';
//Styles
import styles from './styles';

import AsyncStorage from "../../../utils/AsyncStorage";
import { Badge } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
// import ImagePicker from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS, openLimitedPhotoLibraryPicker} from 'react-native-permissions';
import Coupons from '../../coupons';

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

let { width, height } = Dimensions.get('window');
var df = "";

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isLoading1: false,
            chargingPointData: '',
            distance: 0,
            orders: 0,
            calloutVisible: false,
            filePath: '',
            data: '',
            new_coupon:"",
            coupon_code:"",
            image:'',
            coupon:'',
            count: 0,
            tax: '',
            sub_total:'',
            discount:0,
            total: '',
            modalVisible: false,
            passkey: '',
            final_to: '',
            percentage: '',
            refreshing: false,

        };
    }

    componentDidMount = () => {
        this._getChargingStation = this.props.navigation.addListener('focus', () => {
            AsyncStorage.getFranchisee_product().then(result => {
                // console.log('toggle', val);
                if (result != null && result != '') {
                    console.log('passkey', result);

                    this.setState({
                        data: result
                    });
                    this.dealerpasskey();
                    this.getChargingStations();
                }

            });

            // this.getCurrentLocation();
            // this.dealervalue();
            // this.getChargingStations();


        });
    }

    componentWillUnmount() {
        this._getChargingStation();
    }

    toggleModal(visible,error) {
        console.log('tooglw');
        this.setState({ modalVisible: visible});
        
    }
    closemodel()
    {
       this.setState({ modalVisible:false});
       
    }
    dealerpasskey() {
        console.log('passkey1');
        AsyncStorage.getFranchise_passkey().then(result => {
            //  console.log('passkey1', val);
            if (result != null && result != '') {
                 console.log('passkey', result);

                this.setState({
                    passkey: result
                });
                // this.getChargingStations();
            }

        });
        console.log('passkey2');
    }

    permission = async () => {
      
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                  title: "E-fill Location Permission",
                  message:
                    "E-fill App needs access to your location " +
                    "so you can find your nearest charging stations.",
                  buttonNeutral: "Ask Me Later",
                  buttonNegative: "Cancel",
                  buttonPositive: "OK"
                }
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                 console.log("Location permission granted");
                //  this.Scanner();
              } else {
                console.log("Location permission denied");
              }
            } catch (err) {
              console.warn(err);
            }
          
           
              
            
    
    }
    //     try {
            
    //             const granted = await PermissionsAndroid.request(
    //               PermissionsAndroid.PERMISSIONS.CAMERA,
    //               {
    //                 title: "App Camera Permission",
    //                 message:"App needs access to your camera ",
    //                 buttonNeutral: "Ask Me Later",
    //                 buttonNegative: "Cancel",
    //                 buttonPositive: "OK"
    //               }
    //             );
    //             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //               console.log("Camera permission given");
    //             } else {
    //               console.log("Camera permission denied");
    //             }
    //           } catch (err) {
    //             console.warn(err);
    //           }
             
            
    // }

    //     dealervalue = () => {
    //         try {
    //             AsyncStorage.getProductstorage().then(val => {
    //                 df = val;
    //                 console.log('df', df);
    // //                 var arr =JSON.stringify( df.split("@"));
    // // console.log("sff",arr);

    //                 if (df != 0) {
    //                     // console.log('toggle1',arr);

    //                     this.setState({
    //                         orders: df

    //                     });
    //                     console.log('orderss',this.state.orders);
    //                     this.getChargingStations();

    //                 }
    //                 // this.getChargingStation();

    //             });
    //         } catch {
    //             console.log('catch');
    //         }


    //     }
 

    getChargingStations = () => {
        let { current_location,new_coupon } = this.props;
        // let  coupon_code  = this.props.coupon_applied;
        console.log(this.state.new_coupon, 'region')
        this.setState({ isLoading: true });
        HttpRequest.franchiseercart({ dt: this.state.data,coupon:new_coupon,})
            .then(res => {
                const result = res.data;
                console.log("Franchisee cart API Response ---------- ", result);
                if (res.status == 200) {
                    this.setState({ isLoading: false });
                    this.setState({ chargingPointData: result.data, discount:result.discount,sub_total:result.sub_total,tax: result.taxes, total: result.total, final_to: result.final_total, refreshing: false, favorite: result.favorite, isLoading: false })
                     console.log("distance",this.state.chargingPointData);
                    //   this.props.couponApplied('');
                } else {
                    this.setState({ isLoading: false });
                    console.log("Franchisee cart  API Error : ", result);
                    showMessage({
                        message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false, refreshing: false });
                console.log("Charging Station API Catch Exception: ", err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });


    }


    // navigateToDetails = (item) => {
    //     // amd.push(item);
    //     console.log(df, "dfdf");
    //     if (df == "" || df == null) {
    //         console.log("ok");
    //         df = item.id;
    //         AsyncStorage.setProductstorage(df);
    //     } else {
    //         if (df.includes(item.id)) {
    //         } else {
    //             df = df + "@" + item.id;
    //             AsyncStorage.setProductstorage(df);
    //         }
    //     }

    // }
    delete = (item) => {
        console.log('delete', item);
        AsyncStorage.getFranchisee_product().then(res => {
            console.log('frnachise', res);
            var arr = res.split("@");
            

            // console.log(arr, "initial");
            var id = item.id+"#"+item.qty;
            // console.log(id);
            const index = arr.indexOf(id);
            console.log(index,"index");
            if (index > -1) { // only splice array when item is found
                arr.splice(index, 1); // 2nd parameter means remove one item only
                AsyncStorage.clearFranchisee_product();
            }
            // console.log(arr, "final");
            var text = arr.join("@");
            AsyncStorage.setFranchisee_product(text);
            this.setState({
                data: text
            });
            this.getChargingStations();
        })
    }
    
    Scanner() {
        Alert.alert(
            'Choose Options',
            '',
            [
                {
                    text: 'Cancel',
                    style:'cancel',
                    onPress: console.log('cancel'),
                  },
                  
              {
                text: 'Camera',
                onPress: () => this.camera(),
              },
              
              {
                text: 'Gallery',
                onPress: () => this.gallery(),
              },
             
            ],
            { cancelable: false }
          );

        // console.log('scanner');
       
       

        // const result = await launchImageLibrary(cameraType);
        // ImagePicker.showImagePicker(options, (response) => {
        //      console.log('Response = ', response);

        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //         console.log(
        //             'User tapped custom button: ',
        //             response.customButton
        //         );
        //         alert(response.customButton);
        //     } else {
        //         let source = response;
        //         // You can also display the image using data:
        //         // let source = {
        //         //   uri: 'data:image/jpeg;base64,' + response.data
        //         // };
        //         this.setState({ filePath: source });
        //     }
        // });

    }
    gallery(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            includeBase64:true,
            cropping: true
          }).then(image => {
            console.log('image',image)
            this.setState({data:image.path})
            this.setState({ filePath: image.data });
            console.log('image11',this.state.filePath)
          });
    }
    camera(){
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            includeBase64:true,
            cropping: true
          }).then(image => {
            console.log('image',image.path);
            this.setState({data:image.path});
            this.setState({ filePath: image.data });
            console.log('image11',this.state.filePath)
          });
    }

    pluscount = (item) => {
        // console.log('dc1');
        let { data } = this.state;
        AsyncStorage.getFranchisee_product().then(res => {
            // console.log('dc2');
            var arr = res.split("@");
            var id = item.id;
            var ds = [];
            // console.log('dc3');
            // var index = arr.indexOf(id);
            AsyncStorage.clearFranchisee_product();
            //    console.log('dc4',arr);
            for (let i = 0; i < arr.length; i++) {
                var lts = arr[i];
                //   console.log('dee',lts);
                var lts1 = lts.split("#");
                //   console.log('dee2',lts1);
                var qty = lts1[1];
                if (id == lts1[0]) {
                    qty = parseInt(qty) + 1;
                    this.setState({ isLoading1: true })
                }
                //   console.log('dee1',qty);
                var fstring = lts1[0] + "#" + qty;
                //   console.log('dee2',fstring);
                ds.push(fstring);
            }
            //  console.log('dc5',ds);
            var dc = ds.join("@");
            console.log('dcc', dc);
            AsyncStorage.setFranchisee_product(dc);
           
            this.setState({ data: dc });
            this.getChargingStations(data);
            AsyncStorage.getFranchisee_product().then(res => {
                console.log('rr', res)
            });
        })

    }


    minuscount = (item) => {
        console.log('min',item)
        AsyncStorage.getFranchisee_product().then(res => {
            var arr = res.split("@");
            var id = item.id+"#"+item.qty;
            var ds = [];
            AsyncStorage.clearFranchisee_product();
            for (let i = 0; i < arr.length; i++) {
                var lts = arr[i];
                console.log(lts,"lts")
                if(lts==id)
                {
                console.log("lts match")    
                var arr1=arr[i].split("#");
                var ids=arr1[0];
                var qty=parseInt(arr1[1]);
                console.log(ids,"ids")  
                console.log(qty,"qty")  
                if(qty>1)
                {
                qty=qty-1;   
                var fstr=ids+"#"+qty;
                ds.push(fstr);
                }else
                {
                var fstr=arr[i];
                ds.push(fstr);
                }
                }else
                {
                var fstr=arr[i];
                ds.push(fstr);

                }
            }
            console.log('dc5',ds);
            var dc = ds.join("@");
            //  console.log('dcc',dc);
            this.setState({ data: dc });
            this.getChargingStations();
           AsyncStorage.setFranchisee_product(dc);

           // this.getChargingStations();
            //      AsyncStorage.getDealer_vehicle_storage().then(res => {
            //          console.log('rr',res)});
        })

    }
    coupon=(coupon)=>{
        let {new_coupon,coupon_code}=this.state;
        this.setState({ isLoading: true ,coupon_code:coupon});
        console.log('coupon',coupon)
        HttpRequest.franchiseercart({ dt: this.state.data,coupon:coupon,distributor_code:this.props.info.phone})
            .then(res => {
                const result = res.data;
                console.log("Coupon API Response ---------- ", result);
                if (res.status == 200) {
                    this.setState({ isLoading: false });
                    this.setState({ chargingPointData: result.data, discount:result.discount,sub_total:result.sub_total,tax: result.taxes, total: result.total, final_to: result.final_total, refreshing: false, favorite: result.favorite, isLoading: false })
                     console.log("distance",this.state.chargingPointData);
                    //   this.props.couponApplied('');
                } else {
                    this.setState({ isLoading: false });
                    console.log("Coupon API Error : ", result);
                    showMessage({
                        message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false, refreshing: false });
                console.log("Charging Station API Catch Exception: ", err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });


   }

    renderupload = () => {
        let{props}=this;
                let { chargingPointData, filePath, sub_total,discount, tax, coupon_code,total, final_to } = this.state;
                console.log('data', chargingPointData)
                if (filePath == null || filePath == "") {
        
                    Alert.alert("Upload Payment Receipt");
                    console.log('ok1');
                } else {
                    var pics = filePath;
                   
                    // this.setState({ refe: true });
                     console.log('apirs',pics);
                    console.log('charging11',chargingPointData);
                    var data = new FormData();
                    data.append('image',pics);
                    data.append('dt',props.info.phone);
                    data.append('chargingPointData',JSON.stringify( chargingPointData));
                    data.append('tax',tax);
                    data.append('sub_tottal',sub_total);
                    data.append('discount',discount);
                    data.append('total',total);
                    data.append('coupon_code',coupon_code);
                    data.append('final_to',final_to);
                    data.append('distributor_code',this.state.passkey);
                    this.setState({ isLoading: true })
                    console.log('formdata',data);
                    // axios.post('https://iot.efillelectric.com/charger-final-checkout', {data }, {
                    //     onUploadProgress: progressEvent => {
                    //         AsyncStorage.clearFranchisee_product();
                    //         var percentComplete = progressEvent.loaded / progressEvent.total
                    //         percentComplete = parseInt(percentComplete * 100);
                    //         console.log(percentComplete);
                    //         this.setState({ percentage: percentComplete });
                    //         // if(percentComplete!="100"){
                    //         //     this.setState({isLoading:true});
        
                    //         // }
        
                    //         //   this.uploadProgress(percentComplete);
                    //         // updateProgress(percentComplete);
                    //     }
                    // }).then(response => {
                        
                    //     const result = response.data;
                    //     console.log('ok2', response)
                    //     if (result.status == 1 && result.error == false)
                    //         this.setState({ isLoading: false });
                    //     this.props.navigation.navigate('Frann');
                    // });
                    // this.props.couponApplied("");
        
                    fetch('https://iot.efillelectric.com/api/user/charger-final-checkout', {
                          method: 'POST',
                          body: data,
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data',
                          },
                        })
                        
                          .then((response) => response.json())
                          .then((response) => {
                            AsyncStorage.clearFranchisee_product();
                        //     console.log('upload succes', response);
                        this.setState({isLoading:false});
                        this.props.orderAmount("");
                            this.props.navigation.navigate('Frann');
                          })
                          .catch((error) => {
                            console.log('upload error', error);
                            alert('Upload failed!',error);
                        this.setState({isLoading:false});
                          });
        
                }
 
            }
            rendercel=()=>{
{this.props.coupon_applied!=undefined && this.props.coupon_applied!="" ?
                       <ConfettiCannon count={200} origin={{x: -5, y: 0}}  autoStartDelay={200} fadeOut={true}/>:null
                       }
            }
            openCallout = () => {
                this.setState({
                  calloutVisible: true,
               
                })
              }
              //Marker Callout Close Action
              closeCallout = () => {
                this.setState({
                  calloutVisible: false,
                  
                });
              }

            renderItem = ({ item }) => (
                <View style={styles.item} activeOpacity={.7} >
                    <View style={styles.itemHeader}>   
                            <View style={[styles.row]}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={[styles.row,{ justifyContent:'flex-end', alignSelf:'flex-start',marginTop:20}]}>
        
        <Text style={styles.text1}>{item.name}</Text>
        {/* <Text style={styles.text} numberOfLines={2}>{item.name}</Text> */}
        </View>
                            </View>
                        
                        {/* Charging Station Image & Ratings */}
                        {/* <View style={styles.row}> */}
                            {/* {this.WholeNews(item)} */}
                           
        
                         
                        {/* </View> */}
        
                        <View style={[styles.row,{marginTop:10}]}>
                        <TouchableOpacity onPress={() => this.minuscount(item)} style={{ alignSelf: 'flex-end' ,marginLeft:25}}>
                                    <Image source={Images.minus} style={styles.buttonIcon} />
                                </TouchableOpacity>
                                <Text style={[styles.text1, styles.title]} numberOfLines={2}>{item.qty}</Text>
                                <TouchableOpacity onPress={() => this.pluscount(item)} style={{ alignSelf: 'flex-end' }}>
                                    <Image source={Images.plus} style={styles.buttonIcon} />
                                </TouchableOpacity>
                            <View style={styles.row}>
                            <Text style={[styles.text,{ marginLeft: 90 } ]}>₹ {item.cost}</Text>
                            
                                {/* <Text style={styles.text} numberOfLines={1}>Rs.{item.vehicle_cost}/-</Text> */}
                            </View>
        
                            
                            <TouchableRipple onPress={() => this.delete(item)}  rippleColor="rgba(255, 255, 255, .32)">
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fff', '#fff']} style={styles.signInButton}>
                                    <Image source={Images.delet} style={styles.imageIcon} />
                                </LinearGradient>
                            </TouchableRipple>
        
        
                        </View>
                    </View>
        
                </View>
            );
        
            listEmptyComponent = () => (
                <View style={styles.noDataFoundContainer}>
                    <Text style={styles.noDataFoundText}>Your cart is empty.</Text>
                </View>
            )
        
            render() {
                let { navigation } = this.props;
                let { isLoading, chargingPointData, data, discount, percentage, sub_total,calloutVisible,orders, filePath, tax, total, final_to } = this.state;
                //  console.log(this.props.coupon_applied, 'render cheout');
                return (
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Header navigation={navigation} type={strings.francisee.out} />
                        </View>
                     {/* {!isLoading1 ? */}
                       {/* <View style={styles.noDataFoundContainer}>
                                    <ActivityIndicator size='large' color='#fff' />
                                </View> */}
                        {calloutVisible &&
                <Coupons  navigation={this.props.navigation} cart={this.coupon} closeCallout={this.closeCallout} formData={this.state.new_coupon}/>
              }
                       
                            <Animatable.View  style={styles.footer}>
                        <ScrollView contentContainerStyle={styles.modalScrollView}>
                        
        
                                
        
                                <View style={styles.flat}>
                                    <FlatList
                                        scrollEnabled={true}
                                        data={chargingPointData}
                                        renderItem={this.renderItem}
                                        keyExtractor={item => item.id + ""}
                                        ListEmptyComponent={() => this.listEmptyComponent()}
                                    // refreshControl={
                                    //     <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={'#fff'}/>
                                    // }
        
                                    />
        
        
                                </View>

                            
                                {/* <View style={styles.container2}>
                    <Modal animationType={"slide"} 
                        visible={modalVisible} transparent={true}
                        onRequestClose={() => { console.log("Modal has been closed.") }}>
                            <View style={styles.modal}>
                            <TouchableOpacity style={styles.iconContainer} onPress={() => this.closemodel() }>
                                <Icon name="close" size={24} color="#000" />
                            </TouchableOpacity>
                            </View> */}
                        {/* <Showmessage  closeModal={() => { this.toggleModal(!this.state.modalVisible) }} ></Showmessage> */}
                       
                    {/* </Modal> */}

                    {/* <TouchableHighlight style={styles.touchableButton} onPress={() => { this.toggleModal(true) }}>
                        <Text style={styles.text2}>Open Modal</Text>
                    </TouchableHighlight> */}

                {/* </View> */}
                                <View style={{justifyContent:'flex-end',alignSelf:"flex-end",marginRight:15,paddingBottom:20}}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.check1}>
                                <TouchableOpacity activeOpacity={5} onPress={() => { !isLoading? this.openCallout():null }}>
                                    <Text style={styles.buttonText}>Apply Coupon</Text>
                                </TouchableOpacity>
                              
                            </LinearGradient>
                            </View>
                               
                                {filePath != '' ?
                                    <Image
                                        source={{ uri: data }}
                                        style={styles.imageStyle}
                                    />
                                    : null}
        
                                {tax != '' ?
                                    <View>
                                        <View style={styles.row2}>
        
                                            <Text style={{ color: '#fff', justifyContent: 'flex-end', textAlign: 'left', fontWeight:'bold',fontSize:16}}>
                                               {strings.orderHistory.invoice.subTotal}</Text>
        
                                            <Text style={{ color: '#fff', justifyContent: 'flex-start', textAlign: 'right',fontWeight:'bold',fontSize:16}}>
                                            ₹ {sub_total}</Text>
        
                                        </View>
                                        <View style={styles.row2}>
        
        <Text style={{ color: '#fff', justifyContent: 'flex-end', textAlign: 'left', fontWeight:'bold',fontSize:16}}>
           {strings.orderHistory.invoice.discount}</Text>

        <Text style={{ color: '#fff', justifyContent: 'flex-start', textAlign: 'right',fontWeight:'bold',fontSize:16}}>
        ₹ {discount}</Text>

    </View>
    <View style={styles.row2}>
        
        <Text style={{ color: '#fff', justifyContent: 'flex-end', textAlign: 'left', fontWeight:'bold',fontSize:16}}>
           {strings.orderHistory.invoice.total}</Text>

        <Text style={{ color: '#fff', justifyContent: 'flex-start', textAlign: 'right',fontWeight:'bold',fontSize:16}}>
        ₹ {total}</Text>

    </View>
                                        <View style={styles.row1}>
                                            <Text style={{ color: '#fff', justifyContent: 'flex-end', textAlign: 'left',fontWeight:'bold',fontSize:16 }}>
                                            {strings.orderHistory.invoice.GST} (5%)</Text>
                                            <Text style={{ color: '#fff', justifyContent: 'flex-start', textAlign: 'right',fontWeight:'bold',fontSize:16 }}>
                                            ₹ {tax}</Text>
                                        </View>
                                        <View style={styles.row1}>
                                            <Text style={{ color: '#fff', justifyContent: 'flex-end', textAlign: 'left', fontWeight:'bold',fontSize:16}}>
                                            {strings.orderHistory.invoice.final}</Text>
                                            <Text style={{ color: '#fff', justifyContent: 'flex-start', textAlign: 'right',fontWeight:'bold',fontSize:16}}>
                                            ₹ {final_to}</Text>
                                        </View>
                                    </View>
                                    : null}
                                    <View style={styles.availabilityIconContainer}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.IconButton}>
                                    <TouchableOpacity activeOpacity={5} onPress={() =>  isLoading ? null :this.Scanner() }>
                                    {isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                                    <Image source={Images.camera} style={styles.imageIcon} />}
                                    </TouchableOpacity>
                                </LinearGradient>
                                <Text style={{textAlign:'center',fontWeight:'800',color:'#fff',marginTop:5}}>{strings.francisee.upload}</Text>
                                </View>
                               
                            
                             <Text style={{ textAlign: 'center', fontWeight: '800', color: '#fff',marginTop:5}}>{percentage}</Text>
                                {/* <View style={{  justifyContent: 'center', alignContent: 'center', marginLeft: 8 }}>
                                    {percentage!=''?
                                    <Progress.Bar progress={percentage} width={width - 20} />
                                    :null}
                                </View> */}
                                <TouchableOpacity onPress={() => isLoading ? null : this.renderupload()}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.check}>
                                        {isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                                            <Text style={styles.buttonText}>{strings.francisee.check}</Text>
                                        }
                                    </LinearGradient>
                                </TouchableOpacity>
                               
                        
                            </ScrollView>
                                </Animatable.View>
                            {/* : <ActivityIndicator style={styles.footer} size='large' color='#fff' />} */}
                    </View>
        
                )
            }
}


const mapStateToProps = (state) => {
    return {
        info: state.info,
        coupon_applied: state.coupon_applied,
        order_amount: state.order_amount,
        token: state.token
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        orderAmount: bindActionCreators(orderAmount, dispatch),
        couponApplied: bindActionCreators(couponApplied, dispatch)    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
