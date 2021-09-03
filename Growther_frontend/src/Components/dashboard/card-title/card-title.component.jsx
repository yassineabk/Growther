import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { ShowMoreButton } from "../show-more/show-more.component"
export const CardTitle = ({title, addNew, showMore, refresh})=>{
    var {isBrand, direction} = useSelector(state => state.userInfos)
    var {t} = useTranslation()
    var history = useHistory()
    return(
        <div className="list-title-container is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
            <span className="list-title">{title ? title : ""}</span>
            <div className="is-flex is-flex-direction-row is-align-items-center">
                {addNew && isBrand === "true" ? <div className="addNew">
                    <Link onClick={(event)=> {
                        var state = {clear: true}
                        event.preventDefault()
                        history.push(addNew, state)
                    }} to={"#"}>+ {t("add_new")}</Link>
                </div> : null}
                {refresh && {}.toString.call(refresh) === '[object Function]' ? 
                    <ShowMoreButton 
                        clickEvent={()=> refresh()} 
                        icon={require("../../../assets/icons/refresh.png").default}
                        showMore={!showMore}
                        direction={direction ? direction : "ltr"}
                    /> : null}
                {isBrand === "true" ?
                    [
                        <ShowMoreButton 
                            clickEvent={event => {
                                var state = {clear: true}
                                event.preventDefault()
                                history.push(addNew, state)
                            }} 
                            direction={direction} 
                            id="addNewButton" 
                            showMore={addNew} 
                            icon={require("../../../assets/icons/plus.png").default} />,
                        <ShowMoreButton 
                            clickEvent={event =>{
                                event.preventDefault()
                                if(showMore){
                                    history.push(showMore)
                                }
                            }} 
                            direction={direction} 
                            showMore={showMore} 
                            icon={require("../../../assets/icons/right-arrow.png").default} />
                    ] : null
                }
            </div>
        </div>
    )
}