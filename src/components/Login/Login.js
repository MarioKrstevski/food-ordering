import React, {useContext} from 'react'
import styles from './Login.module.css'
import { Formik } from 'formik'
import authClient from '../../utils/authClient'
import { navigate } from '@reach/router/lib/history';
import AuthContext from '../../context/AuthContext';
import { Redirect } from '@reach/router'

const Login = () => {
    const { setUser } = useContext(AuthContext)
    return (
        <div>
            <h1>Login Form</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validate={values => {
                    const errors = {}
                    if (!values.email) {
                        errors.email = 'Your name is required'
                    }
                    if (!values.password) {
                        errors.password = 'You need to provide your password'
                    }
                    return errors
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values)
                    authClient.login(values).then(resp => {
                        if(resp.error){
                            alert(resp.error)
                        }

                        if(resp.token){
                            console.log(resp)
                            setUser({
                                name: resp.name,
                                token: resp.token
                            })
                            navigate('/')
                            return <Redirect to="/" />
                        }
                    })
                    setSubmitting(false)
                }}
            >
                {({
                    values,
                    handleSubmit,
                    handleBlur,
                    handleChange,
                    isSubmitting,
                    errors,
                    touched,
                }) => <form onSubmit={handleSubmit}>
                    <input 
                        type='text'
                        name='email'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                    <input 
                        type='password'
                        name='password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values.password}
                    />
                    {errors.password && touched.password && errors.password}
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </form>}
            </Formik>
        </div>
    )
}

export default Login
