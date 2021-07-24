import React from "react"
import SubmitButton from "../submit-button/submit-button.component"
export const SignupUserType = ({handleSubmit, handleChange})=>{
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
                                <div className="control pb-4 is-center is-flex userTypeContainer" onChange={handleChange}>
                                    <div className="is-flex is-flex-direction-column">
                                        <div className="typeIcon">
                                            <img src={require("../../assets/icons/individual.png").default} />
                                        </div>
                                        <div>Individual</div>
                                    </div>
                                    <div className="is-flex is-flex-direction-column">
                                        <div className="typeIcon">
                                            <img src={require("../../assets/icons/brand.png").default} />
                                        </div>
                                        <div>Brand</div>
                                    </div>
                                </div>
                                <SubmitButton className="details-button" type="submit" label="Next"/>
                                <SubmitButton className="duplicate-button" type="submit" label="Login"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}