import React from 'react'
import { Link } from 'react-router-dom';

const SocialMediaButton=({handleChange,onClick,uri,isGoogle,label,placeholder})=>(

    <div className="field">
        <p className="control"/>
        <div className="control has-icons-left socialButton">
            <a href={uri}>
                <button type="button"  onClick={onClick} className={`${isGoogle ? 'is-danger' :'is-info'} button  is-fullwidth is-outlined`}>{label}</button>
            </a>    

                <span className="icon is-small is-left ml-desktop">
                    {
                        isGoogle ? <i className="fab fa-google"></i> : <i className="fab fa-facebook"></i>
                    }
                    
                </span>
            </div>
    </div>



)
export default SocialMediaButton;