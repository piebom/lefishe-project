import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { Home, Image, Award, User } from 'react-feather';
type Props = {
}

function Navbar({}: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const indicatorRef = useRef();
    const router = useRouter()
  return (
    <div className='min-h-full flex items-center m-5'>
        <div className='bg-[#3d3d3d] w-[75px] h-[240px] rounded-[15px]'>
            <div className='flex flex-col justify-start p-[13px]'>
            <div
                ref={indicatorRef}
                className="bg-[#fbfbfb] absolute w-[47px] h-[47px] mb-[9px] rounded-[15px]"
                 style={{
                    transition: `0.2s ease-in-out`,
                    transform: `translateY(${(activeIndex * (56))}px)`,
                }}></div>
                <button key={0} onClick={() => {setActiveIndex(0);router.push("/")}} className='z-10 w-[47px] h-[47px] mb-[9px] flex justify-center items-center rounded-[15px]'>
                    <Home color={activeIndex == 0 ? "#3d3d3d": "#fbfbfb"}/>
                </button>
                <button key={1} onClick={() => {setActiveIndex(1);router.push("/gallery")}} className='z-10 w-[47px] h-[47px] mb-[9px] flex justify-center items-center rounded-[15px]'>
                    <Image className='z-10' color={activeIndex == 1 ? "#3d3d3d": "#fbfbfb"} />
                </button>
                <button key={2} onClick={() => {setActiveIndex(2);router.push("/competition")}} className='w-[47px] h-[47px] mb-[9px] flex justify-center items-center rounded-[15px]'>
                    <Award className='z-10' color={activeIndex == 2 ? "#3d3d3d": "#fbfbfb"}/>
                </button>
                <button key={3} onClick={() => {setActiveIndex(3);router.push("/user")}} className='w-[47px] h-[47px] flex justify-center items-center rounded-[15px]'>
                    <User className='z-10' color={activeIndex == 3 ? "#3d3d3d": "#fbfbfb"}/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar