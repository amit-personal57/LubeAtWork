
import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import RoutingScreen from './src/route/route';
class App extends React.Component{

constructor(props){

    super(props);
    this.state ={
    fname:'',
    mobile:'',
    address:'',
    email:'',
    password:'',
    Cpass:'',
    loading:false,
    token_name:'',
    token_val:''
    }
  }

  render(){
    return <RoutingScreen/>
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor:'white',
  },
});

export default App;
