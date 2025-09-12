import React from 'react'
import { useState } from 'react'

export default function Card({imageUrl , title}) {
  const cardStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize:'cover',
    backgroundPosition:'center',
   
  }


  return (
    <div 
    style={cardStyle}
    className='w-full h-[300px]  md:h-[400px] rounded-2xl '>
      <div className='bg-color group relative transition-all flex flex-col-reverse h-full w-full rounded-2xl   md:bg-transparent hover:bg-black/40 '>
     
        <h3 className='card-text flex md:hidden group-hover:flex active:flex  h-[30%] opacity-80 text-white font-bold text-2xl transition-all delay-300 ease-in-out bg-black/40 md:bg-transparent text-center items-center rounded-b-2xl pl-20'>{title}</h3>
      
      </div>
        <style>{`
      
    `}</style>
    </div>
  )
}

// purpose for resuable card for destination and feedback
