import React from 'react';
import { View, Image, StatusBar, Text, StyleSheet, ImageBackground, ToastAndroid, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Avatar, Input, Lebal, Button, CheckBox, Header } from 'react-native-elements';
import TextField from '../../common/components/input'
import MyButton from '../../common/components/Button'
import Icon from 'react-native-vector-icons/Ionicons';
import { Right, Left, Footer, Body, Item } from 'native-base';
import * as API from '../../api/index';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../common/components/Loader';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class BookingPast extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      data: [
        { id: 1, title: "Lorem ipsum is simply", count: "$500.00", image: "https://lorempixel.com/400/200/nature/6/" },
      ],
    }
  }

  componentDidMount = async () => {

  }


  render() {

    return (
      <ImageBackground source={require('../../img/loginback.png')} style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'transparent', margin: 10, marginTop: 10 }}>

          <Text>PAST</Text>

          <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.data}
            horizontal={false}
            numColumns={1}
            keyExtractor={(item) => {
              return item.id;
            }}
            ItemSeparatorComponent={() => {
              return (
                <View>

                </View>
              )
            }}
            renderItem={(post) => {
              const item = post.item;
              return (
                <View style={{ flexDirection: 'row', flex: 2, borderColor: '#373737', borderWidth: 1, borderRadius: 5, backgroundColor: '#FFFFFF' }}>
                  <View style={{ flexDirection: 'column', flex: 1.5 }}>
                    <Text style={{ fontSize: 12, color: '#373737', marginTop: 10, marginLeft: 10 }}>Date</Text>
                    <Text style={{ fontSize: 12, color: '#373737', marginTop: 10, marginLeft: 10 }}>Name</Text>
                    <Text style={{ fontSize: 12, color: '#373737', marginTop: 10, marginLeft: 10 }}>Phone No</Text>
                    <Text style={{ fontSize: 12, color: '#373737', marginTop: 10, marginLeft: 10 }}>Phone No</Text>
                    <Text style={{ fontSize: 12, color: '#373737', marginTop: 10, marginLeft: 10, marginBottom: 10 }}>Final Amount</Text>
                  </View>
                  <View style={{ flexDirection: 'column', flex: 0.5, justifyContent: 'center' }}>
                    <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center' }}>
                      <Image source={require('../../img/loginback.png')} style={{ fontSize: 12, color: '#373737', width: 30, height: 30, alignSelf: 'center' }}></Image>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, color: '#373737', marginTop: 15, alignSelf: 'center' }}>Details</Text>
                    <Text style={{ fontSize: 12, color: '#373737', marginTop: 10, alignSelf: 'center' }}>Notes</Text>
                  </View>
                </View>

              )
            }} />
        </View>
      </ImageBackground>

    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: 10,
  },
  listContainer: {
    marginTop: 10,
  },
});
export default BookingPast;