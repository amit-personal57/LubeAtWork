import React from 'react';
import { View, Image, StatusBar, Text, StyleSheet, ImageBackground, ToastAndroid, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import TextField from './components/input'
import MyButton from './components/Button'
import Loader from './components/Loader'
import AsyncStorage from '@react-native-community/async-storage';
import * as API from '../api/index';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userError: '',
      passError: '',
      user: '',
      password: '',
      checked: false,
      visible: false,
      disabled: false
    }
  }

  validateInput = () => {
    const { user } = this.state;
    const { password } = this.state;
    if (user === "") {
      this.showToastWithGravity("Enter your Employe Id/Comonay Id")
      return false;
    }
    else if (password === "") {
      this.showToastWithGravity("Enter your Password")
      return false;
    }
    else if (password.length < 6) {
      this.showToastWithGravity("Password should be atleast 6 character")
      return false;
    }
    else
      this.setState({ disabled: true })
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
    await AsyncStorage.getItem("userSave").then((value) => {
      const mydata = JSON.parse(value)
      console.warn(mydata)
      this.setState({ user: mydata.user, password: mydata.pass, checked: mydata.visible })
    })
  }


  signinSimple = () => {
    if (this.validateInput()) {
      this.setState({ visible: true })
      const mydata = this.state
      const data = { username: mydata.user, password: mydata.password }
      API.login(data)
        .then(res => {
          console.warn("my final" + JSON.stringify(res));
          this.setState({ visible: false, disabled: false })
          if (res.error === undefined) {
            if (res.status === "Success") {
              console.warn("fsdfdsf" + res.avatar)
              let response = res['data']
              const userInfo = {
                'email': response.email,
                'username': response.username,
                'id': response.id,
                'role': response.role,
                'token': response.token,
                'avatar': response.avatar,
                'noEmp': response.noemployee,
                'push': response.push_mute
              }

              this.setState({
                user: "", password: ""
              })
              AsyncStorage.setItem('user_info', JSON.stringify(userInfo));
              let profileStatus = response['details']
              console.warn(profileStatus)
              if (response.role === '1') {
                if (profileStatus.length < 1) {
                  this.props.navigation.navigate('Profile', { data: userInfo })
                } else {
                  this.props.navigation.navigate('Company')
                }

              } else {
                alert("empoloyee")
                console.log("responseis*******", response.vehicle);
                if (response.vehicle === 0) {
                  this.props.navigation.navigate('EProfile');
                }
                else if (response.card === 0) {
                  this.props.navigation.navigate('EProfile2');
                }
              }
            } else {
              this.setState({ loader: false, disabled: false, visible: false })
              this.showToastWithGravity(res.msg)
            }
          }
          else {

            alert(res.error);
            console.log('error');
          }
        })
    }
  }

  rememberPassword = async () => {
    if (this.state.user === "" && this.state.password === "") {
      this.showToastWithGravity("Fill the details")
      return false
    }
    else {
      await this.setState({ checked: !this.state.checked })
      if (this.state.checked) {
        let data = { user: this.state.user, pass: this.state.password, visible: this.state.checked }
        AsyncStorage.setItem('userSave', JSON.stringify(data));
        console.warn("rember", data)
      }
      else {
        await AsyncStorage.removeItem('userSave');
      }
    }
  }

  render() {

    return (
      <ImageBackground source={require('../img/loginback.png')} style={{ flex: 1 }}>
        <StatusBar backgroundColor="#2aabe4" barStyle="light-content" />
        <View style={{ flex: 1, alignItems: 'center', PaddingHorizontal: 10, justifyContent: 'space-evenly' }}>

          <Loader visible={this.state.visible} />
          <Image source={require('../img/logo.png')} style={{
            resizeMode: 'contain'
          }} />
          <Text style={{ fontSize: 24, color: '#f1f1f1', fontWeight: 'bold' }}>
            LOGIN
          </Text>
        </View>
        <View style={{ flex: 1.1, backgroundColor: 'transparent', margin: 30 }}>
          <TextField
            label="COMPONAY ID/EMPLOYEE ID"
            value={this.state.user}
            onChangeText={user => this.setState({ user })}
            placeholder='COMPONAY ID/EMPLOYEE ID'
          />
          <Text></Text>
          <TextField
            label="PASSWORD"
            onChangeText={password => this.setState({ password })}
            secureTextEntry={true}
            value={this.state.password}
            placeholder="PASSWORD"
            maxLength={10}
          />
          <Text></Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                containerStyle={{ padding: 0, borderWidth: 0, marginHorizontal: 0, backgroundColor: 'transparent' }}
                checked={this.state.checked}
                uncheckedColor="black"
                checkedColor="#2aabe4"
                size={15}
                checkedIcon='check-square'
                uncheckedIcon='check-square'
                onPress={this.rememberPassword}
              />
              <Text style={{ fontSize: 12, color: '#373737', paddingVertical: 5 }}>
                Remember Me</Text>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <Text style={{ fontSize: 12, color: '#373737', paddingVertical: 5 }}>
                Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <Text></Text>
          <Text></Text>
          <MyButton
            disabled={this.state.disabled}
            title="LOGIN"
            onPress={this.signinSimple}
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
export default Login;