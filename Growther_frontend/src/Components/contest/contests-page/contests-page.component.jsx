import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DuplicateContest } from "../../../redux/contest/contest-actions"
import { CardsContainer } from "../../dashboard/cards-container/cards-container.component"
export const DashboardContestPage = () =>{
    var dispatch = useDispatch()
    var {contests, isLoading} = useSelector(state => state.get_contests)
    var Duplicate = (id, data)=> {
        DuplicateContest(dispatch, id, data)
    }
    return(
        <div className="is-flex is-flex-direction-column column is-full">
            <div className="mb-4">
                <CardsContainer 
                    data={Array.isArray(contests) ? contests.reverse() : []} 
                    title={"My Contests"} addNew={"/dashboard/My%20Contests/new/firstStep"} 
                    Duplicate={(id, data)=> Duplicate(id, data)}
                />
            </div>
        </div>
    )
}