TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image , ScrollView, StyleSheet,} from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
//Components
import Header from '../../../../components/Header';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Constants
import { showMessage, hideMessage } from "react-native-flash-message";
import { Images } from "../../../../constants";
//Redux
import { connect } from 'react-redux';
import { userInfo, loginToken, subscribed, buycharger } from '../../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';

//Styles
import styles from './styles';
import { strings } from '../../../../utils/translations';
//Api
import HttpRequest from "../../../../utils/HTTPRequest";
import { FlatGrid,SimpleGrid } from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';

// const localImages = {
//   SMPS: require('../../../../../assets/images/icons/warrantyicons/smps.png'),
 
// };
class FranWarrantyClaims extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
             favorite: false,
             distance:'',
             chargingPointData: '',
             orders: 0,
             passkey:'',
             list:[],
             
          //   list : [
          //       { 
          //         id: '1',
          //         title: strings.dmc.control, 
          //         message:'',
          //         icon: Images.product,
          //         route: 'ChargerList'
          //       },
          //       { 
          //         id: '2',
          //         title: strings.dmc.battery, 
          //         message:'',
          //         icon: Images.order,
          //         route: 'dealerOrder'
          //       },
          //       { 
          //           id: '3',
          //           title: strings.dmc.motor, 
          //           message:'',
          //           icon: Images.stock,
          //           route: 'Stock'
          //         },
          //         { 
          //           id: '4',
          //           title: strings.dmc.other, 
          //           icon: Images.sold,
          //           message:'',
          //           route: 'Producthistory'
          //         },
                  
                 
                 
          // ]
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
    componentDidMount(){
    this.Chargerservice()
    }

    Chargerservice = () => {
      let{props}=this;
      let { radius, region } = this.state;
      
      console.log(props.info.phone,'Chargerservice')
      this.Chargerservice1(this.props.route.params.items.stock_id );
      // HttpRequest.charger_user_soldrecords({user_contact:props.info.phone})
      //     .then(res => {
              
      //         const result = res.data;
      //         console.log("Charger records API Response ---------- ", result);
      //         if (res.status == 200 ) {
      //              this.setState({ chargingPointData: result.data[0].stock_id, refreshing: false,favorite: result.favorite, isLoading: false})
      //              console.log("distance",result.data.stock_id);
      //             this.Chargerservice1(this.props.route.params.items.stock_id );
      //         } else {
      //             this.setState({ isLoading: false });
      //             console.log("Charger records API Error : ",result);
      //             showMessage({
      //                message: strings.error.title,
      //                 description: result.message != undefined ? result.message : result.status,
      //                 type: "danger",
      //             });
      //         }
      //     })
      //     .catch(err => {
      //         this.setState({ isLoading: false, refreshing: false });
      //         console.log("Sold records API Catch Exception: ",err);
      //         showMessage({
      //            message: strings.error.title,
      //             description: strings.error.message,
      //             type: "danger",
      //         });
      //     });


  }

  Chargerservice1 = (data) => {
     let { items } = this.props.route.params;
    let { radius, region,list } = this.state;
    console.log(this.props.route.params,'reChargerservice1gion')
  
    HttpRequest.dealer_charger_warranty({stock_id:items.stock_id})
        .then(res => { 
            const result = res.data;
            console.log(" Charger Warranty API Response ---------- ", result);
            if (res.status == 200 ) {
              //  this.setState({ chargingPointData: result.data, refreshing: false,favorite: result.favorite, isLoading: false})
                console.log("distance",result.icon);
               // this.setState({list[1].message:result.battery_warranty_message});
               var list1=[]
               list1.push({title:"SMP",name:result.smps_warranty_message,icon:Images.battery});
                list1.push({title:"Display",name:result.display_warranty_message,icon:Images.motor});
                // list1.push({title:"Controller",name:result.controller_warranty_message,icon:Images.controller});
                // list1.push({title:"Chassis",name:result.chessis_warranty_message,icon:Images.chassis});
                // list1.push({title:"Charger",name:result.charger_warranty_message,icon:Images.char});
                // list1.push({title:"Tyre",name:result.tyre_warranty_message,icon:Images.tyre});
                // list1.push({title:"Rim",name:result.rim_warranty_message,icon:Images.rim});
                // list1.push({title:"Wiring Harness",name:result.wiring_warranty_message,icon:Images.wiring});

                // list1.push({title:"DC Convertor",name:result.dc_warranty_message,icon:Images.dcconvert});
                // list1.push({title:"Ignition",name:result.ignition_warranty_message,icon:Images.ignition});
                // list1.push({title:"Differential",name:result.differential_warranty_message,icon:Images.differential});
                // list1.push({title:"Throttle",name:result.throttle_warranty_message,icon:Images.throttle});
                // list1.push({title:"Front Shocker",name:result.ftshocker_warranty_message,icon:Images.socker});
                // list1.push({title:"Fm Radio",name:result.fm_warranty_message,icon:Images.fm});
                // list1.push({title:"Digital Speedometer",name:result.ds_warranty_message,icon:Images.speedo});
                // list1.push({title:"Horn",name:result.horn_warranty_message,icon:Images.horn});
                this.setState({list:result.data});
                console.log(this.state.list,"list1")

            } else {
                this.setState({ isLoading: false });
                console.log("Warranty API Error : ",result);
                showMessage({
                   message: strings.error.title,
                    description: result.message != undefined ? result.message : result.status,
                    type: "danger",
                });
            }
        })
        .catch(err => {
            this.setState({ isLoading: false, refreshing: false });
            console.log("Warranty API Catch Exception: ",err);
            showMessage({
               message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });


}

  //   getChargingStations = () => {
  //     let{props}=this;
  //     let { radius, region } = this.state;
  //     console.log(region,'region')
    
  //     HttpRequest.user_soldrecords({user_contact:props.info.phone})
  //         .then(res => {
              
  //             const result = res.data;
  //             console.log("Sold records API Response ---------- ", result);
  //             if (res.status == 200 ) {
  //                  this.setState({ chargingPointData: result.data[0].stock_id, refreshing: false,favorite: result.favorite, isLoading: false})
  //                  console.log("distance",result.data[0].stock_id);
  //                 this.getChargingStations1(this.state.chargingPointData);
  //             } else {
  //                 this.setState({ isLoading: false });
  //                 console.log("Sold records API Error : ",result);
  //                 showMessage({
  //                    message: strings.error.title,
  //                     description: result.message != undefined ? result.message : result.status,
  //                     type: "danger",
  //                 });
  //             }
  //         })
  //         .catch(err => {
  //             this.setState({ isLoading: false, refreshing: false });
  //             console.log("Sold records API Catch Exception: ",err);
  //             showMessage({
  //                message: strings.error.title,
  //                 description: strings.error.message,
  //                 type: "danger",
  //             });
  //         });


  // }

   
onSubmit(){
  let { navigation } =  this.props;
  console.log('yteye',this.props.buycharger)
 navigation.navigate("UserWarrantyPolicy");
  // navigation.navigate("WarrantyPolicy");
}
renderItem1 = ({ item, index }) => (
  <View style={styles.row}>
  <View style={[styles.item,index != 4 ? styles.border : null]} >
  
    <View style={styles.bodyContainer}>
      <View>
      <View style={styles.iconContainer}>
        {/* {item.title!='Chassis'? */}
        <Image  source={Images[item.icon]} style={styles.imageIcon} />
        
        {/* //   <Image source={item.icon} style={styles.imageIcon} /> */}
        {/* //  }   */}
          <Text style={styles.essentialsLabel} numberOfLines={2}>{item.title}</Text>
          
          </View>
          
          <Text style={styles.Label} numberOfLines={2}>{item.name}</Text>
          {/* <Icon name={'ios-arrow-forward'} size={24} color={'#fff'} /> */}
      </View>
      </View>
      </View>
 </View>
   
   
);
   
    render() {
        let { navigation } =  this.props;
        let { isLoading, list,distance} = this.state;
        let { items } = this.props.route.params;
        //  console.log('prefrence',items);
        return (
          <View style={styles.container}>
          <View  style={styles.header}>
            <Header navigation={navigation} type={strings.dmc.w_detail}/>
          </View>
          <Animatable.View animation="fadeInUp" style={styles.footer}>
          <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} contentContainerStyle={styles.scrollView}>
          <TouchableOpacity onPress={()=> this.onSubmit() }style={styles.signInButton}>
  
  <View style={styles.bodyContainer}>
    <View>
    <View style={styles.iconContainer}>
     
        <Image source={Images.order} style={styles.imageIcon} />
        <Text style={styles.essentialsLabel} numberOfLines={2}>Read Warranty Policy</Text>
        </View>
        
        {/* <Text style={styles.Label} numberOfLines={2}>{item.name}</Text> */}
        {/* <Icon name={'ios-arrow-forward'} size={24} color={'#fff'} /> */}
    </View>
    </View>
</TouchableOpacity>
          <SimpleGrid   
       
itemDimension={120}
data={list}
renderItem={this.renderItem1}
key={(item)=>item.id+''}

/>

{/* <TouchableOpacity onPress={()=>!isLoading ? this.onSubmit() : null }>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.signInButton}>
                    { isLoading ? <ActivityIndicator size='large' color='#fff' /> :
                      <Text style={styles.buttonText}>Read Warranty Policy</Text>
                    } 
                  </LinearGradient>
              </TouchableOpacity>   */}
              {/* <FlatList
             
              style={{flexDirection:'column'}}
              
           
                  data={list}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.id+''}
              /> */}
            </KeyboardAwareScrollView>
          </Animatable.View>
         
      </View>
        )
    }
}

const mapStateToProps = state => {
    
  return {
      info: state.info,
      token: state.token,
      buycharger:state.buycharger 
  };
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(FranWarrantyClaims);

