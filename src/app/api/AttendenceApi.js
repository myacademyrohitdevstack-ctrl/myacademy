import api from "./apiInstance";

export  function postattendanceapi(data){
    return api.post(`/attendence/mark`,data)
}
export  function getAttendenceDashboard(id){
    return api.get(`/attendence/${id}/dashboard`)
}
export  function getStudentAttendenceDashboard(){
    return api.get(`/student/dashboard`)
}


