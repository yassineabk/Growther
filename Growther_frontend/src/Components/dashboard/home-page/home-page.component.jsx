import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetContests } from "../../../redux/contests/contests-actions"
import { CardsContainer } from "../cards-container/cards-container.component"
import { TemplatesContainer } from "../templates-container/templates-container.component"
export const DashboardHomePage = () =>{
    var dispatch = useDispatch()
    var {contests} = useSelector(state => state.get_contests)
    useEffect(()=>{
        if((Array.isArray(contests) && contests.length === 0) || !Array.isArray(contests)){
            GetContests(dispatch)
        }
    }, [dispatch])
    return(
        <div className="is-flex is-flex-direction-column column is-full">
            {/*<div className="mb-4">
                <TaskList data={todo} brandname={brandname} />
            </div>*/}
            <div className="mb-4">
                <CardsContainer 
                    data={Array.isArray(contests) ? contests.reverse().slice(0,3) : []} 
                    title={"Recent Contests"} 
                    showMore={"/dashboard/My Contests"} 
                    addNew={"/dashboard/My Contests/new"}
                />
            </div>
            <div className="mb-4">
                <TemplatesContainer title={"Templates"}/>
            </div>
        </div>
        /*<div className="column is-full recentContests">
            <RecentContests data={recent} />
        </div>*/
    )
}