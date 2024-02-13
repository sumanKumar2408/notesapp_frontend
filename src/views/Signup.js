import '../styles/Signup.css';

import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {BASE_URL} from '../constants.js';

const Signup = () => {
    const[user, setUser] = useState({name:"", email: "", password: "", cPassword: ""});
    const[valid, setValid] = useState({validName: false, validEmail: false, validPassword: false, validCPassword: false})
    const navigate = useNavigate();
    const handleInput = (event) => {
        let name, value;
        name = event.target.name;
        value = event.target.value;
        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*(-_=+)])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
        if(name === "name")
        {
            let elem = document.getElementById("name");
            if(!(value.length > 1)) {
                elem.innerText = "User name must be atleast 2 character long";
                elem.setAttribute("style", "color:red;");
                setValid({...valid, validName: false});
            }
            if(value.length === 0) elem.innerText = "";
            if(value.length > 1) {
                elem.innerText = ""; 
                setValid({...valid, validName: true});
            }
        }
        if(name === "email")
        {
            let elem = document.getElementById("email");
            if(!value.match(emailPattern)) {
                elem.innerText = "Enter valid email";
                elem.setAttribute("style", "color:red;");
                setValid({...valid, validEmail: false});
            }
            else {
                elem.innerText = ""; 
                setValid({...valid, validEmail: true});
            }
            if(value.length === 0) elem.innerText = "";
        }
        if(name === "password")
        {
            let elem = document.getElementById("password");
            if(value.length < 8 || value.length > 16) {
                elem.innerText = "Password must be min 8 and max 16 characters long";
                elem.setAttribute("style", "color:red;");
                setValid({...valid, validPassword: false});
            }     
            else if(!value.match(passwordPattern)) {
                elem.innerText = "Password must contain alteast 1 lower, 1 upper, 1 numeric and 1 special characters";
                elem.setAttribute("style", "color:red;");
                setValid({...valid, validPassword: false});
            }
            else {
                elem.innerText = ""; 
                setValid({...valid, validPassword: true});
            }
            if(value.length === 0) elem.innerText = "";
        }
        if(name === "cPassword")
        {
            let elem = document.getElementById("cPassword");
            if(value.length !== 0 && user.password !== value) {
                elem.innerText = "Password does not match";
                elem.setAttribute("style", "color:red;");
                setValid({...valid, validCPassword: false});
            }
            else {
                elem.innerText = ""; 
                setValid({...valid, validCPassword: true});
            }
            if(value.length === 0) elem.innerText = "";
        }
        setUser({...user, [name]: value});
    };

    const postData = async(event) => {
        try{
            event.preventDefault();
            const{name, email, password, cPassword} = user;
            if(!valid.validName || !valid.validEmail || !valid.validPassword || !valid.validCPassword){return;}
            if(password === cPassword){
                const res = await axios.post(`${BASE_URL}/signup`, {
                    name: name, email: email, password: password
                });                
                if(res.status === 200){
                    alert("Signup Sucessfull");
                    setUser({name:"", email: "", password: "", cPassword: ""});
                    navigate("/login");
                }
            }
        }catch(err){
            if(err.response.status === 401)
            {
                document.getElementById("email").innerText = "User already exist";
            }
        }
    };
    return(
        <div className="signup">
            <div className="signup-container">
                <form method="POST" onSubmit={postData}>
                    <div className="form-group">
                        <input type="text" placeholder="Enter Your Name" name="name" value={user.name} onChange={handleInput} required/>
                        <p id="name" style={{textAlign:"left", fontSize:"13px"}}></p>
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Enter Your Email" name="email" value={user.email} onChange={handleInput} required/>
                        <p id="email"></p>
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Enter Your Password" name="password" value={user.password} onChange={handleInput} required/>
                        <p id="password"></p>
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Enter Your Password Again" name="cPassword" value={user.cPassword} onChange={handleInput} required/>
                        <p id="cPassword"></p>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Signup"/>
                    </div>
                    <p>Already have an account?</p><a onClick={()=> navigate("/login")}>Login</a>
                </form>
            </div>
        </div>
    );
};

export default Signup;

