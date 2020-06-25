import React from 'react';
import { View, Image, StatusBar ,Text,StyleSheet,ImageBackground,ToastAndroid,Dimensions,TouchableOpacity} from 'react-native';
import { Avatar,Input,Lebal,Button ,CheckBox,Header} from 'react-native-elements';
import TextField from '../../common/components/input'
import MyButton from '../../common/components/Button'
import Icon from 'react-native-vector-icons/Ionicons';
import { Right, Left, Footer,Body,Item} from 'native-base';
import * as API from '../../api/index';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../common/components/Loader';
const width = Dimensions.get('window').width;
const height =Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient';
import MyModal from '../../common/components/Modal'

class EmpServiceRequest extends React.Component{

    
    constructor(props){
        super(props);
        
        this.state = {  
          modalShow:false,
          name:'',
          phnNo:'',
          email:'',
          serviceDate:'',
          serviceTime:'',
          description:'',
        }     
    }

  componentDidMount = async () => {
 
  }

render(){

        return(
             <ImageBackground source = {require('../../img/loginback.png')} style = {{flex:1}}>
                <Header
                 statusBarProps={{ barStyle: 'light-content' ,backgroundColor:"#2aabe4",translucent: true,}}
                 
                 leftComponent={ <Icon name='ios-arrow-back'  style={{color:'white',fontSize:25,left:5}} onPress = {()=>this.props.navigation.goBack()}/>}
                 centerComponent={{ text: 'Service Request', style: { color: '#fff',fontWeight:'bold',fontSize:20 }} }
                 rightComponent={ <View style = {{flexDirection:'row'}}>
                     {/* <Icon name='ios-create'  style={{color:'white',fontSize:25,marginHorizontal:5,right:10}}/> */}
                 <Icon name='md-menu'  style={{color:'white',fontSize:25,right:10}} onPress = {()=>this.props.navigation.goBack()}/>
                 </View>
                }
                 containerStyle={{
                 backgroundColor: '#2aabe4',
                 justifyContent: 'space-around',
                 borderWidth:0,borderBottomColor:'#2aabe4'
                }}
              />

<View style = {{flex:1,backgroundColor:'transparent', margin:10, marginTop:180}}>

  <Text style = {{marginLeft:10, fontWeight:'bold', color:'#FFFFFF', fontSize:15}}>Service Provider Detail</Text>
 <Item style ={{flexDirection:'row',borderColor: 'transparent',width:'100%', marginTop:40}}>
 <Left>
    <Input
      onChangeText={name => this.setState({name})}
      placeholder ='Name'
      value = {this.state.name}
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
   />
 </Left>
     <Right>
     <Input
      onChangeText={phnNo => this.setState({phnNo})}
      placeholder ='Phone Number'
      value = {this.state.phnNo}
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
     />
    </Right>
</Item>

<Item style ={{flexDirection:'row',borderColor: 'transparent',width:'100%', marginTop:20}}>
 <Left>
    <Input
      onChangeText={email => this.setState({email})}
      placeholder ='Email'
      value = {this.state.email}
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
   />
 </Left>
 </Item>

 <Item style ={{flexDirection:'row',borderColor: 'transparent',width:'100%', marginTop:20}}>
 <Left>
    <Input
      onChangeText={serviceDate => this.setState({serviceDate})}
      placeholder ='Service Date'
      value = {this.state.serviceDate}
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
   />
   <Image source={require('../../img/editP.png')}  style = {{width:20, height:20, top:10, right:10, position:'absolute', alignSelf:'flex-end'}}/>
 </Left>
     <Right>
     <Input
      onChangeText={serviceTime => this.setState({serviceTime})}
      placeholder ='Service Time'
      value = {this.state.serviceTime}
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
     />

    <Image source={require('../../img/editP.png')}  style = {{width:20, height:20, top:10, right:10, position:'absolute', alignSelf:'flex-end'}}/>
    </Right>
</Item>

<Item style ={{flexDirection:'row',borderColor: 'transparent',width:'100%', marginTop:20}}>
 <Left>
    <Input
      onChangeText={description => this.setState({description})}
      placeholder ='Description'
      value = {this.state.description}
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
   />
 </Left>
 </Item>

 <MyButton style = {{marginTop:20, marginLeft:40, marginRight:40, fontSize:15}} title="SEND"/>
 <TouchableOpacity>
            <LinearGradient 
            colors={['#b29d1c', '#d2b500']}
            style={{borderRadius:5}}  
            start={{x: 0, y: 1}} 
            end={{x: 1, y: 0.9}}
            locations={[0, 0.3,]} >
              <Text style={{width:'100%', height:50, textAlignVertical:'center', textAlign:'center', fontSize:15, fontWeight:'bold', color:'#FFFFFF'}}>BOOK A TIME SLOT</Text>   
            </LinearGradient>
        </TouchableOpacity>
</View>

  <MyModal visible = {this.state.modalShow} msg = "Service Request has been sent to the Admin."/> 

 </ImageBackground> 

        )}}

const styles = StyleSheet.create({

});
export default EmpServiceRequest;