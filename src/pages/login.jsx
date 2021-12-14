import React, { useState, useLayoutEffect } from 'react'
import { navigate } from 'gatsby'
import { getNickname, saveNickname } from '../utils/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Seo from '../components/Seo/Seo'
import MainCard from '../components/MainCard/MainCard'
import Form from '../components/Login/Form'
import Divider from '../components/Login/Divider'
import ExternalLogin from '../components/Login/ExternalLogin'
import Nickname from '../components/Login/Nickname'
import Layout from '../components/Layout/Layout'

const Login = () => {
  const [nickname, setNickname] = useState('')
  const [modalNickname, setModalNickname] = useState(false)
  const [nicknameError, setNicknameError] = useState('')
  const [userExist, setUserExist] = useState(false)

  useLayoutEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid
        let nickname = await getNickname(uid)

        if(nickname){
          navigate('/category')
        } else {
          setModalNickname(true)
        }
      }
    })
  }, [userExist])

  const handleSaveNickname = async () => {
    const auth = getAuth()
    const uid = auth.currentUser.uid

    try {
      await saveNickname(nickname, uid)
      setNicknameError('')
      setModalNickname(false)
      setUserExist(true)
    } catch (error) {
      setNicknameError(error.message)
    }
  }

  return (
    <>
      <Seo
        description="Memory Card Game - Login"
        title="Login"
        lang="es"
      />

      <Layout>
        <MainCard>
          <Divider>iniciar sesión</Divider>
          <Form setUserExist={setUserExist}/>
          <Divider>o</Divider>
          <ExternalLogin/>
        </MainCard>

        {
          modalNickname
            ? <Nickname
              setNickname={setNickname}
              handleSaveNickname={handleSaveNickname}
              error={nicknameError}
            />
            : null
        }
      </Layout>
    </>
  )
}

export default Login