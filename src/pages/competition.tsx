import React from 'react'
import {motion,useIsPresent} from "framer-motion"
type Props = {}

function competition({}: Props) {
  const isPresent = useIsPresent();
  return (
    <div className='w-full min-h-screen'>
    </div>
  )
}

export default competition