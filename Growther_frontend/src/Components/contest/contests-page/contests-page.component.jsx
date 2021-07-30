import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetContests } from "../../../redux/contests/contests-actions"
import { CardsContainer } from "../../dashboard/cards-container/cards-container.component"
export const DashboardContestPage = () =>{
    var dispatch = useDispatch()
    var {contests} = useSelector(state => state.get_contests)
    useEffect(()=>{
        if((Array.isArray(contests) && contests.length === 0) || !Array.isArray(contests)){
            GetContests(dispatch)
        }
    }, [dispatch])
    return(
        <div className="is-flex is-flex-direction-column column is-full">
            <div className="mb-4">
                <CardsContainer data={Array.isArray(contests) ? contests.reverse() : []} title={"My Contests"} addNew={"/dashboard/My%20Contests/new/firstStep"} />
            </div>
        </div>
    )
}