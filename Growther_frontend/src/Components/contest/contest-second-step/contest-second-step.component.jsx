import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { ActionsList } from "../actions-list/actions-list.component"
import { ContestActions } from "../contest-actions/contest-actions.component"
export const ContestSecondStep = ()=>{
    var contest = useSelector(state => state.contest)
    return(
        <div className="actionsContainer is-flex is-flex-direction-column">
            <ContestActions data={contest.actions} />
            <ActionsList actions={[
                "Youtube", 
                "Facebook",  
                "Instagram", 
                "Twitter",
                "Pintrest", 
                "Twitch"
            ]} />
        </div>
    )
}