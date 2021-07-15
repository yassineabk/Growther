import React, { useEffect } from "react"
import { Listwithimages } from "./datalist.component"
export const Dashboard_ContestPage = ({contests}) =>{
    useEffect(()=>{
        //GET Data from API
    })
    return(
        <Listwithimages data={contests} title={"My Contests"} />
    )
}