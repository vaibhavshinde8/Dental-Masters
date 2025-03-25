import React from 'react'
import Hero from '../Components/Hero'
import Carousel from '../Components/Carousel'
import TreatCarausel from '../Components/TreatCarausel'
import Info from '../Components/Info'
import WhyChooseUs from '../Components/WhyChooseUs'

const Home = () => {
  return (
    <>
      <Hero/>
      <Carousel/>
      <TreatCarausel/>
      <Info />
      <WhyChooseUs/>
    </>
  )
}

export default Home