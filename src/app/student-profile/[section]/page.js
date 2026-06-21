import React from 'react'
import StudentPortala from './StudentClient'
import ProtectedRoute from '@/lib/ProtectedRoutes'

export default async function page({params}) {
  const {section}=await params
  return (
    <ProtectedRoute roles={["student"]}><StudentPortala section={section}></StudentPortala></ProtectedRoute>
   
  )
}
