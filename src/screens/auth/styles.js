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
      backgroundColor: COLORS.PRIMARY
    },
    header: {
        flex: 0.5,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    onBoardImage: {
        width: screenHeight * 0.5,
        height: screenHeight * 0.3,
        resizeMode:'contain'
    },
    footer: {
        flex:0.5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    title: {
        color: COLORS.DEFAULT,
        fontSize: 38,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        lineHeight: 40,
    },
    text: {
        color: COLORS.DEFAULT,
        fontSize: 12,
        fontFamily: "Poppins-medium",
        marginTop: 20
    }, 
    button: {
        width: screenWidth - screenWidth * 0.2,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 16
    },
    buttonText: {
        color: COLORS.BLACK,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    signIn: {
       width: 70,
       height: 70,
       justifyContent: 'center', 
       alignItems: 'center',
       borderRadius: 70/2,
    },
    backIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    textSign: {
        color: COLORS.DEFAULT,
        fontWeight: 'bold',
        margin: 5
    },
    buttonCircle: {
        width: 60,
        height: 60,
        backgroundColor: COLORS.DEFAULT,
        borderRadius: 60/2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeDot: {
        backgroundColor: COLORS.DEFAULT,
        width: 15
    }
});