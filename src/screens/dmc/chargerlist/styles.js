// import { StyleSheet, Dimensions } from "react-native";
// // Retrieve initial screen's width
// let screenWidth = Dimensions.get('window').width;
// // Retrieve initial screen's height
// let screenHeight = Dimensions.get('window').height;
// // Theme Colors
// import COLORS from "../../../constants/colors";

// export default styles = StyleSheet.create({
//     container: {
//       flex:1,
//       justifyContent: 'center',
//       backgroundColor: COLORS.PRIMARY,
//     //   zIndex: 9999,
//     },
//     header: {
//         flex: 1,
//         justifyContent: 'flex-start',
//         alignItems: 'center'
//     },
//     footer: {
//         flex: 8,
//         flexDirection: 'column',
//         justifyContent: 'flex-start',
//         marginBottom:20,
//         // marginTop: '10%',
//     },
//     text1: {
//         color: COLORS.ERROR,
//         fontSize: 14, 
//         // margin:5,
//         fontWeight:'bold',
//         fontFamily: "Poppins-medium",
      
//     },
//     goku: {
//         position:"relative",
//         top: '1%',
//         alignSelf: 'flex-end',
//         paddingRight:20,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom:7,
//         // marginHorizontal: '1%',
//     },
//     badge: {
//         position: 'absolute',
//         // top: 0,
//         right:12,
//         color: '#fff',
//         fontWeight: '800',
//         zIndex: 1
//     },
//     iconButton: {
//         position: 'relative',
//         width:45,
//         height:45,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: COLORS.DEFAULT,
//         borderRadius: 55 / 2,
//     },
//     imageIcon: {
//         width: 35,
//         height: 35,
//         resizeMode: 'contain',
//     },
//     buttonIcon: {
//         width: 25,
//         height: 25,
//         resizeMode: 'contain',
//     },
//     item: {
//         flex: 1,
//         flexDirection: 'row',
//         backgroundColor: COLORS.DEFAULT,
//         padding: 5,
//         marginVertical: 3,
//         marginHorizontal: 15,
//         borderRadius: 10,
//     },
//     itemHeader: {
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     image: {
//         width: 140,
//         height: 80,
//         resizeMode: 'contain',
//         borderRadius: 30
//     },
//     leftAlign: {
//         alignSelf:'flex-end',
//         // alignItems:'flex-end',
//         marginLeft:5,
//      padding:5,
//         margin:5,
//         // textAlign: 'left'
//     },
//     row: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderWidth:1,
//         borderColor:"#000"
       
//     },
//     row1: {
//         flex: 1,
//         flexDirection: 'row',
//          justifyContent: 'flex-end',
//          alignItems:"flex-end",
//          margin:5,
//         borderWidth:1,
//         borderColor:'#000'
//     },
//     title: {

//         fontSize: 14,
//         fontWeight: 'bold'
//     },
   
//     text: {
//         color: COLORS.BLACK,
//         fontSize: 10,
//         fontFamily: "Poppins-medium",
      
//     }, 
//     signInButton: {
//         width: screenWidth/3.5 ,
//         height: 30,
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'flex-end',
//         borderRadius: 5,
//         backgroundColor: COLORS.DEFAULT,
//         fontFamily: "Poppins-Regular",
//         color: 'black',
//     },
//     buttonText: {
//         color: COLORS.BUTTON_TEXT,
//         fontSize: 12,
//         fontWeight: '500',
//         textAlign: 'center',
//         fontFamily: "Poppins-Regular",
//     },
//     noDataFoundContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     noDataFoundText: {
//         color: COLORS.DEFAULT,
//         fontSize: 14,
//         fontFamily: "Poppins-medium",
//     }
// });

import { StyleSheet, Dimensions } from "react-native";
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
            footer: {
                flex: 8,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                marginBottom:20,
                // marginTop: '10%',
            },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 2,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
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
                 top: 0,
                right:12,
                color: '#fff',
                fontWeight: '800',
                zIndex: 1
            },
            icon:{
                marginTop:5,
                marginLeft:5,
            },
            iconButton: {
                position: 'relative',
                width:45,
                height:45,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.DEFAULT,
                borderRadius: 55 / 2,
            },
            imageIcon: {
                width: 35,
                height: 35,
                resizeMode: 'contain',
            },
    //List view
    item: {
        backgroundColor:COLORS.DEFAULT,
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    signInButton: {
        width: screenWidth/3.5 ,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 5,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    linearGradient: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
        shadowColor:COLORS.DISABLED,
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    text: {
                color: COLORS.BLACK,
                fontSize: 10,
                fontFamily: "Poppins-medium",
              
            }, 
    text1: {
                color: COLORS.BLACK,
                fontSize: 16, 
                margin:5,
                fontWeight:'bold',
                fontFamily: "Poppins-medium",
              
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
    itemContent: {
        flex: 1,
        flexDirection: 'row',
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
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 5,
        borderRadius: 10,
    },
    success: {
        backgroundColor: COLORS.SUCCESS
    },
    danger: {
        backgroundColor: COLORS.ERROR
    },
    leftAlign: {
        textAlign: 'left'
    },
    customImage: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 40
    },
    image: {
        width: 140,
                height: 80,
                resizeMode: 'contain',
                borderRadius: 30
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
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // borderWidth:1,
        // borderColor:'#000'
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
        color: COLORS.BLACK
    },
    cancelText: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: "Poppins-Regular",
        color: COLORS.PRIMARY
    },
    label: {
        // fontWeight: '700',
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
        color: COLORS.PRIMARY,
        fontFamily: "Poppins-Regular",
        fontWeight: '400',
    },
    noDataFoundContainer: {
        flex: 1,
        height: screenHeight / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linearGradient: {
        width: '90%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5, 
        fontSize:10,
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    noDataFoundText: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",
    }
});