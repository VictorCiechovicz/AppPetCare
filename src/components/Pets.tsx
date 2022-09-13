import {
  Box,
  Circle,
  HStack,
  Text,
  useTheme,
  VStack,
  Pressable,
  IPressableProps,
  Image
} from 'native-base'
import { color } from 'native-base/lib/typescript/theme/styled-system'
import {
  ClockAfternoon,
  Hourglass,
  CircleWavyCheck,
  MapPin
} from 'phosphor-react-native'

import dog from '../../assets/dog.jpg'

export type PetsProps = {
  id: string
  nome: string
  raca: string
  idade: string
  cidade: string
  estado: string
  when: string
  status: 'adotado' | 'naoadotado'
}

type Props = IPressableProps & {
  data: PetsProps
}

export function Pets({ data, ...rest }: Props) {
  const { colors } = useTheme()
  const statusColor =
    data.status === 'naoadotado' ? colors.secondary[700] : colors.green[300]
  return (
    <Pressable {...rest}>
      <HStack flex={1} justifyContent="center" mb={5} alignItems="center">
        <Image source={dog} w={170} h={200} alt="animal" borderRadius={20} />

        <HStack
          w={200}
          h={150}
          bg="white"
          alignItems="center"
          justifyContent="space-between"
          rounded="sm"
          overflow="hidden"
          borderRightRadius={17}
        >
          <VStack flex={1} my={5} ml={5} alignItems="flex-start">
            <Text
              color="primary.700"
              fontWeight="bold"
              fontSize={25}
              textTransform="uppercase"
            >
              {data.nome}
            </Text>
            <VStack>
              <HStack alignItems="center">
                <Text color="gray.200" fontSize="xs" ml={1}>
                  {data.raca}
                </Text>
              </HStack>
              <HStack alignItems="center" mt={3}>
                <Text color="gray.200" fontSize="xs" ml={1}>
                  {data.idade} years old
                </Text>
              </HStack>
              <HStack alignItems="center" mt={3}>
                <MapPin size={15} color={colors.gray[300]} />
                <Text
                  color="gray.200"
                  fontSize="xs"
                  ml={1}
                  textTransform="uppercase"
                >
                  {data.cidade}-{data.estado}
                </Text>
              </HStack>
            
             
            </VStack>
          </VStack>
        </HStack>
      </HStack>
    </Pressable>
  )
}
