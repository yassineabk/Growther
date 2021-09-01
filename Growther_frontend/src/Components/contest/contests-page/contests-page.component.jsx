import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { DuplicateContest } from "../../../redux/contest/contest-actions"
import { GetContests } from "../../../redux/contests/contests-actions"
import { CardsContainer } from "../../dashboard/cards-container/cards-container.component"

const DashboardContestPage = () =>{
    var dispatch = useDispatch()
    var { contests } = useSelector(state => state.get_contests)
    var { isBrand } = useSelector(state => state.userInfos)
    useEffect(()=>{
        if((Array.isArray(contests) && contests.length === 0) || !Array.isArray(contests)){
            GetContests(dispatch)
        }
    }, [dispatch])
    var Duplicate = (id, data)=> {
        DuplicateContest(dispatch, id, data)
    }
    var {t} = useTranslation()
    if(isBrand !== "true") return <Redirect to="/dashboard" />
    return(
        <div className="is-flex is-flex-direction-column column is-full">
            <div className="mb-4">
                <CardsContainer 
                    data={Array.isArray(contests) ? contests.reverse() : []} 
                    title={t("my_contests")} 
                    addNew={"/dashboard/My%20Contests/new/firstStep"} 
                    Duplicate={(id, data)=> Duplicate(id, data)}
                    isBrand={isBrand}
                />
            </div>
        </div>
    )
}
export default DashboardContestPage;