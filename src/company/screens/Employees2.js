import React from 'react';
import { View, Image, StatusBar ,StyleSheet,ImageBackground,Modal,ToastAndroid,Dimensions,TouchableOpacity,FlatList,Linking, Alert} from 'react-native';
import { Avatar,Lebal,Button ,CheckBox,Header,SearchBar} from 'react-native-elements';
import TextField from '../../common/components/input'
import MyButton from '../../common/components/Button'
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../common/components/Loader'
import AsyncStorage from '@react-native-community/async-storage';
import * as API from '../../api/index';
import DocumentPicker from 'react-native-document-picker';
import { Right, Left, Footer,Body,Item,Card,CardItem,Text, Thumbnail,List,ListItem,Input} from 'native-base';
import ImagePicker from 'react-native-image-picker';
const width = Dimensions.get('window').width;
const height =Dimensions.get('window').height;

class  Employees2 extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {  
           data:[],
           visible:true,
             doc1:'',
          doc1name:'',
          doc1type:'',
          token:'',
          id:'',
          isFetching:false,
          searchShow:false,
          search:'',
          FreshDataList:[],
          url:'http://lubeatwork.markupdesigns.org/assets/boko.csv'
        }   
        
        this.getEmp()
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
  
  onRefresh() {
    this.setState({ isFetching: true }, function() { this.getEmp() });
 }
  getEmp = ()=>{

    const mydata = this.state
     const data = { 
        id:mydata.id,
        token:mydata.token, 
        page:1
        }
    API.GetEmp(data)
     .then(res => {
       console.warn('detail',res);
       const final = res['data']
       this.setState({visible:false,data:final,isFetching:false,FreshDataList:final})
       
    })

}
componentDidMount = async () => {
   AsyncStorage.getItem("user_info").then((value) =>{
     const mydata = JSON.parse(value)
        this.setState({id:mydata.id,token:mydata.token})
this.getEmp()
    })
}

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

  renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'grey',
        height: 0.3,
      }}
    />
  )

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
       console.warn('detail',res);
       this.setState({visible:false})
       if(res.status ==='Success'){
         this.setState({visible:false})
     this.getEmp()
       }
    })
}   
   getSample = () => {
  Linking.canOpenURL(this.state.url).then(supported => {
    if (supported) {
      Linking.openURL(this.state.url);
    } else {
     this.showToastWithGravity('Somthing went wrong')
    }
  });
};

SendLink = (mydata)=>{
     const data = { 
         id:this.state.id,
        token:this.state.token, 
        eid:mydata.id
        }
         this.setState({visible:true})
    API.SendLink(data)
     .then(res => {
       console.warn('detail',res);
       if(res.status ==='Success'){
         this.setState({visible:false,msg:res.msg})
         this.showToastWithGravity(res.msg)
     this.getEmp()
       }    
    })}


    SendToAllLink = ()=>{
      const data = { 
          id:this.state.id,
         token:this.state.token, 
      
         }
          this.setState({visible:true})
     API.SendToAllLink(data)
      .then(res => {
        console.warn('detail',res);
        if(res.status ==='Success'){
          this.setState({visible:false,msg:res.msg})
          
      this.getEmp()
        }  
        else{
          this.setState({visible:false,msg:res.msg})
          this.showToastWithGravity(res.msg)
        }  
     })}
BlockEmp = (mydata)=>{
     const data = { 
        id:this.state.id,
        token:this.state.token, 
        eid:mydata.id
        }
         this.setState({visible:true})
    API.BlockEmp(data)
     .then(res => {
       console.warn('detail',res);
       if(res.status ==='Success'){
         this.setState({visible:false,msg:res.msg})
          this.showToastWithGravity(res.msg)
     this.getEmp()
       }
       
    })

}
  openDetails = (item)=>{  
if(item.send_link ==='0'){

  this.SendLink(item)
}
else if(item.complete ==='1'){

  this.BlockEmp(item)  
}
else {
  return false
} 
}
   
OpenEmp = (item)=>{
  this.props.navigation.navigate('EditEmp',{data:item})
}
  
updateSearch = search => {
  this.setState({ search });
};

    render(){
        
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
                :<Header
                 statusBarProps={{ barStyle: 'light-content' ,backgroundColor:"#2aabe4",translucent: true,}}
                //  leftComponent={ <Icon name='ios-arrow-back'  style={{color:'white',fontSize:25,left:5}}  onPress = {()=>this.props.navigation.goBack()}/>}
                 centerComponent={{ text: 'Employees', style: { color: '#fff',fontWeight:'bold',fontSize:20 } }}
                 rightComponent={ <View style = {{flexDirection:'row'}}>
                    <Icon name='ios-search'  style={{color:'white',fontSize:28,marginHorizontal:5}}  onPress = {()=>this.setState({searchShow:true})}/>
                     <Icon name='ios-add'  style={{color:'white',fontSize:30,marginHorizontal:5}} onPress={()=>this.props.navigation.navigate('AddEmp')}/>
                 <Icon name='md-menu'  style={{color:'white',fontSize:30,right:5,marginHorizontal:10}} onPress={()=>this.props.navigation.navigate('EMenu')}/>
                 </View>
                }
                 containerStyle={{
                 backgroundColor: '#2aabe4',
                 justifyContent: 'space-around',
                 borderWidth:0,borderBottomColor:'#2aabe4'
                }}
              />}
                 


               <Loader visible ={this.state.visible}/> 
         
    <View style = {{flex:0.7,PaddingHorizontal:10,paddingVertical:30,marginBottom:-50}}>

  </View>
  <View style = {{flex:4,backgroundColor:'white',borderWidth:0.5,borderColor:'grey',opacity:0.8}}>
  <FlatList
          data={this.state.data}
         showsHorizontalScrollIndicator ={false}
         onRefresh={() => this.onRefresh()}
         refreshing={this.state.isFetching}
         showsVerticalScrollIndicator = {false}
         ItemSeparatorComponent={this.renderSeparator}
         renderItem={({ item }) => (
            <List >
            <ListItem noBorder avatar>
              <Left>
              <Thumbnail source={item.avatar ===null?require('../../img/profile.png') :{uri:"https://lubeatwork.markupdesigns.org/assets/employee/"+item.avatar} } />
              </Left>
              <Body>
                <TouchableOpacity onPress = {()=>this.OpenEmp(item)}>
              <Text style = {{color:'#373737',fontSize:12}} >{item.username}</Text>
              <Text style = {{color:'#373737',fontSize:12}} >{item.name}</Text>
                <Text style = {{color:'#373737',fontSize:12}}>{item.email}</Text>
                <Text style = {{color:'#373737',fontSize:12}}>{item.mobile}</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <TouchableOpacity
                onPress={()=>this.openDetails(item)}
                 style ={{width: 50,height: 50, borderRadius: 50/2,backgroundColor:'#2aabe4',alignItems:'center',justifyContent:'center'}}>
                 
 {item.send_link==='1' && item.complete ==='0' ?<Icon name='md-checkmark' style={{color:'white',fontSize:25}} />
 :item.send_link==='0' && item.complete ==='0'?<Icon name='ios-mail' style={{color:'white',fontSize:25}}/>: 
 <Image source={require('../../img/block.png')} style={{ maxHeight: 23, maxWidth: 23,resizeMode:'cover' }} />}  
    </TouchableOpacity>
              </Right>
            </ListItem>
           </List> )}
          keyExtractor={(item, index) => index.toString()}
        />
        <MyButton title="SEND APPLICATION LINK"  onPress = {this.SendToAllLink} style = {{marginHorizontal:20,top:8}}/>
   <View footer style = {{justifyContent:'space-between',paddingHorizontal:10,flexDirection:'row',padding:10}}>
              <TouchableOpacity onPress ={this.getSample}>
              <Text style = {{fontSize:13,color:'#2aabe4',fontWeight:'bold'}}>XLS Sample</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress ={this.getFile}>
              <Text style = {{fontSize:13,color:'#2aabe4',fontWeight:'bold'}}>Upload Employees</Text>
              </TouchableOpacity>
            </View>
           
 </View>
 <View style = {{flex:0.8,}}>


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
export default Employees2;