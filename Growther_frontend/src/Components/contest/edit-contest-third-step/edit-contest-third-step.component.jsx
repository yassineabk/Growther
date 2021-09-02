import React, { useEffect } from "react"
import { Redirect, useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { SetStateToEdit } from "../../../redux/contest-edit/contest-edit-actions";
import { decode } from "jsonwebtoken";
import { Spinner } from "../../spinner/spinner.component";
import { DrawWinners, ResetWinners } from "../../../redux/winners/winners-actions";
import { TimeLeft } from "../../../services/timeLeft";
import { useTranslation } from "react-i18next";
import { FailAlert } from "../../../redux/alert/alert-actions";
const EditContestThirdStep = ()=>{
    var {information, isLoading} = useSelector(state => state.contest_edit)
    var { isBrand, direction } = useSelector(state => state.userInfos)
    var { winners } = useSelector(state => state)
    var params = useParams()
    var dispatch = useDispatch()
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
        if(params.id !== winners.idContest || typeof(winners.idContest) !== "string" || winners.idContest === null || winners.idContest === undefined){
            ResetWinners(dispatch)
        }
    }, [dispatch])
    var drawWinners = ()=>{
        var endDate = information !== null && typeof(information) === "object" && information.endDate !== null && typeof(information.endDate) === "string" ? information.endDate.trim().replace(" ","T") : false
        var endTime = information !== null && typeof(information) === "object" && information.endTime !== null && typeof(information.endTime) === "string" ? information.endTime : false
        var isDone = information !== null && typeof(information) === "object" ? information.status : false
        if(TimeLeft(endDate, endTime).date === "Ended" || (typeof(isDone) === "string" && isDone !== null && isDone.toLowerCase() === "done")){
            DrawWinners(dispatch, params.id)
        }else{
            FailAlert(dispatch, "not_ended_yet")
        }
    }
    var {t} = useTranslation()
    if(isBrand !== "true") return <Redirect to="/dashboard" />
    if(typeof(information) !== "object") return <Redirect to={"/dashboard"} />
    if(information.participationId !== undefined) return <Redirect to={"/dashboard"} />
    return(
        [
            <Spinner show={isLoading || winners.isLoading} />,
            <div dir={direction ? direction : "ltr"} className="is-flex is-flex-direction-column bottomContainer tableContainer contest-result">
                <div className="list-title-container winners-container is-flex is-flex-direction-column is-align-items-center">
                    <span dir={direction ? direction : "ltr"} className="winners-container-title">
                        <h3>{t("winners")}</h3>
                    </span>
                    {information !== null && information !== undefined && typeof(information) === "object" ? 
                        [
                            <span dir={direction ? direction : "ltr"} className="winners-container-subtitle">
                                <h5>{`${t("your_contest_has_winners")} ${information.winnersNbr} ${information.winnersNbr > 1 ? t("winners") : t("winner")}`} </h5>
                            </span>,
                            <div dir={direction ? direction : "ltr"} onClick={()=> drawWinners()} className="is-flex draw-button">
                                <span>
                                    <img alt="" src={require("../../../assets/icons/trophy3.png").default} />
                                </span>
                                <span className="">
                                    {t("draw_winners")}
                                </span>
                            </div>
                        ] : null
                    }
                    {winners !== null && winners !== undefined && typeof(winners) === "object" && winners.winners && Array.isArray(winners.winners) && winners.winners.length > 0 ? 
                        <div className="table-container mt-5">
                            <table id="participationTable" className="table" style={{height: Array.isArray(winners.winners) ? winners.length * 58.8 : 58.8}} >
                                <tbody className="tbody winners-table">
                                    <tr className={`tr-winners tds is-flex`}>
                                        {[{label: "Rank"}, {label: "Email"}, {label: "Prize"}].map(item =>{
                                            return <th>{item.label}</th>
                                        })}
                                    </tr>
                                    {Array.isArray(winners.winners) ? winners.winners.map(item =>{
                                        return(
                                            <tr className={`tr-winners tds is-flex`}>
                                                {item !== null && typeof(item) === "object" ? [
                                                    <td>
                                                        {item.rank}
                                                    </td>,
                                                    <td>
                                                        {item.email}
                                                    </td>,
                                                    <td>
                                                        {typeof(item.prize) === "object" && item.prize !== null ? item.prize.description : ""}
                                                    </td>,
                                                ]  : null}
                                            </tr>
                                        )
                                }) : null}
                                </tbody>
                            </table>
                        </div> : null
                    }
                </div>
            </div>
        ]
    )
}
export default EditContestThirdStep;