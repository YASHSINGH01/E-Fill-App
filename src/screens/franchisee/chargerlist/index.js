//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, Dimensions } from 'react-native';
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

var df = "";
const geolib = require('geolib');
const amd = [];
class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            chargingPointData: '',
            favorite: false,
            distance: 0,
            orders: 0,
            count:'',
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

    dealervalue =()=>{
        try{
            AsyncStorage.getFranchisee_product().then(val => {
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

    // delete = (item) => {
    //     console.log('delete', item);
    //     AsyncStorage.getFranchisee_product().then(res => {
    //         console.log('frnachise', res);
    //         var arr = res.split("@");
    //         console.log(arr, "initial");
    //         var ff=arr.splice(1,1)
    //         console.log('dd',typeof( ff))
            
    //         var id = item.id;

    //         const index = arr.indexOf(id);
    //         console.log( "final",id );
    //         if (index > -1) { // only splice array when item is found
    //             arr.splice(index, 1); // 2nd parameter means remove one item only
    //             console.log('frjfjff', arr.splice(index, 1))
    //              AsyncStorage.clearFranchisee_product();
    //              this.onRefresh();
    //         }
    //         this.onRefresh();
    //         // console.log(arr, "final");
    //         // var text = arr.join("@");
    //         // AsyncStorage.setFranchisee_product(text);
    //         // this.setState({
    //         //     data: text
    //         // });
    //         // this.getChargingStations();
    //     })
    // }

    getChargingStations = () => {
        let { current_location } = this.props;
        let { radius, region } = this.state;
        console.log(region, 'region')

        HttpRequest.cardlist()
            .then(res => {

                const result = res.data;
                console.log("Poduct Response ---------- ", result);
                if (res.status == 200) {
                    this.setState({ chargingPointData: result, refreshing: false, favorite: result.favorite, isLoading: false })
                    // console.log("distance",distance);
                } else {
                    this.setState({ isLoading: false });
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
      AsyncStorage.setFranchisee_product(df); 
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
       AsyncStorage.setFranchisee_product(df);
       this.rgk();
       }
       }
    
    }

    rgk() {
        try {
            AsyncStorage.getFranchisee_product().then(val => {
                //df=val;
                console.log('toggle2', val);
                if( val!=null){
                
                var arrs = val.split("@");
                }
                if (arrs.length != 0) {
                    // console.log('toggle1', val);

                    this.setState({
                        orders: arrs.length
                    })
                }

            });
        } catch {
            console.log('catch');
        }
    }


    renderItem = ({ item }) => (
        <View>
        <View style={styles.item} activeOpacity={.7} >
            <View style={styles.itemHeader}>
                {/* Charging Station Image & Ratings */}
                <View style={styles.row}>
                    {/* {this.WholeNews(item)} */}
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.content}>
                   
                   
                    </View>
                    <View style={styles.row1}>
                            <Text style={[styles.text, styles.title]} numberOfLines={2}>{item.name}</Text>
                           
                        </View>
                </View>
                <View style={styles.row}>
                   
                    <View style={[{ marginRight: 30, justifyContent: 'space-between', alignItems: 'center' }]}>

                        <Text numberOfLines={4} style={styles.text1}>Rs.{item.cosr}/-</Text>
                    </View>
                    <TouchableRipple onPress={() => this.navigateToDetails(item)} style={{ flex: 1 }} rippleColor="rgba(255, 255, 255, .32)">
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                            <Text style={styles.buttonText}>Add to Cart</Text>
                        </LinearGradient>
                    </TouchableRipple>

                </View>
            </View>

        </View>
        </View>
    );

    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>{strings.chargingStation.response.error.message}</Text>
        </View>
    )
    onRefresh = () => {
        this.setState({ refreshing : true})
        wait(1000).then(() =>  this.getChargingStations());
    }

    render() {
        let { navigation } = this.props;
        let { isLoading, chargingPointData, refreshing, favorite, orders } = this.state;
        // console.log(orders, 'this.props');
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.dmc.product} />
                </View>
                {orders != 0 ?
                    <View style={styles.goku}>
                        {orders > 0 ?
                            <Badge style={styles.badge} size={20}>{orders}</Badge> : null
                        }
                        <TouchableOpacity activeOpacity={0.8} style={styles.iconButton} onPress={() => this.props.navigation.navigate('Checkout')} >
                            <Image source={Images.cart} style={styles.imageIcon} />
                        </TouchableOpacity>

                    </View>
                    : null}
                <Animatable.View animation="zoomInUp" style={styles.footer}>
                    {isLoading ?
                        <View style={styles.noDataFoundContainer}>
                            <ActivityIndicator size='large' color='#fff' />
                        </View>
                        :
                        <View>
                        <FlatList
                       
                            data={chargingPointData}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id + ""}
                            ListEmptyComponent={() => this.listEmptyComponent()}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={'#fff'} />
                            }
                        />
                        </View>
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);
