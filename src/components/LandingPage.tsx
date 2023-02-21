import React from 'react'
import Image from "next/image";
type Props = {}

function LandingPage({}: Props) {
  return (
    <section id='main' className='w-screen h-screen relative flex justify-center gap-x-10 items-center snap-center'>
        <div className='flex items-center justify-center'>
        <div className='max-w-[400px]'>
            <h1 className='font-bold text-6xl'>Le Fishe</h1>
            <h1 className='text-5xl pb-7'>Fishing blog</h1>
            <p className='text-gray-400 text-xl pb-7'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            <button className=' mt-5 w-[50%] bg-[#6A8E7F] p-3 text-white font-bold rounded-lg'>View Gallery</button>
        </div>
        <Image alt="logo" className="z-20" src="/bg.jpg" width={750} height={750}></Image>
        </div>
    </section>
  )
}

export default LandingPage