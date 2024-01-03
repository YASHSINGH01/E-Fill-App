TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView ,PermissionsAndroid,Dimensions,StyleSheet} from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
//Components
import Header from '../../../../components/Header';
//Api
import HttpRequest from "../../../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Constants
import { Images } from "../../../../constants/";
//Styles

import { strings } from '../../../../utils/translations';
import LinearGradient from 'react-native-linear-gradient';

import RNFetchBlob from 'rn-fetch-blob';


const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

class Serviceinvoice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            refreshing: false,
            count: 0,
            url:'',
            file_name:'',
            bill:''
        };
    }
    permissionFunc(item){
        console.log(item.customer_contact);
         this.props.navigation.navigate("otpcancel",{mobile:item.customer_contact,service_id:item.service_id});
    }
    


    render() {
        let { navigation } = this.props;
        // let { item } = this.state;
        let { item,type } = this.props.route.params;
          console.log('invoice',type);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.dmc.s_detail} />
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <ScrollView contentContainerStyle={styles.scrollView}>

                        <View style={styles.box}>
                            <View style={styles.row}>
                                <Text style={[styles.text, styles.small]}>Service Name</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.text, styles.bold]} numberOfLines={2}>{item.service_name}</Text>

                            </View>
                            {/* <View style={styles.row}>
                                <Text style={[styles.text, styles.small]} numberOfLines={1}>{}</Text>
                            </View> */}
                        </View>
                        <View style={styles.box}>
                            <View style={[styles.row, styles.headerSeperator]}>
                                <Text style={styles.title}>Service Details</Text>
                            </View>
                            <View style={[styles.row, styles.padd]}>
                            {/* <Text style={styles.text}>{strings.orderHistory.invoice.transactionId}</Text> */}
                            <Text style={styles.text} numberOfLines={1}>{item.service_detail}</Text>
                        </View>
                           
                        </View>
                        {type!=1?
                        <TouchableOpacity style={styles.signInButton} onPress={() => this.permissionFunc(item)}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FF6A00','#EE0979']} style={styles.linearGradient}>
                        <Text style={styles.cancelText}>close Service</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    :null}
                    </ScrollView>
                </Animatable.View>
                
            </View>
        )
    }
}

let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: COLORS.PRIMARY,
        zIndex: 9999,
    },
    signInButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        // margin: 5,
    },
    linearGradient: {
        width: '60%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    footer: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 5,
        marginTop: 20
    },
    scrollView: {
        flexGrow: 1,
    },
    // seperator: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     flexDirection: 'row', 
    //     borderTopColor: '#ccc', 
    //     borderTopWidth: 1, 
    //     margin: 10
    // },
    headerSeperator: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        paddingLeft: 5,
        borderBottomColor: '#ccc', 
        borderBottomWidth: 1, 
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    padd: {
        padding: 3,
    },
    col: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "Poppins-Regular",
        color: COLORS.PRIMARY,
    },
    box : {
        borderColor: COLORS.SUCCESS,
        borderWidth: 1,
        backgroundColor: COLORS.DEFAULT,
        margin: 5,
        padding: 5,
        borderRadius: 5,
        marginBottom: 10
    },
    text: {
        fontSize: 14,
        color: COLORS.PRIMARY,
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
        // textTransform: 'capitalize'
    },
    orderIdText: {
        fontSize: 14,
        color: COLORS.PRIMARY,
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    headerAmount : {
        fontSize: 30,
        color: COLORS.DEFAULT
    },
    success: {
        fontSize: 26,
        color: COLORS.SUCCESS
    }, 
    bold: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 5,
    },
    small: {
        fontSize: 12,
        padding: 2,
        paddingLeft: 5,
        color: COLORS.INPUT_LABEL
    }

   
});

const mapStateToProps = state => {

    return {
        token: state.token,
    };
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Serviceinvoice);
