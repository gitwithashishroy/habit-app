import { toast } from 'react-toastify';
import { AUTHENTICATED, NOT_AUTHENTICATED } from './actionTypes'

const setToken = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime());
};
  
export const getToken = () => {
    const now = new Date(Date.now()).getTime();
    const timeAllowed = 1000 * 60 * 30;
    const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
    if (timeSinceLastLogin < timeAllowed) {
        return localStorage.getItem("token");
    }
};

const deleteToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("lastLoginTime");
}

export const signupUser = (name , email ,phone ,  password , confirmPassword) => {
    return (dispatch) => {
        return fetch("http://localhost:8005/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name , email ,phone ,  password , confirmPassword})
        }).then((res) => {
            if (res.ok) {
                return res
                    .json()
                    .then((userJson) =>{
                      toast(userJson.message) ;
                      dispatch({ type: AUTHENTICATED, payload: userJson }) ;
                      } 
                    );
            } else {
                return res.json().then((errors) => {
                    dispatch({ type: NOT_AUTHENTICATED });
                    return Promise.reject(errors);
                });
            }
        });
    };
};


export const loginUser = (email , password) => {
    return (dispatch) => {
      return fetch("http://localhost:8005/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email , password }),
      }).then((res) => {
        if (res.ok) {
          return res
            .json()
            .then((userJson) =>{
              console.log(userJson) ; 
              toast(userJson.message) ; 
              setToken(userJson.accessToken);
              dispatch({ type: AUTHENTICATED, payload: userJson })
             }
            );
        } else {
          return res.json().then((errors) => {
            dispatch({ type: NOT_AUTHENTICATED });
            console.log(errors) ; 
          });
        }
      });
   };
};
  


export const logoutUser = () => {
    return (dispatch) => {
        deleteToken() ; 
        dispatch({ type: NOT_AUTHENTICATED }) ; 
    }
}