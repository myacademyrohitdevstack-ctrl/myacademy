"use client"
import { getLoggedUserApi } from "@/app/api/userApi"
import useAuthStore from "@/store/authStore"
import { useQuery } from "@tanstack/react-query"

const  useMe=()=>{
    const accessToken=useAuthStore((state)=>state.accessToken)
  
    const setProfile=useAuthStore((state)=>state.setProfile)
    return useQuery({
    queryKey:["Me"],
    queryFn:async()=>{
    const {data} =await getLoggedUserApi()
      setProfile(data.student)
      console.log(data.student)
      return data.student
    },
      retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled:!!accessToken,
    })
    
    
}
export default useMe;