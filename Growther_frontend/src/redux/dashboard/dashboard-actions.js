import axios from "axios"
import { DASHBOARD_TYPES } from "./dahsboard-types"
export const DashboardGetData = (dispatch)=>{
    axios.get("http://localhost:5000/api/contests/GetContests").then(response =>{
        dispatch({type: DASHBOARD_TYPES.DASHBOARD_GET_DATA, payload: response.data})
    }).catch(err =>{
        console.log(err)
        dispatch({type: DASHBOARD_TYPES.DASHBOARD_GET_DATA_FAIL})
    })
}