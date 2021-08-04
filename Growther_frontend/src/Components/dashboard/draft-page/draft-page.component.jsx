import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DuplicateContest } from "../../../redux/contest/contest-actions"
import { DeleteDraft, GetContests } from "../../../redux/contests/contests-actions"
import { CardsContainer } from "../cards-container/cards-container.component"
export const DraftPage = ()=>{
    var dispatch = useDispatch()
    var {contests, isLoading, draft} = useSelector(state => state.get_contests)
    useEffect(()=>{
        if((Array.isArray(contests) && contests.length === 0) || !Array.isArray(contests)){
            GetContests(dispatch)
        }
    }, [dispatch])
    var Duplicate = (id)=> {
        DuplicateContest(dispatch, id)
    }
    var Delete = (id)=>{
        DeleteDraft(dispatch, id)
    }
    return(
        <div className="is-flex is-flex-direction-column column is-full">
            <div className="mb-4">
                <CardsContainer 
                    data={Array.isArray(draft) ? draft.reverse() : []} 
                    title={"My Contests"} addNew={"/dashboard/My%20Contests/new/firstStep"} 
                    Duplicate={(id)=> Duplicate(id)}
                    Delete={(id)=> Delete(id)}
                    status={"Draft"}
                />
            </div>
        </div>
    )
}