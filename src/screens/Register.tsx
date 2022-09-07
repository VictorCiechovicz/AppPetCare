import { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { VStack } from 'native-base'
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
        status: 'open',
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
    <VStack flex={1} p={6} bg="primary.700">
      <Header title="cadastro" textDecoration="uppercase" />

      <Input
        placeholder="Nome do animal"
        onChangeText={setNome}
      />
      <Input placeholder="Raca" mt={1} onChangeText={setRaca} />
      <Input placeholder="Idade" mt={1} onChangeText={setIdade} />
      <Input placeholder="Imagem do animal" mt={1} onChangeText={setNome} />
      <Input
        placeholder="Descricao do animal"
        flex={1}
        mt={1}
        multiline
        textAlignVertical="top"
        onChangeText={setDescricao}
      />

      <Button
        title="Cadastrar"
        mt={5}
        onPress={headleNewPetRegister}
        isLoading={isLoading}
      />
    </VStack>
  )
}
