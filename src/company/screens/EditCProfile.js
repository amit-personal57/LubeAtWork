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

class EditCProfile extends React.Component{

    
    constructor(props){
        super(props);
        
        this.state = {  
            password:'',
            cpassword:'',
          visible:true,
          clogo:[],
          cphoto:[],
          serverphoto:'',
          serverlogo:'',
         timings:[],
          cname:'',
          cmobile:'',
          cemail:'',
          tin:'',
          cid:'',
          cperson:'',
          Vehicles:null,
          caddress:'',token:''
        }     
    }
validateInput = ()=>{
const {clogo}  = this.state ;
const {cphoto}  = this.state ;
const {cname}  = this.state ;
const {cmobile}  = this.state ;
const {cemail}  = this.state ;
const {tin}  = this.state ;
const {cid}  = this.state ;
const {cperson}  = this.state ;
const {caddress}  = this.state ;
const {Vehicles}  = this.state ;

if(clogo ===""){
 this.showToastWithGravity("Add Company Logo")
return false;
}
else if(cphoto===""){
 this.showToastWithGravity("Add Company Photo")
return false;
}
else if(cid ===""){
 this.showToastWithGravity("Enter Company ID No")
return false;
}
else if(cname ===""){
 this.showToastWithGravity("Enter Company Name")
return false;
}
else if(cperson ===""){
 this.showToastWithGravity("Enter Contact Person")
return false;
}
else if(cemail ===""){
 this.showToastWithGravity("Enter Contact Person Email")
return false;
}
else if( cmobile===""){
 this.showToastWithGravity("Enter Contact Person Phone No.")
return false;
}
else if( tin===""){
 this.showToastWithGravity("Enter TIN Number")
return false;
}
else if( Vehicles===null){
 this.showToastWithGravity("Enter Vehicles Number")
return false;
}
else if( caddress===""){
 this.showToastWithGravity("Enter Address")
return false;
}
else
// this.props.navigation.navigate('Profile2')
this.setState({visible:false,disabled:false})
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

    Profile=()=>{
  if(this.validateInput()){
      const mydata = this.state
      const data = { 
        clogo:this.state.clogo,
          cphoto:this.state.cphoto,
          cname:mydata.cname,
          cmobile:mydata.cmobile,
          cemail:mydata.cemail,
          tin:mydata.tin,
          cid:mydata.cid,
          cperson:mydata.cperson,
          Vehicles:mydata.Vehicles,
          timing:mydata.timings,
          caddress:mydata.caddress}
      this.props.navigation.navigate('EditCProfile2',{data:data})
      
  }
}
  takePicture() {
    const options = {
      title: 'Select Image',
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response;
        this.setState({ clogo: source });
      }
    });
  }
  takePicturePhoto() {
    const options = {
      title: 'Select Image',
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response;
        this.setState({ cphoto: source });
      }
    })
  }
  componentDidMount = async () => {
 
 await  AsyncStorage.getItem("user_info").then((value) =>{
     const mydata = JSON.parse(value)
   const  data = {id:mydata.id,token:mydata.token}
      API.EditCProfile(data)
       .then(res => {
         console.warn("data"+res)
          if (res.success ===true) {
           let response = res['data']
           let detail = res['data']['details']
           const mytimings = JSON.parse(detail.timing)
           
         this.setState({visible:false,timings:mytimings})
        
          this.setState({
              id:mydata.id,
             serverlogo:response.avatar,
             serverphoto:detail.pic,
             cname:response.name,
            cmobile:detail.contactmobile,
          cemail:detail.contactemail,
          tin:detail.tin,
          cid:response.username,
          cperson:detail.contactperson,
          Vehicles:detail.vehicles,
          caddress:detail.address
            
            })
       }
    })})
       
}
    render(){
if(this.state.visible){

  return<Loader visible ={this.state.visible} onRequestClose = {()=>this.setState({visible:false})} />
}
        return(
             <ImageBackground source = {require('../../img/loginback.png')} style = {{flex:1}}>
                <Header
                 statusBarProps={{ barStyle: 'light-content' ,backgroundColor:"#2aabe4",translucent: true,}}
                //  leftC
                omponent={ <Icon name='ios-arrow-back'  style={{color:'white',fontSize:25,left:5}} onPress = {()=>this.props.navigation.goBack()}/>}
                 centerComponent={{ text: 'Edit Your Profile', style: { color: '#fff',fontWeight:'bold',fontSize:20 }} }
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
               
                
    <View style = {{flex:1,alignItems:'center',PaddingHorizontal:10,paddingVertical:30}}>
<Item  style ={{flexDirection:'row',borderColor: 'transparent',width:'100%',alignItems:'center',PaddingHorizontal:10,justifyContent:'space-evenly'}}>

<View style ={{flexDirection:'column',}}>
<Avatar
              size={120}
              onPress={this.takePicture.bind(this)}
              overlayContainerStyle={{ borderColor: 'white', borderWidth: 1,backgroundColor:'white',borderRadius:20 }}          
   placeholderStyle = {{borderColor: 'white', borderWidth: 1,backgroundColor:'white',borderRadius:20}}
    containerStyle={{ borderColor: 'white', borderWidth: 1,backgroundColor:'red',borderRadius:20 }}
     source={this.state.clogo.length<1? {uri:"https://lubeatwork.markupdesigns.org/assets/company/"+this.state.serverlogo}:{ uri: this.state.clogo.uri} } imageProps={{ resizeMode: 'cover' ,borderColor: 'white', borderWidth: 1,borderRadius:20}}

              imageProps={{ resizeMode: 'cover' ,borderColor: 'white', borderWidth: 1,borderRadius:20}}
              // showEditButton
              iconStyle = {{backgroundColor:'#2aabe4'}}
              // editButton = {{ name: 'mode-edit', type: 'material', color: '#2aabe4',size:25, underlayColor: '#2aabe4',backgroundColor:'#2aabe4',containerStyle:{backgroundColor:'white',paddingRight:-20,position:'absolute'} }}
            />
             <Text style={{ color: '#FFFFFF', alignSelf: 'center', marginTop: 10, fontFamily: 'Roboto_Regular',fontSize:13 }}>COMPANY LOGO</Text>
</View>
<View style ={{flexDirection:'column',}}>
<Avatar
              size={120}
              onPress={this.takePicturePhoto.bind(this)}
              overlayContainerStyle={{ borderColor: 'white', borderWidth: 1,backgroundColor:'white',borderRadius:20 }}          
   placeholderStyle = {{borderColor: 'white', borderWidth: 1,backgroundColor:'white',borderRadius:20}}         
              containerStyle={{ borderColor: 'white', borderWidth: 1, alignSelf: 'center',backgroundColor:'white',borderRadius:20 }}
             source={this.state.cphoto.length<1 ?{uri:"https://lubeatwork.markupdesigns.org/"+this.state.serverphoto}: { uri: this.state.cphoto.uri} } imageProps={{ resizeMode: 'cover' ,borderColor: 'white', borderWidth: 1,borderRadius:20}}
              // showEditButton
              iconStyle = {{backgroundColor:'#2aabe4'}}
              // editButton = {{ name: 'mode-edit', type: 'material', color: '#2aabe4',size:25, underlayColor: '#2aabe4',backgroundColor:'#2aabe4',containerStyle:{backgroundColor:'white',paddingRight:-20,position:'absolute'} }}
            />
       
                   <Text style={{ color: '#FFFFFF', alignSelf: 'center', marginTop: 10, fontFamily: 'Roboto_Regular',fontSize:13 }}>COMPANY PHOTO</Text>
</View>
</Item>
  </View>
  <View style = {{flex:1.8,backgroundColor:'transparent',margin:20,}}>
 <Item style ={{flexDirection:'row',borderColor: 'transparent',width:'100%'}}>
 <Left>
    <Input
      onChangeText={cid => this.setState({cid})}
      placeholder ='Company ID No'
      value = {this.state.cid}
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
   />
 </Left>
     <Right>
     <Input
      onChangeText={cname => this.setState({cname})}
      placeholder ='Company Name'
      value = {this.state.cname}
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
     />
    </Right>
</Item>

<Text></Text>
<Item style ={{flexDirection:'row',borderColor: 'transparent',width:'100%'}}>
 <Left>
    <Input
      onChangeText={cperson => this.setState({cperson})}
      placeholder ='Contact Person'
      value = {this.state.cperson}
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
   />
 </Left>
     <Right>
     <Input
      onChangeText={cemail => this.setState({cemail})}
      placeholder ='Contact Person Email'
      value = {this.state.cemail}
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
     />
    </Right>
</Item>
      <Text></Text>
      <TextField
      onChangeText={cmobile => this.setState({cmobile})}
      placeholder ='Contact Person Phone No.'
      value = {this.state.cmobile}
        />
        <Text></Text>
<Item style ={{flexDirection:'row',borderColor: 'transparent',width:'100%'}}>
 <Left>
    <Input
      onChangeText={tin => this.setState({tin})}
      placeholder ='TIN Number'
      value = {this.state.tin}
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
   />
 </Left>
     <Right>
     <Input
      onChangeText={Vehicles => this.setState({Vehicles})}
      placeholder ='No. of Vehicles'
      value = {this.state.Vehicles}
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
     />
    </Right>
</Item> 
       <Text></Text> 
      <TextField
      onChangeText={caddress => this.setState({caddress})}
      placeholder ='Address'
      value = {this.state.caddress}
        />
   <Text></Text>
   <Text></Text>
   <MyButton title="CONTINUE" onPress = {this.Profile}/>
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
export default EditCProfile;