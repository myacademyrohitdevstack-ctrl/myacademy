import {  adminGetAllStudentsApi } from "@/app/api/adminApi"
import useAuthStore from "@/store/authStore"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export  const useAdminStudent=(page)=>{
    const user=useAuthStore.getState().user
    return useQuery({
        queryKey:["Admin-Student-List",page],
        queryFn:async()=>{
            const response = await adminGetAllStudentsApi(page)
            return response.data.users
        },
        keepPreviousData:true,
        placeholderData:keepPreviousData,
        enabled:!!user
    })
}