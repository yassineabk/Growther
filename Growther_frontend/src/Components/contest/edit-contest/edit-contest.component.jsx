import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { 
    BrowserRouter as Router,
    Switch,
} 
from "react-router-dom"
import { EditSelectedAction, SetStateToEdit } from "../../../redux/contest-edit/contest-edit-actions"
import { EditContestFirstStep } from "../edit-contest-first-step/edit-contest-first-step.component"
import { NewContestTabs } from "../new-contest-tabs/new-contest-tabs.component"
import { PreviewContainer } from "../preview-container/preview-container.component"
export const EditContest = ()=>{
    var { information, selected } = useSelector(state => state.contest_edit)
    var dispatch = useDispatch()
    useEffect(()=>{
        SetStateToEdit(dispatch)
    }, [dispatch])
    var previewChangeHandler = (event, provider)=>{
        var index = parseInt(event.target.selectedIndex)
        EditSelectedAction(dispatch, provider, index)
    }
    return(
        <div className="column is-full is-flex is-flex-direction-column list-container newContest is-size-6 mb-4">
            <NewContestTabs 
                tabs={[
                    {
                        location: "/contest/id/edit", 
                        text: "Edit Contest",
                    },
                    {
                        location: "/contest/id/result", 
                        text: "Contest Result"
                    },
                    {
                        location: "/contest/id/winners", 
                        text: "Contest Winners"
                    }
                ]}
            />
            <div className="is-flex bottomContainer">
                <PreviewContainer 
                    previewActions={selected} 
                    information={information} 
                    actions={information.actions} 
                    changeHandler={(event, provider) => previewChangeHandler(event, provider)} 
                />
                <Router>
                    <Switch>
                        <EditContestFirstStep />
                        {/*<Route path={"/dashboard/My Contests/new/secondStep"}>
                            <ContestSecondStep />
                        </Route>
                        <Route path={"/dashboard/My Contests/new/thirdStep"}>
                            <ContestThirdStep />
                        </Route>*/}
                    </Switch>
                </Router>
            </div>
        </div>
    )
}