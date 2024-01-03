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
    footer: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%'
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        marginBottom: 20,
        marginHorizontal: 10,
    },
    calendarContainer: {
        flex: 1,
        width: screenWidth - 10,
        justifyContent: 'center',
    },
    active: {
        backgroundColor: COLORS.SUCCESS,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        padding: 5,
    },
    endActive: {
        backgroundColor: COLORS.SUCCESS,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        padding: 5,
    },
    scheduledTime : {
        backgroundColor: COLORS.WARNING,
        borderRadius: 5,
        padding: 5,
    },
    endTime : {
        backgroundColor: COLORS.WARNING,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        padding: 5,
    },
    activeText: {
        color: COLORS.PRIMARY,
        fontWeight: '800',
        color: COLORS.DEFAULT
    },
    inActive: {
        backgroundColor: COLORS.ERROR,
        padding: 2,
        borderRadius: 5
    },
    inActiveText: {
        color: COLORS.DEFAULT
    },
    disabled: {
        backgroundColor: COLORS.ERROR,
        borderRadius: 5,
        padding: 5
    },
    disabledText: {
        color: COLORS.DEFAULT,
        fontWeight: '800'
    },
    bodyContainer: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth - 40,
        marginHorizontal: 20,
    },
    col: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    headerInfo: {
        fontSize: 18,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
    },
    note: {
        fontSize: 12,
        fontFamily: "Poppins-regular",
        color: COLORS.DEFAULT,
        marginLeft: 10,
        paddingTop: 30
    },
    timeSlot: {
        fontSize: 10,
        fontFamily: "Poppins-regular",
        color: COLORS.DEFAULT,
        marginHorizontal: 10,
    },
    timeText: {
        fontSize: 12,
        fontFamily: "Poppins-regular",
        color: COLORS.DEFAULT,
        marginHorizontal: 8,
        textAlign: 'center'
    },
    infoText: {
        fontSize: 12,
        fontFamily: "Poppins-regular",
        color: COLORS.DEFAULT,
        marginHorizontal: 8,
        textAlign: 'center'
    },
    bold: {
        fontWeight: 'bold'
    },
    footerContainer: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: screenHeight/3.2,
        width: screenWidth/1.2,
        backgroundColor: COLORS.HEADER_BACKGROUND,
        padding: 10,
        borderRadius: 20,
        marginVertical: 20
    },
    signInButton: {
        width: screenWidth/1.2,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginVertical: 30
    },
    buttonText: {
        fontSize: 18,
        fontFamily: "Poppins-regular",
        color: COLORS.BLACK,
    },
    noDataFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataFoundText: {
        color: COLORS.ERROR,
        fontSize: 14,
        fontFamily: "Poppins-medium",
    },
    bottomBorder: {
        borderBottomColor: '#fff', 
        borderBottomWidth: 0.5
    },
    infoTopBottomContainer: { 
        borderRightWidth: 0.5, 
        borderRightColor: '#fff',  
        height: '100%', 
        justifyContent: 'center'
    },
    dateSelectionBox: {
        width: '25%',
        height: 30,
        justifyContent: 'space-evenly', 
        alignItems: 'center',
        marginVertical: 5,
    },
    inBetween: {
       backgroundColor: COLORS.SUCCESS,
       opacity: 0.7 
    }

});