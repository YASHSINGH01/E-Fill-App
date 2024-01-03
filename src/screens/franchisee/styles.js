import { StyleSheet, Dimensions } from "react-native";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../constants/colors";

export default styles = StyleSheet.create({
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
    skipLogin: {
        width: screenWidth/1.5,
   alignSelf:'center',
        justifyContent:'center',
        alignItems: "center",
        borderWidth: 1, 
        borderColor: COLORS.DEFAULT, 
        borderRadius: 90/2
    },
    headerTextContainer: {
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column'
    },
    credit: {
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        // marginTop: 5,
        alignItems: 'center',
        fontWeight: '600',
        color: COLORS.DEFAULT
    },
    footer: {
        flex: 8,  
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
   
    iconContainer: {
        
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        borderRadius: 10,
        
    },
    // imageIcon : {
        
    //     resizeMode: 'contain'
    // },
    // icon: {
    //     // width: 30,
    //     resizeMode: 'contain',
    //     // marginRight: 20
    // },
    essentialsLabel: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
    //  textAlign: 'center',
   paddingRight:10,
        fontWeight: 'bold',
    },
});