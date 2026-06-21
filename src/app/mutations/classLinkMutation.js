import handleError from "@/Utils/handleError"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { toast } from "sonner"

import { addClassLinkApi } from "../api/classLinkApi"

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
               toast.success(data.message)
             resetForm();


    router.push("/admin-panel/batches");

  
        }
    })
}