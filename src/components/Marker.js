import React, {Component} from 'react'
import { Image, StyleSheet, View, Platform } from 'react-native'
//Library
import Icon from 'react-native-vector-icons/FontAwesome5';
//Constants
import { Images } from '../constants';

export default class MarkerIcon extends Component {
    constructor(props){
        super(props)
    }

    render() {
        let { status } = this.props;
        return(
            <View style={styles.markerContainer}>
                <Image source={ status == 0 ? Images.deactiveMarker : status == 1 ? Images.activeMarker : status == 2 ? Images.busyMarker : Images.unavailableMarker} resizeMode="contain" style={styles.markerIcon} /> 
            </View>
        )
    } 
}



 // <View style={styles.markerContainer}>
 //<Icon name="charging-station" color={ status == 0 ? '#ecd52c' : status == 1 ? '#4CAF50' : status == 2 ? '#FF9800' : '#979797'} size={24} />
 // </View>

const styles = StyleSheet.create({
    markerIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    active: {
        color: '#4CAF50'
    },
    deactivated: {
        color: '#ecd52c'
    },
    currentlyBusy: {
        color: '#FF9800'
    },
    unavailable: {
        color: '#979797'
    },
    markerContainer: {
        // width: 70,
        // height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    }
    
  });