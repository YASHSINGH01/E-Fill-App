TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import { showMessage } from "react-native-flash-message";
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Api
import HttpRequest from "../../utils/HTTPRequest";
//Components
import Header from '../../components/Header';
import Accordian from '../../components/Accordian';

//Styles
import styles from './styles';
import { strings } from "../../utils/translations";

const DATA = [
    { 
        question: 'Is phone no compulsory for creating an account ?', 
        answer: 'Yes',
      },
      { 
        question: ' Can user recover his/her account through email id and/or phone no ?', 
        answer: 'Yes. User will get OTP and with the help of OTP user can recover his/ her account.',
      },
      { 
        question: 'Can user view the estimated price for charging', 
        answer: 'Yes, User can view the estimated price of charging in information panel.',
      },
      { 
        question: 'Can user edit his profile information ?', 
        answer: 'Yes, User can edit his profile information under my profile section.',
      },
      { 
        question: 'Can User change his Mobile no ?', 
        answer: 'Yes, User can change his/her mobile no. under my profile section.',
      },
      { 
        question: 'Can user view his/her Booking Details ?', 
        answer: 'Yes, User can view his booking details.',
      },
      { 
        question: 'Can user view the details of cancelled booking ?', 
        answer: 'Yes, User can view the details of cancelled booking',
      },
      
      { 
        question: 'Can user cancel the booking ?', 
        answer: 'Yes, user can cancel the booking any time.',
      },
      { 
        question: 'Can I make multiple bookings for the same time ?', 
        answer: ' Yes, you can book for multiple vehicles using same app.',
      },
      { 
        question: 'What is the significance of Gray, green, orange, and yellow charging station ?', 
        answer: '• Gray signifies not connected charging point, • Green signifies available charging point, • Orange signifies currently occupied charging point, • Yellow signifies deactivated charging point',
      },
      { 
        question: 'Can user view his invoice?', 
        answer: 'Yes, User can view his invoice under order history section.',
      },
      { 
        question: 'Can user pay the charging A through net banking ?', 
        answer: 'Yes, User can pay through Debit/Credit and net banking.',
      },
      { 
        question: 'Can user view the number of available charging points?', 
        answer: 'Yes, User can view the number of available charging points.',
      }
];

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

class Faq extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            faqData: DATA,
            refreshing: false
        };
    }

    componentDidMount = () => {
      this.getFaqs();
    }

    //Get List of Faqs Through Api
    getFaqs = () => {
      this.setState({ isLoading: true });
      HttpRequest.getFaqs({},this.props.token)
      .then(res => {
          const result = res.data;
          //  console.log("Get List of Faqs API Response ---------- ", result);
          if (res.status == 200 && !result.error) {
              //  console.log("Get List of Faqs API Response ---------- ", result);
              this.setState({ faqData:  result.data, isLoading: false })
          } else {
              console.log("Get List of Faqs API Error : ",result);
              this.setState({ faqData:  [], isLoading: false })
          }
      })
      .catch(err => {
          this.setState({ isLoading: false });
          console.log("Get List of Faqs API Catch Exception: ",err);
          showMessage({
             message: strings.error.title,
              description: strings.error.message,
              type: "danger",
          });
      });
    };
   
    // Get Notifications Through Api
    getNotifications = () => {
        this.setState({ isLoading: true });
        setTimeout( () => { 
          this.setState({
            isLoading: false
          })
       }, 1000);
    };

    onRefresh = () => {
        this.setState({ refreshing : true})
    
        wait(2000).then(() => this.setState({ refreshing : false}));
    }

    renderItem = ({ item }) => (
        <Accordian title = {item.question} data = {item.answer} />
    );
    render() {
        let { navigation } =  this.props;
        let { isLoading, faqData, refreshing} = this.state;

        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.faq.title}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <FlatList
                        data={faqData}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={'#fff'}/>
                        }
                        ListHeaderComponent={ 
                            <View style={styles.Intro}>
                                <Text style={[styles.introTitle]} numberOfLines={1}>{strings.faq.subTitle}</Text>
                                <Text style={[styles.introDescription]} numberOfLines={1}>{strings.faq.description}</Text>
                            </View>
                        }
                    />
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

export default connect(mapStateToProps,mapDispatchToProps)(Faq);


