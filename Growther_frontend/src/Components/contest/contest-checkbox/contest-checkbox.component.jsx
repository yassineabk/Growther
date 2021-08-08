import React from "react"
export const ContestCheckBox = ({label, changeHandler, child, placeholder, name, id, value})=>{
    return(
        <div className="contest_checkbox is-flex is-flex-direction-column">
            {typeof(label) === "string" ? <label for={typeof(id) === "string" ? id : ""}>{label ? label : ""}</label> : null}
            <div className="is-flex is-flex-direction-row is-align-items-center checkbox_container">
                <input 
                    type={"checkbox"} 
                    id={id ? id : ""}
                    name={name ? name : ""} 
                    placeholder={placeholder ? placeholder : "Type something here"}
                    onChange={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event)=> changeHandler(event) : (event) => false}
                    value={value ? value : false}
                />
                <span style={{marginLeft: "0.25em", fontSize: "13px"}}>{placeholder ? placeholder : "Start immediately"}</span>
            </div>
            {Array.isArray(child) ? child :  null}
        </div>
    )
}