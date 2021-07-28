import React, { useEffect } from "react"
import { TemplatesContainer } from "../templates-container/templates-container.component"
export const DashboardTemplatesPage = ({templates}) =>{
    useEffect(()=>{
        //GET Data from API
    })
    return(
        <TemplatesContainer title={"Templates"}/>
    )
}