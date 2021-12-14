import React from 'react'
import styled, { css } from 'styled-components'
import { medias } from '../../theme/MediaQueries'

const StyledButtonsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
  justify-content: space-between;
  align-items: center;
`

const StyledButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${p => p.theme.font.text2};

  ${p => p.register && css`
    background: ${p.theme.color.background};
    color: ${p.theme.color.purple};
    &:hover {
      background: ${p.theme.color.backgroundDark};
      color: ${p.theme.color.purpleDark};
    }
  `}
  ${p => p.login && css`
    background: ${p.theme.color.purple};
    color: ${p.theme.color.background};
    &:hover {
      background: ${p.theme.color.purpleDark};
      color: ${p.theme.color.backgroundDark};
    }
  `}

  @media ${medias.mobileL} {
    height: 45px;
  }
`

const Buttons = ({ handleLogin, handleRegister }) => {
  return (
    <StyledButtonsContainer>
      <StyledButton login onClick={handleLogin}>
        <i className="fas fa-door-open" aria-hidden="true"/>
        Iniciar Sesión
      </StyledButton>
      <StyledButton register onClick={handleRegister}>
        <i className="fas fa-user-plus" aria-hidden="true"/>
        Registrarse
      </StyledButton>
    </StyledButtonsContainer>
  )
}

export default Buttons