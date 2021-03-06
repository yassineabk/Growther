import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { TemplatesContainer } from "../templates-container/templates-container.component"
import { useTranslation } from "react-i18next";

const DashboardTemplatesPage = () =>{
    const { t } = useTranslation();
    var { isBrand } = useSelector(state => state.userInfos)
    if(isBrand !== "true") return <Redirect to="/dashboard" />
    return(
        <TemplatesContainer title={t("templates")}/>
    )
}
export default DashboardTemplatesPage;