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
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BookingPast from '../screens/BookingPast';
import BookingUpcoming from '../screens/BookingUpcoming';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const Tab = createMaterialTopTabNavigator();

class BookingRequest extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {  
          datePicker: false,
          date:'',
          clickDataShow:1
        } 
        
    }

  componentDidMount = async () => {
    
  }

  showDatePicker() {
    this.setState({ datePicker: true })
  }

  setDate = (event, date) => {
    var finalDate = moment(date).format("YYYY-MM-DD");
    console.log('dateis*****', event + "*****" + date + "*********" + finalDate);
    this.setState({date: finalDate,datePicker: false,});
  }

  changeData(data){
    if (data === "1"){
      this.setState({clickDataShow:1})
    }
    else if (data === "2"){
      this.setState({clickDataShow:2})
    }
  }

  dataRender(){
    if (this.state.clickDataShow === 1){
    return(
       <BookingUpcoming />
    )
    }
    else if (this.state.clickDataShow === 2){
      return(
        <BookingPast />
     )
    }
  }

  // mytabs() {
  //   return (
  //     <Tab.Navigator
  //       initialRouteName="BookingUpcoming"
  //       tabBarOptions={{
  //         activeTintColor: '#FFFFFF',
  //         labelStyle: { fontSize: 12 },
  //         style: { backgroundColor: '#ffb900' },
  //       }}>
  //       <Tab.Screen
  //         name="BookingUpcoming"
  //         component={BookingUpcoming}
  //         options={{ tabBarLabel: 'UPCOMING' }}/>
  //       <Tab.Screen
  //         name="BookingPast"
  //         component={BookingPast}
  //         options={{ tabBarLabel: 'PAST' }}/>
  //     </Tab.Navigator>      
  //   );
  // }

render(){
  let image = require('../../img/tab_selected.png');
  let datePickerHolder = null
  let tomorrow = new Date();
  tomorrow = moment(tomorrow).add(15, 'day').format('YYYY-MM-DD');
  let previous = new Date();
  previous = moment(previous).subtract(15, 'day').format('YYYY-MM-DD');
  if (this.state.datePicker) {
    datePickerHolder = (
      <DateTimePicker
        maximumDate={Date.parse(tomorrow)}
        minimumDate={Date.parse(previous)}
        value={new Date()}
        display="default"
        onChange={this.setDate}>
      </DateTimePicker>
    )
  }

        

        return(
          <NavigationContainer>
             <ImageBackground source = {require('../../img/loginback.png')} style = {{flex:1}}>
                <Header
                 statusBarProps={{ barStyle: 'light-content' ,backgroundColor:"#2aabe4",translucent: true,}}
                 
                 leftComponent={ <Icon name='ios-arrow-back'  style={{color:'white',fontSize:25,left:5}} onPress = {()=>this.props.navigation.goBack()}/>}
                 centerComponent={{ text: 'Service Request', style: { color: '#fff',fontWeight:'bold',fontSize:20 }} }
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
              

        <View style = {{flex:1,backgroundColor:'transparent', margin:10, marginTop:180}}>
        <View style={{flexDirection:'row', paddingTop:10, width:'100%', height:50}}>
        <TouchableOpacity onPress={()=> this.changeData("1")} style={{backgroundColor: this.state.clickDataShow === 1 ? null: '#b29d1c', padding:10, width:'50%', borderTopLeftRadius:10,borderBottomLeftRadius:10, height:50 }}>
        <ImageBackground source={this.state.clickDataShow === 1 ? image: null} style={{width:'100%', height:50}}>
          <Text style={{alignSelf:'center', color:'white'}}>UPCOMING</Text>
        </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.changeData("2")} style={{backgroundColor: this.state.clickDataShow === 2 ? null: '#b29d1c', padding:10,width:'50%', borderTopRightRadius:10, borderBottomRightRadius:10, height:50}}>
        <ImageBackground source={this.state.clickDataShow === 2 ? image: null} style={{width:'100%', height:50}}>
        <Text style={{alignSelf:'center', color:'white'}}>PAST</Text>
        </ImageBackground>
        </TouchableOpacity>
      </View>
     {this.state.clickDataShow === 1 || this.state.clickDataShow === 2 ?
     <View>
          {this.dataRender()}
        </View>: null}
          {datePickerHolder}
          {/* {this.mytabs()} */}

        </View>

 </ImageBackground> 
 </NavigationContainer>
)}}

const styles = StyleSheet.create({
    
});
export default BookingRequest;