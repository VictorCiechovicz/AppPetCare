import { useState, useEffect } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { VStack, HStack, Image, Box, ScrollView, Select } from 'native-base'

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { utils } from '@react-native-firebase/app'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

import { Check } from 'phosphor-react-native'

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
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  const navigation = useNavigation()

  function headleNewPetRegister() {
    if (!nome || !descricao || !raca || !idade || !cidade || !estado) {
      return Alert.alert('Registrar', 'Preencha todos os campos!')
    }
    setIsLoading(true)
    firestore()
      .collection('pets')
      .add({
        nome,
        raca,
        idade,
        cidade,
        estado,
        status: 'naoadotado',
        descricao,
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Cadastro', 'Animal cadastrado com sucesso!')
        navigation.goBack()
        setIsLoading(false)
        setNome('')
        setDescricao('')
        setRaca('')
        setIdade('')
        setImagem('')
        setCidade('')
        setEstado('')
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

  //funcao para enviar para o firebase a imagem
  async function handleUpload() {
    const fileName = new Date().getTime()
    const MIME = imagem.match(/\.(?:.(?!\.))+$/) //esse MIME pega e repassa o tipo da imagem para salvar no Firebase.
    const reference = storage().ref(`/images/${fileName}${MIME}`)

    reference.putFile(imagem).catch(error => console.log(error))
  }

  //funcao que envia todos os arquivos do regitro de animais

  const uploadEveryThingPage = () => {
    headleNewPetRegister()
    handleUpload()
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
            ) : (
              <Image
                h="200"
                w="200"
                borderRadius={100}
                source={{ uri: imagem }}
                alt="foto do animal"
              />
            )}
          </TouchableOpacity>
        </HStack>

        <VStack px={5} mt={5} mb={5}>
          <Input placeholder="Nome do animal" onChangeText={setNome} />

          <Box maxW="300">
            <Select
              selectedValue={raca}
              w={354}
              h={14}
              borderWidth={1}
              placeholder="Escolha a Raca"
              size="md"
              placeholderTextColor="gray.300"
              _selectedItem={{
                bg: 'gray.300',
                endIcon: <Check size={10} />
              }}
              mt={5}
              onValueChange={itemValue => setRaca(itemValue)}
            >
              <Select.Item label="Cachorro" value="Cachorro" />
              <Select.Item label="Gato" value="Gato" />
            </Select>
          </Box>
          <Input placeholder="Idade" mt={5} onChangeText={setIdade} />
          <Input placeholder="Cidade" mt={5} onChangeText={setCidade} />
          <Box maxW="300">
            <Select
              selectedValue={estado}
              w={354}
              h={14}
              borderWidth={1}
              placeholder="Estado"
              size="md"
              placeholderTextColor="gray.300"
              _selectedItem={{
                bg: 'gray.300',
                endIcon: <Check size={10} />
              }}
              mt={5}
              onValueChange={itemValue => setEstado(itemValue)}
            >
              <Select.Item label="Acre" value="AC" />
              <Select.Item label="Alagoas" value="AL" />
              <Select.Item label="Amapá" value="AP" />
              <Select.Item label="Amazonas" value="AM" />
              <Select.Item label="Bahia" value="BA" />
              <Select.Item label="Ceará" value="CE" />
              <Select.Item label="Destrito Federal" value="DF" />
              <Select.Item label="Espírito Santo" value="ES" />
              <Select.Item label="Goiás" value="GO" />
              <Select.Item label="Maranhao" value="MA" />
              <Select.Item label="Mato Grosso" value="MT" />
              <Select.Item label="Mato Grosso do Sul" value="MS" />
              <Select.Item label="Minas Gerais" value="MG" />
              <Select.Item label="Pará" value="PA" />
              <Select.Item label="Paraíba" value="PB" />
              <Select.Item label="Paraná" value="PR" />
              <Select.Item label="Pernanbuco" value="PE" />
              <Select.Item label="Piauí" value="PI" />
              <Select.Item label="Rio de Janeiro" value="RJ" />
              <Select.Item label="Rio Grande do Norte" value="RN" />
              <Select.Item label="Rio Grande do Sul" value="RS" />
              <Select.Item label="Rondonia" value="RO" />
              <Select.Item label="Roraima" value="RR" />
              <Select.Item label="Santa Catarina" value="SC" />
              <Select.Item label="Sao Paulo" value="SP" />
              <Select.Item label="Sergipe" value="SE" />
              <Select.Item label="Tocantins" value="TO" />
            </Select>
          </Box>

          <Input
            placeholder="Descricao do animal"
            mt={5}
            h={40}
            multiline
            textAlignVertical="top"
            onChangeText={setDescricao}
          />
        </VStack>

        <VStack flex={1} px={6} mt={5} mb={5}>
          <Button
            title="Cadastrar"
            onPress={uploadEveryThingPage}
            isLoading={isLoading}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
