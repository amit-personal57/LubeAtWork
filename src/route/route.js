import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar, Image, Easing,
  Animated, ImageBackground
} from 'react-native';
import Login from '../common/Login';
import ForgotPassword from '../common/ForgotPassword';
import NewPassSet from '../common/NewPassSet';
import EnterOTP from '../common/EnterOTP';
import ChangePass from '../common/components/ChangePass';
import Splash from '../common/Splash';
import Profile from '../company/screens/Profile';
import EditCProfile from '../company/screens/EditCProfile';
import EditCProfile2 from '../company/screens/EditCProfile2';
import Employees1 from '../company/screens/Employees1';
import Archive from '../company/screens/Archive';
import CNotifications from '../company/screens/CNotifications';
import Employees2 from '../company/screens/Employees2';
import AddEmp from '../company/screens/AddEmp';
import EditEmp from '../company/screens/EditEmp';
import Profile2 from '../company/screens/Profile2';
import EProfile from '../employees/screens/EProfile';
import EmpEditProfile from '../employees/screens/EmpEditProfile';
import EMenu from '../employees/screens/EMenu';
import EProfile2 from '../employees/screens/Eprofile2';
import EmpServiceRequest from '../employees/screens/EmpServiceRequest';
import BookingRequest from '../employees/screens/BookingRequest';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(1)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps
      const thisSceneIndex = scene.index
      const width = layout.initWidth
      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [{ translateX }] }
    },
  }
}

const LoginStack = createStackNavigator({
  Splash: Splash,
  Login: Login,
  ForgotPassword: ForgotPassword,
  NewPassSet: NewPassSet,
  EnterOTP: EnterOTP,
  Profile: Profile,
  Profile2: Profile2,
  EProfile: EProfile,
  EProfile2: EProfile2,

}, {
  initialRouteName: 'Login',
  transitionConfig,
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
})


const CompanyStack = createStackNavigator({
  EMenu: EMenu,
  EmpEditProfile: EmpEditProfile,
  Employees1: Employees1,
  Employees2: Employees2,
  AddEmp: AddEmp,
  EditEmp: EditEmp,
  ChangePass: ChangePass,
  EditCProfile2: EditCProfile2,
  EditCProfile: EditCProfile,
  Archive: Archive,
  CNotifications: CNotifications,
  EmpServiceRequest: EmpServiceRequest,
  BookingRequest: BookingRequest,

}, {
  initialRouteName: 'EMenu',
  transitionConfig,
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
})

const App = createSwitchNavigator({
  Splash: {
    screen: Splash,
  },
  LoginTack: {
    screen: LoginStack,
  },
  Company: {
    screen: CompanyStack,
  },
}, {
  initialRouteName: 'Splash'
});

const AppContainer = createAppContainer(App);

export default class RoutingScreen extends React.Component {
  render() {
    return <AppContainer />

  }


}
