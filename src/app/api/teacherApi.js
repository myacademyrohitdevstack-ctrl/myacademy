import api from "./apiInstance";

export  function teacherDashboardApi(){
    return api.get(`/teacher/dashboard-stats`)
}
export  function teacherDashboardEnrollmentsApi(){
    return api.get(`/teacher/dashboard-enrollments`)
}
export  function teacherDashboardClassesApi(){
    return api.get(`/teacher/dashboard-classes`)
}
export  function teacherDashboardAnnoucementApi(){
    return api.get(`/teacher/dashboard-anouncements`)
}
export  function teacherCoursesApi(){
    return api.get(`/teacher/courses`)
}
