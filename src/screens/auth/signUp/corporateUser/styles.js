import { StyleSheet, Dimensions } from "react-native";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../../../constants/colors";

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.PRIMARY,
      zIndex: 9999,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 1,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
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
        zIndex: 2,
    },
    title: {
        color: COLORS.DEFAULT,
        fontSize: 38,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        lineHeight: 40,
    },
    text: {
        color: COLORS.DEFAULT,
        fontSize: 12,
        fontFamily: "Poppins-medium",
        marginTop: 20
    }, 
    button: {
        width: screenWidth - 40 ,
        height: 60,
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
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    formField: {
        width: screenWidth - 40 ,
        margin: 5
    },
    label: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        margin: 5,
        marginLeft: 15
    },
    inputContainer: {
        width: screenWidth - 40 ,
        height: 60, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.black,
        borderRadius: 30,
    },
    inputText: {
        flex:1,
        height:'100%',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.black,
        marginLeft: '2%'
    },
    error: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        marginLeft: 15,
        padding: 5,
        color: '#ff0000',
    },
    success: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        marginLeft: 15,
        padding: 5,
        color: COLORS.SUCCESS,
    },
    signInButton: {
        width: screenWidth - 40 ,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 30
    },
    signIn: {
       width: 70,
       height: 70,
       justifyContent: 'center', 
       alignItems: 'center',
       borderRadius: 70/2,
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
    checkbox: {
        width: 20,
        height: 20,
        alignSelf: "center",
        color: '#fff',
        borderColor: '#A4FF8B',
        borderRadius: 5
    },
    checkboxLabel:{
        color: COLORS.DEFAULT,
        fontSize: 12,
        fontFamily: "Poppins-medium",
        marginLeft: 5
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconView: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        opacity: 1,
    },
    inactive: {
        opacity: 0.5
    },
    activeFont: {
        fontSize: 14,
        fontWeight: '800',
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        textAlign: 'center',
    },
    imageIcon : {
        width: screenWidth/5,
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
        flex: 1,
        flexDirection: 'row',
        height: 50,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
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
    infoText: {
        fontSize: 10,
        alignSelf: 'center',
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        marginTop: 50,
        textAlign: 'center',
        lineHeight: 22
    }
});