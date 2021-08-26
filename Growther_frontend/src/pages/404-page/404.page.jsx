import React from "react"
import { useHistory } from "react-router-dom"
import SubmitButton from "../../Components/submit-button/submit-button.component"
const Page404 = ()=>{
    var history = useHistory()
    return(
        <div className="page404 is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            <div>
                <img alt="" src={require("../../assets/icons/404.png").default} />
            </div>
            <SubmitButton onClick={()=> history.goBack()} label={"Go Back"} />
        </div>
    )
}
export default Page404;