//este componente vai ser apresentado no comeco da aplicao antes do carregamento total.

import { Center } from 'native-base'
import LottieView from 'lottie-react-native'

export function Loading() {
  return (
    <Center flex={1} bg="white">
      <LottieView
        source={require('../../assets/LoadingAnimation.json')}
        autoPlay
        loop
        style={{ width:400}}
      />
    </Center>
  )
}
