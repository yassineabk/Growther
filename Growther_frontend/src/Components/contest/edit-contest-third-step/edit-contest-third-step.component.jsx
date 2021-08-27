import React, { useEffect } from "react"
import { Redirect, useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { SetStateToEdit } from "../../../redux/contest-edit/contest-edit-actions";
import { decode } from "jsonwebtoken";
import { Spinner } from "../../spinner/spinner.component";
import { DrawWinners, ResetWinners } from "../../../redux/winners/winners-actions";
import { TimeLeft } from "../../../services/timeLeft";
const EditContestThirdStep = ()=>{
    var {information, isLoading} = useSelector(state => state.contest_edit)
    var { isBrand } = useSelector(state => state.userInfos)
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
        if(params.id !== winners.idContest || typeof(winners.idContest) !== "string" || winners.idContest !== null || winners.idContest){
            ResetWinners(dispatch)
        }
    }, [dispatch])
    var drawWinners = ()=>{
        var endDate = information !== null && typeof(information) === "object" && information.endDate !== null && typeof(information.endDate) === "string" ? information.endDate.trim().replace(" ","T") : false
        var endTime = information !== null && typeof(information) === "object" && information.endTime !== null && typeof(information.endTime) === "string" ? information.endTime : false
        var isDone = information !== null && typeof(information) === "object" ? information.status : false
        console.log(TimeLeft(endDate, endTime))
        if(TimeLeft(endDate, endTime).date === "Ended" || (typeof(isDone) === "string" && isDone !== null && isDone.toLowerCase() === "done")){
            DrawWinners(dispatch, params.id)
        }
    }
    if(isBrand !== "true") return <Redirect to="/" />
    return(
        [
            <Spinner show={isLoading || winners.isLoading} />,
            <div className="is-flex is-flex-direction-column bottomContainer tableContainer">
                <div className="list-title-container winners-container is-flex is-flex-direction-column is-align-items-center">
                    <span className="winners-container-title">
                        <h3>Winners</h3>
                    </span>
                    {information !== null && information !== undefined && typeof(information) === "object" ? 
                        [
                            <span className="winners-container-subtitle">
                                <h5>Your contest has {`${information.winnersNbr} ${information.winnersNbr > 1 ? "winners" : "winner"}`} </h5>
                            </span>,
                            <div onClick={()=> drawWinners()} className="is-flex draw-button">
                                <span>
                                    <img alt="" src={require("../../../assets/icons/trophy3.png").default} />
                                </span>
                                <span className="">
                                    Draw winners
                                </span>
                            </div>
                        ] : null
                    }
                    {winners !== null && winners !== undefined && typeof(winners) === "object" && winners.winners && Array.isArray(winners.winners) && winners.winners.length > 0 ? 
                        <div className="table-container mt-5">
                            <table id="participationTable" className="table" style={{height: Array.isArray(winners.winners) ? winners.length * 58.8 : 58.8}} >
                                <tbody className="tbody">
                                    <tr className="tr tds is-flex is-flex-direction-row">
                                        {[{label: "Rank"}, {label: "Email"}, {label: "Prize"}].map(item =>{
                                            return <th>{item.label}</th>
                                        })}
                                    </tr>
                                    {Array.isArray(winners.winners) ? winners.winners.map(item =>{
                                        return(
                                        <tr className={"tr tds is-flex is-flex-direction-row"}>
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