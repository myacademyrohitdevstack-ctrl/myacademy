import api from "./apiInstance"

export  function loginApi(data){
    return api.post('/auth/login',data)
}
export  function signUpApi(data){
    return api.post('/auth/createUser',data)
}
export  function sendOtp(data){
    return api.post('/auth/send-otp',data)
}
export  function verifyOtp(data){
    return api.post('/auth/verify-otp',data)
}
export  function logoutApi(){
    return api.post('/auth/logout')
}

