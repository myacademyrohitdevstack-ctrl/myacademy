"use client"
import { userUpdateApi } from "../api/userApi"
import handleError from "@/Utils/handleError"
import { useMutation } from "@tanstack/react-query"
import useAuthStore from "@/store/authStore"
import { toast } from "sonner"

export const useProfileUpdateMutation=()=>{
    return useMutation({
        mutationFn:async(payload)=>{
            const response= await userUpdateApi(payload)
    return response.data
},
         retry:false,
       onSuccess: (data) => {
      toast.success(data.message);
      // Update Zustand
      useAuthStore.getState().setUser(data.data.user);
    
      useAuthStore.getState().setProfile(data.data.profile);

     
    },
     onError:(error)=>handleError(error) 

    })
}