import { decode } from "jsonwebtoken"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { 
    BrowserRouter as Router,
    Redirect,
    Switch,
    useHistory,
    useLocation,
    useParams,
} 
from "react-router-dom"
import { EditSelectedAction, SetStateToEdit, SetStateToEditFromLocation } from "../../../redux/contest-edit/contest-edit-actions"
import { EditContestFirstStep } from "../edit-contest-first-step/edit-contest-first-step.component"
import { NewContestTabs } from "../new-contest-tabs/new-contest-tabs.component"
import { PreviewContainer } from "../preview-container/preview-container.component"
export const EditContest = ({child})=>{
    var params = useParams()
    var dispatch = useDispatch()
    var previewChangeHandler = (event, provider)=>{
        var index = parseInt(event.target.selectedIndex)
        EditSelectedAction(dispatch, provider, index)
    }
    var { information, actions, isValidData, validData, isLoading } = useSelector(state => state.contest_edit)
    if(typeof(information) !== "object") return null
    return(
        <div className="column is-full is-flex is-flex-direction-column list-container newContest is-size-6 mb-4">
            <NewContestTabs 
                tabs={[
                    {
                        location: `/dashboard/My Contests/edit/${params.id}`, 
                        text: "Edit Contest",
                    },
                    {
                        location: `/dashboard/My Contests/result/${params.id}`, 
                        text: "Contest Result"
                    },
                    {
                        location: `/dashboard/My Contests/winners/${params.id}`, 
                        text: "Contest Winners"
                    }
                ]}
            />
            <div className="is-flex bottomContainer">
                {child}
            </div>
        </div>
    )
}