TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, Button } from 'react-native';
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
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


class FavouriteChargingStations extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            chargingPointData: '',
            refreshing: false,
            favorite: true,
        };
    }

    componentDidMount = () => {
        this._getChargingStation = this.props.navigation.addListener('focus', () => {
            this.getChargingStations();
        });
    }

    componentWillUnmount() {
        this._getChargingStation();
    }

    getChargingStations = () => {
            HttpRequest.getFavouriteChargingStations(this.props.token)
            .then(res => {
                this.setState({ isLoading: false });
                const result = res.data;
                 console.log("Favourite charging Station API Response ---------- ", result);
                if (res.status == 200 ) {
                    // this.props.chargingStations(result.data);
                    this.setState({ chargingPointData:  result.data, refreshing: false})
                } else {
                    console.log("Favourite Charging Station API Error : ",result);
                    showMessage({
                       message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false, refreshing: false });
                console.log("Favourite Charging Station API Catch Exception: ",err);
                showMessage({
                   message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
    }

    onRefresh = () => {
        this.setState({ refreshing : true})
        wait(2000).then(() =>  this.getChargingStations());
    }

    addToWishlist = (item) => {
        let { chargingPointData } = this.state;
        HttpRequest.addFavorite({ id: item.id }, this.props.token)
        .then(res => {
            const result = res.data;
            // console.log("Add Favorite API Response ---------- ", result);
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
                this.getChargingStations();
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
    }

    renderItem = ({ item }) => (
        <TouchableRipple onPress={() => this.navigateToDetails(item)} style={styles.item}>
            <View style={styles.itemHeader}>
                {/* Charging Station Image & Ratings */}
                <View style={styles.row}>
                    <Image source={{uri:item.icon}} style={styles.image}/>
                    <View style={styles.content}>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.title]} numberOfLines={1}>{item.name}</Text>
                        </View>
                        {/* <Text style={styles.text} numberOfLines={1}>{item.distance}</Text> */}
                        <View style={styles.row}>
                            <Icon name="ios-location" size={22} color="#5dda96"/>
                            <Text style={[styles.text,styles.description]} numberOfLines={2}>{item.address}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.removeFromWishlist(item) } style={{alignSelf: 'flex-start'}}>
                        { this.state.favorite ?
                        <Icon name={"ios-heart"} size={36}  color="#F44336"/>
                        : 
                        <Icon name={"ios-heart-outline"} size={36}  color="#05294b"/>
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
                    <TouchableRipple onPress={() => this.navigateToDetails(item)} style={{flex: 1}}  rippleColor="rgba(255, 255, 255, .32)">
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                          <Text style={styles.buttonText}>{strings.chargingStation.station}</Text>
                        </LinearGradient>
                    </TouchableRipple>  
                    
                </View>
            </View>
           
        </TouchableRipple>
    );

    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>{strings.chargingStation.response.error.message}</Text>
        </View>
    )
    
    render() {
        let { navigation } =  this.props;
        let { isLoading, chargingPointData, refreshing} = this.state;
        console.log(chargingPointData,'chargingPointData');

        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.chargingStation.favouriteChargingStation}/>
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
    };
};
  
  
const mapDispatchToProps = (dispatch) => {
      return bindActionCreators({}, dispatch);
}
  
export default connect(mapStateToProps,mapDispatchToProps)(FavouriteChargingStations);