import api from "./apiInstance";

export  function postattendanceapi(data){
    return api.post(`/attendence/mark`,data)
}
export  function getAttendenceDashboard(id){
    return api.get(`/attendence/${id}/dashboard`)
}
export  function getAttendenceById(id){
    return api.get(`/attendence/${id}/ById`)
}
export  function updateAttendanceApi(id,data){
    return api.put(`/attendence/${id}`,data)
}
export  function deleteAttendanceApi(id){
    return api.delete(`/attendence/${id}`)
}
export  function getStudentAttendenceDashboard(){
    return api.get(`/student/dashboard`)
}


