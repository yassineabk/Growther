import React from "react"
export const PreviewPrizesList = ({prizes})=>{
    if(!Array.isArray(prizes)) return null
    var result = []
    prizes.map((item, index) =>{
        if(typeof(item) === "object" && typeof(item.description) === "string"){
            result.push(
                <div key={`prize${index}`} className="previewPrize is-flex is-align-items-center">
                    <span className="prizeOrder">
                        <img alt="" width={'25px'} src={require("../../../assets/icons/prize.png").default} />
                    </span> 
                    <span className="prizeText">{`${item.description}`}</span>
                </div>
            )
        }
        return true
    })
    return(
        result
    )
}