import React from "react"
import {useLocation} from "react-router-dom"
export const NewContestTabs = ({tabs, activePage})=>{
    var location = useLocation()
    if(!Array.isArray(tabs)) return null
    return(
        <div className="is-flex NewContestTabs">
            {tabs.slice(0,3).map(tab =>{
                if(typeof(tab) !== "object") return null
                return(
                    <div className={tab.location === location.pathname ? "NewContestTab active" : "NewContestTab"}>
                        <div className="tabText">
                            {tab.text}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}