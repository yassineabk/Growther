import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { 
    Redirect,
} 
from "react-router-dom"
import { InitState, PreviewSelectedAction } from "../../../redux/contest/contest-actions"
import { Spinner } from "../../spinner/spinner.component"
import { NewContestTabs } from "../new-contest-tabs/new-contest-tabs.component"
import { PreviewContainer } from "../preview-container/preview-container.component"
const NewContest = ({child})=>{
    var { information, activePage, previewActions, isLoading, isPublished } = useSelector(state => state.contest)
    var { isBrand } = useSelector(state => state.userInfos)
    var dispatch = useDispatch()
    var previewChangeHandler = (event, provider)=>{
        var index = parseInt(event.target.selectedIndex)
        PreviewSelectedAction(dispatch, provider, index)
    }
    useEffect(()=>{
        InitState(dispatch)   
    }, [dispatch])
    if(isBrand !== "true") return <Redirect to="/" />
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
                    goBack={isPublished}
                />
                <div className="is-flex bottomContainer">
                    <PreviewContainer 
                        previewActions={previewActions} 
                        information={information} 
                        isPreview={true}
                        actions={information.actions} 
                        changeHandler={(event, provider) => previewChangeHandler(event, provider)} />
                    {child}
                </div>
            </div>
        ]
    )
}
export default NewContest;