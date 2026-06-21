import handleError from "@/Utils/handleError"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { createCourseApi } from "../api/coursesApi"
import { toast } from "sonner"

export const useCreateCourseMutation=(resetForm)=>{
   
    const router=useRouter()
    return useMutation({
        mutationFn:async(data)=>{
         const response= await createCourseApi(data)
         return response.data
        },
         retry:false,
        onError:(error)=>handleError(error),
         onSuccess:(data)=>{
               toast.success(data.message)
             resetForm();

  setTimeout(() => {
    router.push("/admin-panel/courses");
  }, 1500);
  
        }
    })
}