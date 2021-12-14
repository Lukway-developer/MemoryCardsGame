import React from 'react'
import Theme from './src/theme/Theme'
import GameContextProvider from './src/context/GameContext'

export const wrapRootElement= ({element}) => (
  <GameContextProvider>
    <Theme theme='light'>
      {element}
    </Theme>
  </GameContextProvider>
)