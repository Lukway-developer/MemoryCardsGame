import React from 'react'
import styled from 'styled-components'
import { medias } from '../../theme/MediaQueries'

const StyledConfigCard = styled.button`
  border-radius: 10px;
  padding: 20px;
  background: ${p => p.theme.color.cyan};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  &:hover{
    background: ${p => p.theme.color.cyanDark};
  }

  div {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 12px;
    background: ${p => p.theme.color.backgroundLight};
    display: flex;
    justify-items: center;
    align-items: center;

    img {
      width: 100%;
    }
  }

  h3 {
    margin-bottom: unset;
    font: ${p => p.theme.font.h3};
  }

  @media ${medias.desktopL} {
    width: 304px;
    height: 380px;
  }
  @media ${medias.desktop} {
    width: 280px;
    height: 350px;
  }
  @media ${medias.laptopL} {
    width: 240px;
    height: 300px;
  }
  @media ${medias.laptop} {
    width: 224px;
    height: 280px;
  }
  @media ${medias.tablet} {
    width: 160px;
    height: 200px;
    padding: 16px;
    div {
      border-radius: 6px;
      padding: 8px;
    }
    h3 {
      margin-top: 10px;
    }
  }
  @media ${medias.mobileL} {
    width: 176px;
    height: 220px;
  }

`

const ConfigCard = ({ cardData, handleConfig }) => (
  <StyledConfigCard
    onClick={() => handleConfig(cardData.value)}
  >
    <div>
      <img
        src={cardData.image}
        loading='lazy'
        alt={cardData.text}
        title={cardData.text}
      />
    </div>
    <h3>{cardData.text}</h3>
  </StyledConfigCard>
)

export default ConfigCard