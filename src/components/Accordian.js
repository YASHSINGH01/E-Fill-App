import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
//Library
import Icon from "react-native-vector-icons/MaterialIcons";
// Theme Colors
import COLORS from "../constants/colors";


export default class Accordian extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
  
  render() {

    return (
       <View style={styles.item}>
            <TouchableOpacity ref={this.accordian} style={styles.row} onPress={()=>this.toggleExpand()}>
                <Text style={[styles.title, styles.font]} numberOfLines={ this.state.expanded ? 0 : 2}>{this.props.title}</Text>
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color={COLORS.ICON} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={styles.child}>
                    <Text style={styles.contentText}>{this.props.data}</Text>    
                </View>
            }
            
       </View>
    )
  }

  toggleExpand=()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({
    title:{
        fontSize: 14,
        fontFamily: "Poppins-medium",
        fontWeight:'500',
        color: COLORS.INPUT_LABEL,
    },
    row: {
        flex:1,
        flexDirection: 'row',
        width: '100%',
        justifyContent:'space-between',
        
        padding: 16,
        alignItems:'center',
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COLORS.DEFAULT,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 15,
        borderRadius: 16,
    },
    parentHr:{
        height: 1,
        color: COLORS.HEADER_BACKGROUND,
        width:'100%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    child:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    contentText: {
        fontSize: 12,
        fontFamily: "Poppins-medium",
        fontWeight:'400',
        color: COLORS.SUCCESS,
    }
    
});
