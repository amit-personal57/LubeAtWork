import React from 'react';
import { View, Image, StatusBar ,Text,StyleSheet,ImageBackground,ToastAndroid,Dimensions,TouchableOpacity,} from 'react-native';
import { Avatar,Input,Lebal,Button ,CheckBox,Header} from 'react-native-elements';
import TextField from '../../common/components/input'
import MyButton from '../../common/components/Button'
import MyModal from '../../common/components/Modal'
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../common/components/Loader'
import * as API from '../../api/index';
import moment from 'moment';
import { Right, Left, Footer,Body,Item} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker'
const width = Dimensions.get('window').width;
const height =Dimensions.get('window').height;

class EditCProfile2 extends React.Component{

    constructor(props){
        super(props);
        
        this.state = { 
            availability: [], 
           timing: [],
           id:[],
            token:'',
            profileData:{},
            visible:true,
            modalShow:false

        }     
    }
validateInput = ()=>{
return true
}
  setAvailability(stateValue, key, field) {
    var timing = [...this.state.timing];
        
        if (field == "day") {
         
            timing[key].checked = !stateValue;
        }
        
        if (field == "start_time") {
          if(timing[key].checked ===false)
          {
            return false
          }
           timing[key].start_display_time = this.getTwentyFourHourTime(stateValue);;
           timing[key].start_time = this.getTwentyFourHourTime(stateValue);
        }
        if (field == "end_time") {
          if(timing[key].checked ===false)
          {
            return false
          }

           timing[key].end_display_time = this.getTwentyFourHourTime(stateValue);;
           timing[key].end_time = this.getTwentyFourHourTime(stateValue);
        }
        console.log(timing[key])
        this.setState({timing})
        // this.forceUpdate()
    }

componentDidMount = async () => {
  let profileData = this.props.navigation.state.params.data
   AsyncStorage.getItem("user_info").then((value) =>{
     const mydata = JSON.parse(value)
        this.setState({id:mydata.id,profileData:profileData,token:mydata.token,timing:profileData.timing,visible:false})
    })
}
 profileSubmit=()=>{
  if(this.validateInput()){
  console.log(this.state.profileData.cphoto);
    
      const mydata = this.state.profileData
       const data = { clogo:mydata.clogo,
          cphoto:mydata.cphoto,
          cname:mydata.cname,
          cmobile:mydata.cmobile,
          cemail:mydata.cemail,
          tin:mydata.tin,
          cid:mydata.cid,
          cperson:mydata.cperson,
          Vehicles:mydata.Vehicles,
          caddress:mydata.caddress,
          timing:this.state.timing,
          id:this.state.id,
          token:this.state.token
          
          }
     this.setState({visible:true})
      API.submitEditProfile(data)
       .then(res => {
         this.setState({visible:false,modalShow:true})
         console.warn('Profiledata',res);
         setTimeout(this.handleClose, 3000)    
      })
  }
}
handleClose = ()=>{
  this.setState({modalShow:false})
  this.props.navigation.navigate('EMenu')
}
getTwentyFourHourTime(amPmString) { 
  
  return moment(amPmString, ["hh:mm"]).format("HH:mm");
}
    printAvailability() {
        return this.state.timing.map((item, key) => {
            var checkStatus = this.state.timing[key].checked;
            var startTime = this.state.timing[key].start_display_time;
            var endTime = this.state.timing[key].end_display_time;
            return (

                <View key={key} style={[{flex:1,backgroundColor: '#fff',padding:5},styles.twoRow]}>
                   <View style={styles.threeRow}>
                        <CheckBox
                            containerStyle={{padding:0,borderWidth:0,marginHorizontal:0,backgroundColor:'transparent'}}
                            textStyle={{fontWeight:'normal',padding:0,fontSize:11}}
                            title={item.day}
                            checked={checkStatus}
                            uncheckedColor = "black"
                            checkedColor="#2aabe4"
                            size = {18}
                            checkedIcon='check-square'
                            uncheckedIcon = 'check-square'
                            onPress={() => this.setAvailability(checkStatus, key, 'day')}
                        />
                   </View>
                   <View>
                        <DatePicker
                            style={{width:90}}
                            mode="time"
                            is24Hour={true}
                            date={startTime}
                            format='HH:mm'
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            local = "en_GB"
                            onDateChange={(date) =>{this.setAvailability(date, key, 'start_time') }}
                            iconComponent={
                                <Icon
                                    size={0}
                                    name='ios-check-square'
                                    type='font-awesome'
                                    containerStyle={styles.dateIcon}
                                />
                            }
                            customStyles={{
                                dateText: styles.dateText,
                                dateInput: {borderWidth:0,backgroundColor:'#ecf0f1',margin:5}
                            }}
                        />
                   </View>
                   <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:12}}>TO</Text>
                   </View>
                   <View>
                        <DatePicker
                            style={{width:90}}
                            mode="time"
                            is24Hour={true}
                            date={endTime}
                            //placeholder="HH:MM"
                            format='HH:mm'
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(end_time) => { this.setAvailability(end_time, key, 'end_time') }}
                            iconComponent={
                                <Icon
                                    size={0}
                                    name='clock-o'
                                    type='font-awesome'
                                    containerStyle={styles.dateIcon}
                                />
                            }
                            customStyles={{
                              dateText: styles.dateText,
                              dateInput: {borderWidth:0,backgroundColor:'#ecf0f1',margin:5}
                          }}
                        />
                   </View>
                </View>
            )
        })
    }
 
    render(){

        return(
             <ImageBackground source = {require('../../img/login_back.png')} style = {{flex:1}}>
            <Header
                 statusBarProps={{ barStyle: 'light-content' ,backgroundColor:"#2aabe4",translucent: true,}}
                 leftComponent={ <Icon name='ios-arrow-back'  style={{color:'white',fontSize:25,left:5}} onPress = {()=>this.props.navigation.goBack()}/>}
                 centerComponent={{ text: 'Edit Your Profile', style: { color: '#fff',fontWeight:'bold',fontSize:20 } }}
                 rightComponent={ <View style = {{flexDirection:'row'}}>
                     {/* <Icon name='ios-create'  style={{color:'white',fontSize:25,marginHorizontal:5}}/> */}
                 <Icon name='md-menu'  style={{color:'white',fontSize:25,right:10}} onPress={()=>this.props.navigation.navigate('EMenu')}/>
                 </View>
                }
                 containerStyle={{
                 backgroundColor: '#2aabe4',
                 justifyContent: 'space-around',
                 borderWidth:0,borderBottomColor:'#2aabe4'
                }}
              />
               
      <Loader visible ={this.state.visible}/>   
             
    <View style = {{flex:1,alignItems:'center',PaddingHorizontal:10,paddingVertical:20,}}>

  </View>
  <View style = {{flex:3,backgroundColor:'transparent',margin:20,}}>
    <View style = {{backgroundColor:'#ecf0f1',justifyContent:'space-between',flexDirection:'row',padding:15,}}>
    <Text style = {{fontWeight:'bold',fontSize:13}}>Weeks</Text>
    <Text style = {{fontWeight:'bold',fontSize:13}}>Time duration(in 24 format)</Text>
    </View>
  {this.printAvailability()}
      <Text></Text> 
      <Text></Text>
   <MyButton title="SUBMIT" onPress = {this.profileSubmit}/>
 </View>
  <MyModal visible = {this.state.modalShow} msg = "Updated Successfully"/> 
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
      twoRow: {
        flexDirection: 'row',
        flex:1,
        justifyContent:'space-between'
      },
      sectionRow:{
        flexDirection:'row',
      },
      threeRow: {
        width:'30%'
      },  
      sectionColumn: {
        flex:1,
        marginHorizontal:10,
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        
      },
      sectionBorder: {
        margin:10,
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        paddingBottom:10,
      },  
      borderNone: {
        borderWidth:0,
        borderColor:'#FFF'
      },
      thriceRow: {
        width:'29%'
      },
      halfRow: {
        width:"46%",
      },
      dateInput:{
        alignItems: 'flex-start',
        paddingLeft:30,
        borderWidth:0,
      },
      dateText:{
         fontSize:12 
      },
      dateIcon: {
        position:'absolute',
        left:0,
        
      },

  });
export default EditCProfile2;