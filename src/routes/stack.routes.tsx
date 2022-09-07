import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home'

import { Details } from '../screens/Details'
import { Register } from '../screens/Register'
import { NewUser } from '../screens/NewUser'

const { Navigator, Screen } = createNativeStackNavigator()

export function StackRouts() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="register" component={NewUser} />
      <Screen name="new" component={Register} />
      <Screen name="details" component={Details} />
    </Navigator>
  )
}
