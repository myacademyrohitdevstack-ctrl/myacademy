import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { loginApi,logoutApi,sendOtp,signUpApi, verifyOtp } from '../api/AuthApi';
import { useRouter } from 'next/navigation';
import handleError from '@/Utils/handleError';
import useAuthStore from '@/store/authStore';
import queryClient from '@/lib/queryClient';
export const useLoginMutation=()=>{
    const login=useAuthStore((state)=>state.login)
    const router=useRouter()
    return useMutation({
        mutationFn:async (data)=>{
           const response=await loginApi(data);
           return response.data
        },
        retry:false,
       onError:(error)=>handleError(error),
        onSuccess:(data)=>{
     

  login({user:data.user,accessToken:data.accessToken})
     toast.success("You Logged in Successlly ")
     if(data.user.role==="student"){
    router.push('/student-profile/profile')
     }
     if(data.user.role==="admin"){
    router.push('/admin-panel/student')
     }

        }
    })
}
export const useSendOtpMutation=(setOtpSent,setTimer)=>{
    
    // const navigate=useNavigate()
    return useMutation({
        mutationFn:async (data)=>{
           const response=await sendOtp(data);
           return response.data
        },
        retry:false,
         onError:(error)=>handleError(error),
        onSuccess:(data)=>{
        // localStorage.setItem("accessToken",data.accessToken)
//   queryClient.invalidateQueries({
//   queryKey: ["Me"]
// })
setTimer(data.resendAfter)
     toast.success("Otp sent Successlly ")
      setOtpSent(true)
    //  navigate('/home')
        }
    })
}
export const useVerifyOtpMutation=(setOtpSent,setEmailVerified,setVerificationToken)=>{
    
    // const navigate=useNavigate()
    return useMutation({
        mutationFn:async (data)=>{
           const response=await verifyOtp(data);
           return response.data
        },
        retry:false,
         onError:(error)=>handleError(error),
        onSuccess:(data)=>{
        // localStorage.setItem("accessToken",data.accessToken)
//   queryClient.invalidateQueries({
//   queryKey: ["Me"]
// })

   setVerificationToken(data.verificationToken)
     toast.success("Otp verified  Successlly ")
     setOtpSent(false)
     setEmailVerified(true)
    //  navigate('/home')
        }
    })
}

export const useSignUpMutation=(resetForm)=>{
   
    const router=useRouter()
    return useMutation({
        mutationFn:async(data)=>{
         return await signUpApi(data)
        },
         retry:false,
        onError:(error)=>handleError(error),
         onSuccess:()=>{
               toast.success("Your Account created successfully ")
             resetForm();

  setTimeout(() => {
    router.push("/signup/pending");
  }, 1500);
  
        }
    })
}
export const useLogoutMutation=()=>{

  const router=useRouter()
    return useMutation({
        mutationFn:async ()=>{
           const response=await logoutApi();
           return response.data
        },
        retry:false,
        onError:(error)=>handleError(error),
        onSuccess:()=>{
            router.replace('/')
            toast.info("You have been loggout out successfully")
  queryClient.removeQueries({
  queryKey: ["Me"]
})
 useAuthStore.getState().logout();

        }
    })
}
// export const useForgetPasswordMutation=(handleError)=>{
//     const navigate=useNavigate()
//     return useMutation({
//         mutationFn:async(data)=>{
//          return await forgetPasswordApi(data)
//         },
//          retry:false,
//         onError:(error)=>handleError(error),
//          onSuccess:()=>{
//      toast.success("Your Password Changed successfully ")
//      navigate('/login')
//         }
//     })
// }
// export const useChangePasswordMutation=(handleError)=>{
//     return useMutation({
//         mutationFn:async(data)=>{
//          return await changePasswordApi(data)
//         },
//          retry:false,
//         onError:(error)=>handleError(error),
//          onSuccess:()=>{
//      toast.success("Your Password Changed successfully ")
//         }
//     })
// }
// export const useProfileUpdateMutation=(handleError)=>{
//     const queryClient = useQueryClient()
//     return useMutation({
//         mutationFn:async(data)=>{
//             const response= await userUpdateApi(data)
//     return response.data
// },
//          retry:false,
//          onSuccess:(data)=>{
//      toast.success(data.message)
//         },
//         onSettled:()=>{
// queryClient.invalidateQueries({
//    queryKey:["Me"]
//    })
//         },
//      onError:(error)=>handleError(error)

//     })
// }

// export const useProfileImageMutation=(userupdate,handleError)=>{
//     const queryClient = useQueryClient()
//     return useMutation({
//         mutationFn:(data)=>userupdate(data),
//          retry:false,
//          onSuccess:(data)=>{
//      toast.success(data.message)
//         },
//         onSettled:()=>{
// queryClient.invalidateQueries({
//    queryKey:["Me"]
//    })
//         },
//      onError:(error,)=> handleError(error)
    

//     })
// }