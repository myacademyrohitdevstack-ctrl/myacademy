import api from "./apiInstance";

export  function addClassLinkApi({id,data}){
    return api.post(`/class/${id}/add`,data)
}