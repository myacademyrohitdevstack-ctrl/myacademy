import api from "./apiInstance";

export  function getLoggedUserApi(){
    return api.get('/student/me')
}
export  function userUpdateApi(data){
    return api.patch('/student/update',data)
}
export  function studentBatchesApi(id){
    return api.get(`/student/${id}/batches`)
}
export  function getStudentNotesApi(id){
    return api.get(`/student/${id}/notes`)
}
export  function getStudentClassLinksApi(id){
    return api.get(`/student/${id}/class-links`)
}
export  function getStudentBatchByIdApi(id){
    return api.get(`/student/${id}/batch`)
}
export  function getStudentAllAnnocemntsApi(){
    return api.get(`/student/announcements`)
}
export  function getStudentAllClassesApi(){
    return api.get(`/student/classes`)
}
export  function getStudentStaticsApi(){
    return api.get(`/student/statics`)
}


export const updateProfileImageApi = (file) => {
  const formData=new FormData()
  formData.append("image",file)
  return api.patch(
    "/user/profileImage/update",
    formData
   
  );
};