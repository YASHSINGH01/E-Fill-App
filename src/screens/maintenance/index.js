import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

//style
import styles from './styles'
//Constants
import { Images } from "../../constants/";


class Maintenance extends Component {
    constructor(props){
        super(props);
    }
   
    render() {
    return (
       <View style={styles.container}>
            <Image
                style={styles.headerImage}
                source={ Images.maintenance }
                resizeMode={'contain'}
            />
           <Text style={styles.text}>Under Maintenance</Text>
           <Text style={styles.text}>We're doing our best to be back. </Text>
       </View>)
    }
}
  
export default Maintenance
  
