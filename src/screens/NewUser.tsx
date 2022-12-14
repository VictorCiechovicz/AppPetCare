import React, { useState } from 'react'

import { VStack, Heading, Icon, useTheme, Text } from 'native-base'
import { Envelope, Key } from 'phosphor-react-native'

import auth from '@react-native-firebase/auth'

import { Alert, TouchableOpacity } from 'react-native'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'

export function NewUser() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { colors } = useTheme()
  const navigation = useNavigation()

  async function handleNewUser() {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Preencha todos os campos.')
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
    <VStack flex={1} alignItems="center" bg="white" px={8} pt={20}>
      <Heading
      alignSelf="flex-start"
        color={colors.primary[700]}
        fontSize="32"
        mt={15}
        mb={100}
        textTransform="uppercase"
      >
        Cadastro
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
        mb={30}
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
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text color="black" fontSize="15" mt={5}>
          Já tenho uma conta!
        </Text>
      </TouchableOpacity>
    </VStack>
  )
}
