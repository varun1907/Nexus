import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  Image,
  AsyncStorage,
  BackHandler
} from 'react-native';

import { Button,Form, Item, Input, Label } from 'native-base';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {StackNavigator} from 'react-navigation';
import Dashboard from './Dashboard.js';
import EmailAndPhone from './EmailAndPhone.js';

export default class Login extends Component<Props> {

  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      isLoading:true
    }
  }



async storeData(access_token,id)
{
  try {
 await AsyncStorage.multiSet([['ACCESS_TOKEN', access_token] , ['ID',id.toString()]]);
} catch (error) {
alert(error);
}
}



  validate=()=>
  {
    let mail=this.state.email
    let pass=this.state.password
    let flag=2;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mail=='')
    {
        alert("Field can't be empty");
   }
   else
   {
      if(!reg.test(mail))
      {

        alert("Email format not correct")
      }
      else
      {
        flag-=1;
      }
   }

    if(pass=='')
    {
      alert("Fields can't be empty");
    }
    else
    {
        flag-=1
    }

     if(flag<=0)
     {


       return fetch('https://nexus.scriptguru.org/api/login',{
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           email: mail,
           password:pass,
         })
       }).then((response) =>
       {
         const scode=response.status;
         const dat=response.json();
    //     return dat
    //     alert(dat)
    //     d=JSON.stringify(dat);
         return Promise.all([scode,dat]);
       }).then((res) => {


             if(res[0]>=200 && res[0]<300)
             {


               let dat=JSON.stringify(res[1])
               let d=JSON.parse(dat)

               this.setState({
                 isLoading:false,
              })
              this.storeData(d.data.api_token,d.data.id)

            //  alert(d.data.api_token);
             this.props.navigation.navigate('Dashboard');

        //     alert(d.data.api_token)

           }
           else {
             {
               alert("Check your credentials")
        //       alert(res[1]);
             }
           }
           })
           .catch((error) => {
             console.error(error);
           });

}

}

  render() {
    return (
      <View style={styles.container}>

<ScrollView>

          <View style={styles.header}>
          <Image source={require('../img/logo.png')} />
          <Text style={styles.headerText}>NEXUS</Text>
          </View>

          <View style={styles.x}>
              <Form style={{marginTop:20,marginLeft:20,marginRight:20,width:300}}>
                   <Item style={styles.xx}>
                      <Icon active name='email' style={{color:'#9e9e9e',fontSize:25,marginRight:15}} />
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
                   </Item>

                 <Item last style={styles.xx}>
                   <Icon active name='textbox-password' style={{color:'#9e9e9e',fontSize:25,marginRight:15}}/>
                   <Input style={{color:'white'}}
                   placeholder="Password"
                   autoCapitalize='none'
                   placeholderTextColor='#9e9e9e'
                   secureTextEntry={true}
                   onChangeText={(password) => this.setState({password})}/>
                 </Item>
          </Form>

             <Button block rounded style={{marginTop:30,marginLeft:10,marginRight:10,marginBottom:10,backgroundColor:'#e91e63'}}
             onPress={this.validate}>
               <Text style={{color:'white',fontSize:20}}>Login</Text>
             </Button>
             <View style={{flexDirection:'row'}}>
             <Text style={{color:'#9e9e9e',fontSize:14,marginTop:15}}>Dont have an account? </Text>
             <Text style={{color:'white',fontSize:14,marginTop:15}} onPress={()=>this.props.navigation.navigate('EmailAndPhone')}>Sign up</Text>
             </View>
      </View>
      </ScrollView>
    </View>
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
  },
  x:{
    elevation:5,
    marginLeft:10,
    marginRight:10,
    marginTop:40,
    flex:2,
    alignItems:'center',
//    borderRadius: 10,
//   borderWidth: 2,
//   borderColor: 'white',
   marginBottom:40,
   shadowColor: 'white',
     shadowOffset: {
       width: 5,
       height: 3
     },
     shadowRadius: 5,
     shadowOpacity: 0.5
  },
  header:{
    marginTop:20,
    alignItems:'center'
  },
  headerText:{
    fontWeight:'bold',
    fontSize:30,
    marginTop:30,
    color:'#ffb03e',
    fontFamily:'serif',

  },
});
