import { StyleSheet, Dimensions } from "react-native";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../../constants/colors";

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.PRIMARY,
      zIndex: 9999,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 1
    },
    footer: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '10%',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 2
    },
    ImageContainer: {
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    getUser: {
        width: screenHeight * 0.5,
        height: screenHeight * 0.3,
        resizeMode:'contain'
    },
    formField: {
        width: screenWidth - 40 ,
        margin: 5
    },
    label: {
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        margin: 5,
        marginLeft: 15
    },
    otpContainer: {
        flexDirection: 'row'
    },
    inputContainer: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.black,
        borderRadius: 30,
        margin: 5
    },
    inputText: {
        flex: 1,
        height:'100%',
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "Poppins-Regular",
        color: COLORS.black,
    },
    error: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        marginLeft: 15,
        padding: 5,
        color: '#ff0000',
    },
    signInButton: {
        width: screenWidth - 40 ,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 30
    },
    buttonText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    checkboxContainer: {
        flex: 0.5,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 30
    },
    checkbox: {
        width: 20,
        height: 20,
        alignSelf: "center",
        color: '#fff',
        borderColor: '#A4FF8B',
        borderRadius: 5
    },
    checkboxLabel:{
        color: COLORS.DEFAULT,
        fontSize: 12,
        fontFamily: "Poppins-medium",
        marginLeft: 5
    },
    text: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        margin: 10,
        marginLeft: 15
    }, 
    resendText: {
        color: COLORS.DEFAULT,
        fontSize: 12,
        fontFamily: "Poppins-medium",
        
    },
    resendContainer : {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    centerAlignedText: {
        fontSize: 12,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center'
    },
    bold: {
        fontWeight: 'bold',
    }
});