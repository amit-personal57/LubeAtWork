import React from 'react'
import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import { Avatar,Input,Lebal, } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
const MyButton = props => (
  <TouchableOpacity  {...props}  >
 
            <LinearGradient 
            {...props}
            colors={['#1282c1','#01c0dc' ]}
            style={styles.LinearGradientStyle}  
            start={{x: 0, y: 1}} 
            end={{x: 1, y: 0.9}}
            locations={[0, 0.5]}
            >
 
              <Text style={styles.buttonText}>{props.title}</Text>
                  
            </LinearGradient>
        
  </TouchableOpacity>
)
const styles = StyleSheet.create({

  MainContainer :{

    flex:1,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center'

  },

  LinearGradientStyle: {
    
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 5,
    marginBottom: 20,
    alignItems:'center'
  },

  buttonText: {
   fontSize: 22,
   fontWeight:'bold',
   textAlign: 'center',
   margin: 15,
   color : '#fff',
   backgroundColor: 'transparent' 
 
 },

});
export default MyButton