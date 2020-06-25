import React from 'react';
import { View, Image, StatusBar ,Text,StyleSheet,ImageBackground,Modal,ToastAndroid,Dimensions,TouchableOpacity} from 'react-native';
import { Avatar,Input,Lebal,Button ,CheckBox,Header} from 'react-native-elements';
import TextField from '../../common/components/input'
import MyButton from '../../common/components/Button'
import Loader from '../../common/components/Loader'
import MyModal from '../../common/components/Modal'
import Icon from 'react-native-vector-icons/Ionicons';
import { Right, Left, Footer,Body,Item} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import * as API from '../../api/index';
const width = Dimensions.get('window').width;
const height =Dimensions.get('window').height;


class ChangePass extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {  
            password:'',
            cpassword:'',
          visible:false,
         opassword:'',
          isVisible:false,
          id:'',
          token:'',
          modalShow:false
        }     
    }
validateInput = ()=>{
const {password}  = this.state ;
const {cpassword}  = this.state ;
const {opassword}  = this.state ;
if(opassword ===""){
 this.showToastWithGravity("Enter Old Password")
return false;
}
else if (opassword.length<6)
{
  this.showToastWithGravity(" Old password should be atleast 6 character")
  return false;
}
else if(password ===""){
 this.showToastWithGravity("Enter new Password")
return false;
}
else if (password.length<6)
{
  this.showToastWithGravity(" New password should be atleast 6 character")
  return false;
}
else if(cpassword ===""){
 this.showToastWithGravity("Enter Cnfirm Password")
return false;
}
else if (cpassword.length<6)
{
  this.showToastWithGravity(" Confirm password should be atleast 6 character")
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
  }
componentDidMount = async () => {
 
   AsyncStorage.getItem("user_info").then((value) =>{
     const mydata = JSON.parse(value)
        this.setState({id:mydata.id,token:mydata.token})
console.warn(mydata.id)
    })
}
 changePassword=()=>{
  if(this.validateInput()){
      const mydata = this.state
       const data = { 
          id:mydata.id,
           opassword:mydata.opassword,
           password:mydata.password,
           cpassword:mydata.cpassword,
           token:mydata.token
          
          }
     
      API.changePassword(data)
       .then(res => {
         console.warn('logindetail',res)
         if(res.status ==='Success'){
          this.setState({modalShow:true,visible:false})
          setTimeout(this.handleClose, 3000) 
         }
         else{
          this.setState({visible:false})
          this.showToastWithGravity(res.msg) 
         }})
  }}
  handleClose = ()=>{
    this.setState({modalShow:false})
    this.props.navigation.navigate('LoginTack')
  }
    render(){
        return(
             <ImageBackground source = {require('../../img/login_back.png')} style = {{flex:1}}>
                 <Header
                 statusBarProps={{ barStyle: 'light-content' ,backgroundColor:"#2aabe4",translucent: true,}}
                //  leftComponent={ <Icon name='ios-arrow-back'  style={{color:'white',fontSize:25,left:5}}  onPress = {()=>this.props.navigation.goBack()}/>}
                 centerComponent={{ text: 'Change Password', style: { color: '#fff',fontWeight:'bold',fontSize:20 }}}
                 rightComponent={ <View style = {{flexDirection:'row'}}>
                     
                 <Icon name='md-menu'  style={{color:'white',fontSize:25,right:10}}  onPress = {()=>this.props.navigation.goBack()}/>
                 </View>
                }
                 containerStyle={{
                 backgroundColor: '#2aabe4',
                 justifyContent: 'space-around',
                 borderWidth:0,borderBottomColor:'#2aabe4'
                }}
              />
               <Loader visible ={this.state.visible} />
               <MyModal visible = {this.state.modalShow} msg = "Password Updated Successfully"/> 
    <View style = {{flex:1,alignItems:'center',PaddingHorizontal:10,paddingVertical:30,marginBottom:-50}}>
<Item  style ={{flexDirection:'row',borderColor: 'transparent',width:'100%',alignItems:'center',PaddingHorizontal:10,justifyContent:'space-evenly'}}>

<View style ={{flexDirection:'column',marginTop:'15%'}}>
{/* <Avatar
              size={130}
              onEditPress={this.takePicture.bind(this)}
              overlayContainerStyle={{ backgroundColor: '#FFF',borderColor: '#2aabe4', }}          
              rounded
              containerStyle={{ borderColor: '#2aabe4', borderWidth: 1, alignSelf: 'center',backgroundColor:'white'}}
              source={this.state.clogo != '' ? { uri: this.state.clogo} : require('../../img/profile.png')}
              imageProps={{ resizeMode: 'cover' ,borderColor: 'black'}}
              showEditButton
              iconStyle = {{backgroundColor:'#2aabe4'}}
              editButton = {{ name: 'mode-edit', type: 'material', color: '#2aabe4',size:25,containerStyle:{backgroundColor:'white',borderColor:'#2aabe4',borderRadius:12} }}
            /> */}
             
</View>
</Item>
  </View>
  <View style = {{flex:2.8,backgroundColor:'transparent',margin:20,}}>
  <TextField
onChangeText={opassword => this.setState({opassword})}
placeholder ='Enter Old Password'
secureTextEntry={true}
   />
   <Text></Text>
  <TextField
onChangeText={password => this.setState({password})}
placeholder ='Enter New Password'
secureTextEntry={true}
   />
<Text></Text>
<TextField
onChangeText={cpassword => this.setState({cpassword})}
placeholder ='Enter Confirm Password'
secureTextEntry={true}
   />
  
   <Text></Text>
   <Text></Text>
   <MyButton title="UPDATE" onPress = {this.changePassword}/>
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
export default ChangePass;