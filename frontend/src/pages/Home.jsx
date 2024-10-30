import React from 'react'
import ImageUploader from '../components/ImageUploader'
import ImageGallery from '../components/ImageGallery'
import TagCreation from '../components/TagCreation'
import Navbar from '../components/Navbar'

export const Home = () => {
  return (
    <div>
        <Navbar />
        <h1>Create your Tag if it doesn't exist</h1>
        <TagCreation/>
        <h1>Image Uploader</h1>
    <ImageUploader />
    <h2>Image Gallery</h2>
    <ImageGallery />
    </div>
  )
}
