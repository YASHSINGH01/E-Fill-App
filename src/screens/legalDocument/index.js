TouchableOpacity//User selection between SignIn & Create Account Screen
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from "react-native-flash-message";
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Api
import HttpRequest from "../../utils/HTTPRequest";
//Components
import Header from '../../components/Header';
//Constants
import { Images } from "../../constants";
//Styles
import styles from './styles';
import { strings } from "../../utils/translations";


class LegalDocument extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            list: [{ 
              id: '1',
              title: strings.legalDocuments.privacy, 
            },
            { 
              id: '2',
              title: strings.legalDocuments.refund, 
            },
            { 
              id: '3',
              title: strings.legalDocuments.product, 
            },
            { 
              id: '4',
              title: strings.legalDocuments.terms, 
            },
            { 
              id: '5',
              title: strings.legalDocuments.about, 
            }]
        };
    }

    componentDidMount = () => {
      this.getLegalDocuments();
    }

    // Get Legal Documents Through Api
    getLegalDocuments = () => {
      this.setState({ isLoading: true });
      HttpRequest.getLegalDocuments({},this.props.token)
      .then(res => {
          const result = res.data;
          if (res.status == 200 && !result.error) {
              console.log("Get Legal Documents API Response ---------- ", result);
              this.setState({ list:  result.data, isLoading: false })
          } else {
              console.log("Get Legal Documents API Error : ",result);
              this.setState({ list:  [], isLoading: false })
          }
      })
      .catch(err => {
          this.setState({ isLoading: false });
          console.log("Get Legal Documents API Catch Exception: ",err);
          showMessage({
             message: strings.error.title,
              description: strings.error.message,
              type: "danger",
          });
      });
    };

    renderItem = ({ item, index }) => (

        <View style={[styles.item,index != this.state.list.length - 1 ? styles.border : null]} key={""+item.id}>
            <TouchableOpacity style={styles.row} onPress={()=>this.props.navigation.push('LegalDocumentDetails', {item})}>
                <Text style={[styles.title, styles.font]} numberOfLines={2}>{item.title}</Text>
                <Icon name={'ios-arrow-forward'} size={24} color={'#fff'} />
            </TouchableOpacity>
       </View>
    );

    render() {
        let { navigation } =  this.props;
        let { isLoading, list} = this.state;

        return (
            <View style={styles.container}>
                <View  style={styles.header}>
                  <Header navigation={navigation} type={strings.legalDocuments.title}/>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <FlatList
                        data={list}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id+''}
                    />
                </Animatable.View>
            </View>
        )
    }
}

const mapStateToProps = state => {
  
  return {
    token: state.token,
  };
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(LegalDocument);

