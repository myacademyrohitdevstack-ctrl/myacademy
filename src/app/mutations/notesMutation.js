import handleError from "@/Utils/handleError"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { toast } from "sonner"
import { addNoteApi, deleteNoteApi } from "../api/notesApi"
import queryClient from "@/lib/queryClient"

export const useCreateNotesMutation=(resetForm)=>{
   
    const router=useRouter()
    return useMutation({
        mutationFn:async(data)=>{
         const response= await addNoteApi(data)
         return response.data
        },
         retry:false,
        onError:(error)=>handleError(error),
         onSuccess:(data)=>{
            queryClient.invalidateQueries({
                    queryKey:["Admin-notes"],
            })
               toast.success(data.message)
             resetForm();


    router.push("/admin-panel/courses");
  
  
        }
    })
}
export const usedeleteNotesMutation=()=>{
   
   
    return useMutation({
        mutationFn:async(id)=>{
         const response= await deleteNoteApi(id)
         return response.data
        },
         retry:false,
        onError:(error)=>handleError(error),
         onSuccess:(data)=>{
            queryClient.invalidateQueries({
            queryKey:["Admin-notes"]
            })
               toast.success(data.message)
  
        }
    })
}