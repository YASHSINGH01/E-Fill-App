import { StyleSheet, Dimensions, Platform } from "react-native";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../constants/colors";

const DEVICE = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.PRIMARY,
      zIndex: 9999,
    },
    header: {
        height: '12%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    body: {
        height: screenHeight/3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%',
    },
    footer: {
        flex: 4,
        height: screenHeight/1.5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '2%',
        padding: '5%',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
       zIndex: 9999
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    ImageContainer: {
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    col: {
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        marginHorizontal: 10
    },
     wallet_row: {
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 5,
        },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: 5,
    },
    row1: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: 5,
    },
     circle: {
            flex: 0.2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:-40,
            // marginVertical: -10,
        },
    subRows: {
        flex: 0.5, 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center'
    },
    head: {
        fontSize: 18,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        textAlign: 'center',
        color: COLORS.DEFAULT,
        textAlign: 'center'
    },
    noticeText: {
        fontSize: 10,
        fontFamily: "Poppins-Regular",
        color: '#A4FF8B',
        textAlign: 'justify'
    },
    subHeadContainer: { 
        borderWidth: 1, 
        borderColor: '#A4FF8B', 
        borderRadius: 30, 
        width: '85%',
        marginVertical: 2,
    },
    subHead: {
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        textAlign: 'center'
    },
    chargingStationDetailsContainer: { 
        flex: 2,
        justifyContent: 'center',
        // marginTop:-50,
        alignItems: 'center'
    },
    balanceContainer: { 
        justifyContent: 'space-evenly', 
        alignItems: 'center', 
        marginVertical: 10, 
        marginHorizontal: 2
    },
    symbol: {
       fontSize: 18 ,
       fontFamily: "Poppins-Regular",
       color: COLORS.GRADIENT_START,
       textAlign: 'center'
    },
    image: {
        width: 90,
        height:Platform.OS=="android"? 110:90,
        resizeMode: 'contain',
        // borderRadius: 40
    },
    balanceText: {
        fontSize: 16,
        fontFamily: "Poppins-Light",
        color: COLORS.DEFAULT,
        marginHorizontal: 5
    },
    textBold: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        fontWeight: '700'

    },
    item: {
        flex: 1,
        height:40,
        width:15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAULT,
        marginHorizontal: 5,
        borderRadius: 8, 
        overflow: "hidden"
    },
    linearView: {
        width: '100%', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8, 
    },
    textDark: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK,
        textAlign: 'center'
    },
    paymentLogo: {
        width: 55,
        height: 55,
        resizeMode: 'cover',
        borderRadius: 55/2,
        overflow: 'hidden',
        marginHorizontal: 2,
        borderColor: '#fff',
        borderWidth: 1,
    },
    optionBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.PRIMARY,
        marginHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 8, 
    },
    active: {
        backgroundColor: COLORS.DEFAULT,
    },
    optionText: {
        flex: 1,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        fontSize: 12,
        fontFamily: "Poppins-Light",
        color: COLORS.DEFAULT,
    },
    activeText: {
        color: COLORS.PRIMARY,
    },
    signInButton: {
        width: screenWidth - 90 ,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 10,
        marginLeft:30,
        marginBottom: 30
    },
    buttonText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    applyCoupon: {
        flexDirection: 'row',
        width: 90,
        height: 30,
        justifyContent:'center',
        alignItems: "center",
        borderWidth: 1, 
        borderColor: COLORS.DEFAULT, 
        borderRadius: 90/2
    },
    removeCoupon: {
        width: '32%',
        flexDirection: 'row',
        height: 30,
        paddingHorizontal: 10,
        justifyContent:'space-between',
        alignItems: "center",
        borderWidth: 1, 
        borderColor: COLORS.DEFAULT, 
        borderRadius: 90/2
    },
    couponText:{
        fontSize: 12, 
        fontFamily: 'Poppins-Regular', 
        color: COLORS.DEFAULT,
        textAlign:'center',
    },

    bottomSheetContainer: {
        flex: 8,
        flexDirection: 'column',
        marginTop: '2%',
        padding: '5%',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
       zIndex: 9999
    },
    gestureArea: {
        width: DEVICE.width,
        height: 40,
    
        marginTop: -10,
        position: 'absolute',
    
        justifyContent: 'center',
        alignItems: 'center',
    },
    pullItem: {
        width: 100,
        height: 5,
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: COLORS.DEFAULT
    },
    inputText: {
        width: '20%',
        fontSize: 18, 
        padding: 0, 
        color: '#fff', 
        fontFamily: "Poppins-Bold", 
        borderColor: '#fff', 
        borderBottomWidth: 1
    }
});