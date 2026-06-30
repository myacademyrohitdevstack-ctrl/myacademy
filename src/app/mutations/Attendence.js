import handleError from "@/Utils/handleError"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { toast } from "sonner"
import { createBatchApi, updatedBatchApi } from "../api/BatchApi"
import queryClient from "@/lib/queryClient"
import { adminCreateAnnouncementApi, adminDeleteAnnouncementApi } from "../api/adminApi"
import { deleteAttendanceApi, postattendanceapi, updateAttendanceApi } from "../api/AttendenceApi"

export const useMarkAttendence=()=>{
   
    const router=useRouter()
    return useMutation({
        mutationFn:async(data)=>{
         const response= await postattendanceapi(data)
         return response.data
        },
         retry:false,
        onError:(error)=>handleError(error),
         onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey:["Attendence-dashboard"]
            })
               toast.success(data.message)
          

  setTimeout(() => {
    router.push("/admin-panel/courses");
  }, 1500);
  
        }
    })
}
export const useUpdateAttendance=(id)=>{
   
   
    return useMutation({
        mutationFn:async(data)=>{
         const response= await updateAttendanceApi(id,data)
         return response.data
        },
         retry:false,
        onError:(error)=>handleError(error),
         onSuccess:(data)=>{
            queryClient.invalidateQueries({
                 queryKey:["Attendence"],
            })
             queryClient.invalidateQueries({
                queryKey:["Attendence-dashboard"]
            })
               toast.success(data.message)
          

 
    router.push("/admin-panel/courses");

  
        }
    })
}
export const useDeleteAttendance=()=>{
   
   
    return useMutation({
        mutationFn:async(id)=>{
         const response= await deleteAttendanceApi(id)
         return response.data
        },
         retry:false,
        onError:(error)=>handleError(error),
         onSuccess:(data)=>{
         
             queryClient.invalidateQueries({
                queryKey:["Attendence-dashboard"]
            })
               toast.success(data.message)
          

 
    router.push("/admin-panel/courses");

  
        }
    })
}
