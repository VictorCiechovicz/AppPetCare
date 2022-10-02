import { useState, useEffect } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { HStack, VStack, useTheme, Text, Image } from 'native-base'
import { useNavigation,useRoute } from '@react-navigation/native'

import { Gear } from 'phosphor-react-native'
import ProfileImage from '../../assets/profile.png'

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import { UsersFirestoreDTO } from '../DTOs/UsersDTO'

type RouteParams = {
  userId: string
}

type userDatails={
  id:string
  nome:string
  cidade:string
  estado:string
  photo_url:string

}



export function Perfil() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<userDatails>({} as userDatails)
  const [userUId, setUserUId] = useState('')

  const { colors } = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  
  const { userId } = route.params as RouteParams

  useEffect(() => {
    const user = auth().currentUser
    user.providerData.forEach(userInfo => {
      setUserUId(userInfo.uid)
    })
  }, [])

  useEffect(() => {
    firestore()
      .collection<UsersFirestoreDTO>('user')
      .doc(userId)
      .get()
      .then(doc => {
        const { nome, cidade, estado, photo_url } = doc.data()

        setUser({
          id: doc.id,
          nome,
          cidade,
          estado,
          photo_url
        })
      })
  }, [])



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
          source={ProfileImage}
          alt="image profile"
          h="200"
          w="200"
          borderRadius="100"
        />
      </HStack>

      <VStack alignItems="center">
        <Text fontSize={24} fontWeight="bold">
        {user.nome}
        </Text>
        <HStack>
          <Text fontSize={15}>Cidade</Text>
          <Text fontSize={15}>-Estado</Text>
        </HStack>
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
