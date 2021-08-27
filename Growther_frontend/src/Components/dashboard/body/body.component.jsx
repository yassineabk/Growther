import React from "react"
export const DashboardBody = ({child}) =>{
    var showSideBar = ()=>{
        document.getElementById("sideBar").classList.toggle("showSideBar")
    }
    return(
        <div className="columns is-multiline is-variable is-1-tablet is-2-desktop dashboard_Body">
            <div className="column is-full big_title is-flex is-flex-direction-row">
                <div>Dashboard</div>
                <div onClick={()=> showSideBar()} className="burgerIcon">
                    <img alt="" id="burgerIcon" src={require("../../../assets/icons/burger.png").default} />
                </div>
            </div>
            {child ? child : null}
                {/*<Route exact path='/dashboard' render={()=> (
                    <DashboardHomePage 
                        contests={Array.isArray(contests) ? contests.slice(0,3) : contests} 
                        templates={templates} 
                        todo={todo} 
                        recent={recent} 
                        brandname={brandname}
                    />)} 
                />*/}
                
               
        </div>
    )
}