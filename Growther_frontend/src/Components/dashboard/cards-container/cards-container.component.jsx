import { decode } from "jsonwebtoken"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { EmptyList } from "../../contest/empty-list/empty-list.component"
import { Spinner } from "../../spinner/spinner.component"
import { CardTitle } from "../card-title/card-title.component"
import { CardComponent } from "../card/card.component"
export const CardsContainer = ({data, title, showMore, addNew, Duplicate, Delete})=>{
    var { isLoading } = useSelector(state => state.get_contests)
    var [userId, setId] = useState("")
    useEffect(()=>{
        var token = decode(localStorage.getItem("accessToken"))
        if(token !== null && typeof(token) === "object"){
            var sub = token.sub
            setId(sub)
        }
    })
    var TimeLeft = (d, endTime)=>{
        if(d && endTime){
            var currentDate = new Date()
            var currentDay = ("0"+currentDate.getDate()).slice(-2)
            var currentMonth = ("0"+parseInt(currentDate.getMonth() + 1 === 13 ? 1 : currentDate.getMonth() + 1)).slice(-2)
            var currentYear = currentDate.getFullYear()
            var currentHour = currentDate.getHours()
            var currentMin = currentDate.getMinutes()
            var date = new Date(`${currentYear}-${currentMonth}-${currentDay}`)
            var daysDiff = Math.ceil((new Date(d) - date)/(1000*60*60*24))
            var weeksDiff = Math.ceil(Math.abs(date - new Date(d))/(1000*60*60*24*7))
            var monthsDiff = Math.ceil(Math.abs(date - new Date(d))/(1000*60*60*24*30))
            if(daysDiff < 0){
                return {date: "Ended", type: ""}
            }
            if(daysDiff === 0){
                endTime = endTime.split(":")
                if(parseInt(endTime[0]) === parseInt(currentHour)){
                    var timeDiff = parseInt(endTime[1]) - parseInt(currentMin)
                    if(timeDiff > 1) return {date: timeDiff, type: "minutes"}
                    if(timeDiff === 1) return {date: timeDiff, type: "minute"}
                    if(timeDiff < 1) return {date: "Ended", type: ""}
                }
                var timeDiff = parseInt(endTime[1]) - parseInt(currentHour)
                if(timeDiff > 1) return {date: timeDiff, type: "hours"}
                if(timeDiff === 1) return {date: timeDiff, type: "hour"}
                if(timeDiff < 1) return {date: "Ended", type: ""}
            }
            if(daysDiff % 30 === 0){
                if(monthsDiff > 1) return {date: monthsDiff, type: "months"}
                return {date: monthsDiff, type: "month"}
            }
            if(daysDiff % 7 === 0){
                if(weeksDiff > 1) return {date: weeksDiff, type: "weeks"}
                return {date: weeksDiff, type: "week"}
            }
            if(daysDiff > 1) return {date: daysDiff, type: "days"}
            return {date: daysDiff, type: "day"}
        }
        return {date: "", type: ""}
    }
    return(
        <div className="is-flex is-flex-direction-column list-container">
            <Spinner show={isLoading} />
            <CardTitle title={title} addNew={addNew} showMore={showMore} />
            <div className="columns is-multiline is-flex is-flex-row cards">
                {Array.isArray(data) && data.length > 0 ? data.map((element, index)=>{
                    if(element === null && typeof(element) !== "object") return null
                    return(
                        <CardComponent 
                            element={element}
                            title={element.title}
                            date={element.date}
                            views={element.views}
                            description={element.description}
                            date={TimeLeft(element.endDate, element.endTime).date}
                            dateType={TimeLeft(element.endDate, element.endTime).type}
                            entries={element.entries}
                            id={element.idContest ? element.idContest : undefined}
                            userId={userId}
                            status={typeof(element.status) === "string" ? element.status : "Draft"}
                            key={element.idContest ? `card${element.idContest}` : `card${index}`}
                            Duplicate={Duplicate && {}.toString.call(Duplicate) === '[object Function]' ? (id)=> {Duplicate(id,  element)} : () => false}
                            Delete={(id)=> Delete(id)}
                        />                    
                    )
                }): <EmptyList isLoading={isLoading} /> /*test.slice(0,3).map((element, index)=>{
                    if(typeof(element) !== "object") return null
                    return(
                        <CardComponent 
                            title={element.title}
                            date={element.duration.value}
                            dateType={element.duration.type}
                            views={element.views}
                            description={element.description}
                            entries={element.entries}
                            id={`card${index}`}
                        />                    
                    )
                })*/}
            </div>
        </div>
    )
}