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
        {label: "Email", key: "email", show: true},
        {label: "Date", key: "date", show: true},
        {label: "Points", key: "points", show: true},
        {label: "Number of actions", key: "numActions", show: true},
        {label: "Winning status", key: "status", show: true}
    ]
    return axios.get(`${BACKEND_API}/api/participations/all/${id}`, config)
        .then(response =>{
            var data = response.data
            var result = []
            console.log(response.data)
            if(Array.isArray(data)){
                try{
                    data.map(item =>{
                        var res = {}
                        if(typeof(item) === "object" && item !== null){
                            var { contest, participationActions, done, user, partipationDate } = item
                            var { actionsNbr } = contest
                            var actionsDone = 0
                            var totalPoints = 0
                            if(Array.isArray(participationActions)){
                                participationActions.map((item, index) =>{
                                    if(typeof(item) === "object" && item !== null){
                                        totalPoints += item.done ? item.points : 0
                                        actionsDone += item.done ? 1 : 0
                                        Object.keys(item).map((key, ix) =>{
                                            switch(key){
                                                case "text":
                                                case "email":
                                                case "link":
                                                case "username":
                                                    if(item[key] !== null && typeof(item[key]) === "string" && item[key].length > 0){
                                                        var newKey = `${item.provider}_${item.type}${item.provider === "Newsletter" ? `_${key}` : ""}`.replace(" ", "_").toLowerCase()
                                                        var newLabel =  `${item.provider} ${item.type} ${item.provider === "Newsletter" ? `_${key}` : ""}`
                                                        var alreadyIn = false
                                                        for(var i = 0; i < result.length; i++){
                                                            if(result[i] !== null && typeof(result[i]) === "object" && result[i][newKey] !== undefined){
                                                                alreadyIn = true
                                                                break
                                                            }
                                                        }
                                                        tableHead.map(element =>{
                                                            if(element.label === newLabel && !alreadyIn){
                                                                newLabel = `${newLabel} ${index}`
                                                                newKey = `${newKey} ${index}`
                                                            }
                                                        })
                                                        tableHead.push({label: newLabel, key: newKey})
                                                        return res[newKey] = item[key]
                                                    }
                                                    return true
                                                default:
                                                    return false
                                            }
                                        })
                                    }
                                    return true
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
                        return true
                    }     
                )}catch(err){
                    return {result: [], tableHead: []}
                }
                console.log(result, tableHead)
                return {result, tableHead}
            }
        }).catch(err =>{
            return {result: [], tableHead: []}
        })
}