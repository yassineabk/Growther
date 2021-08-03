import React from "react"
export const SelectInput = ({data, value, changeHandler})=>{
    return(
        <select 
            className={"selectForm"} 
            onChange={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event)=> changeHandler(event) : (event) => false}
            value={typeof(value) === "object" ? value.type : value} 
        >
            {Array.isArray(data) ? data.map((element, index)=>{
                if(typeof(element) === "string" && element.length > 0) return <option value={element}>{element}</option>
                return null
            }) : null}
        </select>
    )
}