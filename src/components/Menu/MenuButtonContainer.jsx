import React, { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { getNickname } from '../../utils/database'
import MenuButton from './MenuButton'
import LukwayLogo from '../../images/logo/lukway_logo.svg'

const MenuButtonContainer = () => {
  const [mainPath, setMainPath] = useState('/login')

  useEffect(() => {
    const checkIfUserExist = async () => {
      const auth = getAuth()
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid
          const nickname = await getNickname(uid)

          if(nickname){
            setMainPath('/category')
          } else {
            setMainPath('/login')
          }
        } else {
          setMainPath('/login')
        }
      })
    }

    checkIfUserExist()
  }, [])

  return (
    <>
      <MenuButton
        to={mainPath}
        color="purple"
      >
        <i className="fas fa-brain" aria-hidden="true"/>
        ¡Prueba tu memoria!
      </MenuButton>

      <MenuButton
        to="/tutorial"
        color="violet"
      >
        <i className="fas fa-exclamation-circle" aria-hidden="true"/>
        ¿Cómo jugar?
      </MenuButton>

      <MenuButton
        to="/ranking"
        color="violet"
      >
        <i className="fas fa-crown" aria-hidden="true"/>
        Ranking
      </MenuButton>

      <MenuButton
        to="https://www.lukway.site/"
        color="green"
      >
        <img src={LukwayLogo} alt="Lukway Logo" />
        Sobre Lukway
      </MenuButton>
    </>
  )
}

export default MenuButtonContainer