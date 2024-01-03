import { StyleSheet, Dimensions } from "react-native";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../constants/colors";

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.PRIMARY,
      zIndex: 9999,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    imageIcon : {     
        height:40,
        resizeMode: 'contain'
    },
    share: {
        width: 30,
        height: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 30,
        backgroundColor:COLORS.DEFAULT,
        top: '9%'
    },
    footer: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // marginTop: '10%',
    },
    scrollView: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    headerContainer: {
        flexDirection: 'column', 
        margin: 20, 
        padding: 10,
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius: 20, 
        backgroundColor: COLORS.HEADER_BACKGROUND
    },
    headerTextContainer: {
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column'
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    text: {
        color: COLORS.BLACK,
        fontSize: 14,
        fontFamily: "Poppins-medium",
      
    }, 
    signInButton: {
        width: screenWidth/3.5 ,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 10,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    buttonText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    title: {
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        marginTop: 10,
        alignItems: 'center',
        fontWeight: '600',
        color: COLORS.DEFAULT
    },
    credit: {
            fontSize: 18,
            fontFamily: "Poppins-Regular",
            // marginTop: 5,
            alignItems: 'center',
            fontWeight: '600',
            color: COLORS.DEFAULT
        },
    buttonCaption: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: "Poppins-Regular",
        color: COLORS.PRIMARY
    },
    caption: {
    width:180,
    textAlign:'center',
        fontSize: 18,
        alignItems: 'center',
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    tabItem: {
        flex: 1,
        width: screenWidth/3,
        alignItems: 'center',
        color: COLORS.BUTTON_TEXT,
        margin: 2,
        borderRadius: 20,
        padding: 10,
        backgroundColor: COLORS.DEFAULT
    },
    tabViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
     image: {
            width: 80,
            height: 80,
            resizeMode: 'contain',
            borderRadius: 40
        },
    headerText: {
        fontSize: 10,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        color: COLORS.BUTTON_TEXT
    }
});
