import { StyleSheet, Dimensions } from "react-native";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../../constants/colors";

export default styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: COLORS.DEFAULT,
    },
    header: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex:0.3,
        backgroundColor: COLORS.PRIMARY,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    onBoardImage: {
        width: screenHeight * 0.7 * 0.4,
        height: screenHeight * 0.7 * 0.4,
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
        fontSize: 13,
        fontFamily: "Poppins-medium",
        marginTop: 5
    }, 
    button: {
        alignItems: 'flex-end',
        marginTop: 30
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
    active: {
        width: 60,
        height: 60,
        backgroundColor: COLORS.IMAGE,
        borderRadius: 60/2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeDot: {
        backgroundColor: COLORS.DEFAULT,
        width: 15
    }
});