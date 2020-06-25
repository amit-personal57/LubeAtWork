import React from 'react';
import { View, Image, StatusBar ,Text,StyleSheet,ImageBackground,ToastAndroid,Dimensions,TouchableOpacity} from 'react-native';
import { Avatar,Input,Lebal,Button ,CheckBox} from 'react-native-elements';
import TextField from './components/input'
import MyButton from './components/Button'
import MyModal from './components/Modal'
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from './components/Loader'
import AsyncStorage from '@react-native-community/async-storage';
import * as API from '../api/index';
const width = Dimensions.get('window').width;
const height =Dimensions.get('window').height;

class NewPassSet extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {  
            password:'',
            cpassword:'',
            visible:false,
            id:'',
            token:'',
            otp:'',
            modalShow:false

        }     
    }
validateInput = ()=>{
const {password}  = this.state ;
const {cpassword}  = this.state ;
if(password ===""){
 this.showToastWithGravity("Enter new password")
return false;
}
else if(password.length<6){
  this.showToastWithGravity("Password should be atleast 6 character")
 return false;
 }
else if(cpassword ===""){
 this.showToastWithGravity("Enter confirm new password")
return false;
}
else if(cpassword !=password){
 this.showToastWithGravity("Password not matched")
return false;
}
else

this.setState({visible:true,disabled:false})
return true;
}
  showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
 
  componentDidMount = async () => {
 let otp = this.props.navigation.state.params.otp
    AsyncStorage.getItem("user_info").then((value) =>{
      const mydata = JSON.parse(value)
         this.setState({id:mydata.id,token:mydata.token,otp:otp})
 console.warn(mydata.id)
     })
 }

  NewPassword=()=>{
   if(this.validateInput()){
       const mydata = this.state
        const data = { 
           id:mydata.id,
            password:mydata.password,
            cpassword:mydata.cpassword,
            token:mydata.token,
            otp:mydata.otp
           }
      
       API.NewPassword(data)
        .then(res => {
          if(res.status ==='Success'){
            this.setState({modalShow:true,visible:false})
            setTimeout(this.handleClose, 3000) 
           }
           else{
            this.setState({visible:false})
            this.showToastWithGravity(res.msg) 
           } 
       })
   }
 }

 handleClose = ()=>{
  this.setState({modalShow:false})
  this.props.navigation.navigate('Login')
}
    render(){
        return(
          <ImageBackground source = {require('../img/loginback.png')} style = {{flex:1}}>
          <StatusBar backgroundColor="#2aabe4" barStyle="light-content" />
          <View style = {{flex:1,alignItems:'center',PaddingHorizontal:10,justifyContent:'space-evenly' }}>
          <Loader visible ={this.state.visible}/>
          <MyModal visible = {this.state.modalShow} msg = "Password Change Successfully"/> 
 <Image  source = {require('../img/logo.png')}  style = {{
  resizeMode:'contain'}}/>
  <Text style = {{fontSize:24,color:'#f1f1f1',fontWeight:'bold',}}>
 ENTER NEW PASSWORD
  </Text>
   </View>
 <View style = {{flex:1,backgroundColor:'transparent',margin:30}}>

<TextField
onChangeText={password => this.setState({password})}
placeholder ='NEW PASSWORD'
secureTextEntry={true}
   />
<Text></Text>
<TextField
onChangeText={cpassword => this.setState({cpassword})}
placeholder ='CONFIRM PASSWORD'
secureTextEntry={true}
   />
   <Text></Text>
   <Text></Text>
<MyButton
  title="UPDATE"
  onPress = {this.NewPassword}
/>
 </View>
 </ImageBackground>   
        )}}

const styles = StyleSheet.create({
    splash: {
        width: '100%',
        height: '100%',
      },
      red: {
        color:'red'
      },  
      imageThumbnail:{
        borderWidth:1,
        width:'100%',
        flex:1,
      },

  });
export default NewPassSet;