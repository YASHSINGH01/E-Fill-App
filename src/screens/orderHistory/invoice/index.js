TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, Platform,PermissionsAndroid} from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
//Components
import Header from '../../../components/Header';
//Api
import HttpRequest from "../../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Constants
import { Images } from "../../../constants/";
//Styles
import styles from './styles';
import { strings } from '../../../utils/translations';
import LinearGradient from 'react-native-linear-gradient';

import RNFetchBlob from 'rn-fetch-blob';

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

class Invoice extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            refreshing: false,
            count: 0,
            url:'',
            dataa:''

            //Object.values(DATA).length
        };
    }

    permissionFunc = async () => {
        
        if (Platform.OS == 'ios') {
            this.actualDownload();
        } else {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  console.log('url')
                    this.actualDownload();
                } else {
                    Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    }
    
apicall=(item)=>{
    //  console.log('item',this.state.url);
    //  console.log('item',item);
    
    HttpRequest.downloadinvoice({order_id: item})
            .then(res => {
                // this.setState({ isLoading: false });
                const result = res.data;
                if (res.status == 200 && !result.error) {
                    console.log("Get Completed booking history  API Response ---------- ", result);
                    this.setState({url:result.file_path})
                    // console.log(this.state.url,'url');
                    this.permissionFunc();
                  
                } else {
                    this.setState({ refreshing: false });
                    // console.log("Get Completed booking history  API Error : ",result);
                }
            })
            .catch(err => {
                this.setState({ isLoading: false, refreshing: false });
                // console.log("Get Completed booking history API Catch Exception: ",err);
            });
}
    actualDownload = () => {
       let{url}=this.state;
       console.log(url,'url');
        const { dirs } = RNFetchBlob.fs;
        RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mediaScannable: true,
                title: `invoice.pdf`,
                path: `${dirs.DownloadDir}/invoice.pdf`,
            },
            
        })  
            .fetch('GET', url, {})
            
            // RNFetchBlob.fs.writeFile(path, this.state.base64, 'base64') .then((res) => {

            //     RNFetchBlob.ios.openDocument(path)
             
        //    })
            .catch((e) => {
                console.log(e)
            });
    }


    render() {
        let { navigation } =  this.props;
        let { item } = this.props.route.params;
        let { isLoading } = this.state;
console.log('ugs',item);

        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.orderHistory.invoice.title} />
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
            
                    <View style={styles.box}>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.small]}>{strings.orderHistory.invoice.billPaid}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.bold]} numberOfLines={2}>{item.charging_station_name.length > 100 ? item.charging_station_name.substring(0, 100)+'..' : item.charging_station_name}</Text>
                            
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.small]} numberOfLines={1}>{item.address}</Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={[styles.row, styles.headerSeperator]}>
                            <Text style={styles.title}>{strings.orderHistory.invoice.transactionDetails}</Text>
                        </View>
                       {/* <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.orderHistory.invoice.transactionId}</Text>
                            <Text style={styles.text} numberOfLines={1}>{item.transaction_id}</Text>
                        </View>*/}
                        <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.orderHistory.invoice.orderId}</Text>
                            <Text style={styles.orderIdText} numberOfLines={1}>{item.order_id}</Text>
                        </View>
                        <View style={styles.seperator} />
                        <View style={[styles.row, styles.padd]}>
                            <Text style={styles.orderIdText} numberOfLines={1}>{item.invoice_time}</Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={[styles.row, styles.headerSeperator]}>
                            <Text style={styles.title}>{strings.orderHistory.invoice.paymentMode}</Text>
                        </View>
                        <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.orderHistory.invoice.booking}</Text>
                            <Text style={styles.text}>₹  {item.booking_amount}</Text>
                        </View>
                        
                        {/* <View style={[styles.row, styles.padd]}>
                            <Text style={[styles.text,]}>{strings.orderHistory.invoice.duration}</Text>
                            <Text style={[styles.text, {flex: 1, textAlign: 'right'}]} numberOfLines={2}>{item.duration}</Text>
                        </View> */}
                        <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.orderHistory.invoice.dis}</Text>
                            <Text style={styles.text}>₹  {item.coupon_discount}</Text>
                        </View>
                       
                        <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.orderHistory.invoice.paid}</Text>
                            <Text style={styles.text}>₹  {item.paid_amount}</Text>
                        </View>

                        
                        <View style={styles.seperator} />
                    </View>
                    <View style={styles.box}>
                        <View style={[styles.row, styles.headerSeperator]}>
                            <Text style={styles.title}>{strings.orderHistory.invoice.chargingDetails}</Text>
                        </View>
                        <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.orderHistory.invoice.energyConsumed}</Text>
                            <Text style={styles.text} numberOfLines={1}>{item.energy_consumed}</Text>
                        </View>
                       
                        <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.orderHistory.invoice.unitConsumed}</Text>
                            <Text style={styles.text} numberOfLines={1}>₹ {item.unit_price}</Text>
                        </View>
                        {/* <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.orderHistory.invoice.unitConsumed}(Applicable)</Text>
                            <Text style={styles.text}>₹  {item.unit_price_discount}</Text>
                        </View> */}
                      <View style={[styles.row, styles.padd]}>
                            <Text style={[styles.text,{textTransform: 'capitalize'}]}> Sub Total{/*{ strings.orderHistory.invoice.paidFrom === "Paid from" ? strings.orderHistory.invoice.paidFrom+' '+item.method : item.method+' '+ strings.orderHistory.invoice.paidFrom}*/}</Text>
                            <Text style={styles.text} numberOfLines={1}>₹ {item.final_sub_total}</Text>
                        </View>
                        <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text}>{strings.orderHistory.invoice.GST} {item.gst_percentage}</Text>
                            <Text style={styles.text}>₹ {item.taxes}</Text>
                        </View>
                       {/* {item.method != '' && item.method != null &&
                        <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text} numberOfLines={1}>{strings.orderHistory.invoice.paidFrom} </Text>
                            <Text style={styles.text} numberOfLines={2}>{item.method}</Text>
                        </View>
                        }*/}
                        {/* {item.refund != '' && item.refund != null && */}
                        <View style={[styles.row, styles.padd]}>
                            <Text style={[styles.text,{textTransform: 'capitalize'}]}> Total Amount{/*{ strings.orderHistory.invoice.paidFrom === "Paid from" ? strings.orderHistory.invoice.paidFrom+' '+item.method : item.method+' '+ strings.orderHistory.invoice.paidFrom}*/}</Text>
                            <Text style={styles.text} numberOfLines={1}>₹ {item.final_amount}</Text>
                        </View>
                        
                        {/* } */}
                        <View style={styles.seperator} />
                        <View style={[styles.row, styles.padd]}>
                            <Text style={styles.text} numberOfLines={1}>{strings.orderHistory.invoice.refund} </Text>
                            <Text style={styles.text} numberOfLines={2}>₹ {item.amount_refunded}</Text>
                        </View>
                    </View>
                   
                    </ScrollView>
                </Animatable.View>
                {Platform.OS=='android'?
                <TouchableOpacity style={styles.signInButton} onPress={() => this.apicall(item.order_id)}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FF6A00','#EE0979']} style={styles.linearGradient}>
                        <Text style={styles.cancelText}>Download Invoice</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    :null}
            </View>
        )
    }
}

const mapStateToProps = state => {
    
    return {
      token: state.token,
    };
  };
  
  
  const mapDispatchToProps = (dispatch) => {
      return bindActionCreators({}, dispatch);
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Invoice);
