
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home'

import { Details } from '../screens/Details'


const { Navigator, Screen } = createNativeStackNavigator()

export function DetailsRoute() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="homescreen" component={Home} />
       <Screen name="details" component={Details} />
    </Navigator>
  )
}