import { StyleSheet, Dimensions } from "react-native";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../constants/colors";
import { Dimension } from '../../constants';
import { StatusBarHeight } from '../../utils/functions-file';

export default styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: COLORS.PRIMARY
    // },
    UserContainer: {
        position: 'absolute',
        top: '72%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '1%',
    },
    footer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '10%',
        position: 'absolute',
        top: '77%',
        alignItems: 'center',
        marginHorizontal: '1%',
    },
   
    items: {
        flex: 1,
        width:320,
        flexDirection: 'row',
        backgroundColor: COLORS.DEFAULT,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 10,
    },
    rows: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    images: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        borderRadius: 30
    },
    contents: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        // paddingLeft: 10
    },
    texts: {
        color: COLORS.BLACK,
        fontSize: 10,
        fontFamily: "Poppins-medium",
      
    },
    titles: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    text1s: {
        color: COLORS.ERROR,
        fontSize: 10, 
        margin:5,
        fontWeight:'700',
        fontFamily: "Poppins-medium",
      
    },
    text2s: {
        color: COLORS.SUCCESS,
        fontSize: 10, 
        margin:5,
        fontWeight:'700',
        fontFamily: "Poppins-medium",
      
    },
    descriptions: {
        fontSize: 10,
        color: COLORS.INPUT_LABEL,
        fontWeight: '500',
        paddingVertical: 5,
    },
    signInButtons: {
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
    buttonTexts: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    itemHeader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
    
    container: {
        flex: 1,
        marginTop: 0,
    },
    droidSafeArea: {
        flex: 1,
         backgroundColor: '#000000',
        paddingTop: Platform.OS === 'android' ? StatusBarHeight : StatusBarHeight
    },
    icon: {
        marginLeft: 20,
        resizeMode: 'contain',
    },
    button: {
        width: '100%',
        flexDirection: 'row',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        margin: 10,

        backgroundColor: 'rgba(97,67,155,0.8)'
    },
    goku: {
        position: 'absolute',
        top: '72%',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '1%',
    },
    navi: {
        position: 'absolute',
        height: 55,
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 30 : 50,
        flexDirection: "column",
        marginLeft: 5,
        marginHorizontal: 0,
        alignSelf: 'flex-start',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 2 },
        elevation: 8,
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 20 : 10,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '85%',
        flex: 2,
        // margin:10,
        marginLeft: 20,

        // paddingLeft:10,
        marginHorizontal: 0,
        alignSelf: 'center',
        borderRadius: 10,
        padding: 5,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 8,
    },
    header: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: StatusBarHeight,
    },
    searchBar: {
        marginTop: 20,

        width: '100%',
        backgroundColor: COLORS.PRIMARY
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    roww: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: -20,
    },
    left: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    iconImage: {
        resizeMode: 'contain',
        marginTop: 10,
        height:25,
        width:40,
    },
    notificationIconImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    notiIconContainer: {
        position: 'absolute',
        top: '34%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '1%',
    },
    badge: {
        position: 'absolute',
        top: -2,
        right: 1,
        color: '#fff',
        fontWeight: '800',
        zIndex: 1
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: COLORS.DEFAULT,
    },
    mapContainer: {
        flex: 0,
        height: '100%',
        width: '100%',
        borderColor: '#fff',
        borderWidth: 1,
        overflow: 'hidden'
    },
    mapView: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    locations: {
        marginTop: 40,
    },
    searchSection: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 20,
        width: screenWidth / 2,
        borderRadius: 10,
        marginRight: 15,
        marginHorizontal: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
    },
    drawer: {
        borderRadius: 10,
        marginHorizontal: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    searchIcon: {
        marginTop: 2,
        paddingTop: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    input: {
        flex: 1,
        borderRadius: 10,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
    availabilityIconContainer: {
        position: 'absolute',
        top: '42%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '1%',
    },
   
    filterIconContainer: {
        position: 'absolute',
        top: '50%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '1%',
    },
    shareIconContainer: {
        position: 'absolute',
        top: '58%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '1%',
    },
    IconButton: {
        position: 'relative',
        width: 45,
        height: 45,
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
    imageIconn: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    item: {
        padding: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: 5,
        marginHorizontal: 16,

    },
    title: {
        paddingLeft: 5,
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: COLORS.DEFAULT,
    },
    statusContainer: {
        width: '50%',
        justifyContent: 'center',
        alignSelf: 'center',
        top: '40%',
        borderRadius: 5,
        padding:5,
        backgroundColor: COLORS.HEADER_BACKGROUND,
        position: 'absolute'
    },
    close: {
        margin: 2,
        alignSelf: 'flex-end'
    },
    scrollView: {
        flexGrow: 1,
        width: '100%',
        position: 'absolute'
    },
    resultItem: {
        flexDirection: 'row',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        padding: 15,
        marginVertical: 2,
        marginHorizontal: 8,
        borderRadius: 40,
    },
    column: {
        width: '10%',
        flexDirection: 'column',
        borderTopWidth: 1,
        borderColor: '#ffff',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    resultContent: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginLeft: 5
    },
    resultName: {
        fontSize: 16,
        fontFamily: "Poppins-medium",
        fontWeight: '600'
    },
    resultAddress: {
        fontSize: 12,
        fontFamily: "Poppins-medium",
        fontWeight: '500'
    },
    resultText: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        margin: 5
    },
    order: {
        paddingLeft: 9,
        fontSize: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 52,
        height: 30,
        width: 30,
        borderRadius: 100 / 2,
        borderWidth: 2,
        borderColor: 'white',
        color: 'white'
    },
    text: {
        padding: 10,
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    resultContainer: {
        flex: 1,
        marginHorizontal: 10,
        width: '100%',
        position: 'absolute',
        height: '40%'
    },

    markerIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },

});