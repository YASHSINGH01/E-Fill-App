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
      zIndex: 9999,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    footer: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '10%',
    },
    Intro: {
        flex: 1,
        justifyContent: 'flex-start',
        marginBottom: 10,
        marginHorizontal: 25,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.DEFAULT,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 15,
        borderRadius: 40,
    },
    IconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginLeft: 5
    },
    title: {
        fontSize: 16,
        fontWeight: '600'
    },
    description: {
        fontSize: 12,
        color: COLORS.INPUT_LABEL,
        fontWeight: '500'
    },
    createdAt: {
        fontSize: 10,
        color: COLORS.INPUT_LABEL,
        fontWeight: '400'
    },
    text: {
        color: COLORS.BLACK,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        margin: 5
    }, 
    introTitle: {
        color: COLORS.DEFAULT,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        fontWeight: '700',
        textAlign: 'left'
    },
    introDescription: {
        color: COLORS.DEFAULT,
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        fontWeight: '400',
        textAlign: 'left'
    }
});