import React from 'react'


export default function Card({imageUrl , title}) {
  const cardStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize:'cover',
    backgroundPosition:'center',
  }





  return (
    <div 
    style={cardStyle}
    className='w-full h-[300px] md:w-[300px] md:h-[400px] rounded-2xl '>
      <div className='bg-color group relative transition-all flex flex-col-reverse  h-full w-full rounded-2xl'>
     
        <h3 className='card-text hidden group-hover:flex active:flex  h-[30%] opacity-80 text-white font-bold text-xl transition-all delay-300 ease-in-out  '>{title}</h3>
      
      </div>
        <style>{`
      .bg-color:hover{
      background-color: rgba(0, 0, 0, 0.4);
      }
      
    `}</style>
    </div>
  )
}

// purpose for resuable card for destination and feedback
