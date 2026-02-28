import Embed from '@/components/Embed'
import { getSession } from '@/lib/getSession'
import React from 'react'


async function page(){
  const session = await getSession()
  return (
    <>
     
     <Embed ownerId={String(session?.user?.id)}/>
      
    </>
  )
}

export default page