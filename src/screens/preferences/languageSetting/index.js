import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import { CommonActions } from '@react-navigation/native';
//Components
import Header from '../../../components/Header';
//Constants
import { Images } from '../../../constants';
//Styles
import styles from './styles';
import { strings } from '../../../utils/translations';

export default class LanguageSetting extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            selectedLanguage: '',
            DATA: [
                { 
                    id: '1',
                    title: strings.language.hindi, 
                    value: 'en-IN',
                    icon: Images.Hindi,
                },
                { 
                    id: '2',
                    title: strings.language.english, 
                    value: 'en-US',
                    icon: Images.English
                },
            ]
        };
    }

    componentDidMount = () => {
        if(strings.getLanguage() != ''){
            this.setState({ selectedLanguage: strings.getLanguage() == 'en-IN' ? strings.language.hindi : strings.language.english });
        }
    }

    handleSetLanguage = (item) => {
        this.setState({ selectedLanguage: item.title });
        if(strings.getLanguage() != item.value){
            strings.setLanguage(item.value);
            this.navigate();
        }
    }

    navigate = () => {
        this.props.navigation.dispatch(
            CommonActions.reset({
            index: 1,
            routes: [
                { name: 'Home' }
            ],
            })
        );
    }

    renderItem = ({ item, index }) => (
        <View style={[styles.item, index == 0 ? styles.topRadius : styles.bottomRadius, this.state.selectedLanguage == item.title ? styles.active : this.state.selectedLanguage !== '' ? styles.inactive : null]} key={index}>
            <TouchableOpacity style={styles.row} onPress={()=> this.handleSetLanguage(item)}>
                <Text style={[styles.title, styles.font, this.state.selectedLanguage == item.title ? styles.activeText : null]} numberOfLines={2}>{item.title}</Text>                
               {/* <Image source={item.icon} style={styles.icon} /> */}
            </TouchableOpacity>
       </View>
    );
    render() {
            let { navigation } =  this.props;
            let { isLoading, DATA } = this.state;
    
            return (
                <View style={styles.container}>
                    <View  style={styles.header}>
                      <Header navigation={navigation} type={strings.preferences.languageSetting}/>
                    </View>
                    <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                        <FlatList
                            data={DATA}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id+''}
                            ListHeaderComponent={ 
                                <View style={styles.Intro}>
                                    <Text style={[styles.introTitle]}>{strings.preferences.selectLanguage}</Text>
                                </View>
                            }
                        />
                    </Animatable.View>
                </View>
            )
    }
}
