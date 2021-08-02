import React from "react"
import { Link } from "react-router-dom"
export const EditContestSecondStep = ({data})=>{
    var test = [
        {
            email: "abkari@gmail.com",
            location: "Agadir",
            date: "22 June 2021",
            points: 5,
            numActions: "2 of 5",
            status: "pending"
        },
        {
            email: "hijazi@gmail.com",
            location: "Agadir",
            date: "22 June 2021",
            points: 5,
            numActions: "2 of 5",
            status: "pending"
        }
    ]
    return(
        <div className="is-flex is-flex-direction-column bottomContainer tableContainer">
            <div className="list-title-container is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                <span className="list-title">Participants</span>
                <div className="is-flex is-flex-direction-row is-align-items-center">
                    <div className="addNew">
                        <Link to="#">Export a csv</Link>
                    </div>
                    <div id="addNewButton" className="arrow-button-container is-flex is-justify-content-flex-end">
                        <div className="arrow-button">
                            <img src={require("../../../assets/icons/csv.png").default} widdiv={"22px"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-container">
                <div className="table">
                    <div className="tbody">
                        <div className="tr is-flex is-flex-direction-row">
                            <div>Email</div>
                            <div>Location</div>
                            <div>Date</div>
                            <div>Points</div>
                            <div>Number of actions</div>
                            <div>Winning status</div>
                        </div>
                        {!Array.isArray(data) ? data.map(item =>{
                            return(
                            <div className={"tr tds is-flex is-flex-direction-row"}>
                                {typeof(item) === "object" ? [
                                    <div>
                                        {item.email}
                                    </div>,
                                    <div>
                                        {item.location}
                                    </div>,
                                    <div>
                                        {item.date}
                                    </div>,
                                    <div>
                                        {item.points}
                                    </div>,
                                    <div>
                                        {item.numActions}
                                    </div>,
                                    <div>
                                        {item.status}
                                    </div>
                                ] : null}
                            </div>
                        )
                    }) : test.map(item =>{
                        return(
                            <div className="tr tds is-flex is-flex-direction-row">
                                {typeof(item) === "object" ? [
                                    <div>
                                        {item.email}
                                    </div>,
                                    <div>
                                        {item.location}
                                    </div>,
                                    <div>
                                        {item.date}
                                    </div>,
                                    <div>
                                        {item.points}
                                    </div>,
                                    <div>
                                        {item.numActions}
                                    </div>,
                                    <div>
                                        {item.status}
                                    </div>
                                ] : null}
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}