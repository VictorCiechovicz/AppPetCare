import { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { VStack, HStack } from 'native-base'
import firestore from '@react-native-firebase/firestore'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [raca, setRaca] = useState('')
  const [idade, setIdade] = useState('')

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
      <VStack px={5} mt={5} mb={10}>
        <Input placeholder="Nome do animal" onChangeText={setNome} />
        <Input placeholder="Raca" mt={1} onChangeText={setRaca} />
        <Input placeholder="Idade" mt={1} onChangeText={setIdade} />
        <Input placeholder="Imagem do animal" mt={1} onChangeText={setNome} />
        <Input
          placeholder="Descricao do animal"
         
          mt={1}
          multiline
          textAlignVertical="top"
          onChangeText={setDescricao}
        />
      </VStack>

      <VStack flex={1} px={6} mt={5}>
        <Button
          title="Cadastrar"
          onPress={headleNewPetRegister}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  )
}
