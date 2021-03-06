import {useEffect, useState} from "react";
import {useGlobalContext} from "../../globalContext/GlobalContext";
import {Link, useHistory} from "react-router-dom";
import styles from "./loginForm.module.css"



const axios = require ('axios') ;
axios.defaults.baseURL = 'http://localhost:5000';

export const LoginForm = ()=> {
const [email,setEmail] = useState("") ;
const [password , setPassword] = useState("") ;
const {loggingIn , displayAlerts , token} = useGlobalContext();
let history = useHistory();
const handleSubmit = async (e)=> {
    console.log("here in logging")
    e.preventDefault();
    try{
       const response =  await axios.post("/api/auth/login" , {
            email:email,
            password:password
        }) ;
       localStorage.setItem("email" , JSON.stringify(email))
        console.log(response.data)
       loggingIn(response.data)
        history.push("/explore")
        displayAlerts("success" , "logged in successfully")

    }catch (e) {
        //TODO : alerts here
        loggingIn("") ;
        displayAlerts("danger" , e.response.data)
        console.log( e.response.data)
    }
}
    useEffect(()=> {
        if(token) {
            displayAlerts("info" , " you are already logged in")
            history.push("/explore")
        }
    } , [])
    return (
        <>
            <div className={`container-fluid ${styles.global}`}>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        required
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        required
                        pattern="^[a-zA-Z0-9 ]*$"
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-danger">Submit</button>
            </form>
            <div className="row">

                <h4>Don't have an account ? <Link to="/register"> register </Link> </h4>



            </div>
            </div>
        </>
    )
}