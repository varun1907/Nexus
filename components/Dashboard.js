import React, { Component } from 'react';
import { Container, Header,Body,Content,Icon,Button } from 'native-base';
import {View,Text,Image} from 'react-native';
import {DrawerNavigator,DrawerItems} from 'react-navigation';


import MyHomeScreen from './MyHomeScreen.js';
import All from './All.js';
import Workshop from './Workshop.js';
import Placement from './Placement.js';
import Exam from './Exam.js';
import GuestLecture from './GuestLecture.js';
import Competition from './Competition.js';
import Other from './Other.js'
import Detail from './Detail.js'

const CustomDrawerContentComponent = (props) =>(

<Container>
<Header style={{height:200,backgroundColor:'rgb(32,53,70)'}}>
<Body style={{alignItems:'center'}}>
<Image source={require('../img/logo.png')}/>
</Body>
</Header>
<Content>
<DrawerItems {...props}/>
</Content>
</Container>

)

const Dashboard = DrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  All: {
    screen: All,
  },
  Other:{
    screen:Other,
  },
  Workshop: {
    screen: Workshop,
  },
  Placement: {
    screen: Placement,
  },
  Exam: {
    screen: Exam,
  },
  GuestLecture: {
    screen: GuestLecture,
  },
  Competition: {
    screen: Competition,
  },

},{
  initialRouteName:'Home',
  contentComponent:CustomDrawerContentComponent,
  drawerOpenRoute:'DrawerOpen',
  drawerCloseRoute:'DrawerClose',
  drawerToggleRoute:'DrawerToggle',
});



export default Dashboard
