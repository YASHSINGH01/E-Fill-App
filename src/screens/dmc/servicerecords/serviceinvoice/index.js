TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, PermissionsAndroid, TextInput, Dimensions,ActivityIndicator, StyleSheet } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
//Components
import Header from '../../../../components/Header';
import { Images } from '../../../../constants';

//Api
import HttpRequest from "../../../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Constants
import CheckBox from '@react-native-community/checkbox';
import { FlatGrid, SimpleGrid } from 'react-native-super-grid';

import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AVModeIOSOption,
    AudioSourceAndroidType,
  } from "react-native-audio-recorder-player";

import { strings } from '../../../../utils/translations';
import LinearGradient from 'react-native-linear-gradient';

import RNFetchBlob from 'rn-fetch-blob';


const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

class Serviceinvoice extends Component {
    constructor(props) {
        super(props);

        this.onFocus = this.onFocus.bind(this);

        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitName = this.onSubmitPhone.bind(this);
        this.phoneRef = this.updateRef.bind(this, 'detail');

        this.state = {
            isLoading: true,
            refreshing: false,
            count: 0,
            url: '',
            document_type: [],
            detail: "",
            file_name: '',
            bill: '',
            audio:"",
      userInfo: null,
      
     recording:false,
      recordSecs: 0,
      recordTime: "00:00:00",
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: "00:00:00",
      duration: "00:00:00",
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.01);
    }
    componentDidMount = () => {
        this.requestLocationPermission();
        // this.document();
        this.service();
    
        //   this.tokenn();
    
      }
      requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const grants = await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);
        
            console.log('write external stroage', grants);
        
            if (
              grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                PermissionsAndroid.RESULTS.GRANTED &&
              grants['android.permission.READ_EXTERNAL_STORAGE'] ===
                PermissionsAndroid.RESULTS.GRANTED &&
              grants['android.permission.RECORD_AUDIO'] ===
                PermissionsAndroid.RESULTS.GRANTED
            ) {
              console.log('Permissions granted');
             
            } else {
              console.log('All required permissions not granted');
              return;
            }
          } catch (err) {
            console.warn(err);
            return;
          }
        }
      };
    permissionFunc(item) {

        let { detail,document_type } = this.state;
        // console.log(detail);
        this.props.navigation.navigate("otpcancel", { mobile: item.customer_contact, service_id: item.service_id, service_response: detail,services:document_type });
    }

    service() {
        let { item } = this.props.route.params;
        console.log('hhyd', item);
        HttpRequest.dealer_service()
          .then(res => {
            this.setState({ isLoading: false });
            //  console.log("Phone Number Check api response ---------- ", res);
            const result = res.data;
            // console.log("checkbox api response ---------- ", result);
            if (res.status == 200 && result.error == false) {
              // console.log("service list",result.data);
              this.setState({ document_type: result.data ,url:item.service_audio})
              // console.log(this.state.Service_Type,'service');
              //  this.props.navigation.navigate("serviceotp",{mobile:this.state.customer_contact,chessis_no:this.state.customer_name,Service_Type:this.state.Service_Type,Service_Detail:this.state.Service_Detail});
    
            }
            else {
              Alert.alert("Alert", result.message);
              // this.props.navigation.navigate("OtpVerification", { mobile: phone, type: 0, formData: { name: name, phone: phone, password: password,email:email,refId:refId,device_token:deviceToken, role: 1 } });
            }
          })
          .catch(err => {
            this.setState({ isLoading: false });
            console.log("Phone Number Check API Catch Exception: ", err);
            showMessage({
              message: strings.signIn.response.error.title,
              description: strings.signIn.response.error.message,
              type: "danger",
            });
          });
      }
      onStartPlay = async (e) => {
        let { item } = this.props.route.params;
         let{url}=this.state;
        // this.setState({url:item.service_audio})

            console.log('onStartPlay',this.state.url);
            const msg = await this.audioRecorderPlayer.startPlayer(url);
            console.log('hdgg',msg);
            this.audioRecorderPlayer.addPlayBackListener((e) => {
          console.log('hd526g',e);
              this.setState({
                currentPositionSec: e.currentPosition,
                currentDurationSec: e.duration,
                playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
                duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration).toFixed(2)),
              });
        // console.log('play',this.state.playTime);
        // console.log('play1',this.state.duration);
              return;
            });
          };
        
        
        onPausePlay = async (e) => {
            await this.audioRecorderPlayer.pausePlayer();
          };
        
          onStopPlay = async (e) => {
            console.log("onStopPlay");
            this.audioRecorderPlayer.stopPlayer();
            this.audioRecorderPlayer.removePlayBackListener();
          };

        onStopRecord = async () => {
                const result = await this.audioRecorderPlayer.stopRecorder();
                this.audioRecorderPlayer.removeRecordBackListener();
                this.setState({
                  recordSecs: 0,
                });
            this.setState({audio:result,recording:false});
                 console.log("audio result",result);
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

    updateRef(name, ref) {
        this[name] = ref;
    }

    onChangeText(text) {
        ['detail']
            .map((name) => ({ name, ref: this[name] }))
            .forEach(({ name, ref }) => {
                if (ref.isFocused()) {
                    this.setState({ [name]: text });
                }
            });
    }

    onSubmitPhone() {
        this.password.focus();
    }

    onRefId() {
        this.refral.focus();
        this.permissionFunc();
    }

    submitchebox = (checkbox,id) => {
        // console.log('ch',checkbox);
        let temp = this.state.document_type.map((product) => {
            if (id === product.id) {
              return { ...product, isChecked: !product.isChecked };
            }
            return product;
          });
        //   console.log('ch');
          this.setState({
            document_type: temp,
          });
         
        }
      
        labelCheck = () => {
          let { isSelected } = this.state;
          this.setState({ isSelected: !isSelected });
        }
    renderItem = ( {item} ) => (
        <View style={styles.row1}>
          <View style={styles.checkboxContainer}>
            <CheckBox
            value={item.isChecked}
           
            onValueChange={()=>this.submitchebox(item.message,item.id)}
            tintColors={{true: '#368098'}}
                
              disabled={false}
    
            />
            <TouchableOpacity activeOpacity={1} onPress={() => this.labelCheck()}>
              <Text style={styles.checkboxLabel}>{item.message}</Text>
            </TouchableOpacity>
    
          </View>
        </View>
    
    
      );
    render() {
        let { navigation } = this.props;
        let { detail ,document_type,recordTime,playTime} = this.state;
        let { item } = this.props.route.params;
        let type = item.service_status;
        // console.log('roucevoice', item);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={navigation} type={strings.dmc.s_detail} />
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <ScrollView contentContainerStyle={styles.scrollView}>

                        <View style={styles.box}>
                            <View style={styles.row}>
                                <Text style={[styles.text, styles.small]}>Service Name</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.text, styles.bold]} numberOfLines={2}>{item.service_name}</Text>

                            </View>
                            {/* <View style={styles.row}>
                                <Text style={[styles.text, styles.small]} numberOfLines={1}>{}</Text>
                            </View> */}
                        </View>
                        <View style={styles.box}>
                            <View style={[styles.row, styles.headerSeperator]}>
                                <Text style={styles.title}>Service Details</Text>
                            </View>
                            <View style={[styles.row, styles.padd]}>
                                {/* <Text style={styles.text}>{strings.orderHistory.invoice.transactionId}</Text> */}
                                <Text style={styles.text} numberOfLines={1}>{item.service_detail}</Text>
                            </View>

                        </View>
                        {/* { item.service_image!=""|| item.service_close_date =="" ? */}
                        {item.service_close_date  ? null:
                        <View style={styles.item} activeOpacity={.7} >
                       
                <Image
                    source={{ uri: item.service_image }}
                    style={styles.image}
                />
                          
            </View>
    }
             {/* :null} */}
            {item.service_audio?
            <View style={[styles.row1,styles.availabilityIconContainer]}>
              
               
                    <View style={{paddingTop:10,justifyContent:'center',alignContent:'center',marginLeft:8}}>
                      {item.service_audio?

                          <Text style={{ flexDirection:'row',textAlign: 'center', fontWeight: '800', color: '#fff' }}>{playTime}</Text>
                        
                      : 
                      <Text style={{ textAlign: 'center', fontWeight: '800', color: '#fff', marginTop: 10 }}>{playTime}</Text>
                      }
                   
                    {/* /<Progress.Bar progress={playTime} width={width-20}/> */}
                   </View>
                    </View>
                   :null} 
                    <View style={styles.row1}>
                    
                     
                {item.service_audio?item.service_audio?
                <View style={styles.availabilityIconContainer}>
               
                  <TouchableOpacity activeOpacity={0.8} style={styles.IconButton} onPress={()=>this.onStartPlay()}>
                  
                    <Image source={Images.play} style={styles.imageIcon} />
  
                  </TouchableOpacity>
                 
                  <Text style={{textAlign:'center',fontWeight:'800',color:'#fff',marginTop:5}}>Play</Text>
                </View> 
                 : 
                 <View style={[styles.availabilityIconContainer,{marginEnd:20}]}>
                 <TouchableOpacity activeOpacity={0.8} style={styles.IconButton} onPress={()=>this.onStopRecord
                    ()}>
                   <Image source={Images.stop} style={styles.imageIcon} />
                  
                 </TouchableOpacity>
                 <Text style={{textAlign:'center',fontWeight:'800',color:'#fff',marginTop:5}}>Stop</Text>
             
               </View> :null }  
               
                </View>
                        {item.service_type == 'Free' ?
                        <SimpleGrid
              itemDimension={190}
              data={document_type}
              renderItem={this.renderItem}
              key={(item) => item.id + ''}
            />:null}
                        <View style={styles.formField}>
                            {item.service_status == 0?
                            <Text style={styles.label}>Service Detail </Text>
:null}
 {item.service_status == 0?
                            <View style={styles.inputContainer}>

                                <TextInput
                                    ref={this.phoneRef}
                                    placeholder="Enter the details of the service"
                                    //  keyboardType="numeric"
                                    autoCapitalize='none'
                                    autoCompleteType='off'
                                    autoCorrect={false}
                                    multiline={true}
                                    //  keyboardType={'phone-pad'}
                                    enablesReturnKeyAutomatically={true}
                                    //  onFocus={this.onFocus}
                                    onChangeText={this.onChangeText}
                                    // onSubmitEditing={this.onSubmitPhone}
                                    returnKeyType='next'
                                    value={detail}
                                    //  placeholderTextColor={errorPhone}

                                    style={[styles.inputText]}
                                />

                            </View>
:null}
                        </View>
                        {item.service_status == 0 ?
                            <TouchableOpacity style={styles.signInButton} onPress={() => this.permissionFunc(item)}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF6A00', '#EE0979']} style={styles.linearGradient}>
                                    <Text style={styles.cancelText}>close Service</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            : null}
                    </ScrollView>
                </Animatable.View>

            </View>
        )
    }
}

let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.PRIMARY,
        zIndex: 9999,
    },
    signInButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        // margin: 5,
    },
    image: {
        width: screenWidth-50 ,
                height: 180,
                //  resizeMode: 'cover',
                
    },
    linearGradient: {
        width: '60%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    checkboxContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
       
        // marginTop: 20
      },
      checkboxLabel: {
        color: COLORS.DEFAULT,
        fontSize: 16,
        fontFamily: "Poppins-medium",
        marginLeft: 5
      },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.DEFAULT,
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10,
    },
    inputContainer: {
        width: screenWidth - 40,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.black,
        borderRadius: 10,
    },
    footer: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 5,
        marginTop: 20
    },
    scrollView: {
        flexGrow: 1,
    },
    formField: {
        width: screenWidth - 40,
        margin: 5
    },
    availabilityIconContainer: {
        position: 'relative',
        // top: '42%',
       
         alignSelf: 'center',
        marginTop:10,
       
    },
    imageIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
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
    label: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        margin: 5,
        marginLeft: 15
    },
    // seperator: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     flexDirection: 'row', 
    //     borderTopColor: '#ccc', 
    //     borderTopWidth: 1, 
    //     margin: 10
    // },
    headerSeperator: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        paddingLeft: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    inputText: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.black,
        marginLeft: '3%'
    },
    row1: {
        flexDirection: 'column',
        marginVertical: 5,
    alignItems:'flex-start',
    marginLeft:10,
      },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    padd: {
        padding: 3,
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
        color: COLORS.PRIMARY,
    },
    box: {
        borderColor: COLORS.SUCCESS,
        borderWidth: 1,
        backgroundColor: COLORS.DEFAULT,
        margin: 5,
        padding: 5,
        borderRadius: 5,
        marginBottom: 10
    },
    text: {
        fontSize: 14,
        color: COLORS.PRIMARY,
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
        // textTransform: 'capitalize'
    },
    orderIdText: {
        fontSize: 14,
        color: COLORS.PRIMARY,
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    headerAmount: {
        fontSize: 30,
        color: COLORS.DEFAULT
    },
    success: {
        fontSize: 26,
        color: COLORS.SUCCESS
    },
    bold: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 5,
    },
    small: {
        fontSize: 12,
        padding: 2,
        paddingLeft: 5,
        color: COLORS.INPUT_LABEL
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

export default connect(mapStateToProps, mapDispatchToProps)(Serviceinvoice);
