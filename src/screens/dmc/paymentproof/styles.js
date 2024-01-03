import { StyleSheet, Dimensions,Platform } from "react-native";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../../constants/colors";

export default styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent: 'center',
      backgroundColor: COLORS.PRIMARY,
    //   zIndex: 9999,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
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
        color: COLORS.BLACK,
        borderRadius: 10,
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
    modalScrollView: {
        // flexDirection: 'column',
        justifyContent: 'flex-start',
        //  alignItems: 'center',
        marginTop: '3%'
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
    availabilityIconContainer: {
        position: 'relative',
        // top: '42%',
       justifyContent:'center',
         alignSelf: 'center',
        marginTop:10,
        marginLeft:10,
       
    },
    flat:{
         flex:1,
        backgroundColor:COLORS.PRIMARY,
         marginBottom:10,
         marginTop:20,
        //  height:screenHeight-10,
    },

    footer: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom:20,
        // marginTop: '10%',
    },
    
    text1: {
        // borderWidth:1,borderColor:'#000',
        color: COLORS.BLACK,
        fontSize: 18, 
        margin:5,
        
        // marginRight:40,
        // marginTop:5,
        // paddingLeft:30,
        textAlign:'right',
        fontWeight:'bold',
        fontFamily: "Poppins-medium",
      
    },
    goku: {
        position:"relative",
        top: '1%',
        alignSelf: 'flex-end',
        paddingRight:20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:7,
        // marginHorizontal: '1%',
    },
    badge: {
        position: 'absolute',
        // top: 0,
        right:12,
        color: '#fff',
        fontWeight: '800',
        zIndex: 1
    },
    IconButton: {
        position: 'relative',
        width: 45,
        height: 45,
        marginLeft:Platform.OS=="ios"? 45: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        borderRadius: 55 / 2,
    },
  
    imageIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.DEFAULT,
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10,
    },
    row3:{
        flexDirection: 'row',
        justifyContent:'space-between',
        marginHorizontal:20,
    },
    leftAlign: {
        justifyContent:'flex-end',
        alignItems:'flex-end',
    //     marginLeft:5,
     paddingLeft:85,
    //     margin:5,
         textAlign: 'left'
    },
    buttonIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    itemHeader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: screenWidth-40 ,
                height: 80,
                // resizeMode: 'contain',
                
    },
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // borderWidth:1,
        // borderColor:'#000'
    },
    row1: {
        // flex: 1,
        
        flexDirection: 'row',
        justifyContent:'space-between',
        marginHorizontal:20,
        // alignItems: 'center',
    },
    row2: {
        // flex: 1,
        
        flexDirection: 'row',
         justifyContent:'space-between',
        marginHorizontal:20,
        // alignItems: 'center',
    },
    title: {
       
        fontSize: 18,
        fontWeight: 'bold'
    },
   
    text: {
        color: COLORS.BLACK,
        fontSize: 18,
         paddingTop:6,
         paddingRight:25,
        textAlign:'center',
        fontWeight:'bold',
        fontFamily: "Poppins-medium",
      
    }, 
    icon:{
        marginTop:5,
        marginLeft:5,
    },
    signInButton: {

        width: screenWidth/6.9 ,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 5,
        // backgroundColor: COLORS.ERROR,
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    addimage: {
        width: screenWidth/3.5 ,
        height: 30,
        // top:'65%',
        justifyContent: 'center',
        alignItems: 'center',
        // position:'re',
        alignSelf: 'center',
        borderRadius: 10,
        // marginBottom:15,
        marginTop:10,
        marginLeft:10,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    container2: {
          
        justifyContent: 'center',
        alignItems: 'center',
      //   margin: 20
    
      },
      modal: {
          height: screenWidth - 210,
          flexDirection: 'column',
          width: screenWidth - 30,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 20,
          top: "60%",
          marginHorizontal: 15,
          borderRadius: 5,
       backgroundColor: COLORS.DEFAULT,
          shadowOffset: { width: 8, height: 8, },
          shadowColor: '#05294b',
          shadowOpacity: 0.7,
          //   padding : 10,
          //   marginTop:80,
          },
    check:{

        width: screenWidth/2 ,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginLeft:10,
        marginTop: 10
    },
    buttonText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    noDataFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        // width: screenWidt90,
        height: 100,
        // margin: 5,
        //  marginTop:-50,
        marginLeft:20,
        marginRight:20,
        borderRadius: 10, 
        justifyContent: 'center',
        alignItems: 'center',
      },
    noDataFoundText: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",
    }
});