import {  adminGetBatchApi } from "@/app/api/adminApi"
import { announcementByBatchIdApi } from "@/app/api/AnnoucementsApi"
import { getStudentAllAnnocemntsApi, getStudentAllClassesApi } from "@/app/api/userApi"
import useAuthStore from "@/store/authStore"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export  const useStudentsAllClasses=()=>{
    const user=useAuthStore.getState().user
    return useQuery({
        queryKey:["classes",user._id],
        queryFn:async()=>{
            const response = await getStudentAllClassesApi()
        
            return response.data.classes
        },
        keepPreviousData:true,
        placeholderData:keepPreviousData,
        enabled:!!user
    })
}