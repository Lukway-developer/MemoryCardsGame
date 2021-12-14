import React, { useContext } from 'react'
import { GameContext } from '../../context/GameContext'
import styled from 'styled-components'
import { medias } from '../../theme/MediaQueries'

const StyledSelector = styled.div`
  width: 50%;
  height: fit-content;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  div {
    width: fit-content;
    display: grid;
    grid-template-rows: repeat(2, auto);
    row-gap: 15px;
    justify-items: center;
    align-items: center;
  }

  label{
    font: ${p => p.theme.font.h3};
  }

  select {
    width: 170px;
    border: unset;
    border-radius: 5px;
    padding: 10px;
    background: ${p => p.theme.color.purple};
    font: ${p => p.theme.font.text2};
    color: ${p => p.theme.color.backgroundLight};
    cursor: pointer;

    &:hover {
      background: ${p => p.theme.color.purpleDark};
      box-shadow: ${p => p.theme.shadow.button};
    }
  }

  @media ${medias.tablet} {
    width: 100%;
  }
  @media ${medias.mobileL} {
    select {
      width: 160px;
    }
  }
`

const Selector = ({ handleCategory, handleLevel}) => {
  const { game } = useContext(GameContext)

  return (
    <StyledSelector>
      <div>
        <label htmlFor="category">Categoría:</label>
        <select
          id="category"
          type="text"
          defaultValue={game.category}
          onChange={(e) => handleCategory(e)}
        >
          <option value="animals">Animales</option>
          <option value="developers">Desarrolladores</option>
          <option value="countries">Países</option>
        </select>
      </div>

      <div>
        <label htmlFor="level">Nivel:</label>
        <select
          id="level"
          type="text"
          defaultValue={game.level}
          onChange={(e) => handleLevel(e)}
        >
          <option value="easy">Fácil</option>
          <option value="normal">Normal</option>
          <option value="hard">Difícil</option>
        </select>
      </div>
    </StyledSelector>
  )
}
 
export default Selector