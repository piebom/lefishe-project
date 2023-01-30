import React from 'react'
import {motion,useIsPresent} from "framer-motion"
type Props = {}

function competition({}: Props) {
  const isPresent = useIsPresent();
  return (
    <div className='w-full min-h-screen'>
            <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 1, ease: "anticipate" } }}
        exit={{ scaleX: 0, transition: { duration: 1, ease: "backIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
    </div>
  )
}

export default competition