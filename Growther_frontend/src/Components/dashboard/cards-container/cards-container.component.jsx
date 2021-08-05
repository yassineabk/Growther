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
        if(typeof(token) === "object"){
            var sub = token.sub
            setId(sub)
        }
    })
    return(
        <div className="is-flex is-flex-direction-column list-container">
            <Spinner show={isLoading} />
            <CardTitle title={title} addNew={addNew} showMore={showMore} />
            <div className="columns is-multiline is-flex is-flex-row cards">
                {Array.isArray(data) && data.length > 0 ? data.map((element, index)=>{
                    if(typeof(element) !== "object") return null
                    return(
                        <CardComponent 
                            element={element}
                            title={element.title}
                            date={element.date}
                            views={element.views}
                            description={element.description}
                            date={typeof(element.duration) === "object" && element.duration !== null ? element.duration.value : 1}
                            dateType={typeof(element.duration) === "object" && element.duration !== null ? element.duration.type : "days"}
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