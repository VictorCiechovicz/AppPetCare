//este componente vai ser apresentado no comeco da aplicao antes do carregamento total.

import { Center, Spinner } from 'native-base'

export function Loading() {
  return (
    <Center flex={1} bg="gray.700">
      <Spinner color="secundary.700" />
    </Center>
  )
}
