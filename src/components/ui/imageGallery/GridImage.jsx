import React from 'react'

export default function GridImage({src , alt}) {
  return (
    <>
       <img
        src={src}
        alt={alt}
        className="object-cover w-full rounded-2xl h-full "
      />
      
    </>
  )
}
