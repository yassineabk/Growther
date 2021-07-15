import React from "react"
export const Contest_TextInput = ({type, name, placeholder, changeHandler, id, min, label})=>{
    return(
        <div className="contest_input is-flex is-flex-direction-column">
            <label for={id ? id : ""}>{label ? label : ""}</label>
            <input 
                type={type ? type : "text"} 
                id={id ? id : ""}
                name={name ? name : ""} 
                placeholder={placeholder ? placeholder : "Type something here"}
                onChange={(event)=>{ changeHandler(event) }}
                min={type === "number" ? min : 0}
            />
        </div>
    )
}