import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { 
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory, 
} 
from "react-router-dom"
import { PreviewSelectedAction } from "../../../redux/contest/contest-actions"
import { Spinner } from "../../spinner/spinner.component"
import { ContestFirstStep } from "../contest-first-step/contest-first-step.component"
import { ContestSecondStep } from "../contest-second-step/contest-second-step.component"
import { ContestThirdStep } from "../contest-third-step/contest-third-step.component"
import { NewContestTabs } from "../new-contest-tabs/new-contest-tabs.component"
import { PreviewContainer } from "../preview-container/preview-container.component"
export const NewContest = ({child})=>{
    var { information, activePage, actions, previewActions, isLoading } = useSelector(state => state.contest)
    var dispatch = useDispatch()
    var history = useHistory()
    var previewChangeHandler = (event, provider)=>{
        var index = parseInt(event.target.selectedIndex)
        PreviewSelectedAction(dispatch, provider, index)
    }
    return(
        [            
            <Spinner show={isLoading} />,
            <div className="column is-full is-flex is-flex-direction-column list-container newContest is-size-6 mb-4">
                <NewContestTabs 
                    activePage={activePage}
                    tabs={[
                        {
                            location: "/dashboard/My Contests/new/firstStep", 
                            nex: "/dashboard/My Contests/new/secondStep",
                            text: "Contest Informations",
                        },
                        {
                            location: "/dashboard/My Contests/new/secondStep", 
                            text: "Compose Contest",
                            next: "/dashboard/My Contests/new/thirdStep"
                        },
                        {
                            location: "/dashboard/My Contests/new/thirdStep", 
                            text: "Publish Contest"
                        }
                    ]}
                />
                <div className="is-flex bottomContainer">
                    <PreviewContainer 
                        previewActions={previewActions} 
                        information={information} 
                        actions={information.actions} 
                        changeHandler={(event, provider) => previewChangeHandler(event, provider)} />
                    {child}
                </div>
            </div>
        ]
    )
}