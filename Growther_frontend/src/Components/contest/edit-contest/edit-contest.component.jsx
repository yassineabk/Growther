import React from "react"
import { useSelector } from "react-redux"
import { 
    BrowserRouter as Router,
    useParams,
} 
from "react-router-dom"
import { NewContestTabs } from "../new-contest-tabs/new-contest-tabs.component"
const EditContest = ({child})=>{
    var params = useParams()
    var { information } = useSelector(state => state.contest_edit)
    if(typeof(information) !== "object") return null
    return(
        <div className="column is-full is-flex is-flex-direction-column list-container newContest is-size-6 mb-4">
            <NewContestTabs 
                tabs={[
                    {
                        location: `/dashboard/My Contests/edit/${params.id}`, 
                        text: "Edit Contest",
                    },
                    {
                        location: `/dashboard/My Contests/result/${params.id}`, 
                        text: "Contest Result"
                    },
                    {
                        location: `/dashboard/My Contests/winners/${params.id}`, 
                        text: "Contest Winners"
                    }
                ]}
            />
            <div className="is-flex bottomContainer">
                {child}
            </div>
        </div>
    )
}
export default EditContest;