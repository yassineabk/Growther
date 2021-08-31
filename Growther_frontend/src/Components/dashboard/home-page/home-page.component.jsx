import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { DuplicateContest } from "../../../redux/contest/contest-actions"
import { GetContests } from "../../../redux/contests/contests-actions"
import { CardsContainer } from "../cards-container/cards-container.component"
import { TemplatesContainer } from "../templates-container/templates-container.component"
const DashboardHomePage = () =>{
    var dispatch = useDispatch()
    var {contests, isLoading} = useSelector(state => state.get_contests)
    var { isBrand } = useSelector(state => state.userInfos)
    useEffect(()=>{
        if(((Array.isArray(contests) && contests.length === 0) || !Array.isArray(contests)) && !isLoading){
            GetContests(dispatch)
        } 
    }, [dispatch])
    var Duplicate = (id, element)=> {
        DuplicateContest(dispatch, id, element)
    }
    var {t} = useTranslation()
    return(
        <div className="is-flex is-flex-direction-column column is-full">
            <div className="mb-4">
                <CardsContainer 
                    data={Array.isArray(contests) ? isBrand === "true" ?  contests.reverse().slice(0,3) : contests.reverse() : []} 
                    title={t("recent_contests")} 
                    showMore={"/dashboard/My Contests"} 
                    addNew={"/dashboard/My Contests/new"}
                    Duplicate={(id, element)=> Duplicate(id, element)}
                    isBrand={isBrand}
                />
            </div>
            {isBrand === "true" ? <div className="mb-4">
                <TemplatesContainer title={"Templates"}/>
            </div> : null}
        </div>
    )
}
export default DashboardHomePage;