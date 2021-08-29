import axios from "axios"
import { FailAlert, SuccessAlert } from "../redux/alert/alert-actions"
import { BACKEND_API } from "./links"
export const SendEmail = async (dispatch, email, subject, message)=>{
    const token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
    }
    axios.post(`${BACKEND_API}/contactus/send`, {email, subject, text: message}, config)
        .then(response =>{
            console.log(response.data)
            return true
        }).catch(err =>{
            console.log(err)
            return false
        }).then(value =>{
            if(value){
                SuccessAlert(dispatch, "Sent Successfully")
            }else{
                FailAlert(dispatch, "Sent Failure")
            }
            return value
        })
}