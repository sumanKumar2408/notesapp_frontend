import '../styles/PageNotFound.css';
import { useNavigate } from "react-router";

const PageNotFound = () =>{
    const navigate = useNavigate();
    return(
        <div className="wrapper">
            <div className="main-wrapper">
                <h1>Page Not Found</h1>
                <h1>Go to...</h1>
                <div className="btn-container">
                    {localStorage.getItem('token') && <input type="submit" value="Notes" className="btn" onClick={() => navigate("/notes")}/>}
                    {!localStorage.getItem('token') && <input type="submit" value="Login" className="btn" onClick={() => navigate("/login")}/>}
                    {!localStorage.getItem('token') && <input type="submit" value='Signup' className="btn" onClick={() => navigate("/signup")}/>}
                </div>
            </div>
        </div>
    )
}

export default PageNotFound;