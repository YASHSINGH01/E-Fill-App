TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image,  Share,TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Avatar } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import {
    useTheme,
    Title, 
    Caption,
    Drawer
} from "react-native-paper";
//Components
import Header from '../../components/Header';
//Constants
import { Images } from "../../constants/";

//Redux
import { connect } from 'react-redux';
import { userInfo, loginToken } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
import { db } from "../../utils/FirebaseConfig";

import { strings } from '../../utils/translations';
import HttpRequest from "../../utils/HTTPRequest";
//Styles
import styles from './styles';
//Tab View
import Tab1 from "./tabView/tab1";

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}
var d="";
class myProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            profileData: [],
            refreshing: false,
            user_wallet_balance: '',
            referral_code:'',
            profile_image: Images.userIcon,
            index: 0,
             status: 0,
             userinfo:'',
             user_type: '',
             user_type1:'',
             points:0,
             points1:0,
            routes: [
            { key: 'first', title: strings.profile.viewProfile},
         //   { key: 'second', title: strings.profile.resetPassword },
           // { key: 'third', title: strings.profile.vehicleDetails },
            ],
            backgrounds : [
                '#f44336',
                '#E91E63',
                '#9C27B0',
                '#673AB7',
                '#3F51B5',
                '#2196F3',
                '#03A9F4',
                '#00BCD4',
                '#009688',
                '#4CAF50',
                '#8BC34A',
                '#CDDC39',
                '#FFC107',
                '#FF9800',
                '#FF5722',
            ],
            currentBackground: '#00BCD4',

        };
    }

    componentDidMount = () => {
    

        this.checkImageURL('https://cms.efillelectric.com'+this.props.info.avatar_url);
        this.getRandomBackground();
        this.userprofile();
        this.walletOrder();
          let { navigation } = this.props;
                this._unsubscribe = navigation.addListener('focus', () => {
this.userprofile();

                    this.walletOrder();
                });
            }

            componentWillUnmount() {
                this._unsubscribe();
                this.userprofile()
                // this.walletOrder();
            }


userprofile=()=>{
   
     let{userinfo}=this.state;
 HttpRequest.UserInfo(this.props.token)
    .then(res => {
      const result = res.data;
    //   console.log("Response ---------- ", result);
      if (res.status == 200 && !result.error) {
        this.setState({ userinfo: result.detail });
        //  console.log("Response2 ---------- ", this.state.userinfo);
      } else {
        this.setState({ refreshing: false });
        console.log("User Profile API Error : ", result);
        //                            showMessage({
        //                               message: strings.error.title,
        //                                description: result.message != undefined ? result.message : result.status,
        //                                type: "danger",
        //                            });
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


    getProfile = () => {
        this.setState({ isLoading: true });
        setTimeout( () => { 
          this.setState({
            isLoading: false
          })
       }, 1000);
       
    };

 onShare = async () => {
    let{referral_code}=this.state;
    var dc="09begh";
    console.log("Hi,"+referral_code+"dsds","reff");
    
    let av="Hi, "+referral_code+" is my referal code.You can install this app using  link below, and we both can earn credits. \n https://apps.apple.com/in/app/e-fill/id1565499471";
                try {
                    
                    const result = await Share.share({
                        title: 'Share Referal code with your friends to get',
                        message: av
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


    onRefresh = () => {
        this.setState({ refreshing : true})
    
        wait(2000).then(() => this.setState({ refreshing : false}));
    }

    _handleIndexChange = index => this.setState({ index });

    _renderTabBar = props => {
      return (
        <View style={styles.tabBar}>
         {/* {props.navigationState.routes.map((route, i) => {
            return (
                this.state.index == i ?
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} key={i+''} colors={['#A4FF8B', '#22BC9D']} style={styles.tabItem}  key={i}>
                   <TouchableOpacity
                        onPress={() => this.setState({ index: i })} >
                        <Animated.Text style={styles.headerText} adjustsFontSizeToFit numberOfLines={1}>{route.title}</Animated.Text>
                    </TouchableOpacity>
                </LinearGradient> :
                <TouchableOpacity
                        style={styles.tabItem}
                        key={i}
                        onPress={() => this.setState({ index: i })} >
                        <Animated.Text style={styles.headerText} adjustsFontSizeToFit numberOfLines={1}>{route.title}</Animated.Text>
                </TouchableOpacity>
            );
          })}*/}
        </View>
      );
    };
  
    _renderScene = SceneMap({
      first: () => <Tab1 navigation={this.props.navigation} data={this.props} types={this.state.points}/>,
    //   second: () => <Tab2 navigation={this.props.navigation} data={this.props} types={this.props}/>,
    //   third: () => <Tab3 navigation={this.props.navigation} data={this.props} types={this.props}/>
    });

    checkImageURL = (url) => {
        fetch(url)
           .then(res => {
            if(res.status == 404){
                this.setState({ profile_image: Images.userIcon});
            }else{
                this.setState({ profile_image: { uri: res.url }});
            }
        })
        .catch(err=>{
            this.setState({ profile_image: Images.userIcon});
        });
    }

    onError(error){
        this.setState({ profile_image: Images.userIcon})
    }

    getInitials = (name) => {
        let initials = name.split(' ');
        
        if(initials.length > 1) {
          initials = initials.shift().charAt(0) + initials.pop().charAt(0);
        } else {
          initials = name.substring(0, 2);
        }
        
        return initials.toUpperCase();
    }

    getRandomBackground = (name) => {
        let { currentBackground, backgrounds} = this.state;
        // Make it work for associative array
        let random = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        if(random != currentBackground) {
            this.setState({
                currentBackground: random
            });
        }
    }

     //Create Wallet order through API
       walletOrder = () => {
              HttpRequest.walletOrder(this.props.token)
                  .then(res => {

                      const result = res.data;
                      if (res.status == 200 && !result.error) {
                    //   console.log("wallet",result);
                          this.setState({ user_wallet_balance: result.balance, referral_code:result.referral_code });

                      } else {
                          console.log("Wallet Updation Error : ", result);

                      }
                  })
                  .catch(err => {
                      this.setState({ isLoading: false });
                      console.log("walletOrder API Catch Exception: ", err);
                      showMessage({
                          message: strings.error.title,
                          description: strings.error.message,
                          type: "danger",
                      });
                  });
          }
          



    
    render() {
        let { navigation, info } =  this.props;
        let { isLoading, profile_image, user_type,status,points ,points1,user_type1, userinfo,referral_code} = this.state;
        //  console.log(this.state,"props");
        let { props } = this;
        // let { name } = this.props.info;
         console.log(this.state.user_type1,"profile");
        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.profile.title}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                {/* <ScrollView
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={[1]} 
                    > */}
                    <View style={styles.headerContainer}>
                        {/* <Avatar.Image 
                            source={ profile_image }
                            onError={ this.onError.bind(this) }
                        /> */}
                         {/* <View style={styles.share}>
                                    <TouchableOpacity onPress={this.onShare}>
                                        <Image source={Images.share} style={styles.imageIcon} />
                                    </TouchableOpacity>
                                </View> */}
                         <View style={[styles.roww, styles.chargingStationDetailsContainer]}>
                          <Image source={Images.user} style={styles.image}/>
                         </View>
                        <View style={styles.headerTextContainer}>
                            <Title style={styles.title}>{ props.info.id != "38" ? userinfo.name : strings.profile.anonymous}</Title>
                            <Caption style={styles.caption}>{props.info.id != "38" ?userinfo.phone : props.info.phone.replace(/^.{1,10}/, m=> "X".repeat(m.length))}</Caption>
                        </View>
                 {/* { Wallet Balance} */}
                                 <View style={styles.headerTextContainer}>
                                   <Text style={styles.credit}>{"E-Fill Credit : "+this.state.user_wallet_balance}</Text>
                               </View>
                             
                       </View>
                    <View style={styles.bodyContainer}>
                        <TabView
                            navigationState={this.state}
                            renderScene={this._renderScene}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                    </View>
                    
                    {/* </ScrollView> */}
                </Animatable.View>
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
        loginToken: bindActionCreators(loginToken , dispatch),
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(myProfile);
