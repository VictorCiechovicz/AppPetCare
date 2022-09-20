import { useState } from 'react'

import {
  VStack,
  Heading,
  Icon,
  useTheme,
  Text,
  HStack,
  Image
} from 'native-base'
import { Envelope, Key, User } from 'phosphor-react-native'
import { AntDesign } from '@expo/vector-icons'
import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { Alert, TouchableOpacity } from 'react-native'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'

import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions
} from 'react-native-image-picker'

export function NewUser() {
  const [isLoading, setIsLoading] = useState(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imagemPerfil, setImagemPerfil] = useState('')
  const [imagemPerfilURL, setImagemPerfilURL] = useState('')

  const { colors } = useTheme()
  const navigation = useNavigation()

  //funcao para abrir as opcao para imagem
  const handleImageProfile = () => {
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
      setImagemPerfil(result.assets[0].uri!)

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
      setImagemPerfil(result.assets[0].uri!)
      return
    }
  }
  //função que manda a imagem,nome,email e baixa a url da imagem

  const Firebase = {
    getCurrentUser: () => {
      return firebase.auth().currentUser
    }
  }

  async function handleNewUser() {
    if (!email || !password || !imagemPerfil || !nome) {
      return Alert.alert('Entrar', 'Preencha todos os campos.')
    }
    setIsLoading(true)
    auth().createUserWithEmailAndPassword(email, password)
    const uid = Firebase.getCurrentUser().uid

    let imagemPerfilURL = 'default'

    await firestore()
      .collection('users')
      .doc(uid)
      .set({
        nome,
        email,
        imagemPerfilURL
      })

      .then(() => {
        Alert.alert('Cadastro', 'Usuario cadastrado com sucesso!')
        navigation.goBack()
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)

        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Entrar', 'E-mail inválido.')
        }

        return Alert.alert('Entrar', 'Não foi possível acessar')
      })
      .finally(() => setIsLoading(false))
  }

  async function uploadImageProfile(uri: any) {
    const uid = Firebase.getCurrentUser().uid
    try {
      const photo = await Firebase.getBlob(uri)
      const imageRef = storage().ref('fotoPerfil').child(uid)
      await imageRef.put(photo)

      const url = await imageRef.getDownloadURL()

      await firestore().collection('users').doc(uid).update({
        imagemPerfilURL: url
      })

      return url
    } catch (error) {
      console.log('Error @uploadImageProfile', error)
    }
  }

  async function getBlob(uri: any) {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.onload = () => {
        resolve(xhr.response)
      }

      xhr.onerror = () => {
        reject(new TypeError('Falha na requisição.'))
      }

      xhr.responseType = 'blob'
      xhr.open('GET', uri, true)
      xhr.send(null)
    })
  }

  const uploadEveryThingPage = () => {
    handleNewUser()
    uploadImageProfile()
  }

  return (
    <VStack flex={1} alignItems="center" bg="primary.100" px={8} pt={20}>
      <Heading
        color={colors.gray[700]}
        fontSize="30"
        mt={1}
        mb={6}
        textTransform="uppercase"
      >
        Cadastro
      </Heading>
      <TouchableOpacity onPress={handleImageProfile}>
        {!imagemPerfil ? (
          <HStack
            bg="#e1e2e6"
            w={40}
            h={40}
            borderRadius={80}
            mb={10}
            alignItems="center"
            justifyContent="center"
          >
            <HStack>
              <AntDesign name="plus" size={24} color="#ffff" />
            </HStack>
          </HStack>
        ) : (
          <Image
            w={40}
            h={40}
            borderRadius={80}
            mb={10}
            source={{ uri: imagemPerfil }}
            alt="foto perfil"
          />
        )}
      </TouchableOpacity>

      <Input
        mb={3}
        placeholder="Nome"
        InputLeftElement={
          <Icon as={<User color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setNome}
      />

      <Input
        mb={3}
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />
      <Input
        mb={10}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button
        title="Cadastro"
        w="full"
        onPress={uploadEveryThingPage}
        isLoading={isLoading}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text color={colors.gray[300]} fontSize="15" mt={5}>
          Já tenho uma conta!
        </Text>
      </TouchableOpacity>
    </VStack>
  )
}
