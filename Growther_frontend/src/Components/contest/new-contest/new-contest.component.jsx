import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
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
    var { isBrand, direction } = useSelector(state => state.userInfos)
    var dispatch = useDispatch()
    var previewChangeHandler = (event, provider)=>{
        var index = parseInt(event.target.selectedIndex)
        PreviewSelectedAction(dispatch, provider, index)
    }
    useEffect(()=>{
        InitState(dispatch)   
    }, [dispatch])
    var {t} = useTranslation()
    if(isBrand !== "true") return <Redirect to="/dashboard" />
    return(
        [            
            <Spinner show={isLoading} />,
            <div className="column is-full is-flex is-flex-direction-column list-container newContest is-size-6 mb-4">
                <NewContestTabs 
                    activePage={activePage}
                    tabs={[
                        {
                            location: "/dashboard/My Contests/new/firstStep", 
                            next: "/dashboard/My Contests/new/secondStep",
                            text: t("contest_information"),
                        },
                        {
                            location: "/dashboard/My Contests/new/secondStep", 
                            next: "/dashboard/My Contests/new/thirdStep",
                            text: t("compose_contest"),
                        },
                        {
                            location: "/dashboard/My Contests/new/thirdStep", 
                            text: t("publish_contest"),
                        }
                    ]}
                    goBack={isPublished}
                />
                <div dir={direction ? direction : "ltr"} className={`is-flex bottomContainer ${direction ? (direction === "rtl" ? "is-flex-direction-row-reverse" : "") : ""}`}>
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