import React, { Component } from 'react';
import {StyleSheet,Text,View,ScrollView,TextInput,Dimensions,Picker,Image,ActivityIndicator,AsyncStorage} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button,Form, Item, Input, Label,Header,Body,CheckBox,ListItem} from 'native-base';
import DatePicker from 'react-native-datepicker'
import Collapsible from 'react-native-collapsible';
import Expand from 'react-native-simple-expand';

export default class EditNotice extends Component {

  constructor(props){
    super(props);
    this.state={
      title:'',
      description:'',
      category:'Other',
      date: '',
      registerStart:'',
      registerEnd:'',
      open:true,
      isRegister:false,
      api_key:''
    }
  }

  componentWillMount(){

      const { params } = this.props.navigation.state;
      const id = params ? params.itemId : null;

    AsyncStorage.getItem('ACCESS_TOKEN').then((value) => {
      if (value == null){
         alert('Login Again');
       }
       else{
         this.setState({
           api_key:value
         })
    return fetch('https://nexus.scriptguru.org/api/notices/' + id,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.state.api_key
      },
    }).then((response) =>response.json())
    .then((res) => {

      let d=JSON.stringify(res);
      let dat=JSON.parse(d);
  //    alert(d);
      this.setState({
        title:dat.title,
        description:dat.description,
        category:dat.category,
        date: dat.event_start_datetime,
        registerStart:dat.register_start_datetime,
        registerEnd:dat.register_end_datetime,
        isRegister:dat.isRegister,

      })
      })
        .catch((error) => {
          console.error(error);
        });

}
})
}



val=()=>{

  const { params } = this.props.navigation.state;
  const id = params ? params.itemId : null;
    alert(id)
    let tl=this.state.title
    let des=this.state.description
    let cat=this.state.category
    let dat=this.state.date
    let isReg=this.state.isRegister
    let regS=this.state.registerStart
    let regE=this.state.registerEnd
    let flag=5

    if(tl=='')
    {
      alert("Title can't be empty");
    }
    else {
      if(tl.length<10)
      {
        alert("Minimum length of title should be 10")
      }
      else{
        flag-=1
      }
    }


    if(des=='')
    {
      alert("Description can't be empty")
    }
    else {
      flag-=1
    }

    if(dat=='')
    {
      alert("Please select date for event")
    }
    else {
      flag-=1
    }

    if(isReg)
    {
      if(regS=='')
      {
        alert("Can't be empty if Registeration selected")
      }
      else {
        flag-=1
      }
      if(regE=='')
      {
        alert("Can't be empty if Registeration selected")
      }
      else {
        flag-=1
      }
    }
    if(flag==2 || flag<=0)
    {

      AsyncStorage.getItem('ACCESS_TOKEN').then((value) => {
        if (value == null){
           alert('Login Again');
         }
         else{
           this.setState({
             api_key:value
           })
      return fetch('https://nexus.scriptguru.org/api/notices/' + id,{
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this.state.api_key
        },
        body: JSON.stringify({
          title: tl,
          description: des,
          category:cat,
          event_start_datetime:dat,
          isRegister:isReg,
          register_start_datetime:regS,
          register_end_datetime:regE
        })
      }).then((response) =>
      {
        const scode=response.status;
        const dat=response.json();
        return dat;
      }).then((res) => {

            alert(JSON.stringify(res));
            this.props.navigation.navigate('Dashboard');
          })
          .catch((error) => {
            console.error(error);
          });

}
})

    }
}


  render() {
    return (
      <View style={{flex:1,backgroundColor:'rgb(32,53,70)'}}>
      <ScrollView>
      <Form style={{marginTop:20,marginLeft:20,marginRight:20,width:300}}>

            <View style={{alignItems:'center'}}>
            <Text style={{color:'white',fontSize:35}}>Edit Notice</Text>
            </View>
           <Item style={[styles.xx,{marginTop:20}]}>
              <Input style={{color:'white'}}
              defaultValue={this.state.title}
              placeholderTextColor='#9e9e9e'
              minLength={10}
              autoComplete="false"
              onChangeText={(title) => this.setState({title})}
              returnKeyType='next'
              underline="false"
              />
           </Item>


           <View style={{marginTop:20}}>
                              <DatePicker
                              style={{width: '100%'}}
                              date={this.state.date}
                              mode="datetime"
                              format="YYYY-MM-DD HH:MM:SS"
                              confirmBtnText="Confirm"
                              cancelBtnText="Cancel"
                              customStyles={{
                                dateIcon: {
                                  position: 'absolute',
                                  left: 0,
                                  top: 4,
                                  marginLeft: 0
                                },
                                dateInput: {
                                  marginLeft: 36,
                                  color:'white'
                                },
                                dateText: {
                                       color: 'white',
                                   }
                              }}
                              minuteInterval={10}
                              onDateChange={(datetime) => {this.setState({date: datetime});}}
                            />
           </View>

         <View style={{marginTop:20}}>
             <Picker style={{color:'#9e9e9e',width:'80%',marginLeft:30}}
              selectedValue={this.state.category}
              onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
              <Picker.Item itemStyle={{backgroundColor:'#ffb03e' }} label="Other" value="other" />
              <Picker.Item label="Workshop" value="workshop" />
              <Picker.Item label="Placement" value="placement" />
              <Picker.Item label="Guest Lecture" value="guest_lecture" />
              <Picker.Item label="Exam" value="exam" />
              <Picker.Item label="Competition" value="competition" />
              </Picker>
          </View>


                 <View style={{marginTop:20,borderWidth:1,borderColor:'#9e9e9e'}}>
                   <Input style={{color:'white'}}
                   defaultValue={this.state.description}
                   textAlignVertical={'top'}
                   autoCapitalize='none'
                   multiline={true}
                   numberOfLines = {4}
                   placeholderTextColor='#9e9e9e'
                   onChangeText={(description) => this.setState({description})}/>
                  </View>

        <ListItem style={{borderBottomWidth:0}}>
                    <CheckBox checked={this.state.isRegister}
                    onPress={()=>{this.setState({isRegister:!this.state.isRegister})}}
                    color='#e91e63'/>

                    <Body style={{marginLeft:10}}>
                  <Text style={{color:'white'}}>Do you want to enter Registeration Details?</Text>
                      </Body>
        </ListItem>
            <View>
              <View style={{marginTop:20}}>
                 <DatePicker
                     style={{width: '100%'}}
                     date={this.state.registerStart}
                     mode="datetime"
                     disabled={!this.state.isRegister}
                     format="YYYY-MM-DD HH:MM:SS"
                     confirmBtnText="Confirm"
                     cancelBtnText="Cancel"
                     customStyles={{
                     dateIcon: {
                           position: 'absolute',
                           left: 0,
                           top: 4,
                           marginLeft: 0
                       },
                   dateInput: {
                         marginLeft: 36,
                         color:'white'
                     },
                   dateText: {
                      color: 'white',
                    }
                   }}
                   minuteInterval={10}
                  onDateChange={(datetime) => {this.setState({registerStart: datetime});}}/>
            </View>


        <View style={{marginTop:20}}>
               <DatePicker
               style={{width: '100%'}}
               date={this.state.registerEnd}
               disabled={!this.state.isRegister}
               mode="datetime"
             format="YYYY-MM-DD HH:MM:SS"
         confirmBtnText="Confirm"
           cancelBtnText="Cancel"
               customStyles={{
                 dateIcon: {
                 position: 'absolute',
                 left: 0,
                top: 4,
                 marginLeft: 0
           },
             dateInput: {
             marginLeft: 36,
               color:'white'
             },
             dateText: {
                color: 'white',
            }
          }}
             minuteInterval={10}
            onDateChange={(datetime) => {this.setState({registerEnd: datetime});}}/>
          </View>
       </View>

      <Button block rounded
      onPress={this.val}
      style={{marginTop:30,marginLeft:10,marginRight:10,marginBottom:10,backgroundColor:'#e91e63'}}>
          <Text style={{color:'white',fontSize:20}}>Edit</Text>
      </Button>
      </Form>
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
