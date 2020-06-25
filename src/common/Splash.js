// @ts-nocheck

import React from 'react';
import { View, Image, StatusBar ,StyleSheet} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

class Splash extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            
        }

       this.navigateToIntro();
       
    }

    navigateToIntro(){
        console.log("test", "in this")
        let that = this;
        setTimeout(function(){ that.setIntroStack(); }, 3000);
    }

    setIntroStack(){
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],      //BookingRequest
        });
        this.props.navigation.dispatch(resetAction);
    }

    
    render(){

        return(
            <View style={styles.splash}>
                <Image style={styles.imageThumbnail} resizeMode="contain" source = {require('../img/splashback_logo.png')} />
                <StatusBar backgroundColor="white" barStyle="dark-content" />
              
            </View>
            
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
export default Splash;