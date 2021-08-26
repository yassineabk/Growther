import React, { useEffect } from "react"
import { Redirect, useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { SetStateToEdit } from "../../../redux/contest-edit/contest-edit-actions";
import { decode } from "jsonwebtoken";
import { Spinner } from "../../spinner/spinner.component";
import { DrawWinners } from "../../../redux/winners/winners-actions";
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
    }, [dispatch])
    var drawWinners = ()=>{
        DrawWinners(dispatch, params.id)
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
                    {/*winners !== null && winners !== undefined && typeof(winners) === "object" && winners.winners && Array.isArray(winners.winners) && winners.winners.length > 0 ? 
                        winners.winners.map(winner => {
                            if(winner !== null && typeof(winner) === "object"){
                                return (
                                    <div>{winner.rank}</div>
                                )
                            }
                        })
                    */}
                </div>
            </div>
        ]
    )
}
export default EditContestThirdStep;