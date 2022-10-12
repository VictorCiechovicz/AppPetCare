import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Perfil } from '../screens/Perfil'

import {  PerfilEdit } from '../screens/PerfilEdit'

import { Details } from '../screens/Details'

const { Navigator, Screen } = createNativeStackNavigator()

export function PerfilRouts() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="perfil" component={Perfil} />
        <Screen name="perfilEdit" component={PerfilEdit} />
        <Screen name="details" component={Details} />
        
    </Navigator>
  )
}
