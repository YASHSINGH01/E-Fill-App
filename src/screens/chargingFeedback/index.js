//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage, hideMessage } from "react-native-flash-message";
import StarRating from 'react-native-star-rating';
//Api
import HttpRequest from "../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
// import {  } from '../../Redux/Actions/Actions
import { bindActionCreators } from 'redux';
//Components
import Header from '../../components/Header';
//Styles
import styles from './styles';
import { strings } from '../../utils/translations';

class ChargingFeedback extends Component {
    constructor(props){
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    
        this.reviewRef = this.updateRef.bind(this, 'review');
        this.suggestionRef = this.updateRef.bind(this, 'suggestion');


        this.state = {
            isLoading: false,
            review: '',
            suggestion: '',
            overallExperience: 5,
            timelyResponse: 5,
            overallSatisfaction: 5,
            customerServices: 5,
        };
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
        ['review','suggestion']
          .map((name) => ({ name, ref: this[name] }))
          .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
              this.setState({ [name]: text });
            }
          });
    }
  
    onSubmitReview = () => {
        this.suggestion.focus();
    }

    onSubmitSuggestion = () => {
        this.suggestion.blur();
    }
  
    onSubmit = () =>  {  
        let errors = {};
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
        ['review']
          .forEach((name) => {
            let value = this.state[name];
  
            if (!value) {
              errors[name] = strings.error.emptyError;
            } 
        });
  
        this.setState({ errors });
        if(Object.entries(errors).length === 0){
          this.onFeebackSubmitted();
        }
    }
  
    // Function to use Add Feedback API
    onFeebackSubmitted = () => {
        this.setState({ isLoading: true });
        let { chargingHistoryDetails } = this.props.route.params;

        let {  review, suggestion, overallExperience, timelyResponse, overallSatisfaction, customerServices } = this.state;
        HttpRequest.submitFeeback({review: review, suggestion: suggestion, cs_id: chargingHistoryDetails.charging_station_id, order_id: chargingHistoryDetails.order_id, experince: overallExperience , timly: timelyResponse, satisfaction: overallSatisfaction, service: customerServices }, this.props.token)
            .then(res => {
                this.setState({ isLoading: false });
                const result = res.data;
                if (res.status == 200 && result.error == false) {
                    // console.log("Add Feedback API Response ---------- ", result.data);
                    showMessage({
                        message: strings.chargingFeedback.success,
                        description: strings.chargingFeedback.response.success.message,
                        type: "success"
                    });
                    this.props.navigation.goBack();
                } else {
                    console.log("Add Feedback API Error : ",result);
                    showMessage({
                        message: strings.error.title,
                        description: strings.chargingFeedback.response.error.message,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false });
                console.log("Add Feedback API Catch Exception: ",err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
    }

    render() {
        let { navigation } =  this.props
        let { isLoading, errors = {}, gender, name, email, review, suggestion, overallExperience, timelyResponse, overallSatisfaction, customerServices } = this.state;
    
        const errorReview = errors.review == undefined ? '#808080' : '#ff0000';

        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.chargingFeedback.title}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.headerField}>
                            <Text style={styles.headerText}>{strings.chargingFeedback.chargingStation}</Text>
                            <Icon name={'ios-chevron-down'}size={24} color={'#A4FF8B'} />
                        </View>
                    
                        <View style={styles.formField}>
                            <Text style={styles.label}>{strings.chargingFeedback.review}</Text>
                            <View style={[styles.inputContainer, { height: 100}]}>
                                <TextInput
                                    ref={this.reviewRef}
                                    placeholder={strings.chargingFeedback.writeReviewPlaceholder}
                                    autoCompleteType='off'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    multiline={true}
                                    numberOfLines={4}
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
                        <View style={styles.formField}>
                            <Text style={styles.label}>{strings.chargingFeedback.comment}</Text>
                            <View style={[styles.inputContainer, { height: 100}]}>
                                <TextInput
                                    ref={this.suggestionRef}
                                    placeholder={strings.chargingFeedback.commentPlaceholder}
                                    multiline={true}
                                    numberOfLines={4}
                                    autoCompleteType='off'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    onFocus={this.onFocus}
                                    onChangeText={this.onChangeText}
                                    onSubmitEditing={this.onSubmitSuggestion}
                                    returnKeyType='next'
                                    value={suggestion}
                                    placeholderTextColor={'#808080'}
                                    style={[styles.inputText,{ color: '#808080'}]}
                                />
                            </View>
                        </View>
                        <View style={[styles.formField,{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}]}>
                            <View style={styles.col}>
                                <Text style={styles.labelStart}>{strings.chargingFeedback.overallExperience}</Text>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={overallExperience}
                                    selectedStar={(rating) => this.setState({ overallExperience: rating})}
                                    fullStarColor={'#A4FF8B'}
                                    emptyStarColor={'#fff'}
                                    starSize={16}
                                />
                            </View>
                            <View style={styles.col}>
                                <Text style={styles.label}>{strings.chargingFeedback.timelyResponse}</Text>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={timelyResponse}
                                    selectedStar={(rating) => this.setState({ timelyResponse: rating})}
                                    fullStarColor={'#A4FF8B'}
                                    emptyStarColor={'#fff'}
                                    starSize={16}
                                    starStyle={{ marginLeft: 15}}
                                />
                            </View>
                        </View>
                        <View style={[styles.formField,{ flexDirection: 'row', justifyContent: 'space-between'}]}>
                            <View style={styles.col}>
                                <Text style={styles.labelStart}>{strings.chargingFeedback.overallSatisfaction}</Text>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={overallSatisfaction}
                                    selectedStar={(rating) => this.setState({ overallSatisfaction: rating})}
                                    fullStarColor={'#A4FF8B'}
                                    emptyStarColor={'#fff'}
                                    starSize={16}
                                />
                            </View>
                            <View style={styles.col}>
                                <Text style={styles.label}>{strings.chargingFeedback.customerServices}</Text>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={customerServices}
                                    selectedStar={(rating) => this.setState({ customerServices: rating})}
                                    fullStarColor={'#A4FF8B'}
                                    emptyStarColor={'#fff'}
                                    starSize={16}
                                    starStyle={{ marginLeft: 15}}
                                />
                            </View>
                        </View>
                        <TouchableOpacity onPress={!isLoading ? this.onSubmit : null }>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                            { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                                <Text style={styles.buttonText}>{strings.chargingFeedback.submitFeeback}</Text>
                            } 
                            </LinearGradient>
                        </TouchableOpacity>  
                    </ScrollView>
                </Animatable.View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    
    return {
      token: state.token,
    };
};
  
  
const mapDispatchToProps = (dispatch) => {
      return bindActionCreators({}, dispatch);
}
  
export default connect(mapStateToProps,mapDispatchToProps)(ChargingFeedback);
