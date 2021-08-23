import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { TemplatesContainer } from "../templates-container/templates-container.component"
const DashboardTemplatesPage = ({templates}) =>{
    var { isBrand } = useSelector(state => state.userInfos)
    if(isBrand !== "true") return <Redirect to="/" />
    return(
        <TemplatesContainer title={"Templates"}/>
    )
}
export default DashboardTemplatesPage;