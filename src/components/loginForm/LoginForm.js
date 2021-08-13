import {useState} from "react";
import {useGlobalContext} from "../../globalContext/GlobalContext";
import {useHistory} from "react-router-dom";



const axios = require ('axios') ;
axios.defaults.baseURL = 'http://localhost:5000';

export const LoginForm = ()=> {
const [email,setEmail] = useState("") ;
const [password , setPassword] = useState("") ;
const {loggingIn} = useGlobalContext();
let history = useHistory();
const handleSubmit = async (e)=> {
    e.preventDefault();
    try{
       const response =  await axios.post("/api/auth/login" , {
            email:email,
            password:password
        }) ;
       loggingIn(response.data)
        history.push("/explore")

    }catch (e) {
        //TODO : alerts here
        console.log( e.response.data)
    }
}
    return (
        <>
            <form onSubmit={handleSubmit}>
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
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                            else.</small>
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
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>

                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}