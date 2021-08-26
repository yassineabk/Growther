import axios from "axios"
import { BACKEND_API } from "./links"

export const MakeResultState = async (id)=>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        } 
    }
    var tableHead = [
        {label: "Email", key: "email"},
        {label: "Date", key: "date"},
        {label: "Points", key: "points"},
        {label: "Number of actions", key: "numActions"},
        {label: "Winning status", key: "status"}
    ]
    return axios.get(`${BACKEND_API}/api/participations/all/${id}`, config)
        .then(response =>{
            var data = response.data
            var result = []
            if(Array.isArray(data)){
                try{data.map(item =>{
                    var res = {
                        text: [],
                        emails: [],
                        usernames: [],
                        links: []
                    }
                    if(typeof(item) === "object" && item !== null){
                        var { contest, participationActions, done, user, partipationDate } = item
                        var { actionsNbr } = contest
                        var actionsDone = 0
                        var totalPoints = 0
                        if(Array.isArray(participationActions)){
                            actionsDone = participationActions.length
                            participationActions.map(item =>{
                                if(typeof(item) === "object" && item !== null){
                                    totalPoints += item.points
                                    Object.keys(item).map(key =>{
                                        switch(key){
                                            case "text":
                                            case "email":
                                            case "link":
                                            case "username":
                                                if(item[key] !== null && typeof(item[key]) === "string"){
                                                    tableHead.push({label: `${item.provider} ${item.type} ${key}`, key: `${item.provider} ${item.type} ${key}`})
                                                    return res.text.push(item[key])
                                                }
                                                return true
                                            default:
                                                return false
                                        }
                                    })
                                }
                                
                            })
                        }
                        res.numActions = `${actionsDone}/${actionsNbr}`
                        res.status = done || actionsDone === actionsNbr ? "Done" : "Pending"
                        res.points = totalPoints ? totalPoints : 0
                        if(user && typeof(user) === "object" && user !== null ){
                            res.email = user.email
                            res.name = user.name
                        }
                        res.date = partipationDate && partipationDate !== null && typeof(partipationDate) === "string" ? partipationDate.split("T")[0] : ""
                        result.push(res)
                    }
                })}catch(err){
                    return {result: [], tableHead: []}
                }
                return {result, tableHead}
            }
        }).catch(err =>{
            console.log(err.response)
            return {result: [], tableHead: []}
        })
}