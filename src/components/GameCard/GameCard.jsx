import React from 'react'
import styled, { css } from 'styled-components'
import { medias } from '../../theme/MediaQueries'
import CardLogo from '../../images/logo/card_logo.svg'

const StyledGameCard = styled.button`

  padding: 10px;
  border-radius: 10px;
  background: ${p => p.theme.color.cyan};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: transform .3s;
  transform-style: preserve-3d;
  ${p => p.flip === true && css`
    transform: rotateY(180deg) scale(1.05);
  `}
  &:hover{
    box-shadow: ${p => p.theme.shadow.button};
  }

  img {
    height: 50%;
    position: absolute;
    z-index: 1;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transition: transform .3s;
    transform: rotateX(0deg);
  }

  @media ${medias.desktopL} {
    width: 160px;
    height: 200px;
  }

  @media ${medias.desktop} {
    width: 144px;
    height: 180px;
  }

  @media ${medias.laptopL} {
    width: 112px;
    height: 140px;
  }

  @media ${medias.laptop} {
    width: 104px;
    height: 130px;
  }

  @media ${medias.tablet} {
    width: 96px;
    height: 120px;
  }

  @media ${medias.mobileL} {
    width: 80px;
    height: 100px;
  }

  @media ${medias.mobileM} {
    width: 72px;
    height: 90px;
  }

  @media ${medias.mobileS} {
    width: 64px;
    height: 80px;
  }
`

const StyledImageContainer = styled.div`
  border-radius: 6px;
  background-color: ${p => p.theme.color.backgroundLight};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 10px;
  left: 10px;
  z-index: 2;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: rotateY(180deg);
  transition: transform .3s;

  img {
    width: 80%;
    transition: transform .3s;
  }
`

const GameCard = ({ id, image, text, disabled, flip, handleFlip }) => (
  <StyledGameCard
    flip={flip}
    onClick={() => handleFlip(id)}
    disabled={disabled}
  >
    <img
      src={CardLogo}
      alt="Lukway Logo"
      title="Lukway Logo"
    />
    <StyledImageContainer>
      <img
        src={image}
        alt={text}
        title={text}
      />
    </StyledImageContainer>
  </StyledGameCard>
)

export default GameCard