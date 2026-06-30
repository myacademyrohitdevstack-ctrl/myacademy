
import handleError from "@/Utils/handleError"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { adminApproveUserApi, adminBlockUserApi, adminCreateStudent, adminDeleteAnnouncementApi, adminDeleteUserByIdApi, adminGetUserById, adminRejectUserApi, adminUnblockUserApi, adminUpdateUserById } from "../api/adminApi"
import queryClient from "@/lib/queryClient"
import { useRouter } from "next/navigation"

export const useAdminUserUpdateMutation=(id)=>{
    return useMutation({
        mutationFn:async(data)=>{
          const response=await  adminUpdateUserById(id,data)
          return response.data
        },
         retry:false,
         onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey:["Admin-User",id]
            })
            queryClient.invalidateQueries({
  queryKey: ["Admin-Student-List"],
});
     toast.success(data.message)
        },
     onError:(error)=> handleError(error)
    

    })
}
export const useAdminApproveUser=(id)=>{
    return useMutation({
        mutationFn:async()=>{
          const response=await  adminApproveUserApi(id)
          return response.data
        },
         retry:false,
         onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey:["Admin-User",id]
            })
            queryClient.invalidateQueries({
  queryKey: ["Admin-Student-List"],
});
     toast.success(data.message)
        },
     onError:(error)=> handleError(error)
    

    })
}
export const useAdminRejectUser=(id)=>{
    return useMutation({
        mutationFn:async()=>{
          const response=await  adminRejectUserApi(id)
          return response.data
        },
         retry:false,
         onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey:["Admin-User",id]
            })
            queryClient.invalidateQueries({
  queryKey: ["Admin-Student-List"],
});
     toast.success(data.message)
        },
     onError:(error)=> handleError(error)
    

    })
}
export const useAdminBlockUser=(id,setOpen)=>{
    return useMutation({
        mutationFn:async(data)=>{
          const response=await  adminBlockUserApi(id,data)
          return response.data
        },
         retry:false,
         onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey:["Admin-User",id]
            })
            queryClient.invalidateQueries({
  queryKey: ["Admin-Student-List"],
});
     toast.success(data.message)
        },
        onSettled:()=>setOpen(false),
     onError:(error)=> handleError(error)
    

    })
}
export const useAdminUnblockUser=(id)=>{
    return useMutation({
        mutationFn:async()=>{
          const response=await  adminUnblockUserApi(id)
          return response.data
        },
         retry:false,
         onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey:["Admin-User",id]
            })
            queryClient.invalidateQueries({
  queryKey: ["Admin-Student-List"],
});
     toast.success(data.message)
        },
     onError:(error)=> handleError(error)
    

    })
}
export const useAdminCreateStuent=()=>{
    const router=useRouter()
    return useMutation({
        mutationFn:async(data)=>{
          const response=await  adminCreateStudent(data)
          return response.data
        },
         retry:false,
         onSuccess:(data)=>{
           
            queryClient.invalidateQueries({
  queryKey: ["Admin-Student-List"],
});
     toast.success(data.message)
     router.push('/admin-panel/student')

        },
     onError:(error)=> handleError(error)
    

    })
}
export const useAdminDeleteUser=()=>{
    
    return useMutation({
        mutationFn:async(id)=>{
          const response=await  adminDeleteUserByIdApi(id)
          return response.data
        },
         retry:false,
         onSuccess:(data)=>{
           
            queryClient.invalidateQueries({
  queryKey: ["Admin-Student-List"],
});
     toast.success(data.message)


        },
    

    })
}