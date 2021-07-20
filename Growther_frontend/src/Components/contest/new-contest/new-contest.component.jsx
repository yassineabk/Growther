import React from "react"
import { 
    BrowserRouter as Router,
    Route,
    Switch } 
from "react-router-dom"
import { ContestFirstStep } from "../contest-first-step/contest-first-step.component"
import { ContestSecondStep } from "../contest-second-step/contest-second-step.component"
import { ContestThirdStep } from "../contest-third-step/contest-third-step.component"
export const NewContest = ()=>{
    return(
        <div className="column is-full is-flex list-container newContest is-size-6 mb-4">
            <div className="preview is-flex-tablet is-hidden-touch-only"></div>
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
    )
}