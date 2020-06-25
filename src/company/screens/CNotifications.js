import React from 'react';
import { View, Image, StatusBar ,StyleSheet,ImageBackground,Modal,ToastAndroid,Dimensions,TouchableOpacity,FlatList} from 'react-native';
import { Avatar,Input,Lebal,Button ,CheckBox,Header} from 'react-native-elements';
import TextField from '../../common/components/input'
import MyButton from '../../common/components/Button'
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../common/components/Loader'
import AsyncStorage from '@react-native-community/async-storage';
import * as API from '../../api/index';
import DocumentPicker from 'react-native-document-picker';
import LinearGradient from 'react-native-linear-gradient';
import { Right, Left, Footer,Body,Item,Switch,Text, Thumbnail,List,ListItem} from 'native-base';
import ImagePicker from 'react-native-image-picker';
const width = Dimensions.get('window').width;
const height =Dimensions.get('window').height;

const data = [{"id":"1","msg":"my new meesages about query "},{"id":"2","msg":"processing your order "},{"id":"3","msg":"my new meesages about query "}
,{"id":"4","msg":"how are you boy"},{"id":"5","msg":"my new meesages about query "}
]

class  CNotifications extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {  
           data:[],
           visible:true,
             doc1:'',
          doc1name:'',
          doc1type:'',
          Empdata:{},
          token:'',
          id:'',
          isVisible:false,
          isEnabled:false
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
  
  getNotifications = ()=>{

    const mydata = this.state
     const data = { 
        id:mydata.id,
        token:mydata.token, 
        page:1
        }
    API.getNotifications(data)
     .then(res => {
       console.warn('detail',res);
       const final = res['data']
       this.setState({visible:false,data:final})  
    })
}

StopNotification=()=>{
  this.setState({isEnabled:!this.state.isEnabled,isVisible:false})
  const mydata = this.state
   const data = { 
      id:mydata.id,
      token:mydata.token
      }
  API.StopNotification(data)
   .then(res => {
     console.warn('Notifcation',res);
     if(res.status ==='Success'){
       this.setState({isVisible:false})
       this.showToastWithGravity(res.msg + " " +  "Successfully")
    
     }
  })
}
componentDidMount = async () => {
   AsyncStorage.getItem("user_info").then((value) =>{
     const mydata = JSON.parse(value)
        this.setState({id:mydata.id,token:mydata.token,isEnabled:mydata.push ==='1'?true:false})
this.getNotifications()

    })
}


  renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'grey',
        height: 0.3,
      }}
    />
  )
  
  toggleSwitch = ()=>{
     this.setState({isVisible:true})
  }

  
    render(){
      if(this.state.visible){

        return<Loader visible ={this.state.visible}/>
      }
        return(
             <ImageBackground source = {require('../../img/back3.png')} style = {{flex:1}}>
                 <Header
                 statusBarProps={{ barStyle: 'light-content' ,backgroundColor:"#2aabe4",translucent: true,}}
                //  leftComponent={ <Icon name='ios-arrow-back'  style={{color:'white',fontSize:25,left:5}} onPress = {()=>this.props.navigation.goBack()}/>}
                 centerComponent={{ text: 'Notifications', style: { color: '#fff',fontWeight:'bold',fontSize:20 } }}
                 rightComponent={ <View style = {{flexDirection:'row',justifyContent:'space-around'}}>
                 <TouchableOpacity style = {{alignContent:'center',alignItems:'center',justifyContent:'center',marginHorizontal:8,right:8}} onPress = {this.toggleSwitch}>
                      {this.state.isEnabled?<Image source={require('../../img/switchon.png')}  style={{ maxHeight: 20, maxWidth: 35,resizeMode:'cover' }} />:
                     
                     <Image source={require('../../img/switchoff.png')} style={{ maxHeight: 20, maxWidth: 35,resizeMode:'cover' }} />}
                      </TouchableOpacity>
                     {/* <Icon name='ios-add'  style={{color:'white',fontSize:30,right:10}} onPress={()=>this.props.navigation.navigate('AddEmp')}/> */}
                 <Icon name='md-menu'  style={{color:'white',fontSize:30,right:5,}} onPress={()=>this.props.navigation.navigate('EMenu')}/>
                 </View>
                }
                 containerStyle={{
                 backgroundColor: '#2aabe4',
                 justifyContent: 'space-around',
                 borderWidth:0,borderBottomColor:'#2aabe4'
                }}
              />
           
               <Loader visible ={this.state.visible}/> 
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
      {this.state.isEnabled?<Text style = {{fontSize:23,color:'#272727',textAlign:'center',alignItems:'center',alignSelf:'center'}}>
              Are you sure you want to unmute notifications?   </Text>:
              <Text style = {{fontSize:23,color:'#272727',textAlign:'center',alignItems:'center',alignSelf:'center'}}>
              Are you sure you want to mute notifications?  </Text>
              }
          <Text></Text> 
          <Text></Text> 
          <View style={styles.MainContainer}>
          <TouchableOpacity  onPress = {this.StopNotification}>
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
    <View style = {{flex:0.5,alignItems:'center',PaddingHorizontal:10,paddingVertical:30,marginBottom:-50}}>
  </View>
  <View style = {{flex:3.2}}>
  <Text style = {{alignItems:'center',textAlign:'left',padding:20,opacity:0.8}}> 
  Announcement from admin
     </Text>
     {this.state.data.length<1?<Text style = {{alignItems:'center',textAlign:'center',padding:20}}> 
     No Record Found
     </Text>:<FlatList
          data={this.state.data}
        showsHorizontalScrollIndicator ={false}
        showsVerticalScrollIndicator = {false}
          renderItem={({ item ,index}) => (
            <List style = {{backgroundColor:'transparent'}}>
            <ListItem noBorder style = {{backgroundColor:index%2===0?'#fcfbfa':'#2aabe4',margin:10,borderRadius:8}}>
              
                <Text style = {{color:index%2===0?'#70685f':'white',fontSize:13,padding:8,textAlign:'justify',alignContent:'flex-start',justifyContent:'flex-start'}}>{item.msg}</Text>
        
             
            </ListItem>
           </List>
           )}
          keyExtractor={(item, index) => index.toString()}
          style = {{margin:2}}
        /> }  
 </View>
 <View style = {{flex:0.8}}>
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
      

  });
export default CNotifications;