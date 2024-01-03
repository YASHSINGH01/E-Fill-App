import React, { Component } from 'react'
import { Text, View, TextInput,Image, StyleSheet, FlatList, RefreshControl, Dimensions,Alert, TouchableOpacity, ActivityIndicator, ScrollView,Modal,PermissionsAndroid ,Linking, Platform} from 'react-native'
//Library
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from "react-native-flash-message";
import ImagePicker from 'react-native-image-crop-picker';
import axios from "axios";
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
            points: '',
            dealer_no: '',
            modalVisible: false,
            filePath: '',
            image1: '',
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
        console.log('histotrfuntion')
        // if(this.props.data.route.params.data=="Dealer"){
        HttpRequest.loyaltyhistory( {distributor_code:this.props.info.phone})
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
        // }else{
            // HttpRequest.franchise_loyaltyhistory( {distributor_code:this.props.info.phone})
            // .then(res => {
            //     this.setState({ isLoading: false });
            //     const result = res.data;
            //     if (res.status == 200 && !result.error) {
            //         console.log("Get Completed booking history  API Response ---------- ", result);
            //          this.setState({ historyData: result.posts, refreshing: false });
            //     } else {
            //         this.setState({ refreshing: false });
            //         // console.log("Get Completed booking history  API Error : ",result);
            //     }
            // })
            // .catch(err => {
            //     this.setState({ isLoading: false, refreshing: false });
            //     // console.log("Get Completed booking history API Catch Exception: ",err);
            // });
        // }
    }


    scanner() {
        Alert.alert(
            'Choose Options',
            '',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: console.log('cancel'),
                },

                {
                    text: 'Camera',
                    onPress: () => this.camera(),
                },

                {
                    text: 'Gallery',
                    onPress: () => this.gallery(),
                },

            ],
            { cancelable: false }
        );


    }

    gallery() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            includeBase64: true,
            cropping: true
        }).then(image => {
            console.log('image', image.path)
            this.setState({ image1: image.path });
            this.setState({ filePath: image.data });
            console.log('image11', this.state.filePath)
        });
    }
    camera() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            includeBase64: true,
            cropping: true
        }).then(image => {
            console.log('image', image.path)
            this.setState({ image1: image.path });
            this.setState({ filePath: image.data });
            console.log('image11', this.state.filePath)
        });
    }

    modalvis(){
        this.setState({isLoading:false,modalVisible:false,dealer_no:'',points:'',image1:''});
    }
    modal = () => {
        let { navigation } = this.props;
        //  console.log("navigate",navigation);
        this.setState({ modalVisible: true })
    }
    onSubmit = (item) => {
        let{info}=this.props.info;
                let {points,dealer_no,filePath} = this.state;
                //  this.setState({chargingPointData:this.state.tax});
                //  console.log('ok',this.state.filePath.fileName);
              //   if (filePath == null || filePath =="") {
                   
              //     Alert.alert("Please Select ID proof");
              //     console.log('ok1');
              // }else{
                console.log('pics',item);
                  var pics=filePath;
                  
                  
                  //If file selected then create FormData
                  // const fileToUpload = filePath;
                //    console.log('datas',this.state.dealer_no)
                  // const files = new FormData();
                  // // datas.append('name', 'Image Upload');
                  // files.append(fileToUpload);
                    // console.log('datas',this.state.date)
                  //  this.uploadProgress(files);
                  this.setState({isLoading:true});
              axios.post('https://mobility.efillelectric.com/api/v1/loyalty-redeem', {loyalty_points:this.state.dealer_no, pics:pics, distributor_code:this.props.info.phone , }, {
                  onUploadProgress: progressEvent => {
                      //  AsyncStorage.clearDealer_vehicle_storage();
                //     var percentComplete = progressEvent.loaded / progressEvent.total
                //     percentComplete = parseInt(percentComplete * 100);
                //     console.log(percentComplete);
                //   this.setState({percentage:percentComplete});
                  // if(percentComplete=="100"){
                  //     this.setState({isLoading:true});
                      
                  // }
                  
                  //   this.uploadProgress(percentComplete);
                   // updateProgress(percentComplete);
                  }
                }).then(response => {
                  this.setState({isLoading:true})
                  const result=response.data;
                  console.log('ok2',result)
            //   if(result.status==1 && result.error==false)
              this.setState({isLoading:false,modalVisible:false,dealer_no:'',points:'',image1:''});
              showMessage({
                message: strings.success.title,
                description: result.message,
                type: "success",
            });
              
              });
                
            
            
              };
   



    renderItem = ({ item }) => (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fff', '#fff']} style={styles.itemContainer}>
          
            <View style={styles.itemHeader}>
                {/* Charging Station Image & Ratings */}
                <View style={styles.row}> 
                {/* <Image source={{uri:item.icon}} style={styles.image}/> */}
                    <View style={[styles.content, { flex: 3}]}>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.title]}  numberOfLines={1}>Loyalty Points</Text>
                        </View>
                        <View style={[styles.row, styles.descriptionContent, {marginTop: 10}]}>
                         {/* <Text style={[styles.text,styles.description, styles.label]}>{strings.chargingHistoryDetails.orderId}</Text> */}
                         {/* <Text style={[styles.text,styles.description, styles.leftAlign]} numberOfLines={1}>{item.order_id}</Text> */}
                         </View>

                       

<View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text,styles.description, styles.label]}>Loyalty Debited</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.loyalty_debited}</Text>
                        </View>
                        
                         <View style={[styles.row, styles.descriptionContent]}>
                          <Text style={[styles.text,styles.description, styles.label]}>Loyalty Received</Text>
                          <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.loyalty_received}</Text>
                          </View>
                          <View style={[styles.row, styles.descriptionContent]}>
                          <Text style={[styles.text,styles.description, styles.label]}>Date & Time</Text>
                          <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.date_time}</Text>
                          </View>
                    </View>
                   
                </View>
                <View style={styles.seperator} />
                
                
                
            </View>
       
        </LinearGradient>
    )

    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>No Points Credited</Text>
        </View>
    )

    render() {
        let { historyData, isLoading, refreshing, visible,filePath, image1, modalVisible,dealer_no,  } = this.state;
         console.log('histtab2',this.props)
        return (
            <View style={styles.container}>
                {isLoading ?
                    <ActivityIndicator size='large' color='#fff' style={styles.footer} />
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
               
                 {/* <View>
                        <Text numberOfLines={2} style={{color:'#fff',textAlign:'center',fontSize:12,margin:5}}>To use this feature,Please maintain a minimum balance of Rs.1000 in your wallet. </Text>
                    </View> */}
                    <View style={{justifyContent:'center',alignSelf:'center'}}>
                <TouchableOpacity onPress={()=>this.modal()} activeOpacity={5}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                <Text style={styles.buttonText}>{strings.dmc.loyality}</Text>
                </LinearGradient>
                </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                
                    visible={modalVisible}
                    backdropOpacity={0.3}
                >

                    <ScrollView contentContainerStyle={styles.modalScrollView}
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.modalContainer}>
                            <View style={styles.formField}>

                                <View style={styles.headerContainer}>
                                    <Text style={styles.headerTitle}>{strings.dmc.loyality}</Text>
                                    <TouchableOpacity style={styles.modalHeaderContainer} onPress={() => this.modalvis()}  >
                                        <Icon name="ios-close-circle" size={24} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.listContainer}>
                                    {/* <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={0} extraScrollHeight={0} contentContainerStyle={styles.scrollView}> */}
                                    <View style={styles.formField}>
                                        <Text style={styles.label1}>Enter the Loyality Points</Text>
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                ref={this.nameRef}
                                                placeholder="Enter the Loyality Points"
                                                autoCapitalize='none'
                                                autoCompleteType='off'
                                                autoCorrect={false}
                                                keyboardType={'phone-pad'}
                                                enablesReturnKeyAutomatically={true}
                                                onChangeText={(text) => this.setState({ dealer_no: text })}
                                                // onSubmitEditing={this.onSubmitName}
                                                returnKeyType='next'
                                                value={dealer_no}
                                                style={[styles.inputText]}
                                            />


                                        </View>
                                       
                                    </View>
                                    {filePath != '' ?
                                            <View style={{ justifyContent: 'center', flex: 1,alignSelf:'center'}}>
                                                <Image
                                                    source={{ uri: image1 }}
                                                    style={styles.imageStyle}
                                                />
                                            </View>
                                            : null}
                                        <View style={styles.availabilityIconContainer}>
                                            <TouchableOpacity onPress={!isLoading ? () => this.scanner() : null}>
                                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.IconButton}>
                                                    {isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                                                        <Image source={Images.camera} style={styles.imageIcon1} />
                                                    }
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </View>

                                        <TouchableOpacity style={{alignSelf:'center'}} onPress={!isLoading ? () => this.onSubmit() : null}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                {isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                  <Text style={styles.buttonText}>{strings.dmc.submit}</Text>
                }
              </LinearGradient>
            </TouchableOpacity>
            
                                    {/* </KeyboardAwareScrollView> */}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </Modal>
              
                </View>
           
        )
    }
}
let screenHeight = Dimensions.get('window').height;
let screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: COLORS.PRIMARY,
        zIndex: 9999,
    },
   
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    availabilityIconContainer: {
        position: 'relative',
        // top: '42%',
       
         alignSelf: 'center',
        marginTop:10,
       
    },
    buttonText: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        color: COLORS.BUTTON_TEXT
    },
  
    imageIcon1: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    imageStyle: {
        marginTop: 10,
        width: screenWidth - 90,
        height: 100,
        // margin: 5,
        //  marginTop:-50,
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formField: {
        width: screenWidth ,
        margin: 5
    },
    inputContainer: {
        width: screenWidth /1.5,
        height: 50,
        flexDirection: 'row',
      alignSelf:'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop:10,
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.black,
        borderRadius: 10,
    },
    IconButton: {
        position: 'relative',
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        borderRadius: 55 / 2,
    },
    listContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginVertical: 10,
    },
    modalHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,

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
    footer: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '5%',
    },
    modalScrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
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
        width: screenWidth/2,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
        
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 5,
    },
    
    itemHeader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
        marginLeft:100,
        fontWeight: 'bold',
        textAlign:'center',
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
    label1: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
        marginLeft: 80,
    },
    description: {
        fontSize: 12,
        color: COLORS.DEFAULT,
        fontWeight: '400',
        fontFamily: "Poppins-Regular",
        color: COLORS.LIGHT_BLACK
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
        info: state.info,
        token: state.token,
    };
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(tab2);