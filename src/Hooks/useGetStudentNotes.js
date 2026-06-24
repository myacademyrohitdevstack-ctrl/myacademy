
import {  adminGetUserById } from "@/app/api/adminApi"
import { getStudentNotesApi, studentBatchesApi } from "@/app/api/userApi"
import useAuthStore from "@/store/authStore"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export  const useGetStudentNotes=(batchId,tab)=>{
    const user=useAuthStore.getState().user
    return useQuery({
        queryKey:["notes",user.id,batchId],
        queryFn:async()=>{
            const response = await getStudentNotesApi(batchId)
            return response.data.notes
        },
        keepPreviousData:true,
        placeholderData:keepPreviousData,
        enabled:!!user && tab ==="notes"
    })
}