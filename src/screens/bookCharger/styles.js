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
    scrollView: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center', 
        marginBottom: 20,
    },
    onBoardImage: {
        width: screenHeight * 0.5,
        height: screenHeight * 0.2,
        resizeMode:'contain'
    },
    footer: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '10%'
    },
    title: {
        color: COLORS.DEFAULT,
        fontSize: 38,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        lineHeight: 40,
    },
    medium: {
        color: COLORS.BLACK,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
    },
    text: {
        color: COLORS.DEFAULT,
        fontSize: 12,
        fontFamily: "Poppins-medium",
    }, 
    placeholderText: {
        color: COLORS.DEFAULT,
        fontSize: 16,
        fontFamily: "Poppins-regular",
        fontWeight: '300',
    },
    button: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop:  20
    },
    buttonText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    formField: {
        width: screenWidth - 40 ,
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        marginLeft: 15
    },
    backIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    textSign: {
        color: COLORS.DEFAULT,
        fontWeight: 'bold',
        margin: 5
    },
    infoText: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        marginTop: 50,
        textAlign: 'center',
        // position: 'absolute',
        // bottom : '10%'
    },
    checkboxContainer: {
        flex:1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 50,
    },
    headerContainer: {
        flex:1,
        flexDirection: 'row',
        marginTop: 20,
        margin: 10,
        borderBottomWidth: 1, 
        borderColor: '#fff'
    },
    headerTitle: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        marginBottom: 5
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    iconView: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageIcon : {
        resizeMode: 'contain'
    },
    vehicleLabel: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        textAlign: 'center',
    },
    selectBoxContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop: 20,
        paddingLeft: 25,
        paddingRight: 25,
        borderWidth: 1,
        borderColor: COLORS.DEFAULT,
        borderRadius: 20,
    },
    selectBoxField: {
        flex:1,
        flexDirection: 'row',
        width: screenWidth - 40 ,
        height: 60, 
        marginTop: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAULT,
        // paddingLeft: 20,
        // paddingRight: 20,
        color: COLORS.black,
        borderRadius: 30,
    },
    selectBoxDivider: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: COLORS.DEFAULT,
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerContainer: {
        flex:1,
        flexDirection: 'row',
        width: screenWidth - 40 ,
        height: 60, 
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        color: COLORS.black,
        borderRadius: 30,
    },
    IOS: {
        width: '100%',
        height:'100%',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        marginLeft: '2%',
    },
    android: {
        width: 200,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        marginLeft: '2%',
       
    },
    IOSDark: {
        width: '100%',
        height:'100%',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK,
        marginLeft: '2%',
    },
    androidDark: {
        width: screenWidth/1.5,
        fontSize: 16,
        height:'100%',
        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK,
        marginLeft: '2%',
    },
    itemBoxContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop: 20,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: COLORS.HEADER_BACKGROUND,
        borderRadius: 20,
    },
    itemBoxField: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemBoxDivider: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: COLORS.DEFAULT,
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterBoxField: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth/2,
        height: 50,
        marginTop: 20,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        alignSelf: 'flex-end',
        color: COLORS.black,
        borderWidth : 1,
        borderColor: COLORS.DEFAULT,
        borderRadius: 30,
    },
    filterPickerContainer: {
        flex:1,
        flexDirection: 'row',
        width: screenWidth,
        height: '100%', 
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        color: COLORS.DEFAULT,
        borderRadius: 30,
    },
    filterIOS: {
        width: '100%',
        height:'100%',
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        marginLeft: '2%',
    },
    filterAndroid: {
        width: 200,
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        backgroundColor: 'transparent',
        zIndex: 98
    },
    //List view
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.DEFAULT,
        padding: 15,
        marginVertical: 8,
        borderRadius: 15,
        overflow: 'hidden'
    },
    itemHeader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',  
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        borderRadius: 30,
        marginVertical: 2
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    actionContent: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        fontSize: 14,
        fontWeight: '800',
        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK,
        overflow: 'hidden'
    },
    medium: {
        fontSize: 12,
        fontWeight: '800',
        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK,
        overflow: 'hidden'
    },
    description: {
        fontSize: 10,
        color: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: COLORS.INPUT_LABEL
    },
    createdAt: {
        fontSize: 10,
        color: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        fontWeight: '400',
        color: COLORS.BLACK
    },
    iconAction: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        fontFamily: "Poppins-Regular",
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
    },


    androidRow: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth/1.3,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 16,
        color: COLORS.BLACK,
        borderRadius: 30,
        paddingHorizontal: 10,
    },
    pickerText: {
        color: COLORS.DISABLED,
        fontSize: 14,
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    activePickerText: {
        color: COLORS.BLACK,
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
        zIndex: 998,
    },
    resultItemBorder: {
        borderColor: COLORS.BORDER_COLOR,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderRadius: 16,
    },
    resultName: {
        fontSize: 12,
        fontFamily: "Poppins-medium",
        fontWeight: '600',
    },
    resultText: {
        color: COLORS.PRIMARY,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        margin: 5
    }, 
    resultPlaceholder: {
        color: COLORS.DISABLED,
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