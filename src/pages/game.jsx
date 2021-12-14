import React, { useState, useLayoutEffect, useContext } from 'react'
import styled from 'styled-components'
import { medias } from '../theme/MediaQueries'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { navigate } from 'gatsby-link'
import { graphql } from 'gatsby'
import { GameContext } from '../context/GameContext'
import setupCards from '../utils/setupCards'
import Seo from '../components/Seo/Seo'
import GameCardsContainer from '../components/GameCard/GameCardsContainer'
import Congratulation from '../components/Congratulation/Congratulation'
import GameBar from '../components/GameBar/GameBar'
import Timer from '../components/GameBar/Timer'
import Errors from '../components/GameBar/Errors'
import Layout from '../components/Layout/Layout'

export const CardsImages = graphql`
  query CardsImages {
    allFile {
      edges {
        node {
          relativePath
          publicURL
        }
      }
    }
  }
`

const StyledLayout = styled(Layout)`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  justify-items: center;
  column-gap: 20px;

  @media ${medias.tablet} {
    grid-template-columns: unset;
    grid-template-rows: 1fr 4fr;
  }
`
const Game = ({ data }) => {
  const { game, setGame } = useContext(GameContext)
  const [ congratulation, setCongratulation ] = useState(false)
  const [ saveTime, setSaveTime ] = useState(false)
  const [ resetTime, setResetTime ] = useState(false)

  useLayoutEffect(() => {
    // Check user exist
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => user)

    // Check game config
    const category = game.category
    const level = game.level

    !category
      ? navigate('/category')
      : !level && navigate('/level')

    handleInitGame()
  }, [])

  const handleInitGame = () => {
    const category = game.category
    const level = game.level

    // Get images
    const images = data.allFile.edges
      .map(item => item.node)
      .filter(item => item.relativePath.includes(`cards/${category}`))

    images.map(image => {
      image.flip = false
    })

    // Set cards
    const cards = setupCards(category, level, images)

    setGame({
      ...game,
      errors: 0,
      cards: cards,
      time: ''
    })
  }

  const handleReset = () => {
    handleInitGame()
    setResetTime(true)
  }

  const handleCongratulation = async () => {
    setSaveTime(true)
    setCongratulation(true)
  }

  return (
    <>
      <Seo
        description="Memory Card Game - Game"
        title="Memory Game"
        lang="es"
      />

      <StyledLayout>
        <GameBar
          timer={<Timer
            saveTime={saveTime}
            resetTime={resetTime}
            setResetTime={setResetTime}
          />}
          errors={<Errors/>}
          handleReset={handleReset}
        />

        <GameCardsContainer
          handleCongratulation={handleCongratulation}
        />

        {
          congratulation
            ? <Congratulation
              errors={game.errors}
              time={game.time}
            />
            : null
        }
      </StyledLayout>
    </>
  )
}

export default Game