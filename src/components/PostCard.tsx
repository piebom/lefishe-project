import React from 'react'
import Image from "next/image"
import {motion} from "framer-motion"
import { useRouter } from "next/router";
type Props = {
  imageUrl : string
  id: string
}

function PostCard({imageUrl ,id}: Props) {
  const router = useRouter();
  return (
    <div className='aspect-square relative' onClick={()=> router.push("/gallery/"+id)}>
        <Image className='bg-transparent relative aspect-square' priority alt='image' sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw' src={imageUrl} fill/>
    </div>
  )
}

export default PostCard