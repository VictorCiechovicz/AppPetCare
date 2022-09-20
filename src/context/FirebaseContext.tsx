import React, { createContext } from 'react'

import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import config from './firebaseconfig'

const FirebaseContext = createContext('')

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.firestore()

const Firebase = {};

const FirebaseProvider = props => {
  return (
    <FirebaseContext.Provider value={"Firebase"}>
      {props.children}
    </FirebaseContext.Provider>
  )
}

export { FirebaseProvider, FirebaseContext }
