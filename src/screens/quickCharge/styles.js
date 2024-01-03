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
      backgroundColor: COLORS.PRIMARY
    },
    container1: {
        flex:8,
        backgroundColor: COLORS.PRIMARY,
        marginTop:5,
        //  paddingVertical: 25,
        // paddingBottom:10,
      },
      modal: {
        height: screenWidth - 210,
        flexDirection: 'column',
        width: screenWidth - 30,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        top: 210,
        marginHorizontal: 15,
        borderRadius: 5,
     backgroundColor: COLORS.DEFAULT,
        shadowOffset: { width: 8, height: 8, },
        shadowColor: '#05294b',
        shadowOpacity: 0.7,
        //   padding : 10,
        //   marginTop:80,
        },
        iconContainer: {
            flex: 1,
            fontWeight: 'bold',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            position: 'absolute',
            // backgroundColor: COLORS.DEFAULT,
            top: 5,
            right: 0,
            zIndex: 999,
        },
        image2:{
            width: 30,
            height: 22,
            resizeMode: 'contain',
            borderRadius: 30,
            alignSelf: 'center'
        },
        row1: {
            flex: 1,
            marginTop:-10,
           flexDirection: 'row',
           justifyContent: 'center',
           alignItems: 'center',
       },
       text: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        justifyContent: 'center',
        alignItems: 'center',
    },
    title1: {
        fontSize: 13,
        fontWeight: '600',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:20,
        marginTop:-40,
        color:"#000"
        // backgroundColor:COLORS.HEADER_BACKGROUND,
        // borderRadius:30,
    },
    //   container2: {
    //     flex:1,
    //     backgroundColor: COLORS.PRIMARY,
    //     // paddingVertical: 25,
    //     paddingBottom:10,
    //   },
    container2: {
          
        justifyContent: 'center',
        alignItems: 'center',
      //   margin: 20
    
      },
    header: {
         flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
       
    },
    image: {
        width: 120,
        height: 90,
        resizeMode: 'contain',
        borderRadius: 0,
        justifyContent: 'center'

    },
    description: {
        fontSize: 12,
        color: COLORS.INPUT_LABEL,
        fontWeight: '500',
        paddingVertical: 5,
    },
    image1: {
        width: 40,
        height: 30,
        resizeMode: 'contain',
        borderRadius: 30,
         marginLeft:10,
        // paddingLeft:60,
        alignSelf: 'center'
    },
    text: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        justifyContent: 'center',
        alignItems: 'center',
    },
   
    title: {
        fontSize: 13,
        fontWeight: '600',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:20,
        color:"#C0C0C0"
        // backgroundColor:COLORS.HEADER_BACKGROUND,
        // borderRadius:30,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    bodyContent: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemHeader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon:{
        marginTop:25,
    },
    item: {
        flex: 1,
        height:75,
        flexDirection: 'row',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
         paddingTop: 2,
        zIndex: 998,
    },
    // qrContainer: {
    //     flex: 1,
    //     justifyContent: 'flex-start',
    //     alignItems: 'center',
    //     width: screenWidth/1.2,
    //     height: screenHeight/1.9,
    //     marginHorizontal: 20,
    //     borderRadius: 30,
    //     backgroundColor: '#fff',
    //     padding: 20,
    //     position: 'absolute',
    //     top: 50
    // },
    qrView: {
        //  marginTop:8,
        width: screenWidth/1,
        height: screenHeight/1.1,
        justifyContent: 'center',
       
        overflow: 'hidden',
    },
    permissionText: {
        textAlign: 'center',
        fontSize: 12, 
        alignSelf: 'center', 
        color: COLORS.ERROR,
        fontFamily: "Poppins-Regular"
    },
    statusText: {
        flex:3,
        height: '100%',
        color: COLORS.ERROR,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        fontWeight: '700',
        textAlign: 'center',
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
    addVehicleContainer: {
        flex: 1,
        backgroundColor: COLORS.HEADER_BACKGROUND, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    vehicleText: {
        color: COLORS.BLACK,
        fontSize: 16,
        padding: 20,
        borderRadius: 20,
        alignSelf: 'center',
        fontFamily: "Poppins-Regular",
    },
    signInButton: {
        width: screenWidth/2,
        height: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 30,
        zIndex: 999,
        position: 'absolute',
        bottom : -10
    },
    buttonText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    footer: {
        flex: 4,
        backgroundColor: COLORS.HEADER_BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    formField: {
       flex: 0.5,
       paddingTop: 50,
        // position: 'relative'
    },
    selectBoxField: {
        width: screenWidth/1.1,
        height: 60,
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.black,
        borderRadius: 30,
    },
    pickerContainer: {
        flexDirection: 'row',
        width: screenWidth - 40 ,
        height: 60,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAULT,
        paddingLeft: 20,
        paddingRight: 20,
        color: COLORS.BLACK,
        borderRadius: 30,
    },
    IOS: {
        width: screenWidth/1.3,
        height: '100%',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK,
        paddingVertical: 12,
        paddingHorizontal: 30,
        
    },
    android: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth/1.3,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 16,
        color: COLORS.BLACK,
        borderRadius: 30,
        paddingHorizontal: 20,
    },
    pickerText: {
       // margin:10,
        marginTop:10,
        marginBottom:5,
        color: "#31906E",
        fontSize: 14,
        //fontWeight:'bold',
        // minHeight:40,
       
        justifyContent:'center',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
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
        borderColor: COLORS.BORDER_COLOR,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        zIndex: 998,
        borderRadius: 16,
    },
    resultName: {
        fontSize: 12,
        fontFamily: "Poppins-medium",
        fontWeight: '600',
    },
    resultAddress: {
        fontSize: 12,
        fontFamily: "Poppins-medium",
        fontWeight: '500'
    },
    resultText: {
        color: COLORS.PRIMARY,
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