import React, { useState, useContext, createContext } from 'react'

const UserContext = createContext([{}, () => {}])

const UserProvider = props => {
  const [state, setState] = useState({
    nome: '',
    email: '',
    uid: '',
    isLoading: null,
    imagemPerfil: 'default'
  })

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
