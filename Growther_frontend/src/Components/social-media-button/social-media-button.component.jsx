import React from 'react'

const SocialMediaButton=({handleChange,onClick,isFacebook,isGoogle,label,placeholder})=>(

    <div className="field">
        <p className="control"/>
        <div className="control has-icons-left socialButton">
                <button type="button" onClick={onClick} class={`${isGoogle ? 'is-danger' :'is-info'} button  is-fullwidth is-outlined`}>{label}</button>
                <span className="icon is-small is-left ml-desktop">
                    {
                        isGoogle ? <i className="fab fa-google"></i> : <i className="fab fa-facebook"></i>
                    }
                    
                </span>
            </div>
    </div>



)
export default SocialMediaButton;