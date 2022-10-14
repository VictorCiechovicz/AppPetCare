import { useState, useEffect, useCallback } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Heading,
  FlatList,
  Circle,
  Icon
} from 'native-base'

import { dateFormat } from '../utils/firestoreDateFormat'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation, useIsFocused } from '@react-navigation/native'

import {
  SignOut,
  Dog,
  PawPrint,
  MagnifyingGlass,
  X
} from 'phosphor-react-native'

import { Loading } from '../components/Loading'

import { Pets, PetsProps } from '../components/Pets'

import { Input } from '../components/Input'

export function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [pets, setPets] = useState<PetsProps[]>([])
  const [search, setSearch] = useState('')

  const { colors } = useTheme()

  const navigation = useNavigation()
  const estaNaTela = useIsFocused()

  function handleOpenDetails(petsId: string) {
    navigation.navigate('details', { petsId })
  }

  function handleLogout() {
    auth()
      .signOut()
      .catch(error => {
        console.log(error)
        return Alert.alert('Sair', 'Não foi possível sair.')
      })
  }

  useEffect(() => {
    setIsLoading(true)

    const subscribe = firestore()
      .collection<PetsProps>('pets')
      .where('status', '==', 'naoadotado')
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
            nomeUser,
            imagemUser,
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
            nomeUser,
            imagemUser,
            userUId,
            when: dateFormat(created_at)
          }
        })
        setPets(data)
        setIsLoading(false)
      })
    return subscribe
  }, [estaNaTela])



  
  return (
    <VStack flex={1} pb={6} bg="#ffffff6f">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="flex-end"
        bg="white"
        pt={10}
        pb={1}
        px={6}
      >
        <HStack alignItems="flex-end" mt={22}>
          <PawPrint size={80} color={colors.secondary[700]} />
          <Text fontSize="32" fontWeight="bold" color="secondary.700">
            PetCare
          </Text>
        </HStack>

        <IconButton
          icon={<SignOut size={32} color={colors.secondary[700]} />}
          onPress={handleLogout}
        />
      </HStack>

      <Input
        borderColor={colors.gray[300]}
        onChangeText={setSearch}
        value={search}
        alignSelf="center"
        mx={3}
        placeholder="pesquisar..."
        InputLeftElement={
          <TouchableOpacity>
            <Icon as={<MagnifyingGlass color={colors.gray[300]} />} ml={4} />
          </TouchableOpacity>
        }
        InputRightElement={
          <TouchableOpacity>
            <Icon as={<X color={colors.gray[300]} />} mr={4} />
          </TouchableOpacity>
        }
      />

      <VStack flex={1} px={2}>
        <HStack
          w="full"
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        ></HStack>
        <HStack space={3} mb={5}></HStack>
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
