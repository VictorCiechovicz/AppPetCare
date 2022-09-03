import { NativeBaseProvider, StatusBar } from 'native-base'

//importacao do tema padrao THEME de styles
import { THEME } from './src/styles/theme'
import { Loading } from './src/components/Loading'

//vamos utilizar o expo google fonts para estilizacao das fontes nesta aplicacao
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import SignIn from './src/screens/SignIn'

export default function App() {
  //utiliado para o carregamento das fontes
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <SignIn /> : <Loading />}
    </NativeBaseProvider>
  )
}
