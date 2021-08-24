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
            var keys = ["text", "emails", "username", "link"]
            if(Array.isArray(data)){
                try{data.map(item =>{
                    var res = {}
                    var keysFilter = {
                        text: "",
                        emails: "",
                        username: "",
                        link: ""
                    }
                    if(typeof(item) === "object" && item !== null){
                        var { contest, participationActions, done, totalPoints, user, partipationDate } = item
                        var { actionsNbr } = contest
                        var actionsDone = 0
                        keys.map(key =>{
                            if(item[key] && item[key] !== null && typeof(item[key]) === "string"){
                                console.log(item, key)
                                if(item.provider === "string" && item.provider.toLowerCase() === "question"){
                                    tableHead = [...tableHead, {label: `${keysFilter.text.length > 0 ? "Answer " + keysFilter.text.length : "Answer"}`, key: "answer"}]
                                }else{
                                    tableHead = [...tableHead, {label: `${item.provider} ${key} ${keysFilter[key].length > 0 ? keysFilter[key].length : ""}`, key: "url"}]  
                                }
                                keysFilter[key] = item[key]
                            }
                        })
                        if(Array.isArray(participationActions)){
                            actionsDone = participationActions.length
                        }
                        res.numActions = `${actionsNbr}`
                        res.status = done ? "Done" : "Pending"
                        res.points = totalPoints ? totalPoints : 0
                        if(user && typeof(user) === "object" && user !== null ){
                            res.email = user.email
                            res.name = user.name
                        }
                        res.date = partipationDate && partipationDate !== null && typeof(partipationDate) === "string" ? partipationDate.split("T")[0] : ""
                        keys.map(key =>{
                            if(keysFilter[key] && typeof(keysFilter[key]) === "string"){
                                res[key] = keysFilter[key]
                            }
                        })
                        result.push(res)
                    }
                    console.log({result, tableHead})
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