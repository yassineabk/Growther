import React from "react"
import { TodoList } from "./todolist.component"
import { Listwithimages } from "./datalist.component"
import { RecentContests } from "./recentContests.component"
export const Dashboard_FirstPage = ({contests, templates, todo, recent, brandname}) =>{
    return(
        [
            <div className="is-flex is-flex-direction-column column is-full-desktop is-three-quarters-fullhd">
                <div className="mb-4">
                    <TodoList data={todo} brandname={brandname} />
                </div>
                <div className="mb-4">
                    <Listwithimages data={contests} title={"My Contests"} />
                </div>
                <div className="mb-4">
                    <Listwithimages data={templates} title={"Templates"}/>
                </div>
            </div>,
            <div className="column is-full-tablet is-one-quarter-fullhd recentContests">
                <RecentContests data={recent} />
            </div>
        ]
    )
}