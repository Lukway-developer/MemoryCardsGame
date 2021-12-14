import React from 'react'
import styled from 'styled-components'
import { medias } from '../../theme/MediaQueries'

const StyledTitle = styled.h1`
  text-align: center;
  font: ${p => p.theme.font.h1};
  span {
    color: ${p => p.theme.color.purple};
  }

  @media ${medias.mobileL} {
    ${'' /* font: bold 30px "Montserrat",sans-serif; */}
    font-size: 30px;
  }
`

const Title = ({children, highlight}) => {
  return (
    <StyledTitle>
      {children}  <span>{highlight}</span>
    </StyledTitle>
  )
}

export default Title