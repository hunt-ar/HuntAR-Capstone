import {
  Home,
  StoryConcept,
  StoryConcept2,
  Map,
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
  ARClue4,
  Lose,
  Timer,
  SeeTimes,
  Disarm
} from './Client/Screens';
import { createStackNavigator, createAppContainer } from 'react-navigation';
console.log('Our component:', ForgotPW);
//when I load the app with this, whatever is first shows up
const RootStack = createStackNavigator(
  {
    Home,
    StoryConcept,
    StoryConcept2,
    Map,
    Inventory,
    Win,
    Loading,
    Welcome,
    Login,
    SignUp,
    ForgotPW,
    ARClue1,
    ARClue2,
    ARClue3,
    ARClue4,
    Lose,
    Timer,
    SeeTimes,
    Disarm
  },
  { headerMode: 'none' }
);

const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;
