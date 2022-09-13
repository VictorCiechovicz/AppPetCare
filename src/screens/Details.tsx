import { useEffect, useState } from 'react'
import { Alert, ImageBackground } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { HStack, VStack, useTheme, IconButton, Image } from 'native-base'
import firestore from '@react-native-firebase/firestore'
import { Header } from '../components/Header'
import { PetsProps } from '../components/Pets'
import { PetsFirestoreDTO } from '../DTOs/PetsDTO'
import { dateFormat } from '../utils/firestoreDateFormat'
import { Loading } from '../components/Loading'
import { CaretLeft, PawPrint } from 'phosphor-react-native'
import { CardDetails } from '../components/CardDetails'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

import dog from '../../assets/dog.jpg'

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
        const {
          nome,
          raca,
          idade,
          cidade,
          estado,
          descricao,
          status,
          created_at,
          closed_at
        } = doc.data()
        const closed = closed_at ? dateFormat(closed_at) : null

        setPets({
          id: doc.id,
          nome,
          raca,
          idade,
          cidade,
          estado,
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

  function handleGoBack() {
    navigation.goBack()
  }
  return (
    <VStack flex={1} bg="primary.100" alignItems="center">
      <ImageBackground source={dog} style={{ width: 500, height: 500 }}>
        <IconButton
          mt={10}
          mr={320}
          backgroundColor="transparent"
          icon={<CaretLeft color={colors.gray[100]} size={30} />}
          onPress={handleGoBack}
        />
      </ImageBackground>

      <CardDetails
        title={pets.nome}
        raca={pets.raca}
        idade={`${pets.idade} years old`}
        cidade={`${pets.cidade} - `}
        estado={pets.estado}
        footer={`Anunciado: ${pets.when}`}
      />

      {pets.status === 'naoadotado' && (
        <Button
          title="Adotar animal"
          m={5}
          onPress={handlePetsClosed}
          w={300}
        />
      )}
    </VStack>
  )
}
