import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { House, Dog, User } from 'phosphor-react-native'
import { Perfil } from '../screens/Perfil'

import { DetailsRoute } from './details.routes'
import { Register } from '../screens/Register'

const { Navigator, Screen } = createBottomTabNavigator()

export function TabRouts() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#996DFF',
          height: 60
        },
        tabBarLabelStyle: {
          marginBottom: 5,
          fontSize: 10,
          textTransform: 'uppercase'
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#7C7C8A'
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
          tabBarIcon: ({ color }) => <Dog size={30} color={color} />
        }}
      />
      <Screen
        name="user"
        component={Perfil}
        options={{
          tabBarIcon: ({ color }) => <User size={30} color={color} />
        }}
      />
    </Navigator>
  )
}
