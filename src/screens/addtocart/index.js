//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, RefreshControl, ScrollView, ActivityIndicator, Dimensions, Alert } from 'react-native';
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import StarRating from 'react-native-star-rating';
import { showMessage, hideMessage } from "react-native-flash-message";
import { TouchableRipple } from 'react-native-paper';
//Components
import Header from '../../components/Header';
//Constants
import { Images } from "../../constants/";
//Api
import HttpRequest from "../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
// import {  } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
import { strings } from '../../utils/translations';
//Styles
import axios from "axios";
import styles from './styles';
import { request,PERMISSIONS } from 'react-native-permissions';
import { userInfo, loginToken, subscribed, buycharger } from '../../Redux/Actions/Actions';

import AsyncStorage from "../../utils/AsyncStorage";
import { Badge } from 'react-native-paper';

import ImagePicker from 'react-native-image-crop-picker';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { result } from 'lodash';
import * as Progress from 'react-native-progress';
import { timing } from 'react-native-reanimated';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const { width, height } = Dimensions.get('window');
var df = "";

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isLoading1: false,
            chargingPointData: '',
            distance: 0,
            orders: 0,
            filePath: '',
            data: '',
            image1:'',
            count: 0,
            tax: '',
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
            
            AsyncStorage.getDealer_vehicle_storage().then(result => {
                console.log('cartstore', result);
                if (result != null && result != '') {
                
                    this.setState({
                        data: result,
                        // count:kk[1]
                    });
                    this.dealerpasskey();
                    this.getChargingStations();
                }

            });

           
        });
    }

    componentWillUnmount() {
        this._getChargingStation();
    }

    dealerpasskey() {
        console.log('passkey1');
        AsyncStorage.getDealer_pass_key().then(result => {
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
   

    getChargingStations =  () => {
        let { current_location } = this.props;
         let { data } = this.state;
         console.log(this.state.data, 'region')

        // console.log(data, "passkey");
        // AsyncStorage.clearDealer_vehicle_storage();
        this.setState({ isLoading1: true });
        HttpRequest.dealercart({ dt: data })
            .then(res => {
                this.setState({ isLoading: true, });
                const result = res.data;
                console.log("Charging Station API Response ---------- ", result);
                if (res.status == 200) {
                    this.setState({ isLoading1: false });
                    this.setState({ chargingPointData: result.data, tax: result.taxes, total: result.total, final_to: result.final_total, refreshing: false, isLoading: false, isLoading1: false })

                    console.log("distance", this.state.chargingPointData);
                } else {
                    this.setState({ isLoading: false, isLoading1: false });
                    console.log("Charging Station API Error : ", result);
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


   
    delete = (item) => {
        console.log('delete', item);
        AsyncStorage.getDealer_vehicle_storage().then(res => {
            console.log('frnachise', res);
            var arr = res.split("@");
            

            // console.log(arr, "initial");
            var id = item.id+"#"+item.qty;
            console.log(id);
            const index = arr.indexOf(id);
            console.log(index,"index");
            if (index > -1) { // only splice array when item is found
                arr.splice(index, 1); // 2nd parameter means remove one item only
                AsyncStorage.clearDealer_vehicle_storage();
            }
            // console.log(arr, "final");
            var text = arr.join("@");
            AsyncStorage.setDealer_vehicle_storage(text);
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

        // let options = {
        //     title: 'Select Image',
        //     base64: true,
        //     customButtons: [
        //         {
        //             name: 'customOptionKey',
        //             title: 'Choose Photo from Custom Option'
        //         },
        //     ],
        //     storageOptions: {
        //         skipBackup: true,
        //         path: 'images',
        //     },
        // };

        // ImagePicker.showImagePicker(options, (response) => {
        //     console.log('Response = ', response);
      
        //     if (response.didCancel) {
        //       console.log('User cancelled image picker');
        //     } else if (response.error) {
        //       console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //       console.log(
        //         'User tapped custom button: ',
        //         response.customButton
        //       );
        //       alert(response.customButton);
        //     } else {
        //       let source = response;
        //       // You can also display the image using data:
        //       // let source = {
        //       //   uri: 'data:image/jpeg;base64,' + response.data
        //       // };
        //       setFilePath(source);
        //     }
        //   });
        // };

    }
    gallery(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            includeBase64:true,
            cropping: true
          }).then(image => {
            console.log('image',image.path)
            this.setState({image1:image.path});
            this.setState({ filePath: image.data });
            console.log('image11',this.state.filePath)
          });
    }
    camera(){
       
            // setPermissionResult(result)
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                includeBase64:true,
                cropping: true
              }).then(image => {
                console.log('image',image.path)
                this.setState({image1:image.path});
                this.setState({ filePath: image.data });
                console.log('image11',this.state.filePath)
              });
            // console.log(result)
      
       
    }
    onRefresh = () => {
        this.setState({ refreshing: true })
        wait(3000).then(() => this.getChargingStations());
    }
   
    uploadProgress = (progressEvent) => {

        console.log('per', progressEvent);
        this.setState({ per })
        
    };

   

    renderupload = () => {
let{props}=this;
        let { chargingPointData, filePath, isLoading, tax, total, final_to } = this.state;
        console.log('data', chargingPointData)
        if (filePath == null || filePath == "") {

            Alert.alert("Upload Payment Receipt");
            console.log('ok1');
        } else {
            var pics = filePath;
           
            this.setState({ refe: true });
            console.log('apirs',pics);
            console.log('charging',chargingPointData);
            this.setState({ isLoading: true })
            axios.post('https://mobility.efillelectric.com/submit-data', { dt: props.info.phone, pics, chargingPointData, tax, total, final_to, distributor_code: this.state.passkey }, {
                onUploadProgress: progressEvent => {
                    AsyncStorage.clearDealer_vehicle_storage();
                    var percentComplete = progressEvent.loaded / progressEvent.total
                    percentComplete = parseInt(percentComplete * 100);
                    console.log(percentComplete);
                    this.setState({ percentage: percentComplete });
                    // if(percentComplete!="100"){
                    //     this.setState({isLoading:true});

                    // }

                    //   this.uploadProgress(percentComplete);
                    // updateProgress(percentComplete);
                }
            }).then(response => {
                
                const result = response.data;
                console.log('ok2', response)
                if (result.status == 1 && result.error == false)
                    this.setState({ isLoading: false });
                this.props.navigation.navigate('Dealers');
            });



        }




    }
    

    // pluscount1 = (item) => {
    //     this.setState({ isLoading1: true })
    //     console.log(item, "dfdf");
    //     if (df == "" || df == null) {
    //         console.log("ok");
    //         df = item.id + "#" + 1;
    //         AsyncStorage.setDealer_vehicle_storage(df);
    //         this.rgk();
    //     } else {
    //         console.log("includes");
    //         if (df.includes(item.id)) {
    //             console.log("okk1");
    //             this.pluscountfunc(item);
    //         } else {
    //             df = df + "@" + item.id + "#" + 1;
    //             AsyncStorage.setDealer_vehicle_storage(df);
    //             this.rgk();
    //         }
    //     }

    // }
    pluscount = (item) => {
        // console.log('dc1');
        let { data } = this.state;
        AsyncStorage.getDealer_vehicle_storage().then(res => {
            // console.log('dc2');
            var arr = res.split("@");
            var id = item.id;
            var ds = [];
            // console.log('dc3');
            // var index = arr.indexOf(id);
            AsyncStorage.clearDealer_vehicle_storage();
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
            AsyncStorage.setDealer_vehicle_storage(dc);
           
            this.setState({ data: dc });
            this.getChargingStations(data);
            AsyncStorage.getDealer_vehicle_storage().then(res => {
                console.log('rr', res)
            });
        })

    }

    // minuscount1 = (item) => {
    //     // amd.push(item);
    //     this.setState({ isLoading1: false })
    //     console.log(item, "dfdf");
    //     if (df == "" || df == null) {
    //         this.minuscountfunc(item);
    //         console.log("fdf");
    //     } else {

    //         if (df.includes(item.id)) {
    //             console.log("df");
    //             this.minuscountfunc(item);
    //         } else {

    //         }
    //     }

    // }

    minuscount = (item) => {
        AsyncStorage.getDealer_vehicle_storage().then(res => {
            var arr = res.split("@");
            var id = item.id+"#"+item.qty;
            var ds = [];
            AsyncStorage.clearDealer_vehicle_storage();
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
           AsyncStorage.setDealer_vehicle_storage(dc);

           // this.getChargingStations();
            //      AsyncStorage.getDealer_vehicle_storage().then(res => {
            //          console.log('rr',res)});
        })

    }
    rgk() {
        try {
            AsyncStorage.getDealer_vehicle_storage().then(val => {
                console.log('toffle', val);
                //df=val;
                var arrs = val.split("@");

                if (arrs.length != 0) {
                    console.log('toggle1', val);

                    this.setState({
                        orders: arrs.length
                    })
                }
                this.getChargingStations();

            });
        } catch {
            console.log('catch');
        }
    }


    renderItem = ({ item }) => (
        <View style={styles.item} activeOpacity={.7} >
            <View style={styles.itemHeader}>   
                    <View style={[styles.row]}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={[styles.leftAlign,styles.row]}>

<Text style={styles.text1}>₹ {item.cost}</Text>
{/* <Text style={styles.text} numberOfLines={2}>{item.name}</Text> */}
</View>
                    </View>
                
                {/* Charging Station Image & Ratings */}
                <View style={styles.row}>
                    {/* {this.WholeNews(item)} */}
                   

                 
                </View>

                <View style={styles.row}>
                <TouchableOpacity onPress={() => this.minuscount(item)} style={{ alignSelf: 'flex-end' ,marginLeft:25}}>
                            <Image source={Images.minus} style={styles.buttonIcon} />
                        </TouchableOpacity>
                        <Text style={[styles.text1, styles.title]} numberOfLines={2}>{item.qty}</Text>
                        <TouchableOpacity onPress={() => this.pluscount(item)} style={{ alignSelf: 'flex-end' }}>
                            <Image source={Images.plus} style={styles.buttonIcon} />
                        </TouchableOpacity>
                    <View style={[styles.row, { paddingLeft: 20 }]}>
                    <Text style={styles.text} numberOfLines={2}>{item.name}</Text>
                    <View style={[ {flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                            
                            
                            <Icon style={styles.icon}
                        size={20}
                        name={'radio-button-on'}
                        color={item.colr}
                        suppressHighlighting={true}
                    />
                        </View>
                        {/* <Text style={styles.text} numberOfLines={1}>Rs.{item.vehicle_cost}/-</Text> */}
                    </View>

                    
                    <TouchableRipple onPress={() => this.delete(item)} style={{ flex: 1 }} rippleColor="rgba(255, 255, 255, .32)">
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
        let { isLoading, chargingPointData, image1, isLoading1, percentage, orders, filePath, tax, total, final_to } = this.state;
        //  console.log(isLoading, 'this.props');
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.francisee.out} />
                </View>
                {/* {!isLoading1 ? */}
                    <Animatable.View  style={styles.footer}>
                <ScrollView contentContainerStyle={styles.modalScrollView}>
                

                        {/* <View style={styles.noDataFoundContainer}>
                            <ActivityIndicator size='large' color='#fff' />
                        </View> */}

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
                       
                        {filePath != '' ?
                            <Image
                                source={{ uri: image1 }}
                                style={styles.imageStyle}
                            />
                            : null}

                        {tax != '' ?
                            <View>
                                <View style={styles.row2}>

                                    <Text style={{ color: '#fff', justifyContent: 'flex-end', textAlign: 'left', fontWeight:'bold',fontSize:16}}>
                                       {strings.orderHistory.invoice.subTotal}</Text>

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
                            <TouchableOpacity activeOpacity={5} onPress={() =>  isLoading ? null : this.Scanner() }>
                            <Image source={Images.camera} style={styles.imageIcon} />
                            </TouchableOpacity>
                        </LinearGradient>
                        <Text style={{textAlign:'center',fontWeight:'800',color:'#fff',marginTop:5}}>{strings.francisee.upload}</Text>
                        </View>
                        {/* <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.check}>
                        <TouchableOpacity activeOpacity={5} onPress={() => { !isLoading? this.renderupload():null }}>
                            <Text style={styles.buttonText}>Check Out</Text>
                        </TouchableOpacity>
                      
                    </LinearGradient> */}
                    
                     <Text style={{ textAlign: 'center', fontWeight: '800', color: '#fff',marginTop:5}}>{percentage}</Text>
                        <View style={{  justifyContent: 'center', alignContent: 'center', marginLeft: 8 }}>
                            {percentage!=''?
                            <Progress.Bar progress={percentage} width={width - 20} />
                            :null}
                        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
