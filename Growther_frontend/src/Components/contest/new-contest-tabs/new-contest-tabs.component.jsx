import React, { useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
export const NewContestTabs = ({tabs, activePage})=>{
    var location = useLocation()
    if(!Array.isArray(tabs)) return null
    return(
        <div className="is-flex NewContestTabs">
            {tabs.slice(0,3).map(tab =>{
                if(typeof(tab) !== "object") return null
                return(
                    <div className={tab.location === location.pathname || tab.location === activePage ? "NewContestTab active" : "NewContestTab"}>
                        <div className="tabText">
                            {tab.text}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}