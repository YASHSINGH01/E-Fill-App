import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, StatusBar, SafeAreaView, RefreshControl,Pl, ActivityIndicator, ScrollView, Platform } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated, { cond } from 'react-native-reanimated';
import StarRating from 'react-native-star-rating';
import { showMessage } from "react-native-flash-message";
//Api
import HttpRequest from "../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { chargingStationInfo } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Components
import Header from '../../components/Header';
//Constants
import { Images } from "../../constants/";
import { strings } from "../../utils/translations";
//Styles
import styles from './styles';
//Tab View
import Carousel from 'react-native-snap-carousel';
import Tab1 from "./tabView/tab1";
import Tab2 from "./tabView/tab2";

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

class ChargingStationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            index: 0,
            visible: false,
            routes: [
                { key: 'first', title: strings.chargingStationDetails.overview },
                // { key: 'second', title: strings.chargingStationDetails.review },
            ],
            favorite: false,
            details: '',
            images: [],
        }
    }

    componentDidMount = () => {
        wait(500).then(() =>
            this.getChargingStationDetails()
        );
    }

    getChargingStationDetails = () => {
        let { itemId } = this.props.route.params == undefined ? '1' : this.props.route.params;
        HttpRequest.getChargingStationDetails({ id: itemId }, this.props.token)
            .then(res => {
                this.setState({ isLoading: false });
                const result = res.data;
                if (res.status == 200 && result.error == false) {
                    console.log("Charging Station API Response ---------- ", result);

                    this.props.chargingStationInfo(result.data);
                    this.setState({ details: result.data, favorite: result.data.isFavorite, images: result.data.image });
                    console.log("charging", this.state.details);
                } else {
                    //console.log("Charging Station API Error : ",result);
                    showMessage({
                        message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false });
                //console.log("Charging Station API Catch Exception: ",err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
    }

    _renderTabBar = props => {
       
        return (
            <View >
                {props.navigationState.routes.map((route, i) => {
                    // return (
                    //     this.state.index == i ? 
                    //     <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']}  key={i}>
                    //         <TouchableOpacity onPress={() => this.setState({ index: i })} >
                    //             <Animated.Text >{route.title}</Animated.Text>
                    //         </TouchableOpacity>
                    //     </LinearGradient>
                    //     : 
                    //     <TouchableOpacity onPress={() => this.setState({ index: i })} key={i}>
                    //         <Animated.Text >{route.title}</Animated.Text>
                    //     </TouchableOpacity> 
                    // );
                })}
            </View>
        );
    };

    _renderScene = (details) => SceneMap({
        first: () => <Tab1 navigation={this.props.navigation} data={details} />,
        second: () => <Tab2 navigation={this.props.navigation} data={details} />,
    });

    _handleIndexChange = index => this.setState({ index });

    addToWishlist = (item) => {
        console.log("fav", item.id, this.props.token)
        HttpRequest.addFavorite({ id: item.id }, this.props.token)
            .then(res => {
                const result = res.data;
                console.log("Add Favorite API Response ---------- ", result);
                if (res.status == 200 && result.error == false) {
                    this.setState({
                        favorite: true
                    });
                    showMessage({
                        message: strings.success.title,
                        description: strings.success.favouriteList,
                        type: "success",
                    });
                } else {
                    console.log("Add Favorite API Error : ", result);
                    showMessage({
                        message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                console.log("Add Favorite API Catch Exception: ", err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
    }

    removeFromWishlist = (item) => {
        HttpRequest.removeFavorite({ id: item.id }, this.props.token)
            .then(res => {
                const result = res.data;
                // console.log("Remove Favorite API Response ---------- ", result);
                if (res.status == 200 && result.error == false) {
                    this.setState({
                        favorite: false
                    });
                    showMessage({
                        message: strings.success.title,
                        description: strings.success.removedFavouriteList,
                        type: "success",
                    });
                } else {
                    //console.log("Remove Favorite API Error : ",result);
                    showMessage({
                        message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                //console.log("Remove Favorite API Catch Exception: ",err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
    }
    _renderItem({ item, index }) {
        return (
            <View
                style={{
                    height: 10,
                    padding: 15,
                    marginTop: 50,
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom:Platform.OS=="ios"?25:0
                }}>
                    <View style={{ marginTop: Platform.OS=="android"?10:0}}>
                <Image source={{ uri: item.url }} style={styles.headerImage} />
                </View>
            </View>

        )
    }

    render() {
        let { navigation } = this.props;
        let { isLoading, details, favorite, images } = this.state;
        console.log(favorite,'charge');
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.chargingStationDetails.title} />
                </View>
                <View style={[styles.footer, styles.footerr]}>
                    {isLoading ?
                        <View style={styles.noDataFoundContainer}>
                            <ActivityIndicator size='large' color='#fff' />
                        </View>
                        : details != '' ?
                            <View style={styles.scrollView}>
                                <Carousel
                                    layout={"default"}
                                    ref={ref => this.images = ref}
                                    data={images}
                                    loop={true}
                                    sliderWidth={430}
                                    itemWidth={450}
                                    renderItem={this._renderItem}
                                    onSnapToItem={index => this.setState()} />

                                {/* <View style={styles.wishlist}>
                            { favorite  ?
                            <Icon name={"ios-heart"} size={36}   color="#F44336" onPress={() => this.removeFromWishlist(details)}/>
                            : 
                            <Icon name={'ios-heart-outline'} size={36}  color="#ffffff" onPress={() => this.addToWishlist(details)} />
                            }  */}
                                {/* { details.rating != strings.chargingStation.noRating ?
                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        rating={parseInt(details.rating)}
                                        fullStarColor={'#5dda96'}
                                        emptyStarColor={'#000000'}
                                        starSize={18}
                                    /> : null } */}
                                {/* </View>  */}
                                {/* <View style={styles.titleContainer}>
                            <View style={styles.colLeft}> */}
                                {/* <Text style={[styles.title, styles.bold]} numberOfLines={2}>{details.name}</Text> */}
                                {/* <View style={[styles.row,styles.margin]}>
                                { favorite  ?
                            <Icon name={"ios-heart"} size={36}   color="#F44336" onPress={() => this.removeFromWishlist(details)}/>
                            : 
                            <Icon name={'ios-heart-outline'} size={36}  color="#ffffff" onPress={() => this.addToWishlist(details)} />
                            } */}
                                {/* <Icon name="ios-location" size={18} color="#5dda96"/> */}
                                {/* <Text style={[styles.text, styles.small]} numberOfLines={1}>{details.city} {details.state}</Text> */}
                                {/* </View> */}
                                {/* </View> */}
                                {/* <View style={styles.colRight}> */}
                                {/* <Text style={[styles.text, styles.small]}>{details.rating != "No rating yet"  ? details.rating+' '+strings.chargingStation.ratings : strings.chargingStation.noRating }</Text> */}
                                {/* <View style={styles.row}>
                                    { details.rating != strings.chargingStation.noRating ?
                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        rating={parseInt(details.rating)}
                                        fullStarColor={'#5dda96'}
                                        emptyStarColor={'#fff'}
                                        starSize={18}
                                    /> : null }
                                </View> */}
                                {/* </View>  */}
                                {/* </View>                      */}
                                <View style={styles.bodyContainer}>
                                    <TabView
                                        navigationState={this.state}
                                        renderScene={this._renderScene(this.state.details)}
                                        renderTabBar={this._renderTabBar}
                                        onIndexChange={this._handleIndexChange}
                                    />
                                </View>
                            </View> :
                            <View style={styles.noDataFoundContainer}>
                                <Text style={styles.noDataFoundText}>{strings.chargingStationDetails.response.error.notFound}</Text>
                            </View>
                    }
                </View>
            </View>

        )
    }
}


const mapStateToProps = state => {

    return {
        token: state.token,
        charging_station_info: state.charging_station_info
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        chargingStationInfo: bindActionCreators(chargingStationInfo, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChargingStationDetails);