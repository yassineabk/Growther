import { decode } from "jsonwebtoken"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { GetContests } from "../../../redux/contests/contests-actions"
import { NumbersConverter } from "../../../services/numbers-converter"
import { TimeLeft } from "../../../services/timeLeft"
import { EmptyList } from "../../contest/empty-list/empty-list.component"
import { Spinner } from "../../spinner/spinner.component"
import { CardTitle } from "../card-title/card-title.component"
import { CardComponent } from "../card/card.component"
export const CardsContainer = ({data, title, showMore, addNew, Duplicate, Delete, isBrand})=>{
    var { isLoading } = useSelector(state => state.get_contests)
    var [userId, setId] = useState("")
    var [hours, setHours] = useState("")
    var [intervalIndex, setIntervalIndex] = useState(0)
    var [activeElement, setActiveElement] = useState({})
    useEffect(()=>{
        var token = decode(localStorage.getItem("accessToken"))
        if(token !== null && typeof(token) === "object"){
            var sub = token.sub
            setId(sub)
        }
    }, [userId])
    var {t} = useTranslation()
    var {direction} = useSelector(state => state.userInfos)
    var onMouseOver = (element)=>{
        setActiveElement(element)
        var realSeconds = (new Date(element && typeof(element) === "object" && element !== null && element.endDate && typeof(element.endDate) === "string" ? element.endDate.trim().replace(" ", "T") : "") - new Date())
        if(realSeconds <= 0){
            setHours("00:00:00")
            onMouseLeave()
            return true
        }
        var seconds = parseInt((new Date(element && typeof(element) === "object" && element !== null && element.endDate && typeof(element.endDate) === "string" ? element.endDate.trim().replace(" ", "T") : "") - new Date())/1000)
        var hours = ("0"+parseInt(seconds / 3600)).slice(-2)
        seconds = seconds % 3600
        var minutes = ("0"+parseInt(seconds / 60)).slice(-2)
        seconds = ("0" + parseInt(seconds % 60)).slice(-2)
        var value = `${hours}:${minutes}:${seconds}`
        setHours(`${value}`)
        var interval = setInterval(()=>{
            if(activeElement !== null && typeof(activeElement) === "object"){
                setHours(prev =>{
                    var realSeconds = (new Date(element && typeof(element) === "object" && element !== null && element.endDate && typeof(element.endDate) === "string" ? element.endDate.trim().replace(" ", "T") : "") - new Date())
                    if(realSeconds <= 0){
                        onMouseLeave()
                        return "00:00:00"
                    }
                    var seconds = parseInt(realSeconds/1000)
                    var hours = ("0"+parseInt(seconds / 3600)).slice(-2)
                    seconds = seconds % 3600
                    var minutes = ("0"+parseInt(seconds / 60)).slice(-2)
                    seconds = ("0" + parseInt(seconds % 60)).slice(-2)
                    var value = `${hours}:${minutes}:${seconds}`
                    return `${value}`
                })
            }else{
                onMouseLeave()
            }
        }, 1000)
        setIntervalIndex(interval)
    }
    var onMouseLeave = ()=>{
        clearInterval(intervalIndex)
    }
    var dispatch = useDispatch()
    return(
        <div className="is-flex is-flex-direction-column list-container">
            <Spinner show={isLoading} />
            <CardTitle title={title} addNew={addNew} refresh={()=> GetContests(dispatch)} showMore={showMore} />
            <div className="columns is-multiline is-flex is-flex-row cards">
                {Array.isArray(data) && data.length > 0 ? data.map((element, index)=>{
                    if(element === null && typeof(element) !== "object") return null
                    return(
                        <CardComponent 
                            element={element}
                            title={element.title}
                            date={element.date}
                            views={element.views}
                            endDate={hours}
                            entries={NumbersConverter(element.numOfParticipation)}
                            description={element.description}
                            timeLeft={TimeLeft(element.endDate && typeof(element.endDate) === "string" ? element.endDate.trim().replace(" ", "T") : "", element.endTime)}
                            id={element.idContest ? element.idContest : undefined}
                            userId={userId}
                            status={typeof(element.status) === "string" ? element.status : "Draft"}
                            key={element.idContest ? `card${element.idContest}` : `card${index}`}
                            Duplicate={Duplicate && {}.toString.call(Duplicate) === '[object Function]' ? (id)=> {Duplicate(id,  element)} : () => false}
                            Delete={(id)=> Delete(id)}
                            isBrand={isBrand}
                            onMouseLeave={()=> onMouseLeave()}
                            onMouseOver={(element)=> onMouseOver(element)}
                            duplicateText={t("duplicate")}
                            detailsText={t("details")}
                            deleteText={t("delete")}
                            continueText={t("continue")}
                            pointsText={t("points")}
                            entriesText={t("entries")}
                            timeText={t("time")}
                            viewsText={t("views")}
                            direction={direction}
                        />                    
                    )
                }): <EmptyList isLoading={isLoading} /> }
            </div>
        </div>
    )
}