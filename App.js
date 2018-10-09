
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation'

import EmailAndPhone from './components/EmailAndPhone.js';
import Login from './components/Login.js';
import Splash from './components/Splash.js';
import Dashboard from './components/Dashboard.js';
import EmailConfirmation from './components/EmailConfirmation.js';
import Detail from './components/Detail.js'
import CreateNotice from './components/CreateNotice.js'
import EditNotice from './components/EditNotice.js'
import StudentInfo from './components/StudentInfo.js'
import TeacherInfo from './components/TeacherInfo.js'
import OtherInfo from './components/OtherInfo.js'

const App = StackNavigator({
  Splash:{screen:Splash},
  EmailAndPhone: {screen: EmailAndPhone},
  EmailConfirmation:{screen:EmailConfirmation},
  Detail:{screen:Detail},
  CreateNotice:{screen:CreateNotice},
  EditNotice:{screen:EditNotice},
  Login:{screen:Login},
  Dashboard:{screen:Dashboard},
  StudentInfo:{screen:StudentInfo},
  TeacherInfo:{screen:TeacherInfo},
  OtherInfo:{screen:OtherInfo}
},
{
  headerMode : 'none'
},
 {initialRouteName:'Splash'}
);

export default App
