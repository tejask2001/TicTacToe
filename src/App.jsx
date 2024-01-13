import { useState } from 'react'
import './App.css'
import Quotes from './quotes.jsx'
import Game from './game.jsx'
import HomeScreen from './homeScreen.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Quotes/>
      <HomeScreen/>
    </>
  )
}

export default App
