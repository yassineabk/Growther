import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const SocialMediaButton=({handleChange,onClick,uri,isGoogle,label,placeholder})=>{
    var {t} = useTranslation()
    var {direction} = useSelector(state => state.userInfos)
    return(
    <div className="field">
        <p className="control"/>
        <div className="control has-icons-left has-icons-right socialButton">
            <a href={uri} >
                <button id="social-media-button" dir={direction ? direction : "ltr"} type="button"  onClick={onClick} className={`${isGoogle ? 'is-danger' :'is-info'} button  is-fullwidth is-outlined`}>{typeof(label) === "string" ? t(label.toLowerCase()) : ""}</button>
            </a>    
            <span className={`icon is-small ${direction === "rtl" ? "is-right" : "is-left"} ml-desktop`}>
                {
                    isGoogle ? <i className="fab fa-google"></i> : <i className="fab fa-facebook"></i>
                }
                
            </span>
        </div>
    </div>
)}
export default SocialMediaButton;