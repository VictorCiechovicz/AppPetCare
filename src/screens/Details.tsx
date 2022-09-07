import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { HStack, VStack, useTheme, Text, ScrollView, Box } from 'native-base'
import firestore from '@react-native-firebase/firestore'
import { Header } from '../components/Header'
import { OrderProps } from '../components/Order'
import { OrderFirestoreDTO } from '../DTOs/OrderDTO'
import { dateFormat } from '../utils/firestoreDateFormat'
import { Loading } from '../components/Loading'
import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  Clipboard
} from 'phosphor-react-native'
import { CardDetails } from '../components/CardDetails'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

type RouteParams = {
  orderId: string
}

type OrderDatails = OrderProps & {
  description: string
  solution: string
  closed: string
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true)
  const [solution, setSolution] = useState('')
  const [order, setOrder] = useState<OrderDatails>({} as OrderDatails)

  const route = useRoute()
  const { orderId } = route.params as RouteParams

  const { colors } = useTheme()
  const navigation = useNavigation()

  function handleOrderClosed() {
    if (!solution)
      return Alert.alert(
        'Solicitacao',
        'Informe a solucao para encerrar a solicitacao.'
      )

    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .update({
        status: 'closed',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Solicitacao', 'Solicitacao encerrada.')
        navigation.goBack()
      })
      .catch(error => {
        console.log(error)
        Alert.alert('Solicitacao', 'Nao foi possivel encerrar a solicitacao.')
      })
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then(doc => {
        const {
          patrimony,
          description,
          status,
          created_at,
          closed_at,
          solution
        } = doc.data()
        const closed = closed_at ? dateFormat(closed_at) : null

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed
        })

        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <Loading />
  }
  return (
    <VStack flex={1} bg="yellow.100">
      <Box px={6} bg="gray.600">
        <Header title="Solicitacao" />
      </Box>
      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === 'closed' ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={
            order.status === 'closed'
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {order.status === 'closed' ? 'finalizado' : 'em andamento'}
        </Text>
      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          description={`Patrimonio ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />
        <CardDetails
          title="descricao do problema"
          description={order.description}
          icon={Clipboard}
        />
        <CardDetails
          title="solucao"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status === 'open' && (
            <Input
              placeholder="Descricao da solucao"
              onChangeText={setSolution}
              textAlignVertical="top"
              multiline
              h={24}
            />
          )}
        </CardDetails>
      </ScrollView>
      {order.status === 'open' && (
        <Button
          title="Encerrar solicitacao"
          m={5}
          onPress={handleOrderClosed}
        />
      )}
    </VStack>
  )
}
