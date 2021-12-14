import React, { useState } from 'react'
import { useEffect, useContext } from 'react'
import { GameContext } from '../context/GameContext'
import styled from 'styled-components'
import Seo from '../components/Seo/Seo'
import Title from '../components/Text/Title'
import SignOutButton from '../components/Button/SignOutButton'
import ConfigCardsContainer from '../components/ConfigCard/ConfigCardsContainer'
import Layout from '../components/Layout/Layout'

const StyledLayout = styled(Layout)`
  flex-direction: column;
`

const Category = () => {
  const { game, setGame } = useContext(GameContext)
  const [path, setPath] = useState('')

  useEffect(() => {
    // let currentPath = window.location.pathname.slice(1)
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
        description="Memory Card Game - Category"
        title="Category"
        lang="es"
      />

      <StyledLayout>
        <SignOutButton>Cerrar Sesión</SignOutButton>

        <Title highlight="categoría">
        Elige una
        </Title>

        <ConfigCardsContainer path={path}/>
      </StyledLayout>
    </>
  )
}

export default Category