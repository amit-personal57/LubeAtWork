import React from 'react';
import { View, Image, StatusBar ,Text,StyleSheet,ImageBackground,ToastAndroid,Dimensions,TouchableOpacity} from 'react-native';
import { Avatar,Input,Lebal,Button ,CheckBox,Header} from 'react-native-elements';
import TextField from '../../common/components/input'
import MyButton from '../../common/components/Button'
import Loader from '../../common/components/Loader'
import Icon from 'react-native-vector-icons/Ionicons';
import { Right, Left, Footer,Body,Item} from 'native-base';
import ImagePicker from 'react-native-image-picker';

const width = Dimensions.get('window').width;
const height =Dimensions.get('window').height;

class EProfile2 extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {  
           cname:'',
           cno:'',
           cvv:'',
           edate:'',
           visible:true

        }     
    }
validateInput = ()=>{
const {cname}  = this.state ;
const {cno}  = this.state ;
const {cvv}  = this.state ;
const {edate}  = this.state ;
 if(cno ===""){
 this.showToastWithGravity("Enter Card Number")
return false;
}
else if(cname ===""){
 this.showToastWithGravity("Enter Card Holder Name")
return false;
}
else if(cno ===""){
 this.showToastWithGravity("Enter Card Number")
return false;
}
else if(edate ===""){
 this.showToastWithGravity("Enter Expiry/Validity Date")
return false;
}
else if(cvv ===""){
 this.showToastWithGravity("Enter CVV")
return false;
}
else
this.props.navigation.navigate('CMenu')
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
  componentDidMount() {
    setInterval(() => {
      this.setState({
        visible: false
      });
    }, 30000);
  }
    render(){

        return(
             <ImageBackground source = {require('../../img/login_back.png')} style = {{flex:1}}>
           
                 <Header
                 statusBarProps={{ barStyle: 'light-content' ,backgroundColor:"#2aabe4",translucent: true,}}
                 leftComponent={ <Icon name='ios-arrow-back'  style={{color:'white',fontSize:25}}/>}
                 centerComponent={{ text: 'Complete Your Profile', style: { color: '#fff',fontWeight:'bold',fontSize:20 } }}
                 containerStyle={{
                 backgroundColor: '#2aabe4',
                
                
                 borderWidth:0,borderBottomColor:'#2aabe4'
                }}
              />
               
                
    <View style = {{flex:1,alignItems:'center',PaddingHorizontal:10,paddingVertical:30}}>
 
  </View>
  <View style = {{flex:3,backgroundColor:'transparent',margin:20,}}>
  
      <TextField
      onChangeText={cno => this.setState({cno})}
      placeholder ='Card Number'
      returnKeyType={'next'}
     keyboardType={'phone-pad'}
        />
        <Text></Text>
        <TextField
      onChangeText={cname => this.setState({cname})}
      placeholder ='Card Holder Name'
        />
   
        <Text></Text>
<Item style ={{flexDirection:'row',borderColor: 'transparent',width:'100%'}}>
 <Left>
    <Input
      onChangeText={edate => this.setState({edate})}
      placeholder ='Expiry/Validity Date'
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
   />
 </Left>
     <Right>
     <Input
      onChangeText={cvv => this.setState({cvv})}
      placeholder ='CVV'
      inputStyle={{color:'#242424',fontSize:15,fontWeight:'bold',padding: 0}}
      inputContainerStyle = {{borderBottomColor:'#2aabe4',padding: 0}}
       returnKeyType={'next'}
     keyboardType={'phone-pad'}
     />
    </Right>
</Item> 
       <Text></Text> 
      
   <Text></Text>
   <MyButton title="SUBMIT" onPress = {this.validateInput}/>
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
      lottie: {
        width: 100,
        height: 100
      }

  });
export default EProfile2;