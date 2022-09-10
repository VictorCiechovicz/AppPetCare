import { useState, useEffect } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { VStack, HStack, Image, Box } from 'native-base'

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { utils } from '@react-native-firebase/app'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions
} from 'react-native-image-picker'

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [raca, setRaca] = useState('')
  const [idade, setIdade] = useState('')
  const [imagem, setImagem] = useState<string>('')

  const navigation = useNavigation()

  function headleNewPetRegister() {
    if (!nome || !descricao) {
      return Alert.alert('Registrar', 'Preencha todos os campos!')
    }
    setIsLoading(true)
    firestore()
      .collection('pets')
      .add({
        nome,
        raca,
        idade,
        status: 'naoadotado',
        descricao,
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Cadastro', 'Animal cadastrado com sucesso!')
        navigation.goBack()
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
        return Alert.alert('Cadastro', 'Nao foi possivel cadastrar!')
      })
  }

  //funcao para abrir as opcao para imagem
  const handleImagePet = () => {
    Alert.alert(
      'Selecione',
      'Informe de onde voce quer pegar a foto',
      [
        {
          text: 'Galeria',
          onPress: () => pickImageFromGalery(),
          style: 'default'
        },
        {
          text: 'Camera',
          onPress: () => pickImageFromCamera(),
          style: 'default'
        }
      ],

      {
        cancelable: true,
        onDismiss: () => Alert.alert('Escolha uma imagem ')
      }
    )
  }
  //funcao que chama a galeria
  async function pickImageFromGalery() {
    const options: ImageLibraryOptions = {
      mediaType: 'photo'
    }

    const result = await launchImageLibrary(options)

    if (result.assets) {
      setImagem(result.assets[0].uri!)
      return
    }
  }

  //funcao que chama a camera
  async function pickImageFromCamera() {
    const options: CameraOptions = {
      mediaType: 'photo',
      saveToPhotos: false,
      cameraType: 'back',
      quality: 1
    }
    const result = await launchCamera(options)

    if (result.assets) {
      setImagem(result.assets[0].uri!)
      return
    }
  }

  //funcao para enviar para o firebase
  async function handleUpload() {
    const fileName = new Date().getTime()
    const reference = storage().ref(`/images/${fileName}.png`)

    reference.putFile(imagem).catch(error => console.log(error))
  }

  //funcao que envia todos os arquivos do regitro de animais

  const uploadEveryThingPage = () => {
    headleNewPetRegister()
    handleUpload()
    .then(() => {
      setIsLoading(false)
      setNome(null)
      setDescricao(null)
      setIdade(null)
      setImagem(null)
    })
  }

  return (
    <VStack flex={1} bg="primary.100">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="primary.700"
        px={6}
      >
        <Header title="cadastro" textDecoration="uppercase" />
      </HStack>
      <HStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        mb={5}
        mt={10}
      >
        <TouchableOpacity onPress={handleImagePet}>
          {!imagem ? (
            <Box
              alignItems="center"
              justifyContent="center"
              h="150"
              w="150"
              px={6}
              borderRadius={75}
              borderWidth={1}
              bg="gray.100"
            >
              Escolha uma foto
            </Box>
          ) : (
            <Image
              h="150"
              w="150"
              borderRadius={75}
              source={{ uri: imagem }}
              alt="foto do animal"
            />
          )}
        </TouchableOpacity>
      </HStack>

      <VStack px={5} mt={5} mb={5}>
        <Input placeholder="Nome do animal" onChangeText={setNome} />
        <Input placeholder="Raca" mt={1} onChangeText={setRaca} />
        <Input placeholder="Idade" mt={1} onChangeText={setIdade} />

        <Input
          placeholder="Descricao do animal"
          mt={1}
          multiline
          textAlignVertical="top"
          onChangeText={setDescricao}
        />
      </VStack>

      <VStack flex={1} px={6}>
        <Button
          title="Cadastrar"
          onPress={uploadEveryThingPage}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  )
}
