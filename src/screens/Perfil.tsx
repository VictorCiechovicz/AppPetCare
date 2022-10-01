import { useState, useEffect } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import {
  HStack,
  VStack,
  useTheme,
  Text,
  Box,
  FlatList,
  Image
} from 'native-base'

import { useNavigation } from '@react-navigation/native'

import { Gear } from 'phosphor-react-native'
import ProfileImage from '../../assets/profile.png'
import firestore from '@react-native-firebase/firestore'

type UsersDatails = {
  id: string
  nome: string
  cidade: string
  estado: string
  photo_url: string
  photo_path: string
}

export function Perfil() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<UsersDatails>([])

  const { colors } = useTheme()

  const navigation = useNavigation()

  useEffect(() => {
    setIsLoading(true)
    const subscribe = firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { nome, cidade, estado, photo_url } = doc.data()

          return {
            id: doc.id,
            nome,
            cidade,
            estado,
            photo_url
          }
        })
        setUser(data)
        setIsLoading(false)
      })
    return subscribe
  }, [id])

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
        {

          !user.photo_url?(

            <Image
            source={ProfileImage}
            alt="image profile"
            h="200"
            w="200"
            borderRadius="100"
          />


          ):(

            <Image
            source={{uri:user.photo_url}}
            alt="image profile"
            h="200"
            w="200"
            borderRadius="100"
          />
          )
           
       
        }
       
      </HStack>

      <VStack alignItems="center">
        <Text fontSize={24} fontWeight="bold">
          Nome
        </Text>
        <HStack>
          <Text fontSize={15}>Cidade</Text>
          <Text fontSize={15}>-Estado</Text>
        </HStack>
      </VStack>
      <VStack flex={1} px={2} mt={50}>
        <HStack
          w="full"
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        ></HStack>
      </VStack>
    </VStack>
  )
}
