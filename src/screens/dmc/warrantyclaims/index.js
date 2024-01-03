TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image , ScrollView, Dimensions,StyleSheet,} from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
//Components
import Header from '../../../components/Header';
//Constants
import { Images } from "../../../constants";

import { strings } from '../../../utils/translations';
// Theme Colors
import LinearGradient from 'react-native-linear-gradient';
import COLORS from "../../../constants/colors";
import { FlatGrid,SimpleGrid } from 'react-native-super-grid';

export default class WarrantyClaims extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            list : [
                { 
                  id: '1',
                  title: strings.warranty.open, 
                  icon: Images.open,
                  route: 'openwarranty'
                },
                { 
                  id: '2',
                  title: strings.warranty.closed, 
                  icon: Images.closed,
                  route: 'closewarranty'
                },
                { 
                    id: '3',
                    title: strings.warranty.create, 
                    icon: Images.stock,
                    route: 'warrantyform'
                  },
                  
                 
                 
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
    // onSubmit(){
    //   let { navigation } =  this.props;
    //   navigation.navigate("warrantyform");
    // }
    renderItem = ({ item, index }) => (
      <View style={styles.row}>
        <View style={[styles.item,index != 3 ? styles.border : null]} key={""+item.id}>
        
          <View>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate(item.route)}>
            <View style={styles.iconContainer}>
                <Image source={item.icon} style={styles.imageIcon} />
                </View>
                <Text style={styles.essentialsLabel} numberOfLines={2}>{item.title}</Text>
                {/* <Icon name={'ios-arrow-forward'} size={24} color={'#fff'} /> */}
            </TouchableOpacity>
            </View>
            </View>
       </View>
       
       
    );
    render() {
        let { navigation } =  this.props;
        let { isLoading, list} = this.state;
        // console.log('prefrence',list);
        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.dmc.warrenty_claim}/>
                </View>
                <Animatable.View animation="fadeInUp" style={styles.footer}>
                  <View style={{paddingLeft:30,paddingRight:20,marginLeft:30}}>
                <SimpleGrid   
             
  itemDimension={100}
  data={list}
  renderItem={this.renderItem}
  key={(item)=>item.id+''}
/>
</View>
{/* <View style={{height:20}}>
<TouchableOpacity onPress={()=>!isLoading ? this.onSubmit() : null }>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                          { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                            <Text style={styles.buttonText}>Create Warranty Claims</Text>
                          } 
                        </LinearGradient>
                    </TouchableOpacity> 
                    </View> */}
                </Animatable.View>
            </View>
        )
    }
}

let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: COLORS.PRIMARY,
        zIndex: 9999,
        
      },
      signInButton: {
        // borderColor:'#fff',borderWidth:2,
        width: 200 ,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginLeft:100,
        marginBottom:280,
      //  flex:1,
         marginTop: 30
    },
      header: {
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
         
      },
      footer: {
          flex: 8,
      //    marginLeft:20,
      marginTop:20,
      // borderColor:'#fff',borderWidth:2
          // marginHorizontal: 20,
      },
      text: {
          color: COLORS.BLACK,
          fontSize: 14,
          fontFamily: "Poppins-medium",
          margin: 5
      }, 
      item: {
          flex: 1,
          marginTop: 8,
          // backgroundColor: 'aliceblue',
      },
    
      row: {
          flexDirection: 'row',
          marginVertical: 10,
          // borderColor:'#fff',borderWidth:2
         
      },
      title:{
          // flex: 1,
          fontSize: 14,
          fontFamily: "Poppins-medium",
          fontWeight:'500',
          color: COLORS.DEFAULT,
      },
      // bodyContainer: {
      //     // flex: 1,
      //     width:80,
      //     // width: 100,
      //                                 // height: 70,
      //                                 justifyContent: 'center',
      //                                 alignItems: 'center',
      //                                 // backgroundColor: COLORS.HEADER_BACKGROUND,
      //                                 // borderRadius: 10,
      //                                 // marginBottom: 0,
      //     //  flexDirection: 'column',
      //     backgroundColor: COLORS.ERROR,
      //     // justifyContent: 'center',
      //     // alignItems: 'center',
      //     // margin:0,
      //     // padding:0
      // },
      // iconView: {
      //     // flex: 1,
      //     // flexDirection: 'column',
      //     justifyContent: 'center',
      //     alignItems: 'center',
      // },
      iconContainer: {
          // flex:1,
          width: 80,
          height:90,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.HEADER_BACKGROUND,
          borderRadius: 10,
          
      },
      imageIcon : {
          // height:40,
           resizeMode: 'contain'
      },
      // icon: {
      //     // width: 30,
      //     resizeMode: 'contain',
      //     // marginRight: 20
      // },
      essentialsLabel: {
          fontSize: 14,
          fontFamily: "Poppins-Regular",
          color: COLORS.DEFAULT,
          // textAlign: 'center',
          fontWeight: 'bold',
      },
  });
