import React, { useEffect } from "react"
import { CardsContainer } from "../cards-container/cards-container.component"
export const DashboardTemplatesPage = ({templates}) =>{
    useEffect(()=>{
        //GET Data from API
    })
    return(
        <CardsContainer data={templates} title={"Templates"} />
    )
}