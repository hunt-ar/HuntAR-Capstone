import { Home, StoryConcept, Map, Inventory } from './Client/Screens';
import { createStackNavigator, createAppContainer } from 'react-navigation';

//when I load the app with this, whatever is first shows up
const RootStack = createStackNavigator(
  {
    Home: Home,
    StoryConcept: StoryConcept,
    Map: Map,
    Inventory
  },
  { headerMode: 'none' }
);

const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;
