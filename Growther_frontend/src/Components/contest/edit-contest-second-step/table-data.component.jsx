import React from "react"
export const TableData = ({tableHead = [], ignore = [], item = {}})=>{
    if(!Array.isArray(tableHead)) return null
    return(
        tableHead.sort((a = {}, b = {})=> a.key < b.key ? 1 : -1).map(element =>{
            if(element !== null && typeof(element) === "object" && element.key !== undefined && typeof(element.key) === "string" && !ignore.includes(element.key)){
                if(item[element.key] && item[element.key] !== null && item[element.key] !== undefined){
                    return(
                        <td>
                            {item[element.key]}
                        </td>
                    )
                }
            }
            return null
        })
    ) 

}