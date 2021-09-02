import React from "react"
import { useTranslation } from "react-i18next"
export const EmptyList = ({isLoading})=>{
    var {t} = useTranslation()
    if(isLoading){
        return(
            <div className="emptyList is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            </div>
        )
    }
    return(
        <div className="emptyList is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            {t("You still don't have any contests to show")}
        </div>
    )
}