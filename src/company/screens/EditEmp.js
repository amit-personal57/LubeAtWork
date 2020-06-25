import React from 'react';
import { View, Image, StatusBar, Text, StyleSheet, ImageBackground, ToastAndroid, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { Avatar, Input, Lebal, Button, CheckBox, Header } from 'react-native-elements';
import TextField from '../../common/components/input'
import MyButton from '../../common/components/Button'
import Icon from 'react-native-vector-icons/Ionicons';
import { Right, Left, Footer, Body, Item } from 'native-base';
import * as API from '../../api/index';
import Loader from '../../common/components/Loader'
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class EditEmp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      visible: false,
      clogo: [],
      ename: '',
      emobile: '',
      eemail: '',
      eid: '',
      token: '',
      empid: '',
      isVisible: false,
      serverlogo: '',
      empData: []
    }
  }
  validateInput = () => {

    const { ename } = this.state;
    const { emobile } = this.state;
    const { eemail } = this.state;
    const { eid } = this.state;
    const { clogo } = this.state;

    if (clogo === "") {
      this.showToastWithGravity("Upload Profile Image")
      return false;
    }
    else if (eid === "") {
      this.showToastWithGravity("Enter Employee ID")
      return false;
    }
    else if (ename === "") {
      this.showToastWithGravity("Enter Employee Name")
      return false;
    }
    else if (eemail === "") {
      this.showToastWithGravity("Enter Email")
      return false;
    }
    else if (emobile === "") {
      this.showToastWithGravity("Enter Phone Number")
      return false;
    }
    else
      this.setState({ loading: true, disabled: false })
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

  takePicture() {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response;
        this.setState({ clogo: source });
      }
    });
  }

  componentDidMount = async () => {
    let empData = this.props.navigation.state.params.data
    AsyncStorage.getItem("user_info").then((value) => {
      const mydata = JSON.parse(value)
      this.setState({
        id: mydata.id, empData: empData, token: mydata.token,
        eid: empData.username, ename: empData.name, eemail: empData.email, emobile: empData.mobile, serverlogo: empData.avatar, empid: empData.id
      })
    })
  }

  EditEmp = () => {
    if (this.validateInput()) {
      const mydata = this.state

      const data = {
        clogo: this.state.clogo,
        ename: mydata.ename,
        emobile: mydata.emobile,
        eemail: mydata.eemail,
        eid: mydata.eid,
        token: mydata.token,
        empid: mydata.empid,
        id: mydata.id
      }
      console.warn("send data " + JSON.stringify(data))
      this.setState({ visible: true })
      API.EditEmp(data)
        .then(res => {
          this.setState({ visible: false, isVisible: true })
          console.warn('logindetail', res);
          setTimeout(this.handleClose, 3000)
        })
    }
  }
  handleClose = () => {
    this.setState({ isVisible: false })
    this.props.navigation.navigate('Employees2')
  }
  render() {

    return (
      <ImageBackground source={require('../../img/login_back.png')} style={{ flex: 1 }}>
        <Header
          statusBarProps={{ barStyle: 'light-content', backgroundColor: "#2aabe4", translucent: true, }}
          leftComponent={<Icon name='ios-arrow-back' style={{ color: 'white', fontSize: 25, left: 5 }} onPress={() => this.props.navigation.goBack()} />}
          centerComponent={{ text: 'Edit Employee', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
          containerStyle={{
            backgroundColor: '#2aabe4',
            justifyContent: 'space-around',
            borderWidth: 0, borderBottomColor: '#2aabe4'
          }}
        />
        <Loader visible={this.state.visible} />
        <Modal transparent={true}
          visible={this.state.isVisible}
          onRequestClose={this.closeModal}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}>
            <View style={{
              width: '90%',
              marginHorizontal: 20,
              height: height / 3.5, backgroundColor: 'white', justifyContent: 'center', borderRadius: 7
            }}>
              <Text style={{ textAlign: 'center', alignItems: 'center', alignSelf: 'center', fontWeight: 'bold', fontSize: 25, color: 'green' }}>Profile Updated Successfully!</Text>
            </View>
          </View>
        </Modal>
        <View style={{ flex: 0.7, alignItems: 'center', PaddingHorizontal: 10, paddingVertical: 30, marginBottom: -50 }}>
          <Item style={{ flexDirection: 'row', borderColor: 'transparent', width: '100%', alignItems: 'center', PaddingHorizontal: 10, justifyContent: 'space-evenly' }}>

            <View style={{ flexDirection: 'column', marginTop: '15%' }}>

              <ImageBackground
                source={this.state.serverlogo && this.state.clogo.length < 1 ? { uri: "https://lubeatwork.markupdesigns.org/assets/employee/" + this.state.serverlogo } : this.state.clogo.length === 0 ? require('../../img/profile.png') : { uri: this.state.clogo.uri }}
                style={{
                  width: 140, height: 140,
                }}
                imageStyle={{ borderRadius: 140 / 2 }}
              >
                <TouchableOpacity style={{
                  height: 32, width: 32, position: 'absolute', backgroundColor: 'white',
                  right: -10,
                  marginBottom: 10,
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 32 / 2,
                  bottom: 0
                }}
                  onPress={this.takePicture.bind(this)}
                >
                  <Image source={require('../../img/editP.png')} style={{ maxHeight: 23, maxWidth: 23, resizeMode: 'cover', padding: 5 }} />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </Item>
        </View>
        <View style={{ flex: 1.8, backgroundColor: 'transparent', margin: 20, }}>
          <Input
            onChangeText={eid => this.setState({ eid })}
            placeholder='Employee ID'
            value={this.state.eid}
            inputStyle={{ color: '#242424', fontSize: 15, fontWeight: 'bold', padding: 0 }}
            inputContainerStyle={{ borderBottomColor: '#2aabe4', padding: 0 }}
          />
          <Text></Text>
          <Input
            onChangeText={ename => this.setState({ ename })}
            placeholder='Employee Name'
            value={this.state.ename}
            inputStyle={{ color: '#242424', fontSize: 15, fontWeight: 'bold', padding: 0 }}
            inputContainerStyle={{ borderBottomColor: '#2aabe4', padding: 0 }}
          />
          <Text></Text>
          <Input
            onChangeText={eemail => this.setState({ eemail })}
            placeholder=' Email'
            value={this.state.eemail}
            inputStyle={{ color: '#242424', fontSize: 15, fontWeight: 'bold', padding: 0 }}
            inputContainerStyle={{ borderBottomColor: '#2aabe4', padding: 0 }}
          />
          <Text></Text>
          <Input
            onChangeText={emobile => this.setState({ emobile })}
            placeholder='Phone Number(with country code)'
            value={this.state.emobile}
            inputStyle={{ color: '#242424', fontSize: 15, fontWeight: 'bold', padding: 0 }}
            inputContainerStyle={{ borderBottomColor: '#2aabe4', padding: 0 }}
          />
          <Text></Text>
          <Text></Text>
          <MyButton title="UPDATE" onPress={this.EditEmp} />
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
export default EditEmp;