import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import Registerform from '../../components/Registerform'

type Props = {}

function register({}: Props) {
  const { data: session } = useSession()
  const router = useRouter()
  if(session)
  {
    router.push("/user")
  }
  return (
    <>
    <div className='w-full min-h-full flex justify-center items-center'>
      <Registerform/>
    </div>
    </>
  )
}

export default register