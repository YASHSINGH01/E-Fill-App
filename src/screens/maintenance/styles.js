import { StyleSheet, Dimensions } from "react-native";

export default (styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        flexDirection:'column'
    },
    headerImage: {
      width:'80%',
      height: '50%',
      resizeMode: 'contain'
    },
    text: {
      fontSize: 22, 
      fontWeight:'600', 
      color: '#05294b', 
      fontFamily: "Poppins-Regular",
      textAlign:'center'
    },
   
}));