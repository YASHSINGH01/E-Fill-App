import { StyleSheet, Dimensions } from "react-native";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../constants/colors";
// import { Dimension } from '../../constants';

export default styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.PRIMARY
    },
    header: {
        height: '12%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 1,
    },
    footer: {
        flex: 8,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'absolute',
        marginVertical: 40, 
    },
    scrollView: {
        flexGrow: 8,
        width: screenWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerBackgroundImage: {
        width: screenWidth,
        height: screenHeight/3,
        resizeMode: 'cover',
        overflow:'hidden'
    },
    headerImage: {
        width: screenWidth,
        height: screenHeight/3,
        marginTop: '13%',
        resizeMode: 'contain',
    },
    wishlist: {
        width: 60,
        height: 60,
        borderRadius: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.ERROR,
        position: 'absolute',
        right: 30,
        top: screenHeight/3
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
        margin: 20
    },
    colLeft: {
        flex:2, 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    colRight: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    col: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    margin: {
        marginTop: 5
    },
    title: {
        fontSize: 16, 
        fontFamily: 'Poppins-Regular', 
        color: COLORS.DEFAULT
    },
    text: {
        fontSize: 14,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
    }, 
    bold: {
        fontWeight: '700'
    },
    small: {
        fontSize: 12,
        fontWeight: '500'
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor:'pink',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.GRADIENT_START,
        overflow: 'hidden',
        margin: 10
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        color: COLORS.BUTTON_TEXT,
        padding: 20,
        backgroundColor: COLORS.DEFAULT
    },
    tabViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        color: COLORS.BUTTON_TEXT
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    noDataFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataFoundText: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",
    }
});