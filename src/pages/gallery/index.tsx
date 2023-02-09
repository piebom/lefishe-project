import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import {motion,useIsPresent} from "framer-motion"
import PostCard from '../../components/PostCard'
import { useRouter } from "next/router";
import { api } from '../../utils/api'
import { useSession, signIn, getCsrfToken  } from "next-auth/react"
import {Grid,Square} from "react-feather"
import { TypeOf } from 'zod'
type Props = {}

function gallery({}: Props) {
  const router = useRouter();
  const [value, changeValue] = useState(2)
  const { data: session, status } = useSession()
  const [favorite, setfavorite] = useState(false);
  const [vangsten, setVangsten] = useState<any[]>([]);
  const [sessie, setsessie] = useState<string>("All");
  const [gridclass, changeGridClass] = useState("grid-cols-2")
  const change = (v:React.SetStateAction<number>) => {
    console.log(v)
    changeValue(v);
    if(v == 1){
      changeGridClass("grid-cols-1")
    }
    else if(v==2){
      changeGridClass("grid-cols-2")
    }
    else if(v==3){
      changeGridClass("grid-cols-3")
    }
    console.log(gridclass)
  }
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
  var data = api.vangst.getAllVangstByLocationId.useQuery({locatieId: sessie}).data;
  var favorites = api.favorite.getAllFavoriteVangstenByUserId.useQuery({userId: session?.user?.id || ""}, {enabled: !!session?.user?.id}).data;
  useEffect(() => {
    if(favorite){
      var v = []
      favorites?.forEach(element => {
        v.push(element.vangst);
      });
      setVangsten(v)
    }else{
      if(data)
      {
        setVangsten(data)
      }
    }
  },[data,favorite])
  const onLocatieChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setsessie(e.target.value);
  }
  const onFavoriteChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setfavorite(!favorite)
  }

  return (
    <div className='w-full min-h-screen relative flex flex-col justify-start items-center overflow-hidden snap-none'>
      <h1 className='text-black font-bold text-[32pt] pt-5 w-screen text-center bg-[#FAF9F6] fixed h-[130px] z-20'>GALLERY</h1>
      <div className='flex gap-5 flex-col lg:flex-row mt-[100px] pl-10 pr-10 lg:pl-40 lg:pr-40 mx-auto pb-5 justify-between fixed items-top w-full bg-[#FAF9F6] z-20'>
        <div className='flex items-center'>
          <p className='font-bold mr-3 text-xl'>Sessie: </p>
        <select onChange={(e) => onLocatieChange(e)} className='border p-2 h-10 w-full lg:min-w-[250px] rounded-md'>
          <option>All</option>
          {locatie.data?.map(({id, Locatie}, index) => <option value={id} >{Locatie}</option>)}
        </select>
        </div>
        <div className="flex w-[200px] items-center">
          <input onChange={(e) => onFavoriteChange(e)} id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <label for="checked-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Favorites only</label>
        </div>
        <div className='flex mt-2 mb-2 lg:invisible'>
          <Square></Square>
                  <input className="w-full accent-[#3d3d3d] ml-2 mr-2" step={1} type="range" name="" value={value} min="1" max="3" onChange={(e) => change(parseInt(e.target.value))}/>
          <Grid></Grid>
        </div>

        <div className='flex w-full justify-between lg:justify-end lg:gap-5 mt-2'>
        <button onClick={() => router.push("/gallery/add")} className='bg-[#6A8E7F] text-white font-bold rounded-lg w-fit pl-5 pr-5 h-10'>Nieuwe vangst</button>
        </div>
      </div>
      <div className='container mt-[170px] mx-auto m-10 w-full h-full flex justify-center'>
      <motion.div 
    variants={container}
    initial="hidden"
    animate="show"
      
      className={`grid w-full h-full max-h-[100vh] gap-6 overflow-y-scroll p-2 md:grid-cols-2 lg:grid-cols-5 ${gridclass}`} >
        {vangsten.length > 0 ? vangsten?.map(({id,name,date,description,weight,imageURL,userId}, index) =>         
        <motion.div key={index} variants={item} className=" shadow-lg relative bg-transparent shadow-gray-600 rounded-[15px] aspect-square border-collapse overflow-hidden">
          <PostCard id={id} imageUrl={imageURL}/>
        </motion.div>) : <div key={"1"} className='flex w-[100%] col-span-5 h-full justify-center items-center'>
          <p className='text-2xl font-bold'>Geen vansten gevonden</p></div>}
        </motion.div>
      </div>
      </div>
  )
}

export default gallery