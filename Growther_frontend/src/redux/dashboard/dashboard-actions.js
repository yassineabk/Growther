import axios from "axios"
import { DASHBOARD_TYPES } from "./dahsboard-types"
const test = [
    {
        "title": "yassine",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "winnersNbr": 1,
        "startDate": "2021-07-25",
        "endDate": "2021-08-24",
        "duration": {
            "value": 1,
            "type": "months"
        },
        "maxParticipants": 0,
        "prizes": {
            "prize0": ""
        }
    },
    {
        "title": "yassine",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "winnersNbr": 1,
        "startDate": "2021-07-25",
        "endDate": "2021-08-24",
        "duration": {
            "value": 1,
            "type": "months"
        },
        "maxParticipants": 0,
        "prizes": {
            "prize0": ""
        }
    },
    {
        "title": "yassine",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "winnersNbr": 1,
        "startDate": "2021-07-25",
        "endDate": "2021-08-24",
        "duration": {
            "value": 1,
            "type": "months"
        },
        "maxParticipants": 0,
        "prizes": {
            "prize0": ""
        }
    },
    {
        "title": "yassine",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "winnersNbr": 1,
        "startDate": "2021-07-25",
        "endDate": "2021-08-24",
        "duration": {
            "value": 1,
            "type": "months"
        },
        "maxParticipants": 0,
        "prizes": {
            "prize0": ""
        }
    }
]
export const DashboardGetData = (dispatch)=>{
    axios.get("http://localhost:5000/api/contests/GetContests").then(response =>{
        dispatch({type: DASHBOARD_TYPES.DASHBOARD_GET_DATA, payload: response.data})
    }).catch(err =>{
        dispatch({type: DASHBOARD_TYPES.DASHBOARD_GET_DATA_FAIL})
    })
}