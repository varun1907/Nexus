import React, { Component } from 'react';
import { StyleSheet,Text,View } from 'react-native';
import { StackNavigator } from 'react-navigation'


export default class EmailConfirmation extends Component<Props>
{

    render(){
    return(
      <View style={styles.container}>
      <Text style={styles.splashText}>A link has been generated and sent to your email.Kindly verify it first and login again to proceed further</Text>
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
  fontSize : 30,
  fontFamily : 'serif',
  fontWeight : 'bold',
  margin:20
}
});
