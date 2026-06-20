import api from "./apiInstance";

export  function adminGetAllStudentsApi(){
    return api.get('/admin/users')
}