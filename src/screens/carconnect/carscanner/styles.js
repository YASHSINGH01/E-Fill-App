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
      backgroundColor: COLORS.PRIMARY
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    bodyContent: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        zIndex: 998,
    },
    qrContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: screenWidth/1.1,
        height: screenHeight/2,
        marginHorizontal: 20,
        borderRadius: 30,
        backgroundColor: '#fff',
        padding: 20,
        position: 'absolute',
        top: 50
    },
    qrView: {
        width: '100%',
        height: screenHeight/3.1,
        justifyContent: 'center',
        borderRadius: 30,
        overflow: 'hidden',
    },
    permissionText: {
        textAlign: 'center',
        fontSize: 12, 
        alignSelf: 'center', 
        color: COLORS.ERROR,
        fontFamily: "Poppins-Regular"
    },
    statusText: {
        height: '100%',
        color:"#000000",
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        fontWeight: '700',
        textAlign: 'center',
    },
    addVehicleContainer: {
        flex: 1,
        backgroundColor: COLORS.HEADER_BACKGROUND, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    vehicleText: {
        color: COLORS.BLACK,
        fontSize: 16,
        padding: 20,
        borderRadius: 20,
        alignSelf: 'center',
        fontFamily: "Poppins-Regular",
    },
    signInButton: {
        width: screenWidth/2,
        height: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 30,
        zIndex: 999,
        position: 'absolute',
        bottom : -10
    },
    buttonText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    footer: {
        flex: 4,
        backgroundColor: COLORS.HEADER_BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    formField: {
       flex: 0.5,
       paddingTop: 50,
        // position: 'relative'
    },
    selectBoxField: {
        width: screenWidth/1.1,
        height: 60,
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.black,
        borderRadius: 30,
    },
    pickerContainer: {
        flexDirection: 'row',
        width: screenWidth - 40 ,
        height: 60,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAULT,
        paddingLeft: 20,
        paddingRight: 20,
        color: COLORS.BLACK,
        borderRadius: 30,
    },
    IOS: {
        width: screenWidth/1.3,
        height: '100%',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK,
        paddingVertical: 12,
        paddingHorizontal: 30,
        
    },
    android: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth/1.3,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 16,
        color: COLORS.BLACK,
        borderRadius: 30,
        paddingHorizontal: 20,
    },
    pickerText: {
        color: COLORS.DISABLED,
        fontSize: 14,
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    modalBody: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContainer: {
        width: '80%',
        height: '30%',
        marginHorizontal: '50%',
        justifyContent: 'center',
        backgroundColor: COLORS.DEFAULT,
        borderRadius: 6,
    },
    modalScrollView: {
        flexGrow: 1,
        width: '100%',
    },
    resultItem: {
        padding: 15,
        width: '100%',
        borderColor: COLORS.BORDER_COLOR,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        zIndex: 998,
        borderRadius: 16,
    },
    resultName: {
        fontSize: 12,
        fontFamily: "Poppins-medium",
        fontWeight: '600',
    },
    resultAddress: {
        fontSize: 12,
        fontFamily: "Poppins-medium",
        fontWeight: '500'
    },
    resultText: {
        color: COLORS.PRIMARY,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        margin: 5
    }, 
    resultContainer: {
        flex: 1, 
        marginHorizontal: 10,
        width: '100%',
        position: 'absolute',
        height: '40%'
    }
});