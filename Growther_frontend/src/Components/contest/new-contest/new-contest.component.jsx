import React from "react"
import { Route, Switch, Redirect, useLocation } from "react-router-dom"
import { ContestFirstStep } from "../contest-first-step/contest-first-step.component"
import { ContestSecondStep } from "../contest-second-step/contest-second-step.component"
export const NewContest = ()=>{
    return(
        <div className="column is-full is-flex list-container newContest is-size-6">
            <div className="preview is-flex-tablet is-hidden-touch-only"></div>
            <ContestFirstStep />
            <ContestSecondStep />
        </div>
    )
}