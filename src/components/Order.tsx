import { Box, Circle, HStack, Text, useTheme, VStack,Pressable ,IPressableProps} from 'native-base'
import {
  ClockAfternoon,
  Hourglass,
  CircleWavyCheck
} from 'phosphor-react-native'

export type PetsProps = {
  id: string
  nome: string
  when: string
  status: 'adotado' | 'naoadotado'
}

type Props = IPressableProps &{
  data: PetsProps
}

export function Pets({ data, ...rest }: Props) {
  const { colors } = useTheme()
  const statusColor =
    data.status === 'naoadotado' ? colors.secondary[700] : colors.green[300]
  return (
    <Pressable {...rest}>
    <HStack
      bg="gray.600"
      mb={4}
      alignItems="center"
      justifyContent="space-between"
      rounded="sm"
      overflow="hidden"
    >
      <Box h="full" w={2} bg={statusColor} />
      <VStack flex={1} my={5} ml={5}>
        
        <Text color="white" fontSize="md">
         Nome animal: {data.nome}
        </Text>

        <HStack alignItems="center">
          <ClockAfternoon size={15} color={colors.gray[300]} />
          <Text color="gray.200" fontSize="xs" ml={1}>
            Anuciado: {data.when}
          </Text>
        </HStack>
      </VStack>

      <Circle bg="gray.500" h={12} w={12} mr={5}>
        {data.status === 'adotado' ? (
          <CircleWavyCheck size={24} color={statusColor} />
        ) : (
          <Hourglass size={24} color={statusColor} />
        )}
      </Circle>
    </HStack>
    </Pressable>
  )
}
