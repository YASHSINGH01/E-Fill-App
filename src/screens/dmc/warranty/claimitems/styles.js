import { StyleSheet, Dimensions } from "react-native";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../../../constants/colors";

export default styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: COLORS.PRIMARY,
      paddingLeft:0,
      marginLeft:0,
      zIndex: 9999,
      
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
       
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
        // height:screenHeight
        // backgroundColor: COLORS.ERROR,
        alignSelf:'auto',
        alignItems:'baseline',
        justifyContent:'space-between',
        
      
    //    margin:20,
        // marginHorizontal: 10,
    },
    text: {
        color: COLORS.BLACK,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        // backgroundColor: COLORS.SUCCESS,
        // margin: 5
    }, 
    item: {
        flex: 1,
         marginTop: 8,
        // backgroundColor: 'aliceblue',
        // backgroundColor: COLORS.GRADIENT_END,
    },
  
    row: {
      marginLeft:15,
        // backgroundColor: COLORS.DEFAULT,
        flexDirection: 'row',
        // marginVertical: 5,
        
       
    },
    signInButton: {
        // width: 200 ,
        // height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        // backgroundColor: COLORS.DEFAULT,
        // fontFamily: "Poppins-Regular",
        color: 'black',
        // marginLeft:10,
        // marginBottom:290,
        // marginTop: 30
    },
    title:{
        // flex: 1,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        fontWeight:'500',
        color: COLORS.DEFAULT,
    },
    bodyContainer: {
        marginTop:10
        // flex: 1,
        // width:80,
        // width: 100,
                                    // height: 70,
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                    // backgroundColor: COLORS.HEADER_BACKGROUND,
                                    // borderRadius: 10,
                                    // marginBottom: 0,
        //  flexDirection: 'column',
        // backgroundColor: COLORS.ERROR,
        // justifyContent: 'center',
        // alignItems: 'center',
        // margin:0,
        // padding:0
    },
    // iconView: {
    //     // flex: 1,
    //     // flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    iconContainer: {
        margin:0,
        padding:0,
        width: 120,
        height: 100,
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
        textAlign: 'center',
        fontWeight: 'bold',
    },
    imageIcon: {
        width: 65,
        height: 65,
        resizeMode: 'contain',
    },
    Label: {
        width:screenWidth-180,
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        //
        marginLeft:10,
        //  textAlign: 'center',
        marginRight:80,
        marginVertical:5,
        fontWeight: '900',
    },
});