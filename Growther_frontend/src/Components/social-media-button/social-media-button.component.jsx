import React from 'react'

const SocialMediaButton=({handleChange,onClick,isFacebook,isGoogle,label,placeholder})=>(

    <div className="field">
        <p className="control"/>
        <div className="control has-icons-left" >
                <button type="button" onClick={onClick} className={`${isGoogle ? 'is-danger' :'is-info'} button  is-fullwidth is-outlined`}>{label}</button>
                <span className="icon is-small is-left ml-6">
                    {
                        isGoogle ? <i className="fab fa-google"></i> : <i className="fab fa-facebook"></i>
                    }
                    
                </span>
            </div>
    </div>



)
export default SocialMediaButton;