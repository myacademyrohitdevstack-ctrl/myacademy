import handleError from "@/Utils/handleError"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { toast } from "sonner"
import { createBatchApi } from "../api/BatchApi"

export const useCreateBatchMutation=(resetForm)=>{
   
    const router=useRouter()
    return useMutation({
        mutationFn:async(data)=>{
         const response= await createBatchApi(data)
         return response.data
        },
         retry:false,
        onError:(error)=>handleError(error),
         onSuccess:(data)=>{
               toast.success(data.message)
             resetForm();

  setTimeout(() => {
    router.push("/admin-panel/batches");
  }, 1500);
  
        }
    })
}