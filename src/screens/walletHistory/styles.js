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
    //List view
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.DEFAULT,
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    itemHeader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    seperator: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row', 
        borderTopColor: '#ccc', 
        borderTopWidth: 1, 
        margin: 5
    },
    button: {
        flex: 1,  
        height: 50,
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 10,  
        margin: 5,
        borderRadius: 10, 
    },
  
    linearGradient: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    success : {
        backgroundColor: COLORS.SUCCESS
    },
    danger: {
        backgroundColor: COLORS.ERROR
    },
    leftAlign: {
        textAlign: 'left'
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 50
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
    },
    descriptionContent: {
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    bottomContent: {
        justifyContent: 'space-evenly', 
        alignItems: 'center'
    },
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        color: COLORS.PRIMARY
    },
    cancelText: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: "Poppins-Regular",
        color: COLORS.PRIMARY
    },
    label: {
        fontWeight: '700',
        color: COLORS.LIGHT_BLACK
    },
    description: {
        fontSize: 12,
        color: COLORS.DEFAULT,
        fontWeight: '400',
        fontFamily: "Poppins-Regular",
        color: COLORS.LIGHT_BLACK
    },
    createdAt: {
        fontSize: 10,
        color: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        fontWeight: '400',
        color: COLORS.INPUT_LABEL
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


    closeButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    closeIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    headerText: {
        flex: 0.6,
        fontSize: 18, 
        fontWeight: '600',
        fontFamily: 'Poppins-Regular', 
        textAlign: 'center',
        color: COLORS.DEFAULT,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formField: {
        flex:1,
    },
    label: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: COLORS.PRIMARY,
        margin: 5,
        marginLeft: 20,
    },
    inputContainer: {
        width: screenWidth - 40 ,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Platform.OS == 'ios' ? 10 : null,
        paddingHorizontal: 20,
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.black,
        borderColor: COLORS.PLACEHOLDER,
        borderWidth: 1,
        borderRadius: 30,
        margin: 10
    },
    inputText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.black,
    },
    placeholderText: {
        color: COLORS.PLACEHOLDER,
        fontSize: 16,
        fontFamily: "Poppins-regular",
        fontWeight: '300',
    },
    signInButton: {
        width: screenWidth/1.5,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        margin: 30
    },
    buttonText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    trashButton: {
        width: 60 ,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        margin: 30
    },

    //Filter
    filterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    filterRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    rowItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        fontFamily: "Poppins-Regular",
        color: COLORS.PRIMARY
    }
});