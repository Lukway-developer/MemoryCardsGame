import React from 'react'
import styled from 'styled-components'
import Input from './Input'

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${p => p.theme.color.backgroundShadow};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`

const StyledCard = styled.div`
  width: 300px;
  height: fit-content;
  background-color: ${p => p.theme.color.backgroundLight};
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`

const StyledTitle = styled.h4`
  margin: 10px 0;
  font: ${p => p.theme.font.text1};

  span {
    color: ${p => p.theme.color.purple};
  }
`

const StyledText = styled.p`
  margin: 10px 0 30px 0;
  font: ${p => p.theme.font.text2};
`

const StyledButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 15px;
  padding-right: 10px;
  background: ${p => p.theme.color.purple};
  border-radius: 10px;
  color: ${p => p.theme.color.backgroundLight};
  font: ${p => p.theme.font.text1};

  &:hover {
    background: ${p => p.theme.color.purpleDark};
    color: ${p => p.theme.color.background};
  }

  i{
    margin-right: 10px;
  }
`

const Nickname = ({setNickname, handleSaveNickname, error}) => {
  return (
    <StyledContainer>
      <StyledCard>
        <StyledTitle>Ingrese su <span>nombre</span></StyledTitle>

        <StyledText>Sera el nombre usado cuando aparezcas en el ranking</StyledText>

        <Input
          type="text"
          name="nickname"
          label="Nombre"
          handleInput={setNickname}
          error={error}
        >
          Su nombre
        </Input>

        <StyledButton onClick={handleSaveNickname}>
          <i className="fas fa-download"/>
          Guardar nombre
        </StyledButton>
      </StyledCard>
    </StyledContainer>
  )
}
 
export default Nickname