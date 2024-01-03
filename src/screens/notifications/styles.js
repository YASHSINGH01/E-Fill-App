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
        marginTop: '5%',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAULT,
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    IconContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        width: 50,
        height: 50,
        borderRadius: 50/2
    },
    content: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginLeft: 5
    },
    title: {
        fontSize: 15,
        fontFamily: "Poppins-medium",
        fontWeight: '600',
    },
    description: {
        fontSize: 12,
        color: COLORS.INPUT_LABEL,
        fontFamily: "Poppins-medium",
        fontWeight: '500'
    },
    createdAt: {
        fontSize: 10,
        color: COLORS.INPUT_LABEL,
        fontFamily: "Poppins-medium",
        fontWeight: '400'
    },
    text: {
        color: COLORS.BLACK,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        margin: 5
    }, 
    leftAction: {
        width: '100%',
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginVertical: 8,
        borderRadius: 2,
    },
    textAction: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        marginRight: 30
    },
    alignCenter: {
        alignItems: 'center'
    },
    headingText: {
        color: COLORS.DEFAULT,
        fontSize: 22,
        fontFamily: "Poppins-medium",
    },
    notFoundImage: {
        // width: screenWidth/2,
        // height: screenHeight/3,
        resizeMode: 'cover',
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