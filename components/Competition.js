import React, { Component } from 'react';
import { Container, Header, Title,Left,Button,Body,Card,CardItem,Content, List, ListItem ,Image,Right} from 'native-base';
import {View,Text,ActivityIndicator,StyleSheet,FlatList,AsyncStorage} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import Icon from "react-native-vector-icons/Feather";

import Detail from './Detail.js'

export default class Competition extends React.Component {

  constructor(props){
    super(props)
  this.state={
    dataSource:[],
    isLoading:true,
    count:0,
    api_key:''
  };
  }

  componentWillMount()
  {

    AsyncStorage.getItem('ACCESS_TOKEN').then((value) => {
      if (value == null){
         alert('Login Again');
       }
       else{
         this.setState({
           api_key:value
         })
           return fetch('https://nexus.scriptguru.org/api/notices/type/placement',{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+this.state.api_key
            },
          }).then((response) =>response.json())
          .then((res) => {


            let d=JSON.stringify(res);
            let source=JSON.parse(d);
            this.setState({

              dataSource:source.data,
              isLoading:false,
            })
          })
          .catch((error) => {
            console.error(error);
          });

  }
  });
  }


  gotoDetailscreen=(id,description,interested,going,not_interested,title)=>{
    this.props.navigation.navigate('Detail',{
      itemId:id,
      itemDescription:description,
      itemGoing:going,
      itemInterested:interested,
      itemNotInterested:not_interested,
      itemTitle:title});
  }


  static navigationOptions = {
    drawerIcon:(
      <Icon name="command" style={{color:'#e91e63',height:24,width:24,fontSize:25}}/>
    )
  }

  render() {
    return (

      this.state.isLoading
      ?
      <Container>
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <ActivityIndicator size="large" color='red'/>
      </View>
      </Container>
      :
      <Container>
      <Header style={{backgroundColor:'rgb(32,53,70)'}}>
      <Left>
      <Icon name="menu" style={{color:'white',fontSize:25,width:24}}
      onPress={()=>this.props.navigation.navigate('DrawerOpen')}/>
      </Left>
      <Body>
         <Title>Competition</Title>
      </Body>
      </Header>

      <Content>


      <List dataArray={this.state.dataSource}
      renderRow={(item) =>
        <ListItem style={{paddingTop:0,paddingBottom:0,paddingRight:0,paddingLeft:0,marginLeft:0,marginBottom:30,borderWidth:5,borderTopColor:'#673ab7'}}>
              <Card style={{marginLeft:0,paddingLeft:0}}>

              <CardItem bordered={true}
                 button onPress={()=>{this.gotoDetailscreen(item.id,item.description,item.interested,item.going,item['not-interested'],item.title)}}>
                <Body style={{alignItems:'center'}}>
                <Text style={{fontWeight:'bold'}}>{item.title}</Text>
                <Text>{item.created_at}</Text>
                <Text>{item.category}</Text>
                </Body>
              </CardItem>


              <CardItem style={{marginBottom:0,paddingBottom:10}}>
                  <View style={{flex:1,flexDirection:'row',justifyContent: 'center'}}>

                  <View style={{justifyContent:'center',alignItems:'center',width:50,height:30,borderRadius:5,borderWidth:2,borderColor:'#f06292',marginRight:5}}>
                  <ButtonLike going={item.going} id={item.id} interest={item.interest ? item.interest.going : 0 }/>
                  </View>

                  <View style={{justifyContent:'center',alignItems:'center',width:50,height:30,borderRadius:5,borderWidth:2,borderColor:'#5c6bc0',marginRight:5}}>
                  <ButtonInterested interested={item.interested} id={item.id} interest={item.interest ? item.interest.interested : 0 }/>
                  </View>

                  <View style={{justifyContent:'center',alignItems:'center',width:50,height:30,borderRadius:5,borderWidth:2,borderColor:'#ffa726'}}>
                  <ButtonNotGoing not_interested={item['not-interested']} id={item.id} interest={item.interest ? item.interest['not-interested'] : 0 }/>
                  </View>
                  </View>

              </CardItem>

              </Card>
        </ListItem>
      }/>

      </Content>

      </Container>
    );
  }
}

class ButtonLike extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isSelected:this.props.interest,
        api_key:'',
        going:this.props.going
      }
    }



    increase=(type,id)=>{

    this.setState({isSelected: !this.state.isSelected});
      AsyncStorage.getItem('ACCESS_TOKEN').then((value) => {
        if (value == null){
           alert('Login Again');
         }
         else{
           this.setState({
             api_key:value
           })
             return fetch('https://nexus.scriptguru.org/api/notices/' + id + '/interest/' + type,{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.state.api_key
              },
            }).then((response) =>response.json())
            .then((res) => {
              let d=JSON.stringify(res);
              let dat=JSON.parse(d)
              let state=dat.interest.going;
              this.setState({
                going : dat.going
              })
              if(state==1)
              {
                this.setState({
                  isSelected:true
                })
              }
              else {
                this.setState({
                  isSelected:false
                })
              }
            })
            .catch((error) => {
              console.error(error);
            });

    }
    });
    }

    render() {
        let id=this.props.id;
        let type='going'
      return (
        <View style={[this.state.isSelected ? styles.iconBlueLike : styles.iconBlackLike,{justifyContent:'center',alignItems:'center',width:55,height:35}]}>
         <Button transparent style={{paddingLeft:16}}
         onPress={() => this.increase(type,id)}>
         <Icon active style={this.state.isSelected ? styles.iconBlueLike : styles.iconBlackLike} name="thumbs-up" size={10}/>
         <Text style={this.state.isSelected ? styles.iconBlueLike : styles.iconBlackLike}>{this.state.going}</Text>
         </Button>
         </View>
      )
    }
}


class ButtonInterested extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isSelected: this.props.interest,
        api_key:'',
        interested:this.props.interested
      }
    }

    increase=(type,id)=>{

    this.setState({isSelected: !this.state.isSelected});
      AsyncStorage.getItem('ACCESS_TOKEN').then((value) => {
        if (value == null){
           alert('Login Again');
         }
         else{
           this.setState({
             api_key:value
           })
             return fetch('https://nexus.scriptguru.org/api/notices/' + id + '/interest/' + type,{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.state.api_key
              },
            }).then((response) =>response.json())
            .then((res) => {
              let d=JSON.stringify(res);
              let dat=JSON.parse(d)
              let state=dat.interest.interested;
              this.setState({
                interested : dat.interested
              })
              if(state==1)
              {
                this.setState({
                  isSelected:true
                })
              }
              else {
                this.setState({
                  isSelected:false
                })
              }
            })
            .catch((error) => {
              console.error(error);
            });

    }
    });
    }
    render() {
      let id=this.props.id;
      let type='interested'
      return (
        <View style={[this.state.isSelected ? styles.iconBlueInterested : styles.iconBlackInterested,{justifyContent:'center',alignItems:'center',width:55,height:35}]}>
         <Button transparent style={{paddingLeft:16}} onPress={()=>this.increase(type,id)}>
         <Icon active style={this.state.isSelected ? styles.iconBlueInterested : styles.iconBlackInterested} name="bookmark" size={10}/>
         <Text style={this.state.isSelected ? styles.iconBlueInterested : styles.iconBlackInterested}>{this.state.interested}</Text>
         </Button>
         </View>
      )
    }
}



class ButtonNotGoing extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isSelected:this.props.interest,
        api_key:'',
        not_interested:this.props.not_interested
      }
    }

    increase=(type,id)=>{

    this.setState({isSelected: !this.state.isSelected});
      AsyncStorage.getItem('ACCESS_TOKEN').then((value) => {
        if (value == null){
           alert('Login Again');
         }
         else{
           this.setState({
             api_key:value
           })
             return fetch('https://nexus.scriptguru.org/api/notices/' + id + '/interest/' + type,{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.state.api_key
              },
            }).then((response) =>response.json())
            .then((res) => {
              let d=JSON.stringify(res);
              let dat=JSON.parse(d)
              let state=dat.interest['not-interested'];
              this.setState({
                not_interested : dat['not-inteested']
              })
              if(state==1)
              {
                this.setState({
                  isSelected:true
                })
              }
              else {
                this.setState({
                  isSelected:false
                })
              }
            })
            .catch((error) => {
              console.error(error);
            });

    }
    });
    }
    render() {
      let id=this.props.id;
      let type='not-interested'
      return (
        <View style={[this.state.isSelected ? styles.iconBlueNotGoing : styles.iconBlackNotGoing,{justifyContent:'center',alignItems:'center',width:55,height:35}]}>
         <Button transparent style={{paddingLeft:16}} onPress={()=>{this.setState({isSelected: !this.state.isSelected}); }}>
         <Icon active style={this.state.isSelected ? styles.iconBlueNotGoing : styles.iconBlackNotGoing} name="thumbs-down" size={10}/>
         <Text style={this.state.isSelected ? styles.iconBlueNotGoing : styles.iconBlackNotGoing}>{this.state.not_interested}</Text>
         </Button>
         </View>
      )
    }
}

const styles = StyleSheet.create({
  iconBlueLike: {
    color: 'white',
    fontSize:15,
    backgroundColor:'#f06292',
    borderRadius:5,
  },
  iconBlackLike: {
    color: '#72777a',
    fontSize:15
  },
  iconBlueInterested: {
    color: 'white',
    fontSize:15,
    backgroundColor:'#5c6bc0',
    borderRadius:5,
  },
  iconBlackInterested: {
    color: '#72777a',
    fontSize:15
  },
  iconBlueNotGoing: {
    color: 'white',
    fontSize:15,
    backgroundColor:'#ffa726',
    borderRadius:5,
  },
  iconBlackNotGoing: {
    color: '#72777a',
    fontSize:15
  }
})
