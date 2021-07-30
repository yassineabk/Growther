import React from "react"
export const PreviewPrizesList = ({prizes})=>{
    if(!Array.isArray(prizes)) return null
    var result = prizes.map((item, index) =>{
        if(typeof(item) === "object" && typeof(item.description) === "string"){
            return (
                <div key={`prize${index}`} className="previewPrize">
                    <div>
                        <span className="prizeOrder">{`${index + 1}.`}</span> {`${item.description}`}
                    </div>
                </div>
            )
        }
        
    })
    return(
        result
    )
}