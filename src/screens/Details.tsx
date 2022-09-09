import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { HStack, VStack, useTheme, Text, ScrollView, Box } from 'native-base'
import firestore from '@react-native-firebase/firestore'
import { Header } from '../components/Header'
import { PetsProps } from '../components/Pets'
import { PetsFirestoreDTO } from '../DTOs/OrderDTO'
import { dateFormat } from '../utils/firestoreDateFormat'
import { Loading } from '../components/Loading'
import {
  CircleWavyCheck,
  Hourglass,
  PawPrint ,
  Clipboard
} from 'phosphor-react-native'
import { CardDetails } from '../components/CardDetails'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

type RouteParams = {
  petsId: string
}

type PetsDatails = PetsProps & {
  descricao: string
  closed: string
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true)

  const [pets, setPets] = useState<PetsDatails>({} as PetsDatails)

  const route = useRoute()
  const { petsId } = route.params as RouteParams

  const { colors } = useTheme()
  const navigation = useNavigation()

  function handlePetsClosed() {
    firestore()
      .collection<PetsFirestoreDTO>('pets')
      .doc(petsId)
      .update({
        status: 'adotado',
        closed_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Pet', 'Animal adotado!.')
        navigation.goBack()
      })
      .catch(error => {
        console.log(error)
        Alert.alert('Solicitacao', 'Nao foi possivel encerrar a solicitacao.')
      })
  }

  useEffect(() => {
    firestore()
      .collection<PetsFirestoreDTO>('pets')
      .doc(petsId)
      .get()
      .then(doc => {
        const { nome, descricao, status, created_at, closed_at, adotar } =
          doc.data()
        const closed = closed_at ? dateFormat(closed_at) : null

        setPets({
          id: doc.id,
          nome,
          descricao,
          status,
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
    <VStack flex={1} bg="primary.100">
      <Box px={6} bg="primary.700">
        <Header title="Animal" />
      </Box>
      <HStack bg="primary.700" justifyContent="center" p={4}>
        {pets.status === 'adotado' ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
        
          fontSize="sm"
          color={
            pets.status === 'adotado'
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        
        >
          {pets.status === 'adotado' ? 'Animal adotado' : 'Animal nao adotado'}
        </Text>
      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="Animal"
          description={
            `Nome: ${pets.nome}`
            
          }
          icon={PawPrint }
          footer={pets.when}
        />
        <CardDetails
          title="descricao do animal"
          description={pets.descricao}
          icon={Clipboard}
        />
      </ScrollView>
      {pets.status === 'naoadotado' && (
        <Button title="Adotar animal" m={5} onPress={handlePetsClosed} />
      )}
    </VStack>
  )
}
