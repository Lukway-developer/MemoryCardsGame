import React from 'react'
import styled from 'styled-components'
import Image from '../../images/logo/powered_by.svg'

const StyledPoweredBy = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${p => p.theme.font.text2};

  a {
    margin-left: 10px;
  }

  img {
    height: 30px;
    filter: drop-shadow(0px 3px 5px rgb(0 0 0 / 30%));

    &:hover{
      filter: drop-shadow(0px 3px 5px rgb(0 0 0 / 30%)) brightness(0.9);
    }
  }
`

const PoweredBy = () => {
  return (
    <StyledPoweredBy>
      Powered by
      <a href="https://lukway.site" target="_blank" rel="noopener noreferrer">
        <img src={Image} alt="Powered By Lukway" />
      </a>
    </StyledPoweredBy>
  )
}

export default PoweredBy