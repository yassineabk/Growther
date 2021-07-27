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
import { ContestFirstStep } from "../contest-first-step/contest-first-step.component"
import { ContestSecondStep } from "../contest-second-step/contest-second-step.component"
import { ContestThirdStep } from "../contest-third-step/contest-third-step.component"
import { NewContestTabs } from "../new-contest-tabs/new-contest-tabs.component"
import { PreviewContainer } from "../preview-container/preview-container.component"
export const NewContest = ()=>{
    var { information, activePage, actions, previewActions } = useSelector(state => state.contest)
    var dispatch = useDispatch()
    var history = useHistory()
    var previewChangeHandler = (event, provider)=>{
        var index = parseInt(event.target.selectedIndex)
        PreviewSelectedAction(dispatch, provider, index)
    }
    return(
        <div className="column is-full is-flex is-flex-direction-column list-container newContest is-size-6 mb-4">
            <NewContestTabs 
                activePage={activePage}
                tabs={[
                    {
                        location: "/dashboard/My Contests/new/firstStep", 
                        text: "Contest Informations",
                    },
                    {
                        location: "/dashboard/My Contests/new/secondStep", 
                        text: "Compose Contest"
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
                    actions={actions} 
                    changeHandler={(event, provider) => previewChangeHandler(event, provider)} />
                <Router>
                    <Switch>
                        <Route path={"/dashboard/My Contests/new/firstStep"}>
                            <ContestFirstStep />
                        </Route> 
                        <Route path={"/dashboard/My Contests/new/secondStep"}>
                            <ContestSecondStep />
                        </Route>
                        <Route path={"/dashboard/My Contests/new/thirdStep"}>
                            <ContestThirdStep />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    )
}