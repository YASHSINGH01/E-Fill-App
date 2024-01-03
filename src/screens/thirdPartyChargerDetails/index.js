import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ImageBackground, SafeAreaView, Platform, Linking, ActivityIndicator } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
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
import Tab1 from "./tabView/tab1";

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

class ThirdPartyChargerDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            index: 0,
            routes: [
            { key: 'first', title: strings.chargingStationDetails.overview },
            ],
            details: ''
        }
    }

    componentDidMount = () => {
        wait(500).then(() => 
            this.getChargingStationDetails()
        );
    }

    getChargingStationDetails = () => { 
        let { item } = this.props.route.params == undefined ? null : this.props.route.params ;
      
        if (item != null ) {
            this.setState({ details:  item, isLoading: false });
        } else {
            showMessage({
                message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
            this.setState({  isLoading: false });
        }
    }

    navigate = () => {
        let { details } = this.state;
        const latitude = details.latitude;
        const longitude = details.longitude;
        const label = details.company_name;
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

    _renderTabBar = props => {
        return (
          <View style={styles.tabBar}>
            { props.navigationState.routes.map((route, i) => {
                return (
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.tabItem}  key={i}>
                        <TouchableOpacity onPress={() => this.setState({ index: i })} >
                            <Animated.Text style={styles.headerText}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    </LinearGradient>
                );
            })}
          </View>
        );
    };
    
    _renderScene = (details) => SceneMap({
        first: () => <Tab1 navigation={this.props.navigation} data={details}/>,
    });

    _handleIndexChange = index => this.setState({ index });

   
    render() {
        let { navigation } = this.props;
        let { isLoading, details } = this.state;
        return (
            <View  style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.chargingStationDetails.title}/>
                </View>
                <View style={styles.footer}>
                { isLoading ?  
                    <View style={styles.noDataFoundContainer}>
                        <ActivityIndicator size='large' color='#fff' /> 
                    </View>
                    : details != '' ?
                    <SafeAreaView style={styles.scrollView}>
                        { details.image_url != '' ?
                        <ImageBackground
                            style={styles.headerBackgroundImage}
                            source={{uri: details.image_url }}
                            blurRadius={30}>
                            <Image source={{uri: details.image_url }} style={styles.headerImage} />
                        </ImageBackground>
                        :
                        <Image source={Images.stationDetails} style={styles.headerImage} />
                        }
                       
                        <View style={styles.wishlist}>
                            <Icon name={"ios-navigate"} size={36}  color="#fff" onPress={this.navigate}  />
                        </View>
                        <View style={styles.titleContainer}>
                            <View style={styles.colLeft}>
                                <Text style={[styles.title, styles.bold]} numberOfLines={1}>{details.company_name}</Text>
                                {details.area != null  &&
                                <View style={[styles.row,styles.margin]}>
                                    <Icon name="ios-location" size={18} color="#5dda96"/>
                                    <Text style={[styles.text, styles.small]} numberOfLines={1}> {details.area}</Text>
                                </View>
                                }
                            </View>
                            <View style={styles.colRight}>
                                <Text style={[styles.text, styles.small]}>{'Power Rating: '+details.power_rating}</Text>
                            </View>
                        </View>
                        <View style={styles.bodyContainer}>
                            <TabView
                                navigationState={this.state}
                                renderScene={this._renderScene(this.state.details)}
                                renderTabBar={this._renderTabBar}
                                onIndexChange={this._handleIndexChange}
                            />
                        </View>
                    </SafeAreaView> :
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
  
export default connect(mapStateToProps,mapDispatchToProps)(ThirdPartyChargerDetails);