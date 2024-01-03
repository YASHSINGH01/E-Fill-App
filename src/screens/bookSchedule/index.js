//User selection between SignIn & Create Account Screen
import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
  Platform,
  FlatList,
} from "react-native";
//Library
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";
import { showMessage } from "react-native-flash-message";
import { db } from "../../utils/FirebaseConfig";
import moment from "moment";
//Components
import Header from "../../components/Header";
//Api
import HttpRequest from "../../utils/HTTPRequest";
//Redux
import { connect } from "react-redux";
import {
  chargingPointInfo,
  bookChargerInfo,
  bookingInfo,
} from "../../Redux/Actions/Actions";
import { bindActionCreators } from "redux";
//Styles
import styles from "./styles";
// Theme Colors
import COLORS from "../../constants/colors";
import { strings } from "../../utils/translations";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  dayNamesShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};
LocaleConfig.defaultLocale = "fr";

const TIME = [
  "00:00:00",
  "00:30:00",
  "01:00:00",
  "01:30:00",
  "02:00:00",
  "02:30:00",
  "03:00:00",
  "03:30:00",
  "04:00:00",
  "04:30:00",
  "05:00:00",
  "05:30:00",
  "06:00:00",
  "06:30:00",
  "07:00:00",
  "07:30:00",
  "08:00:00",
  "08:30:00",
  "09:00:00",
  "09:30:00",
  "10:00:00",
  "10:30:00",
  "11:00:00",
  "11:30:00",
  "12:00:00",
  "12:30:00",
  "13:00:00",
  "13:30:00",
  "14:00:00",
  "14:30:00",
  "15:00:00",
  "15:30:00",
  "16:00:00",
  "16:30:00",
  "17:00:00",
  "17:30:00",
  "18:00:00",
  "18:30:00",
  "19:00:00",
  "19:30:00",
  "20:00:00",
  "20:30:00",
  "21:00:00",
  "21:30:00",
  "22:00:00",
  "22:30:00",
  "23:00:00",
  "23:30:00",
];

class BookSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
        isLoading: false,
        markedDates: {},
        selectedDate: "",
        selectedStartTime: "",
        selectedEndTime: "",
        start_time: this.props.charging_station_info.start_time,
        end_time: this.props.charging_station_info.end_time,
        manualTime: this.props.route.params.time != undefined ? true : false,
        manualDate: props.book_charger_info.booking_date != "" ? true : false,
        time: TIME,
        bookedSlots: [],
        };
    }

    componentDidMount = () => {
        //Display current date circle on the calendar
        this.setState({
        markedDates: {
            [this.getCurrentDate()]: {
            disabled: true,
            startingDay: true,
            endingDay: true,
            color: COLORS.DEFAULT,
            textColor: COLORS.PRIMARY,
            },
        },
        selectedDate: this.getCurrentDate(),
        });
        this.filterTimeSlot(this.getCurrentDate());

        this._checkData = this.props.navigation.addListener("focus", () => {
        this.checkData();
        });

        // db.ref('/EFILLXSLOTS/'+this.props.charging_point_info.name+'/').on('value', snapshot => {
        //     if (snapshot.val()) {
        //       this.setState({
        //           bookedSlots: snapshot.val()
        //       })
        //     } else {
        //         console.log('No Data found');
        //     }
        // });
    };

    checkData = () => {
        let { props } = this;
        let { time, manualTime, selectedDate, manualDate } = this.state;
        if (props.route.params.time != undefined) {
        if (props.route.params.time !== time && manualTime) {
            this.setState({
            time: props.route.params.time,
            manualTime: false,
            });
        }
        }

        if (
        props.book_charger_info.booking_date != "" &&
        props.book_charger_info.booking_date != selectedDate &&
        manualDate
        ) {
        this.setState({
            markedDates: {
            [props.book_charger_info.booking_date]: {
                disabled: true,
                startingDay: true,
                endingDay: true,
                color: COLORS.DEFAULT,
                textColor: COLORS.PRIMARY,
            },
            },
            selectedDate: props.book_charger_info.booking_date,
            manualDate: false,
        });
        }
    };

    componentWillUnmount() {
        this._checkData();
    }

    getCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        return year + "-" + ("0" + month).slice(-2) + "-" + ("0" + date).slice(-2);
    };

    getCurrentTime = () => {
        var time = new Date();
        time =
        ("0" + time.getHours()).slice(-2) +
        ":" +
        ("0" + time.getMinutes()).slice(-2) +
        ":" +
        +("0" + time.getSeconds()).slice(-2);
        return time;
    };

    checkAlreadyBookedSlots = (item) => {
        let {time, bookedSlots} = this.state;
        let previous_item = TIME[TIME.indexOf(item) - 1];
        let next_item = TIME[TIME.indexOf(item) + 1];
        if(bookedSlots != null){
            return bookedSlots.filter(function(e) { 
                return (e.charge_time <= item && e.end_time >= item)  }).length > 0;
        }else {
            return false;
        }
    }

    checkSlots = (item) => {
        let {time, bookedSlots} = this.state;
        let previous_item = TIME[TIME.indexOf(item) - 1];
        let next_item = TIME[TIME.indexOf(item) + 1];
        if(bookedSlots != null){
            return bookedSlots.filter(function(e) { 
                return (e.charge_time <= item && e.end_time >= item) && (e.charge_time <= previous_item && e.end_time >= previous_item ) && (e.charge_time <= next_item && e.end_time >= next_item ) }).length > 0;
        }else {
            return false;
        }
    }

    checkPreviousSlot = (time) => {
        let { bookedSlots} = this.state;
        let previous_time = TIME[TIME.indexOf(time) - 1];
        if(bookedSlots != null){
            return bookedSlots.filter(function(e) { 
                return (e.charge_time < previous_time &&  e.end_time > previous_time ) }).length > 0;
        }else {
            return false;
        }
    }

    selectTime = (time) => {
        let { selectedStartTime, selectedEndTime, bookedSlots } = this.state;
        
        if (selectedStartTime == "" && selectedEndTime == "") {
            console.log('Selected Start Time: ', time);
            this.setState({ selectedStartTime: time });
        } else if (selectedEndTime == "" && time > selectedStartTime) {
            console.log('Selected End Time: ', time);
            if(!this.checkPreviousSlot(time)){
                this.setState({ selectedEndTime: time });
            }
        } else {
        console.log("Else if Start Time & End Time is not blank");
        if (selectedStartTime > time) {
            console.log("Selected Time is less than Selected Start Time");
            this.setState({ selectedStartTime: time });
        } else if (selectedStartTime < time && time != selectedEndTime) {
            console.log("Selected Time is greater than Selected Start Time");
            this.setState({ selectedEndTime: time });
        } else if (selectedStartTime == time) {
            console.log("Selected Time is equal to Selected Start Time");
            this.setState({
            selectedStartTime: selectedEndTime,
            selectedEndTime: "",
            });
        } else if (selectedEndTime == time) {
            console.log("Selected Time is equal to Selected End Time");
            this.setState({ selectedEndTime: "" });
        }
        }
    };

    // Book Schedule Through Api
    onScheduleCheck = () => {
        this.setState({ isLoading: true });
        setTimeout(() => {
        this.setState({
            isLoading: false,
        });
        }, 1000);
    };

    filterTimeSlot = (date) => {
        let { id } = this.props.charging_station_info;
        let { connector_id } = this.props.charging_point_info;

        const time = [];
        HttpRequest.checkAvailableSlots(
        { cs_id: id, connector_id: connector_id, charge_date: date },
        this.props.token
        )
        .then((res) => {
            const result = res.data;
            // console.log("Get Connectors List API Response ---------- ", result);
            if (res.status == 200 && !result.error) {
            if (result.available_slot != undefined) {
                const slotsArray = Object.entries(result.available_slot);
                slotsArray.forEach(([key, value]) => {
                    time.push(value);
                });
                //console.log('Available Time Slots: ', time);
                this.setState({
                time: time,
                bookedSlots: result.booked_slot,
                });
            } else {
                //console.log('All slots are available. No Booking for this date');
                this.setState({
                time: TIME,
                bookedSlots: result.booked_slot,
                });
            }
            } else {
            console.log("Get available time slots List API Error : ", result);
            }
        })
        .catch((err) => {
            console.log("Get available time slots List API Catch Exception: ", err);
        });
    };

    onDayPress = (day) => {
        this.setState({
        markedDates: {
            [day.dateString]: {
            disabled: true,
            startingDay: true,
            endingDay: true,
            color: COLORS.DEFAULT,
            textColor: COLORS.PRIMARY,
            },
        },
        selectedDate: day.dateString,
        });
        this.filterTimeSlot(day.dateString);
    };

    formatTime = (time = "") => {
        var H = +time.substr(0, 2);
        var h = H % 12 || 12;
        var ampm = H < 12 ? " AM" : " PM";
        time = h + time.substr(2, 3) + ampm;
        return time;
    };

    getScheduleTimeDuration = () => {
        let { selectedStartTime, selectedEndTime } = this.state;
        let startTime = moment(selectedStartTime, "hh:mm:ss"); //Start Time
        let endTime = moment(selectedEndTime, "hh:mm:ss"); //End Time
        let timeDifference = endTime.diff(startTime, "minutes");
        // console.log("Time Difference: ",  Math.abs(timeDifference/60).toFixed(2));
        return Math.abs(timeDifference / 60).toFixed(2);
    };

    bookNow = (item) => {
        let { selectedDate, selectedStartTime, selectedEndTime } = this.state;
        let { id, connector_id, connector_type_id } =
        this.props.charging_point_info;

        if (selectedDate == "") {
        showMessage({
            message: strings.bookCharger.error.title,
            description: strings.bookSchedule.response.error.chargingDate,
            type: "danger",
        });
        } else if (selectedStartTime == "") {
        showMessage({
            message: strings.bookCharger.error.title,
            description: strings.bookSchedule.response.error.chargingStartTime,
            type: "danger",
        });
        } else if (selectedEndTime == "") {
        showMessage({
            message: strings.bookCharger.error.title,
            description: strings.bookSchedule.response.error.chargingEndTime,
            type: "danger",
        });
        } else {
        HttpRequest.checkSchedule(
            {
            cs_id: this.props.charging_station_info.id,
            cp_id: id,
            connector_type: connector_type_id,
            connector_id: connector_id,
            charge_date: selectedDate,
            charge_time: selectedStartTime,
            end_time: selectedEndTime,
            },
            this.props.token
        )
            .then((res) => {
            const result = res.data;
            //console.log("Check Schedule API Response ---------- ", result);
            if (res.status == 200 && !result.error) {
                //Save details in global state
                this.props.bookingInfo({
                selected_date: selectedDate,
                selected_startTime: selectedStartTime,
                selected_endTime: selectedEndTime,
                });
                // this.occupiedSlots({selected_date: selectedDate, selected_startTime: selectedStartTime, selected_endTime: selectedEndTime });
                this.props.navigation.navigate("PaymentGateway", {
                processType: 1,
                vehicle_id: this.props.book_charger_info.vehicle,
                });
            } else {
                showMessage({
                message: "Oops!",
                description:
                    strings.bookSchedule.response.error.slotNotAvailable +
                    " " +
                    this.formatTime(selectedStartTime) +
                    " - " +
                    this.formatTime(selectedEndTime) +
                    " " +
                    strings.bookSchedule.response.error.slotNotAvailableEnd,
                type: "danger",
                });
            }
            })
            .catch((err) => {
            console.log("Check Schedule  API Catch Exception: ", err);
            showMessage({
                message: "Oops!",
                description: strings.bookCharger.error.requestFailed,
                type: "danger",
            });
            });
        }
    };

    // occupiedSlots = (info) => {
    //     let { name } = this.props.charging_point_info;
    //     let { id } = this.props.info;
    //     try {
    //         db.ref('/EFILLXSLOTS/'+name+'/'+id+'/').once('value', snapshot => {
    //             if (!snapshot.val()) {
    //                 const newReference = db
    //                 .ref('EFILLXSLOTS/'+name+'/'+id+'/')
    //                 .push();
    //                 newReference.set(info)
    //                 .then(() =>  this.props.navigation.navigate('PaymentGateway', { processType: 1, vehicle_id: this.props.book_charger_info.vehicle }));
    //             } else {
    //                 if(bookedSlots.length > 0){
    //                     bookedSlots.map((item) => {

    //                     })
    //                 }
    //                 Object.keys(snapshot.val()).map((index, slots) => {
    //                     let val =  snapshot.val()[index];
    //                     console.log(index);
    //                     // if(index == val.user_id ){
    //                     //     //if any booked slots found for the auth user update it's slots if slots are different
    //                     //     console.log('Slots updated for the auth user if different: ', slots, ' info by user: ', info );
    //                     //     db.ref('EFILLXSLOTS/'+name+'/'+id+'/')
    //                     //     .update(info).then(() => this.props.navigation.navigate('PaymentGateway', { processType: 1, vehicle_id: this.props.book_charger_info.vehicle }));
    //                     // } else {
    //                     //     if((info.selected_date == val.selected_date && info.selected_startTime == val.selected_startTime && info.selected_endTime == val.selected_endTime) || (info.selected_date == val.selected_date && info.selected_startTime >= val.selected_startTime && info.selected_startTime < val.selected_endTime) || (info.selected_date == val.selected_date && info.selectedEndTime < val.selected_endTime && info.selectedEndTime > val.selected_startTime )) {
    //                     //         showMessage({
    //                     //             message: "Oops!",
    //                     //             description: 'This time slot is already booked.',
    //                     //             type: "danger",
    //                     //         });
    //                     //     } else {
    //                     //         let newReference = db
    //                     //         .ref('EFILLXSLOTS/'+name+'/'+id+'/')
    //                     //         .push();
    //                     //         //Add User Id to the slots
    //                     //         info.user_id = id;
    //                     //         newReference.set(info)
    //                     //         .then(() => this.props.navigation.navigate('PaymentGateway', { processType: 1, vehicle_id: this.props.book_charger_info.vehicle }));
    //                     //     }
    //                     }
    //                 });
    //             }
    //         });
    //     } catch(e) {
    //         console.log('Exception: ', e);
    //     }
    // }

    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
        <Text style={styles.noDataFoundText}>No slots available</Text>
        </View>
    );

  render() {
    let { navigation } = this.props;
    let {
      isLoading,
      markedDates,
      selectedDate,
      time,
      selectedStartTime,
      selectedEndTime,
      start_time,
      end_time,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header navigation={navigation} type={strings.bookSchedule.title} />
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.calendarContainer}>
              <Calendar
                minDate={new Date()}
                onDayPress={(day) => this.onDayPress(day)}
                onDayLongPress={(day) => this.onDayPress(day)}
                markedDates={markedDates}
                markingType={"period"}
                style={{
                  height: 350,
                }}
                disableMonthChange={true}
                hideExtraDays={true}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                  backgroundColor: COLORS.PRIMARY,
                  calendarBackground: COLORS.PRIMARY,
                  textSectionTitleColor: "#b6c1cd",
                  selectedDayBackgroundColor: "red",
                  selectedDayTextColor: "#ffffff",
                  todayTextColor: "#00adf5",
                  dayTextColor: COLORS.DEFAULT,
                  textDisabledColor: COLORS.ERROR,
                  dotColor: "#00adf5",
                  selectedDotColor: COLORS.DEFAULT,
                  arrowColor: COLORS.DEFAULT,
                  disabledArrowColor: "#d9e1e8",
                  monthTextColor: COLORS.DEFAULT,
                  indicatorColor: COLORS.DEFAULT,
                  textDayFontWeight: "300",
                  textMonthFontWeight: "bold",
                  textDayHeaderFontWeight: "300",
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16,
                }}
              />
              <Text style={styles.note}>{strings.bookSchedule.note}</Text>
            </View>

            <View style={styles.bodyContainer}>
              <View style={styles.col}>
                <View style={[styles.col, { marginVertical: 10 }]}>
                  <View style={[styles.row, { marginVertical: 5 }]}>
                    <Text style={styles.headerInfo}>
                      {strings.bookSchedule.morning}
                    </Text>
                    <Text style={styles.timeSlot}>
                      {this.formatTime(start_time)} - 12:00 AM
                    </Text>
                  </View>
                  <View style={[styles.row, { marginVertical: 10 }]}>
                    <FlatList
                      data={this.state.time.filter(function (e) {
                        return e >= start_time && e < "12:00:00";
                      })}
                      ListEmptyComponent={() => this.listEmptyComponent()}
                      renderItem={({ item }) => (
                        <View
                          style={[
                            styles.dateSelectionBox,
                            this.state.selectedStartTime != "" &&
                            item > this.state.selectedStartTime &&
                            this.state.selectedStartTime != "" &&
                            item < this.state.selectedEndTime
                              ? styles.inBetween
                              : null,
                          ]}
                        >
                          {selectedDate == this.getCurrentDate() &&
                          this.getCurrentTime() > item ? (
                            <View style={styles.disabled}>
                              <Text
                                style={[styles.timeText, styles.disabledText]}
                              >
                                {this.formatTime(item)}
                              </Text>
                            </View>
                          ) 
                          :
                          selectedDate == this.getCurrentDate() &&
                          this.checkAlreadyBookedSlots(item) ?
                          (
                            <TouchableOpacity
                              onPress={() => this.selectTime(item)}
                              style={styles.scheduledTime}
                            >
                              <Text style={[styles.timeText]}>
                                {this.formatTime(item)}
                              </Text>
                              {this.state.selectedStartTime == item ? (
                                <Text style={styles.timeText}>START</Text>
                              ) : this.state.selectedEndTime == item ? (
                                <Text style={styles.timeText}>END</Text>
                              ) : null}
                            </TouchableOpacity>
                          )
                          : (
                            <TouchableOpacity
                              onPress={() => this.selectTime(item)}
                              style={
                                this.state.selectedStartTime == item
                                  ? styles.active
                                  : this.state.selectedEndTime == item
                                  ? styles.endActive
                                  : null
                              }
                            >
                              <Text
                                style={[
                                  styles.timeText,
                                  this.state.selectedStartTime == item ||
                                  this.state.selectedEndTime == item
                                    ? styles.activeText
                                    : null,
                                ]}
                              >
                                {this.formatTime(item)}
                              </Text>
                              {this.state.selectedStartTime == item ? (
                                <Text style={styles.timeText}>START</Text>
                              ) : this.state.selectedEndTime == item ? (
                                <Text style={styles.timeText}>END</Text>
                              ) : null}
                            </TouchableOpacity>
                          )}
                        </View>
                      )}
                      //Set
                      //Setting the number of column
                      numColumns={4}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </View>
                <View style={[styles.col, { marginVertical: 10 }]}>
                  <View style={[styles.row, { marginVertical: 5 }]}>
                    <Text style={styles.headerInfo}>
                      {strings.bookSchedule.afternoon}
                    </Text>
                    <Text style={styles.timeSlot}>12:00 PM - 05:00 PM</Text>
                  </View>
                  <View style={[styles.row, { marginVertical: 10 }]}>
                    <FlatList
                      data={this.state.time.filter(function (e) {
                        return e >= "12:00:00" && e < "17:00:00";
                      })}
                      ListEmptyComponent={() => this.listEmptyComponent()}
                      renderItem={({ item }) => (
                        <View
                          style={[
                            styles.dateSelectionBox,
                            this.state.selectedStartTime != "" &&
                            item > this.state.selectedStartTime &&
                            this.state.selectedStartTime != "" &&
                            item < this.state.selectedEndTime
                              ? styles.inBetween
                              : null,
                          ]}
                        >
                          {selectedDate == this.getCurrentDate() &&
                          this.getCurrentTime() > item ? (
                            <View style={styles.disabled}>
                              <Text
                                style={[styles.timeText, styles.disabledText]}
                              >
                                {this.formatTime(item)}
                              </Text>
                            </View>
                          ) :
                          selectedDate == this.getCurrentDate() &&
                          this.checkAlreadyBookedSlots(item) ?
                          (
                            <TouchableOpacity
                              onPress={() => this.selectTime(item)}
                              style={styles.scheduledTime}
                            >
                              <Text style={[styles.timeText]}>
                                {this.formatTime(item)}
                              </Text>
                              {this.state.selectedStartTime == item ? (
                                <Text style={styles.timeText}>START</Text>
                              ) : this.state.selectedEndTime == item ? (
                                <Text style={styles.timeText}>END</Text>
                              ) : null}
                            </TouchableOpacity>
                          )
                          : (
                            <TouchableOpacity
                              onPress={() => this.selectTime(item)}
                              style={
                                this.state.selectedStartTime == item
                                  ? styles.active
                                  : this.state.selectedEndTime == item
                                  ? styles.endActive
                                  : null
                              }
                            >
                              <Text
                                style={[
                                  styles.timeText,
                                  this.state.selectedStartTime == item ||
                                  this.state.selectedEndTime == item
                                    ? styles.activeText
                                    : null,
                                ]}
                              >
                                {this.formatTime(item)}
                              </Text>
                              {this.state.selectedStartTime == item ? (
                                <Text style={styles.timeText}>START</Text>
                              ) : this.state.selectedEndTime == item ? (
                                <Text style={styles.timeText}>END</Text>
                              ) : null}
                            </TouchableOpacity>
                          )}
                        </View>
                      )}
                      //Set
                      //Setting the number of column
                      numColumns={4}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </View>
                <View style={[styles.col, { marginVertical: 10 }]}>
                  <View style={[styles.row, { marginVertical: 5 }]}>
                    <Text style={styles.headerInfo}>
                      {strings.bookSchedule.evening}
                    </Text>
                    <Text style={styles.timeSlot}>
                      05:00 PM - {this.formatTime(end_time)}{" "}
                    </Text>
                  </View>
                  <View style={[styles.row, { marginVertical: 10 }]}>
                    <FlatList
                      data={this.state.time.filter(function (e) {
                        return e >= "17:00:00" && e <= end_time;
                      })}
                      ListEmptyComponent={() => this.listEmptyComponent()}
                      renderItem={({ item }) => (
                        <View
                          style={[
                            styles.dateSelectionBox,
                            this.state.selectedStartTime != "" &&
                            item > this.state.selectedStartTime &&
                            this.state.selectedStartTime != "" &&
                            item < this.state.selectedEndTime
                              ? styles.inBetween
                              : null,
                          ]}
                        >
                          {selectedDate == this.getCurrentDate() &&
                          this.getCurrentTime() > item  ? (
                            <View style={styles.disabled}>
                              <Text
                                style={[styles.timeText, styles.disabledText]}
                              >
                                {this.formatTime(item)}
                              </Text>
                            </View>
                          ) :
                          selectedDate == this.getCurrentDate() &&
                          this.checkAlreadyBookedSlots(item) ?
                          (
                            <TouchableOpacity
                              onPress={() => this.selectTime(item)}
                              style={styles.scheduledTime}
                            >
                              <Text style={[styles.timeText]}>
                                {this.formatTime(item)}
                              </Text>
                              {this.state.selectedStartTime == item ? (
                                <Text style={styles.timeText}>START</Text>
                              ) : this.state.selectedEndTime == item ? (
                                <Text style={styles.timeText}>END</Text>
                              ) : null}
                            </TouchableOpacity>
                          )
                          : (
                            <TouchableOpacity
                              onPress={() => this.selectTime(item)}
                              style={
                                this.state.selectedStartTime == item
                                  ? styles.active
                                  : this.state.selectedEndTime == item
                                  ? styles.endActive
                                  : null
                              }
                            >
                              <Text
                                style={[
                                  styles.timeText,
                                  this.state.selectedStartTime == item ||
                                  this.state.selectedEndTime == item
                                    ? styles.activeText
                                    : null,
                                ]}
                              >
                                {this.formatTime(item)}
                              </Text>
                              {this.state.selectedStartTime == item ? (
                                <Text style={styles.timeText}>START</Text>
                              ) : this.state.selectedEndTime == item ? (
                                <Text style={styles.timeText}>END</Text>
                              ) : null}
                            </TouchableOpacity>
                          )}
                        </View>
                      )}
                      //Set
                      //Setting the number of column
                      numColumns={4}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.footerContainer}>
              <View style={[styles.row, styles.bottomBorder]}>
                <View style={[styles.col, styles.infoTopBottomContainer]}>
                  <Text style={styles.infoText}>
                    {strings.bookSchedule.connector}
                  </Text>
                  <Text style={[styles.infoText, styles.bold]}>
                    {this.props.charging_point_info.connector_type == ""
                      ? "-"
                      : this.props.charging_point_info.connector_type}
                  </Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.infoText}>
                    {strings.bookSchedule.capacity}
                  </Text>
                  <Text style={[styles.infoText, styles.bold]}>
                    {this.state.selectedDate != "" &&
                    this.state.selectedStartTime != "" &&
                    this.state.selectedEndTime != ""
                      ? parseFloat(
                          parseFloat(
                            this.props.charging_point_info.capacity
                          ).toFixed(2) *
                            parseFloat(this.getScheduleTimeDuration()).toFixed(
                              2
                            )
                        ).toFixed(2)
                      : parseFloat(
                          this.props.charging_point_info.capacity
                        ).toFixed(2)}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={[styles.col, styles.infoTopBottomContainer]}>
                  <Text style={styles.infoText}>
                    {strings.bookSchedule.price}
                  </Text>
                  <Text style={[styles.infoText, styles.bold]}>
                    Rs.{" "}
                    {this.state.selectedDate != "" &&
                    this.state.selectedStartTime != "" &&
                    this.state.selectedEndTime != ""
                      ? parseFloat(
                          this.props.charging_point_info.unitPrice *
                            (parseFloat(
                              this.props.charging_point_info.capacity
                            ).toFixed(2) *
                              this.getScheduleTimeDuration())
                        ).toFixed(2)
                      : parseFloat(
                          this.props.charging_point_info.unitPrice *
                            parseFloat(
                              this.props.charging_point_info.capacity
                            ).toFixed(2)
                        ).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.infoText}>
                    {strings.bookSchedule.bookingDate}
                  </Text>
                  <Text style={[styles.infoText, styles.bold]}>
                    {selectedDate +
                      "" +
                      (selectedStartTime != ""
                        ? " (" + this.formatTime(selectedStartTime)
                        : "") +
                      (selectedEndTime != ""
                        ? " - " + this.formatTime(selectedEndTime) + ")"
                        : "") || this.getCurrentDate()}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => this.bookNow()}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#A4FF8B", "#22BC9D"]}
                style={styles.signInButton}
              >
                {isLoading ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>
                    {strings.bookSchedule.bookNow}
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </Animatable.View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    info: state.info,
    charging_station_info: state.charging_station_info,
    charging_point_info: state.charging_point_info,
    book_charger_info: state.book_charger_info,
    booking_info: state.booking_info,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chargingPointInfo: bindActionCreators(chargingPointInfo, dispatch),
    bookChargerInfo: bindActionCreators(bookChargerInfo, dispatch),
    bookingInfo: bindActionCreators(bookingInfo, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookSchedule);
