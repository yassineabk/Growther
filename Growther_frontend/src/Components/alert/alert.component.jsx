import React from "react"
export const AlertComponent = ({alerts})=>{
    if(!alerts || alerts === null || !Array.isArray(alerts) || (Array.isArray(alerts) && alerts.length === 0)) return null
    return(
        <div id="alerts-container" className="is-flex is-flex-direction-column">
            {alerts.map((item, index) =>{
                if(item && item !== null && typeof(item) === "object"){
                    if(item.message && item.show){
                        if(item.isSuccess){
                            return(
                                <div key={`alert-${index}}`} id="alert-success" className="alert">
                                    {item.message}
                                </div>
                            )
                        }
                        if(item.isFail){
                            return(
                                <div key={`alert-${index}}`} id="alert-fail" className="alert">
                                    {item.message}
                                </div>
                            )
                        }
                    }
                }
                return null
            })}
        </div>

    )
}