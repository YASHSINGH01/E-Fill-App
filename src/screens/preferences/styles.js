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
    footer: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '10%',
        marginHorizontal: 20,
    },
    text: {
        color: COLORS.BLACK,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        margin: 5
    }, 
    item: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginVertical: 8,
        marginHorizontal: 15,
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent:'space-between',
        alignItems:'center',
        height: 30,
    },
    title:{
        flex: 1,
        fontSize: 14,
        fontFamily: "Poppins-medium",
        fontWeight:'500',
        color: COLORS.DEFAULT,
    },
    icon: {
        width: 30,
        resizeMode: 'contain',
        marginRight: 20
    }
});