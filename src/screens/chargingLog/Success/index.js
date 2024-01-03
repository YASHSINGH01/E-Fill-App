import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, Image, Button, FlatList, TextInput } from 'react-native';
//Library

import Icon from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';
// import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { showMessage } from "react-native-flash-message";
import StarRating from 'react-native-star-rating';

//Api
import HttpRequest from "../../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userInfo, loginToken } from '../../../Redux/Actions/Actions';
//Components
// import Header from '../../../../Header';

import { Images } from "../../../constants/";
// //Styles
// import styles from './styles';
import {
    useTheme,
    Title,
    Caption,
    Drawer
} from "react-native-paper";
//Constants
import COLORS from "../../../constants/colors";
import { strings } from "../../../utils/translations";


class ChargingError extends Component {
    constructor(props) {
        super(props);
        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.reviewRef = this.updateRef.bind(this, 'review');
        this.state = {
            isLoading: false,
            message: '',
            reason: '',
            review: '',
            rating: 0,
            refreshing: false,
            reviewData: '',
            isAdded: false,

        }


    }

    componentDidMount = () => {
        this.errorcheck();
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
        ['review']
          .map((name) => ({ name, ref: this[name] }))
          .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
              this.setState({ [name]: text });
            }
          });
    }
  
    onSubmitReview = () => {
        this.review.blur();
    }
  
    onSubmit = () =>  {  
        let errors = {};
  
        ['review']
          .forEach((name) => {
            let value = this.state[name];
  
            if (!value) {
              errors[name] = strings.chargingStationDetails.reviews.response.error.emptyError;
            } 
          });
  
        this.setState({ errors });
        if(Object.entries(errors).length === 0){
          this.submitReview();
        }
    }
    errorcheck = () => {
        let { order_id1 } = this.props.route.params;
        let { navigation } = this.props;
     
        HttpRequest.errorcheck({ booking_id: order_id1 })
            .then(res => {
                const result = res.data;
                if (res.status == 200 && !result.error) {
                    console.log(result, 'result');
                    // if (result.reason == '') {
                    //     this.props.navigation.dispatch(
                        
                    //         CommonActions.reset({
                    //             index: 1,
                    //             routes: [
                    //                 { name: 'Home' },
                    //                 {
                                        
                    //                     name: 'Home',
                    //                     params: { },
                    //                 },
                    //             ],
                    //         })
                    //     );
                    // } else {
                        this.setState({ message: result.reason_message, reason: result.reason })
                    }
                
            })
            .catch(err => {
                console.log('API CATCH EXCEPTION', err);
            });


    }

    // Function to use Add Review API
    submitReview = () => {
        this.setState({ isLoading: true });

        let { order_id1 } = this.props.route.params;
         let { rating, review, id } = this.state;
         console.log('hhd',rating,review)
         if(this.state.review!=""|| this.state.rating!=""){
        if( order_id1 != undefined ){
            HttpRequest.addReviews_new({ order_id: order_id1 ,rating:rating,review:review})
            .then(res => {
                const result = res.data;
                this.setState({ isLoading: false });
                if (res.status == 200 && !result.error ) {
                    console.log("Add Reviews to List API Response ---------- ", result.data);
                    showMessage({
                        message: strings.chargingStationDetails.reviews.response.success.title,
                        description: strings.chargingStationDetails.reviews.response.success.message,
                        type: "success"
                    });
                    this.props.navigation.navigate('Home');
                    // this.getAllReviews();
                } else {
                    console.log("Add Reviews to List API Error : ",result);
                    showMessage({
                        message: strings.chargingStationDetails.reviews.response.error.title,
                        description: strings.chargingStationDetails.reviews.response.error.submitError,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false });
                console.log("Add Reviews to List  API Catch Exception: ",err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
        } else {
            console.log("Undefined Charging station ID ",  this.props);
            this.setState({ isLoading: false });
        }
    }else{
        this.props.navigation.navigate('Home');
    }
    }

    goBack = () => {
        this.props.navigation.navigate('Home');
    }

    render() {
        let { order_id1 } = this.props.route.params;
        let { navigation } = this.props;
        let {  isLoading,message,errors = {}, reason,review, rating,refreshing} = this.state;
        const errorReview = errors.review == undefined ? '#808080' : '#ff0000';

        return (
            <View style={styles.container}>
                 <View style={styles.header}>
                    {/* <Header navigation={navigation} type={strings.chargerfault.title} /> */}
                </View> 
                <TouchableOpacity style={styles.closeButton} onPress={()=>this.goBack()}>
                        <Icon name="close-circle" size={25} color="#fff" style={styles.closeIcon} />
                    </TouchableOpacity>
                <Animatable.View style={styles.container1}>
                <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={100} extraScrollHeight={100} contentContainerStyle={styles.scrollView}>
                    { reason == '' ?
                    <>
                    
                     <View animation="fadeInUpBig"style={{flex:1,}}>
                        
                             <View style={{ justifyContent: 'flex-start',
        alignItems: 'center',}}>

               <Image source={Images.success} style={styles.image} />
                        <View style={[styles.formField,styles.ratingContent]}>
                            <View style={styles.col}>
                                <Text style={styles.label}>Please share your charging experience.</Text>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={rating}
                                    selectedStar={(rating) => this.setState({ rating: rating})}
                                    fullStarColor={'#A4FF8B'}
                                    emptyStarColor={'#fff'}
                                    starSize={20}
                                    starStyle={{ marginLeft: 15, marginVertical: 5}}
                                />
                            </View>
                        </View>
                        <View style={styles.formField}>
                            <Text style={styles.label}>{strings.chargingStationDetails.reviews.review}</Text>
                            <View style={[styles.inputContainer, { height: 80}]}>
                                <TextInput
                                    ref={this.reviewRef}
                                    placeholder={strings.chargingStationDetails.reviews.reviewPlaceholder}
                                    autoCompleteType='off'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    multiline={true}
                                    numberOfLines={6}
                                    enablesReturnKeyAutomatically={true}
                                    onFocus={this.onFocus}
                                    onChangeText={this.onChangeText}
                                    onSubmitEditing={this.onSubmitReview}
                                    // returnKeyType='done'
                                    value={review}
                                    placeholderTextColor={errorReview}
                                    style={[styles.inputText,{ color: errorReview}]}
                                />
                            </View>
                                {errors.review != undefined &&
                                <Text style={styles.error}>{errors.review}</Text>
                                }
                        </View>
                      
                        </View>
                        <TouchableOpacity onPress={!isLoading ? this.submitReview : null }>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                            { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                                <Text style={styles.buttonText}>{strings.chargingStationDetails.reviews.submitReview}</Text>
                            } 
                            </LinearGradient>
                        </TouchableOpacity>  
                        {/* <View style={{flex:1}}>
                        <FlatList
                        data={abc}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id+''}
                        // ListHeaderComponent={this.renderHeader}
                        ListEmptyComponent={() => this.listEmptyComponent()}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={'#fff'}/>
                        }
                    />
                    </View> */}
                    {/* </ScrollView> */}
                    </View>
                 
                    {/* <Title style={styles.title}>YOU HAVE SUCCESSFULLY CHARGED YOUR VEHICLE.</Title> */}
                    {/* <TouchableOpacity onPress={() => this.goBack()}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                                <Text style={styles.buttonText}>{strings.newPassword.goBack}</Text>
                            </LinearGradient>
                        </TouchableOpacity> */}
                        </>
                    :
                    <><Image source={Images.warning} style={styles.image} /><Title style={styles.title}>{reason}</Title><Title style={styles.titlee}>{message}</Title><TouchableOpacity onPress={() => this.goBack()}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF6A00', '#EE0979']} style={styles.signInButton}>
                                <Text style={styles.buttonText}>{strings.newPassword.goBack}</Text>
                            </LinearGradient>
                        </TouchableOpacity></>
    }
    </KeyboardAwareScrollView>
                </Animatable.View>
            </View>
        );
    }
}


const mapStateToProps = state => {

    return {
        info: state.info,
        token: state.token,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userInfo: bindActionCreators(userInfo, dispatch),
        loginToken: bindActionCreators(loginToken, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChargingError);


let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.PRIMARY
    },
    container1: {
        flex: 8,
        backgroundColor: COLORS.PRIMARY,
        // marginTop: 100,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    formField: {
        width: screenWidth - 40 ,
        
        marginBottom: 10,
    },
    ratingContent: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 5
    },
    label: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        fontWeight: '500',
        margin: 10,
        marginLeft: 15
    },
    formField: {
        width: screenWidth - 40 ,
        
        marginBottom: 10,
    },
    inputContainer: {
        width: screenWidth - 40 ,
        height: 60, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.black,
        borderRadius: 10,
    },
    inputText: {
        flex:1,
        height:'100%',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.black,
        marginLeft: '2%'
    },
    closeIcon: {
        width: 30,
        height: 30,
        // resizeMode: 'contain'
    },
    error: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        marginLeft: 15,
        padding: 5,
        color: '#ff0000',
    },
    header: {
        flex: 0.5,
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    signInButton: {
        width: screenWidth - 150 ,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft:75,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 30
    },
    buttonText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: '500',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    image: {
        marginTop: 60,
        margin: 20,
        width: 150,
        height: 140,
        resizeMode: 'cover',
        borderRadius: 0,
        justifyContent: 'center',
        alignSelf: 'center'

    },
    closeButton: {
        flex: 0.3,
        marginTop:10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    
    image1: {
        width: 40,
        height: 30,
        resizeMode: 'contain',
        borderRadius: 30,
        marginLeft: 10,
        alignSelf: 'center'
    },

    title: {
        fontSize: 24,
        fontFamily: "Poppins-Regular",
        marginTop: 10,
        fontWeight: '600',
        textAlign: 'center',
        color: COLORS.DEFAULT,
        justifyContent: 'center',
        alignContent: 'center',
    },
    titlee: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        marginTop: 10,
        fontWeight: '600',
        textAlign: 'center',
        color: COLORS.DEFAULT,
        justifyContent: 'center',
        alignContent: 'center',
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bodyContent: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemHeader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginTop: 25,
    },
    item: {
        flex: 1,
        height: 75,
        flexDirection: 'row',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 2,
        zIndex: 998,
    },
    modalContainer: {
        width: '80%',
        height: '30%',
        marginHorizontal: '50%',
        justifyContent: 'center',
        backgroundColor: COLORS.DEFAULT,
        borderRadius: 6,
    },
    modalScrollView: {
        flexGrow: 1,
        width: '100%',
    },

});