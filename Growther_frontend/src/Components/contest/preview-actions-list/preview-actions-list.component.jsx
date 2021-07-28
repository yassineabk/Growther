import React from "react"
import { PreviewAction } from "../preview-action/preview-action.component"
export const PreviewActionsList = ({actions, previewActions, changeHandler})=>{
    var action = (data)=>{
        var points = []
        var links = []
        if(typeof(data) === "object"){
            Object.keys(data).map(key =>{
                if(typeof(data[key]) === "object") {
                    if(typeof(data[key].points) === "number" || typeof(data[key].points) === "string"){
                        points.push(parseInt(data[key].points))
                    }
                    if(typeof(data[key].link) === "string"){
                        links.push(data[key].link)
                    }
                }
            })
        }
        return {points, links}
    }
    return(
        <div className="is-flex is-flex-direction-column previewActions">
            {Array.isArray(actions) ? actions.map((element, index) =>{
                if(typeof(element) !== "object") return null
                return(
                    <PreviewAction
                        provider={element.provider}
                        links={element.url}
                        //selected={Array.isArray(previewActions) ? previewActions[index] : undefined}
                        points={element.points}
                        changeHandler={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event, provider) => changeHandler(event, provider) : ()=> false}
                    />
                )
            }) : null}
        </div>
    )
}