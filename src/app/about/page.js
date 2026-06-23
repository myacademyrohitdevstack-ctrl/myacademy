import React from 'react'
import Hero from './components/Hero'

import AboutAcademy from './components/AboutAcademy'

import CourseCategories from '../courses/components/CourseCategroies'
import HowItWorks from './components/HowItWorks'
import CTA from './components/CTA'


export default function page() {
  return (
   <>
   <Hero></Hero>
   {/* <OurStory></OurStory> */}
   <AboutAcademy></AboutAcademy>
  <CourseCategories></CourseCategories>
  <HowItWorks></HowItWorks>
  <CTA></CTA>
   </>
  )
}
