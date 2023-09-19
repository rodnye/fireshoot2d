
import "./AuthButton/AuthButton.css"

import googleImg from "assets/google-login.png"
import facebookImg from "assets/facebook-login.png"

export default function AuthButton ({
    children,
    type,
}) {
    
    let icon = null;
    let handleClick = null;
    let label = null;
    
    // Google auth
    if (type === "google") {
        icon = googleImg;
        label = "Acceder con Google";
        handleClick = () => {location.href = "/auth/google"};
    }
    
    // Facebook auth
    if (type === "facebook") {
        icon = facebookImg;
        label = "Acceder con Facebook";
        handleClick = () => {location.href = "/auth/facebook"};
    }
    
    
    return (
        <div 
            className="auth-btn hover-btn" 
            onClick={handleClick}
        >
            <img src={icon} className="auth-btn__icon"/>
            <div className="auth-btn__label">
                { label }
            </div>
        </div>
    )
}