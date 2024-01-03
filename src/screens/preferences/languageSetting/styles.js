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
        padding: 20,
        marginHorizontal: 15,
        backgroundColor: COLORS.HEADER_BACKGROUND
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent:'space-between',
        alignItems:'center',
        height: 30,
    },
    content: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginLeft: 5
    },
    title: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        color: COLORS.DEFAULT
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
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.SUCCESS,
        borderWidth: 5,
        borderRadius: 25,
    },
    icon: {
        resizeMode: 'cover', 
    },
    topRadius: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: COLORS.HEADER_BACKGROUND,
        borderWidth: 1
    },
    bottomRadius: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: COLORS.HEADER_BACKGROUND,
        borderWidth: 1
    },
    active: {
        backgroundColor: COLORS.DEFAULT
    },
    inactive: {
        backgroundColor: COLORS.PRIMARY,
    },
    activeText: {
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        fontWeight: '700',
        color: COLORS.SUCCESS
    },
});