import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    primary: {
      700: '#0096FF'
    },
    secondary: {
      700: '#0096FF'
    },
    green: {
      700: '#00875F',
      500: '#00B37E',
      300: '#04D361',
    },
    gray: {
      700: '#121214',
      600: '#202024',
      500: '#29292E',
      400: '#323238',
      300: '#7C7C8A',
      200: '#C4C4CC',
      100: '#E1E1E6'
    },
    yellow: {
      700: '#fc580c',
      600: '#fc6b0a',
      500: '#f8872e',
      400: '#ffa927',
      300: '#fdca49',
      200: '#fef08a',
      100: '#fef9c3'
    },
    white: '#FFFFFF',

    gradiente:{
     100: ['#00B4DB', '#0083B0']
    } 
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56
  },

});