import { useState } from 'react'
import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Heading,
  FlatList,
  Circle
} from 'native-base'
import { SignOut, ChatTeardropText } from 'phosphor-react-native'

import Logo from '../../assets/logo_secondary.svg'

import { Filter } from '../components/Filter'
import { Button } from '../components/Button'
import { Order, OrderProps } from '../components/Order'

export function Home() {
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>(
    'open'
  )

  const [orders, serOrders] = useState<OrderProps[]>([])

  const { colors } = useTheme()

  const navigation = useNavigation()

  function handleNewOrder() {
    navigation.navigate('new')
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId })
  }

  function handleLogout(){
    auth()
    .signOut()
    .catch(error=>{
      console.log(error)
      return Alert.alert('Sair','Não foi possível sair.')
    })
  }

  return (
    <VStack flex={1} pb={6} bg="yellow.100">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="yellow.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo width={150} height={70} />

        <IconButton icon={<SignOut size={26} color={colors.gray[100]} />}
        onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.400">Solicitacoes</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            type="closed"
            title="em andamento"
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter
            type="open"
            title="finalizados"
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Order data={item} onPress={() => handleOpenDetails(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Circle>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Voce ainda nao possui {'\n'}
                solicitacoes{' '}
                {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
              </Text>
            </Circle>
          )}
        />

        <Button title="Nova solicitacao" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  )
}
