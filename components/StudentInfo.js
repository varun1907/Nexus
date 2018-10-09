/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

export default class StudentInfo extends Component {

  constructor(props){
    super(props);
    this.state={
      institute:null,
      course:null,
      branch:null,
      year:null,
      section:null
    }
  }
  render() {
    return (
      <Container style={styles.container}>
         <Header />
         <Content>
           <Form>
           <Item style={styles.xx}>
               <Input style={{color:'white'}}
               keyboardType='email-address'
               placeholder="Email"
               placeholderTextColor='#9e9e9e'
               autoCapitalize='none'
               autoComplete="false"
               onChangeText={(text) => this.setState({institute:text})}
               returnKeyType='next'
               underline="false"
               />
           </Item>

           <Item style={styles.xx}>
               <Input style={{color:'white'}}
               keyboardType='email-address'
               placeholder="Email"
               placeholderTextColor='#9e9e9e'
               autoCapitalize='none'
               autoComplete="false"
               onChangeText={(email) => this.setState({email})}
               returnKeyType='next'
               underline="false"
               />
           </Item></Form>
         </Content>
       </Container>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(32,53,70)',
  },
  xx:{
      borderBottomColor:'#9e9e9e',
  }
});
