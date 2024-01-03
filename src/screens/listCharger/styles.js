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
        marginHorizontal: '2%'
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
        marginTop: '5%'
    },
    title: {
        color: COLORS.DEFAULT,
        fontSize: 38,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        lineHeight: 40,
    },
    ratingContent: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 5
    },
    headerText: {
        color: COLORS.GRADIENT_START,
        fontSize: 16,
        fontFamily: "Poppins-regular",
        textAlign: 'center',
        fontWeight: '200',
    },
    text: {
        color: COLORS.DEFAULT,
        fontSize: 12,
        fontFamily: "Poppins-medium",
        textAlign: 'center',
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
   
    headerField: {
        width: screenWidth - 40 ,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.GRADIENT_START,
        borderRadius: 30,
        paddingHorizontal: 25,
        paddingVertical: 10,
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    formField: {
        flex: 1,
        width: '100%',
        margin: '2%'
    },
    label: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        fontWeight: '500',
        margin: '2%'
    },
    labelStart: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        fontWeight: '500',
        margin: 10,
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
        flex: 1,
        height:'100%',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.black,
        margin: '2%',
    },
    error: {
        width: '100%',
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        textAlign: 'left',
        marginLeft: 15,
        padding: 5,
        color: '#ff0000',
    },
    signInButton: {
        width: screenWidth - 40 ,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginVertical: 30,
        position: 'relative'
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
        fontSize: 10,
        alignSelf: 'center',
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        marginTop: 50,
        textAlign: 'center',
    },
    iconView: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: screenWidth/5,
        height: screenWidth/5,
        margin: 5,
        backgroundColor: COLORS.DEFAULT
    },
    active: {
        borderWidth: 2,
        borderColor: COLORS.WARNING
    },
    activeFont: {
        color: COLORS.DEFAULT,
    },
    imageIcon : {
        width: screenWidth/5,
        height: screenWidth/10,
        resizeMode: 'contain',
        marginVertical: 5
    },
    connectorLabel: {
        fontSize: 8,
        fontFamily: "Poppins-Regular",
        color: COLORS.PRIMARY,
        textAlign: 'center',
    },

    row: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        alignItems: 'center'
    },
    input: {
        flex: 1, 
        margin: '2%',
        zIndex: 1,
        
    },
    connectorContainer: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    imageContent: {
        flex: 1, 
        margin: '2%', 
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#DCDCDC',
        borderRadius: 10,
        height: 150,
        overflow: 'hidden'
    },
    imageContentBackground: {
        flexDirection: 'column',
        backgroundColor: '#113C60',
    },
    imagePreview: {
        height: 150, 
        width: '100%'
    },

});