import api from "./apiInstance";

export  function getLoggedUserApi(){
    return api.get('/student/me')
}
export  function userUpdateApi(data){
    return api.patch('/student/update',data)
}


export const updateProfileImageApi = (file) => {
  const formData=new FormData()
  formData.append("image",file)
  return api.patch(
    "/user/profileImage/update",
    formData
   
  );
};