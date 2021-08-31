import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { 
    useParams,
} 
from "react-router-dom"
import { NewContestTabs } from "../new-contest-tabs/new-contest-tabs.component"
const EditContest = ({child})=>{
    var params = useParams()
    var { information } = useSelector(state => state.contest_edit)
    var {t} = useTranslation()
    if(typeof(information) !== "object") return null
    return(
        <div className="column is-full is-flex is-flex-direction-column list-container newContest is-size-6 mb-4">
            <NewContestTabs 
                tabs={[
                    {
                        location: `/dashboard/My Contests/edit/${params.id}`, 
                        text: t("edit_contest"),
                    },
                    {
                        location: `/dashboard/My Contests/result/${params.id}`, 
                        text: t("contest_result")
                    },
                    {
                        location: `/dashboard/My Contests/winners/${params.id}`, 
                        text: t("contest_winners")
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