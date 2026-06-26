import {  adminGetAllAnnoucements, adminGetCoursesApi } from "@/app/api/adminApi"
import { getAttendenceDashboard } from "@/app/api/AttendenceApi"
import useAuthStore from "@/store/authStore"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export  const useGetAttendenceDashboard=(id)=>{
    const user=useAuthStore.getState().user
    return useQuery({
        queryKey:["Attendence-dashboard",id],
        queryFn:async()=>{
            const response = await getAttendenceDashboard(id)
      
            return response.data
        },
        keepPreviousData:true,
        placeholderData:keepPreviousData,
        enabled:!!user
    })
}