import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import Card from '../../components/card/Card'

const Home = () => {
  return (
    <div className='pt-28 h-dvh dark:bg-black dark:text-white'>
        <p>Welcome to Home Page</p>

        <Card />
    </div>
  )
}

export default Home