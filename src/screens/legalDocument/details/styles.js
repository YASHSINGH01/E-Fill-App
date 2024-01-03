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
        margin: '2%'
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.PRIMARY,
    },
    loaderContainer:{
        flex:1,
        zIndex:9999,
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute'
    },
    paragraph: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-regular",
        margin: 5,
        textAlign: 'justify'
    },
    subParagraph: {
        marginLeft: 10
    },
    orderedList: {
        fontWeight: '800',
    },
    title: {
        color: COLORS.DEFAULT,
        fontSize: 16,
        fontFamily: "Poppins-medium",
        fontWeight: '800',
        margin: 5
    }
});