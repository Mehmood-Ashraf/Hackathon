import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import Card from '../../components/card/Card'



const Home = () => {

  const openProfile = () => {}

  return (
    <div className='pt-28 h-screen flex w-full dark:bg-black dark:text-white'>
        <p>Welcome to Home Page</p>

        {/* <Card /> */}
        <div>

        <button onClick={openProfile} className='border-2 bg-blue-800 text-white cursor-pointer p-'>Profile</button>
        </div>
    </div>
  )
}

export default Home