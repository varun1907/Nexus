import React, { Component } from 'react';
import {StyleSheet,Text,View,ScrollView,TextInput,Dimensions,Picker,Image,ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button,Form, Item, Input, Label } from 'native-base';
import {StackNavigator} from 'react-navigation';
import Login from './Login.js';
import EmailConfirmation from './EmailConfirmation.js';

export default class EmailAndPhone extends Component<Props> {

  constructor(props){
    super(props);
    this.state={
      email:'',
      name:'',
      password:'',
      confirmPassword:'',
      role:'student',
      gender:'male',
      aState:false
    }
  }

  validate=()=>
  {
    let mail=this.state.email
    let pass=this.state.password
    let nm=this.state.name
    let cp=this.state.confirmPassword
    let rl=this.state.role
    let gr=this.state.gender
    let flag=3;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mail=='')
    {
        alert("Email field can't be empty");
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

    if(nm=='')
    {
      alert("Name field can't be empty");
    }
    else
    {
      flag-=1
    }



    if((pass=='') || (cp==''))
    {
      alert("Password field can't be empty");
    }
    else
    {
      if(pass!=cp)
      {
        alert("Password not match")
      }
      else if(pass.length<6)
      {
        alert("Minimum six characters long")
      }
      else
      {
        flag-=1
      }
    }


    if(flag<=0)
    {
this.setState={
  aState:true
};
return fetch('https://nexus.scriptguru.org/api/register',{
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: nm,
    email: mail,
    password:pass,
    password_confirmation:cp,
    role:rl,
    gender:gr
  })
}).then((response) =>
{
  const scode=response.status;
  const dat=response.json();
  return dat;
}).then((res) => {
    //  alert(JSON.stringify(res));

      this.props.navigation.navigate('EmailConfirmation');
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

              <Animatable.Image source={require('../img/logo.png')}
              animation="pulse"
              easing="ease-in"
              iterationCount="infinite"/>

              <Animatable.Text style={styles.headerText}
              animation="fadeIn"
              easing="ease-in"
              delay={500}
              iterationCount={1}>NEXUS</Animatable.Text>
          </View>

<View>

<ActivityIndicator
size="large"
color="#ffb03e"
animating={this.state.aState}/>

</View>



          <View style={styles.x}>
              <Form style={{marginTop:20,marginLeft:20,marginRight:20,width:300}}>

                <Animatable.View
                animation="bounceIn"
                easing="ease-in"
                delay={1500}
                iterationCount={1}>
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
                </Animatable.View>

                <Animatable.View
                animation="bounceIn"
                easing="ease-in"
                delay={2000}
                iterationCount={1}>
                   <Item style={styles.xx}>
                         <Icon active name='contact-mail' style={{color:'#9e9e9e',fontSize:25,marginRight:15}} />
                         <Input style={{color:'white'}}
                         placeholder="Name"
                         placeholderTextColor='#9e9e9e'
                         maxLength={255}
                         onChangeText={(name) => this.setState({name})}
                         />
                   </Item>
                   </Animatable.View>

                 <Animatable.View
                 animation="bounceIn"
                 easing="ease-in"
                 delay={2500}
                 iterationCount={1}>
                     <Item style={styles.xx}>
                         <Icon active name='lock' style={{color:'#9e9e9e',fontSize:25,marginRight:15}} />
                         <Input style={{color:'white'}}
                         secureTextEntry={true}
                         placeholder="Password"
                         placeholderTextColor='#9e9e9e'
                         onChangeText={(password) => this.setState({password})}/>
                       </Item>
                </Animatable.View>

                 <Animatable.View
                 animation="bounceIn"
                 easing="ease-in"
                 delay={3000}
                 iterationCount={1}>
                     <Item last style={styles.xx}>
                         <Icon active name='lock' style={{color:'#9e9e9e',fontSize:25,marginRight:15}} />
                         <Input style={{color:'white'}}
                         secureTextEntry={true}
                         placeholder="Confirm Password"
                         placeholderTextColor='#9e9e9e'
                         onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>
                       </Item>
                </Animatable.View>

                 <View style={{flexDirection:'row'}}>
                   <Animatable.View
                   animation="bounceIn"
                   easing="ease-in"
                   delay={3500}
                   iterationCount={1}>
                      <Picker style={{color:'#9e9e9e',width:100,marginLeft:20}}
                       selectedValue={this.state.role}
                       onValueChange={(itemValue, itemIndex) => this.setState({role: itemValue})}>
                       <Picker.Item itemStyle={{backgroundColor:'#ffb03e' }} label="Student" value="student" />
                       <Picker.Item label="Teacher" value="teacher" />
                       </Picker>
                  </Animatable.View>

                 <Animatable.View
                 animation="bounceIn"
                 easing="ease-in"
                 delay={4000}
                 iterationCount={1}>
                      <Picker style={{color:'#9e9e9e',width:100,marginLeft:30}}
                      selectedValue={this.state.gender}
                      onValueChange={(itemValue, itemIndex) => this.setState({role: itemValue})}>
                      <Picker.Item itemStyle={{backgroundColor:'#ffb03e' }} label="Male" value="male" />
                      <Picker.Item label="Female" value="female" />
                      </Picker>
                  </Animatable.View>
            </View>
      </Form>


             <Button block rounded style={{alignItems:'center',marginTop:30,marginLeft:10,marginRight:10,marginBottom:10,backgroundColor:'#e91e63'}} onPress={this.validate} >
               <Text style={{color:'white',fontSize:20}}>Signup</Text>
             </Button>
             <Text style={{fontSize:30,color:'white'}}>OR</Text>
             <Button block rounded style={{marginTop:30,marginLeft:10,marginRight:10,marginBottom:10,backgroundColor:'#e91e63'}} onPress={()=>this.props.navigation.navigate('Login')}>
               <Text style={{color:'white',fontSize:20}}>Already registered? Login..!!</Text>
             </Button>

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
