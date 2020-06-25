import React from 'react';
import { View, Image, StatusBar ,Text,StyleSheet,ImageBackground,Modal,ToastAndroid,Dimensions,TouchableOpacity} from 'react-native';
import { Avatar,Input,Lebal,Button ,CheckBox,Header} from 'react-native-elements';
import TextField from '../../common/components/input'
import MyButton from '../../common/components/Button'
import Icon from 'react-native-vector-icons/Ionicons';
import { Right, Left, Footer,Body,Item} from 'native-base';
import ImagePicker from 'react-native-image-picker';
const width = Dimensions.get('window').width;
const height =Dimensions.get('window').height;

class EmpEditProfile extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {  
            password:'',
            cpassword:'',
          loading:true,
          clogo:'',
          cname:'',
          cmobile:'',
          cemail:'',
          tin:'',
          cid:'',
          cperson:'',
          Vehicles:'',
          caddress:'',
          count:1
        }     
    }
validateInput = ()=>{
const {password}  = this.state ;
const {cpassword}  = this.state ;
if(password ===""){
 this.showToastWithGravity("Enter new password")
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
this.setState({loading:true,disabled:false})
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
        const source = response.uri;
        this.setState({ clogo: source });
      }
    });
  }

  getVehicles=()=>{
      
let mycount = this.state.count +1

for(let i = 0;i<=2;i++){
 return(<View  key = { i }>
<Item style ={{flexDirection:'row',borderColor: 'transparent',width:'100%'}}>
 <Left>
    <Input
      onChangeText={bname => this.setState({bname})}
      placeholder ='Brand Name'
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
   />
 </Left>
     <Right>
     <Input
      onChangeText={ctype => this.setState({ctype})}
      placeholder ='Catogory Type'
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
     />
    </Right>
</Item> 
<Text></Text> 
<Item style ={{flexDirection:'row',borderColor: 'transparent',width:'100%'}}>
 <Left>
    <Input
      onChangeText={vin => this.setState({vin})}
      placeholder ='VIN No'
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
   />
 </Left>
     <Right>
     <Input
      onChangeText={vehicleno => this.setState({vehicleno})}
      placeholder ='Vehicle No'
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
     />
    </Right>
</Item> 
</View>)

}
     
  }
    render(){

        return(
             <ImageBackground source = {require('../../img/login_back.png')} style = {{flex:1}}>
                 <Header
                 statusBarProps={{ barStyle: 'light-content' ,backgroundColor:"#2aabe4",translucent: true,}}
                 leftComponent={ <Icon name='ios-arrow-back'  style={{color:'white',fontSize:25}}/>}
                 centerComponent={{ text: 'Edit Your Profile', style: { color: '#fff',fontWeight:'bold',fontSize:20 } }}
                 rightComponent={ <View style = {{flexDirection:'row'}}>
                     <Icon name='ios-create'  style={{color:'white',fontSize:25,marginHorizontal:5}}/>
                 <Icon name='md-menu'  style={{color:'white',fontSize:25,}}/>
                 </View>
                }
                 containerStyle={{
                 backgroundColor: '#2aabe4',
                 justifyContent: 'space-around',
                 borderWidth:0,borderBottomColor:'#2aabe4'
                }}
              />
               
                   
    <View style = {{flex:1,alignItems:'center',PaddingHorizontal:10,paddingVertical:30,marginBottom:-50}}>
<Item  style ={{flexDirection:'row',borderColor: 'transparent',width:'100%',alignItems:'center',PaddingHorizontal:10,justifyContent:'space-evenly'}}>

<View style ={{flexDirection:'column',marginTop:'15%'}}>
            <Avatar
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
            />
             
</View>
</Item>
  </View>
  <View style = {{flex:1.8,backgroundColor:'transparent',margin:20,}}>
 <Item style ={{flexDirection:'row',borderColor: 'transparent',width:'100%'}}>
 <Left>
    <Input
      onChangeText={eid => this.setState({eid})}
      placeholder ='Employee ID No'
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
   />
 </Left>
     <Right>
     <Input
      onChangeText={ename => this.setState({ename})}
      placeholder ='Employee Name'
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
     />
    </Right>
</Item>

<Text></Text>
<Item style ={{flexDirection:'row',borderColor: 'transparent',width:'100%'}}>
 <Left>
    <Input
      onChangeText={eemail => this.setState({eemail})}
      placeholder ='Official Email'
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
   />
 </Left>
     <Right>
     <Input
      onChangeText={emobile => this.setState({emobile})}
      placeholder ='Contact Number'
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
     />
    </Right>
</Item>
      <Text></Text>
      <Item style ={{flexDirection:'row',borderColor: 'transparent',width:'100%'}}>
 <Left>
  <Text style={{ color: '#2aabe4', fontFamily: 'Roboto_Regular',fontSize:16 ,fontWeight:'bold',paddingLeft:8}}>VEHICLE DETAIL</Text>

 </Left>
     <Right>
     <Text style={{ color: '#2aabe4', fontFamily: 'Roboto_Regular',fontSize:16,fontWeight:'bold',paddingRight:8 }}>+ Add More</Text>
    </Right>
</Item>
   <Text></Text>
   {this.getVehicles()}
   <Text></Text>
   <Text></Text>
   <MyButton title="UPDATE" onPress = {this.validateInput}/>
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
export default EmpEditProfile;