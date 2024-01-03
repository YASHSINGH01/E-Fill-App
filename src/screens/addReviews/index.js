import React, { Component } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { Text, View, ScrollView, TouchableOpacity,RefreshControl, TextInput, Image, ActivityIndicator } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage, hideMessage } from "react-native-flash-message";
import StarRating from 'react-native-star-rating';
//Api
import HttpRequest from "../../utils/HTTPRequest";
import {
    Avatar
} from "react-native-paper";
import { Images } from '../../constants';

//Redux
import { connect } from 'react-redux';
import { reviewsList } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Components
import Header from '../../components/Header';
//Styles
import styles from './styles';

import { strings } from '../../utils/translations';

class AddReviews extends Component {
    constructor(props){
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.reviewRef = this.updateRef.bind(this, 'review');

        this.state = {
            isLoading: false,
            review: '',
            rating: 5,
            refreshing: false,
            reviewData: '',
            isAdded: false,
            rating: 5,
            abc:'',
            id:'',
        };
    }
    componentDidMount = () => {
        this.getAllReviews();
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

    getAllReviews = () => {
        let { item } = this.props.route.params;
        // console.log(item,'asdfghjknbv');
        console.log(item.id,'asdfghjk');
            HttpRequest.getChargingStationReviews({ id: item.id }, this.props.token)
            .then(res => {
            //     this.setState({ isLoading: false });
                const result = res.data;
                 if (res.status == 200 && !result.error) {
                     console.log("Reviews List API Response ---------- ", result.data);
                     this.setState({abc:result.data});
                    this.props.reviewsList(result.data);
                } else {
                    console.log("Reviews List API Error : ",result);
                }
            //     this.props.navigation.goBack();
             })
            .catch(err => {
                this.setState({ isLoading: false });
                console.log("Reviews List API Catch Exception: ",err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
             });
    }
  
    // Function to use Add Review API
    submitReview = () => {
        this.setState({ isLoading: true });

        let { item } = this.props.route.params;
        let { rating, review, id } = this.state;
        if( id != undefined ){
            HttpRequest.addReviews({ id: item.id, rating: rating, review: review }, this.props.token)
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
                    this.getAllReviews();
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
    }

    renderItem = ({ item }) => (
        <View style={[styles.item, item.isCurrent ? styles.active : null]}>
            <View style={styles.itemHeader}>
                {/* Charging Station Image & Ratings */}
                <View style={styles.row}>
                    {/* <Image source={{uri: item.avtar_url}} style={styles.image}/> */}
                    <Avatar.Image 
                        source={ Images.userIcon }
                        style={{ backgroundColor: '#113C60'}}
                    />
                    <View style={styles.content}>
                        <View style={[styles.row, { justifyContent: 'space-between'}]}>
                            <Text style={[styles.textt, styles.title]}>{item.name}</Text>
                            { item.rating != "No rating yet" ?
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={parseInt(item.rating)}
                                fullStarColor={'#5dda96'}
                                emptyStarColor={'#fff'}
                                starSize={18}
                                starStyle={{ alignSelf: 'flex-end' }}
                            /> : null }
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.textt,styles.description]}>{item.created_at}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.footerContent}>
                        <Text style={[styles.textt,styles.description]}>{item.review}</Text>
                        {item.isCurrent ? 
                        <TouchableOpacity style={styles.trashIconContainer} onPress={()=> this.deleteReview(item.id)}>
                            <Icon name="ios-trash" size={22} color="#F44336" />
                        </TouchableOpacity>
                        : null }
                    </View>
                </View>
            </View>
           
        </View>
    );
    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>{strings.chargingStationDetails.reviews.notFound}</Text>
        </View>
    )
    render() {
        let { navigation } =  this.props
        let { isLoading, errors = {}, review, rating,refreshing,abc} = this.state;
        const errorReview = errors.review == undefined ? '#808080' : '#ff0000';

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                  <Header navigation={navigation} type={strings.chargingStationDetails.reviews.title}/>
                </View>
                {/* <Animatable.View animation="fadeInUpBig" >  */}
                {/* <ScrollView contentContainerStyle={styles.scrollView}
                    scrollEnabled={false}> */}
                   
                         {/* <View style={styles.headerField}>
                            {/* <Text style={styles.headerText}>{strings.chargingStationDetails.reviews.chargingStation}</Text>
                            <Icon name={'ios-chevron-down'} size={24} color={'#A4FF8B'} /> */}
                        {/* </View>   */}
                        
                         {/* <View style={styles.foooter}> */}
                         <Animatable.View animation="fadeInUpBig"style={{flex:8,}}>
                             <View style={{ justifyContent: 'flex-start',
        alignItems: 'center',}}>
                        <View style={[styles.formField,styles.ratingContent,]}>
                            <View style={styles.col}>
                                <Text style={styles.label}>{strings.chargingStationDetails.reviews.rating}</Text>
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
                                    returnKeyType='next'
                                    value={review}
                                    placeholderTextColor={errorReview}
                                    style={[styles.inputText,{ color: errorReview}]}
                                />
                            </View>
                                {errors.review != undefined &&
                                <Text style={styles.error}>{errors.review}</Text>
                                }
                        </View>
                        <TouchableOpacity onPress={!isLoading ? this.onSubmit : null }>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                            { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                                <Text style={styles.buttonText}>{strings.chargingStationDetails.reviews.submitReview}</Text>
                            } 
                            </LinearGradient>
                        </TouchableOpacity>  
                        </View>
                        <View style={{flex:1}}>
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
                    </View>
                    {/* </ScrollView> */}
                    </Animatable.View>
                    </View> 
                
             
            // </View>
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.token,
    };
};
  
  
const mapDispatchToProps = (dispatch) => {
    return {
        reviewsList: bindActionCreators(reviewsList, dispatch)
    };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(AddReviews);
