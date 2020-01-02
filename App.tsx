import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import IntroPage from './pages/intro/intro';
import LoginPage from './pages/login/login';

const navigationOptions = {
  header: null,
};

const MainNavigator = createStackNavigator({
  Intro: {screen: IntroPage, navigationOptions},
  Login: {screen: LoginPage, navigationOptions}
});

const App = createAppContainer(MainNavigator);

export default App;