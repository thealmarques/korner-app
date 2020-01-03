import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import IntroPage from './screens/intro/intro';
import LoginPage from './screens/login/login';
import AuthenticationMiddleware from './screens/middleware/authentication-middleware';
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
      AuthLoading: AuthenticationMiddleware,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

export default App;