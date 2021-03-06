import React from "react"
import { useSelector } from "react-redux"
import { TimeLeft } from "../../../services/timeLeft"
import { PreviewCard } from "../preview-card/preview-card.component"
export const PreviewContainer = ({information, actions, previewActions, changeHandler, isPreview, showLoginForm})=>{
    var {direction} = useSelector(state => state.userInfos)
    if(information === undefined || information === null || typeof(information) !== "object") return null
    return(
        <div dir={direction ? direction : "ltr"} className="is-flex is-flex-direction-column preview is-justify-content-center is-align-items-center">
            <PreviewCard
                title={information.title}
                description={information.description}
                timeLeft={information.endDate ? TimeLeft(information.endDate.trim().replace(" ", "T"), information.endTime).date : false}
                dateType={information.endDate ? TimeLeft(information.endDate.trim().replace(" ", "T"), information.endTime).type : false}
                actions={actions}
                element={information}
                prizes={information.prizes}
                previewActions={previewActions}
                changeHandler={(event, provider) => changeHandler(event, provider)}
                showLoginForm={showLoginForm && {}.toString.call(showLoginForm) === '[object Function]' ? (value)=> showLoginForm(value) : ()=> false}
                isPreview={isPreview}
            />
        </div>
    )
}