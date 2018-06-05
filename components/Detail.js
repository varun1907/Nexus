import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,AsyncStorage,ActivityIndicator
} from 'react-native';
import { Container, Header, Title,Left,Button,Body,Card,CardItem,Content,Image,Right,List,ListItem,Thumbnail} from 'native-base';
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/Entypo";

import Login from './Login.js'
import EditNotice from './EditNotice.js'
export default class Detail extends Component {

constructor(props){
  super(props);
  this.state={
    userId:'',
    show:false,
    api_key:'',
    showGoingItem:false,
    showInterestedItem:false,
    showNotInterestedItem:false,
    goingArray:'',
    interestedArray:'',
    notInterestedArray:'',
  }
}

  componentWillMount(){
    const { params } = this.props.navigation.state;
    const user=params ? params.itemUserId : null;

    AsyncStorage.getItem('ID').then((value) => {
      if (value == null){
        alert("Login Again")
         setTimeout(()=>this.props.navigation.navigate('Login'),2000);
       }
       else{
         this.setState({
           userId:value,
        })
       }

        if(this.state.userId==user)
        {
          this.setState({
            show:true
          })
        }
        else {
            this.setState({
              show:false
            })
        }
        })
  }

fetchUsers(id,type){

  if(type=='going')
  {
      this.setState({
        showGoingItem:!this.state.showGoingItem,
        showInterestedItem:false,
        showNotInterestedItem:false
      })
  }
  else if(type=='interested')
  {
      this.setState({
        showInterestedItem:!this.state.showInterestedItem,
        showGoingItem:false,
        showNotInterestedItem:false
      })
  }
  else {
      this.setState({
        showNotInterestedItem:!this.state.showNotInterestedItem,
        showGoingItem:false,
        showInterestedItem:false
      })
  }


    AsyncStorage.getItem('ACCESS_TOKEN').then((value)=>{
      if(value==null)
      {
        alert("Login Again")
        this.props.navigation.navigate('Login')
      }
      else {
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
          }).then((response)=>response.json())
          .then((res)=>{
            let d=JSON.stringify(res);
            let dat=JSON.parse(d)
            this.setState({
              interestedArray:dat.notice_interest.interested,
              goingArray:dat.notice_interest.going,
              notInterestedArray:dat.notice_interest['not-interested']
            })

      }).catch((error)=>{
          console.log(error)
      })
    }
  })
}

  render() {

     const { params } = this.props.navigation.state;
     const id = params ? params.itemId : null;
     const title = params ? params.itemTitle : null;
     const description = params ? params.itemDescription : null;
     const going = params ? params.itemGoing : null;
     const interested = params ? params.itemInterested : null;
     const not_interested=params ? params.itemNotInterested : null;

    return (

      <Container style={{backgroundColor:'rgb(52,48,47)'}}>

         <Content>

         <View style={{backgroundColor:'rgb(72,68,69)',marginTop:20}}>
         <View style={{padding:20}}>
         <Card elevation={10} style={{borderWidth:0,backgroundColor:'rgb(72,68,69)'}}>
           <CardItem style={{margin:15,backgroundColor:'rgb(72,68,69)'}}>

           <Body>
           <Text style={{fontWeight:'bold',color:'white'}}>{JSON.stringify(title)}</Text>
           </Body>

           <Right>
            {this.state.show ? <Icon name="edit" onPress={()=>this.props.navigation.navigate('EditNotice',{itemId:id})}
             style={{color:'white'}} size={20}/>  :  null }

           </Right>

           </CardItem>
           <CardItem style={{margin:15,backgroundColor:'rgb(72,68,69)'}}>
             <Body>
               <Text style={{color:'white'}}>
               {JSON.stringify(description)}
               </Text>
             </Body>
           </CardItem>
        </Card>
        </View>
         </View>


         <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:20,backgroundColor:'rgb(52,48,47)'}}>

         <Button transparent onPress={()=>this.fetchUsers(id,'going')}
         style={{alignItems:'center',justifyContent:'center',height:100,width:100,borderRightWidth:2,borderColor:'rgb(61,57,56)',backgroundColor:'#e91e63'}}>
         <View style={{alignItems:'center',justifyContent:'center'}}>
         <Text style={{fontSize:20,color:'white'}}>{JSON.stringify(going)}</Text>
         <Text style={{fontSize:20,color:'white'}}>Going</Text>
         </View>
         </Button>


         <Button transparent onPress={()=>this.fetchUsers(id,'interested')}
          style={{alignItems:'center',justifyContent:'center',height:100,width:100,borderRightWidth:2,borderColor:'rgb(61,57,56)',backgroundColor:'#ffa726'}}>
          <View style={{alignItems:'center',justifyContent:'center'}}>
         <Text style={{fontSize:20,color:'white'}}>{JSON.stringify(interested)}</Text>
         <Text style={{fontSize:20,color:'white'}}>Interested</Text>
         </View>
         </Button>

         <Button transparent onPress={()=>this.fetchUsers(id,'notInterested')}
         style={{alignItems:'center',justifyContent:'center',height:100,width:100,backgroundColor:'#5c6bc0'}}>
         <View style={{alignItems:'center',justifyContent:'center'}}>
         <Text style={{fontSize:20,color:'white'}}>{JSON.stringify(not_interested)}</Text>
         <Text style={{fontSize:15,color:'white'}}> Not Interested</Text>
         </View>
         </Button>

         </View>
         {this.state.showGoingItem
         ?
         <View style={{marginTop:15}}>
         <ListTest source={this.state.goingArray} type='going'/>
         </View>
         :
         null
       }

       {this.state.showInterestedItem
       ?
       <View style={{marginTop:15}}>
       <ListTest source={this.state.interestedArray} type='interested'/>
       </View>
       :
       null
     }
     {this.state.showNotInterestedItem
      ?
       <View style={{marginTop:15}}>
       <ListTest source={this.state.notInterestedArray} type='Not-Interested'/>
       </View>
       :
       null
     }

         </Content>
       </Container>
    );
  }
}

const styles=StyleSheet.create({
  modal: {
     justifyContent: 'center',
     alignItems: 'center'
   },

   modal3: {
     height: 300,
     width: 300
   },

  container:{
flex:1,
flexDirection:'row',
alignItems:'center',
justifyContent:'center'
},
listText:{
  color:'white'
}
});



class ListTest extends Component{

render(){
  return(

    <List dataArray={this.props.source}
    renderRow={(item) =>
      <ListItem avatar>
        <Left>
          <Thumbnail source={{uri: 'https://nexus.scriptguru.org/' + item.user.profile_pic}} />

        </Left>
        <Body>
          <Text style={styles.listText}>{item.user.name}</Text>
          <Text style={styles.listText}>This user is {this.props.type}.</Text>
        </Body>
      </ListItem>
    }/>


  );
}

}
