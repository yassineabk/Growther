import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { actions } from "../../../services/actions"
import { ContestInput } from "../contest-input/contest-input.component"
import { SelectInput } from "../select-input/select-input.component"
export const ContestAction = ({data, removeAction, updateAction, validAction, id, dragEvent, dropEvent, dragOverEvent, dragLeaveEvent})=>{
    const TextActions = ["tweet", "answer question", "submit url", "submit video", "submit", "subscribe to newsletter", "write a blog post", "get completion bonus", "get coupons"]
    var getActionsList = (actions)=>{
        var result = []
        actions.map(action=> {
            if(action.provider === data.provider){
                result = action.actions
            }
            return true
        })
        return result
    }
    var {t} = useTranslation()
    var {direction} = useSelector(state => state.userInfos)
    
    if(typeof(data) !== "object") return null
    return(
        <div 
            onDragOver={event=> dragOverEvent(event)} 
            onDrop={event => dropEvent(event, data.order)} 
            onDragStart={event => dragEvent(event, data.order)} 
            onDragLeave={event => dragLeaveEvent(event)}
            draggable 
            className="contestAction is-flex is-flex-direction-row"
            id={id}
        >
            <div className="actionTitle">{t(data.provider.toLowerCase())}</div>
            <div className="actionSelect">
                <SelectInput 
                    data={
                        Array.isArray(data.listOfActions) ? data.listOfActions : getActionsList(actions)
                    }
                    changeHandler={(event)=> updateAction(data.provider, "type", event.target.value)}
                    value={data.type}
                />
            </div>
            <div className="actionUrl">
                <ContestInput
                    type={"url"}
                    id="actionUrl"
                    name="actionUrl"
                    placeholder={TextActions.includes(data.type.toLowerCase()) ? (typeof(data.provider) === "string" && data.provider.toLowerCase() === "coupon" ? t("coupon_code") : t("action_description")) : t("action_url")}
                    changeHandler={(event)=> updateAction(data.provider, "url", event.target.value)}
                    value={typeof(data) === "object" && typeof(data.url) === "string" ? data.url : ""}
                    validData={typeof(validAction) === "object" ? {isValid: validAction.url, message: (typeof(data.provider) === "string" && data.provider.toLowerCase() === "coupon" ? t("Invalid Coupon") : t("invalid_link"))} : false}
                />
            </div>
            <div className="actionPoints">
                <ContestInput 
                    type={"number"}
                    id="actionPoints"
                    name="actionPoints"
                    placeholder="Points"
                    value={typeof(data) === "object" && typeof(data.points) === "number" ? (typeof(data.provider) === "string" && data.provider.toLowerCase() === "coupon" ? 0 : data.points) : 1}
                    readonly={typeof(data.provider) === "string" && data.provider.toLowerCase() === "coupon" ? true : false}
                    min={1}
                    max={5}
                    changeHandler={(event)=> updateAction(data.provider, "points", parseInt(event.target.value))}
                    validData={typeof(validAction) === "object" ? 
                        {
                            isValid: validAction.points, 
                            message: t("invalid_points")
                        } : false}
                />
            </div>
            <div dir={direction ? direction : "ltr"} className="removeAction">
                <img 
                    alt="" 
                    onClick={()=> removeAction(data.provider)} 
                    src={require("../../../assets/icons/close.png").default} 
                />
            </div>
        </div>
    )
}