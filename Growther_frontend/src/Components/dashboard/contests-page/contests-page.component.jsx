import React, { useEffect } from "react"
import { CardsContainer } from "../cards-container/cards-container.component"
export const DashboardContestPage = ({contests}) =>{
    useEffect(()=>{
        //GET Data from API
    })
    return(
        <CardsContainer data={contests} title={"My Contests"} />
    )
}