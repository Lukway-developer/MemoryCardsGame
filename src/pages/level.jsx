import React, { useLayoutEffect, useContext } from 'react'
import styled from 'styled-components'
import { GameContext } from '../context/GameContext'
import Seo from '../components/Seo/Seo'
import Title from '../components/Text/Title'
import SignOutButton from '../components/Button/SignOutButton'
import ConfigCards from '../components/ConfigCard/ConfigCardsContainer'
import GoBackButton from '../components/Button/GoBackButton'
import Layout from '../components/Layout/Layout'
import { useState } from 'react'

const StyledLayout = styled(Layout)`
  flex-direction: column;
`

const Level = () => {
  const { game, setGame } = useContext(GameContext)
  const [path, setPath] = useState('')

  useLayoutEffect(() => {
    let currentPath = window.location.pathname.split('/')

    setPath(currentPath[1])

    setGame({
      ...game,
      cards: [],
      errors: 0,
      time: ''
    })
  }, [])

  return (
    <>
      <Seo
        description="Memory Card Game - Level"
        title="Level"
        lang="es"
      />

      <StyledLayout>
        <GoBackButton to='/category'/>
        <SignOutButton>Cerrar Sesión</SignOutButton>

        <Title highlight="nivel">
          Elige el
        </Title>

        <ConfigCards path={path}/>
      </StyledLayout>
    </>
  )
}

export default Level