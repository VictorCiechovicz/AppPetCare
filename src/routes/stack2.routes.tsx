import { createNativeStackNavigator } from '@react-navigation/native-stack'


import { SignIn } from '../screens/SignIn'
import { NewUser } from '../screens/NewUser'

const { Navigator, Screen } = createNativeStackNavigator()

export function StackRouts2() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signin" component={SignIn} />
      <Screen name="register" component={NewUser} />
    </Navigator>
  )
}
