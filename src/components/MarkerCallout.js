import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, Alert,Linking } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { strings } from '../utils/translations';
//Constants
import COLORS from '../constants/colors';
import { Images } from '../constants';
import { Button } from 'react-native-paper';

import HttpRequest from "../utils/HTTPRequest";


export default class MarkerIcon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cs_id: '',
            phone: '',
            vehicle: '',
            cp_id:'',
            data:'',
            type: '',
            chargingPointData: [],
        }
    }

    closeCallout = () => {
        this.props.closeCallout();
    }

    bookcharger = (charger, item) => {
        this.props.closeCallout();
            // console.log("item",charger);
        let { navigation } = this.props;

        //    console.log("porps",this.props.marker);
           console.log("porps123e",item);
           console.log("porps",charger);
         navigation.push('booking', { charger: charger, item: item });
    }

    navigate = (navigation) => {
        let { id } = this.props.marker;
        // console.log("id",this.props.marker.id);
        this.closeCallout();
        navigation.push('ChargingStationDetails', { itemId: id })
    }
    navi = () => {
       // console.log("naviagte", this.props.token);

        // let { name, lat, long, address } = this.props.data;
        const latitude = this.props.marker.coords.latitude;
        const longitude = this.props.marker.coords.longitude;
        // const label = name;
        const daddr = `${latitude},${longitude}`;
        const url = Platform.select({
            ios: `http://maps.google.com/?daddr=${daddr}&directionsmode=driving&q=${this.props.marker.address}`,
            android: `http://maps.google.com/?daddr=${daddr}&directionsmode=driving&q=${this.props.marker.address}`,
        });
        Linking.openURL(url);
    }
    chargerfault =(charger,item) =>{
        // let{id}=this.props.marker;
        let { navigation } = this.props;
        let{cp_id,system_con, data}=this.state;
    
    //    console.log("porps123e",item);
        // console.log("cpid",item.cp_id);
        HttpRequest.chargerfault({ cp_id:item.cp_id,system_con:item.system_con_id})
        .then(res => {
          const result = res.data;
        //   console.log("Phone Number Check api response ---------- ", result);
          if (res.status == 200 && !result.error) {
            this.setState({data:result});
        //   console.log("cpid1",result);
          this.props.navigation.navigate('Error',{data,item:item});
            
          }
        })
        .catch(err => {
          this.setState({ isLoading: false });
          console.log("Phone Number Check API Catch Exception: ",err);
        //   showMessage({
        //     message: strings.signIn.response.error.title,
        //     description: strings.signIn.response.error.message,
        //     type: "danger",
        //   });
        });
    }

    render() {
        let { navigation } = this.props;
       
        let { name, address, status, connector, cp_id } = this.props.marker;
        let { id, connectorImage, connectorStatus } = this.props.marker.connector;
       
        return (
            <View style={styles.container} onPress={this.closeCallout}>
                <ScrollView >
                    <TouchableOpacity style={styles.iconContainer} onPress={this.closeCallout}>
                        <Icon name="ios-close-circle" size={24} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <View style={[styles.row, styles.header, styles.marginHorizontal]}>

                            <Text style={[styles.text, styles.bold, styles.h1]} numberOfLines={1}>{name}</Text>
                        </View>
                        <View style={[styles.row, styles.body, styles.marginHorizontal]}>
                            <View style={styles.column}>
                                {/*<Text style={[styles.text, styles.points, {paddingTop: 10, paddingBottom: 10}]}>{status == 0 ? strings.home.deActivated : status == 1 ? strings.home.available : status == 2 ? strings.home.currentlyBusy : status == 3 ? strings.home.notConnected : strings.home.notConnected }</Text>*/}
                                <View style={styles.listContainer}>
                                    {this.props.marker.connector.length > 0 ?
                                        this.props.marker.connector.map((item, i) => {
                                            return (
                                                <View key={i} style={styles.listView} >
                                                    <Image source={{ uri: item.connectorImage }} style={styles.image} />
                                                    <Text style={styles.availableConnectorText}>{item.connectorName}  {"(" +item.cp_power+ "KW" +")"}</Text>
                                                    {item.connectorStatus == "Available" || item.connectorStatus =="Preparing"
                                                        ?
                                                        <Button style={styles.onlinebutton} mode="outlined" color='white' uppercase={false} onPress={() => this.bookcharger(this.props.marker, item)}>
                                                            Book Charger
                                                        </Button>
                                                        :
                                                        item.connectorStatus == "Charging" 
                                                        ?      
                                                        <Button style={styles.busybutton} mode="outlined" color='white' uppercase={false} >
                                                        Charging {/* <Text>{ status == 2 ? strings.home.currentlyBusy : status == 3 ? strings.home.notConnected : strings.home.notConnected }</Text> */}
                                                    </Button>
                                                    :
                                                    <Button style={styles.offlinebutton} mode="outlined" color='white' uppercase={false} onPress={() => this.chargerfault(this.props.marker, item)}>
                                                   Unavailable
                                                </Button>
                                                       
                                                    }

                                                </View>
                                            )
                                        })
                                        :
                                        <View style={styles.listView} >
                                            <Text style={styles.availableConnectorText}>{strings.chargingStationDetails.noPointAvailable}</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={[styles.row, styles.footer, styles.marginHorizontal]}>

                            <Button style={styles.button} mode='outlined' icon="navigation" color='black' uppercase={false} onPress={() => this.navi()}>
                                Navigate
                            </Button>
                            <Button style={styles.button} mode='outlined' icon ="information" color='black' uppercase={false} onPress={() => this.navigate(navigation)}>
                                View Details
                            </Button>
                        </View>

                    </View>
                </ScrollView>
            </View>
        )
    }
}

// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: screenWidth - 30,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        bottom: 100,
        marginHorizontal: 15,
        borderRadius: 5,
        backgroundColor: COLORS.DEFAULT,
        shadowOffset: { width: 8, height: 8, },
        shadowColor: '#05294b',
        shadowOpacity: 0.7,
    },
    availableConnectorText: {

        fontSize: 12,
        fontFamily: "Poppins-medium",
        flexDirection: 'row',
        flex: 1.9,
        fontWeight:'bold',
        marginHorizontal: 10
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        marginVertical: 10
    },
    listView: {
        flex: 0.4,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 6,
    },
    listContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginVertical: 10,
    },

    availableConnector: {
        fontSize: 16,
        fontFamily: "Poppins-medium",
        color: COLORS.BLACK,
        flexDirection: 'row',
        textAlign: 'center',
        marginHorizontal: 10
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 5
    },
    header: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    body: {
        flex: 3,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        borderBottomColor: COLORS.INPUT_LABEL,
        borderBottomWidth: 1
    },
    h1: {
        textAlign: 'left',
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK,
    },
    text: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK
    },
    points: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
    },
    mediumBold: {
        fontSize: 14,
        fontWeight: '500',
        flex: 2,
    },
    address: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: COLORS.INPUT_LABEL
    },
    marginHorizontal: {
        marginHorizontal: 10
    },
    bold: {
        fontWeight: '600'
    },
    button: {
        flex: 1,
        // shadowOpacity: 2,
        textTransform: 'capitalize',
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: 'green',
        borderRadius: 5,
        borderWidth:1,
        margin: 5,
        shadowColor: 'green',

    },
    onlinebutton: {
        backgroundColor: '#05294b',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth:'40%',
        borderColor: 'green',
        borderRadius: 5,
        shadowColor: 'green',
    },
    busybutton: {
        backgroundColor: '#DB4914',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'green',
        borderRadius: 5,
        minWidth:'43%',
        shadowColor: 'green',
    },
    offlinebutton: {
        backgroundColor: '#8b0000',
        minWidth:'40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'green',
        borderRadius: 5,
        paddingLeft:8,
        paddingRight:6,
        shadowColor: 'green',
    },
    image: {
        width: 40,
        height: 24,
        resizeMode: 'contain',
        borderRadius: 30,
        alignSelf: 'center'
    },
    iconContainer: {
        flex: 1,
        fontWeight: 'bold',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 999,
    },
});