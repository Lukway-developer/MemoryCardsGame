import React, { useState, useContext, useLayoutEffect } from 'react'
import { navigate } from 'gatsby-link'
import styled from 'styled-components'
import { GameContext } from '../context/GameContext'
import Positions from '../components/Ranking/Positions'
import Selector from '../components/Ranking/Selector'
import Seo from '../components/Seo/Seo'
import Title from '../components/Text/Title'
import Layout from '../components/Layout/Layout'
import { medias } from '../theme/MediaQueries'

const StyledLayout = styled(Layout)`
  flex-direction: column;

  h1 {
    margin-top: 20px;
  }
`

const StyledButton = styled.button`
  width: 200px;
  height: 50px;
  padding-right: 10px;
  background: ${p => p.theme.color.purple};
  border-radius: 10px;
  color: ${p => p.theme.color.backgroundLight};
  font: ${p => p.theme.font.text1};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 20px;

  &:hover {
    background: ${p => p.theme.color.purpleDark};
    color: ${p => p.theme.color.background};
  }

  i{
    margin-right: 10px;
  }

  @media ${medias.mobileL} {
    width: 40px;
    height: 40px;
    padding: 10px;
    top: 10px;
    left: 10px;

    i{
      margin-right: unset;
    }

    span {
      display: none;
    }
  }
`

const Ranking = () => {
  const { game, setGame } = useContext(GameContext)
  const [config, setConfig] = useState({
    category: game.category,
    level: game.level
  })

  useLayoutEffect(() => {
    setGame({
      category: '',
      level: '',
      cards: [],
      errors: 0,
      time: ''
    })
  }, [])

  const handleCategory = ( e ) => {
    const newCategory = e.target.value

    setConfig({...config, category: newCategory})
  }

  const handleLevel = ( e ) => {
    const newLevel = e.target.value

    setConfig({...config, level: newLevel})
  }

  const handleGoBack = () => {
    game.category
      ? navigate('/category')
      : navigate(-1)
  }

  return (
    <>
      <Seo
        description="Memory Card Game - Ranking"
        title="Ranking"
        lang="es"
      />

      <StyledLayout>
        <StyledButton onClick={handleGoBack}>
          <i className="fas fa-reply"/>
          <span>Volver</span>
        </StyledButton>

        <Title>
          Ranking
        </Title>

        <Selector
          handleCategory={handleCategory}
          handleLevel={handleLevel}
        />

        {config.category
          ? <Positions
            category={config.category}
            level={config.level}
          />
          : <Positions/>
        }
      </StyledLayout>
    </>
  )
}

export default Ranking