import { useState, useEffect } from 'react'
import { Alert, ScrollView, TouchableOpacity } from 'react-native'
import {
  HStack,
  VStack,
  useTheme,
  Text,
  Box,
  FlatList,
  Image,
  Select
} from 'native-base'

import { Input } from '../components/Input'

import { useNavigation, useRoute } from '@react-navigation/native'
import { UsersFirestoreDTO } from '../DTOs/UsersDTO'

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'

import * as ImagePicker from 'expo-image-picker'
import {  X } from 'phosphor-react-native'
import { Button } from '../components/Button'

type RouteParams = {
  userId: string
}

type UserDatails = {
  id: string
  cidade: string
  estado: string
  nome: string
  photo_url: string
}

export function PerfilEdit() {
  const [isLoading, setIsLoading] = useState(false)
  const [nome, setNome] = useState<string>('')
  const [imagem, setImagem] = useState('')
  const [userUId, setUserUId] = useState('')
  const [user, setUser] = useState<UserDatails>({} as UserDatails)

  const { colors } = useTheme()
  const navigation = useNavigation()

  //pegar o uid do usuario logado
  useEffect(() => {
    const user = auth().currentUser
    user.providerData.forEach(userInfo => {
      console.log(userInfo)
      setNome(userInfo.displayName)
      setImagem(userInfo.photoURL)
    })
  }, [])

  //função chama que pede a autorização do usuario para acessar biblioteca de fotos do dispositivo e depois puxa a imagem e armazana a uri.
  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      })
      if (!result.cancelled) {
        setImagem(result.uri)
      }
    }
  }

  async function handleAdd() {
    if (!nome || !imagem) {
      return Alert.alert('Registrar', 'Preencha todos os campos!')
    }
    setIsLoading(true)

    const fileName = new Date().getTime()
    
    //const salva na storage na pasta de pizzas que foi criada la
    const reference = storage().ref(`/usersImage/${fileName}.png`)

    await reference.putFile(imagem)
    //constante que vai la no storage e pega a URL da imagem usando a reference
    const photo_url = await reference.getDownloadURL()

    const update = {
      displayName: nome,
      photoURL: photo_url
    }
    await auth()
      .currentUser.updateProfile(update)

      .then(() => {
        Alert.alert('Cadastro', 'Salvo com sucesso!')
        navigation.goBack()
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
        return Alert.alert(
          'Cadastro',
          'Nao foi possivel alterar as informações!'
        )
      })
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
        mb={10}
      >
        <HStack alignItems="center" mt={22}>
          <Text fontSize="32" fontWeight="bold" color="secondary.700">
            Editar Perfil
          </Text>
        </HStack>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X size={25} color={colors.gray[300]} />
        </TouchableOpacity>
      </HStack>
      <ScrollView>
        <HStack flex={1} alignItems="center" justifyContent="center" mb={5}>
          <TouchableOpacity onPress={handlePickerImage}>
            {!imagem ? (
              <Box
                alignItems="center"
                justifyContent="center"
                h="200"
                w="200"
                px={6}
                borderRadius={100}
                borderWidth={1}
                borderStyle="dashed"
                bg="white"
              >
                Adicione uma foto sua
              </Box>
            ) : (
              <Image
                style={{ height: 200, width: 200, borderRadius: 100 }}
                source={{ uri: imagem }}
                alt="perfil foto"
              />
            )}
          </TouchableOpacity>
        </HStack>

        <VStack px={5} mt={5} mb={5}>
          <Input
            placeholder="Nome completo"
            onChangeText={setNome}
            value={nome}
          />

          <Button
            mt={10}
            title="Salvar"
            onPress={handleAdd}
            isLoading={isLoading}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
