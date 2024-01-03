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
    skipLogin: {
        width: screenWidth/1.3,
   alignSelf:'center',
        justifyContent:'center',
        alignItems: "center",
        borderWidth: 1, 
        borderColor: COLORS.DEFAULT, 
        borderRadius: 90/2
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