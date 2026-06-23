import api from "./apiInstance";

export  function announcementByBatchIdApi(id){
    return api.get(`/announcements/${id}/announcements`)
}

