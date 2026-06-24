
import {  adminGetUserById } from "@/app/api/adminApi"
import { getStudentClassLinksApi, studentBatchesApi } from "@/app/api/userApi"
import useAuthStore from "@/store/authStore"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export  const useGetStudentClassLInks=(batchId,tab)=>{
    const user=useAuthStore.getState().user
    return useQuery({
        queryKey:["class-links",user.id,batchId],
        queryFn:async()=>{
            const response = await getStudentClassLinksApi(batchId)
            return response.data.classLinks
        },
        keepPreviousData:true,
        placeholderData:keepPreviousData,
        enabled:!!user && tab==="links"
    })
}