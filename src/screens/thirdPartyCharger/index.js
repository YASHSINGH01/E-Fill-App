//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, Linking, Platform } from 'react-native';
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
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
import { bindActionCreators } from 'redux';
import { strings } from '../../utils/translations';
//Styles
import styles from './styles';

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}


const geolib = require('geolib');

class ThirdPartyCharger extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            chargingPointData: '',
            refreshing: false
        };
    }

    componentDidMount = () => {
        this._getThirdPartyChargingStations = this.props.navigation.addListener('focus', () => {
            this.getThirdPartyChargingStations();
        });
    }

    componentWillUnmount() {
        this._getThirdPartyChargingStations();
    }

    getThirdPartyChargingStations = () => {
        HttpRequest.getThirdPartyChargingStations(this.props.token)
            .then(res => {
                const result = res.data;
                //console.log("Third Party Charging Station API Response ---------- ", result);
                if (res.status == 200 ) {
                    this.setState({ chargingPointData: result.data, refreshing: false, isLoading: false})
                } else {
                    this.setState({ isLoading: false });
                    //console.log("Third Party Charging Station API Error : ",result);
                    showMessage({
                       message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false, refreshing: false });
                //console.log("Third Party Charging Station API Catch Exception: ",err);
                showMessage({
                   message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
    }

    onRefresh = () => {
        this.setState({ refreshing : true})
        wait(2000).then(() =>  this.getThirdPartyChargingStations());
    }

    navigate = (item) => {
        const latitude = item.latitude;
        const longitude = item.longitude;
        const label = item.company_name;
        const daddr = `${latitude},${longitude}`;
        const url = Platform.select({
            ios: `http://maps.google.com/?daddr=${daddr}&directionsmode=driving&q=${label}`,
            android: "geo:" + latitude + "," + longitude + "?q=" + label
        });
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                browser_url =
                    "https://www.google.de/maps/@" +
                    latitude +
                    "," +
                    longitude +
                    "?q=" +
                    label;
                return Linking.openURL(browser_url);
            }
        });
    }

    navigateToDetails = (item) => {
        //console.log("Third Party Station Details: ", item);
        this.props.navigation.navigate('ThirdPartyChargerDetails',{ item: item })
    }

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.navigateToDetails(item)} style={styles.item} activeOpacity={.8} >
            <View style={styles.itemHeader}>
                {/* Charging Station Image & Ratings */}
                <View style={styles.row}>
                    <Image source={Images.stationThumbnail} style={styles.image}/>
                    <View style={styles.content}>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.title]} numberOfLines={1}>{item.company_name || 'Unknown'}</Text>
                        </View>
                        <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center'}]}>
                            <Icon name="ios-location" size={22} color="#5dda96" />
                            <Text style={[styles.text,styles.description]} numberOfLines={1}>{item.address || 'Unknown'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Entypo name="power-plug" size={22} color="#5dda96"/>
                            <Text style={[styles.text,styles.description]} numberOfLines={1}>{item.connector.length > 1 ? ' '+item.connector.length+' '+strings.thirdPartyChargingStation.availableConnector : ' '+item.connector.length+' '+strings.thirdPartyChargingStation.availableConnector }</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.navigate(item)} style={{alignSelf: 'flex-start', marginHorizontal: 10}}>
                        <Icon name={"ios-navigate-circle-sharp"} size={40}  color="#F44336"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <View style={[styles.content, { paddingLeft: 0 }]}>
                        <Text style={[styles.text,styles.description]}>{strings.thirdPartyChargingStation.powerRating} : {item.power_rating || 'Unknown'}</Text>
                    </View>
                    <TouchableRipple onPress={() => this.navigateToDetails(item)} style={{flex: 1}}  rippleColor="rgba(255, 255, 255, .32)">
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                          <Text style={styles.buttonText}>{strings.thirdPartyChargingStation.viewDetails}</Text>
                        </LinearGradient>
                    </TouchableRipple>  
                    
                </View>
            </View>
           
        </TouchableOpacity>
    );

    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>{strings.chargingStation.response.error.message}</Text>
        </View>
    )
    
    render() {
        let { navigation } =  this.props;
        let { isLoading, chargingPointData, refreshing} = this.state;

        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.thirdPartyChargingStation.title}/>
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
  
export default connect(mapStateToProps,mapDispatchToProps)(ThirdPartyCharger);
  