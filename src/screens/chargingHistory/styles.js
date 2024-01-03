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
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    scrollView: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    headerContainer: {
        flexDirection: 'column', 
        margin: 20, 
        padding: 10,
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius: 20, 
        backgroundColor: COLORS.HEADER_BACKGROUND
    },
    headerTextContainer: {
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column'
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    tabBar: {
        flexDirection: 'row',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        color: COLORS.BUTTON_TEXT,
        marginVertical: 20,
        marginHorizontal: 10,
        borderRadius: 20,
        padding: 10,
        backgroundColor: COLORS.DEFAULT
    },
    tabViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        color: COLORS.BUTTON_TEXT
    }
});
