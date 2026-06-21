
import {  adminGetUserById } from "@/app/api/adminApi"
import useAuthStore from "@/store/authStore"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export  const useAdminUserById=(id)=>{
    const user=useAuthStore.getState().user
    return useQuery({
        queryKey:["Admin-User",id],
        queryFn:async()=>{
            const response = await adminGetUserById(id)
            return response.data.user
        },
        keepPreviousData:true,
        placeholderData:keepPreviousData,
        enabled:!!user
    })
}