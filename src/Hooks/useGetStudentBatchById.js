
import {  adminGetUserById } from "@/app/api/adminApi"
import { getStudentBatchByIdApi, studentBatchesApi } from "@/app/api/userApi"
import useAuthStore from "@/store/authStore"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export  const useGetStudentBatchById=(batchId)=>{
    const user=useAuthStore.getState().user
    return useQuery({
        queryKey:["batch",user.id,batchId],
        queryFn:async()=>{
            const response = await getStudentBatchByIdApi(batchId)
            return response.data.batch
        },
        keepPreviousData:true,
        placeholderData:keepPreviousData,
        enabled:!!user
    })
}