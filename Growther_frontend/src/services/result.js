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
            if(Array.isArray(data)){
                try{
                    data.map((participation, participationIndex) =>{
                        var res = {}
                        if(typeof(participation) === "object" && participation !== null){
                            var contest = participation.contest && participation.contest !== null && typeof(participation.contest) === "object" ? participation.contest : participation.contestDto
                            var {participationActions, done, user, partipationDate } = participation
                            var { actionsNbr } = contest
                            var actionsDone = 0
                            var totalPoints = 0
                            var usernames = {}, emails = {}, texts = {}, links = {};
                            if(Array.isArray(participationActions)){
                                participationActions.map((action, actionIndex) =>{
                                    if(typeof(action) === "object" && action !== null){
                                        totalPoints += action.done ? action.points : 0
                                        actionsDone += action.done ? 1 : 0
                                        var {username, email, link, text, provider, type} = action
                                        if(provider && type && typeof(provider) === typeof(type) && typeof(provider) === "string"){
                                            var label, key, filter;
                                            if(username && typeof(username) === "string"){
                                                usernames[provider] = usernames[provider] === undefined ? 1 : usernames[provider] + 1
                                                key = `${provider}_username_${usernames[provider]}`.toLowerCase()
                                                label = `${provider} Username ${usernames[provider]}`
                                                res[key] = username
                                                filter = tableHead.filter(head => head.label === label)
                                                if(filter.length === 0){
                                                    tableHead.push({label: label, key: key})
                                                }
                                            }
                                            if(email && typeof(email) === "string"){
                                                emails[provider] = emails[provider] === undefined ? 1 : emails[provider] + 1
                                                key = `${provider}_email_${emails[provider]}`.toLowerCase()
                                                label = `${provider} Email ${emails[provider]}`
                                                res[key] = email
                                                filter = tableHead.filter(head => head.label === label)
                                                if(filter.length === 0){
                                                    tableHead.push({label: label, key: key})
                                                }
                                            }
                                            if(link && typeof(link) === "string"){
                                                links[provider] = links[provider] === undefined ? 1 : links[provider] + 1
                                                key = `${provider}_link_${links[provider]}`.toLowerCase()
                                                label = `${provider} Link ${links[provider]}`
                                                res[key] = link
                                                filter = tableHead.filter(head => head.label === label)
                                                if(filter.length === 0){
                                                    tableHead.push({label: label, key: key})
                                                }
                                            }
                                            if(text && typeof(text) === "string"){
                                                texts[provider] = texts[provider] === undefined ? 1 : texts[provider] + 1
                                                key = `${provider}_text_${texts[provider]}`.toLowerCase()
                                                label = `${provider} Text ${texts[provider]}`
                                                res[key] = text
                                                filter = tableHead.filter(head => head.label === label)
                                                if(filter.length === 0){
                                                    tableHead.push({label: label, key: key})
                                                }
                                            }
                                        }
                                    }
                                    return true
                                })
                            }
                            res.numActions = `${actionsDone} of ${actionsNbr}`
                            res.status = done || actionsDone === actionsNbr ? "Done" : "Pending"
                            res.points = totalPoints ? totalPoints : 0
                            if(user && typeof(user) === "object" && user !== null ){
                                res.email = user.email
                                res.name = user.name
                            }
                            res.date = partipationDate && partipationDate !== null && typeof(partipationDate) === "string" ? partipationDate.split("T")[0]: ""
                            result.push(res)
                        }
                        return true
                    }     
                )}catch(err){
                    return {result: [], tableHead: []}
                }
                return {result, tableHead}
            }
        }).catch(err =>{
            return {result: [], tableHead: []}
        })
}