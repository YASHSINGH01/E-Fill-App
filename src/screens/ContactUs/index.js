import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Linking, RefreshControl } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Avatar } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import {
    useTheme,
    Title,
    Caption,
    Drawer
} from "react-native-paper";
//Components
import Header from '../../components/Header';
//Constants
import { Images } from "../../constants/";

//Redux
import { connect } from 'react-redux';
import { userInfo, loginToken } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';

import { strings } from '../../utils/translations';

//Styles
import styles from './styles';
//Tab View

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

class ContactUs extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            profileData: [],
            refreshing: false,
            profile_image: Images.userIcon,
contactno:'+917404887076',
email:'info@efill.co.in',
        };
    }

    dialCall = () => {
        let {contactno}= this.state;
        
       let phoneNumber = contactno;
        phoneNumber = phoneNumber;
        if(phoneNumber.startsWith("+")){
            var temp = phoneNumber.substring(3, phoneNumber.length);
            phoneNumber = "0"+temp;
        }
        console.log("phone: ",phoneNumber);
        if (Platform.OS === 'android') {
          phoneNumber = 'tel:${'+phoneNumber+'}';
        }
        else {
          phoneNumber = 'telprompt:${'+phoneNumber+'}';
        }
//
        Linking.canOpenURL(phoneNumber)
		.then((supported) => {
			if (supported) {
				return Linking.openURL(phoneNumber)
					.catch(() => null);
			}
		});
    };

    sendEmail = () => {
        let {email}= this.state;

        if(email != '' || email != null){
            Linking.openURL('mailto:'+email+'?subject='+' | Charging Station Query')
        }
    }

    render() {
        let { navigation, info } =  this.props;
        let {contactno, email} = this.state;
        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.contactus.title}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                {/* <ScrollView
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={[1]}
                    > */}
                    <View style={styles.headerContainer}>
                        {/* <Avatar.Image
                            source={ profile_image }
                            onError={ this.onError.bind(this) }
                        /> */}
                         <View style={[styles.roww, styles.chargingStationDetailsContainer]}>
                          <Image source={Images.contactus} style={styles.image}/>
                         </View>
                        <View style={styles.headerTextContainer}>
                        <Title style={styles.text}>{strings.contactus.query}</Title>
                            {/* <Title style={styles.title}>{strings.contactus.namehead}{strings.contactus.name}</Title> */}
                            <TouchableOpacity onPress={this.dialCall}>
                            <Text style={styles.title}>{strings.contactus.phoneno}{contactno}</Text>
                                </TouchableOpacity>
                             <TouchableOpacity onPress={this.sendEmail} >
                             <Text style={styles.title}>{strings.contactus.email}{email}</Text>
                             </TouchableOpacity>

                            <Caption style={styles.caption}></Caption>
                        </View>
                    </View>

                    {/* </ScrollView> */}
                </Animatable.View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      info: state.info,
      token: state.token
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        userInfo: bindActionCreators(userInfo, dispatch),
        loginToken: bindActionCreators(loginToken , dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);