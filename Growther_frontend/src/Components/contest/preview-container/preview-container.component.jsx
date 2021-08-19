import React from "react"
import { TimeLeft } from "../../../services/timeLeft"
import { PreviewCard } from "../preview-card/preview-card.component"
export const PreviewContainer = ({information, actions, previewActions, changeHandler, isPreview, showLoginForm})=>{
    return(
        <div className="is-flex is-flex-direction-column preview is-justify-content-center is-align-items-center">
            <PreviewCard
                title={information.title}
                description={information.description}
                timeLeft={information.endDate ? TimeLeft(information.endDate.split("T")[0], information.startTime.split(":"), information.endTime.split(":")).date : false}
                dateType={information.endDate ? TimeLeft(information.endDate.split("T")[0], information.startTime.split(":"), information.endTime.split(":")).type : false}
                actions={actions}
                prizes={information.prizes}
                previewActions={previewActions}
                changeHandler={(event, provider) => changeHandler(event, provider)}
                showLoginForm={showLoginForm && {}.toString.call(showLoginForm) === '[object Function]' ? (value)=> showLoginForm(value) : ()=> false}
                isPreview={isPreview}
            />
        </div>
    )
}