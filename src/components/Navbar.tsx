import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { Home, Image, Award, User, Plus, PlusCircle, PlusSquare, UserPlus, FolderPlus } from 'react-feather';
import { useSession, signIn, getCsrfToken  } from "next-auth/react"
import { motion } from 'framer-motion';
type Props = {
}

function Navbar({}: Props) {
    const { data: session } = useSession()
    const [activeIndex, setActiveIndex] = useState(0);
    const indicatorRef = useRef();
    const router = useRouter()
    useEffect(() => {
        if(window.location.pathname.includes("/user")){
            setActiveIndex(3)
        }
        if(window.location.pathname.includes("/gallery")){
            setActiveIndex(1)
        }
        if(window.location.pathname.includes("/competition")){
            setActiveIndex(2)
        }
        if(window.location.pathname == "/"){
            setActiveIndex(0)
        }
      },[])
  return (
    <div className='max-h-screen flex items-center'>
        <motion.div className='bg-[#3d3d3d] w-[75px] h-[240px] rounded-[15px] fixed m-5 shadow-3xl z-20'
                initial={{
                    x: -150,
                    opacity: 0,
                    scale: 0.5
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1
                }}
                transition={{
                    duration: 1,
                }}
        >
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
        </motion.div>
        {session && <motion.div className='bg-transparent w-[75px] p-4 h-[75px] rounded-[15px] fixed ml-5 shadow-3xl z-10 flex justify-center items-center'
                initial={{
                    x: 0,
                    y: 100,
                    opacity: 0,
                }}
                animate={{
                    x: 0,
                    y: 155,
                    opacity: 1,
                }}
                transition={{
                    duration: 1,
                    delay:0.75,
                    ease:"backIn"
                }}
        >            
        <div
        ref={indicatorRef}
        className="bg-[#6A8E7F] absolute w-[55px] h-[55px] rounded-[15px]"></div>
                <button key={0} onClick={() => {setActiveIndex(0);router.push("/gallery/add")}} className='z-10 w-[47px] h-[47px] flex justify-center items-center rounded-[15px]'>
                    <Plus size={35} color="#fbfbfb"/>
                </button>
        </motion.div>}
    </div>
  )
}

export default Navbar