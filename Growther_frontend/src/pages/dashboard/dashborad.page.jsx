import React, { Component, useEffect } from "react"
import { DashboradSideBar } from "../../Components/dashboard/side-bar/side-bar.component"
import { DashboardBody } from "../../Components/dashboard/body/body.component"
import { useDispatch, useSelector } from "react-redux"
import { GetContests } from "../../redux/contests/contests-actions"

const Dashboard = ({child})=> {
    var dispatch = useDispatch()
    var infos, { isBrand } = useSelector(state => state.userInfos)
    var {contests, isLoading} = useSelector(state => state.get_contests)
    useEffect(()=>{
        if(((Array.isArray(contests) && contests.length === 0 ) || !Array.isArray(contests)) && !isLoading){
            GetContests(dispatch)
        }
    }, [dispatch])
    return(
        <div className="is-flex is-flex-direction-row">
            <DashboradSideBar isBrand={isBrand} />
            <DashboardBody child={child}/>
        </div>
    )
}
export default Dashboard;