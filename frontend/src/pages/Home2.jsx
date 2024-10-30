import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

import Tags from '../components/Tags'
import ImageGallery from '../components/ImageGallery'

const Home2 = () => {
  return (
    <>
    <div className='bg-zinc-900'>
    <Navbar />
    <div className='flex '>
    <Sidebar />
    <ImageGallery />
    </div>
    </div>
   
    </>
  )
}

export default Home2