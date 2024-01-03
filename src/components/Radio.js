import React, {Component} from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
//Constants
import COLORS from '../constants/colors';


export default class Radio extends Component {
    constructor(props){
        super(props)
        this.state = {
            isChecked : false,
            value: ''
        }
    }

    toggleCheckBox = () => {
        let { rating } = this.props;

        this.setState({
            isChecked :  !this.state.isChecked,
            value: rating
        })
        this.props.onCheckBoxToggle(!this.state.isChecked, rating);           
    }

    render() {
        let { isChecked } = this.state;
        return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.checkbox} onPress={this.toggleCheckBox}>
                {isChecked || this.props.status == 'checked' ?
                 <Icon
                    size={18}
                    name={'checkmark-outline'}
                    color={COLORS.GRADIENT_START}
                    suppressHighlighting={true}
                    style={styles.checkmarkIcon}
                /> : null
                }
            </TouchableOpacity>
        </View>
        )
    } 
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    checkbox: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        color: COLORS.DEFAULT,
        borderColor: COLORS.GRADIENT_START,
        borderWidth: 1,
        borderRadius: 15
    },
    checkmarkIcon: {
        alignSelf: 'center'
    }
  });