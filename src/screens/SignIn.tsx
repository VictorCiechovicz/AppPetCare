import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Envelope, Key } from 'phosphor-react-native'
import { Alert } from 'react-native'

import { VStack, Heading, Icon, useTheme, Text, Link } from 'native-base'

import auth from '@react-native-firebase/auth'

import Logo from '../../assets/logo_primary.svg'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { NewUser } from '../screens/NewUser'

export function SignIn() {
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

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Informe E-mail e Senha.')
    }
    setIsLoading(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error)
        setIsLoading(false)

        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Entrar', 'E-mail inválido.')
        }

        if (error.code === 'auth/wrong-password') {
          return Alert.alert('Entrar', 'E-mail ou Senha inválida.')
        }

        if (error.code === 'auth/user-not-found') {
          return Alert.alert('Entrar', 'E-mail ou Senha inválida.')
        }

        return Alert.alert('Entrar', 'Não foi possível acessar')
      })
  }
  return (
    <VStack flex={1} alignItems="center" bg="yellow.100" px={8} pt={24}>
      <Logo width={140} height={140} />
      <Heading color={colors.gray[700]} fontSize="30" mt={5} mb={1}>
        PETCARE
      </Heading>
      <Heading color={colors.gray[700]} fontSize="20" mt={20} mb={6}>
        Acesse sua conta
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
        mb={3}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Text mb={5} color={colors.gray[300]}>
        You don`t register?
        <Link>Register now.</Link>
      </Text>
      <Button
        title="Entrar"
        w="full"
        mb={5}
        onPress={handleSignIn}
        isLoading={isLoading}
      />
      <Button
        title="regitre"
        w="full"
        mb={1}
        onPress={handleNewUser}
        isLoading={isLoading}
      />
    </VStack>
  )
}
