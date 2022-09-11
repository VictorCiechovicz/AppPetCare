
import { VStack,HStack } from 'native-base';
import { Header } from '../components/Header';

export function Perfil() {
  return (
    <VStack>
  <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="primary.700"
        px={6}
      >
        <Header title="perfil" textDecoration="uppercase" />
      </HStack>
    </VStack>
  );
}