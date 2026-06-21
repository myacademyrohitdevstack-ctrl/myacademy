import api from "./apiInstance";

export  function adminGetAllStudentsApi(page,search,status,approvalStatus,role){
    return api.get(`/admin/users?search=${search}&page=${page}&status=${status}&approvalStatus=${approvalStatus}&role=${role}`)
}
export  function adminGetUserById(id){
    return api.get(`/admin/user/${id}`)
}
export  function adminApproveUserApi(id){
    return api.patch(`/admin/user/${id}/approve`)
}
export  function adminRejectUserApi(id){
    return api.patch(`/admin/user/${id}/reject`)
}
export  function adminBlockUserApi(id,data){
    return api.patch(`/admin/user/${id}/block`,data)
}
export  function adminUnblockUserApi(id){
    return api.patch(`/admin/user/${id}/unblock`)
}
export  function adminUpdateUserById(id,data){
    return api.patch(`/admin/user/${id}/update`,data)
}

//course 

export  function adminGetCoursesApi(){
    return api.get(`/courses/`)
}