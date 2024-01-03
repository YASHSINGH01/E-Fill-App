import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Platform, Linking, Modal, Dimensions, Alert } from 'react-native'
//Library
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated from 'react-native-reanimated';
import ImageView from "react-native-image-viewing";
import { showMessage } from "react-native-flash-message";
//Api
import HttpRequest from "../../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
// import {  } from '../../Redux/Actions/Actions
import { bindActionCreators } from 'redux';
// Theme Colors
import COLORS from "../../../constants/colors";
import { Images } from '../../../constants';
import { strings } from "../../../utils/translations";

const images = [
    Images.img1, Images.img2, Images.img3, Images.img4, Images.img5,
];

class tab1 extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            visible: false,
            points: [],
            modalVisible: false,
        }
    }

    componentDidMount = () => {
        this.getAvailablePoints();
    }

      
    navigate = () => {
        let { name, lat, long } = this.props.data;
        const latitude = lat;
        const longitude = long;
        const label = name;
        const daddr = `${latitude},${longitude}`;
        const url = Platform.select({
            ios: `http://maps.google.com/?daddr=${daddr}&directionsmode=driving&q=${label}`,
            android: "geo:" + latitude + "," + longitude + "?q=" + label
        });
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                browser_url =
                    "https://www.google.de/maps/@" +
                    latitude +
                    "," +
                    longitude +
                    "?q=" +
                    label;
                return Linking.openURL(browser_url);
            }
        });
    }

    getAvailablePoints = () => {
        let { connector } = this.props.data;
       
        if (connector != undefined) {
            this.setState({ points:  connector })
        } else {
            this.setState({ points:  [] })
        }
    }

    showAvailablePoints = () => {
        let { connector } = this.props.data;
       
        if (connector != undefined) {
            this.setState({ modalVisible: true })
        } else {
            this.setState({ modalVisible: true })
        }
    }

    formatTime = (time = '') => {
        return time.split(':')[0]+ ":" + time.split(':')[1]
    }

    render() {
        let { isLoading,  modalVisible, points } = this.state;
        let { data } = this.props;
        data  = {...data, image: images} // dummy images
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={[styles.row, {justifyContent: 'flex-start'}]}>
                    <View style={styles.basicButton}>
                        <Animated.Text style={styles.buttonText}>{data.no_of_slots > 1 ? ' '+data.no_of_slots+' '+strings.chargingStationDetails.slot : ' '+data.no_of_slots+' '+strings.chargingStationDetails.slot}</Animated.Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.showAvailablePoints()} style={styles.basicButton}>
                        <Animated.Text style={styles.buttonText}>{strings.chargingStationDetails.availablePoints} {points.length}</Animated.Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.row, { justifyContent: 'flex-start', margin: 10}]}>
                    <Text style={styles.text} >{strings.chargingStationDetails.basicDetails}</Text>
                </View>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Image source={Images.address} style={styles.icon} />
                        <Text style={styles.label}>{data.address}</Text>
                    </View>
                    { data.open_time != null &&
                    <View style={styles.row}>
                        <Image source={Images.time} style={styles.icon} />
                        <Text style={styles.label}>{'Open Time: '+this.formatTime(data.open_time)}</Text>
                    </View>
                    }
                    { data.close_time != null &&
                    <View style={styles.row}>
                        <Image source={Images.time} style={styles.icon} />
                        <Text style={styles.label}>{'Close Time: '+this.formatTime(data.close_time)}</Text>
                    </View>
                    }
               </View>
               <View style={[styles.row, { justifyContent: 'flex-start', margin: 10}]}>
                    <Text style={styles.text} >{strings.chargingStationDetails.facilities}</Text>
                </View>
                <View style={[styles.card, {marginBottom: 50}]}>
                    <View style={[styles.row, { justifyContent: 'flex-start'}]}>
                        <Text style={styles.text}>{strings.chargingStationDetails.services}</Text>
                        <View style={styles.bodyContainer}>
                            <Text style={styles.text}>{'NA'}</Text>
                        </View>
                    </View>
                    <View style={[styles.row, { justifyContent: 'flex-start'}]}>
                        <Text style={styles.text}>{strings.chargingStationDetails.parking}</Text>
                        <View style={styles.bodyContainer}>
                            <Text style={styles.text}>{'NA'}</Text>
                        </View>
                    </View>
                    <View style={[styles.row, { justifyContent: 'flex-start'}]}>
                        <Text style={styles.text}>{strings.chargingStationDetails.type}</Text>
                        <View style={styles.bodyContainer}>
                            <Text style={styles.text}>{'NA'}</Text>
                        </View>
                    </View>
               </View>
              
               <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    backdropOpacity={0.3}
                >
                    <ScrollView contentContainerStyle={styles.modalScrollView}>
                        <View style={styles.modalContainer}>
                            <View style={styles.formField}>
                                
                                <View style={styles.headerContainer}>
                                    <Text style={styles.headerTitle}>{strings.chargingStationDetails.availablePoints} {" ("+this.state.points.length+") "}</Text>
                                    <TouchableOpacity style={styles.modalHeaderContainer} onPress={()=> this.setState({modalVisible: false})} >
                                    <Icon name="ios-close-circle" size={24} color="#fff" />
                                </TouchableOpacity>
                                </View>
                                <View style={styles.listContainer}>
                                { this.state.points.length > 0 ?
                                       this.state.points.map((item, i) => {
                                            return(  
                                                <View key={i} style={styles.listView} >
                                                    { item.connectorImage != '' ?
                                                    <Image source={{uri: HttpRequest.liveImageUrl+''+item.icon}} style={styles.image}/>
                                                    : 
                                                    <Image source={Images.imagePlaceholder} style={styles.image}/>
                                                    }
                                                    <Text style={styles.availableConnectorText}>{item.connector_name+' ('+item.connector_type+')'}</Text>
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
                    </ScrollView>
                </Modal>
            </ScrollView>
            
        )
    }
}

// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 8,
        position: 'absolute',
        width: '90%',
        flexDirection: 'column',
        margin: '5%', 
        justifyContent:'center', 
        alignItems:'center',
    },
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
        fontWeight: '600',
    }, 
    divider: {
        padding: 10,
        borderBottomColor: COLORS.DEFAULT,
        borderBottomWidth: 1
    },
    card: {
        flex:1,
        flexDirection: 'column',
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius: 20, 
        padding: 16,
        backgroundColor: COLORS.HEADER_BACKGROUND
    },
    // bodyContainer: {
    //     flex: 2,
    //     flexDirection: 'row',
    //     justifyContent: 'space-evenly',
    //     alignItems: 'center',
    //     marginVertical: 10,
    // },
    listContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginVertical: 10,
    },
    listView: {
        flex: 1, 
        width: '100%',
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        borderRadius: 30,
        alignSelf: 'center'
    },
    availableConnectorText: {
        fontSize: 16,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
        marginHorizontal: 10
    },
    iconView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        flex : 1,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        borderRadius: 20,
        marginBottom: 10
    },
    facilitiesContainer: {
        flex : 1,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 10,
        marginBottom: 10
    },
    imageIcon : {
        resizeMode: 'contain'
    },
    icon: {
        width: 40,
        height:  40,
        resizeMode: 'contain',
    },
    label: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
        marginLeft: 20,
    },
    essentialsLabel: {
        fontSize: 10,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        textAlign: 'center',
    },
    basicButton: {
        flex: 0.5,
        alignItems: 'center',
        color: COLORS.BUTTON_TEXT,
        margin: 5,
        borderRadius: 20,
        padding: 8,
        backgroundColor: COLORS.DEFAULT
    },
    buttonText: {
        fontSize: 10,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        color: COLORS.BUTTON_TEXT
    },
    signInButton: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 30
    },
    LinearGradient: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    checkinText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    modalScrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalContainer: {
        margin: 30,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: COLORS.HEADER_BACKGROUND
    },
    formField: {
        width: screenWidth - 40 ,
        margin: 5
    },
    modalLabel: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        margin: 5,
        marginLeft: 15
    },
    modalHeaderContainer: {
        flex: 1 ,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottomWidth: 1, 
        borderColor: '#fff',
        padding: 10
    },
    headerTitle: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
       
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chargingPointItem: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.DEFAULT,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    IconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chargingPointContent: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginLeft: 5
    },
    chargingPointTitle: {
        fontSize: 16,
        fontFamily: "Poppins-medium",
        fontWeight: '600'
    },
    chargingPointDescription: {
        fontSize: 12,
        color: COLORS.INPUT_LABEL,
        fontFamily: "Poppins-medium",
        fontWeight: '500'
    },
})

const mapStateToProps = state => {
    
    return {
        info: state.info,
        token: state.token,
    };
  };
  
  
  const mapDispatchToProps = (dispatch) => {
      return bindActionCreators({}, dispatch);
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(tab1);