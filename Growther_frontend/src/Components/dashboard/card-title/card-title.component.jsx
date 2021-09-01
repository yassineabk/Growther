import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ShowMoreButton } from "../show-more/show-more.component"
export const CardTitle = ({title, addNew, showMore})=>{
    var {isBrand, direction} = useSelector(state => state.userInfos)
    var {t} = useTranslation()
    return(
        <div className="list-title-container is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
            <span className="list-title">{title ? title : ""}</span>
            <div className="is-flex is-flex-direction-row is-align-items-center">
                {addNew && isBrand === "true" ? <div className="addNew">
                    <Link to={addNew}>+ {t("add_new")}</Link>
                </div> : null}
                {isBrand === "true" ?
                    [
                        <ShowMoreButton direction={direction} id="addNewButton" showMore={addNew} icon={require("../../../assets/icons/plus.png").default} />,
                        <ShowMoreButton direction={direction} showMore={showMore} icon={require("../../../assets/icons/right-arrow.png").default} />
                    ] : null
                }
            </div>
        </div>
    )
}