import { useState } from 'react'
import './global.css'
import styles from './App.module.css';
import { Outlet } from 'react-router-dom'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className={styles.container}> 
      <Outlet />
     </div>
    </>
  )
}

