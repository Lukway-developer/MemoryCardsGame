import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { medias } from '../../theme/MediaQueries'

const StyledButton = styled(Link)`
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

const GoBackButton = ({ to }) => {
  return (
    <StyledButton to={to}>
      <i className="fas fa-reply"/>
      <span>Volver</span>
    </StyledButton>
  )
}

export default GoBackButton