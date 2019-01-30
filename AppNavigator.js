import { Home, StoryConcept, Map, Clue, Win } from './Client/Screens';
import { createStackNavigator, createAppContainer } from 'react-navigation';

//when I load the app with this, whatever is first shows up
const RootStack = createStackNavigator(
  {
    Home: Home,
    StoryConcept: StoryConcept,
    Map: Map,
    Clue: Clue,
    Win: Win
  },
  { headerMode: 'none' }
);

const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;
