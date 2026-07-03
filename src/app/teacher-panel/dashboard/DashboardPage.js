"use client"
import Dashboard from '@/app/Components/Dashboard'
import { useTeacherdashboard, useTeacherdashboardAnnoucements, useTeacherdashboardClasses, useTeacherdashboardEnrollements } from '@/Hooks/teacher-hooks/useTeacherDashboard'
import React from 'react'

export default function DashboardPage() {
    const {data,isLoading:statsLoading}=useTeacherdashboard()
    const {data:recentStudents,isLoading:activitiesLoading}=useTeacherdashboardEnrollements()
    const {data:classes,isLoading:classesLoading}=useTeacherdashboardClasses()
    const {data:announcements,isLoading:annoucementsLoading}=useTeacherdashboardAnnoucements()
    const permission={
      canAddCourse:false,
      canAddBatch:false,
      canAddAnnouncement:true
    }
  return (
   <Dashboard 
   data={data} recentStudents={recentStudents} classes={classes} announcements={announcements} 
   statsLoading={statsLoading} activitiesLoading={activitiesLoading} classesLoading={classesLoading}
   annoucementsLoading={annoucementsLoading}
   permission={permission} role="teacher"
   ></Dashboard>
  )
}
