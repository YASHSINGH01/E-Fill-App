TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
//Components
import Header from '../../components/Header';
//Constants
import { Images } from "../../constants/";
//Styles
import styles from './styles';
//Tab View

import Tab2 from "./tabView/tab2";

import { strings } from "../../utils/translations";

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

export default class PointsHistory extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            historyData: [],
            refreshing: false,
            index: 0,
            routes: [
            // { key: 'first', title: strings.chargingHistory.new },
            { key: 'second', title: strings.chargingHistory.completed },
            // { key: 'third', title: strings.chargingHistory.cancelled },
           
            ],
        };
    }
   
    // Get Notifications Through Api
    getHistory = () => {
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

    _handleIndexChange = index => this.setState({ index });

    _renderTabBar = props => {
      return (
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            // return (
            //     this.state.index == i ?
            //     <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.tabItem}  key={i}>
            //         <TouchableOpacity
            //             onPress={() => this.setState({ index: i })} >
            //             <Animated.Text style={styles.headerText}>{route.title}</Animated.Text>
            //         </TouchableOpacity>
            //     </LinearGradient> : 
            //     <TouchableOpacity
            //             style={styles.tabItem}
            //             key={i}
            //             onPress={() => this.setState({ index: i })} >
            //             <Animated.Text style={styles.headerText}>{route.title}</Animated.Text>
            //     </TouchableOpacity>
            // );
          })}
        </View>
      );
    };

    _renderScene = SceneMap({
      first: () => <Tab1 navigation={this.props.navigation} data={this.props}/>,
      second: () => <Tab2 navigation={this.props.navigation} data={this.props}/>,
      third: () => <Tab3 navigation={this.props.navigation} data={this.props} />
    });
    
    render() {
        let { navigation } =  this.props;
        let { isLoading } = this.state;
//  console.log('louyshist',this.props.route.params.data)
        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.francisee.history}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <View style={styles.bodyContainer}>
                        <TabView
                            navigationState={this.state}
                            renderScene={this._renderScene}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                    </View>
                </Animatable.View>
            </View>
        )
    }
}
