TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity,StyleSheet, Dimensions, Modal,RefreshControl,ScrollView, TextInput,Animated, ActivityIndicator } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage, hideMessage } from "react-native-flash-message";
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Components
import Header from '../components/Header';

//Api
import HttpRequest from "../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { orderID, orderAmount, couponStatus, couponApplied } from '../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Constants
 import { Images } from "../constants/";

import { strings } from "../utils/translations";
// Theme Colors
import COLORS from "../constants/colors";

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

class CouponPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            couponsData: '',
            coupon_applied:"",
            modalVisible: false,
            refreshing: false,
            count: 0,
        };
    }

    componentDidMount = () => {   
        this._checkData = this.props.navigation.addListener("focus", () => {
            this.setState({coupon_applied:""})
            });       
        // this.getCoupons();
        this.setState({ isLoading: false });
    }

    componentWillUnmount() {
        this._checkData();
    }

    toggleModal(visible,error) {
        
        this.setState({ modalVisible: visible});
        
    }
    closemodel()
    {
       this.setState({ modalVisible:false});
       
    }
   
    // Get All Coupons Through Api
    getCoupons = () => {
        HttpRequest.getCoupons(this.props.token)
        .then(res => {
            this.setState({ isLoading: false });
            const result = res.data;
            if (res.status == 200 && !result.error) {
                // console.log("Get All Coupons API Response ---------- ", result, 'Length:', result.coupon.length);
                this.setState({ couponsData:  result.coupon, count: result.coupon.length, refreshing: false});
            } else {
                console.log("Get All Coupons API Error : ",result);
                // showMessage({
                //    message: strings.error.title,
                //     description: result.message != undefined ? result.message : result.status,
                //     type: "danger",
                // });
            }
        })
        .catch(err => {
            this.setState({ isLoading: false });
            console.log("Get All Coupons API Catch Exception: ",err);
            // showMessage({
            //    message: strings.error.title,
            //     description: strings.error.message
            //     type: "danger",
            // });
        });
    }
    closeCallout = () => {
     this.props.closeCallout();
        // this.props.cart();
        // this.props.couponApplied('');
      
    }
    
   
datacode=()=>{
    let {coupon_applied}=this.state;
    let{item}=this.props.route.params;
    console.log('ddd',coupon_applied);
   
    // this.props.couponApplied(coupon_applied);
    // this.props.navigation.dispatch(
                      
    //     CommonActions.reset({
    //         index: 1,
    //         routes: [
    //             { name: 'Home' },
    //             {
                    
    //                 name: 'booking',
    //                 params: {coupon:coupon_applied,item},
    //             },
    //         ],
    //     })
    // );
    
      this.props.navigation.navigate("booking", {coupon:coupon_applied,item });
    // this.props.navigation.goBack();
}

    onRefresh = () => {
        this.setState({ refreshing : true})
        // this.getCoupons();
    }


    renderItem = ({ item, index }) => (
        <View style={styles.item}>
            <View style={styles.content}>
                {/* Title */}
                <View style={styles.couponHeader}>
                    <View style={styles.row}>
                        <Text style={[styles.text, styles.title]}>{strings.coupon.label}</Text>
                        <Text style={[styles.text, styles.code]}> {item.code}</Text>
                    </View>
                    <TouchableOpacity onPress={()=> this.applySpecificCoupon(item) } style={styles.changeButton}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.changeGradient}>
                            <Text style={[styles.changeText,  {color:'#05294b'}]}> {strings.coupon.apply}</Text>
                        </LinearGradient>
                    </TouchableOpacity>  
                </View>
                {/* Desctiption */}
                <Text style={[styles.text,styles.description]}>{item.description}</Text>

               
            </View>
        </View>
        // this.applySpecificCoupon(item.id)
    );

    render() {
        let { navigation } =  this.props;
        let { isLoading, couponsData, count,refreshing,modalVisible, coupon_applied} = this.state;
 console.log('thissss',this.state.coupon_applied);
        return (
         
            <View style={styles.container}>
                <View style={styles.header}>
                 <Header navigation={navigation} type={strings.coupon.title}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                  <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={styles.scrollView}>
                  <Image source={Images.coupon} style={styles.image}/>
                  {/* <Text style={styles.label}>ENTER THE COUPON CODE</Text> */}
                    <View >
                        
                        <View style={styles.inputContainer}>
                            <TextInput
                              style={styles.inputText}
                              autoCompleteType='off'
                              autoCapitalize='none'
                              placeholderTextColor="#C0C0C0"
                              autoCorrect={false}
                            placeholder='Enter the Coupon Code'
                              returnKeyType='done'
                              enablesReturnKeyAutomatically={true}
                             value={coupon_applied}
                             onChangeText={(text)=>this.setState({coupon_applied:text})}
                            />
                        </View>
                        
                    </View>
                    
                    <TouchableOpacity onPress={!isLoading ? this.datacode : null }>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                          { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                            <Text style={styles.buttonText}>Submit</Text>
                          } 
                        </LinearGradient>
                    </TouchableOpacity>
                    
                    </KeyboardAwareScrollView>
                </Animatable.View>
            </View>
         )
    }
}

// import { StyleSheet, Dimensions } from "react-native";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: COLORS.PRIMARY,
      zIndex: 9999,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    onBoardImage: {
        width: screenHeight * 0.5,
        height: screenHeight * 0.2,
        resizeMode:'contain'
    },
    footer: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '10%'
    },
    title: {
        color: COLORS.DEFAULT,
        fontSize: 38,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        lineHeight: 40,
    },
    image: {
        width: 120,
        height: 150,
        resizeMode: 'contain',
        borderRadius: 40,
        marginBottom:30
    },
    text: {
        color: COLORS.DEFAULT,
        fontSize: 12,
        fontFamily: "Poppins-medium",
        textAlign: 'center',
        marginTop: 20
    }, 
    button: {
        width: screenWidth - 40 ,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 0
    },
    buttonText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    formField: {
        width: screenWidth - 40 ,
    },
    label: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        margin: 5,
        marginLeft: 15
    },
    inputContainer: {
        width: screenWidth /1.5 ,
        height: 45, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: COLORS.HEADER_BACKGROUND,
        color: COLORS.black,
        borderRadius: 5,
    },
    inputText: {
        flex:1,
        height:'100%',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: "#fff",
        marginLeft: '2%'
    },
    error: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        marginLeft: 15,
        padding: 5,
        color: '#ff0000',
    },
    signInButton: {
        width: screenWidth /1.5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 10
    },
    signIn: {
       width: 70,
       height: 70,
       justifyContent: 'center', 
       alignItems: 'center',
       borderRadius: 70/2,
    },
    backIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    textSign: {
        color: COLORS.DEFAULT,
        fontWeight: 'bold',
        margin: 5
    },
    infoText: {
        fontSize: 10,
        alignSelf: 'center',
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        marginTop: 50,
        textAlign: 'center',
        lineHeight: 22
    }
});

const mapStateToProps = state => {
    
    return {
        info: state.info,
        token: state.token,
        order_id: state.order_id,
        order_amount: state.order_amount,
        coupon_status: state.coupon_status,
        coupon_applied: state.coupon_applied
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        orderID: bindActionCreators(orderID, dispatch),
        orderAmount: bindActionCreators(orderAmount, dispatch),
        couponStatus: bindActionCreators(couponStatus, dispatch),
        couponApplied: bindActionCreators(couponApplied, dispatch)
    };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(CouponPage);
