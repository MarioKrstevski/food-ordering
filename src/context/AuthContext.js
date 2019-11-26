import React, { createContext, useState } from 'react'
import authClient from '../utils/authClient'

const authenticatedUserExample = {
    name: 'Mario',
}

const unauthenticatedUser = null

const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [user, setUser] = useState(unauthenticatedUser)
    const login = data => authClient.login(data)
    const logout = () => authClient.logout().then(setUser(null))
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                auth: {
                    login,
                    logout,
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
export { AuthProvider }
