import {
  Home,
  StoryConcept,
  Map,
  Clue,
  Win,
  Inventory,
  Login,
  SignUp,
  ARClue1,
  ARClue2,
  ARClue3
} from './Client/Screens';
import { createStackNavigator, createAppContainer } from 'react-navigation';

//when I load the app with this, whatever is first shows up
const RootStack = createStackNavigator(
  {
    Home: Home,
    StoryConcept: StoryConcept,
    Map: Map,
    Inventory: Inventory,
    Clue: Clue,
    Win: Win,
    Login: Login,
    SignUp: SignUp,
    ARClue1: ARClue1,
    ARClue2: ARClue2,
    ARClue3: ARClue3
  },
  { headerMode: 'none' }
);

const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;
