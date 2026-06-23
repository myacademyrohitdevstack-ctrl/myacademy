import React from 'react'
import Hero from './components/Hero'
import CourseCategories from './components/CourseCategroies'
import FeaturedPrograms from './components/FeaturedPrograms'
import LearningRoadmap from './components/LearningRoadmap'
import CourseComparison from './components/CourseComparison'
import LearningExperience from './components/LearningExperience'
import StudentSuccess from './components/StudentSuccess'
import FAQs from './components/Faqs'
import CTA from './components/CTA'


export default function page() {
  return (
  <>
<Hero></Hero>
<CourseCategories></CourseCategories>
{/* <FeaturedPrograms></FeaturedPrograms> */}
{/* <LearningRoadmap></LearningRoadmap> */}
{/* <CourseComparison></CourseComparison> */}
<LearningExperience></LearningExperience>
<StudentSuccess></StudentSuccess>
<FAQs></FAQs>
<CTA></CTA>
  </>
  )
}
