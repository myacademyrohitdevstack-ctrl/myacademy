"use client"

import Courses from '@/app/Components/Courses'
import { useTeacherCourses } from '@/Hooks/teacher-hooks/useTeacherCourses'
import { useTeacherdashboard } from '@/Hooks/teacher-hooks/useTeacherDashboard'
import React from 'react'

export default function CoursesPage() {
      const {data:courses,isLoading:courseLoading}=useTeacherCourses()
  const {data:stats,isLoading:statsLoading}=useTeacherdashboard()
  const permission={
    canEdit:false,
    canDelete:false
  }
  return (
  <Courses permission={permission} courses={courses} courseLoading={courseLoading} stats={stats} statsLoading={statsLoading} role="teacher"></Courses>
  ) 
}
