import {  adminGetBatchApi } from "@/app/api/adminApi"
import { announcementByBatchIdApi } from "@/app/api/AnnoucementsApi"
import { getStudentAllAnnocemntsApi, getStudentAllClassesApi, getStudentStaticsApi } from "@/app/api/userApi"
import useAuthStore from "@/store/authStore"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export  const useStudentStatics=()=>{
    const user=useAuthStore.getState().user
    return useQuery({
        queryKey:["statics",user._id],
        queryFn:async()=>{
            const response = await getStudentStaticsApi()
       
            return response.data.statics
        },
        keepPreviousData:true,
        placeholderData:keepPreviousData,
        enabled:!!user
    })
}