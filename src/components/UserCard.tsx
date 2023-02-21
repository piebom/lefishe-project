import React from 'react'
import Image from "next/image";
import { motion } from 'framer-motion';
import { SocialIcon } from 'react-social-icons';
type Props = {
    imageURL : string,
    naam : string,
    bijnaam : string,
    bio : string
}

function UserCard({imageURL, naam, bijnaam, bio}: Props) {
  return (
    <motion.div className="flex flex-col justify-center items-center snap-center p-10"
    >
    <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-fit min-h-[100%] flex flex-col rounded-[15px] justify-start items-center p-5 pl-10 pr-10 max-w-[400px]">
        <Image alt="jonas" src={imageURL} width={125} height={125} className="rounded-[10000px] mb-5 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"></Image>
        <p className="font-bold text-2xl">{naam}</p>
        <p className="italic  text-slate-700">{bijnaam}</p>
        <p className="mt-5 pb-5">{bio}</p>
        <hr className="h-px my-5 w-[75%] mt-auto bg-gray-200 border-0 dark:bg-gray-700"/>
        <div className='flex gap-x-5'>
            <SocialIcon network='facebook'/>
            <SocialIcon network='instagram'/>
            <SocialIcon network='email'/>
        </div>
    </div>
  </motion.div>
  )
}

export default UserCard