import React, { Component } from 'react'
import { Text, View, Image, FlatList, RefreshControl, TextInput, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { Modalize } from 'react-native-modalize';
import moment from "moment";
//Components
import Header from '../../components/Header';
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Api
import HttpRequest from "../../utils/HTTPRequest";
// Theme Colors
import { Images } from '../../constants';
//Styles
import styles from './styles';
import { strings } from "../../utils/translations";

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

class OrderHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isClear: false,
            historyData: '',
            refreshing: false,
            dateFrom: '',
            dateTo: '',
            isDateFromPickerVisible: false,
            isDateToPickerVisible: false,
        };

       
    }

    componentDidMount = () => {

        this.getOrderHistory()



    }

    //Get Order history through API 
    getOrderHistory = () => {
        HttpRequest.orderHistory(this.props.token)
            .then(res => {
                this.setState({ isLoading: false });
                const result = res.data;
                if (res.status == 200 && !result.error) {
                    console.log("Get Order history API Response ---------- ", result);
                    this.setState({ historyData: result.data, refreshing: false });
                } else {
                    this.setState({ refreshing: false });
                    console.log("Get Order history API Error : ", result);
                }
            })
            .catch(err => {
                this.setState({ isLoading: false, refreshing: false });
                console.log("Get Order history API Catch Exception: ", err);
            });
    }




    renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Invoice', { item: item })}>
            <View style={styles.itemHeader}>
                {/* Charging Station Image & Ratings */}
                <View style={styles.row}>
                    <View style={[styles.content, { flex: 2 }]}>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.title]} numberOfLines={1}>{item.title}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent, { marginTop: 5 }]}>
                            <Text style={[styles.text, styles.description, styles.leftAlign]} numberOfLines={1}>{item.vehicleName}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text, styles.description, styles.label]}>{strings.orderHistory.stationName}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text, styles.description, styles.label]} numberOfLines={1}>{item.chargin_station_name}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text, styles.description, styles.label]}>{strings.orderHistory.chargepointid}</Text>
                            <Text style={[styles.text, styles.description, styles.leftAlign]}>{item.chargin_point_id}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text, styles.description, styles.label]}>{strings.orderHistory.date}</Text>
                            <Text style={[styles.text, styles.description, styles.leftAlign]}>{item.invoice_time}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text, styles.description, styles.label]}>{strings.orderHistory.orderId}</Text>
                            <Text style={[styles.text, styles.description, styles.leftAlign]}>{item.order_id}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.seperator} />
                <View style={styles.row}>
                    <View style={[styles.row, styles.bottomContent, { marginTop: 5 }]}>
                        <View style={[styles.text, styles.description, styles.label]}>
                            <Icon
                                size={20}
                                name={'cash-outline'}
                                color={'#05294b'}
                                suppressHighlighting={true}
                            />
                        </View>
                        <Text style={[styles.text, styles.description, styles.leftAlign, { flex: 2 }]} numberOfLines={2}>₹ {item.amount_paid}</Text>
                        <View style={[styles.text, styles.description, styles.label]}>
                            <Feather
                                size={20}
                                name={'clock'}
                                color={'#05294b'}
                                suppressHighlighting={true}
                            />
                        </View>
                        <Text style={[styles.text, styles.description, styles.leftAlign, { flex: 1 }]} numberOfLines={1}>{item.duration}</Text>
                        {/* <View style={[styles.text,styles.description, styles.label, { flex: 0.5}]}>
                            <FontAwesome5
                                size={20}
                                name={'plug'}
                                color={'#05294b'}
                                suppressHighlighting={true}
                            />
                        </View>
                        <Text style={[styles.text,styles.description, styles.leftAlign, { flex: 1}]} numberOfLines={2}>{item.connector_type_name}</Text>*/}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )

    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>{strings.orderHistory.response.error.notFound}</Text>
        </View>
    )


    render() {
        let { navigation } = this.props;
        let { isLoading, historyData, refreshing, isClear, dateFrom, dateTo, isDateFromPickerVisible, isDateToPickerVisible } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.orderHistory.title} token={this.props.token} />
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    {isLoading ?
                        <ActivityIndicator size='large' color='#fff' />
                        :
                        <FlatList
                            data={this.state.historyData}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id + ''}
                            ListEmptyComponent={() => this.listEmptyComponent()}
                        // refreshControl={
                        //     <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={'#fff'}/>
                        // }
                        />
                    }
                </Animatable.View>

            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    };
};


export default connect(mapStateToProps)(OrderHistory);
