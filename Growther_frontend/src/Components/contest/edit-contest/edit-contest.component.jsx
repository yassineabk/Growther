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
export const EditContest = ()=>{
    var dispatch = useDispatch()
    var location = useLocation()
    var params = useParams()
    var history = useHistory()
    var [userId, setId] = useState("")
    var { information, actions, isValidData, validData } = useSelector(state => state.contest_edit)
    useEffect(()=>{
        var id = decode(localStorage.getItem("accessToken")).sub
        setId(id)
        if(typeof(location.state) === "object"){
            SetStateToEditFromLocation(dispatch, location.state, id).then(value =>{
                if(!value){
                    history.push("/landing-page")
                }
            })
        }else{
            SetStateToEdit(dispatch, params.id, id).then(value=>{
                if(!value){
                    history.push("/landing-page")
                }
            })
        }
    }, [dispatch])
    var previewChangeHandler = (event, provider)=>{
        var index = parseInt(event.target.selectedIndex)
        EditSelectedAction(dispatch, provider, index)
    }
    if(typeof(information) !== "object") return null
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
                    information={information} 
                    actions={information.actions} 
                    changeHandler={(event, provider) => previewChangeHandler(event, provider)} 
                />
                <Router>
                    <Switch>
                        <EditContestFirstStep 
                            information={information}
                            validData={validData}
                            isValidData={isValidData}
                            userId={userId}
                        />
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