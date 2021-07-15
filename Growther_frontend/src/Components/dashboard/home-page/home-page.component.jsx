import React from "react"
import { CardsContainer } from "../cards-container/cards-container.component"
import { RecentContests } from "../recent-contests/recent-contests.component"
import { TaskList } from "../task-list/task-list.component"
export const DashboardHomePage = ({contests, templates, todo, recent, brandname}) =>{
    return(
        [
            <div className="is-flex is-flex-direction-column column is-full-desktop is-three-quarters-fullhd">
                <div className="mb-4">
                    <TaskList data={todo} brandname={brandname} />
                </div>
                <div className="mb-4">
                    <CardsContainer data={contests} title={"My Contests"} />
                </div>
                <div className="">
                    <CardsContainer data={templates} title={"Templates"}/>
                </div>
            </div>,
            <div className="column is-full-tablet is-one-quarter-fullhd recentContests">
                <RecentContests data={recent} />
            </div>
        ]
    )
}