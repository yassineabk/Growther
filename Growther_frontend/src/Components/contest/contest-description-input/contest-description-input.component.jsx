import React from "react"
import { useSelector } from "react-redux"
export const ContestDescription = ({changeHandler, value, label, validData, child, id, name, placeholder})=>{
    var {direction} = useSelector(state => state.userInfos)
    return(
        <div className="contest_input is-flex is-flex-direction-column">
            <label for={id ? id : ""}>{label ? label : ""}</label>
            <textarea
                value={value ? value : ""}
                minLength={1}
                maxLength={250}
                id={id ? id : ""}
                name={name ? name : ""}
                placeholder={placeholder ? placeholder : ""}
                onChange={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event)=> changeHandler(event) : (event) => false}
                dir={direction ? direction : "ltr"}
            />
            {validData !== undefined && validData.isValid === false ? <div dir={direction ? direction : "ltr"} className="inputError">{validData.message}</div> : null}
            {Array.isArray(child) ? child :  null}
        </div>
    )
}