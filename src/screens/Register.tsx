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
  const [patrimony, setPatrimony] = useState('')
  const [description, setDescription] = useState('')

  const navigation = useNavigation()

  function headleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert('Registrar', 'Preencha todos os campos!')
    }
    setIsLoading(true)
    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Solicitacao', 'Solicitacao registrada com sucesso!')
        navigation.goBack()
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
        return Alert.alert('Solicitacao', 'Nao foi possivel registrar.')
      })
  }
  return (
    <VStack flex={1} p={6} bg="primary.700">
      <Header title="cadastro" textDecoration="uppercase" />

      <Input placeholder="Numero do patrimonio" onChangeText={setPatrimony} />
      <Input placeholder="Raca" mt={1} />
      <Input placeholder="Idade" mt={1} />
      <Input placeholder="Imagem do animal" mt={1} />
      <Input
        placeholder="Descricao do animal"
        flex={1}
        mt={1}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />

      <Button
        title="Cadastrar"
        mt={5}
        onPress={headleNewOrderRegister}
        isLoading={isLoading}
      />
    </VStack>
  )
}
