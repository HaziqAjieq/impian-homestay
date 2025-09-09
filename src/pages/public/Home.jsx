import React from 'react'
import Header from '../../components/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-regular-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div className=''>
      <div>
           <Header/>
      </div>
      <div className=''>
        {/* why choose us section with 4 grid box */}
        <div>
          <FontAwesomeIcon icon={faHouse} className='font-bold text-5xl' />
          <FontAwesomeIcon icon={faUtensils} className='font-bold text-5xl' />
          <FontAwesomeIcon icon={faMagnifyingGlassLocation} className='font-bold text-5xl' />
        </div>
      </div>
      
    </div>
  )
}


// Content:

// Hero section with search bar (location, dates, guests)

// Featured properties carousel

// Benefits/features section

// Testimonials

// Call-to-action to browse properties