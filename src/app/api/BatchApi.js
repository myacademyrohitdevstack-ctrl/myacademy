import api from "./apiInstance";

export  function createBatchApi({id,data}){
    return api.post(`/batches/${id}/batches`,data)
}