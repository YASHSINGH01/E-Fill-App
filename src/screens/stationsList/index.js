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
import styles from './styles';

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

const geolib = require('geolib');

class ChargingStations extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            chargingPointData: '',
             favorite: false,
             distance:0,
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
            this.getChargingStations();
            this.getCurrentLocation();
        });
    }

    componentWillUnmount() {
        this._getChargingStation();
    }

    getCurrentLocation = () => {
  
        Geolocation.getCurrentPosition(
          position => {
            const region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
            this.setState({
              region
            });
            console.log("regiddff",this.state.region)
         
            // this.props.currentLocation(region);
            // try {
            //   if (Object.keys(region).length != 0) {
            //     this.map.current.animateToRegion(region, 2000);
            //     // console.log('userlocation1');
            //   }
            // } catch (e) {
            //   console.log(e);
            // }
          },
          (error) => console.log(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    
      }

    getChargingStations = () => {
        let { current_location } = this.props;
        let { radius, region } = this.state;
        console.log(region,'region')
      
        HttpRequest.getChargingStationsDistance( region.latitude != undefined && region.longitude != undefined ? { latitudeFrom: region.latitude, longitudeFrom: region.longitude } : {}, this.props.token)
            .then(res => {
                
                const result = res.data;
                console.log("Charging Station List API Response ---------- ", result);
                if (res.status == 200 ) {
                    this.setState({ chargingPointData: result, refreshing: false,favorite: result.favorite, isLoading: false})
                    // console.log("distance",distance);
                } else {
                    this.setState({ isLoading: false });
                    console.log("Charging Station API Error : ",result);
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

    getDistance = (lat1, lon1, lat2, lon2) => {
        console.log('| ', lat1,' | ',  lon1,' | ',  lat2, ' | ',  lon2)
        var R = 6371; // km
        var dLat = this.toRad(lat2-lat1);
        var dLon = this.toRad(lon2-lon1);
        var lat1 = this.toRad(lat1);
        var lat2 = this.toRad(lat2);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    toRad = (Value) => 
    {
        return Value * Math.PI / 180;
    }

    onRefresh = () => {
        this.setState({ refreshing : true})
        wait(2000).then(() =>  this.getChargingStations());
    }

    addToWishlist = (item) => {
        let { chargingPointData } = this.state;
        // console.log('state',chargingPointData)
        HttpRequest.addFavorite({ id: item.id }, this.props.token)
        .then(res => {
            const result = res.data;
             console.log("Add Favorite API Response ---------- ", result);
            if (res.status == 200 && result.error == false) {
                this.setState({
                    chargingPointData: chargingPointData.map(el => (el.id === item.id ? {...el, favorite: !el.favorite} : el))
                });
                showMessage({
                    message: strings.chargingStation.response.success.title,
                    description: strings.success.favouriteList,
                    type: "success",
                });
            } else {
                console.log("Add Favorite API Error : ",result);
                showMessage({
               message: strings.error.title,
                description: result.message != undefined ? result.message : result.status,
                type: "danger",
                });
            }
        })
        .catch(err => {
            console.log("Add Favorite API Catch Exception: ",err);
            showMessage({
               message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    }

    removeFromWishlist = (item) => {
        let { chargingPointData } = this.state;
        HttpRequest.removeFavorite({ id: item.id }, this.props.token)
        .then(res => {
            const result = res.data;
            // console.log("Remove Favorite API Response ---------- ", result);
            if (res.status == 200 && result.error == false) {
                this.setState({
                    chargingPointData: chargingPointData.map(el => (el.id === item.id ? {...el, favorite: !el.favorite} : el))
                });
                showMessage({
                    message: strings.chargingStation.response.success.title,
                    description: strings.success.removedFavouriteList,
                    type: "success",
                });
            } else {
                console.log("Remove Favorite API Error : ",result);
                showMessage({
               message: strings.error.title,
                description: result.message != undefined ? result.message : result.status,
                type: "danger",
                });
            }
        })
        .catch(err => {
            console.log("Remove Favorite API Catch Exception: ",err);
            showMessage({
               message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    }

    navigateToDetails = (item) => {
        this.props.navigation.navigate('ChargingStationDetails',{ itemId: item.id })
        console.log('click',item);
    }

    renderItem = ({ item }) => (
        <View  style={styles.item} activeOpacity={.7} >
            <View style={styles.itemHeader}>
                {/* Charging Station Image & Ratings */}
                <View style={styles.row}>
                    <Image source={{uri:item.icon}} style={styles.image}/>
                    <View style={styles.content}>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.title]} numberOfLines={2}>{item.name}</Text>
                           
                        </View>
                        <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center'}]}>
                            
                            <Text style={styles.text1}>{item.avl_status}</Text>
                        </View>
                        {/* <Text style={styles.text} numberOfLines={1}>{item.distance}</Text> */}
                        
                        <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center'}]}>
                            <Icon name="ios-location" size={22} color="#5dda96" />
                            <Text style={[styles.text,styles.description]} numberOfLines={3}>{item.address}</Text>
                        </View>
                        {/* <View style={styles.row}>
                            <MaterialCommunityIcons name="map-marker-distance" size={22} color="#5dda96"/>
                            <Text style={[styles.text,styles.description]} numberOfLines={1}>{item.distance+' km'}</Text>
                        </View> */}
                    </View>
                    <TouchableOpacity onPress={() => !item.favorite ? this.addToWishlist(item) : this.removeFromWishlist(item) } style={{alignSelf: 'flex-start'}}>
                        { item.favorite==true ?
                        <Icon name={"ios-heart"} size={30}  color="#F44336"/>
                        : 
                        <Icon name={"ios-heart-outline"} size={30}  color="#05294b"/>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <View style={[styles.content, { paddingLeft: 0 }]}>
                            {/* <Text style={[styles.text,styles.description]}>{item.rating != "No rating yet" ? item.rating+' '+strings.chargingStation.ratings : strings.chargingStation.noRating}</Text> */}
                            {item.rating != "No rating yet" ?
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={parseInt(item.rating)}
                                fullStarColor={'#A4FF8B'}
                                emptyStarColor={'#05294b'}
                                starSize={16}
                            /> : null }
                    </View>
                    <View style={[styles.row,{paddingRight:70}]}>
                    <Text style={styles.text} numberOfLines={1}>{item.distance}</Text>
                    </View>
                    <TouchableRipple onPress={() => this.navigateToDetails(item)} style={{flex: 1}}  rippleColor="rgba(255, 255, 255, .32)">
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                          <Text style={styles.buttonText}>{strings.chargingStation.station}</Text>
                        </LinearGradient>
                    </TouchableRipple>  
                    
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
        let { isLoading, chargingPointData, refreshing,favorite} = this.state;
         console.log(this.props.current_location.latitude != undefined ,'this.props');
        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.chargingStation.title}/>
                </View>
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
  
export default connect(mapStateToProps,mapDispatchToProps)(ChargingStations);
  