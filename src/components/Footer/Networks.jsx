import React from 'react'
import styled, { css } from 'styled-components'
import { medias } from '../../theme/MediaQueries'

const StyledNetworks = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 40px);
  column-gap: 15px;
`

const StyledLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  padding: 10px;
  background: ${p => p.theme.color.backgroundLight};
  box-shadow: ${p => p.theme.shadow.button};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  &:hover {
    background: ${p => p.theme.color.background};
  }

  i {
    margin-right: 0;
  }

  ${p => p.type === 'github' && css`
    color: ${p => p.theme.color.github};
  `}
  ${p => p.type === 'linkedin' && css`
    color: ${p => p.theme.color.linkedin};
  `}
  ${p => p.type === 'instagram' && css`
    color: ${p => p.theme.color.instagram};
  `}
  ${p => p.type === 'twitter' && css`
    color: ${p => p.theme.color.twitter};
  `}

  @media ${medias.mobileL} {
    margin-top: 10px;
  }
`

const Networks = () => (
  <StyledNetworks>
    <StyledLink
      type='github'
      href="https://github.com/lukway-dev/memory-cards-game"
      target="_blank"
      rel="noopener noreferrer">
      <i className="fab fa-github-alt"/>
    </StyledLink>

    <StyledLink
      type='linkedin'
      href="https://www.linkedin.com/in/lukway/"
      target="_blank"
      rel="noopener noreferrer">
      <i className="fab fa-linkedin"/>
    </StyledLink>

    <StyledLink
      type="instagram"
      href="https://www.instagram.com/lukway.dev/"
      target="_blank"
      rel="noopener noreferrer">
      <i className="fab fa-instagram"/>
    </StyledLink>

    <StyledLink
      type="twitter"
      href="https://twitter.com/LukwayDev"
      target="_blank"
      rel="noopener noreferrer">
      <i className="fab fa-twitter" />
    </StyledLink>
  </StyledNetworks>
)

export default Networks