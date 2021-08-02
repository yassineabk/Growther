import React from "react"
import {useHistory, useLocation} from "react-router-dom"
export const NewContestTabs = ({tabs, activePage, goBack})=>{
    var location = useLocation()
    var history = useHistory()
    var openLink =(url)=>{
        if(url && !goBack){
            history.push(url)
        }
    }
    if(!Array.isArray(tabs)) return null
    return(
        <div className="is-flex NewContestTabs">
            {tabs.slice(0,3).map((tab, index) =>{
                if(typeof(tab) !== "object") return null
                return(
                    <div key={`tab${index}`} className={tab.location === location.pathname ? "NewContestTab active" : "NewContestTab"}>
                        <div onClick={()=> openLink(tab.location)} className="tabText">
                            {tab.text}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}