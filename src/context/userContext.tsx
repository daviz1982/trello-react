import React, { useState } from 'react'

const Context = React.createContext({})

export function UserContextProvider({ children }: any) {
  const [jwt, setJwt] = useState(() => localStorage.getItem('user'))

  return <Context.Provider value={{ jwt, setJwt }}>{children}</Context.Provider>
}

export default Context
