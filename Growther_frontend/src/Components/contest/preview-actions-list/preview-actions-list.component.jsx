import React from "react"
import { PreviewAction } from "../preview-action/preview-action.component"
export const PreviewActionsList = ({actions})=>{
    var action = (data)=>{
        var somme = 0
        var links = []
        if(typeof(data === "object")){
            Object.keys(data).map(key =>{
                if(typeof(data[key]) === "object") {
                    if(typeof(data[key].points) === "number" || typeof(data[key].points) === "string"){
                        somme += parseInt(data[key].points)
                    }
                    if(typeof(data[key].link) === "string"){
                        links.push(data[key].link)
                    }
                }
            })
        }
        return {somme, links}
    }
    return(
        <div className="is-flex is-flex-direction-column previewActions">
            {Array.isArray(actions) ? actions.map(element =>{
                if(typeof(element) !== "object") return null
                return(
                    <PreviewAction
                        provider={element.provider}
                        link={action(element.actions).links[0]}
                        points={action(element.actions).somme}
                    />
                )
            }) : null}
        </div>
    )
}