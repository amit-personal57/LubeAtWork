import React from 'react';
import { View, Image, StatusBar ,StyleSheet,ImageBackground} from 'react-native';

import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';

export default class Sample extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {   
        }     
    }

    
    render(){

        return(
             <ImageBackground source = {require('../img/back.png')} style = {{width:'100%',height:'100%',justifyContent:'space-evenly'}}>
<View></View>
               
                <StatusBar backgroundColor="#2aabe4" barStyle="light-content" />
            </ImageBackground>
            
        )
    }

}

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
