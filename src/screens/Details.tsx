import { useEffect, useState } from 'react'
import { Alert, ImageBackground, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'
import {
  HStack,
  VStack,
  IconButton,
  Image,
  ScrollView,
  Text
} from 'native-base'

import firestore from '@react-native-firebase/firestore'

import { PetsProps } from '../components/Pets'
import { PetsFirestoreDTO } from '../DTOs/PetsDTO'

import { dateFormat } from '../utils/firestoreDateFormat'
import { Loading } from '../components/Loading'
import { CaretLeft, Heart, Smiley } from 'phosphor-react-native'
import { CardDetails } from '../components/CardDetails'
import { Button } from '../components/Button'

import ImagePerfil from '../../assets/ImagePerfil.png'

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
  const [favorito, setFavorito] = useState(false)

  const route = useRoute()
  const { petsId } = route.params as RouteParams

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
          closed_at,
          nomeUser,
          imagemUser,
          userUId
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
          status,
          photo_url,
          when: dateFormat(created_at),
          closed,
          nomeUser,
          imagemUser,
          userUId
        })

        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <Loading />
  }

  function handlePetFavorito() {
    if (!favorito) {
      setFavorito(true)
    } else {
      setFavorito(false)
    }
  }

  function handleGoBack() {
    navigation.goBack()
  }
  return (
    <ScrollView>
      <VStack flex={1} bg="#ffffff6f" alignItems="center">
        <ImageBackground
          source={{ uri: pets.photo_url }}
          style={{ width: 500, height: 500 }}
        >
          <HStack
            justifyContent="space-between"
            alignItems="center"
            ml={20}
            mr={20}
          >
            <IconButton
              mt={10}
              backgroundColor="transparent"
              icon={<CaretLeft color="white" size={40} />}
              onPress={handleGoBack}
            />
            <IconButton
              mt={10}
              backgroundColor="transparent"
              icon={
                <TouchableOpacity onPress={handlePetFavorito}>
                  <Heart color={favorito ? 'red' : 'white'} size={40} />
                </TouchableOpacity>
              }
            />
          </HStack>
        </ImageBackground>

        <CardDetails
          title={pets.nome}
          statusanimal={
            pets.status === 'adotado' ? (
              <>
                <Smiley color="#9CFF2E" size={40} />
                <Text color="#9CFF2E">Animal Adotado</Text>
              </>
            ) : (
              <></>
            )
          }
          raca={pets.raca}
          idade={`${pets.idade} anos`}
          cidade={`${pets.cidade} - `}
          estado={pets.estado}
          usuarionome={!pets.nomeUser ? 'Perfil An??nimo' : pets.nomeUser}
          usuarioimagem={
            !pets.imagemUser ? (
              <Image
                shadow={2}
                borderRadius={20}
                w={12}
                h={12}
                source={ImagePerfil}
                alt="profile"
              />
            ) : (
              <Image
                shadow={2}
                borderRadius={20}
                w={12}
                h={12}
                source={{ uri: pets.imagemUser }}
                alt="profile"
              />
            )
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
            Descri????o
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
