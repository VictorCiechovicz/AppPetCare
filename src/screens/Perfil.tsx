import { Header } from '../components/Header'

import { useState, useEffect } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Box,
  Heading,
  FlatList,
  Circle
} from 'native-base'

import { dateFormat } from '../utils/firestoreDateFormat'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

import { SignOut, Dog, PawPrint } from 'phosphor-react-native'

import { Loading } from '../components/Loading'
import { Filter } from '../components/Filter'
import { Button } from '../components/Button'
import { Pets, PetsProps } from '../components/Pets'
import Logo from '../../assets/logo_secondary.svg'

export function Perfil() {
  const [isLoading, setIsLoading] = useState(true)

  const [pets, setPets] = useState<PetsProps[]>([])

  const { colors } = useTheme()

  const navigation = useNavigation()

  function handleOpenDetails(petsId: string) {
    navigation.navigate('details', { petsId })
  }

  useEffect(() => {
    setIsLoading(true)

    const subscribe = firestore()
      .collection('pets')
      .where('status', '==', 'naoadotado')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const {
            nome,
            raca,
            descricao,
            idade,
            cidade,
            estado,
            imagemurl,
            status,
            created_at
          } = doc.data()

          return {
            id: doc.id,
            nome,
            raca,
            idade,
            cidade,
            estado,
            descricao,
            imagemurl,
            status,
            when: dateFormat(created_at)
          }
        })
        setPets(data)
        setIsLoading(false)
      })
    return subscribe
  }, [])

  return (
    <VStack flex={1} pb={6} bg="primary.100">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="primary.700"
        px={6}
      >
        <Header title="perfil" textDecoration="uppercase" />
      </HStack>

      <HStack flex={1} alignItems="center" justifyContent="center" mb={5}>
        <TouchableOpacity>
          <Box
            alignItems="center"
            justifyContent="center"
            h="200"
            w="200"
            px={6}
            borderRadius={100}
            borderWidth={1}
            borderStyle="dashed"
            bg="primary.200"
          >
            Escolha uma foto
          </Box>
        </TouchableOpacity>
      </HStack>

      <VStack flex={1} px={2} mt={50}>
        <HStack
          w="full"
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        ></HStack>

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={pets}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Pets data={item} onPress={() => handleOpenDetails(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Circle>
                <Dog color={colors.gray[300]} size={50} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Não possui nenhum animal cadastrado. {'\n'}
                </Text>
              </Circle>
            )}
          />
        )}
      </VStack>
    </VStack>
  )
}
