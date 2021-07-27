import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { 
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory, 
} 
from "react-router-dom"
import { EditSelectedAction, SetStateToEdit } from "../../../redux/contest-edit/contest-edit-actions"
import { PreviewSelectedAction } from "../../../redux/contest/contest-actions"
import { EditContestFirstStep } from "../edit-contest-first-step/edit-contest-first-step.component"
import { NewContestTabs } from "../new-contest-tabs/new-contest-tabs.component"
import { PreviewContainer } from "../preview-container/preview-container.component"
export const EditContest = ()=>{
    var { information, selected, isValidData, validData, actions } = useSelector(state => state.contest_edit)
    var dispatch = useDispatch()
    var history = useHistory()
    useEffect(()=>{
        var data = {
            "information": {
                "title": "Yassine Hijazi",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure do",
                "winnersNbr": 1,
                "startDate": "2021-07-27",
                "endDate": "2021-08-13",
                "duration": {
                    "value": 17,
                    "type": "days"
                },
                "maxParticipants": 8,
                "prizes": {
                    "prize0": "PS5"
                }
            },
            "actions": [
                {
                    "provider": "Youtube",
                    "active": "View",
                    "actions": {
                        "View": {
                            "link": "https://www.youtube.com/id5",
                            "points": 3
                        },
                        "Like": {
                            "link": "https://www.youtube.com/id221",
                            "points": 3
                        },
                        "Subscribe": {
                            "link": "https://www.youtube.com/id",
                            "points": 5
                        }
                    },
                    "listOfActions": [
                        "View",
                        "Like",
                        "Subscribe"
                    ]
                }
            ],
        }
        SetStateToEdit(dispatch, data)
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
                    actions={actions} 
                    changeHandler={(event, provider) => previewChangeHandler(event, provider)} />
                <Router>
                    <Switch>
                        <Route path={"/contest/:id/edit"}>
                            <EditContestFirstStep />
                        </Route> 
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