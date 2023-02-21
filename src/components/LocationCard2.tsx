import React from 'react'
import Image from "next/image";
import {motion,useIsPresent} from "framer-motion"
type Props = {
    name: string,
    location: string,
    img: string,
}

function LocationCard2({name,location,img}: Props) {
    const variants = {
        visible: { opacity: 1 , y:0},
        hidden: { opacity: 0,y:20 },
      }
    const variants2 = {
        visible: { scale: 1.25,zIndex:50,boxShadow: "0px 4px 16px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 56px rgba(17,17,26,0.1)"},
        hidden: { scale: 1 },
    }
  return (
    <motion.div   
    initial="hidden"
    whileHover="visible"
    variants={variants2} transition={{delay:0}} className='cursor-auto aspect-square relative flex flex-col justify-center items-center w-[350px] rounded-lg'>
        <div className='text-center relative'>
        <h1 className='z-20 relative text-white font-bold text-5xl drop-shadow-2xl'>{name}</h1>
        <h1 className='z-20 relative text-white text-4xl drop-shadow-2xl'>{location}</h1>
        </div>
        <Image alt='niel' src={img} fill className='rounded-lg z-10' style={{objectFit:"cover"}} />
        <motion.button variants={variants} transition={{delay:0.2}} className='w-fit pl-14 pr-14 h-[40px] shadow-2xl bg-[#6A8E7F] rounded-lg absolute bottom-0 mb-10 z-20 text-white font-bold text-xl'>
            DISCOVER
        </motion.button>
    </motion.div>
  )
}

export default LocationCard2