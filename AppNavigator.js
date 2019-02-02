import {
  Home,
  StoryConcept,
  Map,
  Clue,
  Win,
  Inventory,
  Login,
  SignUp,
  Loading,
  Welcome,
  ForgotPW,
  ARClue1,
  ARClue2,
  ARClue3,
  Lose
} from './Client/Screens';
import { createStackNavigator, createAppContainer } from 'react-navigation';
console.log('Our component:', ForgotPW)
//when I load the app with this, whatever is first shows up
const RootStack = createStackNavigator(
  {
    Home,
    StoryConcept,
    Map,
    Inventory,
    Clue,
    Win,
    Loading,
    Welcome,
    Login,
    SignUp,
    ForgotPW,
    ARClue1,
    ARClue2,
    ARClue3,
    Lose
  },
  { headerMode: 'none' }
);

const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;
