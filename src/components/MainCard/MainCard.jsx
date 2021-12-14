import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Logo from '../Logo/Logo'
import { medias } from '../../theme/MediaQueries'

const StyledMainCard = styled.div`
  width: 380px;
  height: 500px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: ${p => p.theme.shadow.card};
  background: ${p => p.theme.color.backgroundLight};
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  row-gap: 15px;

  > img{
    width: 120px;
    height: 120px;
  }

  @media ${medias.mobileL} {
    width: 100%;
    height: 400px;
    padding: 16px;
    row-gap: 10px;

    > img{
      width: 80px;
      height: 80px;
    }
  }
`

const MainCard = ({ children }) => {
  return (
    <StyledMainCard>
      <Logo/>
      { children }
    </StyledMainCard>
  )
}

MainCard.propTypes = {
  children: PropTypes.node
}

export default MainCard