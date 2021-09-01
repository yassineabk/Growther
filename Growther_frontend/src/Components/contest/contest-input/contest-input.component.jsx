import React from "react"
import { useSelector } from "react-redux"
export const ContestInput = ({type, name, value, placeholder, changeHandler, id, min, max, label, child, readonly, validData, timeChangeHandler})=>{
    var {direction} = useSelector(state => state.userInfos)
    return(
        <div className="contest_input is-flex is-flex-direction-column">
            {typeof(label) === "string" ? <label for={typeof(id) === "string" ? id : ""}>{label ? label : ""}</label> : null}
            <input 
                type={type ? type : "text"} 
                id={id ? id : ""}
                name={name ? name : ""} 
                placeholder={placeholder ? placeholder : ""}
                onChange={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event)=> changeHandler(event) : (event) => false}
                min={min ? min : 0}
                readOnly={readonly ? readonly : ""}
                value={value}
                max={max ? max : ""}
                dir={direction ? direction : "ltr"}
            />
            {validData !== undefined && validData.isValid === false ? <div className="inputError">{validData.message}</div> : null}
            {Array.isArray(child) ? child :  null}
        </div>
    )
}