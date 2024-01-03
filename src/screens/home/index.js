import React, { Component } from 'react'
import { Text, Image, RefreshControl, Share, SafeAreaView, Linking,View, Dimensions, PermissionsAndroid, Platform, TouchableOpacity, TextInput, Modal, TouchableWithoutFeedback, Keyboard, ActivityIndicator, FlatList, AppState } from 'react-native'
//Libraries
import * as Animatable from 'react-native-animatable';
import { PROVIDER_GOOGLE, Marker, Callout, Circle, AnimatedRegion, UrlTile } from 'react-native-maps';
import MapView from "react-native-map-clustering";
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';
import { check, PERMISSIONS } from 'react-native-permissions'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Badge } from 'react-native-paper';
import { showMessage } from "react-native-flash-message";
import _ from "lodash";
import { db } from "../../utils/FirebaseConfig";
import AvailableList from "../../components/AvailableList";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
//Components
import { AuthContext } from '../../utils/authContext';
import EncryptedStorage from 'react-native-encrypted-storage';
import messaging from '@react-native-firebase/messaging';
import MarkerCallout from "../../components/MarkerCallout";
import AsyncStorage from "../../utils/AsyncStorage";
import FilterContent from "../../components/FilterContent";
// Theme Colors
import COLORS from "../../constants/colors";
//Api
import HttpRequest from "../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { chargingStation, distanceInfo, currentLocation } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Styles
import styles from './styles'
// import Locations from "../../utils/locations.json";
import { DrawerActions } from '@react-navigation/native';
import { Images } from '../../constants';
import { strings } from "../../utils/translations";

import LinearGradient from 'react-native-linear-gradient';
import { TouchableRipple } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import { useDrawerStatus } from '@react-navigation/drawer';

const geolib = require('geolib');

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 28.9345800;
const LONGITUDE = 77.0923800;
const LATITUDE_DELTA = 0.0522;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class Home extends Component {
  static contextType = AuthContext
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      region: {
        latitude: this.props.current_location.latitude != undefined ? this.props.current_location.latitude : LATITUDE,
        longitude: this.props.current_location.longitude != undefined ? this.props.current_location.longitude : LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [], //Locations
      searchResult: false,
      search: '',
      userinfo: '',
      
      refreshing: false,
      chargingStationData: '',
      stationdata:[],
      favorite: false,
      page_reload:true,
      oderVisible: false,
      modalVisible: false,
      isSearching: false,
      referral_message: '',
      calloutVisible: false,
      selectedMarker: '',
      marginBottom: 20,
      results:20,
      current_page:0,
      total_pages:0,
      loading:false,
      statusModal: false,
      resultData: '',
      referral_code: '',
      chargingStations: [],
      radius: 0,
      notification_count: 0,
      formData: {},
      deviceToken: null,
      orders: 0,
      subscription:0,
    };
    this.onChangeTextDelayed = _.debounce(this.getSearchResults, 2000);
    this.map = React.createRef();
    this.onChangeTextDelayed = _.debounce(this.checkdata, 2000);
    this.map = React.createRef();
  }

  componentDidMount = () => {
    // this.tokenn();
    // this.store();
    // this.loadMore(0);

    this.userprofile();
    this.getNotificationsCount();
    this.getCurrentLocation();
    this.checkdata();
    let { navigation } = this.props;
    // this._checkNotificationCount = this.props.navigation.addListener('focus', () => {
  
    //  // this.getChargingStations();
    // });
    this._unsubscribe = navigation.addListener('focus', () => {
      // this.loadMore(0);
      // this.store();
       this.getNotificationsCount();
      this.getCurrentLocation();
      this.checkdata();
      this.userprofile();
      this.checkStatusNotification();

    });
    // console.log("home");
    if (Platform.OS === 'android') {

      this.requestLocationPermission();
    } else {
      this.getCurrentLocation();
    }
   // this.getChargingStations();
    this.verifyuser();

  }


  componentWillUnmount() {
    this._unsubscribe();
    // this._checkNotificationCount();
  }
  checkStatusNotification = () => {
    try {
      db.ref('/EFILLXOCPP16JV2' + '/').on('value', snapshot => {

        //  console.log('Status Notification Snapshot Value:',snapshot);
        this.getChargingStations();
      });

    } catch (e) {
      console.log('Exception: ', e);
    }
  }

  store=async()=>{
        
    this.props.navigation.addListener('focus', () => {
        AsyncStorage.getSubScription().then(val => {
            //  console.log('toggle', val);
            if (val != null && val != '') {
                // console.log('toggle1', val);

                this.setState({
                    subscription: val
                })
            }

        });
    });

 
}


  verifyuser = () => {
    messaging().getToken().then(token => {
      HttpRequest.verifyuser({ token: this.props.token, device_token: token})
      .then(res => {
        const result = res.data;
        if (res.status == 200 && result.error == true) {
          
          //  this.signOut();
        } 
      })
      .catch(err => {
        console.log('API CATCH EXCEPTION', err);
      });
    });
   
  }

  // signOut = async () => {
  //   try {
  //     await EncryptedStorage.removeItem("user_session");
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   this.context.signOut();
  //   console.log("logout", this.context.signOut);
  // }
  //Get Orders
  checkdata = () => {
    HttpRequest.getactiveOrders(this.props.token)
      .then(res => {
        const result = res.data;
        // console.log("Response ---------- ", result);
        if (res.status == 200 && !result.error) {
          this.setState({ orders: result.data.length });
          if (result.data.length > 0) {

            this.setState({ orders: result.data.length, refreshing: true });
            // console.log("orders", this.state.orders);
          }
        } else {
          this.setState({ refreshing: false });
          console.log("Charging Station API Error : ", result);
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
  //Get Notification Count
  getNotificationsCount = () => {
    HttpRequest.getAllNotifications(this.props.token)
      .then(res => {
        const result = res.data;
        if (res.status == 200 && !result.error) {
          this.setState({ notification_count: result.notification_count });
        } else {
          if (result.error && result.message == 'No new notification Found') {
            this.setState({ notification_count: result.notification_count });
            // console.log('notifications');
          }
          console.log("Notification API Error : ", result);
        }
      })
      .catch(err => {
        console.log("Notification API Catch Exception: ", err);
      });
  }
  //Get Current User Location & coordinates
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

        this.props.currentLocation(region);
        try {
          if (Object.keys(region).length != 0) {
            this.map.current.animateToRegion(region, 2000);
            // console.log('userlocation1');
          }
        } catch (e) {
          console.log(e);
        }
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

  }
  //Permission to access users current location
  requestLocationPermission = async () => {
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
        // console.log("Location permission granted");
        this.getCurrentLocation();
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  userprofile = () => {
    let { referral_code } = this.state;
    HttpRequest.UserInfo(this.props.token)
      .then(res => {
        const result = res.data;
        if (res.status == 200 && !result.error) {
          this.setState({ referral_code: result.detail.referral_code, referral_message: result.detail.referral_message });
        } else {
          this.setState({ refreshing: false });
          console.log("User Profile API Error : ", result);
        }
      })
      .catch(err => {
        this.setState({ isLoading: false, refreshing: false });
        console.log("User Profile API Catch Exception: ", err);
        showMessage({
          message: strings.error.title,
          description: strings.error.message,
          type: "danger",
        });
      });
  }

  onShare = async () => {
    let { referral_code, referral_message } = this.state;
    var dc = "09begh";

    let av = referral_message;
    try {

      const result = await Share.share({
        title: 'Share Referal code with your friends to get',
        message: referral_message
        // url: ' AppLink https://play.google.com/store/search?q=efill&c=apps'
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }
  //Get All Charging Stations from server
  getChargingStations = () => {
    let { radius, region } = this.state;
    HttpRequest.getChargingStationsDistance(region.latitude != undefined && region.longitude != undefined ? { latitudeFrom: region.latitude, longitudeFrom: region.longitude } : {}, this.props.token)
      .then(res => {
        this.setState({ isLoading: false });
        const result = res.data;
        // console.log("Get Charging stations List API Response ---------- ", result);
        if (res.status == 200 && !result.error) {
          if (this.props.charging_stations != result) {
            //  console.log('Marker Set',result);
            // this.setState({chargingStationData:result});
            //  console.log("staionsdetails",this.state.chargingStationData);
            this.props.chargingStation(result);
            this.setMarkersOnMap(result);
          }
        } else {
          console.log("Charging Station API Error : ", result);
        }
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log("Charging Station API Catch Exception: ", err);
      });
  }


  //Set Array of charging stations on the map
  setMarkersOnMap = (charging_stations) => {
    let markers = charging_stations.map(item => {
      return {
        id: item.id,
        name: item.name,
        address: item.address,
        status: item.status,
        rating: item.rating,
        available_points: (item.connector != undefined ? (item.connector).length : 'No') + ' points available',
        coords: {
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.long)
        },
        image_url: item.image[0],
        connector: item.connector
      }
    });
    // console.log("Marker Set on Map: ", markers.length);
    this.setState({ markers: markers });
    try {
      this.circle.setNativeProps({ fillColor: "rgba(125,189,84,0.3)", strokeColor: "#006622", strokeWidth: 2 });
    } catch (Exception) {
      // console.log('Error in Circle Native props');
    }

  }
  //Filter markers as per radius applied
  filterMarkers = (radius, charging_stations, formData, lat1, long1) => {

    let { region, markers } = this.state;
console.log('markers',formData)
    this.setState({ markers: [] });

    if (charging_stations.length > 0) {
      var latt = 0;
      var longg = 0;

      let markers = charging_stations.map(item => {

        latt = parseFloat(item.lat);
        longg = parseFloat(item.long);

        return {
          id: item.id,
          name: item.name,
          address: item.address,
          status: item.status,
          rating: item.rating,
          available_points: (item.connector != undefined ? (item.connector).length : 'No') + ' points available',
          coords: {
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.long),
          },
          image_url: item.image[0],
          connector: item.connector
        }
      });
      this.setState({ markers: markers });
    } else {
      console.log("No Charging Stations Registered Yet.");
    }

    // if (this.state.radius != radius) {
    //   try {console.log(item.lat,"latii");
    this.map.current.animateToRegion({ latitude: 23.5120086, longitude: 80.3289551, latitudeDelta: LATITUDE_DELTA * Number(600), longitudeDelta: LONGITUDE_DELTA * Number(600) }, 2000);
    //   } catch (exception) {
    //     console.log('Setting Native Props for Circle on Map on : filterMarkers: ', exception);
    //   }
    // }
    this.setState({ modalVisible: false, radius: radius, formData: formData });
    this.circle.setNativeProps({ fillColor: "rgba(125,189,84,0.3)", strokeColor: "#006622", strokeWidth: 2 });
  }
  //Calculate distance of the markers from current coordinates
  calculateDistance = (origLat, origLon, markerLat, markerLon) => {
    return geolib.getDistance(
      { latitude: origLat, longitude: origLon },
      { latitude: markerLat, longitude: markerLon }
    );
  }
  //Close Filter modal
  closeFilter = (type) => {
    this.setState({
      modalVisible: false
    })
  }
  availableList = () => {
    let { navigation } = this.props;
    this.setState({ oderVisible: true, abdc: navigation });
  }

  //Clear Filter modal
  clearFilter = () => {
    this.setState({
      modalVisible: false,
      formData: {}
    });
    this.getChargingStations();
  }
  // Map is ready & loaded
  onMapReady = () => {
    this.setState({ loading: false, marginBottom: 0 });
    try {
      if (Object.keys(this.props.current_location).length != 0) {
        this.map.current.animateToRegion(this.props.current_location, 2000);
        if (this.circle) {
          this.circle.setNativeProps({ fillColor: "rgba(125,189,84,0.3)", strokeColor: "#006622", strokeWidth: 2 });
        }
      }
    } catch (e) {
      console.log("OnMapReady: ", e);
    }
  };

  circleLayout = () => {
    if (this.circle) {
      this.circle.setNativeProps({ fillColor: "rgba(125,189,84,0.3)", strokeColor: "#006622", strokeWidth: 2 });
    }
  }
  //Marker Callout Open Action
  openCallout = (marker) => {
    this.setState({
      calloutVisible: true,
      selectedMarker: marker
    })
  }
  //Marker Callout Close Action
  closeCallout = () => {
    this.setState({
      calloutVisible: false,
      selectedMarker: ''
    });
  }
  //Toggle Status Button
  toggleCustomIcon = () => {
    let { statusModal } = this.state;
    this.setState({ statusModal: !statusModal })
  }
  //Toggle Filter Button
  toggleFilterIcon = () => {
    this.setState({ modalVisible: true });
  }

  onChangeText = (text) => {
    this.setState({
      searchResult: false,
      search: text
    })
    if (text.length > 0) {
      this.getChargingStations();
      this.onChangeTextDelayed();
    } else {
      this.setState({
        searchResult: false,
        search: '',
        resultData: [],
        isSearching: false
      });
    }
  }

  closeResult = () => {
    this.setState({
      searchResult: false,
      search: '',
      resultData: [],
      isSearching: false
    });
  }

  //Search Results
  getSearchResults = (data, details) => {
    let { search } = this.state;
    search = search.toLowerCase();
    Keyboard.dismiss();
    let searchResult = { latitude: details.geometry.location.lat, longitude: details.geometry.location.lng };
    this.setState({
      searchResult: true,
      resultData: searchResult,
      isSearching: false
    });
    this.setState({ isSearching: false });
    this.navigateToLocation();
  }

  //Navigate to a specific location after search result
  navigateToLocation = (item) => {
    let { radius, resultData } = this.state;
    this.setState({ searchResult: false, resultData: [] });
    try {
      this.map.current.animateToRegion({ latitude: resultData.latitude, longitude: resultData.longitude, latitudeDelta: LATITUDE_DELTA * Number((radius / 500)), longitudeDelta: LONGITUDE_DELTA * Number((radius / 500)) }, 2000);
    } catch (exception) {
      console.log('Setting Native Props for Circle on Map on : NavigateToLocation: ', exception);
    }
  }

  navigateToChargingStation = (item) => {
    this.setState({ searchResult: false, resultData: [] });
    this.props.navigation.navigate('ChargingStationDetails', { itemId: item.id });
  }

  addToWishlist = (item) => {
    let { stationdata } = this.state;
    // console.log('addfav',stationdata);
    // console.log('state',chargingPointData)
    HttpRequest.addFavorite({ id: item.id }, this.props.token)
    .then(res => {
        const result = res.data;
        //  console.log("Add Favorite API Response ---------- ", result);
        if (res.status == 200 && result.error == false) {
            this.setState({
              stationdata: stationdata.map(el => (el.id === item.id ? {...el, favorite: !el.favorite} : el))
            });
            showMessage({
                message: strings.chargingStation.response.success.title,
                description: strings.success.favouriteList,
                type: "success",
            });
        } else {
            // console.log("Add Favorite API Error : ",result);
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
  
    let { stationdata } = this.state;
    HttpRequest.removeFavorite({ id: item.id }, this.props.token)
    .then(res => {
        const result = res.data;
        // console.log("Remove Favorite API Response ---------- ", result);
        if (res.status == 200 && result.error == false) {
            this.setState({
              stationdata: stationdata.map(el => (el.id === item.id ? {...el, favorite: !el.favorite} : el))
            });
            showMessage({
                message: strings.chargingStation.response.success.title,
                description: strings.success.removedFavouriteList,
                type: "success",
            });
        } else {
            // console.log("Remove Favorite API Error : ",result);
            showMessage({
           message: strings.error.title,
            description: result.message != undefined ? result.message : result.status,
            type: "danger",
            });
        }
    })
    .catch(err => {
        // console.log("Remove Favorite API Catch Exception: ",err);
        showMessage({
           message: strings.error.title,
            description: strings.error.message,
            type: "danger",
        });
    });
}
  navigateToDetails = (item) => {
    this.props.navigation.navigate('ChargingStationDetails',{ itemId: item.id })
    // console.log('click',item);
}

navigate = (item) => {
  // console.log("naviagte",item);
   let { name, lat, long, address } = item;
  const latitude = lat;
  const longitude = long;
   const label = name;
  const daddr = `${latitude},${longitude}`;
  const url = Platform.select({
      ios: `http://maps.google.com/?daddr=${daddr}&directionsmode=driving&q=${address}`,
      android: `http://maps.google.com/?daddr=${daddr}&directionsmode=driving&q=${address}`,
  });
  Linking.openURL(url);
}
// rendersationList = ({ item }) => (
//   <TouchableOpacity style={styles.items} activeOpacity={.7}>
//       <View style={styles.itemHeader}>
//           {/* Charging Station Image & Ratings */}
//           <View style={styles.rows}>
//               <Image source={{uri:item.icon}} style={styles.images}/>
//               <View style={styles.contents}>
//                   <View style={styles.rows}>
//                       <Text style={[styles.texts, styles.titles]} numberOfLines={2}>{item.name}</Text>
                     
//                   </View>
//                   <View style={[styles.rows, { justifyContent: 'space-between', alignItems: 'center'}]}>
//                       {item.avl_status==0 ?
//                       <Text style={styles.text1s}>No Connector Available</Text>
//                       :
//                       <Text style={styles.text2s}>{item.avl_status} Connector Available</Text>
// }
//                   </View>
//                   {/* <Text style={styles.text} numberOfLines={1}>{item.distance}</Text> */}
                  
//                   <View style={[styles.rows, { justifyContent: 'space-between', alignItems: 'center'}]}>
//                       {/* <Icon name="ios-location" size={22} color="#5dda96" /> */}
//                       {/* <Text style={[styles.texts,styles.descriptions]} numberOfLines={3}>{item.distance}</Text> */}
//                       {item.rating != "No rating yet" ?
//                       <StarRating
//                           disabled={true}
//                           maxStars={5}
//                           rating={parseInt(item.rating)}
//                           fullStarColor={'#A4FF8B'}
//                           emptyStarColor={'#05294b'}
//                           starSize={16}
//                       /> : null }
//                    {/* <Text style={[styles.texts,styles.descriptions]}>{item.rating != "No rating yet" ? item.rating+' '+strings.chargingStation.ratings : strings.chargingStation.noRating}</Text> */}

//                   </View>
//                   {/* <View style={styles.row}>
//                       <MaterialCommunityIcons name="map-marker-distance" size={22} color="#5dda96"/>
//                       <Text style={[styles.text,styles.description]} numberOfLines={1}>{item.distance+' km'}</Text>
//                   </View> */}
//               </View>
//               <TouchableOpacity onPress={ !item.favorite ? this.addToWishlist.bind(this,item) : this.removeFromWishlist.bind(this,item)} style={{alignSelf: 'flex-start'}}>
//                   { item.favorite==true ?
//                   <Icon name={"ios-heart"} size={30}  color="#F44336"/>
//                   : 
//                   <Icon name={"ios-heart-outline"} size={30}  color="#05294b"/>
//                   }
//               </TouchableOpacity>
//           </View>
//           <View style={styles.rows}>
//               <TouchableOpacity onPress={this.navigate.bind(this,item)} style={[styles.contents, { paddingLeft: 0 }]}>
              
//               <Text style={[styles.texts,styles.descriptions]} numberOfLines={3}><MaterialCommunityIcons name="directions" size={22} color="#5dda96"/>
//               {item.distance}
//               </Text>
              
//                       {/* <Text style={[styles.text,styles.description]}>{item.rating != "No rating yet" ? item.rating+' '+strings.chargingStation.ratings : strings.chargingStation.noRating}</Text> */}
//                       {/* {item.rating != "No rating yet" ?
//                       <StarRating
//                           disabled={true}
//                           maxStars={5}
//                           rating={parseInt(item.rating)}
//                           fullStarColor={'#A4FF8B'}
//                           emptyStarColor={'#05294b'}
//                           starSize={16}
//                       /> : null } */}
//               </TouchableOpacity>
//               {/* <View style={[styles.rows,{paddingRight:70}]}>
//               <Text style={styles.texts} numberOfLines={1}>{item.distance}</Text>
//               </View> */}
//               <TouchableRipple onPress={() => this.navigateToDetails(item)} style={{flex: 1}}  rippleColor="rgba(255, 255, 255, .32)" activeOpacity={.7}>
//                   <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButtons}>
//                     <Text style={styles.buttonTexts}>{strings.chargingStation.station}</Text>
//                   </LinearGradient>
//               </TouchableRipple>  
              
//           </View>
//       </View>
     
//   </TouchableOpacity>
// );

  //Render Status List Items
  renderItem = ({ item }) => (
    <View style={styles.item}>
      <MaterialCommunityIcons
        size={20}
        name={'checkbox-blank-circle'}
        color={item.color}
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  renderResultItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.resultItem} onPress={() => this.navigateToChargingStation(item)}>
      <View style={styles.resultContent}>
        {/* Name */}
        <Text style={[styles.resultText, styles.resultName]}>{item.name}</Text>

        {/* Address */}
        <Text style={[styles.resultText, styles.resultAddress]} numberOfLines={2}>{item.address}</Text>

      </View>
    </TouchableOpacity>
  );

  closeOverLay = () => {
    let { statusModal, calloutVisible } = this.state;
    // console.log("statusmodel",this.state);

    if (calloutVisible) {
      //Close Marker Callout Modal
      this.closeCallout();
    } else if (statusModal) {
      //Close Status Modal
      this.setState({ statusModal: !statusModal })
    } else {
      //Close search Keypad
      Keyboard.dismiss();
    }
  }

  renderRandomMarkers = () => {
    return this.state.markers.map((marker, i) => (
      <Marker
        key={marker.id}
        coordinate={{
          latitude: marker.coords.latitude + (Math.random() - 0.5) * LONGITUDE,
          longitude: marker.coords.longitude + (Math.random() - 0.5) * LONGITUDE_DELTA
        }}
        zIndex={i}
        onPress={() => this.openCallout(marker)}
      >
        <Image source={marker.status == 0 ? Images.deactiveMarker : marker.status == 1 ? Images.activeMarker : marker.status == 2 ? Images.busyMarker : Images.unavailableMarker} resizeMode="contain" style={styles.markerIcon} />
      </Marker>
    ));
  }
 
  onRefresh = () => {
    this.setState({ refreshing : true})
    wait(2000).then(() =>  this.loadMore());
}

//   loadMore =(list)=>{
//     // console.log('list',list);
//     if(list==0){
//       this.state.stationdata = [];
//       this.state.current_page=0;
//       // console.log('lengjssht',this.state.stationdata);
//       if(this.state.page_reload==false){
//         // console.log('scrollindex',this.state.stationdata);
//         // this.flatListRef.scrollToIndex({animated:true,index:0});
//         setTimeout(() => this.flatListRef.scrollToOffset({ index: 0}), 1000);

//       }
//       this.setState({page_reload:false})
      
//     }
//     // console.log('lenght',ttationdata)
     
//       let { radius, region ,stationdata} = this.state;
//       this.setState({ isLoading: true });
//       HttpRequest.getChargingStationsDistances(region.latitude != undefined && region.longitude != undefined ? { latitudeFrom: region.latitude, longitudeFrom: region.longitude ,current_page:list} : {}, this.props.token)
//         .then(res => {
//           this.setState({ isLoading: false });
//           const result = res.data;
//           //  console.log("hhfgryhh ---------- ", result);
//           if (res.status == 200 && !result.error) {

//             if (this.props.charging_stations != result.data) {
           
// stationdata.push(...result.data);
// // console.log('stationarray',stationdata);
//               this.setState({stationdata:stationdata,total_pages:result.total_count});
//               //  console.log("staionsdetails",this.state.stationdata);
             
//             }
//           } else {
//             console.log("Charging Station API Error : ", result);
//           }
//         })
//         .catch(err => {
//           this.setState({ isLoading: false });
//           console.log("Charging Station API Catch Exception: ", err);
//         });
    
  
//   }
 
//   _ItemLoadMore(){
//     // console.log('totalpages',this.state.total_pages);
//     // console.log('curretnpages',this.state.current_page);
//     if (this.state.current_page <= this.state.total_pages)
//     {
//       var newpage=this.state.current_page+1;
//       this.setState({current_page:newpage});
//       this.loadMore(newpage);
//     }
//     else{
//       console.log('no more data found')
//     }
    
// }


renderdrawer =()=> {
  // this.setState({ refreshing : true})
  let { navigation, token } = this.props;
  navigation.dispatch(DrawerActions.toggleDrawer());// console.log('open',data);
  // this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  // this.props.navigation.openDrawer(data);
}

  render() {
    let { navigation, token } = this.props;
    let { orders, oderVisible, refreshing, formData,isLoading,subscription, modalVisible,current_page, stationdata,calloutVisible, statusModal, radius, resultData, searchResult, isSearching } = this.state;
      // console.log('length', this.props);
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea}>
          <TouchableWithoutFeedback onPress={() => this.closeOverLay()}>
            <Animatable.View animation="fadeInUpBig" style={styles.mapContainer}>
              {/* Map View */}
              {Platform.OS=="android"?
              <MapView
                ref={this.map}
                provider={PROVIDER_GOOGLE}
                style={[styles.mapView, { marginBottom: this.state.marginBottom }]}
                showsUserLocation={true}
                showsMyLocationButton={false}
                followsUserLocation={true}
                showsCompass={true}
                loadingEnabled={true}
                zoomControlEnabled={true}
                zoomEnabled={true}
                zoomTapEnabled={true}
                scrollEnabled={true}
                pitchEnabled={true}
                initialRegion={this.state.region}
                onMapReady={() => this.onMapReady()}
                onPress={() => this.closeOverLay()}
              >
                {this.state.markers.map((marker, i) => (
                  <Marker
                    coordinate={marker.coords}
                    key={marker.id}
                    zIndex={i}
                    onPress={() => this.openCallout(marker)}
                  >
                    <Image source={marker.status == 0 ? Images.deactiveMarker : marker.status == 1 ? Images.activeMarker : marker.status == 2 ? Images.busyMarker : Images.unavailableMarker} resizeMode="contain" style={styles.markerIcon} />
                  </Marker>
                ))}

              </MapView>:
                <MapView
                ref={this.map}
                provider={PROVIDER_GOOGLE}
                style={[styles.mapView, { marginBottom: this.state.marginBottom }]}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                showsCompass={true}
                loadingEnabled={true}
                zoomControlEnabled={true}
                zoomEnabled={true}
                zoomTapEnabled={true}
                scrollEnabled={true}
                pitchEnabled={true}
                initialRegion={this.state.region}
                onMapReady={() => this.onMapReady()}
                onPress={() => this.closeOverLay()}
              >
                {this.state.markers.map((marker, i) => (
                  <Marker
                    coordinate={marker.coords}
                    key={marker.id}
                    zIndex={i}
                    onPress={() => this.openCallout(marker)}
                  >
                    <Image source={marker.status == 0 ? Images.deactiveMarker : marker.status == 1 ? Images.activeMarker : marker.status == 2 ? Images.busyMarker : Images.unavailableMarker} resizeMode="contain" style={styles.markerIcon} />
                  </Marker>
                ))}

              </MapView>
              }
              <View style={styles.searchBox}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer() }>
                  <Image source={Images.menu} style={styles.iconImage} />
                </TouchableOpacity>

                <View style={styles.roww}>
                  <View style={styles.searchSection}>

                    {/* Search bar field with  search icon */}

                    <GooglePlacesAutocomplete
                      placeholder='Search By Location'
                      placeholderTextColor="#000000"
                      autoCapitalize="none"
                      style={{ flex: 2, paddingLeft: 0 }}
                      query={{
                        key: 'AIzaSyCJP5zV4FJ7Kbg7k2aH76_xOsUIqcONIcw',
                        language: 'en',
                      }}
                      GooglePlacesDetailsQuery={{
                        fields: 'geometry',
                      }}
                      fetchDetails={true}
                      onPress={this.getSearchResults}
                      onFail={(error) => console.error(error)}
                    />
                    {isSearching ? <ActivityIndicator size='small' color={COLORS.PRIMARY} style={styles.searchIcon} /> : null}
                    {searchResult ?
                      <TouchableOpacity onPress={() => this.closeResult()}>
                        <Icon style={styles.searchIcon} name="ios-close-sharp" size={20} color="#000" />
                      </TouchableOpacity>
                      :
                      null}
                  </View>
                </View>
              </View>
              {/* <Animatable.View animation="zoomInUp" style={styles.footer}>
                    
                    <FlatList
                    
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    // onEndReachedThreshold={1}
                  //   onEndReached={({ distanceFromEnd }) => {
                  //     this._ItemLoadMore();
                  //  }}
                  
                  ref={(ref) => { this.flatListRef = ref; }}
                        data={stationdata}
                        renderItem={this.rendersationList}
                        keyExtractor={item => item.id+""}
                       
                        onEndReached={({ distanceFromEnd }) => {
                              this._ItemLoadMore();
                           }}
                          //  refreshing={this.onRefresh}
                          //  refreshControl={
                          //   <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={'#fff'}/>
                        // }

                    /> 
                   
                </Animatable.View> */}
              <View style={styles.notiIconContainer}>
                <TouchableOpacity activeOpacity={0.8} style={styles.IconButton} onPress={() => navigation.navigate('Notifications')} >
                  <Image source={this.state.notification_count > 0 ? Images.notificationBell : Images.notificationBell} style={this.state.notification_count > 0 ? styles.iconImage : styles.notificationIconImage} />
                  {this.state.notification_count > 0 ?
                    <Badge style={styles.badge} size={20}>{this.state.notification_count}</Badge> : null
                  }
                  {/* <Image source={Images.notification} style={styles.imageIcon} /> */}
                </TouchableOpacity>
              </View>
              <View style={styles.availabilityIconContainer}>
                <TouchableOpacity activeOpacity={0.8} style={styles.IconButton} onPress={this.toggleCustomIcon}>
                  <Image source={Images.ev} style={styles.imageIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.filterIconContainer}>
                <TouchableOpacity activeOpacity={0.8} style={styles.IconButton} onPress={this.toggleFilterIcon} >
                  <Image source={Images.filter} style={styles.imageIcon} />
                </TouchableOpacity>
              </View>
              {Platform.OS=="android"?
              <View style={styles.UserContainer}>
                <TouchableOpacity activeOpacity={0.8} style={styles.iconButton} onPress={this.requestLocationPermission} >
                  <Image source={Images.userlocate} style={styles.imageIcon} />
                </TouchableOpacity>
              </View>
              :null}
              <View style={styles.shareIconContainer}>
                <TouchableOpacity activeOpacity={0.8} style={styles.IconButton} onPress={this.onShare} >
                  <Image source={Images.sharing} style={styles.imageIconn} />
                </TouchableOpacity>
              </View>
              {orders != 0 ?
                <View style={styles.goku}>
                  {orders > 0 ?
                    <Badge style={styles.badge} size={20}>{orders}</Badge> : null
                  }
                <TouchableOpacity activeOpacity={0.8} style={styles.iconButton} onPress={()=>this.props.navigation.navigate('ChargingHistory')} >
                  <Image source={Images.charging_schedule} style={styles.imageIcon} />
                </TouchableOpacity>
             
                </View>
                : null}
              {statusModal &&
                <TouchableOpacity activeOpacity={0.8} onPress={() => { this.closeOverLay() }} style={styles.statusContainer}>
                  <TouchableOpacity style={styles.close} onPress={this.toggleCustomIcon} >
                    <Icon name="ios-close-circle" size={24} color="#fff" />
                  </TouchableOpacity>
                  <View onStartShouldSetResponder={() => true}>
                    <FlatList
                      data={[
                        {
                          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                          title: strings.home.available,
                          color: '#4CAF50',
                        },
                        {
                          id: '58694a0f-3da1-471f-bd96-145571e29d72',
                          title: strings.home.currentlyBusy,
                          color: '#FF9800',
                        },
                        {
                          id: '58694a0f-3da1-471f-bd96-145571e29d71',
                          title: strings.home.deActivated,
                          color: '#ecd52c',
                        },
                        {
                          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                          title: strings.home.notConnected,
                          color: '#979797',
                        },
                        
                       
                       
                      ]}
                      renderItem={this.renderItem}
                      keyExtractor={item => item.id}
                    />
                  </View>
                </TouchableOpacity>
              }
              {calloutVisible &&
                <MarkerCallout marker={this.state.selectedMarker} navigation={this.props.navigation} stations={this.props.charging_stations} closeCallout={this.closeCallout} />
              }
            </Animatable.View>
          </TouchableWithoutFeedback>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <FilterContent closeModal={this.closeFilter} clearModalData={this.clearFilter} filterMap={this.filterMarkers} formData={this.state.formData} />
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={oderVisible}
          >
            <AvailableList closeModal={this.closeCallout} clearModalData={this.clearFilter} filterMap={this.filterMarkers} formData={navigation} />
          </Modal>
        </SafeAreaView>
      </View>

    )
  }
}


const mapStateToProps = state => {

  return {
    device_token: state.device_token,
    token: state.token,
    charging_stations: state.charging_stations,
    current_location: state.current_location
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    chargingStation: bindActionCreators(chargingStation, dispatch),
    currentLocation: bindActionCreators(currentLocation, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
