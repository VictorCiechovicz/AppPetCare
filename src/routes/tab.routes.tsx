import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { House, PawPrint, User } from 'phosphor-react-native'
import { Perfil } from '../screens/Perfil'


import { DetailsRoute } from './details.routes'
import { Register } from '../screens/Register'
import {PerfilRouts} from './stack3.routes'
const { Navigator, Screen } = createBottomTabNavigator()

export function TabRouts() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ffff',
          height: 65
        },
        tabBarLabelStyle: {
          marginBottom: 5,
          fontSize: 10,
          textTransform: 'uppercase'
        },
        tabBarActiveTintColor: '#0096FF',
        tabBarInactiveTintColor: '#929294',
        tabBarHideOnKeyboard: true,
        unmountOnBlur: true
      }}
    >
      <Screen
        name="home"
        component={DetailsRoute}
        options={{
          tabBarIcon: ({ color }) => <House size={30} color={color} />
        }}
      />
      <Screen
        name="new"
        component={Register}
        options={{
          tabBarIcon: ({ color }) => <PawPrint size={60} color={color} />
        }}
      />
      <Screen
        name="user"
        component={PerfilRouts}
        options={{
          tabBarIcon: ({ color }) => <User size={30} color={color} />
        }}
      />
    </Navigator>
  )
}
