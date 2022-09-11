import { Heading, HStack, IconButton, StyledProps, useTheme } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

type Props = StyledProps & {
  title: string
}

export function Header({ title, ...rest }) {
  const { colors } = useTheme()
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="primary.700"
     
      pt={5}
      mt={5}
      mb={3}
      {...rest}
    >
      <IconButton
        icon={<CaretLeft color={colors.gray[200]} size={30} />}
        onPress={handleGoBack}
      />

      <Heading
        color="white"
        textAlign="center"
        textTransform="uppercase"
        fontSize="lg"
        flex={1}
        ml={-6}
      >
        {title}
      </Heading>
    </HStack>
  )
}
