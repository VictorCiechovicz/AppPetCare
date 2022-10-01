import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Perfil } from '../screens/Perfil'

import {  PerfilEdit } from '../screens/PerfilEdit'
import { Register } from '../screens/Register'

const { Navigator, Screen } = createNativeStackNavigator()

export function PerfilRouts() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="perfil" component={Perfil} />
        <Screen name="perfilEdit" component={PerfilEdit} />
    </Navigator>
  )
}
