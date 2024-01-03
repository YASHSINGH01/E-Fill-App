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

class walletHistory extends Component {
    constructor(props){
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

        this.modalizeRef = React.createRef();
        this.onFocus = this.onFocus.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitDateFrom= this.onSubmitDateFrom.bind(this);
        this.onSubmitDateTo = this.onSubmitDateTo.bind(this);

        this.dateFromRef = this.updateRef.bind(this, 'dateFrom');
        this.dateToRef = this.updateRef.bind(this, 'dateTo');
    }
   
    componentDidMount = () => {
        
            this.getWalletHistory()
        

        // console.log("Converted Time Stamp:  ",moment('2021-09-03T05:16:59.333Z').format('MM/DD/YYYY HH:mm:ss'));

        // console.log("Converted Time Stamp:  ",moment('2021-09-08T10:39:18.826182Z').format('MM/DD/YYYY HH:mm:ss '));

        // console.log("Converted Time Stamp:  ",moment('2021-09-08T10:39:18.826182Z').format('YYYY-MM-DD'));

        // console.log("Converted Time Stamp:  ",moment('2021-09-08T10:39:18.826182Z').format('HH:mm:ss'));
    }

    onRefresh = () => {
        this.setState({ refreshing : true})
        this.getWalletHistory();
    }


    hideDatePicker = (type) => {
        if(type == 'isDateFromPickerVisible'){
            this.setState({ isDateFromPickerVisible: false});
        } else {
            this.setState({ isDateToPickerVisible: false});
        }
    };
    
    handleDateFromConfirm = (date) => {
        this.setState({dateFrom: date});
        this.hideDatePicker('isDateFromPickerVisible');
    };

    handleDateToConfirm = (date) => {
        this.setState({dateTo: date});
        this.hideDatePicker('isDateToPickerVisible');
    };


    formatDate = (date = '') => {
        return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)
    }


    onFocus() {
        let { errors = {} } = this.state;
  
        for (let name in errors) {
          let ref = this[name];
  
          if (ref && ref.isFocused()) {
            delete errors[name];
          }
        }
  
        this.setState({ errors });
    }

    onChangeText(text) {
        ['dateFrom', 'dateTo']
          .map((name) => ({ name, ref: this[name] }))
          .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
              this.setState({ [name]: text });
            }
          });
    }

    onSubmitDateFrom() {
        this.dateTo.focus();
    }

    onSubmitDateTo() {
        this.dateTo.blur();
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    //Get Order history through API 
    getWalletHistory = () => {
        HttpRequest.walletHistory(this.props.token)
        .then(res => {
            this.setState({ isLoading: false });
            const result = res.data;
            if (res.status == 200 && !result.error) {
               console.log("Get Order history API Response ---------- ", result);
               this.setState({ historyData:  result.data, refreshing: false});
              
            } else {
                this.setState({ refreshing: false ,isLoading:false});
                console.log("Get Order history API Error : ",result);
            }
        })
        .catch(err => {
            this.setState({ isLoading: false, refreshing: false });
            console.log("Get Order history API Catch Exception: ",err);
        });
    }

    filterHistory = () => {
        this.modalizeRef.current?.open();
    }

    onFilter = () => {
        let { dateFrom, dateTo, historyData } = this.state;
        if(historyData == '') {
            this.getWalletHistory();
        }else if(dateTo != '' && dateFrom != ''){
            historyData =  historyData.filter((item) =>  moment(item.created_at).isBetween (dateFrom, dateTo));
            this.setState({ historyData: historyData, dateFrom: '', dateTo: ''});
            console.log("histdjd");
        }
        this.modalizeRef.current?.close();
    }

    closeFilter = () => {
        this.onClear();
        this.modalizeRef.current?.close();
    }

    onClear = () => {
        this.setState({
            dateFrom: '',
            dateTo: ''
        });
    }


    renderItem = ({ item }) => (
          <TouchableOpacity style={styles.item}>
            <View style={styles.itemHeader}>
                {/* Charging Station Image & Ratings */}
                <View style={styles.row}>
                    <View style={[styles.content, { flex: 2}]}>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.title]}  numberOfLines={1}>{item.title}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent , {marginTop: 5}]}>

                            {/* <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.vehicleName}</Text> */}
                        </View>
                        <View style={[styles.row, styles.descriptionContent]}>

                           <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.message}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                            {/* <Text style={[styles.text,styles.description, styles.label]}>{strings.walletHistory.amount}</Text> */}
                            {/* <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.amount}</Text> */}
                        </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text,styles.description, styles.label]}>Date</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.date}</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text,styles.description, styles.label]}>Order ID</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.order_id}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.seperator} />
                <View style={styles.row}>
                    <View style={[styles.row, styles.bottomContent , {marginTop: 5}]}>
                        <View style={[styles.text,styles.description, styles.label]}>
                            <Icon
                                size={20}
                                name={'cash-outline'}
                                color={'#05294b'}
                                suppressHighlighting={true}
                            />
                        </View>
                        <Text style={[styles.text,styles.description, styles.leftAlign, { flex: 2}]} numberOfLines={2}>₹ {item.amount}</Text>
                        {/* <View style={[styles.text,styles.description, styles.label]}>
                            <Feather
                                size={20}
                                name={'clock'}
                                color={'#05294b'}
                                suppressHighlighting={true}
                            />
                        </View> */}
                        <Text style={[styles.text,styles.description, {marginRight:20}]} numberOfLines={1}>{item.wallet_type}</Text>
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
        let { navigation } =  this.props;
        let { isLoading, historyData, refreshing, isClear, dateFrom, dateTo, isDateFromPickerVisible, isDateToPickerVisible } = this.state;

        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.sidebar.walletHistory} filterHistory={this.filterHistory} token={this.props.token}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    { isLoading ?
                        <ActivityIndicator size='large' color='#fff' />
                        :
                        <FlatList
                            data={this.state.historyData}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id+''}
                            ListEmptyComponent={() => this.listEmptyComponent()}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={'#fff'}/>
                            }
                        />
                    }
                </Animatable.View>
                <Modalize ref={this.modalizeRef} adjustToContentHeight={true}>
                    <View style={styles.filterContainer}>
                        <View style={styles.filterRow}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => this.closeFilter()}>
                                <Icon
                                    size={30}
                                    name={'close-circle'}
                                    color={'#05294b'}
                                    suppressHighlighting={true}
                                />
                            </TouchableOpacity>
                            <View style={styles.rowItem}>
                                <Text style={styles.title}>{strings.orderHistory.filter.title}</Text>
                            </View>
                            <View style={styles.rowItem}>
                            </View>
                        </View>
                        <View style={styles.formField}>
                            <View style={styles.inputContainer}>
                                <TouchableOpacity activeOpacity={5} style={styles.inputText} onPress={() => { this.setState({ isDateFromPickerVisible: true })}}>
                                    <Text style={styles.placeholderText}>{ dateFrom !== '' ? this.formatDate(dateFrom) :  strings.orderHistory.filter.dateFrom}</Text>
                                    <Icon
                                        size={20}
                                        name={'calendar-outline'}
                                        color={'#9FA5AA'}
                                    />
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={isDateFromPickerVisible}
                                    mode="date"
                                    headerTextIOS={strings.orderHistory.filter.dateFrom}
                                    maximumDate={new Date()}
                                    onConfirm={this.handleDateFromConfirm}
                                    onCancel={this.hideDatePicker}
                                />
                            </View>
                        </View>
                        <View style={styles.formField}>
                                <View style={styles.inputContainer}>
                                    <TouchableOpacity activeOpacity={5} style={styles.inputText} onPress={() => { this.setState({ isDateToPickerVisible: true })}}>
                                        <Text style={styles.placeholderText}>{dateTo !== '' ? this.formatDate(dateTo) :  strings.orderHistory.filter.dateTo}</Text>
                                        <Icon
                                            size={20}
                                            name={'calendar-outline'}
                                            color={'#9FA5AA'}
                                        />
                                    </TouchableOpacity>
                                    <DateTimePickerModal
                                        isVisible={isDateToPickerVisible}
                                        mode="date"
                                        headerTextIOS={strings.orderHistory.filter.dateTo}
                                        maximumDate={new Date()}
                                        onConfirm={this.handleDateToConfirm}
                                        onCancel={this.hideDatePicker}
                                    />
                                </View>
                            </View>
                        <View style={[styles.filterRow, { justifyContent: 'space-evenly'}]}>
                            {/* Apply Filter */}
                            <TouchableOpacity onPress={!isLoading ? this.onFilter : null } >
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                                { isLoading ? <ActivityIndicator size='large' color={'#05294b'} /> :
                                <Text style={styles.buttonText}>{strings.filter.applyFilter}</Text>
                                }
                                </LinearGradient>
                            </TouchableOpacity>
                            {/* Clear / Trash Button */}
                            <TouchableOpacity onPress={!isClear ? this.onClear : null }>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.trashButton}>
                                { isClear ? <ActivityIndicator size='large' color={'#05294b'} /> :
                                    <Icon
                                        size={24}
                                        name={'ios-trash-outline'}
                                        color={'#05294b'}
                                    />
                                }
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modalize>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    };
};


export default connect(mapStateToProps)(walletHistory);
