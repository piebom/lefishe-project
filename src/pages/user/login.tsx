import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import Loginform from '../../components/Loginform'

type Props = {}

function login({}: Props) {
  const { data: session } = useSession()
  const router = useRouter()
  if(session)
  {
    router.push("/user")
  }
  return (
    <>
    <div className='w-full min-h-full flex justify-center items-center'>
      <Loginform/>
    </div>
    </>
  )
}

export default login