import React, { useState, useLayoutEffect } from 'react'
import styled from 'styled-components'
import PositionItem from './PositionItem'
import { getRanking } from '../../utils/database'
import { medias } from '../../theme/MediaQueries'

const StyledPositions = styled.div`
  height: fit-content;
  margin-top: 20px;
  border-radius: 10px;
  background: ${p => p.theme.color.backgroundLight};
  box-shadow: ${p => p.theme.shadow.card};
  text-align: center;

  table {
    width: 100%;
  }

  th {
    font: ${p => p.theme.font.text1};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  td {
    font: ${p => p.theme.font.text2};
    color: ${p => p.theme.color.violet};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media ${medias.desktopL} {
    th, td {
      width: 250px;
      height: 50px;
    }
  }
  @media ${medias.desktop} {
    th, td {
      max-width: 210px;
      height: 40px;
    }
  }
  @media ${medias.laptopL} {
    th, td {
      max-width: 175px;
      height: 30px;
    }
  }
  @media ${medias.tablet} {
    width: 100%;
    th, td {
      max-width: 90px;
    }
  }
`

const Positions = ({ category = 'developers', level = 'easy' }) => {
  const [positions, setPositions] = useState([])

  useLayoutEffect(() => {
    handlePositions()
  }, [])

  useLayoutEffect(() => {
    handlePositions()
  }, [category, level])

  const handlePositions = async () => {
    let newPositions = await getRanking(category, level)

    setPositions(newPositions)
  }

  return (
    <StyledPositions>
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Nombre</th>
            <th>Errores</th>
            <th>Tiempo</th>
          </tr>
        </thead>
        <tbody>
          {positions.map(item =>
            <PositionItem
              key={item.position}
              data={item}
            />
          )}
        </tbody>
      </table>
    </StyledPositions>
  )
}

Positions.defaultProps = {
  category: 'animals',
  level: 'easy'
}
export default Positions