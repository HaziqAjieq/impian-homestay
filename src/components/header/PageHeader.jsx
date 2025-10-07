import React, { use } from 'react'
import mawar from '../../assets/properties/rumah-mawar.jpg';
import { useTranslation } from "react-i18next";

export default function PageHeader({title , children}) {
  const { t } = useTranslation();

  return (
  <header
      style={{
        backgroundImage: `url("${mawar}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='md:h-[700px] md:mt-[-125px] bg-image z-0 flex justify-center'
    >
      <div className="h-[60vh] grid grid-cols-12 row-auto z-0 inset-0 md:relative md:h-full items-center bg-black/60 text-white w-full">
        <div className='flex flex-col md:mt-[-60px] col-span-10 col-start-2 md:col-span-8 md:col-start-2 justify-center  '>
          <div className='text-4xl md:text-5xl font-bold'>
            <h1 className='leading-[1.1]'>{title}</h1>
          </div>
          {children && (
            <div className='text-lg md:text-xl font-semibold text-white/80 leading-[1.6]'>
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}


// a custom header for other pages, focusly on text and visual video background