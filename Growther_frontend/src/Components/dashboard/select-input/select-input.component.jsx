import React from "react"
export const SelectInput = ({data})=>{
    return(
        <select className={"selectForm"}>
            {Array.isArray(data) ? data.map((element, index)=>{
                return <option value={typeof(element) === "string" ? element : ""} >{typeof(element) === "string" ? element : ""}</option>
            }) : null}
        </select>
    )
}