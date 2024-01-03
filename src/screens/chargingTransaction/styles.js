import { StyleSheet, Dimensions, Platform } from 'react-native';

// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;

// Theme Colors
import COLORS from "../../constants/colors";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.PRIMARY,
        justifyContent: 'center',
        paddingTop: 15
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '80%',
        justifyContent: 'center',
        marginVertical: 20,
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: COLORS.DEFAULT
    },
    seperator: {
        flex: 0.1,
        width: '100%',
        resizeMode: 'contain',
    },
    header: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    footer:{
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerButtonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        fontWeight: '800',
        color: COLORS.PRIMARY,
        margin: 5,
        marginLeft: 20,
    },
    subTitleText: {
        fontSize: 12,
        fontWeight: '500',
        fontFamily: "Poppins-Regular",
        color: COLORS.INPUT_LABEL,
        textAlign: 'center',
        marginHorizontal: 10
    },
    buttonContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop: -30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.DEFAULT,
        borderWidth: 2,
        backgroundColor: COLORS.SUCCESS
    },
    footerButtonContent: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: -30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.DEFAULT,
        borderWidth: 2,
        backgroundColor: COLORS.WARNING
    },
    buttonIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    column: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    centerLoader: {
        alignSelf: 'center'
    },
    text: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
    },
    label: {
        color: COLORS.INPUT_LABEL
    },
    error: {
        flex: 1,
        marginTop: 15,
        fontSize: 12,
        color: COLORS.ERROR,
        textAlign:'center'
    },
    value: {
        color: COLORS.PRIMARY,
        fontWeight: '700'
    },
    active: {
        fontSize: 20,
    },
    button: {
        alignSelf: 'center',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: COLORS.SUCCESS,
        fontFamily: "Poppins-Regular",
        color: 'black',
        marginTop: 30
    },
    closeContainer: {
        width: '100%',
        marginTop: 20,
        bottom: 2,
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
   
});