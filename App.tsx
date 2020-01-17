import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import IntroPage from "./screens/intro/intro";
import LoginPage from "./screens/login/login";
import RegisterPage from "./screens/register/register";
import HomePage from "./screens/home/home";
import DependenciesLoader from "./screens/loader/dependencies";
import { createDrawerNavigator } from "react-navigation-drawer";

const AppStack = createDrawerNavigator({
  Home: {
    screen: HomePage
  },
  Intro: {
    screen: IntroPage
  },
},
{
  initialRouteName: 'Home'
});

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
