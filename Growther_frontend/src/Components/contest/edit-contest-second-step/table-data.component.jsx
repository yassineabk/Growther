import React from "react"
export const TableData = ({tableHead = [], ignore = [], item = {}})=>{
    if(!Array.isArray(tableHead)) return null
    console.log(tableHead)
    return(
        [...tableHead.map((element, index) =>{
            if(element !== null && typeof(element) === "object" && element.key !== undefined && typeof(element.key) === "string"){
                if(item[element.key] && item[element.key] !== null && item[element.key] !== undefined && !ignore.includes(element.key)){
                    return(
                        <td>
                            {item[element.key]}
                        </td>
                    )
                }
            }
            return null
        })]
    ) 

}