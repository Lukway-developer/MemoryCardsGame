import React from 'react'
import styled from 'styled-components'
import { medias } from '../../theme/MediaQueries'

const StyledGameBar = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
  border-radius: 10px;
  padding: 15px;
  background: ${p => p.theme.color.backgroundLight};
  box-shadow: ${p => p.theme.shadow.card};
  display: grid;
  grid-template-rows: repeat(3, auto);
  row-gap: 50px;
  justify-items: center;
  text-align: center;

  h3 {
    margin-top: 0;
    font: ${p => p.theme.font.h3};

    i {
    font-size: 1.2em;
    color: ${p => p.theme.color.purple};
    }
  }

  div {
    span {
      font: ${p => p.theme.font.number}
    }
  }

  button {
    width: 150px;
    height: 50px;
    border-radius: 10px;
    padding-right: 10px;
    background: ${p => p.theme.color.purple};
    font: ${p => p.theme.font.text1};
    color: ${p => p.theme.color.backgroundLight};

    &:hover {
      background: ${p => p.theme.color.purpleDark};
      box-shadow: ${p => p.theme.shadow.button};
    }
  }

  @media ${medias.tablet} {
    padding: 10px;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: unset;
    align-items: center;
    column-gap: 25px;
    row-gap: unset;

    button {
      width: 50px;
      padding: 10px;
      i {
        margin: unset;
      }
      span {
        display: none;
      }
    }
  }
`

const GameBar = ({ timer, errors, handleReset }) => {

  return (
    <StyledGameBar>
      <div>
        <h3>
          <i className="fas fa-times" aria-hidden="true"/>
          Errores
        </h3>
        {errors}
      </div>

      <div>
        <h3>
          <i className="fas fa-stopwatch" aria-hidden="true"/>
          Timer
        </h3>
        {timer}
      </div>

      <button onClick={handleReset}>
        <i className="fas fa-undo-alt" aria-hidden="true"/>
        <span>Reiniciar</span>
      </button>
    </StyledGameBar>
  )
}

export default GameBar