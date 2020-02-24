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
import { ScrollView } from "react-native-gesture-handler";
import React, { Component } from "react";
import { View, Text } from "native-base";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import SuggestScreen from "./screens/suggest/suggest";

const CustomDrawerComponent = props => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#5A646B" }}>
      <ScrollView>
        <DrawerItems
          {...props}
          getLabel={scene => (
            <View style={{
              marginTop: heightPercentageToDP('7%'),
              paddingHorizontal: widthPercentageToDP('5%'),
              alignSelf: 'center'
              }}>
              <Text style={{
                fontFamily: 'quicksand-bold',
                fontSize: widthPercentageToDP('3.7%'),
                color: 'white'
              }}>{props.getLabel(scene)}</Text>
            </View>
          )}
        ></DrawerItems>
      </ScrollView>
    </SafeAreaView>
  );
};

const AppStack = createDrawerNavigator(
  {
    Home: {
      screen: HomePage
    },
    Intro: {
      screen: IntroPage
    },
    Suggest: {
      screen: SuggestScreen,
      navigationOptions: {
        drawerLabel: () => null
      }
    }
  },
  {
    initialRouteName: "Home",
    contentComponent: CustomDrawerComponent
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

const App = createAppContainer(
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

export default App;
