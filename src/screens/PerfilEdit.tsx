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

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'

import * as ImagePicker from 'expo-image-picker'

import { Check, X } from 'phosphor-react-native'

import { Button } from '../components/Button'

export function PerfilEdit() {
  const [isLoading, setIsLoading] = useState(false)
  const [nome, setNome] = useState('')
  const [imagem, setImagem] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [userUId, setUserUId] = useState('')

  const { colors } = useTheme()

  const navigation = useNavigation()

  //pegar o uid do usuario logado
  useEffect(() => {
    const user = auth().currentUser
    user.providerData.forEach(userInfo => {
      setUserUId(userInfo.uid)
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
    if (!nome || !cidade || !estado) {
      return Alert.alert('Registrar', 'Preencha todos os campos!')
    }
    setIsLoading(true)

    const fileName = new Date().getTime()
    //const salva na storage na pasta de pizzas que foi criada la
    const reference = storage().ref(`/usersImage/${fileName}.png`)

    await reference.putFile(imagem)
    //constante que vai la no storage e pega a URL da imagem usando a reference
    const photo_url = await reference.getDownloadURL()

    firestore()
      .collection('users')
      .add({
        nome,
        cidade,
        estado,
        photo_url,
        photo_path: reference.fullPath,
        userUId
      })
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

          <Input
            placeholder="Cidade"
            mt={5}
            onChangeText={setCidade}
            value={cidade}
          />
          <Box maxW="300">
            <Select
              selectedValue={estado}
              w={354}
              h={14}
              borderWidth={1}
              borderColor="#000"
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
