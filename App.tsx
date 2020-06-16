import {
  createAppContainer,
  createSwitchNavigator,
  SafeAreaView
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import IntroPage from "./screens/intro/intro";
import LoginPage from "./screens/login/login";
import RegisterPage from "./screens/register/register";
import HomePage from "./screens/home/home";
import DependenciesLoader from "./screens/loader/dependencies";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import React, { Component } from "react";
import { Provider } from 'react-redux';
import { Store } from './shared/store';
import OpenScreen from "./screens/open/open";
import { Dimensions, Image } from "react-native";
import CustomDrawerComponent from "./shared/components/drawer/custom-drawer";
import SuggestScreen from "./screens/suggest/suggest";
import MyPosts from "./screens/myposts/posts";
import MyNotifications from "./screens/mynotifications/notifications";

const AppStack = createDrawerNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: {
        drawerLabel: () => "Home"
      }
    },
    Intro: {
      screen: IntroPage
    },
    Suggest: {
      screen: SuggestScreen,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Open: {
      screen: OpenScreen,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    MyPosts: {
      screen: MyPosts
    },
    MyNotifications: {
      screen: MyNotifications
    }
  },
  {
    initialRouteName: "Home",
    contentComponent: (props) => (
      <CustomDrawerComponent navigation={props.navigation}></CustomDrawerComponent>
    ),
    drawerBackgroundColor: "transparent ",
    drawerWidth: Dimensions.get('window').width,
    contentOptions: {
      activeTintColor: 'red',
      activeBackgroundColor: 'transparent',
    }
  }
);

const AuthStack = createStackNavigator({
  Intro: {
    screen: IntroPage,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: LoginPage,
    navigationOptions: {
      header: null
    }
  },
  Register: {
    screen: RegisterPage,
    navigationOptions: {
      header: null
    }
  }
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Dependencies: DependenciesLoader,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Dependencies"
    }
  )
);

export default class AppNavigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={Store}>
        <AppContainer />
      </Provider>
    );
  }
};
