import React from 'react'
import LocationCard from './LocationCard'
import LocationCard2 from './LocationCard2'

type Props = {}

function LocationPage({}: Props) {
  const imagesSlide2 = ["niel1.jpg","niel2.jpg","niel3.jpg"]
  return (
    <section id='Locatie' className='w-screen h-screen relative flex flex-col justify-center gap-x-10 items-center snap-center'>
                          <h1 className='font-bold text-4xl -translate-y-20'>Waar vissen wij?</h1>
                          <div className='flex gap-x-10'>
                          <LocationCard2 name='Niel' location='Antwerpen' img='/niel1.jpg'/>
      <LocationCard2 name='Oude Durme' location='Hamme' img='/lake1.jpg'/>
                          </div>
    </section>
  )
}

export default LocationPage