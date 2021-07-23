import React from "react"
export const ContestInput = ({type, name, value, placeholder, changeHandler, id, min, label, child, readonly, validData})=>{
    return(
        <div className="contest_input is-flex is-flex-direction-column">
            {typeof(label) === "string" ? <label for={typeof(id) === "string" ? id : ""}>{label ? label : ""}</label> : null}
            <input 
                type={type ? type : "text"} 
                id={id ? id : ""}
                name={name ? name : ""} 
                placeholder={placeholder ? placeholder : "Type something here"}
                onChange={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event)=> changeHandler(event) : (event) => false}
                min={type === "number" ? min : 0}
                readOnly={readonly ? readonly : ""}
                value={value}
            />
            {validData !== undefined && validData.isValid === false ? <div className="inputError">{validData.message}</div> : null}
            {Array.isArray(child) ? child :  null}
        </div>
    )
}