import React, {Component} from 'react';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator, Text, ScrollView, Linking, NavState } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';
import { showMessage } from "react-native-flash-message";
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Api
import HttpRequest from "../../../utils/HTTPRequest";
//Components
import Header from '../../../components/Header';
//Styles
import styles from './styles';
import { strings } from "../../../utils/translations";

class LegalDocumentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            details: ''
        };
    } 

    componentDidMount = () => {
        this.getDocumentDetails();
    }
  
    // Get Legal Documents Details Through Api
    getDocumentDetails = () => {
        let { item } =  this.props.route.params;
        this.setState({ isLoading: true });
        HttpRequest.getDocumentDetails({ id: item.id},this.props.token)
        .then(res => {
            const result = res.data;
            if (res.status == 200 && !result.error) {
                // console.log("Get Legal Documents Details API Response ---------- ", result);
                this.setState({ details:  result.data.content, isLoading: false })
            } else {
                console.log("Get Legal Documents Details API Error : ",result);
                this.setState({ details:  '', isLoading: false })
            }
        })
        .catch(err => {
            this.setState({ isLoading: false });
            console.log("Get Legal Documents Details API Catch Exception: ",err);
            showMessage({
               message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    };

    handleNavigationStateChange = (NavState) => {
        if (NavState.url) {
            this.webview.stopLoading();
            Linking.openURL(NavState.url);
        }
    };
   
    render() {
    let { navigation } =  this.props;
    let { item } =  this.props.route.params;
    let { isLoading, details } = this.state;
    var css = `<head><link rel="preconnect" href="https://fonts.gstatic.com"><link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"></link></head>`;
    
    return (
        <View style={styles.container}>
            <View  style={styles.header}>
                <Header navigation={navigation} type={item.title}/>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <WebView
                    ref={ref => { this.webview = ref;} }
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    style={{flex:1,backgroundColor:'#05294b'}} 
                    startInLoadingState={true}
                    renderLoading={() => <View style={styles.loaderContainer}><ActivityIndicator size='large' color='#fff' /></View>}
                    source={{ html: `<!DOCTYPE html><html lang="en"><body style="background-color:#05294b;text-align:justify;color: white;font-size: 30px;font-family: 'Poppins', sans-serif;">`+css+details+`</body></html>` }}
                    onNavigationStateChange={event => {
                        if (event.url != 'about:blank') {
                            this.webview.stopLoading();
                            Linking.openURL(event.url);
                        }
                    }}
                />
                
            </Animatable.View>
        </View>
    );
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(LegalDocumentDetails);
  
  