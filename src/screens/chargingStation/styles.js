import { StyleSheet, Dimensions } from "react-native";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// Theme Colors
import COLORS from "../../constants/colors";
// import { Dimension } from '../../constants';

export default styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.PRIMARY
    },   
    header: {
        height: '12%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 1,
    },
    footer: {
        flex: 8,   
        height: '80%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'absolute',
        marginVertical: 20,      
    },
    footerr: {         
        height: screenHeight,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'absolute',
             
    },
    scrollView: {
        flexGrow: 4,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    headerImage: {
        width: screenWidth,
        height: screenHeight/3.5,
        resizeMode: 'contain',
        backgroundColor:COLORS.DEFAULT
    },
    wishlist: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAULT,
        position: 'absolute',
        right: 30,
        top: screenHeight/3.5
    },
    titleContainer: {    
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    
        marginTop:-240
    },
    colLeft: {
        flex:2, 
        margin:2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    colRight: {
        marginTop:20,
        margin:10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    col: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    margin: {
        marginTop: 5,
        marginLeft:15,
    },
    title: {
        fontSize: 16, 
        fontFamily: 'Poppins-Regular', 
        color: COLORS.DEFAULT
    },
    text: {
        fontSize: 14,
        fontFamily: "Poppins-medium",
        color: COLORS.DEFAULT,
    }, 
    bold: {
        fontWeight: '700'
    },
    small: {
        fontSize: 12,
        fontWeight: '500'
    },
    // tabBar: {
    //     flexDirection: 'row',
    //     backgroundColor:'pink',
    //     borderRadius: 30,
    //     borderWidth: 1,
    //     borderColor: COLORS.GRADIENT_START,
    //     overflow: 'hidden',
        
    // },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        color: COLORS.BUTTON_TEXT,
        padding: 12,
        backgroundColor: COLORS.DEFAULT
    },
    tabViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        color: COLORS.BUTTON_TEXT
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop:-260
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
    }
});