import { VStack, Heading, Icon, useTheme } from 'native-base'
import { color } from 'native-base/lib/typescript/theme/styled-system'
import { Envelope, Key } from 'phosphor-react-native'

import Logo from '../../assets/logo_primary.svg'

import { Input } from '../components/Input'
import { Button } from '../components/Button'

export default function SignIn() {
  const { colors } = useTheme()
  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="21" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
      />
      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
      />
      <Button title="Entrar" w="full" />
    </VStack>
  )
}
