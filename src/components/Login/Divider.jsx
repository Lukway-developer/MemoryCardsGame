import React from 'react'
import styled from 'styled-components'

const StyledDivider = styled.div`
  width: 100%;
  height: fit-content;
  text-align: center;
  position: relative;
  font: ${p => p.theme.font.text1};
  span {
    margin: 0 20px;
    &::before, &::after {
      content: "";
      width: 25%;
      height: 3px;
      border-radius: 2px;
      background-color: ${p => p.theme.color.text};
      position: absolute;
      top: calc(50% - 1px);
    }
    &::before {
      right: 0;
    }
    &::after {
      left: 0;
    }
  }
`

const Divider = ({children}) => {
  return (
    <StyledDivider>
      <span>{children}</span>
    </StyledDivider>
  )
}

export default Divider