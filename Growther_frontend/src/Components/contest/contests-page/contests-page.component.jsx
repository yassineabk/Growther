import React, { useEffect } from "react"
import { CardsContainer } from "../../dashboard/cards-container/cards-container.component"
export const DashboardContestPage = ({contests}) =>{
    useEffect(()=>{
        //GET Data from API
    })
    console.log(contests)
    return(
        <div className="is-flex is-flex-direction-column column is-full">
            <div className="mb-4">
                <CardsContainer data={contests} title={"My Contests"} addNew={"/dashboard/My%20Contests/new/firstStep"} />
            </div>
        </div>
    )
}