import React, {Component} from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
//Constants
import COLORS from '../constants/colors';


export default class Checkbox extends Component {
    constructor(props){
        super(props)
        this.state = {
            isChecked : false,
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.status !== state.isChecked) {
            return {
                isChecked: props.status
            }
        } 
        return null;
    }

    toggleCheckBox = () => {
        let isSelected = !this.state.isChecked
        this.setState({
            isChecked : isSelected
        })
        this.props.onCheckBoxToggle(isSelected);           
    }

    render() {
        let { isChecked } = this.state;
        return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.checkbox} onPress={this.toggleCheckBox}>
                {isChecked ? 
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
    },
    checkbox: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        color: COLORS.DEFAULT,
        borderColor: COLORS.GRADIENT_START,
        borderWidth: 1,
        borderRadius: 5
    },
    checkmarkIcon: {
        alignSelf: 'center'
    }
  });