TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image ,TextInput, ScrollView, StyleSheet,Modal} from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
//Components
import Header from '../../components/Header';
//Constants
import HttpRequest from "../../utils/HTTPRequest";
import { Images } from "../../constants";
//Styles
//Redux
import { connect } from 'react-redux';
import { userInfo, loginToken } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
import styles from './styles';
import { strings } from '../../utils/translations';
import LinearGradient from 'react-native-linear-gradient';
import { FlatGrid,SimpleGrid } from 'react-native-super-grid';
//  var visibile=true;
 class Dealers extends Component {
    constructor(props){
        super(props);
       
var user=this.props.route.name;
console.log('prefrence',user);
        this.state = {
            isLoading: false,
            points: '',
           
          
            image1: '',
            list : [
                { 
                  id: '1',
                  title: strings.dmc.product, 
                  icon: Images.product,
                  route: 'ChargerList'
                },
                { 
                  id: '2',
                  title: strings.dmc.order, 
                  icon: Images.order,
                  route: 'dealerOrder'
                },
                { 
                    id: '3',
                    title: strings.dmc.stock, 
                    icon: Images.stock,
                    route: 'Stock'
                  },
                  { 
                    id: '4',
                    title: strings.dmc.sold_record, 
                    icon: Images.sold,
                    route: 'Producthistory'
                  },
                  { 
                    id: '5',
                    title: strings.dmc.service, 
                    icon: Images.info,
                    route: 'Service'
                  },
                  { 
                    id: '6',
                    title: strings.dmc.warrenty_claim, 
                    icon: Images.claim,
                    route: 'WarrantyClaims'
                  },
                  { 
                    id: '7',
                    title: strings.dmc.loyality_his, 
                    icon: Images.data,
                    route: 'LoyaltyHistory',
                state:{
                  modalVisible: false,
                }
                  },
                  // { 
                  //   id: '8',
                  //   title: strings.dmc.loyality, 
                  //   icon: Images.loyal,
                  //   data:this.modal(),
                  // },
                 
                 
          ]
        };
    }
    componentDidMount = () => {
    

    
      let { navigation } = this.props;
            this._unsubscribe = navigation.addListener('focus', () => {

              this.dms();
            });
        }
        componentWillUnmount() {
          this._unsubscribe();
 
          // this.walletOrder();
      }
   dms(){
    HttpRequest.loyaltypoints({distributor_code:this.props.info.phone}).then(res=>{
      const result = res.data;
        console.log("Response ---------- ", result);
        if (res.status == 200 && !result.error) {
          this.setState({ points: result.loyalty_points });
           
        } else {
          this.setState({ refreshing: false });
          console.log("Loyalty API Error : ", result);
          //                            showMessage({
          //                               message: strings.error.title,
          //                                description: result.message != undefined ? result.message : result.status,
          //                                type: "danger",
          //                            });
        }
      })
      .catch(err => {
        this.setState({ isLoading: false, refreshing: false });
        console.log("Loyalty API Catch Exception: ", err);
        showMessage({
          message: strings.error.title,
          description: strings.error.message,
          type: "danger",
        });
      });
  
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
    modal = () => {
      let { navigation } = this.props;
      //  console.log("navigate",navigation);
      this.setState({ modalVisible: true })
  }
  modalvis(){
    this.setState({isLoading:false,modalVisible:false,dealer_no:'',points:'',image1:''});
}
    onSubmit(){
      let { navigation } =  this.props;
      navigation.navigate("WarrantyClaims");
    }
    renderItem = ({ item, index }) => (
      <View style={styles.row}>
        <View style={[styles.item,index != 7 ? styles.border : null]} key={""+item.id}>
        
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
        let { isLoading, list,dealer_no,filePath, image1, modalVisible,points, dealer_no1, user_type,user_type1 } = this.state;
        
        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.dmc.title}/>
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
<View style={[styles.headerTextContainer,styles.skipLogin]}>
                                   <Text style={styles.credit}>{"Loyalty Points: "+this.state.points}</Text>
                               </View>

                 
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

export default connect(mapStateToProps, mapDispatchToProps)(Dealers)