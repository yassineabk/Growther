import React from "react"
import { useDispatch } from "react-redux"
import { UrlValidation } from "../../../redux/contest/contest-actions"
import { OpenLink } from "../../participation/visit-social-media/visit-social-media.component"
export const TableData = ({tableHead = [], ignore = [], item = {}})=>{
    var dispatch = useDispatch()
    if(!Array.isArray(tableHead)) return null
    return(
        [...tableHead.map((element, index) =>{
            if(element !== null && typeof(element) === "object" && element.key !== undefined && typeof(element.key) === "string"){
                if(item[element.key] === undefined){
                    return <td></td>
                }
                if(item[element.key] && item[element.key] !== null && item[element.key] !== undefined && typeof(item[element.key]) === "string" && !ignore.includes(element.key)){
                    return(
                        <td>
                            {
                                UrlValidation(item[element.key]) ? 
                                    <a href="#" onClick={event => OpenLink(item[element.key], dispatch)} >{item[element.key]}</a> : 
                                    item[element.key]
                            }
                        </td>
                    )
                }
            }
            return null
        })]
    ) 

}