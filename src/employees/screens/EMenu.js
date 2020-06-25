import React from 'react';
import { View, Image, StatusBar ,Text,StyleSheet,FlatList,ImageBackground,ToastAndroid,Dimensions,TouchableOpacity,Modal} from 'react-native';
import { Avatar,Input,Lebal,Button ,CheckBox,Header} from 'react-native-elements';
import TextField from '../../common/components/input'
import MyButton from '../../common/components/Button'
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import * as API from '../../api/index';
import { Right, Left, Footer,Body,Item} from 'native-base';
import ImagePicker from 'react-native-image-picker';
const width = Dimensions.get('window').width;
const height =Dimensions.get('window').height;

class EMenu extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {  
           id:'',
         loading:true,
         clogo:'',
         isVisible:false,
         token:"",
         avatar:'',
         noEmp:null
        }     
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
    
   openDetails = (item)=>{
if(item.id ==='1'){
  if(this.state.noEmp <1){
    this.props.navigation.navigate('Employees1')
  }
  else{
    this.props.navigation.navigate('Employees2')
  }

}
else if(item.id ==='2'){
  this.props.navigation.navigate('CNotifications')
}
else if (item.id ==='3'){
  this.props.navigation.navigate('Archive')
}
else if(item.id ==='4'){
  this.props.navigation.navigate('BookingRequest')  //ChangePass
}
else if(item.id ==='5'){
  this.setState({isVisible:true})

 
}
   }
  
   logOut=()=>{
      const mydata = this.state
       const data = { 
          id:mydata.id,
          token:mydata.token
          }
      API.Logout(data)
       .then(res => {
         console.warn('logindetail',res);
         if(res.status ==='Success'){
           this.setState({isVisible:false})
         this.props.navigation.navigate('LoginTack')
         }
      })
}
componentDidMount = async () => {
 
   await AsyncStorage.getItem("user_info").then((value) =>{
     const mydata = JSON.parse(value)
        this.setState({id:mydata.id,token:mydata.token,noEmp:mydata.noEmp})
        const  data = {id:mydata.id,token:mydata.token}
API.EditCProfile(data)
.then(res => {
  console.warn("data"+res)
   if (res.success ===true) {
    let response = res['data']
    console.warn(response.avatar)   
  this.setState({visible:false,avatar:response.avatar})
   }
   })})
}
  
    render(){
const data = [{"id":"1","path":require('../../img/Employees.png'),"name":'Employees'},
{"id":"2","path":require('../../img/Notifications.png'),"name":"Notifications"},
{"id":"3","path":require('../../img/Archieve.png'),"name":"Archive"},
{"id":"4","path":require('../../img/password.png'),"name":"Change Password"},
{"id":"5","path":require('../../img/logout.png'),"name":"Logout"},
]
        return(
             <ImageBackground source = {require('../../img/back3.png')} style = {{flex:1}}>
                 <Header
                 statusBarProps={{ barStyle: 'light-content' ,backgroundColor:"#2aabe4",translucent: true,}}
                //  leftComponent={ <Icon name='ios-arrow-back'  style={{color:'white',fontSize:25}}/>}
                 centerComponent={{ text: 'Menu Options Madarchod', style: { color: '#fff',fontWeight:'bold',fontSize:20 } }}
                 containerStyle={{
                 backgroundColor: '#2aabe4',
                 justifyContent: 'space-around',
                 borderWidth:0,borderBottomColor:'#2aabe4'
                }}
              />
               
    <Modal transparent={true}
       visible={this.state.isVisible}
       onRequestClose={this.closeModal}>
  <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
    <View style={{
            width: '90%',
            marginHorizontal:30,
            height: height/3.5,backgroundColor:'white',alignItems:'center',borderRadius:7,padding:20}}>
      
         <Text></Text>
      <Text style = {{fontSize:23,color:'#272727',textAlign:'center',alignItems:'center',alignSelf:'center'}}>
              Are you sure  you want to logout?</Text>
          <Text></Text> 
          <Text></Text> 
          <View style={styles.MainContainer}>
          <TouchableOpacity  onPress = {this.logOut}>
            <LinearGradient  colors={['#1282c1', '#01c0dc']} style={styles.LinearGradientStyle} >
              <Text style={styles.buttonText}>YES</Text>   
            </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>this.setState({isVisible:false})}>
            <LinearGradient 
            colors={['#b29d1c', '#d2b500']}
            style={styles.LinearGradientStyle}  
            start={{x: 0, y: 1}} 
            end={{x: 1, y: 0.9}}
            locations={[0, 0.3,]} >
              <Text style={styles.buttonText}> NO</Text>   
            </LinearGradient>
        </TouchableOpacity>
      </View>      
    </View>
  </View>
</Modal>
    <View style = {{flex:1,alignItems:'center',PaddingHorizontal:10,paddingVertical:30,marginBottom:-50}}>
<Item  style ={{flexDirection:'row',borderColor: 'transparent',width:'100%',alignItems:'center',PaddingHorizontal:10,justifyContent:'space-evenly'}}>
<View style ={{flexDirection:'column',marginTop:'0.5%'}}>
{/* <Avatar
              size={130}
              onEditPress={()=> this.props.navigation.navigate('EditCProfile')}
              overlayContainerStyle={{ backgroundColor: '#FFF',borderColor: '#2aabe4', }}          
              rounded
              showEditButton = {false}
              containerStyle={{ borderColor: '#2aabe4', borderWidth: 1, alignSelf: 'center',backgroundColor:'white'}}
              source={this.state.avatar != '' ? { uri:"https://lubeatwork.markupdesigns.org/"+this.state.avatar} : require('../../img/profile.png')}
              imageProps={{ resizeMode: 'cover' ,borderColor: 'black'}}
              showEditButton
              iconStyle = {{backgroundColor:'#2aabe4'}}
              editButton = {{ name: 'mode-edit', type: 'material', color: '#2aabe4',size:25,containerStyle:{backgroundColor:'white',borderColor:'#2aabe4',borderRadius:12} }}
            /> */}
    
        <ImageBackground
             source={this.state.avatar != '' ? { uri:"https://lubeatwork.markupdesigns.org/assets/company/"+this.state.avatar} : require('../../img/profile.png')}
            style={{
               width: 140, height: 140, 
            }}
            imageStyle={{borderRadius: 140/2}}
        >
          <TouchableOpacity  style={{ height: 32, width: 32, position: 'absolute',backgroundColor:'white',
      right: -15,
      marginBottom:140/4,
      alignContent:'center',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:32/2,
      bottom: 0 }}
      onPress={()=> this.props.navigation.navigate('EditCProfile')}
      >
          <Image source={require('../../img/editP.png')} style={{ maxHeight: 23, maxWidth: 23,resizeMode:'cover',padding:5 }} />
          </TouchableOpacity>
        
      </ImageBackground>
             
</View>
</Item>
  </View>
  <View style = {{flex:3,backgroundColor:'transparent',margin:20,}}>
  <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={{ flex:0.5,height:150,margin:10 ,justifyContent: "center",
            alignItems: 'center', backgroundColor:'white',borderColor:'grey',borderWidth:0.3,borderRadius:10}}>
             <TouchableOpacity  onPress = {()=>this.openDetails(item)}>
             <Image style={styles.imageThumbnail2} source={item.path} />
             </TouchableOpacity>
          <Text style = {{fontWeight:'bold'}}>{item.name}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator ={false}
          showsVerticalScrollIndicator = {false}
          numColumns={2}
          columnWrapperStyle={{justifyContent:'space-between'}}
          keyExtractor={(item, index) => index.toString()}
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
      imageThumbnail2: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        resizeMode:'contain',
        padding:10
      },
      MainContainer :{

        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
        
    
      },
    
      LinearGradientStyle: {
        height: 50,
        borderRadius: 5,
        marginBottom: 20,
        width:150,
        margin:10
      },
    
      buttonText: {
       fontSize: 18,
       textAlign: 'center',
       margin: 12,
       fontWeight:'bold',
       color : '#fff',
       backgroundColor: 'transparent' 
     
     },
     icon: {
      backgroundColor: '#ccc',
     
     }

  });
export default EMenu;