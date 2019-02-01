import {
  Home,
  StoryConcept,
  Map,
  Clue,
  Win,
  Inventory,
  Login,
  SignUp,
  ForgotPW,
  ARClue1,
  ARClue2,
  ARClue3
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
    Login,
    SignUp,
    ForgotPW,
    ARClue1,
    ARClue2,
    ARClue3,
  },
  { headerMode: 'none' }
);

const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;
