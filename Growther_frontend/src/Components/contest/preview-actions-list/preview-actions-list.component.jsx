import React from "react"
import { PreviewAction } from "../preview-action/preview-action.component"
export const PreviewActionsList = ({actions, previewActions, changeHandler, DoAction, isOwner, canParticipate})=>{
    return(
        <div className="is-flex is-flex-direction-column previewActions">
            {Array.isArray(actions) ? actions.map((element, index) =>{
                if(element !== null && typeof(element) !== "object") return null
                return(
                    <PreviewAction
                        provider={element.provider}
                        links={element.type}
                        done={element.isDone || element.done}$
                        index={index}
                        isOwner={isOwner}
                        points={element.points}
                        changeHandler={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event, provider) => changeHandler(event, provider) : ()=> false}
                        key={`action${index}`}
                        canParticipate={canParticipate}
                        DoAction={DoAction && {}.toString.call(DoAction) === '[object Function]' ? ()=> DoAction(index, element) : ()=> false}
                    />
                )
            }) : null}
        </div>
    )
}