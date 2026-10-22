import {  adminGetBatchApi } from "@/app/api/adminApi"
import useAuthStore from "@/store/authStore"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export  const useAdminGetAllBatches=(slug)=>{
    const user=useAuthStore.getState().user
    return useQuery({
        queryKey:["Admin-batches",slug],
        queryFn:async()=>{
            const response = await adminGetBatchApi(slug)
        
            return response.data.batches
        },
        keepPreviousData:true,
        placeholderData:keepPreviousData,
        enabled:!!user
    })
}

import api from "@/app/api/apiInstance";

export const useGetAllAcademyBatches = () => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["all-academy-batches"],
    queryFn: async () => {
      const response = await api.get("/batches");
      return response.data.batches || [];
    },
    enabled: !!user,
  });
};
