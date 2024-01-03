TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image , ScrollView, StyleSheet, Dimensions,} from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
//Components
import Header from '../../../components/Header';
//Constants
import { Images } from "../../../constants";
//Redux
import { connect } from 'react-redux';
import { userInfo, Chessis_no } from '../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';

import { strings } from '../../../utils/translations';
import LinearGradient from 'react-native-linear-gradient';
import { FlatGrid,SimpleGrid } from 'react-native-super-grid';
// Theme Colors
import COLORS from "../../../constants/colors";
var list=[ { 
  id: '1',
  title: strings.users.primitve, 
  icon: Images.product,
  route: 'Primitive'
},
{ 
  id: '2',
  title: strings.users.breakdown, 
  icon: Images.order,
  route: 'breakdown'
},
{ 
    id: '3',
    title: strings.users.history, 
    icon: Images.stock,
    route: 'serviceHistory'
  }];
 class Services extends Component {
    constructor(props){
        super(props);
        //  this.arr();
        this.state = {
            isLoading: false,
            
            list1:[
            { 
              id: '1',
              title: "Service Request", 
              icon: Images.order,
              route: 'breakdown'
            },
            { 
                id: '2',
                title: strings.users.history, 
                icon: Images.stock,
                route: 'serviceHistory'
              }],
            list:[ { 
              id: '1',
              title: strings.users.primitve, 
              icon: Images.product,
              route: 'Primitive'
            },
            { 
              id: '2',
              title: strings.users.breakdown, 
              icon: Images.order,
              route: 'breakdown'
            },
            { 
                id: '3',
                title: strings.users.history, 
                icon: Images.stock,
                route: 'serviceHistory'
              }]
         
        };
    }
//     componentDidMount(){
//       let { navigation } = this.props;
//       this._unsubscribe = navigation.addListener('focus', () => {
// this.arr();
//       });
//   }
//   componentWillUnmount() {
//     this._unsubscribe();
    
//     // this.walletOrder();
// }
   arr(){
   console.log('sjdd',this.props.route.params)
    if(this.props.route.params){
      console.log('params',this.props.route.params)
     list.shift();
    }
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
    onSubmit(){
      let { navigation } =  this.props;
      navigation.navigate("WarrantyClaims");
    }
    renderItem = ({ item, index }) => (
      <View style={styles.row}>
        {!this.props.route.params}
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
        let{props}=this;
        // let {user}=this.props.route.params;
        // console.log( 'charger',this.props.route.params);
        let { isLoading,list,list1} = this.state;
        console.log('services',this.props.route.params.items.chargePointModel);
        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.users.service}/>
                </View>
                <Animatable.View animation="fadeInUp" style={styles.footer}>
                  <View style={{paddingLeft:30,paddingRight:20,marginLeft:30}}>
                <SimpleGrid   
             
  itemDimension={100}
  data={this.props.route.params.items.chargePointModel?list1:list}
  renderItem={this.renderItem}
  key={(item)=>item.id+''}
/>
</View>
{/* <View style={{height:-10,width:10,borderWidth:2,borderColor:'#fff',flexDirection:'row'}}>
<TouchableOpacity onPress={()=>!isLoading ? this.onSubmit() : null }>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                          { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                            <Text style={styles.buttonText}> Warranty Claim</Text>
                          } 
                        </LinearGradient>
                    </TouchableOpacity> 
                    </View> */}
                    {/* <FlatList
                   
                    style={{flexDirection:'column'}}
                    
                 
                        data={list}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id+''}
                    /> */}
                 
                </Animatable.View>
            </View>
        )
    }
}
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: COLORS.PRIMARY,
  //   zIndex: 9999,
    
  },
  header: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
     
  },
  signInButton: {
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
      // marginTop: 30
  },
  buttonText: {
      color: COLORS.BUTTON_TEXT,
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
      fontFamily: "Poppins-Regular",
  },
  footer: {
      flex: 8,
  //    marginLeft:20,
     
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
      marginVertical: 5,
     
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
      
      width: 80,
      height: 80,
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

const mapStateToProps = state => {
    
  return {
      token: state.token,
      info: state.info,
  };
};


const mapDispatchToProps = (dispatch) => {
  return{
  userInfo: bindActionCreators(userInfo, dispatch),
  }
   
}
export default connect(mapStateToProps,mapDispatchToProps)(Services);