import React from "react"
export const PreviewPrizesList = ({prizes, winners})=>{
    if(!Array.isArray(prizes)) return null
    var result = []
    prizes.map((item, index) =>{
        if(typeof(item) === "object" && typeof(item.description) === "string"){
            result.push(
                <div className="previewPrize is-flex is-flex-direction-column is-align-items-center is-justify-content-center" key={`prize${index}`}>
                    <div className="is-flex is-align-items-center">
                        <span className="prizeOrder">
                            <img alt="" width={'25px'} src={require("../../../assets/icons/prize.png").default} />
                        </span> 
                        <span className="prizeText is-flex is-flex-direction-column">
                            {`${item.description}`}
                        </span>
                    </div>
                    {winners && Array.isArray(winners) && winners.length > 0 ? <span className="prizeWinner is-flex is-flex-direction-column">{winners[index].email}</span> : null}
                </div>
            )
        }
        return true
    })
    return(
        result
    )
}