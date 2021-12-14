import React, { useState, useContext, useEffect } from 'react'
import { GameContext } from '../../context/GameContext'

const Timer = ({ saveTime, resetTime, setResetTime }) => {
  const { game, setGame } = useContext(GameContext)
  const [ time, setTime ] = useState('')
  const [ intervalId, setIntervalId ] = useState('')

  useEffect(() => {
    handleTimer(true)
  }, [])

  useEffect(() => {
    handleTimer(false)
    if(game.cards.length > 0){
      setGame({...game, time: time})
    }
  }, [saveTime])

  useEffect(() => {
    if(resetTime){
      setTime('')
      handleTimer(false)

      handleTimer(true)

      setResetTime(false)
    }
  }, [resetTime])

  const handleTimer = (run) => {
    let runningTime = 0
    let startTime = Date.now() - runningTime

    if(run) {
      const intervalRef = setInterval(() => {
        runningTime = Date.now() - startTime
        const currentTime = calculateTime(runningTime)

        setTime(currentTime)
      }, 1000)

      setIntervalId(intervalRef)
    } else {
      clearInterval(intervalId)
    }
  }

  const calculateTime = ( runningTime ) => {
    const totalSeconds = Math.floor(runningTime / 1000)
    const totalMinutes = Math.floor(totalSeconds / 60)

    const displaySeconds = (totalSeconds % 60).toString().padStart(2, '0')
    const displayMinutes = totalMinutes.toString().padStart(2, '0')

    return `${displayMinutes}:${displaySeconds}`
  }

  return (
    <span>{time || '00:00'}</span>
  )
}

export default Timer