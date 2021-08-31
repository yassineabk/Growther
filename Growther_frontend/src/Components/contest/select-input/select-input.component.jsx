import React from "react"
import { useTranslation } from "react-i18next"
export const SelectInput = ({data, value, changeHandler, placeholder})=>{
    var {t} = useTranslation()
    return(
        <select 
            className={"selectForm"} 
            onChange={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event)=> changeHandler(event) : (event) => false}
            value={typeof(value) === "object" ? value.type : value} 
        >
            {placeholder ? 
                <option disabled>
                    {placeholder}
                </option> : null
            }
            {Array.isArray(data) ? data.map((element, index)=>{
                if(typeof(element) === "string" && element.length > 0) return <option value={element}>{t(element)}</option>
                if(typeof(element) === "object" && element !== null && element.value && element.label && typeof(element.value) === "string" && typeof(element.label) === "string") return <option value={element.value}>{t(element.label)}</option>
                return null
            }) : null}
        </select>
    )
}