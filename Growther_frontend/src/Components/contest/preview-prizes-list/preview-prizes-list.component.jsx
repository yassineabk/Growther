import React from "react"
export const PreviewPrizesList = ({prizes})=>{
    if(!Array.isArray(prizes)) return null
    var result = prizes.map(item =>{
        if(typeof(item) === "object" && typeof(item.description) === "string"){
            return (
                <div className="previewPrize">
                    <div>
                        <span className="prizeOrder">{`${item.id}.`}</span> {`${item.description}`}
                    </div>
                </div>
            )
        }
        
    })
    return(
        result
    )
}