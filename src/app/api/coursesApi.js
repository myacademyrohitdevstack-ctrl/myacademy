import api from "./apiInstance";

export  function createCourseApi(data){
    return api.post('/courses/createCourse',data)
}