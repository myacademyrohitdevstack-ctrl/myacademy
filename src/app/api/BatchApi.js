import api from "./apiInstance";

export  function createBatchApi({id,data}){
    return api.post(`/batches/${id}/batches`,data)
}
export  function getBatchById(id){
    return api.get(`/batches/${id}/byId`)
}
export  function updatedBatchApi({id,data}){
    return api.patch(`/batches/${id}/update`,data)
}
export  function batchStudentsApi(id,){
    return api.get(`/batches/${id}/students`)
}