import React from 'react';
import { View, Image, StatusBar, Text, StyleSheet, ImageBackground, ToastAndroid, Dimensions } from 'react-native';
import TextField from './components/input'
import MyButton from './components/Button'
import Loader from './components/Loader'
import AsyncStorage from '@react-native-community/async-storage';
import * as API from '../api/index';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      visible: false,
      id: '',
      token: ''
    }
  }

  validateInput = () => {
    const { email } = this.state;
    if (email === "") {
      this.showToastWithGravity("Enter your email")
      return false;
    }
    else

      this.setState({ visible: true, disabled: false })
    return true;
  }
  
  showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    ); (
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  componentDidMount = async () => {
    AsyncStorage.getItem("user_info").then((value) => {
      const mydata = JSON.parse(value)
      this.setState({ id: mydata.id, token: mydata.token })
      console.warn(mydata.id)
    })
  }

  ForgotPassword = () => {
    if (this.validateInput()) {
      const mydata = this.state
      const data = {
        email: mydata.email,
        token: mydata.token
      }
      API.ForgotPassword(data)
        .then(res => {
          console.warn('logindetail', res);
          this.setState({ visible: false })
          if (res.status === 'Success') {
            this.props.navigation.navigate('EnterOTP', { id: res.id, email: this.state.email })
          }
          else {
            this.showToastWithGravity('Something went wrong/Invalid Email')
          }
        })
    }
  }

  render() {

    return (
      <ImageBackground source={require('../img/loginback.png')} style={{ flex: 1 }}>
        <StatusBar backgroundColor="#2aabe4" barStyle="light-content" />
        <Loader visible={this.state.visible} />
        <View style={{ flex: 1.2, alignItems: 'center', PaddingHorizontal: 10, justifyContent: 'space-evenly' }}>
          <Image source={require('../img/logo.png')} style={{
            resizeMode: 'contain'
          }} />
          <Text style={{ fontSize: 24, color: '#f1f1f1', fontWeight: 'bold', }}>
            FORGOT PASSWORD
  </Text>

        </View>
        <View style={{ flex: 1.3, backgroundColor: 'transparent', marginHorizontal: 30 }}>
          <Text style={{ fontSize: 18, color: '#949191', paddingVertical: 5, textAlign: 'center', alignItems: 'center' }}>
            No worries,it happens.Enter your email and we will send you OTP
</Text>
          <Text></Text>
          <TextField
            onChangeText={email => this.setState({ email })}
            placeholder='EMAIL'
          />
          <Text></Text>
          <Text></Text>
          <MyButton
            title="SUBMIT"
            onPress={this.ForgotPassword}
          />
        </View>
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
    color: 'red'
  },
  imageThumbnail: {
    borderWidth: 1,
    width: '100%',
    flex: 1,
  },

});
export default ForgotPassword;