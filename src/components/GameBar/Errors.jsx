import React, { useContext } from 'react'
import { GameContext } from '../../context/GameContext'

const Errors = () => {
  const { game } = useContext(GameContext)

  return (
    <span>{game.errors}</span>
  )
}

export default Errors