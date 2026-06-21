import {  adminGetCoursesApi } from "@/app/api/adminApi"
import useAuthStore from "@/store/authStore"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export  const useAdminGetAllCourses=()=>{
    const user=useAuthStore.getState().user
    return useQuery({
        queryKey:["Admin-courses"],
        queryFn:async()=>{
            const response = await adminGetCoursesApi()
            return response.data.courses
        },
        keepPreviousData:true,
        placeholderData:keepPreviousData,
        enabled:!!user
    })
}