import React, { Component } from 'react';

import { View, Text, StyleSheet,TouchableOpacity, Dimensions, ActivityIndicator, Image, Button, FlatList, ScrollView } from 'react-native';
//Library

import Icon from 'react-native-vector-icons/MaterialIcons';
import { CommonActions } from '@react-navigation/native';
// import RNPickerSelect from 'react-native-picker-select';

import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
// import { showMessage } from "react-native-flash-message";


//Api
import HttpRequest from "../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userInfo, loginToken } from '../Redux/Actions/Actions';
//Components
import Header from '../components/Header';

import COLORS from "../constants/colors";
// //Styles
// import styles from './styles';
import {
    useTheme,
    Title,
    Caption,
    Drawer
} from "react-native-paper";
//Constants
import { Images } from "../constants/";

import { strings } from '../utils/translations';


class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            cp_id:'',
            data:'',
            title:'',
            message:'',
            system_con:'',
        }

       
    }

    componentDidMount = () => {
        let { navigation } = this.props;
        this._unsubscribe = navigation.addListener('focus', () => {
             this.chargerfault();
        });
    }

    componentWillUnmount() {
        // this._unsubscribe();
        // this.chargerfault();
    }
    chargerfault =(charger,) =>{
        // let{id}=this.props.marker;
        let { item} =this.props.route.params;
        let{cp_id,system_con, data}=this.state;
    
       console.log("porps123e",item);
        // console.log("cpid",item.cp_id);
        HttpRequest.chargerfault({ cp_id:item.cp_id,system_con:item.system_con_id})
        .then(res => {
          const result = res.data;
           console.log("Phone Number Check api response ---------- ", result);
          if (res.status == 200 && !result.error) {

            this.setState({title:result.title,message:result.message});
          console.log("cpid1",result);
        //   this.props.navigation.navigate('Error',{data,item:item});
            
          }
        })
        .catch(err => {
          this.setState({ isLoading: false });
          console.log("Phone Number Check API Catch Exception: ",err);
        //   showMessage({
        //     message: strings.signIn.response.error.title,
        //     description: strings.signIn.response.error.message,
        //     type: "danger",
        //   });
        });
    }

   
    render() {
        let { data ,item} = this.props.route.params;
let {navigation} = this.props;
let{message,title}=this.state;
        // let { isLoading, vehicle, isScanning, vehicleData, add_vehicle, refreshing, vehicles, dataa ,connectors} = this.state;
         console.log(item,'dataa');
         console.log(data,'dataa1');
        // console.log(vehicleData,'vehicleData');
        //  console.log(vehicles,'vehicles');
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.chargerfault.title} />
                </View>

                <View style={styles.container1}>
                <Image source={Images.warning} style={styles.image}/>
                <Title style={styles.title}>{title}</Title>
                <Title style={styles.titlee}>{message}</Title>
                </View>
            </View>
        );
    }
}


const mapStateToProps = state => {

    return {
        info: state.info,
        token: state.token,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userInfo: bindActionCreators(userInfo, dispatch),
        loginToken: bindActionCreators(loginToken , dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Error);


// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors


const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: COLORS.PRIMARY
    },
    container1: {
        flex:8,
        backgroundColor: COLORS.PRIMARY,
        marginTop:5,
        //  paddingVertical: 25,
        // paddingBottom:10,
      },
    //   container2: {
    //     flex:1,
    //     backgroundColor: COLORS.PRIMARY,
    //     // paddingVertical: 25,
    //     paddingBottom:10,
    //   },
    header: {
         flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
       
    },
    image: {
        marginTop:60,
        margin:20,
        width: 150,
        height: 140,
        resizeMode: 'cover',
        borderRadius: 0,
        justifyContent: 'center',
        alignSelf: 'center'

    },
    // description: {
    //     fontSize: 12,
    //     color: COLORS.INPUT_LABEL,
    //     fontWeight: '500',
    //     paddingVertical: 5,
    // },
    image1: {
        width: 40,
        height: 30,
        resizeMode: 'contain',
        borderRadius: 30,
         marginLeft:10,
        // paddingLeft:60,
        alignSelf: 'center'
    },
    // text: {
    //     color: COLORS.DEFAULT,
    //     fontSize: 14,
    //     fontFamily: "Poppins-medium",
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
   
    title: {
        fontSize: 24,
        fontFamily: "Poppins-Regular",
        marginTop: 10,
        fontWeight: '600',
        textAlign:'center',
        color: COLORS.DEFAULT,
        justifyContent:'center',
        alignContent:'center',
        // backgroundColor:COLORS.HEADER_BACKGROUND,
        // borderRadius:30,
    },
    titlee: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        marginTop: 10,
        fontWeight: '600',
        textAlign:'center',
        color: COLORS.DEFAULT,
        justifyContent:'center',
        alignContent:'center',
        // backgroundColor:COLORS.HEADER_BACKGROUND,
        // borderRadius:30,
    },
    // content: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'flex-start',
    //     paddingLeft: 10
    // },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    bodyContent: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemHeader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon:{
        marginTop:25,
    },
    item: {
        flex: 1,
        height:75,
        flexDirection: 'row',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
         paddingTop: 2,
        zIndex: 998,
    },
    // qrContainer: {
    //     flex: 1,
    //     justifyContent: 'flex-start',
    //     alignItems: 'center',
    //     width: screenWidth/1.2,
    //     height: screenHeight/1.9,
    //     marginHorizontal: 20,
    //     borderRadius: 30,
    //     backgroundColor: '#fff',
    //     padding: 20,
    //     position: 'absolute',
    //     top: 50
    // },
    // 
    // permissionText: {
    //     textAlign: 'center',
    //     fontSize: 12, 
    //     alignSelf: 'center', 
    //     color: COLORS.ERROR,
    //     fontFamily: "Poppins-Regular"
    // },
    // statusText: {
    //     flex:3,
    //     height: '100%',
    //     color: COLORS.ERROR,
    //     fontSize: 16,
    //     fontFamily: "Poppins-Regular",
    //     fontWeight: '700',
    //     textAlign: 'center',
    // },
    // noDataFoundContainer: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // noDataFoundText: {
    //     color: COLORS.DEFAULT,
    //     fontSize: 14,
    //     fontFamily: "Poppins-medium",
    // },
    // addVehicleContainer: {
    //     flex: 1,
    //     backgroundColor: COLORS.HEADER_BACKGROUND, 
    //     justifyContent: 'center', 
    //     alignItems: 'center',
    // },
    // vehicleText: {
    //     color: COLORS.BLACK,
    //     fontSize: 16,
    //     padding: 20,
    //     borderRadius: 20,
    //     alignSelf: 'center',
    //     fontFamily: "Poppins-Regular",
    // },
    // signInButton: {
    //     width: screenWidth/2,
    //     height: 60,
    //     justifyContent: 'center',
    //     alignSelf: 'center',
    //     alignItems: 'center',
    //     borderRadius: 30,
    //     zIndex: 999,
    //     position: 'absolute',
    //     bottom : -10
    // },
   
    // footer: {
    //     flex: 4,
    //     backgroundColor: COLORS.HEADER_BACKGROUND,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderTopLeftRadius: 40,
    //     borderTopRightRadius: 40,
    //     paddingVertical: 50,
    //     paddingHorizontal: 30
    // },
   
    // selectBoxField: {
    //     width: screenWidth/1.1,
    //     height: 60,
    //     flexDirection: 'row',
    //     marginVertical: 20,
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     backgroundColor: COLORS.DEFAULT,
    //     color: COLORS.black,
    //     borderRadius: 30,
    // },
    // pickerContainer: {
    //     flexDirection: 'row',
    //     width: screenWidth - 40 ,
    //     height: 60,
    //     marginTop: 40,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: COLORS.DEFAULT,
    //     paddingLeft: 20,
    //     paddingRight: 20,
    //     color: COLORS.BLACK,
    //     borderRadius: 30,
    // },
    // IOS: {
    //     width: screenWidth/1.3,
    //     height: '100%',
    //     fontSize: 16,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     fontFamily: "Poppins-Regular",
    //     color: COLORS.BLACK,
    //     paddingVertical: 12,
    //     paddingHorizontal: 30,
        
    // },
    // android: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     width: screenWidth/1.3,
    //     height: '100%',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     fontSize: 16,
    //     color: COLORS.BLACK,
    //     borderRadius: 30,
    //     paddingHorizontal: 20,
    // },
    // pickerText: {
    //    // margin:10,
    //     marginTop:10,
    //     marginBottom:5,
    //     color: "#31906E",
    //     fontSize: 14,
    //     //fontWeight:'bold',
    //     // minHeight:40,
       
    //     justifyContent:'center',
    //     textAlign: 'center',
    //     fontFamily: "Poppins-Regular",
    // },
    // modalBody: {
    //     flex: 1, 
    //     alignItems: 'center', 
    //     justifyContent: 'center', 
    //     backgroundColor: 'rgba(0,0,0,0.5)'
    // },
    modalContainer: {
        width: '80%',
        height: '30%',
        marginHorizontal: '50%',
        justifyContent: 'center',
        backgroundColor: COLORS.DEFAULT,
        borderRadius: 6,
    },
    modalScrollView: {
        flexGrow: 1,
        width: '100%',
    },
    // resultItem: {
    //     padding: 15,
    //     width: '100%',
    //     borderColor: COLORS.BORDER_COLOR,
    //     borderTopWidth: 0.5,
    //     borderBottomWidth: 0.5,
    //     zIndex: 998,
    //     borderRadius: 16,
    // },
    // resultName: {
    //     fontSize: 12,
    //     fontFamily: "Poppins-medium",
    //     fontWeight: '600',
    // },
    // resultAddress: {
    //     fontSize: 12,
    //     fontFamily: "Poppins-medium",
    //     fontWeight: '500'
    // },
    // resultText: {
    //     color: COLORS.PRIMARY,
    //     fontSize: 14,
    //     fontFamily: "Poppins-medium",
    //     margin: 5
    // }, 
    // resultContainer: {
    //     flex: 1, 
    //     marginHorizontal: 10,
    //     width: '100%',
    //     position: 'absolute',
    //     height: '40%'
    // }
});