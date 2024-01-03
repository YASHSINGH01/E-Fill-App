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
    absoluteFillObject: {
        position: 'absolute',
    //    maxHeight:'300%',
    //    maxWidth:'100%',
        top: 0,
        // left: 0,
        right: 0,
        bottom: 0,
        opacity:0.2,
        marginLeft:20,
        marginTop:'100%'
       },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)'
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
        alignItems:'center',
        margin: '10%',
        marginHorizontal: '5%'
    },
    buttonContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.DEFAULT,
        borderWidth: 1,
    },
    contentHeader: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contentBody: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:50
    },
    content: {
        marginTop:-180,
        flex: 2,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        width: screenWidth * 0.55,
        height: screenWidth * 0.55,
        borderRadius: (screenWidth * 0.6)/1,
        borderColor: COLORS.HEADER_BACKGROUND,
        borderWidth: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.PRIMARY,
        zIndex: 1
    },
    chargingIndicator: {
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
        resizeMode: 'contain'
    },
    contentFooter: {
        
        flex: 2,
        width: '100%',
        justifyContent: 'center',
        
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1, 

    },
    
    roww: {
        width:screenWidth,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',    

    },
    roww1: {
        width:screenWidth,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:-10,
        paddingBottom:15
    },
    col: {
        flex: 0.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center' 
    },
    col1: {
        flex: 0.5,
        justifyContent:'center',
        alignContent:'center',
        flexDirection: 'column',
       
    },
    text: {
        color: COLORS.DEFAULT,
        fontSize: 15,
        fontFamily: "Poppins-medium",
        marginTop:-10,
        
        // textTransform: 'capitalize'
    },
    text2: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",  
        // paddingBottom:20,
        // marginTop:-20,
        // textTransform: 'capitalize'
    },
    text3: {
        color: "#bfc1c2",
        fontSize: 16,
        fontFamily: "Poppins-medium",  
         // marginLeft:60,
         paddingTop:45,
         paddingBottom:20,
         fontWeight:'700',
         justifyContent:'center',
         alignContent:'center',
        textTransform: 'capitalize'
    },
    locate:{
       
        
        textAlign:'center',
        justifyContent:'center',
         alignContent:'center',
        fontFamily: "Poppins-medium",
        fontSize:16,
        marginBottom:10,
        color: COLORS.DEFAULT,
    },
    text1: {
        color:'#77DD77',
        fontSize: 30,
        
        fontFamily: "Poppins-medium",
       fontWeight:'bold',
        textAlign:'center',
        textTransform: 'capitalize'
    },
    image: {
        width: 100,
        height: 100,
        minHeight:90,
        marginTop:20,
        marginBottom:20,
        // marginBottom:-20,
        justifyContent:'flex-end',
    alignContent:'flex-end',
        resizeMode: 'contain',
        
    },
    textt: {
        fontSize: 20,
        fontFamily: "Poppins-medium",
        marginTop:15,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color:'#9dbb52'
    },
    title: {
        marginTop:5,
        color:'#bfc1c2',
        fontSize: 12,
       
    },
    tittle: {
        color:'#bfc1c2',
        fontSize: 18,
      
    },
    tittle1: {
        color:'#bfc1c2',
        fontSize: 14,
        justifyContent:'flex-start',
        alignContent:'flex-start'
      
    },
    percentage: {
        fontSize: 20,
        fontFamily: "Poppins-medium",
        marginTop:15,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color:'#9dbb52'
    },
    rowBackground: {
        marginBottom:5,
      borderRadius:10,
        backgroundColor: COLORS.HEADER_BACKGROUND
    },
    box:{
height:screenHeight/5.8,
width:screenWidth/1.1,
    },
    margin:{
        marginRight:14,
        marginLeft:10,
        paddingLeft:10,
        borderRadius:10,
        // paddingTop:10,
        // backgroundColor:COLORS.PRIMARY,
        //marginHorizontal:2,
        height:75,
    },
    margin1:{
        // marginRight:14,
        borderRadius:5,
        backgroundColor:COLORS.HEADER_BACKGROUND,
         minHeight:90,
         margin:10,
         marginTop:40,
    },
    border: {
        borderColor: COLORS.PLACEHOLDER,
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    colBorder: {
        borderColor: COLORS.PLACEHOLDER,
        borderLeftWidth: 1,
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
        // marginTop: 20
    },
    linearGradient: {
        width: '70%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
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
    
});