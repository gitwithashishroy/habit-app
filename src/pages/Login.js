import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../redux/action/authAction";
import styles from "../styles/login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const dispatch = useDispatch() ; 
  const auth = useSelector((state)=>state.authReducer) ; 
  console.log(auth) ; 
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      toast("Please enter both email and password");
    }

    const res =  await dispatch(loginUser(email , password )) ;   
    console.log(res) ; 
    console.log(auth) ; 
    setLoggingIn(false);
  };

  if(auth.loggedIn === true){
    return <Navigate to="/home" />
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}> Login </span>
      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field} disabled={loggingIn}>
        <button>{loggingIn ? "Logging in..." : "Login"}</button>
      </div>
    </form>
  );
};

export default Login;
