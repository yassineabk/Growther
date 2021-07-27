import { Contest_Card_Types } from "./contest-card-types"
var data2 = [
    {
        "provider": "Instagram",
        "active": "Comment",
        "actions": {
            "Like": {
                "link": "https://www.instagram.com",
                "points": 1
            },
            "Follow": {
                "link": "https://www.instagram.com/id1",
                "points": 2
            },
            "Comment": {
                "link": "https://www.instagram.com/id2",
                "points": 5
            }
        },
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
    "maxParticipants": 0,
    "prizes": {
        "prize0": "PS5"
    }
}
export const SetData = (dispatch, information, actions) =>{
    information = typeof(information) === "object" ? information : data1
    actions = Array.isArray(actions) ? actions : data2
    dispatch({type: Contest_Card_Types.SET_CONTEST_STATE, payload: {information, actions}})
}
export const SelectAction = (dispatch, provider, index)=>{
    dispatch({type: Contest_Card_Types.SELECTED_ACTION, payload: {provider, index}})
}