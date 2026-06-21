import {  adminGetAllStudentsApi } from "@/app/api/adminApi"
import useAuthStore from "@/store/authStore"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export  const useAdminStudent=(page,search,status,approvalStatus,role)=>{
    const user=useAuthStore.getState().user
    return useQuery({
        queryKey:["Admin-Student-List",page,search,status,approvalStatus,role],
        queryFn:async()=>{
            const response = await adminGetAllStudentsApi(page,search,status,approvalStatus,role)
            return response.data
        },
        keepPreviousData:true,
        placeholderData:keepPreviousData,
        enabled:!!user
    })
}