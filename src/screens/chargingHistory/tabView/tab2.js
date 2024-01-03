import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, FlatList, RefreshControl, Dimensions,Alert, TouchableOpacity, ActivityIndicator, PermissionsAndroid ,Linking, Platform} from 'react-native'
//Library
import LinearGradient from 'react-native-linear-gradient';
//Api
import HttpRequest from "../../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Theme Colors
import COLORS from "../../../constants/colors";
import { Images } from '../../../constants';
import { strings } from "../../../utils/translations";
import RNFetchBlob from 'rn-fetch-blob';
import prompt from 'react-native-prompt-android';
// import { err } from 'react-native-svg/lib/typescript/xml';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

class tab2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            historyData: '',
            refreshing: false,
            visible : false,
            email: '',

        };
    }

    componentDidMount = () => {
        this.getBookingHistory();
    }

    onRefresh = () => {
        this.setState({ refreshing: true, historyData: '' });
        this.getBookingHistory();
    }

    //Get Completed booking history through API 
    getBookingHistory = () => {
        HttpRequest.getBookingHistory({ status: 1 }, this.props.token)
            .then(res => {
                this.setState({ isLoading: false });
                const result = res.data;
                if (res.status == 200 && !result.error) {
                 console.log("Get Completed booking history  API Response ---------- ", result);
                    this.setState({ historyData: result.data, refreshing: false });
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

    //View Booking Details navigation
    viewDetails = (item) => {
        let { navigation } = this.props;
        navigation.navigate('Invoice', { item });
    }


    // permissionFunc = async () => {
    //     if (Platform.OS == 'ios') {
    //         actualDownload();
    //     } else {
    //         try {
    //             const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    //             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                 this.actualDownload();
    //             } else {
    //                 Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
    //             }
    //         } catch (err) {
    //             console.warn(err);
    //         }
    //     }
    // }

    // actualDownload = () => {
    //     const { dirs } = RNFetchBlob.fs;
    //     RNFetchBlob.config({
    //         fileCache: true,
    //         addAndroidDownloads: {
    //             useDownloadManager: true,
    //             notification: true,
    //             mediaScannable: true,
    //             title: `invoice.pdf`,
    //             path: `${dirs.DownloadDir}/invoice.pdf`,
    //         },
    //     })
    //         .fetch('GET', 'https://iot.efillelectric.com/invc/ad1668487027309.pdf', {})
    //         .then((res) => {
    //             console.log('The file saved to ', res.path());
    //         })
    //         .catch((e) => {
    //             console.log(e)
    //         });
    // }

    sendinvoice = (mail,order_id) =>{
        // console.log('sendemail',mail,order_id);
         HttpRequest.sendemail({user_email:mail,order_id:order_id})
         .then(res =>{
             const result=res.data;
             if(res.status==200 && !result.error){
                // if (user_email != '' || user_email != null) {
                //     Linking.openURL('mailto:' + user_email + '?subject=' + user_email + ' | Charging Station Query')
                // }
                Alert.alert(
                    res.data.message   
                  );
                // console.log('Send Invoice Email API response----- ',result );
                // this.setState({ref})
                // this.setState({email:})
             }
             else{
                Alert.alert(
                    res.data.message   
                  );
                // this.setState({ refreshing: false });
             }
         })
         .catch(err => {
                // this.setState({ isLoading: false, refreshing: false });
                 console.log("Send Invoice Email API Catch Exception: ",err);
            });
    }
   
    handleEmail = (item) => {
        // console.log(item);
       {Platform.OS!='ios'?
       prompt(
        'Invoice ',
        'Enter your email id ',
        [
         {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
         {text: 'OK', onPress: password => this.sendinvoice(password,item.order_id)},
        ],
        {
            type: 'email-address',
            cancelable: false,
            defaultValue: item.user_email,
            placeholder: 'placeholder'
        }
    ):
    
        Alert.prompt(
            'Invoice',
            'Enter your email id',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              {
                text: 'OK',
                onPress: (password) =>
                this.sendinvoice(password,item.order_id)
              }
              
            ],
            'plain-text',item.user_email
          );
        }
    }



    renderItem = ({ item }) => (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fff', '#fff']} style={styles.itemContainer}>
          
            <View style={styles.itemHeader}>
                {/* Charging Station Image & Ratings */}
                <View style={styles.row}> 
                <Image source={{uri:item.icon}} style={styles.image}/>
                    <View style={[styles.content, { flex: 3}]}>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.title]}  numberOfLines={1}>{item.charging_station_name}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent, {marginTop: 10}]}>
                         <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistoryDetails.orderId}</Text>
                         <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.order_id}</Text>
                         </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                                                                    <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.chargingPoint}</Text>
                                                                    <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.charging_point_id}</Text>
                                                                </View>
                        {/* <View style={[styles.row, styles.descriptionContent ]}>
                            <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.connector}</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.connector_type_name}</Text>
                        </View> */}

<View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.amount}</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]}>Rs. {item.final_amount}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text,styles.description, styles.label]}>Energy Used :</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.energy_consumed}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                                                  <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.starttime}</Text>
                                                  <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.invoice_time}</Text>
                                              </View>
                        {/* <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.time}</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.charge_time}</Text>
                        </View> */}
                         {/* <View style={[styles.row, styles.descriptionContent]}>
                          <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.endtime}</Text>
                          <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.end_time}</Text>
                          </View> */}
                    </View>
                </View>
                <View style={styles.seperator} />
                
                <View style={styles.row}>
                    <TouchableOpacity style={styles.signInButton} onPress={() => this.viewDetails(item)}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#F8B51D', '#F6DA7D','#FBBA54']} style={styles.linearGradient}>
                                <Text style={styles.cancelText}>Invoice Details</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signInButton} onPress={() => this.handleEmail(item)}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FF6A00','#EE0979']} style={styles.linearGradient}>
                        <Text style={styles.cancelText}>Mail Invoice</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                
            </View>
       
        </LinearGradient>
    )

    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>{strings.chargingHistory.response.error.notSuccessfullBookingFound}</Text>
        </View>
    )

    render() {
        let { historyData, isLoading, refreshing, visible  } = this.state;
        // console.log('historydata',historyData);
        return (
            <View style={styles.container}>
                {isLoading ?
                    <ActivityIndicator size='large' color='#fff' />
                    :
                    <FlatList
                        data={historyData}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id + ''}
                        ListEmptyComponent={() => this.listEmptyComponent()}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={'#fff'} />
                        }
                    />
                }
            </View>
        )
    }
}
let screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 2,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    //List view
    item: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    signInButton: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 5,
    },
    seperator: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        margin: 5
    },
    itemContent: {
        flex: 1,
        flexDirection: 'row',
    },
    itemHeader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    seperator: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        margin: 5
    },
    button: {
        flex: 1,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 5,
        borderRadius: 10,
    },
    success: {
        backgroundColor: COLORS.SUCCESS
    },
    danger: {
        backgroundColor: COLORS.ERROR
    },
    leftAlign: {
        textAlign: 'left'
    },
    customImage: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 40
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 10
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
    },
    descriptionContent: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        color: COLORS.BLACK
    },
    cancelText: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: "Poppins-Regular",
        color: COLORS.PRIMARY
    },
    label: {
        // fontWeight: '700',
        color: COLORS.LIGHT_BLACK
    },
    description: {
        fontSize: 12,
        color: COLORS.DEFAULT,
        fontWeight: '400',
        fontFamily: "Poppins-Regular",
        color: COLORS.LIGHT_BLACK
    },
    createdAt: {
        fontSize: 10,
        color: COLORS.PRIMARY,
        fontFamily: "Poppins-Regular",
        fontWeight: '400',
    },
    noDataFoundContainer: {
        flex: 1,
        height: screenHeight / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linearGradient: {
        width: '90%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5, 
        fontSize:10,
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    noDataFoundText: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",
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

export default connect(mapStateToProps, mapDispatchToProps)(tab2);