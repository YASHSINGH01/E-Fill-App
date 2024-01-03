//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Image, FlatList, Linking, Modal, Platform } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { showMessage } from "react-native-flash-message";
import moment from "moment";
//Api
import HttpRequest from "../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { chargingPointInfo, bookChargerInfo, bookingInfo } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Components
import Header from '../../components/Header';
//Styles
import styles from './styles';
import { Images } from "../../constants/";
import { strings } from '../../utils/translations';


const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

class BookCharger extends Component {
    constructor(props){
        super(props);

        this.inputRefs1 = { picker: null }
        this.inputRefs2 = { picker: null }
        this.inputRefs3 = { picker: null }
    
        this.state = {
            isLoading: true,
            cs_id: '',
            phone: '',
            vehicle: '',
            type: '',
            filter: '',
            vehicleData: [],
            connectorTypeData: [],
            chargingPointData: [],
            charging_points: [],
            date: '',
            startTime: '',
            endTime: '',
            isDatePickerVisible: false,
            isStartTimePickerVisible: false,
            isEndTimePickerVisible: false,
            show: false,
            mode: 'date',
            isAndroidVehiclePickerVisible: false,
            isAndroidConnectorPickerVisible: false,
            isAndroidFilterPickerVisible: false
        };
    }

    componentDidMount = () => {
        this.getAllVehicles();
       
    }

    getAllVehicles = () => {
        this.setState({
            cs_id: this.props.route.params.cs_id,
            phone: this.props.route.params.phone,
        });
        const vehicles = [];
        HttpRequest.getVehicles(this.props.token)
        .then(res => {
            const result = res.data;
            if (res.status == 200 && !result.error ) {
                // console.log("All Vehicles  API Response ---------- ", result);
                result.data.map((item, i) => {
                    vehicles.push({
                        key: i,
                        label: item.model,
                        value: item.id,
                        connector: item.connector,
                        model_id: item.model_id
                    });
                });
                // console.log("All Vehicles  API Response ---------- ", vehicles);
                this.setState({ vehicleData: vehicles });
                // this.getAllConnectors();
               
            } else {
                console.log("All Vehicles API Error : ",result);
            }
        })
        .catch(err => {
            console.log("All Vehicles  API Catch Exception: ",err);
        });
        wait(1000).then(() => 
            this.getAvailableChargingPoints()
        );
    }

    //Get Connectors Type List through API
    getAllConnectors = () => {
        const connectors = [];
        HttpRequest.getConnectorsList(this.props.token)
        .then(res => {
            const result = res.data;
            // console.log("Get Connectors List API Response ---------- ", result);
            if (res.status == 200 && !result.error) {
                result.data.map((item, i) => {
                    connectors.push({
                        key: i,
                        label: item.connector_name+' ('+ item.connector_type+') ',
                        value: item.connector_name
                    });
                });
               this.setState({ connectorTypeData: connectors });
            } else {
                console.log("Get Connectors List API Error : ",result);
            }
        })
        .catch(err => {
            //console.log("Get Connectors List API Catch Exception: ",err);
        });
    }

    //Get Available Charging List of specific charging station through API
    getAvailableChargingPoints = () => {
        let { cs_id } = this.state;
        HttpRequest.availableChargingPoints({ cs_id: cs_id },this.props.token)
        .then(res => {
            const result = res.data;
            // console.log("Get Available Charging Points List API Response ---------- ", result.data);
            if (res.status == 200 && !result.error) {
                this.setState({
                    chargingPointData: [],
                });
                result.data.map((item, i) => {
                    this.renderChargingPointConnectors(item);
                });
            } else {
                this.setState({ isLoading: false, refreshing: false });
                // console.log("Get Available Charging Points  List API Error : ",result);
            }
        })
        .catch(err => {
            this.setState({ isLoading: false, refreshing: false });
            //console.log("Get Available Charging Points  List API Catch Exception: ",err);
        });
    }

    renderChargingPointConnectors = (item) => {
        if(item.connector.length > 0) {
        item.connector.map((sub, i) => {
           
            const newPoint = {
                "id"               : item.id,
                "name"             : item.name +(item.connector.length > 1 ? '['+(i+1)+']': ''),
                "capacity"         : item.capacity,
                "unitPrice"        : item.unitPrice,
                "connector_type_id": sub.connector_id,
                "connector_id"     : sub.id,
                "connector_no"     : item.connector.length > 1 ? i+1 : 1,
                "vehicleType"      : sub.vehicleType,
                "connector_type"   : sub.connectorType,
                "connectorName"    : sub.connectorName,
                "connectorImage"   : sub.connectorImage
            }
            this.setState({ 
                chargingPointData: [...this.state.chargingPointData, newPoint],
                charging_points  : [...this.state.chargingPointData, newPoint],
                isLoading        : false,                                       refreshing: false
            })
        });
        } else {
            const newPoint = {
                "id"               : item.id,
                "name"             : item.name,
                "capacity"         : item.capacity,
                "unitPrice"        : item.unitPrice,
                "connector_type_id": "",
                "connector_id"     : "",
                "connector_no"     : "",
                "vehicleType"      : '',
                "connector_type"   : '',
                "connectorName"    : '',
                "connectorImage"   : ''
            } 
           
            this.setState({ 
                chargingPointData: [...this.state.chargingPointData, newPoint],
                charging_points  : [...this.state.chargingPointData, newPoint],
                isLoading        : false,                                       refreshing: false
           })
        }
    }

    onPickerValueChange = (value, index, input) => {
        const { vehicle, type, filter, chargingPointData, charging_points  } = this.state;
        if(vehicle != value && input == 'vehicle') {
            if(Platform.OS == 'ios') {
                this.setState({vehicle: value, isAndroidVehiclePickerVisible: false });
            }else {
                this.setState({vehicle: value });
                this.inputRefs1.picker.togglePicker();
            }
            if(value != null){
                this.setAvailableConnectors(value);
            }
        } else if(type != value && input == 'connector') {
            if(Platform.OS == 'ios') {
                this.setState({type: value, isAndroidConnectorPickerVisible: false });
            }else {
                this.setState({ type: value });
                this.inputRefs2.picker.togglePicker();
            }
            if( value != 0 ){
                this.setState({ chargingPointData: charging_points.filter((item) => { return item.connectorName == value }) });
            }else {
                // console.log('Get Available Charging Points');
                this.getAvailableChargingPoints();
            }
        } else if(filter != value && input == 'filter') {
            if(Platform.OS == 'ios') {
                this.setState({filter: value, isAndroidFilterPickerVisible: false });
            } else {
                this.setState({filter: value });
                this.inputRefs3.picker.togglePicker();
            }
            if(value == 0 || value == 1){
                //sort by capacity
                chargingPointData.sort((a, b) => {return parseInt(b.capacity)  - parseInt(a.capacity)});
               
            }else {
                //sort by price
                chargingPointData.sort((a, b) => {return parseInt(a.unitPrice)  - parseInt(b.unitPrice)});
            }
        }
    }

    setAvailableConnectors = (id) => {
        let { vehicleData } = this.state;
        const connectors = [];
        vehicleData =  vehicleData.filter((item) =>  { return item.value == id } );
        if(vehicleData != null ){
            if(vehicleData[0].connector.length > 0){
                vehicleData[0].connector.map((item, i) => {
                    // console.log(item);
                    let label = item.connector_type != undefined ? item.connector_name+' ('+ item.connector_type+') ' : item.connector_name
                    connectors.push({
                        key: i,
                        label: label,
                        value: item.connector_name
                    });
                });
                this.setState({ connectorTypeData: connectors });
            }
        } 
    }

    dialCall = () => {
        let { phone } = this.state;
        let phoneNumber = phone;
        phoneNumber = phoneNumber.replace(/\s/g, '');
        if(phoneNumber.startsWith("+")){
            var temp = phoneNumber.substring(3, phoneNumber.length);
            phoneNumber = "0"+temp;
        }
        // console.log("phone: ",phoneNumber);
        if (Platform.OS === 'android') {
          phoneNumber = 'tel:${'+phoneNumber+'}';
        }
        else {
          phoneNumber = 'telprompt:${'+phoneNumber+'}';
        }
    
        Linking.canOpenURL(phoneNumber)
		.then((supported) => {
			if (supported) {
				return Linking.openURL(phoneNumber)
					.catch(() => null);
			}
		});
    };

    open(type) { 
        let { vehicle } = this.state;
        if(type == 'vehicle'){
            if(Platform.OS == "ios"){
                this.inputRefs1.picker.togglePicker(true);
            }else {
                this.setState({ isAndroidVehiclePickerVisible: true});
            }
        } else if(type == 'connector') {
            if(vehicle != ''){
                if(Platform.OS == "ios"){
                    this.inputRefs2.picker.togglePicker(true);
                }else {
                    this.setState({ isAndroidConnectorPickerVisible: true});
                }
            }else {
                showMessage({
                    message: strings.bookCharger.error.title,
                    description: strings.bookCharger.error.vehicle,
                    type: "danger",
                });
            }
        } else if(type == 'filter') {
            if(Platform.OS == "ios"){
                this.inputRefs3.picker.togglePicker(true);
            }else {
                this.setState({ isAndroidFilterPickerVisible: true});
            }
        } else if(type == 'date') {
            this.showDatepicker();
        } else if(type == 'startTime') {
            this.showTimepicker('startTime')
        } else {
            this.showTimepicker('endTime')
        }
        
    }

    showMode = (currentMode) => {
        this.setState({
            mode: 'date',
            show: true
        })
    }

    showDatepicker = () => {
        this.showMode('date');
    }

    showTimepicker = (time) => {
        this.showMode(time);
    }

    formatDate = (date = '') => {
        return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)
    }

    getCurrentDate = () =>{
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
   
        return year + '-' + ("0" + month).slice(-2)+ '-' + ("0" + date).slice(-2);
    }

    formatTime = (time = '') => {
        return ("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2)
    }

    formatTimer = (time = '') => {
        return time;
        //return ("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2)+ ":00"
    }

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false});
    };
    
    handleDateConfirm = (date) => {
        this.setState({date: date, isDatePickerVisible: false});
    };

    hideStartTimePicker = () => {
        this.setState({ isStartTimePickerVisible: false});
    };

    handleStartTimeConfirm = (time) => {
        let { endTime } = this.state;
        let newTime = this.getUpdateMinutes(time);
        // console.log("Start Time: ", newTime);
        // console.log("End Time: ", endTime);
        if(endTime != ''){
            if(endTime != newTime){
                this.setState({startTime: newTime, isStartTimePickerVisible: false})
            }else {
                this.setState({startTime: '', isStartTimePickerVisible: false})
                showMessage({
                    message: strings.bookCharger.error.title,
                    description: strings.bookCharger.error.startTime,
                    type: "danger",
                });
            }
        }else {
            this.setState({startTime: newTime, isStartTimePickerVisible: false});
        }
    };

    hideEndTimePicker = () => {
        this.setState({ isEndTimePickerVisible: false});
    };

    handleEndTimeConfirm = (time) => {
        let { startTime } = this.state;

        let newTime = this.getUpdateMinutes(time);
        // console.log("Start Time: ", startTime);
        // console.log("End Time: ", newTime);
        if(startTime != ''){
            if(startTime != newTime){
                this.setState({endTime: newTime, isEndTimePickerVisible: false})
            }else {
                this.setState({endTime: '', isEndTimePickerVisible: false})
                showMessage({
                    message: strings.bookCharger.error.title,
                    description: strings.bookCharger.error.endTime,
                    type: "danger",
                });
            }
        }else {
            this.setState({endTime: newTime, isEndTimePickerVisible: false})
        }
    };

    getUpdateMinutes = (time) => {
        let newTime = moment(time, "HH:mm");
        round_interval = 30;//15;

        intervals = Math.floor(newTime.minutes() / round_interval);
        minutesToRound = newTime.minutes() % round_interval;
        minutesRounded = minutesToRound>round_interval/2 ? round_interval: 0;
        minutes = intervals * round_interval + minutesRounded;
    
        return newTime.minutes(minutes).format("HH:mm");
    }

    bookNow = (item, typeNavigate = 'button') => {
        let { date, startTime, endTime, vehicle, type } = this.state;
        // console.log("Book Now",item);
        
        if(vehicle == ''){
            showMessage({
                message: strings.bookCharger.error.title,
                description: strings.bookCharger.error.vehicle,
                type: "danger",
            });
        } else if(type == '') {
            showMessage({
                message: strings.bookCharger.error.title,
                description: strings.bookCharger.error.connector,
                type: "danger",
            });
        } else {
           // console.log("this.props.chargingPointInfo+++",item);
            this.props.chargingPointInfo(item);
            const book_charger_details = {
                vehicle: vehicle,
                booking_date: date != '' ? this.formatDate(date) : this.getCurrentDate(),
                start_time: startTime != '' ? this.formatTimer(startTime) : startTime,
                end_time: endTime != '' ? this.formatTimer(endTime) : endTime,
            };
           // console.log("Book Charger Details: ", book_charger_details)
            this.props.bookChargerInfo(book_charger_details); //Save details in global state
           
            if(typeNavigate == 'button'){
                if (date != '' && startTime != '' && endTime !='') {
                    // console.log('Booking Date & Start-End time selected. Now check scheduled time slots.');
                    this.scheduleCheck(item);
                } else {
                    // console.log('Booking Date not selected.No check Available Time Slots');
                    this.checkAvailableTimeSlots(item);
                }
            } else {
                this.checkAvailableTimeSlots(item);
            }
        } 
    }

    scheduleCheck = (item) => {
        let { cs_id, date, startTime, endTime, vehicle } = this.state;
      
        HttpRequest.checkSchedule({ cs_id: cs_id, cp_id: item.id, connector_type: item.connector_type_id , connector_id: item.connector_id , charge_date: date != '' ? this.formatDate(date) : this.getCurrentDate(), charge_time: startTime != '' ? this.formatTimer(startTime): startTime, end_time: endTime != '' ? this.formatTimer(endTime) : endTime  },this.props.token)
        .then(res => {
            const result = res.data;
            // console.log("Check Schedule API Response ---------- ", result);
            if (res.status == 200 && !result.error) {
                    //Save details in global state
                    this.props.bookingInfo({
                        selected_date: this.formatDate(date),
                        selected_startTime: this.formatTimer(startTime),
                        selected_endTime: this.formatTimer(endTime),
                    }); 
                
                    this.props.navigation.navigate('PaymentGateway', { processType: 1, vehicle_id: vehicle });
            } else {
                showMessage({
                    message: strings.bookCharger.error.title,
                    description: strings.bookSchedule.response.error.slotNotAvailable+' '+this.formatTimer(startTime)+' - '+this.formatTimer(endTime)+' '+strings.bookSchedule.response.error.slotNotAvailableEnd,
                    type: "danger",
                });
            }
        })
        .catch(err => {
            console.log("Check Schedule  API Catch Exception: ",err);
            showMessage({
                message: strings.bookCharger.error.title,
                description: strings.bookCharger.error.requestFailed,
                type: "danger",
            });
        });
    }

    //Check if there is any available time slot for the date & time selected by user
    checkAvailableTimeSlots = (item) => {
        let { cs_id, date, startTime, endTime, vehicle } = this.state;
        let { connector_id } = this.props.charging_point_info;

        const time = [];
        HttpRequest.checkAvailableSlots({ cs_id: cs_id, connector_id: connector_id, charge_date: date != '' ? this.formatDate(date) : this.getCurrentDate(), start_time: startTime != '' ? this.formatTimer(startTime): startTime, end_time: endTime != '' ? this.formatTimer(endTime) : endTime },this.props.token)
        .then(res => {
            const result = res.data;
            console.log("ok",result);
            console.log("Check Available Slots API Response ---------- ", result);
            if (res.status == 200 && !result.error) {
                if(result.available_slot != null) {
                    const slotsArray = Object.entries(result.available_slot);
                    slotsArray.forEach(([key, value]) => {
                        time.push(value);
                    });
                }
                //console.log('Available time slot: ', time);
                if(time.length > 0) {
                    this.props.navigation.navigate("BookSchedule", { screen: "BookSchedule", time: time, booked_slot: result.booked_slot});
                } else {
                    //console.log('Available time slot is empty');
                    this.props.navigation.navigate("BookSchedule", { screen: "BookSchedule"});
                }
            } else {
                //console.log("Get Connectors List API Error : ",result);
                showMessage({
                    message: strings.bookCharger.error.title,
                    description: strings.bookCharger.error.requestFailed,
                    type: "danger",
                });
            }
        })
        .catch(err => {
            //console.log("Get Connectors List API Catch Exception: ",err);
            showMessage({
                message: strings.bookCharger.error.title,
                description: strings.bookCharger.error.requestFailed,
                type: "danger",
            });
        });
    }

    getScheduleTimeDuration = () => {
        let { startTime, endTime } = this.state;
        let start_Time       = moment(startTime, "hh:mm"); //Start Time
        let end_Time         = moment(endTime, "hh:mm"); //End Time
        let timeDifference   = end_Time.diff(start_Time, 'minutes');
        return Math.abs(timeDifference/60).toFixed(2);
    }

    renderItem = ({item}) => {
    console.log("ok",item);
        return (<View style={styles.item}>
        {/* Charging Station Image & Ratings */}
            <View style={styles.row}>
                <View style={[styles.col,{ flex: 2, alignItems: 'center'}]}>
                    {item.connectorImage != '' ?
                    <Image source={{uri:item.connectorImage}} style={styles.image}/>
                    : 
                    <Image source={Images.stationThumbnail} style={styles.image}/>
                    }
                    <Text style={[styles.text,styles.medium, {width:'100%', textAlign: 'center'}]} numberOfLines={1}>{(item.connector_type).toUpperCase() == 'AC' ? 'AC (Slow)' : (item.connector_type).toUpperCase() == 'DC' ? 'DC(Fast)' : item.connector_type  }</Text>
                    <Text style={[styles.text,styles.medium, {width:'100%', textAlign: 'center'}]} numberOfLines={1}>{parseFloat(item.capacity).toFixed(2)+' Kwh'}</Text>
                </View>
                <View style={[styles.content,{ flex: 3}]}>
                    <View style={styles.row}>
                        <Text style={[styles.text, styles.title]} numberOfLines={1}>{item.name}</Text>
                    </View>
                    <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center'}]}>
                        <Text style={[styles.text,styles.description]}>{strings.bookCharger.unit}</Text>
                        <Text style={[styles.text,styles.description, {textAlign: 'left'}]}>
                        {( this.state.date !='' && this.state.startTime !='' && this.state.endTime!= '' ? parseFloat(parseFloat(item.capacity).toFixed(2) *  parseFloat(this.getScheduleTimeDuration()).toFixed(2)).toFixed(2) : parseFloat(item.capacity).toFixed(2) )}
                        </Text>
                    </View>
                    <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center'}]}>
                        <Text style={[styles.text,styles.description]}>{strings.bookCharger.price}</Text>
                        <Text style={[styles.text,styles.description, {textAlign: 'left',color: '#05294b', fontWeight: '600'}]}>₹ {( this.state.date !='' && this.state.startTime !='' && this.state.endTime!= '' ? parseFloat(item.unitPrice * (parseFloat(item.capacity).toFixed(2) * this.getScheduleTimeDuration())).toFixed(2) : parseFloat(item.unitPrice * parseFloat(item.capacity).toFixed(2)).toFixed(2) )}
                        
                        </Text>
                    </View>
                    <View style={styles.row}>
                    
                        <TouchableOpacity onPress={() => this.bookNow(item, 'button')} style={{ width: '90%'}}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.button}>
                                { this.state.isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                                    <Text style={styles.buttonText}>{strings.bookCharger.bookNow}</Text>
                                } 
                            </LinearGradient>
                        </TouchableOpacity>  
                    </View>
                </View>
                <View style={styles.actionContent}>
                    <TouchableOpacity onPress={() => this.bookNow(item, 'calendar')}  style={{ flex:1, width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 5}}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.iconAction}>
                            <Icon size={30} name={'ios-calendar'} color={'#05294b'} />
                        </LinearGradient>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={() => this.dialCall()} style={{ flex:1, width:'100%', justifyContent: 'center', alignItems: 'center'  }}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#22BC9D', '#A4FF8B']} style={styles.iconAction}>
                            <Icon size={30} name={'ios-call'} color={'#05294b'} />
                        </LinearGradient>
                    </TouchableOpacity>        
                </View>
            </View>
        </View>)
    }

    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>{strings.bookCharger.notFound}</Text>
        </View>
    )
    
    getSelectedVehicle = (value) => {
        let { vehicleData } = this.state;
        let selectedVehicle =  vehicleData.find(item => item.value === value);
        return selectedVehicle != undefined ? selectedVehicle.label : strings.bookCharger.vehicleModelPlaceholder;
    }

    getSelectedConnector = (value) => {
        let { connectorTypeData } = this.state;
        let selectedConnector =  connectorTypeData.find(item => item.value === value);
        return selectedConnector != undefined ? selectedConnector.label : strings.bookCharger.connectorTypePlaceholder;
    }
    
    render() {
        let { navigation } =  this.props;
        let { isLoading, cs_id, phone, vehicleData, connectorTypeData, chargingPointData, vehicle, type, date, startTime, endTime, filter, mode, show, isDatePickerVisible, isStartTimePickerVisible, isEndTimePickerVisible, isAndroidVehiclePickerVisible, isAndroidConnectorPickerVisible, isAndroidFilterPickerVisible } = this.state;
        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.bookCharger.title}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    {/* Select Vehicle Manufacturer & Model */}
                    { isLoading ?  
                        <View style={styles.noDataFoundContainer}>
                            <ActivityIndicator size='large' color='#fff' /> 
                        </View>
                    : 
                    <FlatList
                        data={chargingPointData}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => item.name+''+item.connector_type
                        +''+index}
                        ListEmptyComponent={() => this.listEmptyComponent()}
                        ListHeaderComponent={ 
                            <View style={styles.scrollView}>
                                <View style={styles.formField}>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={styles.label}>{strings.bookCharger.vehicleNumber} *</Text>
                                    </View>
                                    <View style={styles.selectBoxField}>
                                        { Platform.OS == "ios" &&
                                        <TouchableOpacity activeOpacity={5} style={styles.pickerContainer} onPress={() => { this.open('vehicle')}}>
                                            <RNPickerSelect
                                                ref={el => {this.inputRefs1.picker = el}}
                                                useNativeAndroidPickerStyle={false}
                                                style={{inputIOS: styles.IOSDark, inputAndroid: styles.androidDark}}
                                                placeholder={{label: strings.bookCharger.vehicleModelPlaceholder,value: null}}
                                                onValueChange={(value, index) => this.onPickerValueChange(value, index, 'vehicle')}
                                                value={vehicle}
                                                items={vehicleData}
                                            />
                                            <Icon
                                                size={20}
                                                name={'ios-chevron-down'}
                                                color={'#05294b'}
                                            /> 
                                        </TouchableOpacity>
                                        }
                                        { Platform.OS == "android" &&
                                        <TouchableOpacity style={styles.pickerContainer} activeOpacity={1} onPress={() => { this.open('vehicle')}} >
                                            <View style={styles.androidRow}>
                                                <Text style={[styles.pickerText, vehicle != '' ? this.getSelectedVehicle(vehicle) != strings.bookCharger.vehicleModelPlaceholder ? styles.activePickerText : null : null ]}>{ vehicle != '' ? this.getSelectedVehicle(vehicle)  : strings.bookCharger.vehicleModelPlaceholder}</Text>
                                                <Icon
                                                    size={20}
                                                    name={'ios-chevron-down'}
                                                    color={'#05294b'}
                                                /> 
                                            </View>              
                                        </TouchableOpacity>
                                        }
                                    </View>
                                </View>  
                                { vehicleData != '' &&
                                <Modal animationType="fade" transparent={true} visible={isAndroidVehiclePickerVisible} >
                                    <TouchableOpacity activeOpacity={1} style={styles.modalBody} onPress={()=> this.setState({isAndroidVehiclePickerVisible: false})}>
                                        <View style={styles.modalContainer}>
                                            <ScrollView vertical contentContainerStyle={styles.modalScrollView}>
                                                <View  style={[styles.resultItem, styles.resultItemBorder ]}>
                                                    <Text style={[styles.resultText, styles.resultName, styles.resultPlaceholder]}>{strings.bookCharger.vehicleModelPlaceholder}</Text>
                                                </View>
                                                {vehicleData.map((item, i) => (
                                                    <TouchableOpacity activeOpacity={0.4} key={item.key} style={[styles.resultItem, i != vehicleData.length - 1 ? styles.resultItemBorder : null]} onPress={()=> this.onPickerValueChange(item.value, item.key, 'vehicle')}>
                                                        <Text style={[styles.resultText, styles.resultName]}>{item.label}</Text>
                                                    </TouchableOpacity>
                                            ))}
                                            </ScrollView>
                                        </View>
                                    </TouchableOpacity>
                                </Modal>
                                }
                                <View style={styles.formField}>  
                                    <Text style={styles.label}>{strings.bookCharger.connectorType} *</Text>
                                    <View style={styles.selectBoxField}>
                                        { Platform.OS == "ios" &&
                                        <TouchableOpacity activeOpacity={5} style={styles.pickerContainer} onPress={() => { this.open('connector')}}>
                                            <RNPickerSelect
                                                ref={el => {this.inputRefs2.picker = el}}
                                                useNativeAndroidPickerStyle={false}
                                                style={{inputIOS: styles.IOSDark, inputAndroid: styles.androidDark}}
                                                placeholder={{label: strings.bookCharger.connectorTypePlaceholder,value: 0}}
                                                onValueChange={(value, index) => this.onPickerValueChange(value, index, 'connector')}
                                                value={type}
                                                items={connectorTypeData}
                                            />
                                            <Icon
                                                size={20}
                                                name={'ios-chevron-down'}
                                                color={'#05294b'}
                                            /> 
                                        </TouchableOpacity>
                                        }
                                        { Platform.OS == "android" &&
                                        <TouchableOpacity style={styles.pickerContainer} activeOpacity={1} onPress={() => { this.open('connector')}} >
                                            <View style={styles.androidRow}>
                                                <Text style={[styles.pickerText, type != '' ? this.getSelectedConnector(type) != strings.bookCharger.connectorTypePlaceholder ? styles.activePickerText : null : null ]}>{ type != '' ? this.getSelectedConnector(type)  : strings.bookCharger.connectorTypePlaceholder}</Text>
                                                <Icon
                                                    size={20}
                                                    name={'ios-chevron-down'}
                                                    color={'#05294b'}
                                                /> 
                                            </View>              
                                        </TouchableOpacity>
                                        }
                                    </View>
                                </View>
                                { connectorTypeData != '' &&
                                <Modal animationType="fade" transparent={true} visible={isAndroidConnectorPickerVisible} >
                                    <TouchableOpacity activeOpacity={1} style={styles.modalBody} onPress={()=> this.setState({isAndroidConnectorPickerVisible: false})}>
                                        <View style={styles.modalContainer}>
                                            <ScrollView vertical contentContainerStyle={styles.modalScrollView}>
                                                <View  style={[styles.resultItem, styles.resultItemBorder ]}>
                                                    <Text style={[styles.resultText, styles.resultName, styles.resultPlaceholder]}>{strings.bookCharger.connectorTypePlaceholder}</Text>
                                                </View>
                                                {connectorTypeData.map((item, i) => (
                                                    <TouchableOpacity activeOpacity={0.4} key={item.key} style={[styles.resultItem, i != connectorTypeData.length - 1 ? styles.resultItemBorder : null]} onPress={()=> this.onPickerValueChange(item.value, item.key, 'connector')}>
                                                        <Text style={[styles.resultText, styles.resultName]}>{item.label}</Text>
                                                    </TouchableOpacity>
                                            ))}
                                            </ScrollView>
                                        </View>
                                    </TouchableOpacity>
                                </Modal>
                                }
                                {/*<View style={styles.formField}>
                                    <View style={styles.itemBoxContainer}>
                                        <View style={styles.itemBoxField}>
                                            <Icon size={30} name={'ios-calendar-outline'} color={'#fff'} /> 
                                            <TouchableOpacity activeOpacity={5} style={styles.pickerContainer} onPress={() => { this.setState({ isDatePickerVisible: true })}}>
                                                <Text style={styles.placeholderText}>{ date !== '' ? this.formatDate(date) : strings.bookCharger.bookingDate}</Text>
                                                <Icon
                                                    size={20}
                                                    name={'ios-chevron-down'}
                                                    color={'#fff'}
                                                /> 
                                            </TouchableOpacity>
                                            { Platform.OS == "android" ?
                                            <DateTimePickerModal
                                                isVisible={isDatePickerVisible}
                                                mode="date"
                                                headerTextIOS={strings.bookCharger.bookingDatePlaceholder}
                                                onConfirm={this.handleDateConfirm}
                                                onCancel={this.hideDatePicker}
                                            /> : 
                                            <DateTimePickerModal
                                                isVisible={isDatePickerVisible}
                                                mode="date"
                                                display={'spinner'}
                                                headerTextIOS={strings.bookCharger.bookingDatePlaceholder}
                                                onConfirm={this.handleDateConfirm}
                                                onCancel={this.hideDatePicker}
                                            />
                                            }
                                        </View>
                                        <View style={styles.itemBoxDivider} />
                                        <View style={styles.itemBoxField}>
                                        <Icon size={30} name={'ios-timer-outline'} color={'#fff'}  /> 
                                            <TouchableOpacity activeOpacity={5} style={styles.pickerContainer} onPress={() => { this.setState({ isStartTimePickerVisible: true })}}>
                                                <Text style={styles.placeholderText}>{ startTime !== '' ? startTime : strings.bookCharger.startTime}</Text>
                                                <Icon
                                                    size={20}
                                                    name={'ios-chevron-down'}
                                                    color={'#fff'}
                                                /> 
                                            </TouchableOpacity>
                                            { Platform.OS == "android" ?
                                            <DateTimePickerModal
                                                isVisible={isStartTimePickerVisible}
                                                mode="time"
                                                minuteInterval={30}
                                                headerTextIOS={strings.bookCharger.startTimePlaceholder}
                                                onConfirm={this.handleStartTimeConfirm}
                                                onCancel={this.hideStartTimePicker}
                                            />: 
                                            <DateTimePickerModal
                                                isVisible={isStartTimePickerVisible}
                                                mode="time"
                                                display={'spinner'}
                                                minuteInterval={30}
                                                headerTextIOS={strings.bookCharger.startTimePlaceholder}
                                                onConfirm={this.handleStartTimeConfirm}
                                                onCancel={this.hideStartTimePicker}
                                            />
                                            }
                                        </View>
                                        <View style={styles.itemBoxDivider} />
                                        <View style={styles.itemBoxField}>
                                            <Icon size={30} name={'ios-timer-outline'} color={'#fff'} /> 
                                            <TouchableOpacity activeOpacity={5} style={styles.pickerContainer} onPress={() => { this.setState({ isEndTimePickerVisible: true })}}>
                                                <Text style={styles.placeholderText}>{ endTime !== '' ? endTime : strings.bookCharger.endTime}</Text>
                                                <Icon
                                                    size={20}
                                                    name={'ios-chevron-down'}
                                                    color={'#fff'}
                                                /> 
                                            </TouchableOpacity>
                                            { Platform.OS == "android" ?
                                            <DateTimePickerModal
                                                isVisible={isEndTimePickerVisible}
                                                mode="time"
                                                minuteInterval={30}
                                                headerTextIOS={strings.bookCharger.endTimePlaceholder}
                                                onConfirm={this.handleEndTimeConfirm}
                                                onCancel={this.hideEndTimePicker}
                                            />: 
                                            <DateTimePickerModal
                                                isVisible={isEndTimePickerVisible}
                                                mode="time"
                                                display={'spinner'}
                                                minuteInterval={30}
                                                headerTextIOS={strings.bookCharger.endTimePlaceholder}
                                                onConfirm={this.handleEndTimeConfirm}
                                                onCancel={this.hideEndTimePicker}
                                            />
                                            }
                                        </View>
                                    </View>
                                        </View>*/}
                               {/* <View style={styles.formField}>
                                    <View style={styles.itemBoxDivider} />
                                    <View style={styles.filterBoxField}>
                                            <Icon size={20}  name={'ios-funnel'} color={'#fff'}/> 
                                            <TouchableOpacity activeOpacity={5} style={styles.filterPickerContainer} onPress={() => { this.open('filter')}}>
                                                <RNPickerSelect
                                                    ref={el => {this.inputRefs3.picker = el}}
                                                    useNativeAndroidPickerStyle={false}
                                                    style={{inputIOS: styles.filterIOS, inputAndroid: styles.filterAndroid}}
                                                    placeholder={{label: strings.bookCharger.sortConnector, value: 0}}
                                                    onValueChange={(value, index) => this.onPickerValueChange(value, index, 'filter')}
                                                    value={filter}
                                                    items={[
                                                        { key: 1,label: strings.bookCharger.byCapacity, value: 1 },
                                                        { Key: 2, label: strings.bookCharger.byPrice, value: 2 },
                                                    ]}
                                                />
                                                <Icon
                                                    size={18}
                                                    name={'ios-chevron-down'}
                                                    color={'#fff'}
                                                    style={ Platform.OS =='android' ? { zIndex: 99, position: 'absolute', right: 0} : null}
                                                /> 
                                            </TouchableOpacity>
                                        </View>
                                                </View>*/}
                            </View>
                        }
                    />
                    }
                </Animatable.View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    
    return {
        token: state.token,
        charging_station_info: state.charging_station_info,
        charging_point_info: state.charging_point_info,
        book_charger_info: state.book_charger_info,
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        chargingPointInfo: bindActionCreators(chargingPointInfo, dispatch),
        bookChargerInfo: bindActionCreators(bookChargerInfo, dispatch),
        bookingInfo: bindActionCreators(bookingInfo, dispatch),
    };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(BookCharger);
