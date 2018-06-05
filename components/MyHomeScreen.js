import React, { Component } from 'react';
import { Container, Header, Title,Left,Button,Body,Card,CardItem,Content, List, ListItem ,Footer,Image,Right,Fab,Thumbnail} from 'native-base';
import {View,Text,AsyncStorage,TouchableHighlight,StyleSheet,TextInput,ScrollView,BackHandler} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from 'react-native-modalbox';
import IconBadge from 'react-native-icon-badge';

import Login from './Login.js'
import CreateNotice from './CreateNotice.js'


export default class MyHomeScreen extends React.Component {

  constructor(props) {
    super(props)
     this.state = {
       active: false,
       modalVisible: false,
       api_key:''
     };
   }



  static navigationOptions = {
    drawerIcon:(
      <Icon name="home" style={{color:'#e91e63',height:24,width:24,fontSize:25}}/>
    )
  }

createNotice=()=>{
  this.props.navigation.navigate('CreateNotice');
}

  render() {
    return (
      <Container style={styles.container}>
      <ScrollView>
      <Header style={{backgroundColor:'rgb(32,53,70)'}}>
      <Left>
      <Icon name="menu" style={{color:'#e91e63',fontSize:25,width:24}}
      onPress={()=>this.props.navigation.navigate('DrawerOpen')}/>
      </Left>
      <Body>
         <Title>Dashboard</Title>
      </Body>
      <Right style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
      <IconBadge

         MainElement={
            <Icon name="bell" style={{color:'white',marginRight:20}} size={20}/>
        }
        BadgeElement={
            <Text style={{color:'white'}}>0</Text>
          }
          IconBadgeStyle={
            {
              top:-10,
              right:9
          }
        }
        />
        <Icon name="magnify" style={{color:'white'}} size={20}/>

      </Right>
      </Header>

      <View style={{flexDirection:'row',marginTop:15}}>
      <Text style={{marginLeft:20,color:'white',fontSize:20,position:'absolute',top:10}}>Hi</Text>
      <Text style={{marginLeft:50,fontSize:35,color:'white',fontWeight:'bold',fontFamily:'sans-serif'}}>User</Text>
      </View>

      <View style={{flexDirection:'row',justifyContent:'space-around'}}>

      <View style={{marginTop:20,borderRadius:10,height:170,width:150,backgroundColor:'#ec407a'}}>


      <View>
      <View style={{flexDirection:'row'}}>
      <Text style={{fontSize:60,color:'white',marginLeft:20}}>4</Text>
      <Icon name="poll" style={{color:'white',opacity:0.5,paddingTop:10,paddingLeft:50}} size={20}/>
      </View>

      <Text style={{fontSize:15,color:'white',marginLeft:20}}>New Polls</Text>

      </View>

      <Footer style={{backgroundColor:'#ec407a',borderTopWidth:1,borderColor:'#bdbdbd',opacity:0.5,marginTop:20}}>
          <Button transparent>
      <Text style={{color:'white',marginTop:10}}>View</Text>
      </Button>
      </Footer>

      </View>

      <View style={{marginTop:20,borderRadius:10,height:170,width:150,backgroundColor:'#ffc107'}}>

      <View>
      <View style={{flexDirection:'row'}}>
      <Text style={{fontSize:60,color:'white',marginLeft:20}}>2</Text>
      <Icon name="poll" style={{color:'white',opacity:0.5,paddingTop:10,paddingLeft:50}} size={20}/>
      </View>
      <Text style={{fontSize:15,color:'white',marginLeft:20}}>New Polls</Text>

      </View>

      <Footer style={{backgroundColor:'#ffc107',borderTopWidth:1,borderColor:'#bdbdbd',opacity:0.5,marginTop:20}}>
      <Button transparent>
      <Text style={{color:'white',marginTop:10}}>View</Text>
      </Button>
      </Footer>

</View>

      </View>


      <View style={{marginTop:20,borderRadius:10,height:140,width:'90%',marginLeft:20,backgroundColor:'#512da8'}}>
      <View style={{marginLeft:20}}>

      <View style={{flexDirection:'row'}}>
      <Text style={{color:'white',fontSize:50}}>6</Text>
      <Text style={{color:'white',fontSize:15,paddingTop:45,marginLeft:20}}>Dummy Data</Text>
      <Icon name="poll" style={{color:'white',paddingLeft:'40%',paddingTop:10}} size={20}/>
      </View>

      <Footer style={{backgroundColor:'#512da8',borderTopWidth:1,borderColor:'#bdbdbd',opacity:0.5,marginTop:20}}>
      <Button transparent>
      <Text style={{color:'white'}}>View</Text>
      </Button>
      </Footer>
      </View>
      </View>




      <View style={{marginLeft:20,marginTop:20,marginBottom:15,flex:1,flexDirection:'row'}}>
      <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}>

      <Card style={{width:170,borderRadius:20}}>
            <CardItem>
              <Thumbnail small
              style={{marginHorizontal:5,borderColor:'pink',borderWidth:2}}

              source={require('../img/logo.png')}/>
              <Text style={{fontSize:10}}>Varun Gupta</Text>
            </CardItem>
           <CardItem>
             <Body>
               <Text style={{color:'#bdbdbd'}}>
                  Created workshop notice
               </Text>
             </Body>
           </CardItem>
           <CardItem style={{borderTopWidth:1,borderColor:'#bdbdbd'}}>
           <Text style={{color:'green'}}>View</Text>
           </CardItem>
         </Card>


         <Card style={{width:170,borderRadius:20}}>
               <CardItem>
                 <Thumbnail small
                 style={{marginHorizontal:5,borderColor:'pink',borderWidth:2}}
                 source={require('../img/logo.png')}/>
                 <Text style={{fontSize:10}}>Varun Gupta</Text>
               </CardItem>
              <CardItem>
                <Body>
                  <Text style={{color:'#bdbdbd'}}>
                       Created workshop notice
                  </Text>
                </Body>
              </CardItem>
              <CardItem style={{borderTopWidth:1,borderColor:'#bdbdbd'}}>
              <Text style={{color:'green'}}>View</Text>
              </CardItem>
            </Card>
            <Card style={{width:170,borderRadius:20}}>
                  <CardItem>
                    <Thumbnail small
                    style={{marginHorizontal:5,borderColor:'pink',borderWidth:2}}
                    source={require('../img/logo.png')}/>
                    <Text style={{fontSize:10}}>Varun Gupta</Text>
                  </CardItem>
                 <CardItem>
                   <Body>
                     <Text style={{color:'#bdbdbd'}}>
                          Created workshop notice
                     </Text>
                   </Body>
                 </CardItem>
                 <CardItem style={{borderTopWidth:1,borderColor:'#bdbdbd'}}>
                 <Text style={{color:'green'}}>View</Text>
                 </CardItem>
               </Card>
               <Card style={{width:170,borderRadius:20}}>
                     <CardItem>
                       <Thumbnail small
                       style={{marginHorizontal:5,borderColor:'pink',borderWidth:2}}
                       source={require('../img/logo.png')}/>
                       <Text style={{fontSize:10}}>Varun Gupta</Text>
                     </CardItem>
                    <CardItem>
                      <Body>
                        <Text style={{color:'#bdbdbd'}}>
                             Created workshop notice
                        </Text>
                      </Body>
                    </CardItem>
                    <CardItem style={{borderTopWidth:1,borderColor:'#bdbdbd'}}>
                    <Text style={{color:'green'}}>View</Text>
                    </CardItem>
                  </Card>


      </ScrollView>
      </View>



      <Fab
        active={this.state.active}
        direction="up"
        containerStyle={{ }}
        style={{ backgroundColor: '#5067FF' }}
        position="bottomRight"
        onPress={() => this.createNotice()}>
        <Icon name="plus" />
      </Fab>
      </ScrollView>
  </Container>
    );
  }
}

const styles = StyleSheet.create({

container:{
  flex:1,
  backgroundColor:'black',
},

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgb(32,53,70)'
  },

  modal4: {
    height: 400
  },


});
