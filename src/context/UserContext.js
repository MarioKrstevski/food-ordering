import React, { useContext } from 'react'
import AuthContext from './AuthContext'

const UserContext = React.createContext()

function UserProvider(props) {
    const { user } = useContext(AuthContext)
    return <UserContext.Provider value={user} {...props} />
}

function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error(`useUser must be used within a UserProvider`)
    }

    return context
}

export { UserProvider, useUser }
