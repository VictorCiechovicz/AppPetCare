import { useEffect, useState } from 'react'
import { Alert, ImageBackground } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  HStack,
  VStack,
  useTheme,
  IconButton,
  Image,
  ScrollView,
  Text
} from 'native-base'
import firestore from '@react-native-firebase/firestore'
import { Header } from '../components/Header'
import { PetsProps } from '../components/Pets'
import { PetsFirestoreDTO } from '../DTOs/PetsDTO'
import { UsersFirestoreDTO } from '../DTOs/UsersDTO'
import { dateFormat } from '../utils/firestoreDateFormat'
import { Loading } from '../components/Loading'
import { CaretLeft, Heart } from 'phosphor-react-native'
import { CardDetails } from '../components/CardDetails'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import Profile from '../../assets/profile.png'

type RouteParams = {
  petsId: string
  userId: string
}

type PetsDatails = PetsProps & {
  descricao: string
  closed: string
}

type UserDatails = {
  id:string
  nome: string
  photo_url: string
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true)
  const [pets, setPets] = useState<PetsDatails>({} as PetsDatails)
  const [user, setUser] = useState<UserDatails>({} as UserDatails)

  const route = useRoute()
  const { petsId } = route.params as RouteParams
  const { userId } = route.params as RouteParams

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
          photo_url,
          created_at,
          closed_at
        } = doc.data()
        const closed = closed_at ? dateFormat(closed_at) : null

        setPets({
          id: doc.id,
          nome,
          name_insensitive: nome.toLowerCase().trim(),
          raca,
          idade,
          cidade,
          estado,
          descricao,
          photo_url,
          status,
          when: dateFormat(created_at),
          closed
        })

        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    firestore()
      .collection<UsersFirestoreDTO>('users')
      .doc(userId)
      .get()
      .then(doc => {
        const { nome, photo_url } = doc.data()

        setUser({
          id: doc.id,
          nome,
          photo_url
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
    <ScrollView>
      <VStack flex={1} bg="white" alignItems="center">
        <ImageBackground
          source={{ uri: pets.photo_url }}
          style={{ width: 500, height: 500 }}
        >
          <HStack justifyContent="space-between" alignItems="center" ml={20} mr={20}>
            <IconButton
              mt={10}
         
              backgroundColor="transparent"
              icon={<CaretLeft color="white" size={40} />}
              onPress={handleGoBack}
            />
            <IconButton
              mt={10}
             
              backgroundColor="transparent"
              icon={<Heart color="white" size={40} />}
            />
          </HStack>
        </ImageBackground>

        <CardDetails
          title={pets.nome}
          raca={pets.raca}
          idade={`${pets.idade} years old`}
          cidade={`${pets.cidade} - `}
          estado={pets.estado}
          usuarionome={!user.nome ? 'Anonimo' : user.nome}
          usuarioimagem={
            !user.photo_url
              ? 'https://assets.rockway.fi/teacher/63-md.png'
              : user.photo_url
          }
          footer={`Anunciado: ${pets.when}`}
        />

        <VStack
          alignItems="flex-start"
          alignSelf="flex-start"
          ml={6}
          mr={5}
          mb={5}
        >
          <Text
            color="secondary.700"
            fontWeight="bold"
            fontSize={20}
            textTransform="capitalize"
          >
            Descrição
          </Text>
          <Text textAlign="justify" textTransform="capitalize">
            {pets.descricao}
          </Text>
        </VStack>
        {pets.status === 'naoadotado' && (
          <Button
            title="Adotar animal"
            m={5}
            onPress={handlePetsClosed}
            w={300}
          />
        )}
      </VStack>
    </ScrollView>
  )
}
