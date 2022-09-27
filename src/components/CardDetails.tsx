import { ReactNode } from 'react'
import { IconProps, MapPin } from 'phosphor-react-native'
import { VStack, HStack, Text, Box, useTheme } from 'native-base'

type Props = {
  title: string
  nome?: string
  raca?: string
  idade?: string
  cidade?: string
  estado?: string
  photo_url?: string
  footer?: string

  children?: ReactNode
}

export function CardDetails({
  title,
  nome,
  raca,
  idade,
  cidade,
  estado,
  footer = null,

  children
}: Props) {
  const { colors } = useTheme()
  return (
    <VStack
      bg="white"
      w={350}
      h={160}
      p={5}
      mt={-20}
      mb={5}
      rounded="sm"
      borderRadius={30}
    >
      <HStack alignItems="center" mb={1}>
        <Text
          color="primary.700"
          fontWeight="bold"
          fontSize={25}
          textTransform="uppercase"
        >
          {title}
        </Text>
      </HStack>
      <VStack>
        <HStack alignItems="center" justifyContent="space-between" mb={2}>
          <Text color="gray.300" fontSize="sm">
            {raca}
          </Text>
          <Text color="gray.300" fontSize="sm">
            {idade}
          </Text>
        </HStack>

        <HStack mb={2}>
          <MapPin size={20} color={colors.gray[300]} />
          <Text color="gray.300" fontSize="sm" textTransform="uppercase">
            {cidade}
          </Text>
          <Text color="gray.300" fontSize="sm">
            {estado}
          </Text>
        </HStack>
      </VStack>

      {!!footer && (
        <Box borderTopWidth={1} borderTopColor="gray.400" mt={1}>
          <Text mt={1} color="gray.300" fontSize="sm" textAlign="center">
            {footer}
          </Text>
        </Box>
      )}
    </VStack>
  )
}
