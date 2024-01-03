import { StyleSheet, Dimensions } from "react-native";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../constants/colors";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.PRIMARY,
        zIndex: 9999,
    },
    basicButton: {
        flex: 9,
        alignItems: 'center',
        color: COLORS.PRIMARY,
        margin: 4,
        borderRadius: 12,
        padding: 8,
    },
    headerContainer: {
        flexDirection: 'column',
        margin: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: COLORS.HEADER_BACKGROUND
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    scrollView: {
        flexGrow: 1,
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: COLORS.HEADER_BACKGROUND
    },
    onBoardImage: {
        width: screenHeight * 0.5,
        height: screenHeight * 0.2,
        resizeMode: 'contain'
    },
    footer: {
        flex: 8,
        height: screenHeight - 80,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%'
    },
    title: {
        color: COLORS.DEFAULT,
        fontSize: 38,
        alignItems: 'center',
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
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "Poppins-regular",

    },
    button: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 10
    },
    activeText: {
        color: COLORS.PRIMARY,
    },
    buttonText: {
        color: COLORS.DEFAULT,
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    buttonTextt: {
        color: COLORS.DEFAULT,
        fontSize: 15,
        marginLeft: 20,
       
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    signText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    signText1: {
        color: COLORS.SUCCESS,
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'left',
        fontFamily: "Poppins-Regular",
    },
    widthh: {
        width: screenWidth / 2,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    },
    formField: {
        width: screenWidth - 50,
        marginVertical: 5,
        color: '#ffff',
        borderRadius: 10
    },
    formField1: {
        width: screenWidth - 40 ,
        // margin: 5
    },
    inputContainer: {
      
        height: 50, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.BLACK,
        borderRadius: 10,
        borderBottomColor:"#fff",
        borderBottomWidth:2,
    },
    inputText1: {
        flex:1,
        height:'100%',
        fontSize: 14,
        textAlign:'center',
        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK,
        marginLeft: '3%'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.DEFAULT,
        justifyContent: 'center',
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    label: {
        fontSize: 14,

        margin: 2,
        fontFamily: "Poppins-Regular",
        justifyContent: 'center',
        color: '#ffff',
        marginLeft: 15
    },
    listView: {
        margin: 5,
        fontWeight: 'bold',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        marginVertical: 10,
    },
    listContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginVertical: 5,
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
    image: {
        width: 120,
        height:90,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        // marginLeft:20,
       
        resizeMode: 'contain',
        // borderRadius: 30
        // marginLeft: 65,
        // width: 60,
        // height: 60,
        // resizeMode: 'cover',
        // borderRadius: 30,
        // borderColor: 'black'
    },
    imagee: {
        marginLeft: 20,
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 20,
        borderColor: 'black'
    },
    label1: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK,
        marginLeft: 15,
        marginTop: 1
    },
    label2: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        // marginLeft: 1,
        marginTop: 3
    },
    backIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    textSign: {
        fontSize: 15,
        color: '#ffff',
        fontWeight: '600',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    infoText: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        marginTop: 50,
        textAlign: 'center',
    },
    iconContainer: {
        flex : 1,
        width: 70,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 10,
        marginBottom: 0
    },
    imageIcon : {
        resizeMode: 'contain'
    },
    essentialsLabel: {
        marginTop:5,
        fontSize: 15,
        fontFamily: "Poppins-Regular",
        color: COLORS.DEFAULT,
        textAlign: 'center',
    },
    paymentLogo: {
        width: 35,
        height: 35,
        resizeMode: 'cover',
        borderRadius: 55/2,
        overflow: 'hidden',
        marginHorizontal: 2,
        borderColor: '#fff',
        borderWidth: 1,
    },
    iconView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        paddingLeft: 20,
        resizeMode: 'contain'
    },
    icon1: {
        marginLeft: 10,
       
    },
    selectBoxField: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth - 110,
        height: 50,
        marginTop: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAULT,
        color: COLORS.BLACK,
        borderRadius: 10,
    },

    pickerContainer: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth - 40,
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        color: COLORS.BLACK,
        borderRadius: 10,
        
    },
    IOS: {
        width: '100%',
        height: '100%',
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
        height: '100%',
        fontSize: 16,

        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK,
        marginLeft: '2%',
    },
    androidDark: {
        width: screenWidth / 1.5,
        fontSize: 16,
        height: '100%',
        fontWeight: 'bold',
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
        borderRadius: 10,
    },
    itemBoxField: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#ffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemBoxDivider: {
        flex: 1,
        flexDirection: 'row',

        borderColor: COLORS.DEFAULT,
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterBoxField: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth / 2,
        height: 50,
        marginTop: 20,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        alignSelf: 'flex-end',
        color: COLORS.black,
        borderWidth: 1,
        borderColor: COLORS.DEFAULT,
        borderRadius: 30,
    },
    filterPickerContainer: {
        flex: 1,
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
        height: '100%',
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
        marginVertical: 8,
        borderRadius: 15,
        overflow: 'hidden',

        flexDirection: 'column',
        borderColor: '#ffff',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },


    row: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
          // marginVertical: 5,
    },
    signInButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 30,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 20,
        marginBottom: 40,
    },
    signInButton1: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
       
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 20,
        marginBottom: 10,
    },
    inputText: {
        width: '20%',
        fontSize: 18,
        padding: 0,
        color: '#fff',
        fontFamily: "Poppins-Bold",
        borderColor: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth:2,

    },
    formField1: {
        width: screenWidth /2 ,
        margin: 5
    },
    coloumn: {
        flex: 1,
        marginVertical: 5,
        width: '100%',
        flexDirection: 'column',
        marginLeft: 60,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    column: {
        flex: 1,
        padding: 2,

        width: '100%',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#ffff',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
    linearGradient1: {
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
       borderRadius:5,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    roww: {
        flex: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    balanceText: {
        fontSize: 16,
        fontFamily: "Poppins-Light",
        color: COLORS.DEFAULT,
        marginHorizontal: 5
    },

    title: {
        fontSize: 14,
        fontWeight: '800',
        fontFamily: "Poppins-Regular",
        color: COLORS.BLACK,
        overflow: 'hidden'
    },
    row2: {
      
        // borderWidth:1,
        // borderColor:'#fff',
        flexDirection: 'row',
        
         justifyContent:'space-between',
        marginHorizontal:20,
        // alignItems: 'center',
    },
    optionText: {
        flex: 1,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: "Poppins-Light",
        color: COLORS.SUCCESS,
    },
    optionBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.PRIMARY,
        marginHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 8,
    },
    active: {
        backgroundColor: COLORS.DEFAULT,
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
        width: screenWidth / 1.3,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 16,
        color: COLORS.BLACK,
        borderRadius: 30,
        paddingHorizontal: 10,
    },
    pickerText: {
        color: COLORS.BLACK,
        fontSize: 14,
        fontWeight: 'bold',
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
        width: '100%',
        height: '90%',
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
       // padding: 15,
        width: '95%',
        maxHeight:'13%',
        // zIndex: 998,
       // borderRadius: 20,
        shadowOpacity: 0.1,
      // elevation:0.1,
   // shadowRadius: 3,
   // borderRadius:20,
        borderRadius:5,
        marginLeft:10,
        marginTop:5,
        //marginRight:40,
       // borderBottomWidth:1,
       borderWidth:1,
        borderColor:'#000'
        
       
    },

    resultName: {
        paddingTop:20,
        fontSize: 16,
        fontFamily: "Poppins-medium",
        fontWeight: 'bold',
    },
    resultText: {
        color: COLORS.PRIMARY,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        paddingLeft:20,
        margin: 5
    },
    resultPlaceholder: {
        color: COLORS.BLACK,
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

