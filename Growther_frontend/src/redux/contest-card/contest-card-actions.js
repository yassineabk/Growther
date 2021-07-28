import axios from "axios"
import { Contest_Card_Types } from "./contest-card-types"
var data2 = [
    {
        "provider": "Instagram",
        "type": "Like",
        "url": "https://www.instagram.com",
        "points": 5,
        "listOfActions": [
            "Like",
            "Follow",
            "Comment"
        ]
    },
    {
        "provider": "Facebook",
        "type": "Comment",
        "url": "https://www.facebook.com",
        "points": 1,
        "listOfActions": [
            "Like",
            "Follow",
            "Comment"
        ]
    }
]
var data1 = {
    "title": "Contest Title",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure do",
    "winnersNbr": 1,
    "startDate": "2021-07-27",
    "endDate": "2021-08-17",
    "duration": {
        "value": 3,
        "type": "weeks"
    },
    "maxReach": 0,
    "prizes": [
        {id: 1, description: "PS5"}
    ]
}
export const SetData = (dispatch, id) =>{
    axios.get(`/api/contests/${id}`).then(response =>{
        dispatch({type: Contest_Card_Types.SET_CONTEST_STATE, payload: response})
    }).catch(err =>{
        dispatch({type: Contest_Card_Types.SET_CONTEST_STATE, payload: {information: data1, actions: data2}})
        dispatch({type: Contest_Card_Types.CONTEST_CARD_ERROR})
    })
}
export const SelectAction = (dispatch, provider, index)=>{
    dispatch({type: Contest_Card_Types.SELECTED_ACTION, payload: {provider, index}})
}