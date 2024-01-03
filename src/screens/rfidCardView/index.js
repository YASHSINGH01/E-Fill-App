import React, { Component } from 'react'
import { Text, View, Image,Alert, FlatList, RefreshControl, TextInput, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

//Components
import Header from '../../components/Header';
//Redux
import { connect } from 'react-redux';

//Api
import HttpRequest from "../../utils/HTTPRequest";
// Theme Colors
import { Images } from '../../constants';
//Styles
import styles from './styles';
import { strings } from "../../utils/translations";

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

class rfidCardView extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            isClear: false,
            historyData: [],
            refreshing: false,
          
        };

        // this.onFocus = this.onFocus.bind(this);
    }
   
    componentDidMount = () => {
            this.getRfidCards();
    }

    updateRef(name, ref) {
        this[name] = ref;
    }
    deleteIt = (id) => {
        Alert.alert(
            "Alert",
            "Are you sure to delete this Card ?",
           
            [
                {
                    text: "OK",
                    onPress: () =>  
                    HttpRequest.deleteIt({cardid: id} ,this.props.token )
                    .then(res => {
                        this.setState({ isLoading: false });
                        const result = res.data;
                        if (res.status == 200 && !result.error) {
                            this.getRfidCards();
                        } else {
                            this.setState({ refreshing: false });
                        }
                    })
                    .catch(err => {
                        this.setState({ isLoading: false, refreshing: false });
                    })
                },
                {
                    text: "Cancel",
                    onPress: () =>    this.props.navigation.navigate('rfidCardView')
                }
             ],
             )
       
    }
    //Get Order history through API 
    getRfidCards = () => {
        HttpRequest.getRfidCards(this.props.token)
        .then(res => {
            this.setState({ isLoading: false });
            const result = res.data;
            if (res.status == 200 && !result.error) {
              // console.log("Get Order history API Response ---------- ", result);
               this.setState({ historyData: res.data});
              // console.log(this.state.historyData,"sdfgh");
              
            } else {
                this.setState({ refreshing: false });
                //console.log("Get Order history API Error : ",result);
            }
        })
        .catch(err => {
            this.setState({ isLoading: false, refreshing: false });
            //console.log("Get Order history API Catch Exception: ",err);
        });
    }

    Scanner = () => {
        let { navigation } = this.props;
        console.log("navigate",navigation);
        navigation.navigate('scanner');
    }

    renderItem = ({ item }) => (
          <TouchableOpacity style={styles.item}>
            <View style={styles.itemHeader}>
             <View style={styles.iconContainer}>
                                              <Image source={Images.sig} style={styles.imageIcon}/>
                                                                        </View>
                <View style={styles.row}>

                    <View style={[styles.content, { flex: 2}]}>

                     <View style={[styles.row, styles.descriptionContent]}>
                                                <Text style={[styles.text,styles.description, styles.label]}> Card ID :</Text>
                                                <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.tagid}</Text>
                                            </View>
                        <View style={[styles.row, styles.descriptionContent]}>
                            <Text style={[styles.text,styles.description, styles.label]}>Registered Date :</Text>
                            <Text style={[styles.text,styles.description, styles.leftAlign]}>{item.added_date}</Text>
                        </View>
                        <TouchableOpacity activeOpacity={5} onPress={() => { this.deleteIt(item.tagid) }}>

<Icon size={20} name={'trash'} color={'#ff6633'} style={styles.icon} />
</TouchableOpacity>
                    </View>
                </View>
            </View>
          </TouchableOpacity>
    )

    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>Not any card added</Text>
        </View>
    )


    render() {
        let { navigation } =  this.props;
        let { isLoading, historyData, refreshing } = this.state;

        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.rfidView.title}/>
                </View>

                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    { isLoading ?
                        <ActivityIndicator size='large' color='#fff' />
                        :
                        <FlatList
                            data={this.state.historyData}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id+''}
                            ListEmptyComponent={() => this.listEmptyComponent()}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={'#fff'}/>
                            }                           
                        />
                        
                    }
                </Animatable.View>
                <View>
                        <Text numberOfLines={2} style={{color:'#fff',textAlign:'center',fontSize:12,margin:5}}>To use this feature,Please maintain a minimum balance of Rs.1000 in your wallet. </Text>
                    </View>
                <View style ={{marginLeft:55}}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                <TouchableOpacity  activeOpacity={5} onPress={() => { this.Scanner() }}>
                <Text style={styles.buttonText}>{strings.rfid.subtitle}</Text>
                </TouchableOpacity>
                </LinearGradient>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    };
};


export default connect(mapStateToProps)(rfidCardView);
