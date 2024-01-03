import { StyleSheet, Dimensions } from "react-native";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../../../constants/colors";

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
        marginTop: '3%'
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
    box:{
        flexGrow:1,
        flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    width: screenWidth - 40 ,
    paddingHorizontal: 10,
    zIndex: 1,
    },
    dropdown: {
        flexGrow:1,
        flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    width: screenWidth - 40 ,
    paddingHorizontal: 10,
    zIndex: 999,
      },
    inputContainer: {
        width: screenWidth - 40 ,
        height: 50, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.black,
        
        borderRadius: 10,
    },
    availabilityIconContainer: {
        position: 'relative',
        // top: '42%',
       justifyContent:'center',
         alignSelf: 'center',
        marginTop:10,
        marginLeft:10,
       
    },
    IconButton: {
        position: 'relative',
        width: 45,
        height: 45,
        marginLeft:20,
        alignSelf:'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        borderRadius: 55 / 2,
    },
    imageStyle: {
        marginTop:10,
     width: 90 ,
        height: 90,
        // margin: 5,
        //  marginTop:-50,
        marginLeft:50,
        backgroundColor: COLORS.DEFAULT,
        marginRight:50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
    inputText: {
        flex:1,
        height:'100%',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: COLORS.black,
        marginLeft: '3%'
    },
    error: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        marginLeft: 15,
        padding: 5,
        color: '#ff0000',
    },
    signInButton: {
        width: screenWidth - 40 ,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 15
    },
    box:{
        flexGrow:1,
        flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    width: screenWidth - 40 ,
    paddingHorizontal: 10,
    zIndex: 1,
    },
    dropdown: {
        flexGrow:1,
        flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    width: screenWidth - 40 ,
    paddingHorizontal: 10,
    zIndex: 999,
      },
    uploadButton: {
        width: screenWidth - 80 ,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 15
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
        marginBottom: 50,
        textAlign: 'center'
    },
    checkboxContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
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
    }
});