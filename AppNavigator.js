import Home from './Screens/Home'
import StoryConcept from './Screens/StoryConcept'
import {createStackNavigator, createAppContainer} from 'react-navigation'

//when I load the app with this, whatever is first shows up
const RootStack = createStackNavigator({
  Home: Home,
  StoryConcept: StoryConcept,
})

const AppNavigator = createAppContainer(RootStack)
export default AppNavigator