import React from "react";

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';



import _ from "lodash";
//Api
import HttpRequest from "../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { Text,Alert,  View } from 'react-native'
//Library
import * as Animatable from 'react-native-animatable';


//Constants
import { Images } from "../../constants/";




import { strings } from '../../utils/translations';

//Styles
import styles from './styles';


const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

class rfidCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  isPlaying : true,
  alerts : false,
  interval:'',
    }
  }

  componentDidMount = () => {
    var i=0;

    const interval = setInterval(() => {
      i++;
      console.log('This will be called every 2 seconds',i);
      if(this.state.alerts == true){
        clearInterval(interval);

      }
      else{
        this.checkeRfid(i);
        if(i==10 )
      {

        clearInterval(interval);
      }
      }



    }, 5000);
}

// componentWillUnmount = () => {
//   clearInterval(interval)
// }



checkeRfid = (i) => {
  let { data } = this.props.route.params;
  let { navigation} =  this.props;
  HttpRequest.checkeRfid({formData:data},this.props.token)
  .then(res => {
      this.setState({ isLoading: false });
      const result = res.data;
      if(i<=9)
      {

        if (res.status == 200 && !result.error) {
        this.props.navigation.navigate("success");

         this.setState({alerts : true});

        } else{}
      }
      else
      {

        if (res.status == 200 && !result.error) {
          // this.setState({alerts: result})
          //  console.log("Get RFID DETAILS ---------- ", result);
           this.props.navigation.navigate("success");



        } else {
          // this.setState({alerts: result})
          // console.log("Get RFID DETAILS ---------- ", result);
          Alert.alert(
            "",
            result.messsage,
            [
                {
                    text: "OK",
                    onPress: () =>    this.props.navigation.goBack()
                }
             ],
         )

        }
      }

  })
  .catch(err => {

      // console.log("Get RFID DETAILS API Catch Exception: ",err);
  });
}


render() {
  let { navigation} =  this.props;
  let { isPlaying} = this.state;
  return (
      <View style={styles.container}>
          <View  style={styles.header}>
           <View style={styles.center}>
                                     <Text style={styles.title}>{strings.rfidView.title}</Text>
                                   </View>
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>

              <View style={styles.headerContainer}>
             <CountdownCircleTimer
              isPlaying={isPlaying}
              duration={59}
              colors={["#008000", "#FFCE30", "#A30000", "#FF0000"]}
              colorsTime={[59, 30, 10, 0]}
              onComplete={() => ({ shouldRepeat: false, delay: 0 } )
             } >

             {({ remainingTime, color }) => (
              <Text style={{ color, fontSize: 40 }}>
                 {remainingTime} </Text>
                  )}

           </CountdownCircleTimer>
              <Text style={styles.text} numberline={2}> Please swipe your Card on the charger and wait till time out.</Text>
                    </View>
                </Animatable.View>
            </View>

    );
  }
}

const mapStateToProps = state => {

  return {
    device_token: state.device_token,
    token: state.token,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(rfidCard);