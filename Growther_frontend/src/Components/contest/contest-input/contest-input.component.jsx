import React from "react"
export const ContestInput = ({type, name, value, placeholder, changeHandler, id, min, max, label, child, readonly, validData, timeChangeHandler})=>{
    return(
        <div className="contest_input is-flex is-flex-direction-column">
            {typeof(label) === "string" ? <label for={typeof(id) === "string" ? id : ""}>{label ? label : ""}</label> : null}
            <input 
                type={type ? type : "text"} 
                id={id ? id : ""}
                name={name ? name : ""} 
                placeholder={placeholder ? placeholder : "Type something here"}
                onChange={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event)=> changeHandler(event) : (event) => false}
                min={min ? min : 0}
                readOnly={readonly ? readonly : ""}
                value={value}
                max={max ? max : ""}
                onTimeUpdate={timeChangeHandler && {}.toString.call(timeChangeHandler) === '[object Function]' ? (event)=> console.log(event.target) : ()=> false}
            />
            {validData !== undefined && validData.isValid === false ? <div className="inputError">{validData.message}</div> : null}
            {Array.isArray(child) ? child :  null}
        </div>
    )
}