import React from 'react'
import CourseClient from './components/CourseClient'
import { courses, coursesData } from './data'
import { notFound } from 'next/navigation'

export default async function page({params}) {
  const {slug}=await params
  const course = coursesData.find((course)=>course.slug===slug)
  if(!slug) {
    notFound()
  }

  return (
  <CourseClient course={course}></CourseClient>
  )
}
