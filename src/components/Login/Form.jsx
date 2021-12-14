import React, { useState } from 'react'
import styled from 'styled-components'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from '@firebase/auth'
import Input from './Input'
import Buttons from './Buttons'
import { saveEmail } from '../../utils/database'

const StyledForm = styled.div`
  width: 100%;
  display: grid;
  grid-templeate-rows: repeat(3, 1fr);
  row-gap: 15px;
`

const Form = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const auth = getAuth()

  const handleInputName = (value) => {
    setEmail(value)
  }

  const handleInputPassword = (value) => {
    setPassword(value)
  }

  const checkInputsValues = () => {
    setEmailError('')
    setPasswordError('')

    email === '' && password == ''
      ? handleFormErrors('auth/invalid-values')
      : null
  }

  const handleFormErrors = (error) => {
    switch (error) {
    case 'auth/invalid-values':
      setEmailError('Email Requerido')
      setPasswordError('Contraseña Requerida')
      break

    case 'auth/invalid-email':
      setEmailError('Email Requerido')
      break

    case 'auth/internal-error':
      setPasswordError('Contraseña Requerida')
      break

    case 'auth/weak-password':
      setPasswordError('Contraseña - Mínimo 6 carácteres')
      break

    case 'auth/email-already-in-use':
      setEmailError('Email ya registrado')
      break

    case 'auth/user-not-found':
      setEmailError('Email incorrecto')
      break

    case 'auth/wrong-password':
      setPasswordError('Contraseña incorrecta')
      break

    default:
      setEmailError('')
      setPasswordError('')
      break
    }
  }

  const handleLogin = async () => {
    checkInputsValues()

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error.code)
      handleFormErrors(error.code)
    }
  }

  const handleRegister = async () => {
    checkInputsValues()

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      saveEmail(email, credential.user.uid)
    } catch (error) {
      handleFormErrors(error.code)
    }
  }

  return (
    <StyledForm>
      <Input
        type="email"
        name="email"
        label="Email"
        handleInput={handleInputName}
        error={emailError}
      >
        Ingrese su email
      </Input>
      <Input
        type="password"
        name="password"
        label="Contraseña"
        handleInput={handleInputPassword}
        error={passwordError}
      >
        Ingrese su contraseña
      </Input>
      <Buttons
        handleRegister={handleRegister}
        handleLogin={handleLogin}
      />
    </StyledForm>
  )
}

export default Form