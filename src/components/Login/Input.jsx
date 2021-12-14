import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { medias } from '../../theme/MediaQueries'

const StyledInputContainer =styled.div`
  width: 100%;
  position: relative;
  ${'' /* &::after {
      height: 13px;
      background: ${p => p.theme.color.backgroundLight};
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -13px;
      left: 15px;
      z-index: 10;
      color: ${p => p.theme.color.text};
      font: ${p => p.theme.font.text2};
      font-size: .7rem;
    }

  ${p => p.type == 'email' && css`
    &::after {
      content: "Email";
    }
  `}

  ${p => p.type == 'password' && css`
    &::after {
      content: "Contraseña";
    }
  `} */}
`

const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  outline: none;
  border-radius: 10px;
  padding: 5px 15px;
  background-color: ${p => p.theme.color.background};
  font: ${p => p.theme.font.text2};
  transition: background-color .1s, box-shadow .1s;
  &::placeholder {
    color: ${p => p.theme.color.text};
    font: ${p => p.theme.font.text2};
    opacity: 0.7;
  }
  &:hover {
    background-color: ${p => p.theme.color.backgroundDark};
  }
  &:focus {
    outline: 2px solid ${p => p.theme.color.purple};
    box-shadow: ${p => p.theme.shadow.button};
  }

  @media ${medias.mobileL} {
    height: 45px;
  }
`

const StyledInputButton = styled.button`
  position: absolute;
  top: 14px;
  right: 15px;
  font-size: 20px;
  color: ${p => p.theme.color.text};
`

const StyledLabel = styled.span`
  height: 13px;
  background: ${p => p.theme.color.backgroundLight};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -13px;
  left: 15px;
  z-index: 10;
  color: ${p => p.theme.color.text};
  font: ${p => p.theme.font.text2};
  font-size: .7rem;

  ${p => p.error && css`
    color: ${p => p.theme.color.error};
  `}
`

const Input = ({children, type, name, label, handleInput, error}) => {
  const [inputType, setInputType] = useState(type)

  const handleToogleShowPassword = () => {
    inputType === 'password'
      ? setInputType('email')
      : setInputType('password')
  }

  return (
    <StyledInputContainer type={type}>
      {
        error
          ? <StyledLabel error>{error}</StyledLabel>
          : <StyledLabel>{label}</StyledLabel>
      }

      <StyledInput
        type={inputType}
        name={name}
        placeholder={children}
        onChange={(e) => handleInput(e.target.value)}
      />

      {
        type === 'password'
          ? <StyledInputButton onClick={handleToogleShowPassword}>
            {
              inputType === 'password'
                ? <i className="fas fa-eye"/>
                : <i className="fas fa-eye-slash"/>
            }
          </StyledInputButton>
          : null
      }


    </StyledInputContainer>
  )
}

export default Input