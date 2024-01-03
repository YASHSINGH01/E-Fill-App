TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image , ScrollView, StyleSheet,} from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage, hideMessage } from "react-native-flash-message";
//Components
import Header from '../../../../components/Header';
//Constants
import { Images } from "../../../../constants";
//Styles
import styles from './styles';
import { strings } from '../../../../utils/translations';
//Api
import HttpRequest from "../../../../utils/HTTPRequest";
import { FlatGrid,SimpleGrid } from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';

export default class Claims extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            chargingPointData: '',
             favorite: false,
             distance:0,
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
      this.getChargingStations();
    }

    getChargingStations = () => {
      let { items } = this.props.route.params;
      let { radius, region,list } = this.state;
      console.log(items,'region')
    
      HttpRequest.dealer_warranty({stock_id:items.stock_id})
          .then(res => { 
              const result = res.data;
              console.log("Warranty API Response ---------- ", result);
              if (res.status == 200 ) {
                //  this.setState({ chargingPointData: result.data, refreshing: false,favorite: result.favorite, isLoading: false})
                  console.log("distance",result.battery_warranty_message);
                 // this.setState({list[1].message:result.battery_warranty_message});
                 var list1=[]
                  list1.push({title:"Battery",name:result.battery_warranty_message,icon:Images.battery});
                  list1.push({title:"Motor",name:result.motor_warranty_message,icon:Images.motor});
                  list1.push({title:"Controller",name:result.controller_warranty_message,icon:Images.controller});
                  list1.push({title:"Chassis",name:result.chessis_warranty_message,icon:Images.chassis});
                  list1.push({title:"Charger",name:result.charger_warranty_message,icon:Images.char});
                  list1.push({title:"Tyre",name:result.tyre_warranty_message,icon:Images.tyre});
                  list1.push({title:"Rim",name:result.rim_warranty_message,icon:Images.rim});
                  list1.push({title:"Wiring Harness",name:result.wiring_warranty_message,icon:Images.wiring});

                  list1.push({title:"DC Convertor",name:result.dc_warranty_message,icon:Images.dcconvert});
                  list1.push({title:"Ignition",name:result.ignition_warranty_message,icon:Images.ignition});
                  list1.push({title:"Differential",name:result.differential_warranty_message,icon:Images.differential});
                  list1.push({title:"Throttle",name:result.throttle_warranty_message,icon:Images.throttle});
                  list1.push({title:"Front Shocker",name:result.ftshocker_warranty_message,icon:Images.socker});
                  list1.push({title:"Fm Radio",name:result.fm_warranty_message,icon:Images.fm});
                  list1.push({title:"Digital Speedometer",name:result.ds_warranty_message,icon:Images.speedo});
                  list1.push({title:"Horn",name:result.horn_warranty_message,icon:Images.horn});
                 
                  this.setState({list:list1});
                  // console.log(this.state.list,"list1")

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
onSubmit(){
  let { navigation } =  this.props;
  navigation.navigate("WarrantyPolicy");
}
    renderItem = ({ item, index }) => (
      <View style={styles.row}>
        <View style={[styles.item,index != 4 ? styles.border : null]} key={""+item.id}>
        
          <View style={styles.bodyContainer}>
            <View>
            <View style={styles.iconContainer}>
                <Image source={item.icon} style={styles.imageIcon} />
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
        let { isLoading, list} = this.state;
        // console.log('prefrence',list);
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
  renderItem={this.renderItem}
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

