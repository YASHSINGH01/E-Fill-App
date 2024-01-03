import { StyleSheet, Dimensions } from "react-native";
// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;

export default styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    splashImage: {
      width: '100%',
      height: '100%',
      resizeMode:'cover',
    },
    loader: {
      height: '100%',
      position: 'absolute', 
      alignSelf: 'center'
    }
});