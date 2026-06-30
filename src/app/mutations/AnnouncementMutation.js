import handleError from "@/Utils/handleError"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { toast } from "sonner"
import { createBatchApi, updatedBatchApi } from "../api/BatchApi"
import queryClient from "@/lib/queryClient"
import { adminCreateAnnouncementApi, adminDeleteAnnouncementApi } from "../api/adminApi"
import { updateAttendanceApi } from "../api/AttendenceApi"

export const useCreateAnnouncementtMutation=()=>{
   
    const router=useRouter()
    return useMutation({
        mutationFn:async(data)=>{
         const response= await adminCreateAnnouncementApi(data)
         return response.data
        },
         retry:false,
        onError:(error)=>handleError(error),
         onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey:["Announcements"]
            })
               toast.success(data.message)
          


    router.push("/admin-panel/courses");
 
  
        }
    })
}
export const useDeleteAnnouncementtMutation=()=>{
   
    const router=useRouter()
    return useMutation({
        mutationFn:async(id)=>{
         const response= await adminDeleteAnnouncementApi(id)
         return response.data
        },
         retry:false,
        onError:(error)=>handleError(error),
         onSuccess:(data)=>{
            queryClient.invalidateQueries({
                 queryKey:["Announcements"],
            })
               toast.success(data.message)
          

 
    router.push("/admin-panel/courses");

  
        }
    })
}

