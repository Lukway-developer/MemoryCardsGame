import React, { useState, useContext, useLayoutEffect } from 'react'
import styled, { css } from 'styled-components'
import { GameContext } from '../../context/GameContext'
import { medias } from '../../theme/MediaQueries'
import GameCard from './GameCard'

const StyledGameCardsContainer = styled.div`
  width: fit-content;
  display: grid;
  gap: 25px;

  ${p => p.level === 'easy' && css`
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    @media ${medias.tablet} {
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, auto);
    }
  `}
  ${p => p.level === 'normal' && css`
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
  `}
  ${p => p.level === 'hard' && css`
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(4, 1fr);

    @media ${medias.tablet} {
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(5, 1fr);
    }
  `}
  @media ${medias.desktop} {
    gap: 20px;
  }
  @media ${medias.laptop} {
    gap: 15px;
  }
  @media ${medias.tablet} {
    gap: 10px;
  }
`

const StyledContainer = styled.div`
  width: fit-content;
  height: calc(100% - 30px);
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${medias.mobileL} {
    height: calc(100% - 30px);
  }
`

const GameCardsContainer = ({ handleCongratulation }) => {
  const { game, setGame } = useContext(GameContext)
  const [ disabled, setDisabled ] = useState(false)
  const [ flipedCards, setFlipedCards ] = useState([])
  const gameCards = game.cards

  useLayoutEffect(() => {
    if(flipedCards.length == 2) {
      setDisabled(true)
      setTimeout(() => {
        compareCards(flipedCards[0], flipedCards[1])
      }, 500)
    }
  }, [flipedCards])

  const checkCorrectCards = () => {
    const correctCards = gameCards.filter(card => card.flip === true)
    if(correctCards.length === gameCards.length) {
      handleCongratulation()
    }
  }

  const handleFlip = ( id ) => {
    if(flipedCards.length < 2) {
      const cardToFlip = gameCards.filter(item => item.id === id)[0]
      cardToFlip.flip = true

      setFlipedCards([...flipedCards, cardToFlip])
    }
  }

  const compareCards = (firstCard, secondCard) => {
    const compare = firstCard.relativePath === secondCard.relativePath

    if(compare) {
      checkCorrectCards()
    } else {
      firstCard.flip = false
      secondCard.flip = false

      const errors = game.errors + 1
      setGame({...game, errors})
    }
    setFlipedCards([])
    setDisabled(false)
  }

  return (
    <StyledContainer>
      <StyledGameCardsContainer level={game.level}>
        {
          gameCards.map(card => (
            card.flip
              ? <GameCard
                key={card.id}
                id={card.id}
                image={card.publicURL}
                text={card.relativePath}
                disabled="disabled"
                flip={card.flip}
                handleFlip={handleFlip}
              />
              : <GameCard
                key={card.id}
                id={card.id}
                image={card.publicURL}
                text={card.relativePath}
                disabled={disabled}
                flip={false}
                handleFlip={handleFlip}
              />
          ))
        }
      </StyledGameCardsContainer>
    </StyledContainer>
  )
}

export default GameCardsContainer