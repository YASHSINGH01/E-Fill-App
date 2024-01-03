//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, RefreshControl, ScrollView, ActivityIndicator, Dimensions, Alert, TextInput } from 'react-native';
//Library
import * as Animatable from 'react-native-animatable';

import LinearGradient from 'react-native-linear-gradient';

import { showMessage, hideMessage } from "react-native-flash-message";
import ImageView from "react-native-image-viewing";
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
import axios from "axios";
import styles from './styles';

import { userInfo, loginToken, subscribed, buycharger } from '../../../Redux/Actions/Actions';

import AsyncStorage from "../../../utils/AsyncStorage";
import { SelectList } from 'react-native-dropdown-select-list'
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import * as Progress from 'react-native-progress';


const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const { width, height } = Dimensions.get('window');
var df = "";

class Payment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isLoading1: false,
            chargingPointData: '',
            distance: 0,
            orders: 0,
            visible:false,
            orderslist: [],
            filePath: [],
            images: [],
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
       {this.props.route.params.role=="franchisee"?this.pending():this.getChargingStations()};
        // this.getChargingStations();
    }

    // componentWillUnmount() {
    //     this._getChargingStation();
    // }

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

    pending = () => {
        let { current_location } = this.props;
        let { radius, region } = this.state;

        let { item } = this.props.route.params;
        console.log(item.order_id, 'hh')
        HttpRequest.franchisee_list({ order_id: item.order_id })
            .then(res => {

                const result = res.data;
                console.log("chrger details API Response ---------- ", result.data);
                if (res.status == 200) {
                    this.setState({ orderslist: result.data, refreshing: false, isLoading: false })
                    console.log("distance", this.state.orderslist);
                } else {
                    this.setState({ isLoading: false });
                    console.log("charger details API Error : ", result);
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
    getChargingStations = () => {
        let { current_location } = this.props;
        let { radius, region } = this.state;

        let { item } = this.props.route.params;
        console.log(item.order_id, 'region')
        HttpRequest.dmc_list({ order_id: item.order_id })
            .then(res => {

                const result = res.data;
                console.log("Oreder details API Response ---------- ", result.data);
                if (res.status == 200) {
                    this.setState({ orderslist: result.data, refreshing: false, isLoading: false })
                    console.log("distance", this.state.orderslist);
                } else {
                    this.setState({ isLoading: false });
                    console.log("Order details API Error : ", result);
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

        // let { images } = this.state;
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
        //         selectionLimit: 3,
        //     },
        // };

        // // const result = await launchImageLibrary(cameraType);
        // ImagePicker.showImagePicker(options, (response) => {
        //     console.log('Response = ', options);

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


        //         // console.log("source", source);
        //         // images.push(source);
        //         this.setState({ filePath: source });
        //         // console.log("filepath", images);
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
            console.log('image',image.path)
            this.setState({image1:image.path});
            this.setState({ filePath: image.data });
            // console.log('image11',this.state.filePath)
          });
    }
    camera(){
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            includeBase64:true,
            cropping: true
          }).then(image => {
            console.log('image',image.path)
            this.setState({image1:image.path});
            this.setState({ filePath: image.data });
            // console.log('image11',this.state.filePath)
          });
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        wait(3000).then(() => this.getChargingStations());
    }

    uploadProgress = (progressEvent) => {

        console.log('per', progressEvent);
        this.setState({ per })

    };

submit=()=>{
    {this.props.route.params.role=="franchisee"?this.renderupload1():this.renderupload()};
    // this.getChargingStations();
}

    renderupload = () => {
        let { props } = this;
        let { item } = this.props.route.params;
        let { chargingPointData, filePath, isLoading, tax, total, final_to } = this.state;
        console.log('data', chargingPointData)
        if (filePath == null || filePath == "") {

            Alert.alert("Please Select payment proof");
            console.log('ok1');
        } else {
            var pics = filePath;

            this.setState({ refe: true });
            console.log('apirs', item.order_id,);
            console.log('charging', chargingPointData);
            axios.post('https://mobility.efillelectric.com/submit-payment-proof', { order_id: item.order_id, pics: pics }, {
                onUploadProgress: progressEvent => {
                    AsyncStorage.clearDealer_vehicle_storage();
                    var percentComplete = progressEvent.loaded / progressEvent.total
                    percentComplete = parseInt(percentComplete * 100);
                    console.log(percentComplete);
                    this.setState({ percentage: percentComplete });
                    console.log('ok3')
                    // if(percentComplete=="100"){
                    //     this.setState({isLoading:true});

                    // }

                    //   this.uploadProgress(percentComplete);
                    // updateProgress(percentComplete);
                }
            }).then(response => {
                this.setState({ isLoading: true })
                const result = response.data;
                console.log('ok2', response)
                if (result.status == 1 && result.error == false)
                    this.setState({ isLoading: false });
                this.props.navigation.navigate('Dealers');
            });



        }




    }
    renderupload1 = () => {
        let { props } = this;
        let { item } = this.props.route.params;
        let { chargingPointData, filePath, isLoading, tax, total, final_to } = this.state;
        console.log('frandata', chargingPointData)
        if (filePath == null || filePath == "") {

            Alert.alert("Please Select payment proof");
            console.log('ok1');
        } else {
            var pics = filePath;

            this.setState({ refe: true });
            console.log('apirs', item.order_id,);
            console.log('charging', filePath);
            axios.post('https://iot.efillelectric.com/franchisee/submit-payment-proof', { order_id: item.order_id, pics: pics }, {
                onUploadProgress: progressEvent => {
                    AsyncStorage.clearDealer_vehicle_storage();
                    var percentComplete = progressEvent.loaded / progressEvent.total
                    percentComplete = parseInt(percentComplete * 100);
                    console.log(percentComplete);
                    this.setState({ percentage: percentComplete });
                    console.log('ok3')
                    // if(percentComplete=="100"){
                    //     this.setState({isLoading:true});

                    // }

                    //   this.uploadProgress(percentComplete);
                    // updateProgress(percentComplete);
                }
            }).then(response => {
                this.setState({ isLoading: true })
                const result = response.data;
                console.log('ok2', response)
                if (result.status == 1 && result.error == false)
                    this.setState({ isLoading: false });
                this.props.navigation.navigate('Frann');
            });



        }




    }



    renderItem({ item, index }) {
        return (
            <View style={styles.item} activeOpacity={.7} >
                <Image
                    source={{ uri: item.payment_history }}
                    style={styles.image}
                />
            </View>

        )
    }
    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>Your cart is empty.</Text>
        </View>
    )

    render() {
        let { item } = this.props.route.params;

        let { navigation } = this.props;
        let { isLoading, orderslist, image1, isLoading1, percentage, orders, filePath, tax, total, final_to } = this.state;
        console.log('payemntss', item);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.dmc.paymnt} />
                </View>
                {/* {!isLoading1 ? */}
                <Animatable.View style={styles.footer}>
                    {/* <ScrollView contentContainerStyle={styles.modalScrollView}> */}
                    <View style={[styles.formField, { marginLeft: 20 }]}>
                        <Text style={styles.label}> Order No. </Text>
                    </View>
                    <TextInput style={[styles.inputContainer, { marginLeft: 20 }]}
                        placeholder="Order Id"
                        autoCapitalize='none'
                        autoCompleteType='off'
                        editable={false}
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}

                        // onSubmitEditing={this.onSubmitName}
                        returnKeyType='next'
                        value={item.order_id}


                    // save="service_name"
                    />
                    {/* <View style={styles.noDataFoundContainer}>
                            <ActivityIndicator size='large' color='#fff' />
                        </View> */}
 
                    <View style={{ marginTop: 10 }}>
                    {/* <ImageView
  images={{ uri: filePath.uri }}
  imageIndex={0}
  visible={visible}
  onRequestClose={() => setIsVisible(false)}
/> */}
                        {filePath != '' ?

                            <Image
                                source={{ uri: image1 }}
                                style={styles.imageStyle}
                            />
                            : null}
                    </View>
                  
                    {item.order_status!="Order Rejected" && item.order_status!="Order Delivered"? 
                    
                    <View style={styles.availabilityIconContainer}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.IconButton}>
                            <TouchableOpacity activeOpacity={5} onPress={() => { this.Scanner() }}>
                                <Image source={Images.camera} style={styles.imageIcon} />
                            </TouchableOpacity>
                        </LinearGradient>
                        <Text style={{ textAlign: 'center', fontWeight: '800', color: '#fff', marginTop: 5 }}>{strings.francisee.upload}</Text>
                    </View>:null}
                   

                    <Text style={{ textAlign: 'center', fontWeight: '800', color: '#fff', marginTop: 5 }}>{percentage}</Text>
                    <View style={{ justifyContent: 'center', alignContent: 'center', marginLeft: 8 }}>
                        {percentage != '' ?
                            <Progress.Bar progress={percentage} width={width - 20} />
                            : null}
                    </View>
                    {item.order_status!="Order Rejected" && item.order_status!="Order Delivered"? 
                    <TouchableOpacity onPress={() => isLoading ? null : this.submit()}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.check}>
                            {isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                                <Text style={styles.buttonText}>Submit</Text>
                            }
                        </LinearGradient>
                    </TouchableOpacity>:null}

                 
                   
                    <View style={styles.flat}>
                        <FlatList
                            scrollEnabled={true}
                            data={orderslist}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id + ""}
                        // ListEmptyComponent={() => this.listEmptyComponent()}
                        />
                    </View>



                    {/* <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.check}>
                        <TouchableOpacity activeOpacity={5} onPress={() => { !isLoading? this.renderupload():null }}>
                            <Text style={styles.buttonText}>Check Out</Text>
                        </TouchableOpacity>
                      
                    </LinearGradient> */}




                    {/* </ScrollView> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
