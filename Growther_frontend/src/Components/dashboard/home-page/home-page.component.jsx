import React from "react"
import { CardsContainer } from "../cards-container/cards-container.component"
import { TemplatesContainer } from "../templates-container/templates-container.component"
export const DashboardHomePage = ({contests, templates}) =>{
    return(
        [
            <div className="is-flex is-flex-direction-column column is-full">
                {/*<div className="mb-4">
                    <TaskList data={todo} brandname={brandname} />
                </div>*/}
                <div className="mb-4">
                    <CardsContainer 
                        data={contests} 
                        title={"Recent Contests"} 
                        showMore={"/dashboard/My Contests"} 
                        addNew={"/dashboard/My Contests/new"}
                    />
                </div>
                <div className="mb-4">
                    <TemplatesContainer data={templates} title={"Templates"}/>
                </div>
            </div>,
            /*<div className="column is-full recentContests">
                <RecentContests data={recent} />
            </div>*/
        ]
    )
}