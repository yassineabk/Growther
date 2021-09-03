import React, { useEffect, useState } from "react"
import { Redirect, useHistory, useParams } from "react-router-dom"
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { decode } from "jsonwebtoken";
import { SetStateToEdit } from "../../../redux/contest-edit/contest-edit-actions";
import { Spinner } from "../../spinner/spinner.component";
import { MakeResultState } from "../../../services/result";
import { TableData } from "./table-data.component";
import { useTranslation } from "react-i18next";
const EditContestSecondStep = ()=>{
    var { information, isLoading } = useSelector(state => state.contest_edit)
    var { isBrand, direction } = useSelector(state => state.userInfos)
    var [data, setData] = useState([])
    var [tableHead, setTableHead] = useState([])
    var params = useParams()
    var dispatch = useDispatch()
    var history = useHistory()
    var MakeCSVFile = ()=>{
        var result = []
        if(Array.isArray(data) && data.length > 0){
            result = data
        }
        return {
            data: result,
            headers: tableHead,
            filename: `${information.title}.csv`
        }
    }
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
        MakeResultState(params.id).then(res =>{
            if(res !== undefined && res !== null && typeof(res) === "object"){
                setData(res.result)
                setTableHead(res.tableHead)
            }
        })
    }, [dispatch])
    var {t} = useTranslation()
    if(isBrand !== "true") return <Redirect to="/dashboard" />
    if(typeof(information) !== "object") return <Redirect to={"/dashboard"} />
    if(information.participationId !== undefined) return <Redirect to={"/dashboard"} />
    return(
        [
            <Spinner show={isLoading} />,
            <div dir={direction ? direction : "ltr"} className="is-flex is-flex-direction-column bottomContainer tableContainer contest-result">
                <div className="list-title-container is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                    <span className="list-title">{t("participants")}</span>
                    <div className="is-flex is-flex-direction-row is-align-items-center">
                        <div className="addNew">
                            <CSVLink {...MakeCSVFile()}>{t("export_csv")}</CSVLink>
                        </div>
                        <div id="addNewButton" className="arrow-button-container is-flex is-justify-content-flex-end">
                            <div className="arrow-button">
                                <img alt="" src={require("../../../assets/icons/csv.png").default} width={"22px"} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-container">
                    <table id="participationTable" className="table" style={{height: Array.isArray(data) ? data.length * 58.8 : "100%"}} >
                        <tbody className="tbody">
                            <tr className={`tr ths is-flex`}>
                                {tableHead.map(item =>{
                                    return <th>{item.label}</th>    
                                })}
                            </tr>
                            {Array.isArray(data) ? data.map((item, index) =>{
                                return(
                                <tr className={`tr tds is-flex`}>
                                    {item !== null && typeof(item) === "object" ? [
                                        <td>
                                            {item.email}
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
                                        </td>,
                                        <TableData 
                                            ignore={["email", "date", "points", "numActions", "status"]}
                                            item={item}
                                            tableHead={tableHead}
                                        />
                                    ]  : null}
                                </tr>
                            )
                        }) : null}
                        </tbody>
                    </table>
                </div>
            </div>
        ]
    )
}
export default EditContestSecondStep;