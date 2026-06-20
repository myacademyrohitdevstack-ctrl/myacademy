import api from "./apiInstance";

export  function getLoggedUserApi(){
    return api.get('/student/me')
}
export  function userUpdateApi(data){
    return api.patch('/student/update',data)
}