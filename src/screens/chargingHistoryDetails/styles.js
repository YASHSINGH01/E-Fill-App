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
        backgroundColor: COLORS.HEADER_BACKGROUND,
        zIndex: 9999,
    },
    header: {
        height: '12%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 1,
    },
    background: {
        backgroundColor: COLORS.PRIMARY,
    },
    footer: {
        flex: 8,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        // position:'absolute',
        // zIndex: 0
    },
    mapView: {
        flex: 1,
        height: screenHeight * 1/3.5,
        width: '100%',
    },
    cardView: {
        justifyContent: 'flex-start',
        backgroundColor: COLORS.DEFAULT,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 5
    },
    cardViewNoBackground: {
        justifyContent: 'flex-start',
        backgroundColor: COLORS.WARNING,
        padding: 10,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    paddr: {
        padding: 10,
    },
    cardViewNoPadding: {
        justifyContent: 'flex-start',
        backgroundColor: COLORS.DEFAULT,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    address: {
        color: COLORS.ERROR
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontFamily: "Poppins-medium",
        fontWeight: 'bold',
        color: COLORS.PRIMARY
    },
    text: {
        color: COLORS.LIGHT_BLACK,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        margin: 5,
        textTransform: 'capitalize'
    },
    nonCapitalText: {
        color: COLORS.LIGHT_BLACK,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        margin: 5,
    },
    notifications: {
        color: COLORS.ERROR,
        alignSelf: 'center'

    },
    active: {
        color: COLORS.HEADER_BACKGROUND,
        fontWeight: '800'
    },
    amount: {
        color: COLORS.SUCCESS
    },
    status: {
        color: COLORS.DEFAULT,
        padding: 5,
        borderWidth: 1,
    },
    seperator: {
        flex: 1,
        width: '90%',
        height: 0.5,
        marginVertical: 10,
        backgroundColor: COLORS.HEADER_BACKGROUND,
        alignSelf: 'center',
    },
    signInButton: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 30,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 30
    },
    linearGradient: {
        width: '80%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    checkinText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    completed: {
        backgroundColor: COLORS.SUCCESS,
        borderColor: COLORS.SUCCESS,
    }, 
    cancelled: {
        backgroundColor: COLORS.ERROR,
        borderColor: COLORS.ERROR,
    },
    pending: {
        backgroundColor: COLORS.WARNING,
        borderColor: COLORS.WARNING,
    },
    noDataFoundContainer: {
        flex: 1,
        height: screenHeight/2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataFoundText: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",
    },
    tabItemContainer: {
        width:'40%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        color: COLORS.BUTTON_TEXT,
        marginVertical: 20,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: COLORS.DEFAULT
    },
    tabItem: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        color: COLORS.BUTTON_TEXT,
        backgroundColor: COLORS.DEFAULT
    },
    headerText: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        color: COLORS.BUTTON_TEXT
    }
});