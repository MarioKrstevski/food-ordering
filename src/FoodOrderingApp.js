import React, { useContext } from 'react'
import Dashboard from './components/Dashboard/Dashboard'
import { Router } from '@reach/router'
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import Login from './components/Login/Login'
import AuthContext, { AuthProvider } from './context/AuthContext'
import { navigate } from '@reach/router'
import { RestfulProvider } from 'restful-react'

function NotFound() {
    return <div> Page doesn't exist </div>
}

function ProtectedRoute({ component: Component, authOnly, ...rest }) {
    // const user = useUser()
    const { user } = useContext(AuthContext)
    console.log(user)
    const isAuthenticated = user

    if (!authOnly) {
        return <Component {...rest} />
    }
    if (authOnly && !isAuthenticated) {
        console.log(authOnly, isAuthenticated)
        navigate('/login')
        return <Login />
    }

    if (isAuthenticated) {
        return <Component {...rest} />
    } else {
        window.history.back()
        return null
    }
}
const FoodOrderingApp = () => {
    return (
        <RestfulProvider
            base="http://localhost:3333/"
        >
            <AuthProvider>
                <Router>
                    <Login path="/login" />
                    <ProtectedRoute path="/" component={Dashboard} authOnly />
                    <NotFound default />
                </Router>
            </AuthProvider>
        </RestfulProvider>
    )
}

export default FoodOrderingApp
