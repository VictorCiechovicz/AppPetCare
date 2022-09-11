import { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
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

export function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [statusSelected, setStatusSelected] = useState<
    'naoadotado' | 'adotado'
  >('naoadotado')

  const [pets, setPets] = useState<PetsProps[]>([])

  const { colors } = useTheme()

  const navigation = useNavigation()

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
      .collection('pets')
      .where('status', '==', statusSelected)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { nome, raca, descricao, idade,cidade,estado, status, created_at } = doc.data()

          return {
            id: doc.id,
            nome,
            raca,
            idade,
            cidade,
            estado,
            descricao,
            status,
            when: dateFormat(created_at)
          }
        })
        setPets(data)
        setIsLoading(false)
      })
    return subscribe
  }, [statusSelected])

  
  return (
    <VStack flex={1} pb={6} bg="primary.100">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="primary.700"
        pt={10}
        pb={1}
        px={6}
      >
        <HStack>
          <PawPrint size={40} color={colors.gray[100]} />
          <Text fontSize="30" fontWeight="bold" color={colors.gray[100]}>
            PETCARE
          </Text>
        </HStack>

        <IconButton
          icon={<SignOut size={26} color={colors.gray[100]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        ></HStack>
        <HStack space={3} mb={5}>
          <Filter
            type="naoadotado"
            title="Nao adotados"
            onPress={() => setStatusSelected('naoadotado')}
            isActive={statusSelected === 'naoadotado'}
          />
          <Filter
            type="adotado"
            title="adotados"
            onPress={() => setStatusSelected('adotado')}
            isActive={statusSelected === 'adotado'}
          />
        </HStack>
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
