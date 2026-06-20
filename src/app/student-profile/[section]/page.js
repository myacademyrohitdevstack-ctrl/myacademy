import React from 'react'
import StudentPortala from './StudentClient'

export default async function page({params}) {
  const {section}=await params
  return (
   <StudentPortala section={section}></StudentPortala>
  )
}
