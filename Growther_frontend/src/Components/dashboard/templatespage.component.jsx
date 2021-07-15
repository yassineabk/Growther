import React, { useEffect } from "react"
import { Listwithimages } from "./datalist.component"
export const Dashboard_TemplatesPage = ({templates}) =>{
    useEffect(()=>{
        //GET Data from API
    })
    return(
        <Listwithimages data={templates} title={"Templates"} />
    )
}