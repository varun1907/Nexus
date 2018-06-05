import React, { Component } from 'react';
import { StyleSheet,Text,View,ActivityIndicator,NetInfo,AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation'
import * as Animatable from 'react-native-animatable';


import EmailAndPhone from './EmailAndPhone.js'
import Login from './Login.js'
import Dashboard from './Dashboard.js'
import EmailConfirmation from './EmailConfirmation.js'


class Splashscreen extends Component{


componentDidMount(){

  AsyncStorage.getItem('ACCESS_TOKEN').then((value) => {
    if (value == null){

       setTimeout(()=>this.props.navigation.navigate('Login'),2000);
     }
     else{
       setTimeout(()=>this.props.navigation.navigate('Dashboard'),2000);
     }
      });
}

  render(){
    return(
      <View style = { styles.container }>
      <Animatable.Image source={require('../img/logo.png')}
      animation="pulse"
      easing="ease-out"
      iterationCount="infinite" />
      <Text style ={ styles.splashText }>
        NEXUS
      </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({

container:{
  flex : 1,
  backgroundColor : 'rgb(32,53,70)',
  justifyContent : 'center',
  alignItems : 'center',
},
splashText:{
  color : '#ffb03e',
  fontSize : 45,
  fontFamily : 'serif',
  fontWeight : 'bold',
}
});

export default Splashscreen
