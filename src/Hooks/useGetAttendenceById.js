
import { getAttendenceById, getAttendenceDashboard } from "@/app/api/AttendenceApi"
import useAuthStore from "@/store/authStore"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export  const useGetAttendanceById=(id)=>{
    const user=useAuthStore.getState().user
    return useQuery({
        queryKey:["Attendence",id],
        queryFn:async()=>{
            const response = await getAttendenceById(id)
      
            return response.data
        },
        keepPreviousData:true,
        placeholderData:keepPreviousData,
        enabled:!!user
    })
}