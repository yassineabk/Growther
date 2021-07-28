import React from "react"
import SubmitButton from "../submit-button/submit-button.component"
import { useHistory } from "react-router-dom";


export const SignupUserType = ({handleSubmit, handleClick,isBrand})=>{
    const history = useHistory();

  function handleClickLogin() {
    history.push("/login");
  }
    return(
        <section className="hero is-fullheight Modal">
            <div className="hero-body ">
                <div className="container ">
                    <div className="columns is-centered ">
                        <div className="column is-5-tablet is-4-desktop is-4-widescreen ">
                            <form action="" className="box" onSubmit={handleSubmit}>
                                <div className="column has-text-centered">
                                    <p className="title is-3">Create Account</p>
                                    {/*<p className="subtitle is-6">P</p>*/}
                                </div>
                                <div className="control pb-4 is-center is-flex userTypeContainer" >
                                    <div className="is-flex is-flex-direction-column">
                                        <div className={`${isBrand ? '' :'isSelected'} typeIcon`} onClick={handleClick}>
                                            <img name="individual" src={require("../../assets/icons/individual.png").default} />
                                        </div>
                                        <div>Individual</div>
                                    </div>
                                    <div className="is-flex is-flex-direction-column">
                                        <div className={`${isBrand ? 'isSelected' :''} typeIcon`}  onClick={handleClick}>
                                            <img name="brand" src={require("../../assets/icons/brand.png").default} />
                                        </div>
                                        <div>Brand</div>
                                    </div>
                                </div>
                                <SubmitButton className="details-button" type="submit" label="Next"/>
                                <SubmitButton onClick={handleClickLogin} className="duplicate-button" type="button" label="Login"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}