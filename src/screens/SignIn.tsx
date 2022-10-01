import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Envelope, Key } from 'phosphor-react-native'
import { Alert, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { VStack, Heading, Icon, useTheme, Text, Image } from 'native-base'

import auth from '@react-native-firebase/auth'

import Logo from '../../assets/signinImage.png'

import { Input } from '../components/Input'
import { Button } from '../components/Button'

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { colors } = useTheme()

  const navigation = useNavigation()

  function handleNewUser() {
    navigation.navigate('cadastro')
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

  async function forgotPassword() {
    if (!email) {
      return Alert.alert('Redefinir Senha', 'Informe o e-mail.');
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        Alert.alert(
          'Redefinir Senha',
          'Enviamos um link no seu E-mail para você redefinir sua senha.',
        ),
      )
      .catch(() =>
        Alert.alert(
          'Redefinir Senha',
          'Não foi possível enviar o e-mail para redefinição da senha.',
        ),
      );
  }

 

  return (
    <VStack flex={1} alignItems="center" bg={colors.white[100]} px={8} pt={24}>
      <Image source={Logo} alt="logo petcare" w="406" h="258"  />
      <Heading color={colors.secondary[700]} fontSize="64" mt={-12} mb={18}>
        PetCare
      </Heading>

      <Input
        mb={22}
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />
      <Input
        mb={18}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={forgotPassword} style={{ marginBottom: 26,alignSelf:'flex-end' }}>
        <Text color="black" fontSize="16">
          Esqueceu a senha?
        </Text>
      </TouchableOpacity>
      <Button
        title="LogIn"
        w="full"
        mb={27}
        onPress={handleSignIn}
        isLoading={isLoading}
      />
      <VStack alignItems="flex-end">
        <TouchableOpacity onPress={handleNewUser} >
          <Text color="black" fontSize="14">
            Não possui uma conta?{' '}
            <Text color={colors.primary[700]}> Registre-se.</Text>
          </Text>
        </TouchableOpacity>
      </VStack>
    </VStack>
  )
}
