import React, { useState, useEffect, createContext } from 'react'

export const GameContext = createContext()

const GameContextProvider = ({ children }) => {
  let category
  let level

  useEffect(() => {
    category = sessionStorage.getItem('category')
    level = sessionStorage.getItem('level')
  }, [])

  const [game, setGame] = useState({
    category: category,
    level: level,
    cards: [],
    errors: 0,
    time: ''
  })

  return (
    <GameContext.Provider value={{game, setGame}}>
      {children}
    </GameContext.Provider>
  )
}

export default GameContextProvider