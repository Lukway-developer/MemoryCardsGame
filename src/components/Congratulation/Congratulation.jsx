import React, { useEffect, useContext } from 'react'
import { Link } from 'gatsby'
import { getAuth } from 'firebase/auth'
import { GameContext } from '../../context/GameContext'
import { getNickname, getRanking, updateRanking } from '../../utils/database'
import styled from 'styled-components'

const StyledCongratulationContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${p => p.theme.color.backgroundShadow};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`

const StyledCongratulationCard = styled.div`
  width: 300px;
  height: fit-content;
  border-radius: 10px;
  padding: 16px;
  background: ${p => p.theme.color.backgroundLight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    margin: 10px 0;
    font: ${p => p.theme.font.h3};
  }

  p {
    font: ${p => p.theme.font.text2};
  }

  a, button {
    width: 100%;
    height: 50px;
    margin-top: 15px;
    border-radius: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${p => p.theme.color.backgroundLight};
    font: ${p => p.theme.font.text1};
  }
`

const StyledDataContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: ${p => p.theme.font.text1};

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  h4 {
    margin: 12px 0 8px;
    i {
      color: ${p => p.theme.color.purple};
    }
  }

  span {
    font: ${p => p.theme.font.number};
    font-size: 1.2em;
  }
`

const StyledRankingLink = styled(Link)`
  background: ${p => p.theme.color.cyan};
  &:hover{
    background: ${p => p.theme.color.cyanDark};
    box-shadow: ${p => p.theme.shadow.button};
  }
`

const StyledPlayLink = styled(Link)`
  background: ${p => p.theme.color.purple};
  &:hover{
    background: ${p => p.theme.color.purpleDark};
    box-shadow: ${p => p.theme.shadow.button};
  }
`

const Congratulation = ({ errors, time }) => {
  const { game } = useContext(GameContext)

  useEffect(() => {
    const finishGame = async () => {
      const auth = getAuth()
      const uid = auth.currentUser.uid

      const category = game.category
      const level = game.level

      const ranking = await getRanking(category, level)
      const data = {
        errors,
        nickname: await getNickname(uid),
        position: 0,
        time
      }

      console.log(data)

      updateRanking(ranking, data, category, level)
    }

    finishGame()
  })

  return (
    <StyledCongratulationContainer>
      <StyledCongratulationCard>
        <h3>¡Felicitaciones!</h3>
        <p>Haz completado el desafío</p>

        <StyledDataContainer>
          <div>
            <h4>
              <i className="fas fa-times" aria-hidden="true"/>
              Errores
            </h4>
            <span>{errors}</span>
          </div>
          <div>
            <h4>
              <i className="fas fa-stopwatch" aria-hidden="true"/>
              Tiempo
            </h4>
            <span>{time}</span>
          </div>
        </StyledDataContainer>

        <StyledRankingLink to='/ranking'>
          <i className="fas fa-crown" aria-hidden="true"/>
          Ranking
        </StyledRankingLink>

        <StyledPlayLink to='/category'>
          <i className="fas fa-undo-alt" aria-hidden="true"/>
          Jugar de Nuevo
        </StyledPlayLink>
      </StyledCongratulationCard>
    </StyledCongratulationContainer>
  )
}

export default Congratulation