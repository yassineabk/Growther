import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { TemplatesContainer } from "../templates-container/templates-container.component"
export const DashboardTemplatesPage = ({templates}) =>{
    var infos, {isBrand} = useSelector(state => state.userInfos)
    if(isBrand !== "true") return <Redirect to="/" />
    return(
        <TemplatesContainer title={"Templates"}/>
    )
}