import React from "react"
export const ContestDescription = ({changeHandler, value, label, validData, child, id, name, placeholder})=>{
    return(
        <div className="contest_input is-flex is-flex-direction-column">
            <label for={id ? id : ""}>{label ? label : ""}</label>
            <textarea
                value={value ? value : ""}
                minLength={1}
                id={id ? id : ""}
                name={name ? name : ""}
                placeholder={placeholder ? placeholder : ""}
                onChange={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event)=> changeHandler(event) : (event) => false}
            />
            {validData !== undefined && validData.isValid === false ? <div className="inputError">{validData.message}</div> : null}
            {Array.isArray(child) ? child :  null}
        </div>
    )
}