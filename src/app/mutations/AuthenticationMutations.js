import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import queryClient from '@/lib/queryClient';
import { loginApi,sendOtp,signUpApi, verifyOtp } from '../api/AuthApi';
export const useLoginMutation=()=>{
    
    // const navigate=useNavigate()
    return useMutation({
        mutationFn:async (data)=>{
           const response=await loginApi(data);
           return response.data
        },
        retry:false,
        onError:(error)=>{
             toast.error(error.response.data.message)
        },
        onSuccess:(data)=>{
     
//   queryClient.invalidateQueries({
//   queryKey: ["Me"]
// })
     toast.success("You Logged in Successlly ")
    //  navigate('/home')
        }
    })
}
export const useSendOtpMutation=(setOtpSent)=>{
    
    // const navigate=useNavigate()
    return useMutation({
        mutationFn:async (data)=>{
           const response=await sendOtp(data);
           return response.data
        },
        retry:false,
        onError:(error)=>{
             toast.error(error.response.data.message)
        },
        onSuccess:(data)=>{
        // localStorage.setItem("accessToken",data.accessToken)
//   queryClient.invalidateQueries({
//   queryKey: ["Me"]
// })
     toast.success("Otp sent Successlly ")
      setOtpSent(true)
    //  navigate('/home')
        }
    })
}
export const useVerifyOtpMutation=(setOtpSent,setEmailVerified)=>{
    
    // const navigate=useNavigate()
    return useMutation({
        mutationFn:async (data)=>{
           const response=await verifyOtp(data);
           return response.data
        },
        retry:false,
        onError:(error)=>{
             toast.error(error.response.data.message)
        },
        onSuccess:(data)=>{
        // localStorage.setItem("accessToken",data.accessToken)
//   queryClient.invalidateQueries({
//   queryKey: ["Me"]
// })

   localStorage.setItem("verificationToken",data.verificationToken)
     toast.success("Otp verified  Successlly ")
     setOtpSent(false)
     setEmailVerified(true)
    //  navigate('/home')
        }
    })
}

export const useSignUpMutation=()=>{
    // const navigate=useNavigate()
    return useMutation({
        mutationFn:async(data)=>{
         return await signUpApi(data)
        },
         retry:false,
        // onError:(error)=>handleError(error),
         onSuccess:()=>{
     toast.success("Your Account created successfully ")
    //  navigate('/login')
        }
    })
}
// export const useLogoutMutation=(handleError)=>{
//     const queryClient=useQueryClient()
//     const navigate=useNavigate()
//     return useMutation({
//         mutationFn:async (data)=>{
//            const response=await logoutApi();
//            return response.data
//         },
//         retry:false,
//         onError:(error)=>handleError(error),
//         onSuccess:(data)=>{
//             toast.info("You have been loggout out successfully")
//             navigate('/home')
//   queryClient.removeQueries({
//   queryKey: ["Me"]
// })

// queryClient.removeQueries({
//   queryKey: ["user-likedRecipes"]
// })
// queryClient.removeQueries({
//   queryKey: ["user-recipes"]
// })
//   localStorage.removeItem("accessToken")

//         }
//     })
// }
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