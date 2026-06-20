import useAuthStore from "@/store/authStore"
import handleError from "@/Utils/handleError"
import { updateProfileImageApi } from "../api/userApi"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useProfileImageMutation=()=>{
    return useMutation({
        mutationFn:async(data)=>{
          const response=await  updateProfileImageApi(data)
          return response.data
        },
         retry:false,
         onSuccess:(data)=>{
            useAuthStore.getState().setUser(data.user)
     toast.success(data.message)
        },
     onError:(error)=> handleError(error)
    

    })
}