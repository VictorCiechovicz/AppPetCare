import { useState } from 'react'
import { VStack, Heading, Icon, useTheme } from 'native-base'
import { Envelope, Key } from 'phosphor-react-native'
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'

import Logo from '../../assets/logo_primary.svg'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'

export function NewUser() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { colors } = useTheme()
  const navigation = useNavigation()

  function handleNewUser() {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Informe E-mail e Senha.')
    }
    setIsLoading(true)
    auth()
      .createUserWithEmailAndPassword(email, password)
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
  return (
    <VStack flex={1} alignItems="center" bg="yellow.100" px={8} pt={24}>
      <Logo width={140} height={140} />
      <Heading color={colors.gray[300]} fontSize="20" mt={20} mb={6}>
        PETCARE
      </Heading>
      <Heading color={colors.gray[300]} fontSize="20" mt={20} mb={6}>
        Cadastro
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />
      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button
        title="Cadastro"
        w="full"
        onPress={handleNewUser}
        isLoading={isLoading}
      />
    </VStack>
  )
}
