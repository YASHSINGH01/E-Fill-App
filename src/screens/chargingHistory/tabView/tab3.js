

import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, FlatList, RefreshControl, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
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


class tab3 extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            isLoading: true,
            historyData: '',
            refreshing: false
        };
    }

    componentDidMount = () => {
        this.getBookingHistory();
    }

    onRefresh = () => {
        this.setState({ refreshing : true, historyData: ''})
        this.getBookingHistory();
    }

    //Get Cancelled booking history through API 
    getBookingHistory = () => {
        HttpRequest.getBookingHistory({ status: 2 }, this.props.token)
        .then(res => {
            this.setState({ isLoading: false });
          
            const result = res.data;
            console.log("Get Cancelled booking history  API Response ---------- ", result.data[0]);
            if (res.status == 200 && !result.error) {
                // console.log("Get Cancelled booking history  API Response ---------- ", result.data);
               this.setState({ historyData:  result.data, refreshing: false});
            } else {
                //console.log("Get Cancelled booking history  API Error : ",result);
                this.setState({ refreshing: false});
            }
        })
        .catch(err => {
            this.setState({ isLoading: false, refreshing: false });
            console.log("Get Cancelled booking history API Catch Exception: ",err);
        });
    }

    //View Booking Details navigation
    viewDetails = (item) => {
        let { navigation } = this.props;
        navigation.navigate('Invoice', { id: item.id, item});
    }

    renderItem = ({ item }) => (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#fff','#fff']} style={styles.itemContainer}>
        <View style={styles.item}>
        <TouchableOpacity  onPress={() => this.viewDetails(item)} style={styles.itemContent}>
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
                        <View style={[styles.row, styles.descriptionContent ]}>
                            <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.connector}</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.charger_type}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.cancelledtime}</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.invoice_time}</Text>
                        </View>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        </View>
        </LinearGradient>
    )

    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>{strings.chargingHistory.response.error.notCancelledBookingFound}</Text>
        </View>
    )

    render() {
        let { historyData, isLoading, refreshing } = this.state;
        return (
            <View style={styles.container}>
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
        )
    }
}
let screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center', 
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
        borderRadius: 10,
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
        borderTopWidth: 2, 
        margin: 5
    },
    button: {
        flex: 1,  
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 10,  
        margin: 5,
        borderRadius: 10, 
    },
    success : {
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
        resizeMode: 'cover',
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
        color: COLORS.DEFAULT
    },
    label: {
        // fontWeight: '700',
        color: COLORS.BLACK
    },
    description: {
        fontSize: 12,
        color: COLORS.BLACK,
        fontWeight: '400',
        fontFamily: "Poppins-Regular",
    },
    createdAt: {
        fontSize: 10,
        color: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        fontWeight: '400',
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
  
export default connect(mapStateToProps,mapDispatchToProps)(tab3);

