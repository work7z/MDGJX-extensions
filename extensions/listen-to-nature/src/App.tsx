import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  type AudioType = {
    src: string
  }
  const [songs, onSongs] = useState<AudioType[]>([])

  return (
    <>
      <h1>
        <audio src="./sounds/bgm/chopin.mp3"  ref={e=>{
          e?.play()
        }} controls></audio>
      </h1>
    </>
  )
}

export default App
