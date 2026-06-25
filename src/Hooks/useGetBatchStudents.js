import {  adminGetAllAnnoucements, adminGetCoursesApi } from "@/app/api/adminApi"
import { batchStudentsApi } from "@/app/api/BatchApi"
import useAuthStore from "@/store/authStore"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export  const useGetBatchStudents=(batchId)=>{
    const user=useAuthStore.getState().user
    return useQuery({
        queryKey:["Batch-students",batchId],
        queryFn:async()=>{
            const response = await batchStudentsApi(batchId)
      
            return response.data.students
        },
        keepPreviousData:true,
        placeholderData:keepPreviousData,
        enabled:!!user
    })
}