import React from 'react'
import StudentPortala from './StudentClient'
import ProtectedRoute from '@/lib/ProtectedRoutes'

export default async function page({params}) {
  const {section}=await params
  return (
    <ProtectedRoute><StudentPortala section={section}></StudentPortala></ProtectedRoute>
   
  )
}
