import React from 'react'
import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import AnimatedLoader from "react-native-animated-loader";

const Loader= props => (
   
    <AnimatedLoader
    {...props}
    visible={props.visible}
    overlayColor="rgba(255,255,255,0.3)"
    source={require("./loader3.json")}
    animationStyle={{  width: 100,
        height: 100}}
    speed={6}
  />
  )
  
export default Loader