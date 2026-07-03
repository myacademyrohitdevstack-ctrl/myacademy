"use client"
import { useAdminGetAllAnnoucements } from '@/Hooks/useAdminGetAllAnnouncements'
import { useAdminGetAllClasses } from '@/Hooks/useAdminGetAllClasses'
import { useAdminGetRecentActivities } from '@/Hooks/useAdminGetRecentEnrollments'
import { useAdminGetStats } from '@/Hooks/useAdminGetStats'
import Dashboard from '@/app/Components/Dashboard'
import React from 'react'

export default function DashboardPage() {
      const {data,isLoading:statsLoading}=useAdminGetStats()
  const {data:recentStudents,isLoading:activitiesLoading}=useAdminGetRecentActivities()
  const {data:classes,isLoading:classesLoading}=useAdminGetAllClasses()
  const {data:announcements,isLoading:annoucementsLoading}=useAdminGetAllAnnoucements()
   const permission={
      canAddCourse:true,
      canAddBatch:true,
      canAddAnnouncement:true
    }
  return (
   <Dashboard
   data={data} recentStudents={recentStudents} classes={classes} announcements={announcements} 
   statsLoading={statsLoading} activitiesLoading={activitiesLoading} classesLoading={classesLoading}
   annoucementsLoading={annoucementsLoading}
   permission={permission} role="admin"
   ></Dashboard>
  )
}
