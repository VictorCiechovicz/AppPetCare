import { useState, useEffect } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import {
  HStack,
  VStack,
  useTheme,
  Text,
  Image,
  FlatList,
  Circle
} from 'native-base'
import { useNavigation, useIsFocused } from '@react-navigation/native'

import { Gear, Dog } from 'phosphor-react-native'
import ImagePerfil from '../../assets/ImagePerfil.png'

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { dateFormat } from '../utils/firestoreDateFormat'
import { Pets, PetsProps } from '../components/Pets'

import { Loading } from '../components/Loading'

export function Perfil() {
  const [isLoading, setIsLoading] = useState(true)
  const [nome, setNome] = useState<string>('')
  const [imagem, setImagem] = useState('')
  const [userIdLog, setUserIdLog] = useState('')
  const [pets, setPets] = useState<PetsProps[]>([])

  const { colors } = useTheme()
  const navigation = useNavigation()
  const estaNaTela = useIsFocused()

  function handleOpenDetails(petsId: string) {
    navigation.navigate('details', { petsId })
  }

  useEffect(() => {
    const user = auth().currentUser
    user.providerData.forEach(userInfo => {
      setNome(userInfo.displayName)
      setImagem(userInfo.photoURL)
      setUserIdLog(userInfo.uid)
    })
    setIsLoading(false)
  }, [estaNaTela])

  useEffect(() => {
    setIsLoading(true)

    const subscribe = firestore()
      .collection<PetsProps>('pets')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const {
            nome,
            name_insensitive,
            raca,
            descricao,
            idade,
            cidade,
            estado,
            photo_url,
            status,
            created_at,
            userUId
          } = doc.data()

          return {
            id: doc.id,
            nome,
            name_insensitive,
            raca,
            idade,
            cidade,
            estado,
            descricao,
            photo_url,
            status,
            userUId,
            when: dateFormat(created_at)
          }
        })
        setPets(data)
        setIsLoading(false)
      })
    return subscribe
  }, [estaNaTela])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} pb={6} bg="white">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        pt={10}
        pb={1}
        px={6}
      >
        <HStack alignItems="center" mt={22}>
          <Text fontSize="32" fontWeight="bold" color="secondary.700">
            Perfil
          </Text>
        </HStack>
        <TouchableOpacity onPress={() => navigation.navigate('perfilEdit')}>
          <Gear size={32} color={colors.gray[300]} />
        </TouchableOpacity>
      </HStack>
      <HStack flex={1} alignItems="center" justifyContent="center">
        {!imagem ? (
          <Image
            source={ImagePerfil}
            alt="image profile"
            h="200"
            w="200"
            borderRadius="100"
          />
        ) : (
          <Image
            source={{ uri: imagem }}
            alt="image profile"
            h="200"
            w="200"
            borderRadius="100"
          />
        )}
      </HStack>

      <VStack alignItems="center">
        {!nome ? (
          <Text fontSize={26} fontWeight="bold" textTransform="capitalize">
            Perfil Anônimo
          </Text>
        ) : (
          <Text fontSize={26} fontWeight="bold" textTransform="capitalize">
            {nome}
          </Text>
        )}
      </VStack>
      <VStack flex={1} px={2} mt={50}>
        <VStack
          alignItems="flex-start"
          alignSelf="flex-start"
          ml={1}
          mr={5}
          mb={5}
        >
          <Text
            color="secondary.700"
            fontWeight="bold"
            fontSize={25}
            textTransform="capitalize"
            mb={3}
          >
            Meus Animais
          </Text>

          <VStack w={400} alignItems="flex-start">
            {isLoading ? (
              <Loading />
            ) : (
              <FlatList
                data={pets}
                keyExtractor={item => item.userUId}
                renderItem={({ item }) => (
                  <Pets
                    data={item}
                    onPress={() => handleOpenDetails(item.userUId)}
                  />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListEmptyComponent={() => (
                  <Circle>
                    <Dog color={colors.gray[300]} size={50} />
                    <Text
                      color="gray.300"
                      fontSize="xl"
                      mt={6}
                      textAlign="center"
                    >
                      Não possui nenhum animal cadastrado. {'\n'}
                    </Text>
                  </Circle>
                )}
              />
            )}
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  )
}
