import React from 'react'

type Props = {
  children?: React.ReactNode
}

function Card({children}: Props) {
  return (
    <div className='fixed bottom-0 w-screen sm:w-[500px] h-fit flex flex-col gap-4 items-center text-center bg-gray-200 p-6'>
        {children}
    </div>
  )
}

export default Card