"use client"

import Courses from '@/app/Components/Courses'
import { useAdminGetAllCourses } from '@/Hooks/useAdminGetCourses'
import { useAdminGetStats } from '@/Hooks/useAdminGetStats'
import React from 'react'

export default function CoursesPage() {
      const {data:courses,isLoading:courseLoading}=useAdminGetAllCourses()
  const {data:stats,isLoading:statsLoading}=useAdminGetStats()
  const permission={
    canEdit:true,
    canDelete:true
  }
  return (
  <Courses permission={permission} courses={courses} courseLoading={courseLoading} stats={stats} statsLoading={statsLoading} role="admin"></Courses>
  ) 
}
