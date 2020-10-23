import React, { useReducer, useContext } from 'react'

const UserContext = React.createContext()
const UserSetContext = React.createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        user: action.payload
      }
    }
    default:
      return state
  }
}

export function useUser() {
  return useContext(UserContext)
}

export function useSetUser() {
  return useContext(UserSetContext)
} 

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, { user: null })
  const setUser = user => {
    dispatch({
      type: 'SET_USER',
      payload: user
    })
  }
  return (
    <UserContext.Provider value={ state.user }>
      <UserSetContext.Provider value={ setUser }>
      { children }
      </UserSetContext.Provider>
    </UserContext.Provider>
  )
}