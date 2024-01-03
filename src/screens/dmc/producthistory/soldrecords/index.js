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
import { Chessis_no } from '../../../../Redux/Actions/Actions';
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

class Soldrecords extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            refreshing: false,
            count: 0,
            url:'',
            file_name:'',
            item:{
                id:'1',
                charging_station_name:'Muver',
                price:'Rs. 125630/-',
                total_amount:'Rs. 136840/-',
                gst:'18%',
                address:'Sonipat',
                order_id:'00012',

                
            },
            bill:''
        };
    }

    componentDidMount(){
        this.invoice();
    }
    
    invoice(){
        let {items}=this.props.route.params;
        // console.log('invoice',items.stock_id);
        HttpRequest.dealer_invoice({stock_id:items.stock_id})
        .then(res => {
            
            const result = res.data;
           
            if (res.status == 200 ) {
                this.setState({ bill:result.data[0], refreshing: false,favorite: result.favorite, isLoading: false,})
                  console.log("distance",result.data[0].chassis_no);
                this.props.Chessis_no(result.data[0].chassis_no);
                console.log("Vehicle details Response ---------- ", result.data[0]);
            } else {
                this.setState({ isLoading: false });
                console.log("Stock API Error : ",result);
                showMessage({
                   message: strings.error.title,
                    description: result.message != undefined ? result.message : result.status,
                    type: "danger",
                });
            }
        })
        .catch(err => {
            this.setState({ isLoading: false, refreshing: false });
            console.log("Stock API Catch Exception: ",err);
            showMessage({
               message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    }

    permissionFunc(item){
        this.props.navigation.navigate("Updatedata",{item});
    }


    render() {
        let { navigation } = this.props;
        let { item } = this.state;
        let { bill } = this.state;
        //  console.log('invoice',bill.customer_contact);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.dmc.sale_deatils} />
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <ScrollView contentContainerStyle={styles.scrollView}>

                        <View style={styles.box}>
                            <View style={styles.row}>
                                <Text style={[styles.text, styles.small]}>Vehicle Name</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.text, styles.bold]} numberOfLines={2}>{bill.stock_name}</Text>

                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.text, styles.small]} numberOfLines={1}>{bill.sold_date}</Text>
                            </View>
                        </View>
                        <View style={styles.box}>
                            <View style={[styles.row, styles.headerSeperator]}>
                                <Text style={styles.title}>Customer Details</Text>
                            </View>
                            {/* <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.orderHistory.invoice.transactionId}</Text>
                            <Text style={styles.text} numberOfLines={1}>{item.transaction_id}</Text>
                        </View>*/}
                            <View style={[styles.row, styles.padd]}>
                                <Text style={styles.text}>Customer Name</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.customer_name}</Text>
                            </View>
                            <View style={styles.seperator} />
                            <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>Customer Contact No.</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.customer_contact}</Text>
                            </View>
                            <View style={styles.seperator} />
                            <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>Customer Document Type</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.customer_doc_type}</Text>
                            </View>
                        </View>
                        <View style={styles.box}>
                            <View style={[styles.row, styles.headerSeperator]}>
                                <Text style={styles.title}>Payment Details</Text>
                            </View>

                            <View style={[styles.row, styles.padd]}>
                                <Text style={styles.text}>{strings.orderHistory.invoice.subTotal}</Text>
                                <Text style={styles.text}>₹  {bill.subtotal}</Text>
                            </View>
                            {/* <View style={styles.seperator} /> */}
                            <View style={[styles.row, styles.padd]}>
                                <Text style={styles.text}>GST</Text>
                                <Text style={styles.text}>₹ {bill.tax}</Text>
                            </View>
                            {/* {item.refund != '' && item.refund != null &&
                                <View style={[styles.row, styles.padd]}>
                                    <Text style={styles.text} numberOfLines={1}>{strings.orderHistory.invoice.refund} </Text>
                                    <Text style={styles.text} numberOfLines={2}>₹ {item.refund.amount}</Text>
                                </View>
                            } */}
                            <View style={styles.seperator} />
                            <View style={[styles.row, styles.padd]}>
                                <Text style={[styles.text, { textTransform: 'capitalize' }]}> Total Amount{/*{ strings.orderHistory.invoice.paidFrom === "Paid from" ? strings.orderHistory.invoice.paidFrom+' '+item.method : item.method+' '+ strings.orderHistory.invoice.paidFrom}*/}</Text>
                                <Text style={styles.text} numberOfLines={1}>₹ {bill.total}</Text>
                            </View>
                        </View>
                        <View style={styles.box}>
                            <View style={[styles.row, styles.headerSeperator]}>
                                <Text style={styles.title}>Part Details</Text>
                            </View>
                            {/* <View style={[styles.row, styles.padd]}>
                                <Text style={styles.text}>{strings.orderHistory.invoice.energyConsumed}</Text>
                                <Text style={styles.text} numberOfLines={1}>{item.energy_consumed}</Text>
                            </View> */}
                            <View style={[styles.row, styles.padd]}>
                                <Text style={styles.text}>{strings.dmc.update.battery_no}</Text>
                                <Text style={styles.text} numberOfLines={1}>{bill.battery_no}</Text>
                            </View>
                            <View style={[styles.row, styles.padd]}>
                                <Text style={styles.text}>{strings.dmc.update.chassis_no}</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.chassis_no}</Text>
                            </View>
                            <View style={styles.seperator} />
                            <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.dmc.update.controller_no}</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.controller_no}</Text>
                            </View>
                            <View style={styles.seperator} />
                            <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.dmc.update.motor_no}</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.motor_no}</Text>
                            </View>
                            <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.dmc.update.differential_no}</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.differential_no}</Text>
                            </View>
                            <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.dmc.update.fm_no}</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.fm_no}</Text>
                            </View>
                            <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.dmc.update.front_shocker_no}</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.front_shocker_no}</Text>
                            </View>
                            <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.dmc.update.horn_no}</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.horn_no}</Text>
                            </View>
                            <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.dmc.update.ignition_lock_no}</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.ignition_lock_no}</Text>
                            </View>
                            <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.dmc.update.throttle_no}</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.throttle_no}</Text>
                            </View>
                            <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.dmc.update.charger_no}</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.charger_no}</Text>
                            </View>
                            <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.dmc.update.rim_no}</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.rim_no}</Text>
                            </View>
                            <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.dmc.update.speedometer_no}</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.speedometer_no}</Text>
                            </View>
                            <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.dmc.update.tyre_no}</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.tyre_no}</Text>
                            </View>
                            <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.dmc.update.converter_no}</Text>
                                <Text style={styles.orderIdText} numberOfLines={1}>{bill.converter_no}</Text>
                            </View>
                            {/* <View style={[styles.row, styles.padd]}>
                                <Text style={[styles.text,]}>{strings.orderHistory.invoice.duration}</Text>
                                <Text style={[styles.text, { flex: 1, textAlign: 'right' }]} numberOfLines={2}>{item.duration}</Text>
                            </View> */}
                            {/* <View style={styles.seperator} /> */}
                        </View>
                        
                        
                    </ScrollView>
                   
                </Animatable.View>
                <TouchableOpacity style={styles.signInButton} onPress={() => this.permissionFunc(item)}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FF6A00','#EE0979']} style={styles.linearGradient}>
                        <Text style={styles.cancelText}>Update Part No.</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                
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
    },
    cancelText:{
        color:'#000',
        fontWeight:'800'
    }
   
});

const mapStateToProps = state => {

    return {
        token: state.token,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        Chessis_no: bindActionCreators(Chessis_no, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Soldrecords);
