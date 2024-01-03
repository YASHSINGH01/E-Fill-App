TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Modal,StyleSheet, Dimensions ,ScrollView, TextInput,Alert, ActivityIndicator } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage, hideMessage } from "react-native-flash-message";
import LinearGradient from 'react-native-linear-gradient';

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
import ImagePicker from 'react-native-image-crop-picker';
import COLORS from "../constants/colors";
//Styles
// import styles from './styles';
import { strings } from "../utils/translations";


const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

class Documents extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            couponsData: '',
            coupon:"",
            filePath: "",
            image1:"",
            modalVisible: false,
            refreshing: false,
            count: 0,
        };
    }

    // componentDidMount = () => {           
    //     this.getCoupons();
       
    // }
    toggleModal(visible,error) {
        
        this.setState({ modalVisible: visible});
        
    }
    closemodel()
    {
       this.setState({ modalVisible:false});
       
    }
   
   
    closeCallout = () => {
     this.props.closeCallout();
        // this.props.cart();
        // this.props.couponApplied('');
      
    }
    closeCallout1 = () => {
        // this.props.couponApplied(this.state.coupon);
        // console.log('coypon',this.props.couponApplied());
      
      this.props.upload(this.state.filePath);
    //   console.log('cart',this.props.cart);
    //  this.props.couponApplied("");
    //  console.log('cohfhn',this.props.couponApplied())
        

         this.props.closeCallout();
       }
       Scanner() {
        Alert.alert(
          'Choose Options',
          '',
          [
            {
              text: 'Cancel',
              style:'cancel',
              onPress:()=> console.log('cancel'),
            },
            
            {
              text: 'Camera',
              onPress: () => this.camera(),
            },
            
            {
              text: 'Gallery',
              onPress: () => this.gallery(),
            },
           
          ],
          { cancelable: false }
        );
    
        // let options = {
        //   title: 'Select Image',
        //   base64: true,
        //   customButtons: [
        //     {
        //       name: 'customOptionKey',
        //       title: 'Choose Photo from Custom Option'
        //     },
        //   ],
        //   storageOptions: {
        //     skipBackup: true,
        //     path: 'images',
        //   },
    
        // };
    
        // // const result = await launchImageLibrary(cameraType);
        // ImagePicker.showImagePicker(options, (response) => {
        //   console.log('Response = ', response);
    
        //   if (response.didCancel) {
        //     console.log('User cancelled image picker');
        //   } else if (response.error) {
        //     console.log('ImagePicker Error: ', response.error);
        //   } else if (response.customButton) {
        //     console.log(
        //       'User tapped custom button: ',
        //       response.customButton
    
        //     );
        //     alert(response.customButton);
        //   } else {
        //     let source = response;
        //     // You can also display the image using data:
        //     // let source = {
        //     //   uri: 'data:image/jpeg;base64,' + response.data
        //     // };
        //     this.setState({ filePath: source });
        //     console.log("filepath", this.state.filePath.uri);
        //   }
        // });
    
      }
      gallery(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            includeBase64:true,
            cropping: true
          }).then(image => {
            // console.log('image',image.path)
            this.setState({image1:image.path});
            this.setState({ filePath: image.data });
            // console.log('image11',this.state.filePath)
          });
    }
    camera(){
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            includeBase64:true,
            cropping: true
          }).then(image => {
            // console.log('image',image.path)
            this.setState({image1:image.path});
            this.setState({ filePath: image.data });
            // console.log('image11',this.state.filePath)
          });
    }

    onRefresh = () => {
        this.setState({ refreshing : true})
        // this.getCoupons();
    }


    render() {
        let { navigation } =  this.props;
        let { isLoading, couponsData, filePath,image1,modalVisible, coupon} = this.state;
//  console.log('thissss',this.props.couponApplied());
        return (
            <Modal transparent={true} 
            style={{  justifyContent: 'center',
            alignItems: 'center'}} >
                 <ScrollView  showsVerticalScrollIndicator={false}
                 contentContainerStyle={{flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',}} >
            <View style={styles.container}>
           
                <TouchableOpacity style={styles.iconContainer} onPress={this.closeCallout}>
                    <Icon name="ios-close-circle" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.content}>
                    <View style={[styles.row, styles.header, styles.marginHorizontal]}>

                        <Text style={[styles.text, styles.bold, styles.h1]} numberOfLines={1}>Upload Document</Text>
                    </View>
                    <View style={[styles.row, styles.body]}>
                        {/* <View style={styles.column}> */}
                            {/*<Text style={[styles.text, styles.points, {paddingTop: 10, paddingBottom: 10}]}>{status == 0 ? strings.home.deActivated : status == 1 ? strings.home.available : status == 2 ? strings.home.currentlyBusy : status == 3 ? strings.home.notConnected : strings.home.notConnected }</Text>*/}
                            <View style={styles.listContainer}>
                                
                                    {/* <View style={styles.listView} >
                                        <Text style={styles.availableConnectorText}>Enter your Coupon Code</Text>

                                       
                                    </View> */}
                                   {filePath != '' ?
              <Image
                source={{ uri: image1 }}
                style={styles.imageStyle}
              />
              : <Image
              
              style={styles.imageStyle}
            />}
                                  
                            </View>
                        {/* </View> */}
                    </View>
                   <View style={styles.row}>
                    <TouchableOpacity style={styles.signInButton} onPress={() => this.Scanner()}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.linearGradient}>
                        <Text style={styles.cancelText}>Upload Image</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signInButton} onPress={() => this.closeCallout1()}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FF6A00','#EE0979']} style={styles.linearGradient}>
                        <Text style={styles.cancelText}>Submit</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                
                    </View>
                </View>
          
        </View>
        </ScrollView>
        </Modal>
                 )
    }
}
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: screenWidth - 30,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        bottom: '45%',
        marginHorizontal: 15,
        borderRadius: 5,
        backgroundColor: COLORS.PRIMARY,
        shadowOffset: { width: 8, height: 8, },
        shadowColor: '#05294b',
        shadowOpacity: 0.7,
    },
    imageStyle: {
        // marginTop:10,
     width: screenWidth-90 ,
        height: 100,
        // margin: 5,
        //  marginTop:-50,
        marginLeft:20,
        marginRight:50,
        borderRadius: 10,
        backgroundColor:'#fff',
        justifyContent: 'center',
        alignItems: 'center',
      },
    availableConnectorText: {
        color:COLORS.DEFAULT,
        fontSize: 12,
        fontFamily: "Poppins-medium",
        flexDirection: 'row',
        flex: 1.9,
        fontWeight:'bold',
        marginHorizontal: 10
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        marginVertical: 10
    },
    listView: {
        flex: 0.4,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 6,
    },
    listContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginVertical: 10,
    },

    availableConnector: {
        fontSize: 16,
        fontFamily: "Poppins-medium",
        color: COLORS.BLACK,
        flexDirection: 'row',
        textAlign: 'center',
        marginHorizontal: 10
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 5
    },
    header: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    body: {
        flex: 3,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        borderBottomColor: COLORS.INPUT_LABEL,
        borderBottomWidth: 1
    },
    h1: {
        textAlign: 'left',
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
    },
    text: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT
    },
    points: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
    },
    mediumBold: {
        fontSize: 14,
        fontWeight: '500',
        flex: 2,
    },
    address: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: COLORS.INPUT_LABEL
    },
    marginHorizontal: {
        marginHorizontal: 10
    },
    bold: {
        fontWeight: '600'
    },
    button: {
        flex: 1,
        // shadowOpacity: 2,
        textTransform: 'capitalize',
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: 'green',
        borderRadius: 5,
        borderWidth:1,
        margin: 5,
        shadowColor: 'white',

    },
    onlinebutton: {
        backgroundColor: '#05294b',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth:'40%',
        borderColor: 'green',
        borderRadius: 5,
        shadowColor: 'green',
    },
    busybutton: {
        backgroundColor: '#DB4914',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'green',
        borderRadius: 5,
        minWidth:'43%',
        shadowColor: 'green',
    },

    linearGradient:{
        width: screenWidth/4 ,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginLeft:10,
        // marginTop: 10
    },
    image: {
        width: 40,
        height: 24,
        resizeMode: 'contain',
        borderRadius: 30,
        alignSelf: 'center'
    },
     inputtext:{
        backgroundColor:COLORS.DEFAULT,
        borderRadius:10,
        marginLeft:40,
        width:screenWidth/1.5,
        justifyContent:'center',
        alignSelf:'center',
        height:40,
     },
    iconContainer: {
        flex: 1,
        fontWeight: 'bold',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 999,
    },
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
  
export default connect(mapStateToProps,mapDispatchToProps)(Documents);
