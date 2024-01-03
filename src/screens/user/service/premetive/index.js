TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, FlatList, Alert, RefreshControl, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
//Library
import messaging from '@react-native-firebase/messaging';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage, hideMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Components
import Header from '../../../../components/Header';
import Checkbox from '../../../../components/Checkbox';
//API
import HttpRequest from '../../../../utils/HTTPRequest';
//Redux
import { connect } from 'react-redux';
import { Chessis_no, buycharger } from '../../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';


import { strings } from '../../../../utils/translations';
// Theme Colors
import COLORS from "../../../../constants/colors";

class Primitive extends Component {
    constructor(props) {
        super(props);


        this.state = {
            refreshing: false,
            isLoading: true,
            isSelected: '',
            visible: true,
            serviceData: []

        };
    }
    componentDidMount = () => {
{this.props.buycharger!="" || this.props.chessis ==" "? this.charger_service():this.service()}
        // this.service();
console.log('jjg',this.props)
    }

    service = () => {
        let { props } = this;
        let { radius, region, serviceData } = this.state;
         console.log(props.chessis,'region')

        HttpRequest.users_service({ chassis_no: props.chessis })
            .then(res => {
                const result = res.data;
                console.log("Service API Response ---------- ", result);
                if (res.status == 200) {
                    this.setState({ serviceData: result.data, refreshing: false, isLoading: false, })
                    console.log("distance", this.state.isSelected);
                } else {
                    this.setState({ isLoading: false });
                    console.log("Service API Error : ", result);
                    showMessage({
                        message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false, refreshing: false });
                console.log("Orders API Catch Exception: ", err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });


    }
    charger_service = () => {
        let { props } = this;
        let { radius, region, serviceData } = this.state;
         console.log('hfhiue',props.buycharger)

        HttpRequest.charger_service({ chargePointSerialNumber: props.buycharger })
            .then(res => {
                const result = res.data;
                console.log("Charger API Response ---------- ", result);
                if (res.status == 200) {
                    this.setState({ serviceData: result.data, refreshing: false, isLoading: false, })
                    console.log("distance", this.state.isSelected);
                } else {
                    this.setState({ isLoading: false });
                    console.log("Charger API Error : ", result);
                    showMessage({
                        message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false, refreshing: false });
                console.log("Charger API Catch Exception: ", err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });


    }

    submit = (data) => {
        let { props } = this;
        let { radius, region, serviceData } = this.state;
        console.log(data, 'region')

        HttpRequest.users_service_submit({ chassis_no: props.chessis, user_contact: props.info.phone, service_no: data })
            .then(res => {
                const result = res.data;
                console.log("Service API Response ---------- ", result);
                if (res.status == 200) {
                    // this.setState({ serviceData: result.data, refreshing: false, isLoading: false,})
                    console.log("distance", result);
                    showMessage({
                        message: strings.users.service,
                        description: strings.users.services.confirm,
                        type: "success",
                    });
                    this.props.navigation.navigate('Services')
                } else {
                    this.setState({ isLoading: false });
                    console.log("Service API Error : ", result);
                    showMessage({
                        message: strings.error.title,
                        description: result.message != undefined ? result.message : result.status,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false, refreshing: false });
                console.log("Orders API Catch Exception: ", err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });


    }
    paid() {
        let { navigation } = this.props;
        navigation.navigate('paidservice',);
    }

    handleCheckbox = (checkbox) => {
        this.setState({ isSelected: checkbox });
    }

    labelCheck = (data) => {
        console.log("clicked", data);
        let { navigation } = this.props;
        navigation.navigate('freeservice', { items: data });
    }

    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>No Data Found</Text>
        </View>
    )
    renderItem = ({ item }) => (
        <View>
            {item.status == 0 ?
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#D3D3D3', '#D3D3D3']} style={styles.itemContainer}>
                    <View style={styles.itemHeader}>
                        {/* Charging Station Image & Ratings */}
                        <View style={styles.row}>
                            {/* <Image source={{uri:item.icon}} style={styles.image}/> */}
                            <View style={[styles.content]}>
                                <View style={styles.row}>
                                    <Text style={[styles.title]} numberOfLines={1}>{item.service_name}</Text>
                                </View>
                                <View style={[styles.row, styles.descriptionContent, { marginTop: 10 }]}>
                                    {/* <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.chargingPoint}</Text> */}
                                    <Text style={[styles.description, styles.leftAlign]} numberOfLines={1}>{item.message}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.seperator} />

                        <View style={styles.row1}>
                            <View style={styles.Button}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF6A00', '#EE0979']} style={styles.linearGradient}>
                                    <Text style={styles.cancelText}>Service Expired</Text>
                                </LinearGradient>
                            </View>

                        </View>

                    </View>

                </LinearGradient>
                : item.status!=2?
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fff', '#fff']} style={styles.itemContainer}>
                    <View style={styles.itemHeader}>
                        {/* Charging Station Image & Ratings */}
                        <View style={styles.row}>
                            {/* <Image source={{uri:item.icon}} style={styles.image}/> */}
                            <View style={[styles.content]}>
                                <View style={styles.row}>
                                    <Text style={[styles.title]} numberOfLines={1}>{item.service_name}</Text>
                                </View>
                                <View style={[styles.row, styles.descriptionContent, { marginTop: 10 }]}>
                                    {/* <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.chargingPoint}</Text> */}
                                    <Text style={[styles.description, styles.leftAlign]} numberOfLines={1}>{item.message}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.seperator} />

                        <View style={styles.row1}>
                            <TouchableOpacity style={styles.Button} onPress={() => this.labelCheck(item)}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#F8B51D', '#F6DA7D', '#FBBA54']} style={styles.linearGradient}>
                                    <Text style={styles.cancelText}>Request Service</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                        </View>

                    </View>

                </LinearGradient>
                :
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#D3D3D3', '#D3D3D3']} style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                    {/* Charging Station Image & Ratings */}
                    <View style={styles.row}>
                        {/* <Image source={{uri:item.icon}} style={styles.image}/> */}
                        <View style={[styles.content]}>
                            <View style={styles.row}>
                                <Text style={[styles.title]} numberOfLines={1}>{item.service_name}</Text>
                            </View>
                            <View style={[styles.row, styles.descriptionContent, { marginTop: 10 }]}>
                                {/* <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistory.chargingPoint}</Text> */}
                                <Text style={[styles.description, styles.leftAlign]} numberOfLines={1}>{item.message}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.seperator} />

                    <View style={styles.row1}>
                        <View style={styles.Button}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#F8B51D', '#F6DA7D', '#FBBA54']} style={styles.linearGradient}>
                                <Text style={styles.cancelText}>Not Available</Text>
                            </LinearGradient>
                        </View>

                    </View>

                </View>

            </LinearGradient>
                }

        </View>
    );
    render() {
        let { navigation } = this.props;
        let { isLoading, serviceData, refreshing } = this.state;
        let { props } = this;
        console.log(serviceData);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.users.primitve} />
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    {/* <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} contentContainerStyle={styles.scrollView}> */}
                    {isLoading ?
                        <View style={styles.noDataFoundContainer}>
                            <ActivityIndicator size='large' color='#fff' />
                        </View>
                        :
                        <FlatList
                            data={serviceData}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id + ""}
                            ListEmptyComponent={() => this.listEmptyComponent()}
                        />
                    }
                    {/* </KeyboardAwareScrollView> */}
                    <View>
                        <View style={{ marginLeft: 55 }}>
                            <TouchableOpacity activeOpacity={5} onPress={() => this.paid()}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>

                                    <Text style={styles.buttonText}>Paid Services</Text>

                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animatable.View>

            </View>
        )
    }
}

// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.PRIMARY,
        zIndex: 9999,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 2,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    footer: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '5%',
    },
    //List view
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.DEFAULT,
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
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
    linearGradient: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        fontFamily: "Poppins-Regular",
        color: 'black',
    },


    success: {
        backgroundColor: COLORS.SUCCESS
    },
    danger: {
        backgroundColor: COLORS.ERROR
    },
    leftAlign: {
        fontWeight: 'bold',
        textAlign: 'left'

    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 50
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
    bottomContent: {
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    row1: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    col: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    center: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontWeight: '700',
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
        color: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        fontWeight: '400',
        color: COLORS.INPUT_LABEL
    },
    noDataFoundContainer: {
        flex: 1,
        height: screenHeight / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataFoundText: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",
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
    formField: {
        flex: 1,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: COLORS.PRIMARY,
        margin: 5,
        marginLeft: 20,
    },
    inputContainer: {
        width: screenWidth - 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Platform.OS == 'ios' ? 10 : null,
        paddingHorizontal: 20,
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.black,
        borderColor: COLORS.PLACEHOLDER,
        borderWidth: 1,
        borderRadius: 30,
        margin: 10
    },
    inputText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.black,
    },
    placeholderText: {
        color: COLORS.PLACEHOLDER,
        fontSize: 16,
        fontFamily: "Poppins-regular",
        fontWeight: '300',
    },
    signInButton: {
        width: screenWidth / 1.7,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        // marginLeft:30,
        margin: 30
    },
    Button: {
        width: screenWidth - 250,
        height: 30,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderRadius: 5,
        margin: 5,
        // marginLeft:30,

    },
    buttonText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },


    //Filter
    filterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    filterRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    rowItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageIcon: {
        width: 40,

        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        fontFamily: "Poppins-Regular",
        color: COLORS.PRIMARY
    }
});

const mapStateToProps = state => {

    return {
        token: state.token,
        info: state.info,
        chessis: state.Chessis_no,
        buycharger:state.buycharger
    };
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Primitive);

