TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Modal,RefreshControl,ScrollView, TextInput,Animated, ActivityIndicator } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage, hideMessage } from "react-native-flash-message";
import LinearGradient from 'react-native-linear-gradient';

//Components
import Header from '../../components/Header';

//Api
import HttpRequest from "../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { orderID, orderAmount, couponStatus, couponApplied } from '../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Constants
import { Images } from "../../constants/";
//Styles
import styles from './styles';
import { strings } from "../../utils/translations";


const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

class Coupons extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            couponsData: '',
            coupon:"",
            modalVisible: false,
            refreshing: false,
            count: 0,
        };
    }

    componentDidMount = () => {           
        this.getCoupons();
       
    }
    toggleModal(visible,error) {
        
        this.setState({ modalVisible: visible});
        
    }
    closemodel()
    {
       this.setState({ modalVisible:false});
       
    }
   
    // Get All Coupons Through Api
    getCoupons = () => {
        HttpRequest.getCoupons(this.props.token)
        .then(res => {
            this.setState({ isLoading: false });
            const result = res.data;
            if (res.status == 200 && !result.error) {
                // console.log("Get All Coupons API Response ---------- ", result, 'Length:', result.coupon.length);
                this.setState({ couponsData:  result.coupon, count: result.coupon.length, refreshing: false});
            } else {
                console.log("Get All Coupons API Error : ",result);
                // showMessage({
                //    message: strings.error.title,
                //     description: result.message != undefined ? result.message : result.status,
                //     type: "danger",
                // });
            }
        })
        .catch(err => {
            this.setState({ isLoading: false });
            console.log("Get All Coupons API Catch Exception: ",err);
            // showMessage({
            //    message: strings.error.title,
            //     description: strings.error.message
            //     type: "danger",
            // });
        });
    }
    closeCallout = () => {
     this.props.closeCallout();
        // this.props.cart();
        // this.props.couponApplied('');
      
    }
    closeCallout1 = async () => {
        // this.props.couponApplied(this.state.coupon);
        // console.log('coypon',this.props.couponApplied());
      
      this.props.cart(this.state.coupon);
    //   console.log('cart',this.props.cart);
    //  this.props.couponApplied("");
    //  console.log('cohfhn',this.props.couponApplied())
        

         this.props.closeCallout();
       }
    // Apply Specific Coupon Through Api
    // applySpecificCoupon = (item = '') => {
    //     let { order_amount, order_id, navigation } = this.props;
    //     HttpRequest.applyCoupons({coupon_id: item.id, order_id: order_id, amount: order_amount }, this.props.token)
    //     .then(res => {
    //         this.setState({ isApplying: false });
    //         const result = res.data;
    //         if (res.status == 200 && !result.error) {
    //             //console.log("Apply Specific Coupon API Response ---------- ", result, 'Order Id: ',order_id);
    //             showMessage({
    //                 message: strings.success.title,
    //                 description: strings.success.couponSuccess,
    //                 type: "success",
    //             });
    //             item.order_id = order_id;
    //             this.props.orderAmount(result.discounted_amount);
    //             this.props.couponStatus(true);
    //             this.props.couponApplied(item);
    //             navigation.goBack();
    //         } else {
    //             //console.log("Apply Specific Coupon API Error : ",result);
    //             showMessage({
    //                message: strings.error.title,
    //                 description: result.message != undefined ? result.message : result.status,
    //                 type: "danger",
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         this.setState({ isApplying: false });
    //         console.log("Apply Specific Coupon API Catch Exception: ",err.response.data.message);
    //         showMessage({
    //            message: strings.error.title,
    //             description: err.response.data.message,
    //             type: "danger",
    //         });
    //     });
    // };
// datacode=(data)=>{
//     console.log('ddd',data);
//     this.setState({coupon:data})
//     this.props.couponApplied(data);
// }

    onRefresh = () => {
        this.setState({ refreshing : true})
        // this.getCoupons();
    }


    renderItem = ({ item, index }) => (
        <View style={styles.item}>
            <View style={styles.content}>
                {/* Title */}
                <View style={styles.couponHeader}>
                    <View style={styles.row}>
                        <Text style={[styles.text, styles.title]}>{strings.coupon.label}</Text>
                        <Text style={[styles.text, styles.code]}> {item.code}</Text>
                    </View>
                    <TouchableOpacity onPress={()=> this.applySpecificCoupon(item) } style={styles.changeButton}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A4FF8B', '#22BC9D']} style={styles.changeGradient}>
                            <Text style={[styles.changeText,  {color:'#05294b'}]}> {strings.coupon.apply}</Text>
                        </LinearGradient>
                    </TouchableOpacity>  
                </View>
                {/* Desctiption */}
                <Text style={[styles.text,styles.description]}>{item.description}</Text>

               
            </View>
        </View>
        // this.applySpecificCoupon(item.id)
    );

    render() {
        let { navigation } =  this.props;
        let { isLoading, couponsData, refreshing,modalVisible, coupon} = this.state;
//  console.log('thissss',this.props.couponApplied());
        return (
            <Modal transparent={true} 
            style={{  justifyContent: 'center',
            alignItems: 'center'}} >
                 <ScrollView  showsVerticalScrollIndicator={false}
                 contentContainerStyle={{flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',}} >
            <View style={styles.container}>
           
                <TouchableOpacity style={styles.iconContainer} onPress={this.closeCallout}>
                    <Icon name="ios-close-circle" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.content}>
                    <View style={[styles.row, styles.header, styles.marginHorizontal]}>

                        <Text style={[styles.text, styles.bold, styles.h1]} numberOfLines={1}>ENTER THE COUPON CODE</Text>
                    </View>
                    <View style={[styles.row, styles.body, styles.marginHorizontal]}>
                        {/* <View style={styles.column}> */}
                            {/*<Text style={[styles.text, styles.points, {paddingTop: 10, paddingBottom: 10}]}>{status == 0 ? strings.home.deActivated : status == 1 ? strings.home.available : status == 2 ? strings.home.currentlyBusy : status == 3 ? strings.home.notConnected : strings.home.notConnected }</Text>*/}
                            <View style={styles.listContainer}>
                                
                                    {/* <View style={styles.listView} >
                                        <Text style={styles.availableConnectorText}>Enter your Coupon Code</Text>

                                       
                                    </View> */}
                                  <TextInput style={styles.inputtext}
                                   autoCompleteType='off'
                                   autoCapitalize='none'
                                   autoCorrect={false}
                                 
                                   returnKeyType='done'
                                   enablesReturnKeyAutomatically={true}
                                  value={coupon}
                                  onChangeText={text=>this.setState({coupon:text})}
                                  />
                                
                            </View>
                        {/* </View> */}
                    </View>
                   
                    <TouchableOpacity style={styles.signInButton} onPress={() => this.closeCallout1()}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FF6A00','#EE0979']} style={styles.linearGradient}>
                        <Text style={styles.cancelText}>Submit</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                       
                

                </View>
          
        </View>
        </ScrollView>
        </Modal>
            // <View style={styles.container}>
            //     <View  style={styles.header}>
            //       <Header navigation={navigation} type={strings.coupon.title} token={this.props.token} />
            //     </View>
            //     { !isLoading ? count > 0 ?
            //     <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            //         <FlatList
            //             data={couponsData}
            //             renderItem={this.renderItem}
            //             keyExtractor={item => item.id}
            //             refreshControl={
            //                 <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={'#fff'}/>
            //             }
            //         />
            //     </Animatable.View>: 
            //     <Animatable.View animation="fadeInUpBig" style={[styles.footer, styles.alignCenter ]}>
            //         <Image source={Images.couponNotFound} style={styles.notFoundImage} />
            //         <Text style={[styles.headingText]}>{strings.coupon.notFound}</Text>
            //     </Animatable.View>
            //     :
            //     <Animatable.View animation="fadeInUpBig" style={[styles.footer, styles.alignCenter ]}>
            //         <ActivityIndicator size='large' color='#fff' /> 
            //     </Animatable.View>
            //     }
            // </View>
        )
    }
}

const mapStateToProps = state => {
    
    return {
        info: state.info,
        token: state.token,
        order_id: state.order_id,
        order_amount: state.order_amount,
        coupon_status: state.coupon_status,
        coupon_applied: state.coupon_applied
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        orderID: bindActionCreators(orderID, dispatch),
        orderAmount: bindActionCreators(orderAmount, dispatch),
        couponStatus: bindActionCreators(couponStatus, dispatch),
        couponApplied: bindActionCreators(couponApplied, dispatch)
    };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Coupons);
