import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import IntroPage from './screens/intro/intro';
import LoginPage from './screens/login/login';
import AuthenticationLoader from './screens/loader/authentication-loader';
import HomePage from './screens/home/home';


const navigationOptions = {
  header: null,
};

const AppStack = createStackNavigator({
  Home: {screen: HomePage, navigationOptions}
});

const AuthStack = createStackNavigator({
  Intro: {screen: IntroPage, navigationOptions},
  Login: {screen: LoginPage, navigationOptions}
});

const App = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoader: AuthenticationLoader,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoader',
    }
  )
);

export default App;