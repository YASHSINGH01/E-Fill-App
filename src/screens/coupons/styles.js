import { StyleSheet, Dimensions, Platform } from "react-native";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../constants/colors";

export default styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: screenWidth - 30,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        bottom: '45%',
        marginHorizontal: 15,
        borderRadius: 5,
        backgroundColor: COLORS.PRIMARY,
        shadowOffset: { width: 8, height: 8, },
        shadowColor: '#05294b',
        shadowOpacity: 0.7,
    },
    availableConnectorText: {
        color:COLORS.DEFAULT,
        fontSize: 12,
        fontFamily: "Poppins-medium",
        flexDirection: 'row',
        flex: 1.9,
        fontWeight:'bold',
        marginHorizontal: 10
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        marginVertical: 10
    },
    listView: {
        flex: 0.4,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 6,
    },
    listContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginVertical: 10,
    },

    availableConnector: {
        fontSize: 16,
        fontFamily: "Poppins-medium",
        color: COLORS.BLACK,
        flexDirection: 'row',
        textAlign: 'center',
        marginHorizontal: 10
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 5
    },
    header: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    body: {
        flex: 3,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        borderBottomColor: COLORS.INPUT_LABEL,
        borderBottomWidth: 1
    },
    h1: {
        textAlign: 'left',
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
    },
    text: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT
    },
    points: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
    },
    mediumBold: {
        fontSize: 14,
        fontWeight: '500',
        flex: 2,
    },
    address: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: COLORS.INPUT_LABEL
    },
    marginHorizontal: {
        marginHorizontal: 10
    },
    bold: {
        fontWeight: '600'
    },
    button: {
        flex: 1,
        // shadowOpacity: 2,
        textTransform: 'capitalize',
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: 'green',
        borderRadius: 5,
        borderWidth:1,
        margin: 5,
        shadowColor: 'white',

    },
    onlinebutton: {
        backgroundColor: '#05294b',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth:'40%',
        borderColor: 'green',
        borderRadius: 5,
        shadowColor: 'green',
    },
    busybutton: {
        backgroundColor: '#DB4914',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'green',
        borderRadius: 5,
        minWidth:'43%',
        shadowColor: 'green',
    },

    linearGradient:{
        width: screenWidth/2 ,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginLeft:10,
        // marginTop: 10
    },
    image: {
        width: 40,
        height: 24,
        resizeMode: 'contain',
        borderRadius: 30,
        alignSelf: 'center'
    },
     inputtext:{
        backgroundColor:COLORS.DEFAULT,
        borderRadius:10,
        marginLeft:Platform.OS=='ios'? 60: 40,
        width:screenWidth/1.5,
        justifyContent:'center',
        alignSelf:'center',
        height:40,
     },
    iconContainer: {
        flex: 1,
        fontWeight: 'bold',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 999,
    },
});