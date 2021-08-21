import React, { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { SetStateToEdit } from "../../../redux/contest-edit/contest-edit-actions";
import { decode } from "jsonwebtoken";
import { Spinner } from "../../spinner/spinner.component";
export const EditContestThirdStep = ()=>{
    var {information, isLoading} = useSelector(state => state.contest_edit)
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
    return(
        [
            <Spinner show={isLoading} />,
            <div className="is-flex is-flex-direction-column bottomContainer tableContainer">
                <div className="list-title-container winners-container is-flex is-flex-direction-column is-align-items-center">
                    <span className="winners-container-title">
                        <h3>Winners</h3>
                    </span>
                    {information !== null && typeof(information) === "object" ? 
                        [
                            <span className="winners-container-subtitle">
                                <h5>Your contest has {`${information.winnersNbr} ${information.winnersNbr > 1 ? "winners" : "winner"}`} </h5>
                            </span>,
                            <div className="is-flex draw-button">
                                <span>
                                    <img src={require("../../../assets/icons/trophy3.png").default} />
                                </span>
                                <span className="">
                                    Draw winners
                                </span>
                            </div>
                        ] : null
                    }
                </div>
            </div>
        ]
    )
}