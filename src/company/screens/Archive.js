import React from 'react';
import { View, Image, StatusBar ,StyleSheet,ImageBackground,Modal,ToastAndroid,Dimensions,TouchableOpacity,FlatList} from 'react-native';
import { Avatar,Lebal,Button ,CheckBox,Header} from 'react-native-elements';
import TextField from '../../common/components/input'
import MyButton from '../../common/components/Button'
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../common/components/Loader'
import AsyncStorage from '@react-native-community/async-storage';
import * as API from '../../api/index';
import DocumentPicker from 'react-native-document-picker';
import LinearGradient from 'react-native-linear-gradient';
import { Right, Left, Footer,Body,Item,Card,CardItem,Text, Thumbnail,List,ListItem,Input} from 'native-base';
import ImagePicker from 'react-native-image-picker';
const width = Dimensions.get('window').width;
const height =Dimensions.get('window').height;

class  Archive extends React.Component{

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
          searchShow:false,
          visible2:false
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
  
  getArchive = ()=>{

    const mydata = this.state
     const data = { 
        id:mydata.id,
        token:mydata.token, 
        page:1
        }
    API.getArchive(data)
     .then(res => {
       console.warn('detail',res);
       const final = res['data']
       this.setState({visible:false,data:final,FreshDataList:final}) 
    })
}
componentDidMount = async () => {
   AsyncStorage.getItem("user_info").then((value) =>{
     const mydata = JSON.parse(value)
        this.setState({id:mydata.id,token:mydata.token})
        
this.getArchive()
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
  

UnBlockEmp = ()=>{
const mydata = this.state.Empdata
     const data = { 
        id:this.state.id,
        token:this.state.token, 
        eid:mydata.id
        }
          this.setState({visible2:true})
    API.UnBlockEmp(data)
     .then(res => {
       console.warn('detail',res);
       if(res.status ==='Success'){
         this.setState({visible2:false,msg:res.msg,isVisible:false})
          this.showToastWithGravity(res.msg)
    this.getArchive()
       }
    })
}
  openDetails = (item)=>{  
this.setState({isVisible:true,Empdata:item}) 
}
searchFilterFunction = (term) => {
  //console.log('term:', term)
  let FreshDataList = [...this.state.FreshDataList]
  if (term === '') {
      this.setState({ data:FreshDataList })
  } else {
      var term = term.toUpperCase()
      var filterList = FreshDataList.filter(item => {
          return item.name.toUpperCase().includes(term)
      })
      this.setState({ data: filterList })
  }
};
 
  
    render(){
      if(this.state.visible){

        return<Loader visible ={this.state.visible}/>
      }
        return(
             <ImageBackground source = {require('../../img/back3.png')} style = {{flex:1}}>
                
                {this.state.searchShow?
                 <Header
                 containerStyle={{
                  backgroundColor: '#2aabe4',
                 
                  width:'100%',
                  borderWidth:0,borderBottomColor:'#2aabe4'
                 }}
                 statusBarProps={{ barStyle: 'light-content' ,backgroundColor:"#2aabe4",translucent: true,}}
                 centerComponent={<Item style = {{width:'100%',borderWidth:0}}>
                   
                 <Input placeholder="Search" placeholderTextColor = "white" style = {{color:'white',padding:5}} onChangeText={text => this.searchFilterFunction(text)}/>
                 <Icon name="md-close" style={{fontSize:25,paddingHorizontal:15,color:'white'}} onPress = {()=>this.setState({searchShow:false})}/>
             </Item>}

rightContainerStyle = {{width:0}}
                />
                :
                
                 <Header
                 statusBarProps={{ barStyle: 'light-content' ,backgroundColor:"#2aabe4",translucent: true,}}
                //  leftComponent={ <Icon name='ios-arrow-back'  style={{color:'white',fontSize:25,left:5}} onPress = {()=>this.props.navigation.goBack()}/>}
                 centerComponent={{ text: 'Archive', style: { color: '#fff',fontWeight:'bold',fontSize:20 } }}
                 rightComponent={ <View style = {{flexDirection:'row'}}>
                      <Icon name='ios-search'  style={{color:'white',fontSize:28,marginHorizontal:15}}  onPress = {()=>this.setState({searchShow:true})}/>
                     {/* <Icon name='ios-add'  style={{color:'white',fontSize:30,right:10}} onPress={()=>this.props.navigation.navigate('AddEmp')}/> */}
                 <Icon name='md-menu'  style={{color:'white',fontSize:30,right:5}} onPress={()=>this.props.navigation.navigate('EMenu')}/>
                 </View>
                }
                 containerStyle={{
                 backgroundColor: '#2aabe4',
                 justifyContent: 'space-around',
                 borderWidth:0,borderBottomColor:'#2aabe4'
                }}
              />}
               <Loader visible ={this.state.visible}/> 
               <Loader visible ={this.state.visible2}/> 
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
              Are you sure you want to unblock the employee?   </Text>
          <Text></Text> 
          <Text></Text> 
          <View style={styles.MainContainer}>
          <TouchableOpacity  onPress = {this.UnBlockEmp}>
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
  <View style = {{flex:3.2,backgroundColor:'white',borderWidth:0.5,borderColor:'grey',opacity:0.8}}>
     {this.state.data.length<1?<Text style = {{alignItems:'center',textAlign:'center',padding:20}}> 
     No Record Found
     </Text>:<FlatList
          data={this.state.data}
        showsHorizontalScrollIndicator ={false}
        showsVerticalScrollIndicator = {false}
        ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <List >
            <ListItem noBorder avatar>
              <Left>
              <Thumbnail source={item.avatar ===null?require('../../img/profile.png') :{uri:"https://lubeatwork.markupdesigns.org/assets/employee/"+item.avatar} } />
              </Left>
              <Body>
              <Text style = {{color:'#373737',fontSize:12}} >{item.username}</Text>
              <Text style = {{color:'#373737',fontSize:12}} >{item.name}</Text>
                <Text style = {{color:'#373737',fontSize:12}}>{item.email}</Text>
                <Text style = {{color:'#373737',fontSize:12}}>{item.mobile}</Text>
              </Body>
              <Right>
                <TouchableOpacity
           onPress={()=>this.openDetails(item)}
          style ={{width: 50,
         height: 50,
       borderRadius: 50/2,backgroundColor:'#2aabe4',alignItems:'center',justifyContent:'center'}}>
<Image source={require('../../img/block.png')} style={{ maxHeight: 23, maxWidth: 23,resizeMode:'cover' }} />
         </TouchableOpacity>
              </Right>
            </ListItem>
           </List>
           )}
          keyExtractor={(item, index) => index.toString()}
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
export default Archive;