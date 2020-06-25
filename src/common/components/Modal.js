import React from 'react'
import { View, Text,TouchableOpacity,StyleSheet,Modal,Dimensions } from 'react-native'

const width = Dimensions.get('window').width;
const height =Dimensions.get('window').height;
const MyModal= props => (
  
 
      <Modal transparent={true}
    {...props}
    visible={props.visible}
 >
<View style={{
       flex: 1,
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
 <View style={{
         width: '90%',
         marginHorizontal:20,
         height: height/3.5,backgroundColor:'white',justifyContent:'center',borderRadius:7}}>
   
 <Text style ={{textAlign:'center',alignItems:'center',alignSelf:'center',fontWeight:'bold',fontSize:25,color:'green'}}>{props.msg}</Text>
 </View>
</View>
</Modal> 
)  
export default  MyModal