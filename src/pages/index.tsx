import React from 'react'
import LandingPage from '../components/LandingPage'
import {motion} from "framer-motion"
import Image from "next/image";
import WiePage from '../components/WiePage';
import LocationPage from '../components/LocationPage';
type Props = {}

function index({}: Props) {
  return (
    <div className='snap-mandatory scroll-smooth'>
      <header className="z-20 pt-5 fixed max-w-screen h-[100px]">
        <div className='flex w-screen pl-10 pr-10 flex-row justify-between'>
        <div className='flex items-center'>
          <a href="#main">
        <Image alt="logo" className="z-20" src="/icon.png" width={100} height={100}></Image></a>
        {/* <h1 className='font-bold text-3xl'>Lefishe</h1> */}
        </div>
        <nav className='flex items-center'>
          <ul className='flex gap-x-10'>
            <li><a href='#Wie' className='text-xl font-bold'>Wie</a></li>
            <li><a href="#Locatie" className='text-xl font-bold'>Locatie's</a></li>
            <li><a className='text-xl font-bold'>Aas</a></li>
          </ul>
        </nav>
        </div>
      </header>

      <LandingPage/>

      <WiePage/>

      <LocationPage/>
    </div>
  )
}

export default index