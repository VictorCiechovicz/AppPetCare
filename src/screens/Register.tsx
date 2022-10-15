import { useState, useEffect } from 'react'
import { Alert, TouchableOpacity, Image } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import {
  VStack,
  HStack,
  Box,
  ScrollView,
  Select,
  Text,
  useTheme
} from 'native-base'

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'

import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Loading } from '../components/Loading'

import { Check } from 'phosphor-react-native'

import * as ImagePicker from 'expo-image-picker'

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [raca, setRaca] = useState('')
  const [idade, setIdade] = useState('')
  const [imagem, setImagem] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [userUId, setUserUId] = useState('')
  const [nomeUser, setNomeUser] = useState('')
  const [imagemUser, setImagemUser] = useState('')

  const navigation = useNavigation()
  const { colors } = useTheme()
  const estaNaTela = useIsFocused()

  //pegar o uid do usuario logado
  useEffect(() => {
    const user = auth().currentUser
    user.providerData.forEach(userInfo => {
      setUserUId(userInfo.uid)
      setNomeUser(userInfo.displayName)
      setImagemUser(userInfo.photoURL)
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
    if (!nome || !descricao || !raca || !idade || !cidade || !estado) {
      return Alert.alert('Registrar', 'Preencha todos os campos!')
    }
    setIsLoading(true)

    const fileName = new Date().getTime()
    //const salva na storage na pasta de pizzas que foi criada la
    const reference = storage().ref(`/petsImage/${fileName}.png`)

    await reference.putFile(imagem)
    //constante que vai la no storage e pega a URL da imagem usando a reference
    const photo_url = await reference.getDownloadURL()

    firestore()
      .collection('pets')
      .add({
        nome,
        name_insensitive: nome.toLowerCase().trim(),
        raca,
        descricao,
        idade,
        cidade,
        estado,
        status: 'naoadotado',
        photo_url,
        photo_path: reference.fullPath,
        created_at: firestore.FieldValue.serverTimestamp(),
        userUId,
        nomeUser,
        imagemUser
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


  return (
    <VStack flex={1} bg="#ffffff6f">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        px={3}
      >
        <Header title="Cadastro" />
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HStack
          flex={1}
          alignItems="center"
          justifyContent="center"
          mb={5}
          mt={5}
        >
          <TouchableOpacity onPress={handlePickerImage}>
            {!imagem ? (
              <Box
                px={6}
                borderRadius={100}
                borderWidth={1}
                alignItems="center"
                justifyContent="center"
                h="200"
                w="200"
                borderStyle="dashed"
                borderColor={colors.gray[300]}
                bg="white"
              >
                <Text textAlign="center" color={colors.gray[300]}>
                  Adicione uma foto {``}
                  do seu animal.
                </Text>
              </Box>
            ) : (
              <Image
                style={{ height: 200, width: 200, borderRadius: 100 }}
                source={{ uri: imagem }}
              />
            )}
          </TouchableOpacity>
        </HStack>

        <VStack px={5} mt={5} mb={5}>
          <Input
            placeholder="Nome do animal"
            onChangeText={setNome}
            borderColor={colors.gray[300]}
          />

          <Box maxW="300">
            <Select
              borderColor={colors.gray[300]}
              bg="#ffff"
              selectedValue={raca}
              w={354}
              h={14}
              borderWidth={1}
              borderRadius={10}
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
          <Input
            placeholder="Idade"
            mt={5}
            onChangeText={setIdade}
            borderColor={colors.gray[300]}
          />
          <Input
            placeholder="Cidade"
            mt={5}
            onChangeText={setCidade}
            borderColor={colors.gray[300]}
          />
          <Box maxW="300">
            <Select
              bg="#ffff"
              selectedValue={estado}
              w={354}
              h={14}
              borderWidth={1}
              borderColor={colors.gray[300]}
              borderRadius={10}
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
            borderColor={colors.gray[300]}
            placeholder="Descricao do animal"
            mt={5}
            h={40}
            multiline
            textAlignVertical="top"
            onChangeText={setDescricao}
          />
        </VStack>

        <VStack flex={1} px={6} mt={10} mb={5}>
          <Button title="Cadastrar" onPress={handleAdd} isLoading={isLoading} />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
