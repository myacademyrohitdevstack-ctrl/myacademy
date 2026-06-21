import { toast } from "sonner";

   const handleError =(error)=>{
  if(!error.response){
    toast.error("Network error. Please check your connection")
    return 
  }
  const status = error.response?.status;
   if(status>=500){
    // setIsServerDown(true) 
   }
   else if(status === 401){
   toast.error(error.response?.data?.message ||"Session expired. Please Login again")
   }
   else if(status >=400){
    toast.error(error.response?.data?.message || "Something went wrong")
  

   }
   else{
    toast.error("Unexpected error occurred")

   }
}
export default handleError