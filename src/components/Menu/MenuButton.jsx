import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

const StyledMenuLink = styled(Link)`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${p => p.theme.font.text1};
  color: ${p => p.theme.color.text};
  &:hover {
    box-shadow: ${p => p.theme.shadow.button};
  }
  svg {
    height: 25px;
    margin-right: 10px;
  }

  ${'' /* Color */}

  ${p => p.color === 'purple' && css`
    background: ${p  => p.theme.color.purple};
    color: ${p => p.theme.color.backgroundLight};
    &:hover {
      background: ${p  => p.theme.color.purpleDark};
      color: ${p => p.theme.color.background};
    }

    svg {
      fill: ${p => p.theme.color.backgroundLight};
    }
  `}
  ${p => p.color == 'violet' && css`
    background: ${p  => p.theme.color.violet};
    color: ${p => p.theme.color.backgroundLight};
    &:hover {
      background: ${p  => p.theme.color.violetDark};
      color: ${p => p.theme.color.background};
    }
  `}
  ${p => p.color == 'green' && css`
    background: ${p  => p.theme.color.lukway};
    color: ${p => p.theme.color.backgroundLight};
    &:hover {
      background: ${p  => p.theme.color.lukwayDark};
      color: ${p => p.theme.color.background};
      ${'' /* background: ${p  => p.theme.color.lukwayDark}; */}
    }
  `}
`

const StyledMenuExternalLink = styled.a`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${p => p.theme.font.text1};
  color: ${p => p.theme.color.text};
  &:hover {
    box-shadow: ${p => p.theme.shadow.button};
  }
  svg {
    height: 25px;
    margin-right: 10px;
  }

  ${'' /* Color */}

  ${p => p.color === 'purple' && css`
    background: ${p  => p.theme.color.purple};
    color: ${p => p.theme.color.backgroundLight};
    &:hover {
      background: ${p  => p.theme.color.purpleDark};
      color: ${p => p.theme.color.background};
    }

    svg {
      fill: ${p => p.theme.color.backgroundLight};
    }
  `}
  ${p => p.color == 'violet' && css`
    background: ${p  => p.theme.color.violet};
    color: ${p => p.theme.color.backgroundLight};
    &:hover {
      background: ${p  => p.theme.color.violetDark};
      color: ${p => p.theme.color.background};
    }
  `}
  ${p => p.color == 'green' && css`
    background: ${p  => p.theme.color.lukway};
    color: ${p => p.theme.color.backgroundLight};
    &:hover {
      background: ${p  => p.theme.color.lukwayDark};
      color: ${p => p.theme.color.background};
      ${'' /* background: ${p  => p.theme.color.lukwayDark}; */}
    }

    img {
      height: 25px;
      margin-right: 10px;
    }
  `}
`

const MenuButton = ({ children, to, color}) => {
  const isExternalLink = to.includes('https')

  if(isExternalLink){
    return (
      <StyledMenuExternalLink
        href={to}
        target={'_blanck'}
        color={color}
      >
        { children }
      </StyledMenuExternalLink>
    )
  } else {
    return (
      <StyledMenuLink
        to={to}
        color={color}
      >
        { children }
      </StyledMenuLink>
    )
  }
}

export default MenuButton