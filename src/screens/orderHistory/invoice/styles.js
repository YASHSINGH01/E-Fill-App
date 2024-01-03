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
    signInButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        // margin: 5,
    },
    linearGradient: {
        width: '60%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    footer: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 5,
        marginTop: 20
    },
    scrollView: {
        flexGrow: 1,
    },
    seperator: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', 
        borderTopColor: '#ccc', 
        borderTopWidth: 1, 
        margin: 10
    },
    headerSeperator: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingLeft: 5,
        borderBottomColor: '#ccc', 
        borderBottomWidth: 1, 
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    padd: {
        padding: 5,
    },
    col: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "Poppins-Regular",
        color: COLORS.PRIMARY,
    },
    box : {
        borderColor: COLORS.SUCCESS,
        borderWidth: 1,
        backgroundColor: COLORS.DEFAULT,
        margin: 5,
        padding: 5,
        borderRadius: 5,
        marginBottom: 10
    },
    text: {
        fontSize: 14,
        color: COLORS.PRIMARY,
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
        // textTransform: 'capitalize'
    },
    orderIdText: {
        fontSize: 14,
        color: COLORS.PRIMARY,
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    headerAmount : {
        fontSize: 30,
        color: COLORS.DEFAULT
    },
    success: {
        fontSize: 26,
        color: COLORS.SUCCESS
    }, 
    bold: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 5,
    },
    small: {
        fontSize: 12,
        padding: 2,
        paddingLeft: 5,
        color: COLORS.INPUT_LABEL
    }

   
});