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

/*
const CustomDrawerComponent = props => {
  return (
    <SafeAreaView 
    forceInset={{ top: 'always', horizontal: 'never' }}
    style={{
      backgroundColor: "#69717E",
      height: '75%',
      width: '100%',
      borderBottomRightRadius: 350,
      flexDirection: 'row',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      paddingVertical: 20
    }}>
      <ScrollView style={{
        flex: 1
      }}>
        <DrawerItems
          activeBackgroundColor="transparent"
          activeLabelStyle="transparent"
          activeTintColor="transparent"
          activeItemKey="transparent"
          itemStyle={{
            height: 40
          }}
          {...props}
          getLabel={scene => (
            <View style={{
              paddingLeft: widthPercentageToDP('15%'),
              alignSelf: 'center'
            }}>
              <Text style={{
                fontFamily: 'quicksand-bold',
                fontSize: widthPercentageToDP('4%'),
                color: 'white'
              }}>{props.getLabel(scene)}
              </Text>
            </View>
          )}
        ></DrawerItems>
      </ScrollView>
      <View style={{
        flex: 0.4
      }}>
        <Image style={{
          height: 70,
          width: 70
        }} source={require("./shared/assets/round_profile.png")} />
      </View>
    </SafeAreaView>
  );
};*/

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
