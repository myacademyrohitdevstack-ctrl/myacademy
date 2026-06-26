import {  adminGetAllAnnoucements, adminGetCoursesApi } from "@/app/api/adminApi"
import { getAttendenceDashboard, getStudentAttendenceDashboard } from "@/app/api/AttendenceApi"
import useAuthStore from "@/store/authStore"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export  const useGetStudentAttendenceDashboard=()=>{
    const user=useAuthStore.getState().user
    return useQuery({
        queryKey:["Attendence-dashboard-student",user._id],
        queryFn:async()=>{
            const response = await getStudentAttendenceDashboard()
      
            return response.data
        },
        keepPreviousData:true,
        placeholderData:keepPreviousData,
        enabled:!!user
    })
}