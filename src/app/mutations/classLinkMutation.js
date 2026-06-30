import handleError from "@/Utils/handleError"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { toast } from "sonner"

import { addClassLinkApi, deleteClassLinksApi } from "../api/classLinkApi"
import queryClient from "@/lib/queryClient"

export const useAddClassLinkMutation=(resetForm)=>{
   
    const router=useRouter()
    return useMutation({
        mutationFn:async(data)=>{
         const response= await addClassLinkApi(data)
         return response.data
        },
         retry:false,
        onError:(error)=>handleError(error),
         onSuccess:(data)=>{
            queryClient.invalidateQueries({
                 queryKey:["Admin-class-links"],
            })
               toast.success(data.message)
             resetForm();


    router.push("/admin-panel/courses");

  
        }
    })
}
export const useDeleteClassLinkMutation=()=>{
   
  
    return useMutation({
        mutationFn:async(id)=>{
         const response= await deleteClassLinksApi(id)
         return response.data
        },
         retry:false,
        onError:(error)=>handleError(error),
         onSuccess:(data)=>{
            queryClient.invalidateQueries({
               queryKey:["Admin-class-links"],
            })
               toast.success(data.message)
   

  
        }
    })
}