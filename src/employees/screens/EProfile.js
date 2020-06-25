import React from 'react';
import { View, Image, StatusBar, Text, StyleSheet, ImageBackground, ToastAndroid, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Input, Lebal, Button, CheckBox, Header } from 'react-native-elements';
import TextField from '../../common/components/input'
import MyButton from '../../common/components/Button'
import Icon from 'react-native-vector-icons/Ionicons';
import { Right, Left, Footer, Body, Item, Picker } from 'native-base';
import ImagePicker from 'react-native-image-picker';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Loader from '../../common/components/Loader'
import * as API from '../../api/index';

class EProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      cpassword: '',
      loading: true,
      clogo: '',
      cname: '',
      cmobile: '',
      cemail: '',
      tin: '',
      cid: '',
      cperson: '',
      Vehicles: '',
      caddress: '',
      count: 1,
      visible: false,
      brand: '',
      brandList: [],
      brandArr: [],
      category: '',
      categoryList: [],
      categoryArr: [],
      addMore: [],
      vinNoArr: [],
      vehicleNoArr: [],
    }
    this.getVehicleBrandsApi();
  }

  getVehicleBrandsApi() {
    this.setState({ visible: true })
    let data = '';
    API.getVehicleBrand(data)
      .then(res => {
        console.log("my final ******" + JSON.stringify(res));
        this.setState({ brandList: res["data"] });
        this.setState({ visible: false, disabled: false })
      });
  }

  getVehicleCategoriesApi(params) {
    this.setState({ visible: true })
    let data = params;
    API.getVehicleBrand(data)
      .then(res => {
        console.log("my category ******" + JSON.stringify(res));
        this.setState({ categoryList: res["data"] });
        this.setState({ visible: false, disabled: false })
      });
  }

  onBrandChange(value) {
    this.setState({ brand: value }, () => {
      this.getVehicleCategoriesApi(value);
    });
  }

  onCategoryChange(value) {
    this.setState({ category: value }, () => {
    });
  }

  validateInput = () => {
    if (this.state.addMore.length <= 0) {
      this.brandArr.push(this.state.brand);
      this.categoryArr.push(this.state.category);
      this.vinNoArr.push(this.state.vin);
      this.vehicleNoArr.push(this.state.vehicleno);
    }
    else {

    }
    this.props.navigation.navigate('EProfile2')
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
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
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
        const source = response.uri;
        this.setState({ clogo: source });
      }
    });
  }

  addMoreView() {
    if (this.state.brand == '' || this.state.brand == 'Select Brand') {
      this.showToastWithGravity("Please select brand");
      return;
    }
    else if (this.state.category == '' || this.state.category == 'Select Category') {
      this.showToastWithGravity("Please select category");
      return;
    }
    else if (this.state.vin == '') {
      this.showToastWithGravity("Please enter VIN");
      return;
    }
    else if (this.state.vehicleno == '') {
      this.showToastWithGravity("Please enter vehicle no.");
      return;
    }
    else {
      let addMore = +1;
      this.setState({ addMore: [...this.state.addMore, addMore] }, () => {
        console.log("addmoreis*********", this.state.addMore);
        this.setState({ brandArr: [...this.state.brandArr, this.state.brand] })
        this.setState({ categoryArr: [...this.state.categoryArr, this.state.category] })
        this.setState({ vinNoArr: [...this.state.vinNoArr, this.state.vin] })
        this.setState({ vehicleNoArr: [...this.state.vehicleNoArr, this.state.vehicleno] })
      })
    }
  }

  getVehicles = () => {

    // let mycount = this.state.count +1

    // for(let i = 0;i<=2;i++){
    //  return(<View  key = { i }>

    let brandList = this.state.brandList.map((list, index) => {
      return (
        <Picker.Item label={list.title} value={list.id} key={index} />
      );
    })

    let categoryList = this.state.categoryList.map((list, index) => {
      return (
        <Picker.Item label={list.title} value={list.id} key={index} />
      );
    })

    return (<View>
      <Item style={{ flexDirection: 'row', borderColor: 'transparent', width: '100%' }}>
        <Left>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: '50%', borderBottomColor: '#2aabe4', borderBottomWidth: 1, }}
            selectedValue={this.state.brand}
            onValueChange={this.onBrandChange.bind(this)}>
            <Picker.Item label="Select Brand" value="" />
            {brandList}
          </Picker>
        </Left>
        <Right>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: '50%', borderBottomColor: '#2aabe4', borderBottomWidth: 1, }}
            selectedValue={this.state.category}
            onValueChange={this.onCategoryChange.bind(this)}>
            <Picker.Item label="Select Category" value="" />
            {categoryList}
          </Picker>

        </Right>
      </Item>
      <Text></Text>
      <Item style={{ flexDirection: 'row', borderColor: 'transparent', width: '100%' }}>
        <Left>
          <Input
            onChangeText={vin => this.setState({ vin })}
            placeholder='VIN No'
            inputStyle={{ color: '#242424', fontSize: 15, fontWeight: 'bold', padding: 0 }}
            inputContainerStyle={{ borderBottomColor: '#2aabe4', padding: 0 }}
          />
        </Left>
        <Right>
          <Input
            onChangeText={vehicleno => this.setState({ vehicleno })}
            placeholder='Vehicle No'
            inputStyle={{ color: '#242424', fontSize: 15, fontWeight: 'bold', padding: 0 }}
            inputContainerStyle={{ borderBottomColor: '#2aabe4', padding: 0 }}
          />
        </Right>
      </Item>
    </View>)

    // }

  }
  render() {

    let brandList = this.state.brandList.map((list, index) => {
      return (
        <Picker.Item label={list.title} value={list.id} key={index} />
      );
    })

    let categoryList = this.state.categoryList.map((list, index) => {
      return (
        <Picker.Item label={list.title} value={list.id} key={index} />
      );
    })

    let addMoreViews = this.state.addMore.map((data, index) => {
      return (
        // <MyComponent key={index} pass_in_data={data} />
        <View>
          <Item style={{ flexDirection: 'row', borderColor: 'transparent', width: '100%' }} key={index}>
            <Left>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: '50%', borderBottomColor: '#2aabe4', borderBottomWidth: 1, }}
                selectedValue={this.state.brand}
                onValueChange={this.onBrandChange.bind(this)}>
                <Picker.Item label="Select Brand" value="" />
                {brandList}
              </Picker>
            </Left>
            <Right>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: '50%', borderBottomColor: '#2aabe4', borderBottomWidth: 1, }}
                selectedValue={this.state.category}
                onValueChange={this.onCategoryChange.bind(this)}>
                <Picker.Item label="Select Category" value="" />
                {categoryList}
              </Picker>

            </Right>
          </Item>
          <Text></Text>
          <Item style={{ flexDirection: 'row', borderColor: 'transparent', width: '100%' }}>
            <Left>
              <Input
                onChangeText={vin => this.setState({ vin })}
                placeholder='VIN No'
                inputStyle={{ color: '#242424', fontSize: 15, fontWeight: 'bold', padding: 0 }}
                inputContainerStyle={{ borderBottomColor: '#2aabe4', padding: 0 }}
              />
            </Left>
            <Right>
              <Input
                onChangeText={vehicleno => this.setState({ vehicleno })}
                placeholder='Vehicle No'
                inputStyle={{ color: '#242424', fontSize: 15, fontWeight: 'bold', padding: 0 }}
                inputContainerStyle={{ borderBottomColor: '#2aabe4', padding: 0 }}
              />
            </Right>
          </Item>
        </View>
      )
    });

    return (
      <ImageBackground source={require('../../img/login_back.png')} style={{ flex: 1 }}>
        <Header
          statusBarProps={{ barStyle: 'light-content', backgroundColor: "#2aabe4", translucent: true, }}
          leftComponent={<Icon name='ios-arrow-back' style={{ color: 'white', fontSize: 25 }} />}
          centerComponent={{ text: 'Complete Your Profile', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
          containerStyle={{
            backgroundColor: '#2aabe4',
            justifyContent: 'space-around',
            borderWidth: 0, borderBottomColor: '#2aabe4'
          }}
        />

        <ScrollView style={{ minHeight: '100%' }}>
          <View style={{ flex: 1, alignItems: 'center', PaddingHorizontal: 10, paddingVertical: 30, }}>

            <Loader visible={this.state.visible} />

            <Item style={{ flexDirection: 'row', borderColor: 'transparent', width: '100%', alignItems: 'center', PaddingHorizontal: 10, justifyContent: 'space-evenly' }}>

              <View style={{ flexDirection: 'column', marginTop: '15%' }}>
                <Avatar
                  size={130}
                  onEditPress={this.takePicture.bind(this)}
                  overlayContainerStyle={{ backgroundColor: '#FFF', borderColor: '#2aabe4', }}
                  rounded
                  containerStyle={{ borderColor: '#2aabe4', borderWidth: 1, alignSelf: 'center', backgroundColor: 'white' }}
                  source={this.state.clogo != '' ? { uri: this.state.clogo } : require('../../img/profile.png')}
                  imageProps={{ resizeMode: 'cover', borderColor: 'black' }}
                  showEditButton
                  iconStyle={{ backgroundColor: '#2aabe4' }}
                  editButton={{ name: 'mode-edit', type: 'material', color: '#2aabe4', size: 25, containerStyle: { backgroundColor: 'white', borderColor: '#2aabe4', borderRadius: 12 } }}
                />

              </View>
            </Item>
          </View>
          <View style={{ flex: 1.8, backgroundColor: 'transparent', margin: 20, }}>
            <Item style={{ flexDirection: 'row', borderColor: 'transparent', width: '100%' }}>
              <Left>
                <Input
                  onChangeText={eid => this.setState({ eid })}
                  placeholder='Employee ID No'
                  inputStyle={{ color: '#242424', fontSize: 15, fontWeight: 'bold', padding: 0 }}
                  inputContainerStyle={{ borderBottomColor: '#2aabe4', padding: 0 }}
                />
              </Left>
              <Right>
                <Input
                  onChangeText={ename => this.setState({ ename })}
                  placeholder='Employee Name'
                  inputStyle={{ color: '#242424', fontSize: 15, fontWeight: 'bold', padding: 0 }}
                  inputContainerStyle={{ borderBottomColor: '#2aabe4', padding: 0 }}
                />
              </Right>
            </Item>

            <Text></Text>
            <Item style={{ flexDirection: 'row', borderColor: 'transparent', width: '100%' }}>
              <Left>
                <Input
                  onChangeText={eemail => this.setState({ eemail })}
                  placeholder='Official Email'
                  inputStyle={{ color: '#242424', fontSize: 15, fontWeight: 'bold', padding: 0 }}
                  inputContainerStyle={{ borderBottomColor: '#2aabe4', padding: 0 }}
                />
              </Left>
              <Right>
                <Input
                  onChangeText={emobile => this.setState({ emobile })}
                  placeholder='Contact Number'
                  inputStyle={{ color: '#242424', fontSize: 15, fontWeight: 'bold', padding: 0 }}
                  inputContainerStyle={{ borderBottomColor: '#2aabe4', padding: 0 }}
                />
              </Right>
            </Item>
            <Text></Text>
            <Item style={{ flexDirection: 'row', borderColor: 'transparent', width: '100%' }}>
              <Left>
                <Text style={{ color: '#2aabe4', fontFamily: 'Roboto_Regular', fontSize: 16, fontWeight: 'bold', paddingLeft: 8 }}>VEHICLE DETAIL</Text>

              </Left>
              <Right>
                <Text style={{ color: '#2aabe4', fontFamily: 'Roboto_Regular', fontSize: 16, fontWeight: 'bold', paddingRight: 8 }} onPress={() => this.addMoreView()}>+ Add More</Text>
              </Right>
            </Item>
            <Text></Text>
            {this.getVehicles()}
            {addMoreViews}
            <Text></Text>
            <Text></Text>
            <MyButton title="CONTINUE" onPress={this.validateInput} />
            <View style={{ width: '100%', height: 60 }} />
          </View>
        </ScrollView>
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
export default EProfile;