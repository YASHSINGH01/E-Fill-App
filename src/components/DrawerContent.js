import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Dimensions, DevSettings } from 'react-native'
//Libraries
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
    Title,
    Caption,
    Drawer,
    Text
} from "react-native-paper"
import { Avatar } from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../utils/authContext';
//Redux
import { connect } from 'react-redux';
import { userInfo, loginToken, subscribed, buycharger } from '../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
import AsyncStorage from "../utils/AsyncStorage";
//Constants
//Api
import HttpRequest from "../utils/HTTPRequest";
import { Images } from "../constants/";
//Theme Colors
import COLORS from "../constants/colors";
//Localization
import { strings } from "../utils/translations";
import { db } from "../utils/FirebaseConfig";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
class DrawerContent extends Component {

    static contextType = AuthContext
    constructor(props) {
        super(props);
        this.state = {

            profile_image: Images.userIcon,
            backgrounds: [
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
            tele: false,
            subscription: 0,
            dealer: 0,
            franss: 0,
            data: 0,
            user_contact: '',
            user_contact1: '',
            user_contact2: '',
            product_type_dealer2: '',
            product_type_dealer: '',
            product_type_dealer1: '',
            product_type_user:'',
            user_type: '',
            user_type1: '',
            user_type2: '',

        }
        // console.log("aaaa");
    }
    componentDidMount = () => {
        this.store();
        this.userprofile();
        this.dealerstore();
        // this.checkImageURL('https://cms.efillelectric.com'+this.props.info.avatar_url);
        this.getRandomBackground();

        this._unsubscribe = this.props.navigation.addListener('onFocus', () => {

            //  this.userprofile();

        });
    }

    componentWillUnmount() {
        this._unsubscribe();
        // this._checkNotificationCount();
    }
    userprofile = () => {
        let { props } = this;
        // console.log('userinfo',props.info.phone);

        db.ref('/EFILLXOCPP16JV3' + '/' + props.info.phone + '/ProductOrder/').orderByChild("user_contact").on('value', snapshot => {
            // console.log('Status Notification Snapshot Value0:', snapshot.val());
            if (snapshot.val() != null) {
                let first_key = Object.keys(snapshot.val())[0];
                let user_number = snapshot.val()[first_key]['user_contact'];
                let product_type_user = snapshot.val()[first_key]['product_type'];
                this.setState({ user_contact: user_number, product_type_user: product_type_user, user_type: "user" });
                console.log('Status Notification Snapshot Value0:', snapshot.val());
                // this.dealerstore();   
            }
            // console.log('Status not Snapshot Value:', snapshot.val());
            // HttpRequest.UserInfo(this.props.token)
            //   .then(res => {
            //     AsyncStorage.getDealer_pass_key().then(result => {
            //         console.log('dealer', result);
            //        if (result != null && result != '') {
            //            console.log('toggle1', result);
            //            this.setState({dealer:result})
            //        }

            //    });
            //     const result = res.data;
            //     if (res.status == 200 && !result.error) {
            //          console.log('ins',result.detail);
            //       this.setState({ wallet:result.detail.user_wallet_balance});
            //     } else {
            //       this.setState({ refreshing: false });
            //       console.log("User Profile API Error : ", result);
            //     }
            //   })
            //   .catch(err => {
            //     this.setState({ isLoading: false, refreshing: false });
            //     console.log("User Profile API Catch Exception: ", err);
            //     showMessage({
            //       message: strings.error.title,
            //       description: strings.error.message,
            //       type: "danger",
            //     });
            //   });
        });
        db.ref('/EFILLXOCPP16JV3' + '/' + props.info.phone + '/Dealer/').orderByChild("user_contact").on('value', snapshot => {
            // console.log('Status Notification Snapshot Value1:', snapshot.val());
            if (snapshot.val() != null) {
                let first_key = Object.keys(snapshot.val())[0];
                let user_number = snapshot.val()[first_key]['user_contact'];
                let product_type_dealer = snapshot.val()[first_key]['product_type'];
                this.setState({ user_contact: user_number, product_type_dealer: product_type_dealer, user_type: "Dealer" });
                console.log('Status Notification Snapshot Value1:', snapshot.val()[first_key]['user_contact']);
                // this.dealerstore();   
            }
            // console.log('Status not Snapshot Value JV3:', snapshot.val());
        });

        //franchise
        db.ref('/EFILLXOCPP16JV4' + '/' + props.info.phone + '/Franchisee/').orderByChild("user_contact").on('value', snapshot => {
            // console.log('Status Notification Snapshot Value2:', snapshot.val());
            if (snapshot.val() != null) {
                let first_key = Object.keys(snapshot.val())[0];
                let user_number = snapshot.val()[first_key]['user_contact'];
                let product_type_dealer = snapshot.val()[first_key]['product_type'];
                this.setState({ user_contact1: user_number, product_type_dealer1: product_type_dealer, user_type1: "Franchisee" });
                // console.log('Status Notification Snapshot Value2:', snapshot.val()[first_key]['user_contact']);
                // this.dealerstore();   
            }
            // console.log('Status not Snapshot Value of Jv4:', snapshot.val());
        });

        db.ref('/EFILLXOCPP16JV4' + '/' + props.info.phone + '/ProductOrder/').orderByChild("user_contact").on('value', snapshot => {
            // console.log('Status Notification Snapshot Value5:', snapshot.val());
            if (snapshot.val() != null) {
                let first_key = Object.keys(snapshot.val())[0];
                let user_number = snapshot.val()[first_key]['user_contact'];
                let product_type_dealer = snapshot.val()[first_key]['product_type'];
                this.setState({ user_contact2: user_number, product_type_user2: product_type_dealer, user_type2: "user" });
                // console.log('Status Notification Snapshot Value2:', snapshot.val()[first_key]['user_contact']);
                // this.dealerstore();   
            }
            // console.log('Status not Snapshot Value of Jv5:', snapshot.val());
        });
    }
    // componentWillUnmount() {
    //     this._unsubscribe();
    //     // this._checkNotificationCount();
    //   }
    signOut = async () => {
        try {
            await EncryptedStorage.removeItem("user_session");
        } catch (error) {
            console.log(error);
        }
        this.context.signOut();
        console.log("logout", this.context.signOut);
    }
    checkImageURL = (url) => {
        this.frannstore();
        this.dealerstore();
        this.store();
        fetch(url)
            .then(res => {
                if (res.status == 404) {
                    this.setState({ profile_image: Images.userIcon });
                } else {
                    this.setState({ profile_image: { uri: res.url } });
                }
            })
            .catch(err => {
                this.setState({ profile_image: Images.userIcon });
            });
    }
    frannstore = async () => {
        this.props.navigation.addListener('focus', () => {
            AsyncStorage.getFranchise_passkey().then(result => {
                console.log('toggle', result);
                if (result != null && result != '') {
                    console.log('toggle1', result);
                    this.setState({ franss: result })
                }

            });
        });


    }

    dealerstore = () => {

        // this.props.navigation.addListener('onFocus', () => {
        AsyncStorage.getDealer_pass_key().then(result => {
            console.log('dealer', result);
            if (result != null && result != '') {
                console.log('toggle1', result);
                this.setState({ dealer: result })
            }

        });



    }


    store = () => {
        // console.log('toggle'); 
        this.props.navigation.addListener('focus', () => {
            AsyncStorage.getSubScription().then(val => {
                // console.log('toggle', val);
                if (val != null && val != '') {
                    // console.log('toggle1', val);

                    this.setState({
                        subscription: val
                    })
                }

            });
        });


    }


    onError(error) {
        this.setState({ profile_image: Images.userIcon })
    }

    getInitials = (name) => {
        let initials = name.split('');

        if (initials.length > 1) {
            initials = initials.shift().charAt(0) + initials.pop().charAt(0);
        } else {
            initials = name.substring(0, 2);
        }

        return initials.toUpperCase();
    }

    getRandomBackground = (name) => {
        let { currentBackground, backgrounds } = this.state;
        // Make it work for associative array
        let random = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        if (random != currentBackground) {
            this.setState({
                currentBackground: random
            });
        }
        // console.log('randd');
    }


    render() {
        let { props } = this;
        let { profile_image, currentBackground, tele, user_type,user_type2,user_type1, product_type_user, product_type_user2,franss,user_contact2, user_contact,user_contact1, product_type_dealer,product_type_dealer1 } = this.state;
        //    console.log('drawer',props);
        return (
            <View style={styles.drawerContainer}>
                <DrawerContentScrollView {...props} >
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View>
                                <View style={styles.userInfoContainer}>
                                    {/* <Avatar.Image
                                source={Images.userIcon}
                                size={100}
                                style={{ resizeMode: 'contain', backgroundColor: '#113C60'}}
                            /> */}
                                    <View style={[styles.roww, styles.chargingStationDetailsContainer]}>
                                        <Image source={Images.user} style={styles.image} />
                                    </View>
                                    {/* <Avatar.Image
                                source={ profile_image }
                                size={80}
                                onError={ this.onError.bind(this) }
                            /> */}
                                    <View style={styles.headerInfo}>
                                        <Title style={styles.title}>{props.info.id != "38" ? props.info.name : 'Anonymous User'}</Title>
                                        <Caption style={styles.caption}>{props.info.id != "38" ? props.info.phone : props.info.phone.replace(/^.{1,10}/, m => "X".repeat(m.length))}</Caption>
                                    </View>
                                </View>
                            </View>
                            {/*  { props.info.id != "38" ?
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('MyProfile')}>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.section}>
                                    <Text style={styles.buttonCaption}>{strings.sidebar.viewProfile}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View> : null }*/}
                        </View>

                        <Drawer.Section style={styles.drawerSection}>
                            {user_contact == props.info.phone && user_type == "user" && product_type_user == "EV"?
                             <DrawerItem
                             icon={() => (
                                 <Image source={Images.profile} style={styles.icon} />

                             )}

                             label={strings.sidebar.user}
                             labelStyle={styles.label}
                             style={[styles.drawerItem, styles.chargerDrawerSection]}
                             onPress={() => { props.navigation.navigate('UserOrders',{user:"EV"}) }}
                         />:
                              null

                               
                               
                            }
                            {user_contact == props.info.phone && user_type == "user" && product_type_user == "Charger"?
                             <DrawerItem
                             icon={() => (
                                 <Image source={Images.profile} style={styles.icon} />

                             )}

                             label={strings.sidebar.user}
                             labelStyle={styles.label}
                             style={[styles.drawerItem, styles.chargerDrawerSection]}
                             onPress={() => { props.navigation.navigate('UserOrders',{user:"EV"}) }}
                         />:
                               null

                               
                               
                            }


                            {user_contact == props.info.phone && user_type == "Dealer" && product_type_dealer=="EV"?
                                <DrawerItem
                                    icon={() => (
                                        <Image source={Images.profile} style={styles.icon} />

                                    )}
                                    label={strings.dmc.title}
                                    labelStyle={styles.label}
                                    style={[styles.drawerItem, styles.chargerDrawerSection]}
                                    onPress={() => { props.navigation.navigate('Dealers') }}
                                />
                                :null}

                            {/* {user_contact == props.info.phone && user_type == "Dealer" && product_type_dealer=="Charger"?
                                <DrawerItem
                                    icon={() => (
                                        <Image source={Images.profile} style={styles.icon} />

                                    )}
                                    label={strings.francisee.title}
                                labelStyle={styles.label}
                                style={[styles.drawerItem, styles.chargerDrawerSection]}
                                onPress={() => { props.navigation.navigate('Frann') }}
                                />
                                :null} */}
                                {user_contact2 == props.info.phone && user_type2 == "user" && product_type_user2 =="Charger"?
                                <DrawerItem
                                    icon={() => (
                                        <Image source={Images.profile} style={styles.icon} />

                                    )}
                                    label={strings.sidebar.user1}
                                labelStyle={styles.label}
                                style={[styles.drawerItem, styles.chargerDrawerSection]}
                                onPress={() => { props.navigation.navigate('UserOrders',{user:"charger"}) }}
                                />
                                :null}

                                  {user_contact1 == props.info.phone && user_type1 == "Franchisee" && product_type_dealer1 =="Charger"?
                                <DrawerItem
                                    icon={() => (
                                        <Image source={Images.profile} style={styles.icon} />

                                    )}
                                    label={strings.francisee.title}
                                labelStyle={styles.label}
                                style={[styles.drawerItem, styles.chargerDrawerSection]}
                                onPress={() => { props.navigation.navigate('Frann') }}
                                />
                                :null}
                            {/*   { props.info.id != "38" &&
                                            <DrawerItem
                                                icon={() => (
                                                    <Image source={Images.profile} style={styles.icon} />
                                                )}
                                                label={strings.profile.title}
                                                labelStyle={styles.label}
                                                style={styles.drawerItem}
                                                onPress={() => {props.navigation.navigate('MyProfile')}}
                                            /> }*/}


                            <DrawerItem
                                icon={() => (
                                    <Image source={Images.chargingStation} style={styles.icon} />

                                )}

                                label={strings.sidebar.chargingStation}
                                labelStyle={styles.label}
                                style={styles.drawerItem}
                                onPress={() => { props.navigation.navigate('ChargingStations') }}
                            />

                            {/*  { props.info.id != "38" &&
                                                <DrawerItem
                                                    icon={() => (
                                                        <Image source={Images.chargingHistory} style={styles.icon} />
                                                    )}
                                                    label={strings.sidebar.chargingHistory}
                                                    labelStyle={styles.label}
                                                    style={styles.drawerItem}
                                                    onPress={() => {props.navigation.navigate('ChargingHistory')}}
                                                /> }
                                   { props.info.id != "38" &&
                                                           <DrawerItem
                                                               icon={() => (
                                                                   <Image source={Images.orderHistory} style={styles.icon} />
                                                               )}
                                                               label={strings.sidebar.orderHistory}
                                                               labelStyle={styles.label}
                                                               style={styles.drawerItem}
                                                               onPress={() => {props.navigation.navigate('OrderHistory')}}
                                                           /> }

                                             { props.info.id != "38" &&
                                                <DrawerItem
                                                    icon={() => (
                                                        <Image source={Images.price} style={styles.icon} />
                                                    )}
                                                    label={strings.sidebar.wallet}
                                                    labelStyle={styles.label}
                                                    style={styles.drawerItem}
                                                    onPress={() => {props.navigation.navigate('Wallet')}}
                                                /> }*/}
                            {/*  { props.info.id != "38" &&
                                              <DrawerItem
                                                  icon={() => (
                                                      <Image source={Images.price} style={styles.icon} />
                                                  )}
                                                  label={strings.sidebar.credithistory}
                                                  labelStyle={styles.label}
                                                  style={styles.drawerItem}
                                                  onPress={() => {props.navigation.navigate('walletHistory')}}
                                              /> }*/}
                            <DrawerItem
                                icon={() => (
                                    <Image source={Images.chargingStation} style={styles.icon} />
                                )}
                                label={strings.sidebar.favoriteStations}
                                labelStyle={styles.label}
                                style={styles.drawerItem}
                                onPress={() => { props.navigation.navigate('FavouriteChargingStations') }}
                            />

                            {franss != 0 ?
                                <DrawerItem
                                    icon={() => (
                                        <Image source={Images.chargers} style={styles.icon} />
                                    )}
                                    label={strings.sidebar.frann}
                                    labelStyle={styles.label}
                                    style={[styles.drawerItem, styles.chargerDrawerSection]}
                                    onPress={() => { props.navigation.navigate('Frann') }}
                                />
                                : null
                            }

                            {/* { props.info.id != "38" &&
                        <DrawerItem 
                            icon={() => (
                                <Image source={Images.orderHistory} style={styles.icon} />
                            )}
                            label={strings.sidebar.listCharger}
                            labelStyle={styles.label}
                            style={styles.drawerItem}
                            onPress={() => {props.navigation.navigate('ListCharger')}}
                        /> }*/}
                            {/*    { props.info.id != "38" &&
                        <DrawerItem 
                            icon={() => (
                                <Image source={Images.orderHistory} style={styles.icon} />
                            )}
                            label={strings.sidebar.thirdPartyCharger}
                            labelStyle={styles.label}
                            style={styles.drawerItem}
                            onPress={() => {props.navigation.navigate('ThirdPartyCharger')}}
                        /> }*/}

                            <DrawerItem
                                icon={() => (
                                    <Image source={Images.email} style={styles.icon} />
                                )}
                                label={strings.contactus.title}
                                labelStyle={styles.label}
                                style={styles.drawerItem}
                                onPress={() => { props.navigation.navigate('ContactUs') }}
                            />
                            {/* <DrawerItem 
                            icon={() => (
                                <Image source={Images.faq} style={styles.icon} />
                            )}
                            label={strings.sidebar.faq}
                            labelStyle={styles.label}
                            style={styles.drawerItem}
                            onPress={() => {props.navigation.navigate('Faq')}}
                        /> */}
                            <DrawerItem
                                icon={() => (
                                    <Image source={Images.legalDocuments} style={styles.icon} />
                                )}
                                label={strings.sidebar.legalDocuments}
                                labelStyle={styles.label}
                                style={styles.drawerItem}

                                onPress={() => { props.navigation.navigate('LegalDocument') }}
                            />

                            <DrawerItem
                                icon={() => (
                                    <Image source={Images.preferences} style={styles.icon} />
                                )}
                                label={strings.preferences.title}
                                labelStyle={styles.label}
                                style={styles.drawerItem}
                                onPress={() => { props.navigation.navigate('Preferences') }}
                            />


                        </Drawer.Section>

                    </View>
                </DrawerContentScrollView>
                {/* Logout */}
                <Text style={[{color: COLORS.DEFAULT,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: "Poppins-Regular",
        width: 200,textAlign:'center',marginLeft:30}]}>App Version 4.1</Text>
                {props.info.id != "38" &&
                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="exit-to-app"
                                    color={'#fff'}
                                    size={size}
                                />
                            )}
                            label={strings.sidebar.logout}
                            labelStyle={styles.label}
                            onPress={() => { this.signOut() }}
                        />
                    </Drawer.Section>
                }
            </View>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: COLORS.PRIMARY
    },
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        // paddingLeft: 20,
    },
    userInfoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    headerInfo: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        fontSize: 20,
        fontFamily: "Poppins-Regular",
        marginTop: 10,
        fontWeight: '600',
        color: COLORS.DEFAULT
    },
    buttonCaption: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: "Poppins-Regular",
        color: COLORS.PRIMARY
    },
    caption: {
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    roww: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    section: {
        width: screenWidth * 1 / 2,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        justifyContent: 'center',
        borderRadius: 30,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
        color: COLORS.DEFAULT
    },
    drawerSection: {
        marginTop: 0,
        marginHorizontal: 10,
    },
    bottomDrawerSection: {
        height:60,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    chargerDrawerSection: {
        borderTopColor: '#f4f4f4',
        borderBottomColor: '#f4f4f4',
        borderRightColor: '#f4f4f4',
        borderLeftColor: '#f4f4f4',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    drawerItem: {
        flex: 2,
        justifyContent: 'center',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        maxHeight: 50,
        //            alignItems: 'flex-start',
        // borderBottomColor: COLORS.DEFAULT,
        // borderBottomWidth: 1,
        overflow: 'hidden'
    },
    drawerItemLast: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'hidden',
    },
    icon: {
        width: 30,
        resizeMode: 'contain',
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        borderRadius: 40
    },
    chargingStationDetailsContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: COLORS.DEFAULT,
        fontSize: 16,
        fontWeight: '400',
        fontFamily: "Poppins-Regular",
        width: 200,
    },

});