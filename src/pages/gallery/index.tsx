import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import {motion,useIsPresent} from "framer-motion"
import PostCard from '../../components/PostCard'
import { useRouter } from "next/router";
import { api } from '../../utils/api'
type Props = {}

function gallery({}: Props) {
  const router = useRouter();
  const container = {
    hidden: { opacity: 1, },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y:60},
    show: { opacity: 1, y:0 }
  }
  const locatie = api.locatie.getAllLocations.useQuery();
  const vangsten = api.vangst.getAllVangst.useQuery();
  return (
    <div className='w-full min-h-screen relative flex flex-col justify-start items-center snap-none'>
      <h1 className='text-black font-bold text-[32pt] mb-20 pt-10 w-screen text-center bg-[#FAF9F6] fixed h-[130px] z-20'>GALLERY</h1>
      <div className='flex mt-[130px] pb-5 w-full justify-between items-top fixed bg-[#FAF9F6] z-20'>
        <div className='ml-[183px] flex items-center'>
          <p className='font-bold mr-3 text-xl'>Sessie: </p>
        <select className='border p-2 w-60 h-10 rounded-md'>
          <option>All</option>
          {locatie.data?.map(({id, Locatie}, index) => <option value={id} >{Locatie}</option>)}
        </select>
        </div>
        <div className='flex mr-[183px]'>
        <button className='ml-[15px] bg-[#6A8E7F] text-white font-bold rounded-lg w-40 h-10'>Nieuwe sessie</button>
        <button onClick={() => router.push("/gallery/add")} className='ml-[15px] bg-[#6A8E7F] text-white font-bold rounded-lg w-40 h-10'>Nieuwe vangst</button>
        </div>
      </div>
      <div className='container mx-auto flex justify-center mt-[220px] pb-10'>
      <motion.div 
    variants={container}
    initial="hidden"
    animate="show"
      
      className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5'>
        {vangsten.data?.map(({id,name,date,description,weight,imageURL,userId}, index) =>         
        <motion.div variants={item} className="bg-transparent">
          <PostCard imageUrl={imageURL}/>
        </motion.div>)}
        </motion.div>
      </div>
    </div>
  )
}

export default gallery