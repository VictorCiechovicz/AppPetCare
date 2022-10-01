import { Heading, HStack, IconButton, StyledProps, useTheme } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

type Props = StyledProps & {
  title: string

}

export function Header({ title, ...rest }) {
  const { colors } = useTheme()
  const navigation = useNavigation()

  //funçao para volta a tela anterior
  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
   
      mt={20}
      mb={5}
      {...rest}
    >
     

      <Heading
        color="secondary.700"
       alignSelf="flex-start"
        fontSize="32"
        flex={1}
        ml={3}
      >
        {title}
    
      </Heading>
    </HStack>
  )
}
