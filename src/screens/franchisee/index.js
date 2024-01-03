TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image , ScrollView, StyleSheet,} from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
//Components
import Header from '../../components/Header';
//Constants
import { Images } from "../../constants";
//Styles
import styles from './styles';
//Redux
import { connect } from 'react-redux';
import { userInfo, loginToken } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
import { strings } from '../../utils/translations';
import HttpRequest from "../../utils/HTTPRequest";
import { FlatGrid,SimpleGrid } from 'react-native-super-grid';

class frann extends Component {
    constructor(props){
        super(props);

        this.state = {
          points:'',
            isLoading: false,
            list : [
                { 
                  id: '1',
                  title: strings.dmc.product, 
                  icon: Images.chargers,
                  route: 'Product'
                },
                { 
                  id: '2',
                  title: strings.dmc.order, 
                  icon: Images.order,
                  route: 'frachiseeorder'
                },
                { 
                  id: '3',
                  title: strings.dmc.stock, 
                  icon: Images.stock,
                  route: 'franchiseeStock'
                },
                { 
                  id: '4',
                  title: strings.dmc.sold_record, 
                    icon: Images.sold,
                    route: 'fProducthistory'
                },
                { 
                  id: '5',
                  title: strings.dmc.service, 
                  icon: Images.info,
                  route: 'FService'
                },
                { 
                  id: '6',
                  title: strings.dmc.loyality_his, 
                  icon: Images.data,
                  route: 'FranLoyality',
             
                },
               
                 
          ]
        };
    }
   
    componentDidMount = () => {
    

    
        let { navigation } = this.props;
              this._unsubscribe = navigation.addListener('focus', () => {

this.franchisepoints();
              });
          }
          componentWillUnmount() {
            this._unsubscribe();
   
            // this.walletOrder();
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
    franchisepoints(){
      console.log('ihf',this.props)
      HttpRequest.franchise_loyaltypoints({distributor_code:this.props.info.phone}).then(res=>{
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
    renderItem = ({ item, index }) => (
      <View style={styles.row}>
        <View style={[styles.item,index != 6 ? styles.border : null]} key={""+item.id}>
        
          <View style={styles.bodyContainer}>
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
        let { isLoading, list,points} = this.state;
        // console.log('prefrence',list);
        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.francisee.title}/>
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
                    {/* <FlatList
                   
                    style={{flexDirection:'column'}}
                    
                 
                        data={list}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id+''}
                    /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(frann);