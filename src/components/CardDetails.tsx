import { ReactNode } from 'react'
import { IconProps, MapPin } from 'phosphor-react-native'
import { VStack, HStack, Text, Box, useTheme, Image } from 'native-base'

type Props = {
  title: string
  nome?: string
  raca?: string
  idade?: string
  cidade?: string
  estado?: string
  photo_url?: string
  usuarionome?: string
  usuarioimagem?: any
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
  usuarionome,
  usuarioimagem,
  footer = null,

  children
}: Props) {
  const { colors } = useTheme()
  return (
    <VStack
      bg="white"
      w={350}
      h={235}
      p={5}
      mt={-20}
      mb={5}
      rounded="sm"
      borderRadius={30}
      shadow={2}
    >
      <HStack alignItems="center" mb={1}>
        <Text
          color="secondary.700"
          fontWeight="bold"
          fontSize={27}
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
        <HStack alignItems="center" mt={5}>
          {usuarioimagem}
          <Text
            ml={2}
            color="gray.300"
            fontSize="sm"
            textTransform="capitalize"
          >
            {usuarionome}
          </Text>
        </HStack>
      </VStack>

      {!!footer && (
        <Box borderTopWidth={1} borderTopColor="gray.400" mt={2}>
          <Text mt={1} color="gray.300" fontSize="sm" textAlign="center">
            {footer}
          </Text>
        </Box>
      )}
    </VStack>
  )
}
