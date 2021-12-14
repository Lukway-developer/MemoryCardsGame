import React from 'react'
import styled from 'styled-components'
import { getAuth, signOut } from 'firebase/auth'
import { navigate } from 'gatsby-link'
import { medias } from '../../theme/MediaQueries'

const StyledButton = styled.button`
  width: 200px;
  height: 50px;
  padding-right: 10px;
  border-radius: 10px;
  border: 2px solid ${p => p.theme.color.error};
  background: ${p => p.theme.color.backgroundLight};
  color: ${p => p.theme.color.error};
  font: ${p => p.theme.font.text1};
  position: absolute;
  top: 20px;
  right: 20px;

  &:hover {
    border-color: ${p => p.theme.color.errorDark};
    background: ${p => p.theme.color.background};
    color: ${p => p.theme.color.errorDark};
  }

  i{
    margin-right: 10px;
  }

  @media ${medias.mobileL} {
    width: 40px;
    height: 40px;
    padding: 10px;
    top: 10px;
    right: 10px;

    i{
      margin-right: unset;
    }

    span {
      display: none;
    }
  }
`

const SignOutButton = ({children}) => {
  const handleSignOut = async () => {
    const auth = getAuth()

    try {
      localStorage.removeItem('category')
      localStorage.removeItem('level')

      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <StyledButton onClick={handleSignOut}>
      <i className="fas fa-sign-out-alt"/>
      <span> {children} </span>
    </StyledButton>
  )
}

export default SignOutButton