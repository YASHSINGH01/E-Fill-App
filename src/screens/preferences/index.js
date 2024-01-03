TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
//Components
import Header from '../../components/Header';
//Constants
import { Images } from "../../constants";
//Styles
import styles from './styles';
import { strings } from '../../utils/translations';

export default class Preferences extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            list : [
                { 
                  id: '1',
                  title: strings.preferences.notificationSetting, 
                  icon: Images.notificationSettings,
                  route: 'NotificationSetting'
                },
                { 
                  id: '2',
                  title: strings.preferences.languageSetting, 
                  icon: Images.Language,
                  route: 'LanguageSetting'
                },
                // { 
                //     id: '3',
                //     title: strings.preferences.mobility, 
                //     icon: Images.mobile_device,
                //     route: 'StationVisibility'
                //   },
                  // { 
                  //   id: '4',
                  //   title: strings.preferences.distributer, 
                  //   icon: Images.chargers,
                  //   route: 'Buyers'
                  // },
                  // { 
                  //   id: '5',
                  //   title: strings.preferences.franchise, 
                  //   icon: Images.chargers,
                  //   route: 'Franchise'
                  // },
                  // { 
                  //   id: '6',
                  //   title: strings.preferences.user, 
                  //   icon: Images.chargers,
                  //   route: 'Users'
                  // },
                
          ]
        };
    }
   
    // Get Notifications Through Api
    getNotifications = () => {
        this.setState({ isLoading: true });
        setTimeout( () => { 
          this.setState({
            isLoading: false
          })
       }, 1000);
    };

    renderItem = ({ item, index }) => (
        <View style={[styles.item,index != 3 ? styles.border : null]} key={""+item.id}>
            <TouchableOpacity style={styles.row} onPress={()=>this.props.navigation.navigate(item.route)}>
                <Image source={item.icon} style={styles.icon} />
                <Text style={[styles.title, styles.font]} numberOfLines={2}>{item.title}</Text>
                <Icon name={'ios-arrow-forward'} size={24} color={'#fff'} />
            </TouchableOpacity>
       </View>
    );
    render() {
        let { navigation } =  this.props;
        let { isLoading, list} = this.state;
        // console.log('prefrence',list);
        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.preferences.title}/>
                </View>
                <Animatable.View animation="fadeInUp" style={styles.footer}>
                    <FlatList
                        data={list}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id+''}
                    />
                </Animatable.View>
            </View>
        )
    }
}
