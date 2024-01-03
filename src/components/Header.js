import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import { CommonActions } from '@react-navigation/native';
//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Constants
import COLORS from '../constants/colors';
import { strings } from '../utils/translations';
import { StatusBarHeight } from '../utils/functions-file';


const Header = ({ navigation, type, token = '', count = 0, amount= 0.00, order_id = '', ...props }) =>{
   
    return (
    <View style={styles.container}>
        <StatusBar barStyle={'light-content'}/>
            <View style={styles.leftSection}>
            { type == 'Scan QR Code' ||type == "Charging Error"?
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.leftContent}>
                    <Icon
                        size={30}
                        name={'chevron-back'}
                        color={'#fff'}
                        suppressHighlighting={true}
                    />
                    <Text style={styles.backButtonLabel} numberOfLines={1}>{type} </Text>
                </TouchableOpacity> :type=="Coupons" ?
                <TouchableOpacity onPress={() =>  navigation.navigate('booking',{ coupon: "" })}  style={styles.leftContent}>
                <Icon
                    size={30}
                    name={'chevron-back'}
                    color={'#fff'}
                    suppressHighlighting={true}
                />
                <Text style={styles.backButtonLabel} numberOfLines={1}>{type}</Text>
            </TouchableOpacity> 
                :        
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftContent}>
                    <Icon
                        size={30}
                        name={'chevron-back'}
                        color={'#fff'}
                        suppressHighlighting={true}
                    />
                    <Text style={styles.backButtonLabel} numberOfLines={1}>{type}</Text>
                </TouchableOpacity> 

    }
            </View> 
            <View style={styles.rightSection}>
                {/* Skip Button for Sign In Screen */}
               {/* { type == strings.signIn.title ?
                <TouchableOpacity style={styles.skipLogin} onPress={() => props.skipLogin()}>
                    <Text style={styles.skipText}>{strings.signIn.skipLogin}</Text>
                </TouchableOpacity>: null
                }*/}
                { type == strings.notification.title ?
                <TouchableOpacity style={styles.skipLogin} onPress={() => props.readAll()}>
                    <Text style={styles.skipText}>{strings.notification.clearAll}</Text>
                </TouchableOpacity> : null
                }
               
            </View>
     </View>
    );
};

const mapStateToProps = state => {
    return {
      token: state.token,
    };
};
  
const mapDispatchToProps = (dispatch) => {
      return bindActionCreators({}, dispatch);
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Header);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: "center",
      backgroundColor: COLORS.HEADER_BACKGROUND,
      borderBottomLeftRadius: 35,
      borderBottomRightRadius: 35,
      paddingTop: StatusBarHeight
    },
    leftSection:{
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        marginHorizontal: 15,
    },
    leftContent: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: "center",
    },
    backButtonLabel: {
        fontSize: 16, 
        fontFamily: 'Poppins-Regular', 
        color: COLORS.DEFAULT,
        fontWeight: '600',
        textAlign: 'center',
    },
    bodySection:{
        flex:0.7,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: "center"
    },
    bodyText: {
        fontSize: 16, 
        fontFamily: 'Poppins-Regular', 
        color: COLORS.DEFAULT,
        fontWeight: 'bold'
    },
    rightSection:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: "center",
        marginHorizontal: 15,
    },
    skipLogin: {
        width: 90,
        height: 30,
        justifyContent:'center',
        alignItems: "center",
        borderWidth: 1, 
        borderColor: COLORS.DEFAULT, 
        borderRadius: 90/2
    },
    skipText:{
        fontSize: 12, 
        fontFamily: 'Poppins-Regular', 
        color: COLORS.DEFAULT,
        textAlign:'center',
    }
});

