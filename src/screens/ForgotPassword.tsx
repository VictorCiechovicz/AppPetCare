import { useState } from 'react'

import { VStack, Icon, useTheme, Text, HStack } from 'native-base'
import { Envelope, X } from 'phosphor-react-native'

import auth from '@react-native-firebase/auth'

import { Alert, TouchableOpacity } from 'react-native'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { useNavigation } from '@react-navigation/native'

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { colors } = useTheme()
  const navigation = useNavigation()

  async function forgotPassword() {
    if (!email) {
      return Alert.alert('Redefinir Senha', 'Informe o e-mail.')
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Redefinir Senha',
          'Enviamos um link no seu E-mail para você redefinir sua senha.'
        )
        navigation.goBack()
      })
      .catch(() =>
        Alert.alert(
          'Redefinir Senha',
          'Não foi possível enviar o e-mail para redefinição da senha.'
        )
      )
  }

  return (
    <VStack flex={1} alignItems="center" bg="white" px={6} pt={5}>
      <HStack   
        justifyContent="center"
        alignItems="center"
        mb={130}
        >
        <Header title="Recuperar Senha" />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X color="black" size={20} />
        </TouchableOpacity>
      </HStack>

      <Input
        mb={60}
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />

      <Button
        title="Enviar"
        w="full"
        onPress={forgotPassword}
        isLoading={isLoading}
      />
    </VStack>
  )
}
