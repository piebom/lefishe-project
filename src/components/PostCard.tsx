import React from 'react'
import Image from "next/image"
import {motion} from "framer-motion"
type Props = {
  imageUrl : string
}

function PostCard({imageUrl}: Props) {
  return (
    <div className='shadow-xl relative bg-transparent shadow-gray-600 rounded-[15px] border-collapse overflow-hidden'>
        <Image className='bg-transparent' alt='image' src={imageUrl} width={600} height={600}/>
    </div>
  )
}

export default PostCard