import {
  Home,
  StoryConcept,
  Map,
  Clue,
  Win,
  Inventory,
  ARClue1
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
    ARClue1: ARClue1
  },
  { headerMode: 'none' }
);

const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;
