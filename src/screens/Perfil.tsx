import { useState, useEffect } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { HStack, VStack, useTheme, Text, Image } from 'native-base'
import { useNavigation, useIsFocused } from '@react-navigation/native'

import { Gear } from 'phosphor-react-native'
import ProfileImage from '../../assets/profile.png'

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import { UsersFirestoreDTO } from '../DTOs/UsersDTO'
import { Loading } from '../components/Loading'

type RouteParams = {
  userId: string
}

type userDatails = {
  id: string
  nome: string
  photo_url: string
}

export function Perfil() {
  const [isLoading, setIsLoading] = useState(true)
  const [nome, setNome] = useState<string>('')
  const [imagem, setImagem] = useState('')
  const [userUId, setUserUId] = useState('')

  const { colors } = useTheme()
  const navigation = useNavigation()
  const estaNaTela = useIsFocused()

  useEffect(() => {
    const user = auth().currentUser
    user.providerData.forEach(userInfo => {
      setNome(userInfo.displayName)
      setImagem(userInfo.photoURL)
    })
    setIsLoading(false)
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
      <HStack flex={1} alignItems="center" justifyContent="center" mb={5}>
        <Image
          source={{uri: imagem} }
          alt="image profile"
          h="200"
          w="200"
          borderRadius="100"
        />
      </HStack>

      <VStack alignItems="center">
        <Text fontSize={24} fontWeight="bold" textTransform="capitalize">
          {nome}
        </Text>
     
      </VStack>
      <VStack flex={1} px={2} mt={50}>
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
            Meus Animais
          </Text>
          <Text>FlatList aqui</Text>
        </VStack>
      </VStack>
    </VStack>
  )
}
