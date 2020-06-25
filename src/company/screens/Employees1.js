import React from 'react';
import { View, Image, StatusBar ,StyleSheet,ImageBackground,Modal,ToastAndroid,Dimensions,TouchableOpacity,Linking} from 'react-native';
import { Avatar,Input,Lebal,Button ,CheckBox,Header} from 'react-native-elements';
import TextField from '../../common/components/input'
import MyButton from '../../common/components/Button'
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Right, Left, Footer,Body,Item,Card,CardItem,Text} from 'native-base';
import Loader from '../../common/components/Loader'
import AsyncStorage from '@react-native-community/async-storage';
import * as API from '../../api/index';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
const width = Dimensions.get('window').width;
const height =Dimensions.get('window').height;

class  Employees1 extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {  
           
          visible:false,
          doc1:'',
          doc1name:'',
          doc1type:'',
          id:'',
          token:'',
          url:'http://lubeatwork.markupdesigns.org/assets/boko.csv'

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

  
getFile =async()=>

{
  try {
    const res = await DocumentPicker.pick({
      type: DocumentPicker.types.allFiles,
    })
    if(res.name.split(".")[1] ==='csv'){
   console.log(res)
    this.setState({doc1:res.uri,
    doc1name:res.name,doc1type:res.type,visible:true})
    await this.UploadEmp()
    }
    else{
      this.showToastWithGravity("Only csv file type is supported ")
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.warn(err)
    } else {
      throw err;
    }
  }
}
UploadEmp = ()=>{
  
     const mydata = this.state
     const data = { 
        id:mydata.id,
        token:mydata.token,
        url:this.state.doc1,
        name:mydata.doc1name,
        type:mydata.doc1type
        }
    API.UploadEmp(data)
     .then(res => {
       console.warn('detailsdfd',res);
       this.setState({visible:false})
       if(res.status ==='Success'){
         this.setState({isVisible:false})
      this.props.navigation.navigate('Employees2')
       }
    })
}

componentDidMount = async () => {
   AsyncStorage.getItem("user_info").then((value) =>{
     const mydata = JSON.parse(value)
        this.setState({id:mydata.id,token:mydata.token})
console.warn(mydata.id)
    })
}
getSample = () => {
  Linking.canOpenURL(this.state.url).then(supported => {
    if (supported) {
      Linking.openURL(this.state.url);
    } else {
      console.log("Don't know how to open URI: " + this.props.url);
    }
  });
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

    render(){

        return(
             <ImageBackground source = {require('../../img/back3.png')} style = {{flex:1}}>
                 <Header
                 statusBarProps={{ barStyle: 'light-content' ,backgroundColor:"#2aabe4",translucent: true,}}
                //  leftComponent={ <Icon name='ios-arrow-back'  style={{color:'white',fontSize:25,left:5}}  onPress = {()=>this.props.navigation.goBack()}/>}
                 centerComponent={{ text: 'Employees', style: { color: '#fff',fontWeight:'bold',fontSize:20 } }}
                 rightComponent={ <View style = {{flexDirection:'row'}}>
                     <Icon name='ios-add'  style={{color:'white',fontSize:30,marginHorizontal:15}} onPress={()=>this.props.navigation.navigate('Employees2')}/>
                 <Icon name='md-menu'  style={{color:'white',fontSize:30,right:8}} onPress={()=>this.props.navigation.navigate('EMenu')}/>
                 </View>
                }
                 containerStyle={{
                 backgroundColor: '#2aabe4',
                 justifyContent: 'space-around',
                 borderWidth:0,borderBottomColor:'#2aabe4'
                }}
              />
               
               {/* <Modal transparent={true}
       visible={this.state.isVisible}
       onRequestClose={this.closeModal}>
  <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
    <View style={{
            width: '90%',
            marginHorizontal:20,
            height: height/3.5,backgroundColor:'white',justifyContent:'center',borderRadius:7}}>
      
      <Text style ={{textAlign:'center',alignItems:'center',alignSelf:'center',fontWeight:'bold',fontSize:25,color:'green'}}>Profile Updated Successfully!</Text>
    </View>
  </View>
</Modal>      */}
<Loader visible ={this.state.visible}/> 
    <View style = {{flex:0.5,alignItems:'center',PaddingHorizontal:10,paddingVertical:30,marginBottom:-50}}>
    


  </View>
  <View style = {{flex:3,backgroundColor:'transparent',margin:20,}}>
  <Card style = {{width:'100%',}}>
            <CardItem header>
             
            </CardItem>
            <CardItem>
              <Body>
                <Text style = {{fontSize:15,color:'grey'}}>
                 No employess added as of now.If you wish to add an employee then click
                  on plus icon (+) which is persent in the top right corner of the screen
                </Text>
                <Text></Text>
                <Text style = {{fontSize:15,color:'grey'}}>
                If you want to add multiples employee then you can uplad it in an XLS file
                </Text>
                <Text></Text>
                <Text style = {{fontSize:15,color:'grey'}}>
                Dowload the sample for your refrence by clicking on XLS sample hyperlink
                </Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                 <LinearGradient 
          
            colors={['#ebeae6','grey' ]}
            style={styles.LinearGradientStyle}  
            start={{x: 0, y: 1}} 
            end={{x: 1.5, y: 0.6}}
            locations={[0, 0.5]}
            >
 
              <Text style={styles.buttonText}>SEND APPLICATION LINK</Text>
                  
            </LinearGradient>
                {/* <MyButton title="SEND APPLICATION LINK" style = {{justifyContent:'center',alignItems:'center',paddingHorizontal:20}}/> */}
              </Body>
            </CardItem>
            <CardItem footer style = {{justifyContent:'space-between',paddingHorizontal:10,flexDirection:'row'}}>
            <TouchableOpacity onPress ={this.getSample}>
              <Text style = {{fontSize:13,color:'#2aabe4',fontWeight:'bold'}}>XLS Sample</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress ={this.getFile}>
              <Text style = {{fontSize:13,color:'#2aabe4',fontWeight:'bold'}}>Upload Employees</Text>
              </TouchableOpacity>
            </CardItem>
         </Card>
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
      LinearGradientStyle: {
    justifyContent:'center',
    borderRadius: 5,
    marginBottom: 20,
    alignItems:'center',
    alignSelf:'center',
    width:'100%'
  },

  buttonText: {
   fontSize: 18,
   fontWeight:'bold',
   textAlign: 'center',
   margin: 15,
   color : '#fff',
   backgroundColor: 'transparent' 
 
 },


  });
export default Employees1;