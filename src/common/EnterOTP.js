 import React from 'react';
import { View, Image, StatusBar ,Text,StyleSheet,ImageBackground,ToastAndroid,Dimensions,TouchableOpacity} from 'react-native';
import { Avatar,Input,Lebal,Button ,CheckBox} from 'react-native-elements';
import TextField from './components/input'
import MyButton from './components/Button'
import Loader from './components/Loader'
import AsyncStorage from '@react-native-community/async-storage';
import * as API from '../api/index';
const width = Dimensions.get('window').width;
const height =Dimensions.get('window').height;

class EnterOTP extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {  
            otp:null,
          visible:false,
          token:'',
          id:'',
          email:''
        }     
    }
validateInput = ()=>{
const {otp}  = this.state ;
const {cpassword}  = this.state ;
if(otp ===""){
 this.showToastWithGravity("Enter OTP")
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
   const email = this.props.navigation.state.params.email
    AsyncStorage.getItem("user_info").then((value) =>{
      const mydata = JSON.parse(value)
         this.setState({id:mydata.id,token:mydata.token,email:email})
 console.warn(mydata.id)
     })
 }

ReSendOTP = ()=>{
  this.setState({visible:true})
    const mydata = this.state
     const data = { 
        email:mydata.email,
        token:mydata.token
        }
    API.ForgotPassword(data)
     .then(res => {
       console.warn('logindetail',res);
       this.setState({visible:false})
       if(res.status ==='Success'){
         
        this.showToastWithGravity('New OTP has been sent')
       }
       else{

        this.showToastWithGravity('Something went wrong/Invalid Email')
       }
    })
}

  VerifyOtp=()=>{
    if(this.validateInput()){
    const mydata = this.state
     const data = { 
        otp:mydata.otp,
        token:mydata.token,
        id:mydata.id
        }
    API.VerifyOtp(data)
     .then(res => {
       console.warn('logindetail',res);
       this.setState({visible:false})
       if(res.status ==='Success'){
      
         this.props.navigation.navigate('NewPassSet',{otp:mydata.otp})
       }
       else{
        this.showToastWithGravity(res.msg)
       }

    })
  }
}
 
    render(){

        return(
          <ImageBackground source = {require('../img/loginback.png')} style = {{flex:1}}>
          <StatusBar backgroundColor="#2aabe4" barStyle="light-content" />
          <View style = {{flex:1.1,alignItems:'center',PaddingHorizontal:10,justifyContent:'space-evenly' }}>
          <Loader visible ={this.state.visible}/>
 <Image  source = {require('../img/logo.png')}  style = {{
  resizeMode:'contain'}}/>
  <Text style = {{fontSize:24,color:'#f1f1f1',fontWeight:'bold',}}>
 ENTER OTP
  </Text>

   </View>
 <View style = {{flex:1.2,backgroundColor:'transparent',margin:30}}>
<TextField
onChangeText={otp => this.setState({otp})}
placeholder ='ENTER OTP'
secureTextEntry={true}
keyboardType="numeric" maxLength={5}
rightIcon = {
  <TouchableOpacity onPress = {this.ReSendOTP}>
    <Text style = {{color:'#2aabe4',fontWeight:'bold',}}>RESEND?</Text>
    </TouchableOpacity>
}
   />
   <Text></Text>
   <Text style = {{fontSize:15,color:'#373737',paddingVertical:5,textAlign:'center',alignItems:'center'}}>
OTP has been sent to your email
</Text>
   <Text></Text>
   <Text></Text>
<MyButton
  title="SUBMIT"
  onPress = {this.VerifyOtp}
/>
 </View>
 </ImageBackground>   
   )}
}

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
export default EnterOTP;