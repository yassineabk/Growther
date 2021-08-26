import React from "react"
export const TemplatesContainer = ()=>{
    return(
        <div className="is-flex is-flex-direction-column list-container">
            <div className="list-title-container is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                <span className="list-title">
                    Templates
                </span>
            </div>
            <div className="columns is-multiline is-flex is-flex-direction-row cards">
                <div className="card column is-flex">
                    <div className="templateImg left-side is-flex">
                        <img alt="" src={require("../../../assets/icons/email.png").default} />
                    </div>
                    <div className="right-side">
                        <div className="card-infos is-flex is-flex-direction-column">
                            <div className="card-title">
                                Email Signup
                            </div>
                            <div className="card-description">
                                Sync every entrant with your mail provider with a mandatory Subscribe action.
                            </div>
                        </div>
                        <div className="card-buttons is-flex is-flex-direction-row">
                            <div className="details-button">Preview</div>
                            <div className="duplicate-button">Copy</div>
                        </div>
                    </div>
                </div>
                <div className="card column is-flex">
                    <div className="templateImg left-side is-flex">
                        <img alt="" src={require("../../../assets/icons/friends.png").default} />
                    </div>
                    <div className="right-side">
                        <div className="card-infos is-flex is-flex-direction-column">
                            <div className="card-title">
                                Refer-a-Friend
                            </div>
                            <div className="card-description">
                                Reward users for referring their friends to enter your competition with this template.
                            </div>
                        </div>
                        <div className="card-buttons is-flex is-flex-direction-row">
                            <div className="details-button">Preview</div>
                            <div className="duplicate-button">Copy</div>
                        </div>
                    </div>
                </div>
                <div className="card column is-flex">
                    <div className="templateImg left-side is-flex">
                        <img alt="" src={require("../../../assets/icons/google-play.png").default} />
                    </div>
                    <div className="right-side">
                        <div className="card-infos is-flex is-flex-direction-column">
                            <div className="card-title">
                                App Download
                            </div>
                            <div className="card-description">
                                Template to ask your users to download your mobile app from various sources
                            </div>
                        </div>
                        <div className="card-buttons is-flex is-flex-direction-row">
                            <div className="details-button">Preview</div>
                            <div className="duplicate-button">Copy</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}