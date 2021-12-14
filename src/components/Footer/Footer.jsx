import React from 'react'
import styled from 'styled-components'
import { medias } from '../../theme/MediaQueries'
import PoweredBy from './PoweredBy'
import Networks from './Networks'

const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
  ${'' /* position: absolute;
  bottom: 0; */}

  @media ${medias.mobileL} {
    flex-direction: column;
    justify-content: center;
    ${'' /* margin-top: 15px;
    position: unset;
    bottom: unset; */}
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <PoweredBy/>
      <Networks/>
    </StyledFooter>
  )
}

export default Footer