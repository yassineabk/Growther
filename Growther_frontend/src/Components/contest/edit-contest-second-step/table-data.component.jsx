import React from "react"
export const TableData = ({data})=>{
    if(!Array.isArray(data)) return null
    return(
        data.map(item =>{
            if(!item || typeof(item) !== "string" || item === null) return null
            return <td>{item}</td>
        })
    )
}