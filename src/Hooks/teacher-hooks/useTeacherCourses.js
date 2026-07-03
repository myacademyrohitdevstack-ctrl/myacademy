"use client"

import { teacherCoursesApi } from "@/app/api/teacherApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";


export  const useTeacherCourses=()=>{
  const user = useAuthStore((state) => state.user);
    return useQuery({
        queryKey:["teacher-courses",user.id],
        queryFn:async()=>{
            const response = await teacherCoursesApi()
      
            return response.data.courses
        },
        keepPreviousData:true,
        placeholderData:keepPreviousData,
        enabled:!!user
    })
}