import { createNativeStackNavigator } from '@react-navigation/native-stack'


import { SignIn } from '../screens/SignIn'
import { NewUser } from '../screens/NewUser'
import {ForgotPassword} from '../screens/ForgotPassword'

const { Navigator, Screen } = createNativeStackNavigator()

export function StackRouts2() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signin" component={SignIn} />
      <Screen name="cadastro" component={NewUser} />
      <Screen name="forgotPassword" component={ForgotPassword} />
    </Navigator>
  )
}
