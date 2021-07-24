import React from "react"
export const SelectInput = ({data, value, changeHandler})=>{
    return(
        <select 
            className={"selectForm"} 
            onChange={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event)=> changeHandler(event) : (event) => false}
            value={value} 
        >
            {Array.isArray(data) ? data.map((element, index)=>{
                return <option value={typeof(element) === "string" ? element : ""} >{typeof(element) === "string" ? element : ""}</option>
            }) : null}
        </select>
    )
}