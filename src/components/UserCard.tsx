import React from 'react'
import Image from "next/image";
import { motion } from 'framer-motion';
type Props = {
    imageURL : string,
    naam : string,
    bijnaam : string,
    bio : string
}

function UserCard({imageURL, naam, bijnaam, bio}: Props) {
  return (
    <motion.div className="flex flex-col justify-center items-center snap-center p-10"
    initial={{
        y: -100,
        opacity: 0
    }}
    whileInView={{
        y: 0,
        opacity: 1
    }}
    transition={{
        duration: 1,
    }}
    viewport={{once:true}}
    whileHover={{
        opacity: 1,
        scale: 1.03,
        transition: { duration: 0.2 },
    }}
    >
    <Image alt="jonas" src={imageURL} width={150} height={100} className="rounded-[10000px] translate-y-16"></Image>
    <div className="bg-white w-[90vw] lg:w-[400px] min-h-[450px] lg:min-h-[365px] rounded-2xl flex flex-col items-center pt-20 p-10">
        <p className="font-bold text-2xl">{naam}</p>
        <p className="italic text-gray-700">{bijnaam}</p>
        <p className="mt-5">{bio}</p>
    </div>
  </motion.div>
  )
}

export default UserCard