import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput, ActivityIndicator, Linking, Modal, Dimensions, Alert } from 'react-native'
//Library
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated from 'react-native-reanimated';
import ImageView from "react-native-image-viewing";
import { showMessage } from "react-native-flash-message";
import ImagePicker from 'react-native-image-crop-picker';
import axios from "axios";

//Api
import HttpRequest from "../../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
// import {  } from '../../Redux/Actions/Actions
import { bindActionCreators } from 'redux';
// Theme Colors
import COLORS from "../../../constants/colors";
import { Images } from '../../../constants';
import { strings } from "../../../utils/translations";
import { db } from "../../../utils/FirebaseConfig";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const images = [
    Images.img1, Images.img2,
];
var user=false;

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
// Retrieve initial screen's width
var screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

class tab1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            visible: false,
       
            
        }
    }
  
   
  

    navigateToWallet = () => {
        let { navigation } = this.props;
        //        console.log("navigate",navigation);
        navigation.navigate('Wallet');
    }

    navigateToWalletHistory = () => {
        let { navigation } = this.props;
        //        console.log("navigate",navigation);
        navigation.navigate('walletHistory');
    }

    navigateToCharging = () => {
        let { navigation } = this.props;
        //        console.log("navigate",navigation);
        navigation.navigate('ChargingHistory');
    }

    navigateToPreferences = () => {
        let { navigation } = this.props;
        //        console.log("navigate",navigation);
        navigation.navigate('Preferences');
    }
    Scanner = () => {
        let { navigation } = this.props;
        // console.log("navigate",navigation);
        navigation.navigate('scanner');
    }
    history = (data) => {
        let { navigation } = this.props;
        // console.log("navigate",navigation);
        navigation.navigate('LoyaltyHistory',{data});
    }

    rfidCardVIew = () => {
        let { navigation } = this.props;
        //  console.log("navigate",navigation);
        navigation.navigate('rfidCardView');
    }
    car = () => {
        let { navigation } = this.props;
        //  console.log("navigate",navigation);
        navigation.navigate('Carconnect');
    }
  


    render() {
        let { isLoading, filePath, image1, modalVisible,modalVisible1, dealer_no1,dealer_no, user_type,user_type1 } = this.state;
        let { navigation, data,types } = this.props;
         console.log('sdsd',user)
        // data  = {...data, image: images} // dummy images
        return (
          
            <ScrollView contentContainerStyle={[styles.container]}  showsVerticalScrollIndicator={false}>
         
                <View style={styles.row}>
                    <View style={styles.bodyContainer}>
                        <TouchableOpacity onPress={() => this.navigateToWallet()} style={styles.iconView}>
                            <View style={styles.iconContainer}>
                                <Image source={Images.price} style={styles.imageIcon} />
                            </View>
                            <Text style={styles.essentialsLabel}>{strings.charging.quick}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.navigateToWalletHistory} style={styles.iconView}>
                            <View style={styles.iconContainer}>
                                <Image source={Images.data} style={styles.imageIcon} />
                            </View>
                            <Text style={styles.essentialsLabel}>{strings.sidebar.walletHistory}</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <View style={styles.row}>
                    <TouchableOpacity onPress={this.navigateToCharging} style={styles.iconView}>
                        <View style={styles.iconContainer}>
                            <Image source={Images.chargingHistory} style={styles.imageIcon} />
                        </View>
                        <Text style={styles.essentialsLabel}>{strings.charging.available}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.rfidCardVIew} style={styles.iconView}>
                        <View style={styles.iconContainer}>
                            <Image source={Images.card} style={styles.imageIcon} />
                        </View>
                        <Text style={styles.essentialsLabel}>{strings.rfidView.subtitle}</Text>
                    </TouchableOpacity>
                </View>
                   
              
            </ScrollView>

        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        //height:40,
     maxHeight:screenHeight/2.8,
     flexDirection: 'column',
    //    margin: 0,
     marginHorizontal:10,
    //     // marginTop:0,
        borderRadius: 15,
         backgroundColor: COLORS.HEADER_BACKGROUND,
    //     justifyContent:'center',
    //     alignItems:'center'
    },
    container1: {
        flex: 1,
        // height:40,
//  maxHeight:screenHeight/2.8,
//  minHeight:0,
        flexDirection: 'column',
        marginHorizontal:10,
    //    margin: 0,
    //    marginLeft:10,
    //    marginRight:10,
    //    paddingTop:0,
    //    paddingBottom:0,
        // marginTop:0,
        borderRadius: 15,
        backgroundColor: COLORS.HEADER_BACKGROUND,
        justifyContent:'center',
        alignItems:'center'
    },
    carrow: {

        flex: 0.2,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30
    },
    carView: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    availabilityIconContainer: {
        position: 'relative',
        // top: '42%',
       
         alignSelf: 'center',
        marginTop:10,
       
    },
    carContainer: {

        width: 100,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 10,

    },
    signInButton: {
        width: screenWidth /2 ,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginBottom:30,
        marginTop: 15
    },
    imageStyle: {
        marginTop: 10,
        width: screenWidth - 90,
        height: 100,
        // margin: 5,
        //  marginTop:-50,
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    icons: {
        width: 40,
        height: 25,
        resizeMode: 'contain',
        flex: 0.2,
    },
    text: {
        fontSize: 14,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
        fontWeight: '600',
    },
    divider: {
        padding: 10,
        borderBottomColor: COLORS.DEFAULT,
        borderBottomWidth: 1
    },
    card: {

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        padding: 16,
        backgroundColor: COLORS.HEADER_BACKGROUND
    },
    IconButton: {
        position: 'relative',
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        borderRadius: 55 / 2,
    },
    // bodyContainer: {
    //     flex: 2,
    //     flexDirection: 'row',
    //     justifyContent: 'space-evenly',
    //     alignItems: 'center',
    //     marginVertical: 10,
    // },
    listContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginVertical: 10,
    },
    listView: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
    },
    inputContainer: {
        width: screenWidth /1.5,
        height: 50,
        flexDirection: 'row',
      alignSelf:'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop:10,
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.black,
        borderRadius: 10,
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        borderRadius: 30,
        alignSelf: 'center'
    },
    availableConnector: {
        fontSize: 18,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
        flexDirection: 'row',
        textAlign: 'right',
        marginHorizontal: 10
    },
    availableConnectorText: {
        fontSize: 16,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
        flex: 1.9,
        marginHorizontal: 10
    },
    iconView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {

        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        borderRadius: 20,

    },
    facilitiesContainer: {
        flex: 1,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 10,
        marginBottom: 10
    },
    imageIcon: {
        resizeMode: 'contain'
    },
    imageIcon2: {
        width: 40,
        height: 50,
        resizeMode: 'contain',
    },
    imageIcon1: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    icon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    label: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
        marginLeft: 80,
    },
    essentialsLabel: {
        fontSize: 17,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    basicButton: {
        flex: 0.5,
        alignItems: 'center',
        color: COLORS.BUTTON_TEXT,
        margin: 5,
        borderRadius: 20,
        padding: 8,
        backgroundColor: COLORS.DEFAULT
    },
    buttonText: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        color: COLORS.BUTTON_TEXT
    },
  
    LinearGradient: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    checkinText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    modalScrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalContainer: {
        margin: 30,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: COLORS.HEADER_BACKGROUND
    },
    formField: {
        width: screenWidth ,
        margin: 5
    },
    modalLabel: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        margin: 5,
        marginLeft: 15
    },
    modalHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#fff',
        padding: 10
    },
    headerTitle: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,

    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0
    },
    chargingPointItem: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.DEFAULT,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    IconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chargingPointContent: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginLeft: 5
    },
    chargingPointTitle: {
        fontSize: 16,
        fontFamily: "Poppins-medium",
        fontWeight: '600'
    },
    chargingPointDescription: {
        fontSize: 12,
        color: COLORS.INPUT_LABEL,
        fontFamily: "Poppins-medium",
        fontWeight: '500'
    },
})


const mapStateToProps = state => {

    return {
        info: state.info,
        token: state.token,
    };
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(tab1);