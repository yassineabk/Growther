import React from 'react'
import { Link } from 'react-router-dom';

const SocialMediaButton=({handleChange,onClick,uri,isGoogle,label,placeholder})=>(

    <div className="field">
        <p className="control"/>
        <div className="control has-icons-left socialButton">
<<<<<<< HEAD
                <button type="button"  onClick={onClick} className={`${isGoogle ? 'is-danger' :'is-info'} button  is-fullwidth is-outlined`}>{label}</button>
=======
            <Link to={uri}>
                <button type="button"  onClick={onClick} className={`${isGoogle ? 'is-danger' :'is-info'} button  is-fullwidth is-outlined`}>{label}</button>
            </Link>    
>>>>>>> 6f6833c16a8a88fb20ce718dfd4423936596105a
                <span className="icon is-small is-left ml-desktop">
                    {
                        isGoogle ? <i className="fab fa-google"></i> : <i className="fab fa-facebook"></i>
                    }
                    
                </span>
            </div>
    </div>



)
export default SocialMediaButton;