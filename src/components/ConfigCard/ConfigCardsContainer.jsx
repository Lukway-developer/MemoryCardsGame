import React, { useContext, useEffect } from 'react'
import { navigate } from 'gatsby-link'
import styled from 'styled-components'
import { medias } from '../../theme/MediaQueries'
import { GameContext } from '../../context/GameContext'
import ConfigCard from './ConfigCard'
import DevCategoryImage from '../../images/configuration/developers.svg'
import CountriesCategoryImage from '../../images/configuration/countries.svg'
import AnimalsCategoryImage from '../../images/configuration/animals.svg'
import EasyLevelImage from '../../images/configuration/easy.svg'
import NormalLevelImage from '../../images/configuration/normal.svg'
import HardLevelImage from '../../images/configuration/hard.svg'
import { useState } from 'react'

const StyledConfigCardsContainer = styled.div`
  width: 100%;
  height: fit-content;
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media ${medias.mobileL} {
    margin-top: 20px;
    display: grid;
    grid-template-rows: repeat(3, auto);
    row-gap: 15px;
    justify-content: center;
  }
`

const data = {
  category: [
    {
      image: DevCategoryImage,
      text: 'Desarrolladores',
      value: 'developers'
    }, {
      image: CountriesCategoryImage,
      text: 'Países',
      value: 'countries'
    }, {
      image: AnimalsCategoryImage,
      text: 'Animales',
      value: 'animals'
    }
  ],
  level: [
    {
      image: EasyLevelImage,
      text: 'Fácil',
      value: 'easy'
    }, {
      image: NormalLevelImage,
      text: 'Normal',
      value: 'normal'
    }, {
      image: HardLevelImage,
      text: 'Difícil',
      value: 'hard'
    }
  ]
}

const ConfigCardsContainer = ({ path }) => {
  const { game, setGame } = useContext(GameContext)
  const [config, setConfig] = useState('')

  useEffect(() => {
    if(path) setConfig(Object.values(data[path]))
  }, [path])

  const handleConfig = ( value ) => {
    if(path === 'category') {
      setGame({...game, category: value})
      sessionStorage.setItem('category', value)
      navigate('/level')
    }
    if(path === 'level') {
      setGame({...game, level: value})
      sessionStorage.setItem('level', value)
      navigate('/game')
    }
  }

  return (
    <StyledConfigCardsContainer>
      {config.length > 0
        && config.map(card => (
          <ConfigCard
            key={card.value}
            cardData={card}
            handleConfig={handleConfig}
          />
        ))
      }

    </StyledConfigCardsContainer>
  )
}

export default ConfigCardsContainer