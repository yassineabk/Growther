import React, { Component } from "react"
import { DashboradSideBar } from "../../Components/dashboard/side-bar/side-bar.component"
import { DashboardBody } from "../../Components/dashboard/body/body.component"
import { useSelector } from "react-redux"

const Dashboard = ({child})=> {
    return(
        <div className="is-flex is-flex-direction-row">
            <DashboradSideBar />
            <DashboardBody child={child}/>
        </div>
    )
}
export default Dashboard;