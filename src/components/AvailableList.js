import React, {Component} from 'react'
import { ScrollView, Text,RefreshControl, View,FlatList, Image, StyleSheet, TextInput, Dimensions, SafeAreaView, TouchableOpacity, ActivityIndicator, Platform, Modal } from 'react-native'
//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
// import RangeSlider from 'rn-range-slider';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import Slider from '@react-native-community/slider';
import { showMessage } from "react-native-flash-message";
import * as Animatable from 'react-native-animatable';
//Components
import Radio from "../components/Radio";
//Api
import HttpRequest from "../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { chargingStation, distanceInfo, filterInfo } from '../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Theme Colors
import COLORS from "../constants/colors";
import { Images } from "../constants";
//Localization
import { strings } from "../utils/translations";
//Utils
import Stars from "../utils/stars.json";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;

class AvailableList extends Component {
    constructor(props) {
        super(props);


        this.state = {
            isLoading: false,
            isClear: false,
                       historyData: '',
                       refreshing: false
        };
    }

    componentDidMount = () => {
        this.getresphone();
    }


    closeFilter = () => {
        this.props.closeModal();
    }
     onRefresh = () => {
            this.setState({ refreshing : false, historyData: ''});
            //this.getresphone();
        }

    getresphone=()=>{
 HttpRequest.getactiveOrders(this.props.token)
                    .then(res => {
                        const result = res.data;
                        console.log("Response ---------- ", result);
                        if (res.status == 200 && !result.error ) {
                        if(result.data.length>0){
                       this.setState({historyData:  result.data, refreshing: false});
                        console.log("orders",result.data)
                        }
                        } else {
                            this.setState({ refreshing: false });
                            console.log("Charging Station API Error : ",result);
//                            showMessage({
//                               message: strings.error.title,
//                                description: result.message != undefined ? result.message : result.status,
//                                type: "danger",
//                            });
                        }
                    })
                    .catch(err => {
                        this.setState({ isLoading: false, refreshing: false });
                        console.log("Charging Station API Catch Exception: ",err);
                        showMessage({
                           message: strings.error.title,
                            description: strings.error.message,
                            type: "danger",
                        });
                    });

}
 viewDetails = (item) => {
 let{formData}=this.props;
this.closeFilter();
if(item.booking_status=="4"){

 formData.navigate('ChargingHistoryDetails', { id: item.id, status: 3});
}
else
{
formData.navigate('ChargingHistoryDetails', { id: item.id, status: 0});
}

    }
 renderItem = ({ item }) => (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FFFF','#FFFF']} style={styles.itemContainer}>
        <View style={styles.item}>
            <View style={styles.itemHeader}>
                {/* Charging Station Image & Ratings */}
                 <TouchableOpacity  onPress={() => this.viewDetails(item)}style={styles.itemContent}>
                <View style={styles.row}>
                    <Image source={Images.stationThumbnail} style={styles.image}/>
                    <View style={[styles.content, { flex: 3}]}>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.title]}  numberOfLines={1}>{item.station_name}</Text>
                        </View>
                 <View style={[styles.row, styles.descriptionContent, {marginTop: 10}]}>
                                                                    <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.chargingPoint}</Text>
                                                                    <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.chargepoint_id}</Text>
                                                                </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text,styles.description, styles.label]}>Booking Date</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.booking_date}</Text>
                        </View>
<View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text,styles.description, styles.label]}>Amount</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.amount}</Text>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        </View>
        </LinearGradient>
    )

 listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
<Animatable.View animation="fadeInUpBig" style={[styles.footer, styles.alignCenter ]}>
                    <Image source={Images.couponNotFound} style={styles.notFoundImage} />

                </Animatable.View>

        </View>
    )
    render(){
        let { historyData, isLoading, refreshing } = this.state;
let{navigation}=this.props;
 console.log(this.props);
        return(
        <SafeAreaView style={styles.content}>
            <ScrollView contentContainerStyle={styles.scrollView}>
               <View style={styles.container}>
                  <TouchableOpacity style={styles.closeButton} onPress={this.closeFilter}>
                                       <Image source={Images.close} style={styles.closeIcon} />
                                   </TouchableOpacity>
                            { isLoading ?
                               <ActivityIndicator size='large' color='#fff' />
                               :
                           <FlatList
                           data={historyData}
                               renderItem={this.renderItem}
                               keyExtractor={item => item.id+''}
                               ListEmptyComponent={() => this.listEmptyComponent()}
                               refreshControl={
                                   <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={'#fff'}/>
                               }
                           />
                           }
                           </View>

            </ScrollView>
        </SafeAreaView>
    );
    }
}

let screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        backgroundColor: COLORS.PRIMARY,
    },
    content: {
        flex: 1,
    },
    container: {
            flex: 1,
            borderRadius:40,
            justifyContent:'center',
        },
    noDataFoundContainer: {
            flex: 1,
            height: screenHeight/2,
            justifyContent: 'center',
            alignItems: 'center',
        },
        noDataFoundText: {
            color: COLORS.DEFAULT,
            fontSize: 14,
            fontFamily: "Poppins-medium",
        },
     descriptionContent: {
            justifyContent: 'space-between',
            alignItems: 'center'
        },
         label: {
                fontWeight: '700',
                color: COLORS.PRIMARY
            },
        leftAlign: {
               textAlign: 'left'
           },
    title: {
           fontSize: 16,
           fontWeight: 'bold',
           fontFamily: "Poppins-Regular",
           color: COLORS.PRIMARY
       },
        description: {
               fontSize: 12,
               color: COLORS.PRIMARY,
               fontWeight: '400',
               fontFamily: "Poppins-Regular",
           },
     item: {
            flex: 1,
            flexDirection: 'row',
            padding: 5,
            borderRadius: 10,
        },
         itemHeader: {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            },
             image: {
                    width: 100,
                    height: 100,
                    resizeMode: 'contain',
                    borderRadius: 50
                },
                row: {
                        flex: 1,
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    },

    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
    },
    closeButton: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    closeIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    headerText: {
        flex: 0.6,
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        color: COLORS.DEFAULT,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 20,
    },
    formField: {
       flex: 1,
    },

    androidRow: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth/1.3,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 16,
        color: COLORS.BLACK,
        borderRadius: 30,
        paddingHorizontal: 10,
    },

    IOS: {
        width: screenWidth/1.3,
        height: '100%',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK,
        paddingVertical: 12,
        paddingHorizontal: 30,
    },
    android: {
        flex:1,
        width: screenWidth/1.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        paddingHorizontal: 30,
    },
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
    resultItem: {
        padding: 15,
        width: '100%',
        zIndex: 998,
    },
    resultItemBorder: {
        borderColor: COLORS.BORDER_COLOR,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderRadius: 16,
    },

    resultContainer: {
        flex: 1,
        marginHorizontal: 10,
        width: '100%',
        position: 'absolute',
        height: '40%'
    }
});


const mapStateToProps = state => {
    return {
        token: state.token,
        charging_stations: state.charging_stations,
        distance: state.distance,
        filter: state.filter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        chargingStation: bindActionCreators(chargingStation, dispatch),
        distanceInfo: bindActionCreators(distanceInfo, dispatch),
        filterInfo: bindActionCreators(filterInfo, dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(AvailableList);