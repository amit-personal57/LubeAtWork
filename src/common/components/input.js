import React from 'react'
import { View, Text } from 'react-native'
import { Avatar,Input,Lebal,Button } from 'react-native-elements';
const TextField = props => (
  <View>
    <Input
    {...props}
    label = {props.label}
maxLength={props.length}
labelStyle = {{color:'#2aabe4',fontSize:12}}
inputStyle={{color:'#242424',fontSize:15,padding: 0,fontSize:14,fontWeight:'bold'}}
  placeholder={props.placeholder}
  inputContainerStyle = {{borderBottomColor:'#2aabe4',width:'100%',padding: 0}}
    />
 
  </View>
)

export default TextField