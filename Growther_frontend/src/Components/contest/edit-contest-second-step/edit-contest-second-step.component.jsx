import React, { useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { decode } from "jsonwebtoken";
import { SetStateToEdit } from "../../../redux/contest-edit/contest-edit-actions";
import { Spinner } from "../../spinner/spinner.component";
export const EditContestSecondStep = ({ data })=>{
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
        },
        {
            email: "hijazi@gmail.com",
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
        },
        {
            email: "hijazi@gmail.com",
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
    var {information, isLoading} = useSelector(state => state.contest_edit)
    const tableHead = [
        {label: "Email", key: "email"},
        {label: "Location", key: "location"},
        {label: "Date", key: "date"},
        {label: "Points", key: "points"},
        {label: "Number of actions", key: "NumActions"},
        {label: "Winning status", key: "status"}
    ]
    var MakeCSVFile = ()=>{
        var result = []
        if(Array.isArray(data) && data.length > 0){
            result = data
        }else{
            result = test
        }
        return {
            data: result,
            headers: tableHead,
            filename: 'Participants_Report.csv'
        }
    }
    var dispatch = useDispatch()
    var params = useParams()
    var history = useHistory()
    useEffect(()=>{
        var token = decode(localStorage.getItem("accessToken"))
        var id = token !== null && typeof(token) === "object" ? token.sub : ""
        if(information === null || typeof(information) !== "object" || information.idContest !== parseInt(params.id)){
            SetStateToEdit(dispatch, params.id, id).then(value=>{
                if(!value){
                    history.goBack()
                }
            })
        }
    }, [dispatch])
    return(
        [
            <Spinner show={isLoading} />,
            <div className="is-flex is-flex-direction-column bottomContainer tableContainer">
                <div className="list-title-container is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                    <span className="list-title">Participants</span>
                    <div className="is-flex is-flex-direction-row is-align-items-center">
                        <div className="addNew">
                            <CSVLink {...MakeCSVFile()}>Export a csv</CSVLink>
                        </div>
                        <div id="addNewButton" className="arrow-button-container is-flex is-justify-content-flex-end">
                            <div className="arrow-button">
                                <img src={require("../../../assets/icons/csv.png").default} width={"22px"} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-container">
                    <table id="participationTable" className="table" style={{height: Array.isArray(data) ? data.length * 58.8 : test.length * 58.8}} >
                        <tbody className="tbody">
                            <tr className="tr tds is-flex is-flex-direction-row">
                                {tableHead.map(item =>{
                                    return <th>{item.label}</th>
                                })}
                            </tr>
                            {!Array.isArray(data) ? data.map(item =>{
                                return(
                                <tr className={"tr tds is-flex is-flex-direction-row"}>
                                    {typeof(item) === "object" ? [
                                        <td>
                                            {item.email}
                                        </td>,
                                        <td>
                                            {item.location}
                                        </td>,
                                        <td>
                                            {item.date}
                                        </td>,
                                        <td>
                                            {item.points}
                                        </td>,
                                        <td>
                                            {item.numActions}
                                        </td>,
                                        <td>
                                            {item.status}
                                        </td>
                                    ] : null}
                                </tr>
                            )
                        }) : test.map(item =>{
                            return(
                                <tr className="tr tds is-flex is-flex-direction-row">
                                    {typeof(item) === "object" ? [
                                        <th>
                                            {item.email}
                                        </th>,
                                        <th>
                                            {item.location}
                                        </th>,
                                        <th>
                                            {item.date}
                                        </th>,
                                        <th>
                                            {item.points}
                                        </th>,
                                        <th>
                                            {item.numActions}
                                        </th>,
                                        <th>
                                            {item.status}
                                        </th>
                                    ] : null}
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        ]
    )
}