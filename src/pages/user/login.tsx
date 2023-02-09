import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import Loginform from '../../components/Loginform'
import {motion,useIsPresent} from "framer-motion"
type Props = {}

function login({}: Props) {
  const { data: session } = useSession()
  const router = useRouter()
  if(session)
  {
    router.push("/user")
  }
  const isPresent = useIsPresent();
  return (
    <>
    <div className='w-full min-h-screen flex justify-center items-center'>
    <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 1, ease: "anticipate" } }}
        exit={{ scaleX: 0, transition: { duration: 1, ease: "backIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
      <Loginform/>
    </div>
    </>
  )
}

export default login