import React, { useState, useEffect } from 'react'

const Timer = () => {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(1)
  const [pauseMinutes, setPauseMinutes] = useState(1)
  const [pauseSeconds, setPauseSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isSession, setIsSession] = useState(true)

  function toggle() {
    setIsActive(!isActive)
    setIsSession(!isSession)
  }

  function reset() {
    setSeconds(0)
    setMinutes(25)
    setIsActive(false)
    setIsSession(true)
    setPauseSeconds(0)
    setPauseMinutes(5)
  }

  function increaseCounter() {
    if (minutes < 60) {
      setMinutes(() => minutes + 1)
    }
  }

  function decreaseCounter() {
    if (minutes > 1) {
      setMinutes(() => minutes - 1)
    }
  }

  function increasePauseCounter() {
    if (pauseMinutes < 15) {
      setPauseMinutes(() => pauseMinutes + 1)
    }
  }

  function decreasePauseCounter() {
    if (pauseMinutes > 1) {
      setPauseMinutes(() => pauseMinutes - 1)
    }
  }

  useEffect(() => {
    let interval = null
    if (isActive) {
      if (minutes === 0 && seconds === 0) {
        setIsSession(false)
        setIsActive(false)
        clearInterval(interval)
      } else if (seconds === 0) {
        setMinutes((minutes) => minutes - 1)
        setSeconds((seconds) => 4)
      } else
        interval = setInterval(() => {
          setSeconds((seconds) => seconds - 1)
        }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds, minutes, setIsSession])

  useEffect(() => {
    let interval = null
    if (minutes === 0 && seconds === 0) {
      if (pauseMinutes === 0 && pauseSeconds === 0) {
        setIsSession(false)
        setIsActive(false)
        clearInterval(interval)
      } else if (pauseSeconds === 0) {
        setPauseMinutes((pauseMinutes) => pauseMinutes - 1)
        setPauseSeconds((pauseSeconds) => 4)
      } else
        interval = setInterval(() => {
          setPauseSeconds((pauseSeconds) => pauseSeconds - 1)
        }, 1000)
    } else if (!isActive && pauseSeconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [pauseSeconds, pauseMinutes, setIsSession, minutes, seconds, isActive])

  return (
    <section className="container-timer">
      <h4>{isSession === true ? 'Session' : 'Break'}</h4>
      <span className="timer">{minutes}</span>
      <span className="timer">:</span>
      <span className="timer">
        {seconds === 0 ? '00' : seconds < 10 ? '0' + seconds : seconds}
      </span>
      <section className="row">
        <button
          className={`button button-primary button-primary-${
            isActive ? 'active' : 'inactive'
          }`}
          onClick={toggle}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </section>

      <section>
        <>
          <button
            disabled={isActive === true ? 'disabled' : ''}
            onClick={increaseCounter}
          >
            Up
          </button>
          <button
            disabled={isActive === true ? 'disabled' : ''}
            onClick={decreaseCounter}
          >
            Down
          </button>
        </>
      </section>

      <section>
        <h4>Durata Intervallo</h4>
        <span className="timer">{pauseMinutes}</span>
        <span className="timer">:</span>
        <span className="timer">
          {pauseSeconds === 0
            ? '00'
            : pauseSeconds < 10
            ? '0' + pauseSeconds
            : pauseSeconds}
        </span>{' '}
        <section className="container-intervallo">
          <button
            disabled={isActive === true ? 'disabled' : ''}
            onClick={increasePauseCounter}
          >
            Up
          </button>
          <button
            disabled={isActive === true ? 'disabled' : ''}
            onClick={decreasePauseCounter}
          >
            Down
          </button>
        </section>
      </section>
    </section>
  )
}

export default Timer
