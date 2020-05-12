import React, { useState, useContext } from "react";
import "./styles.css";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../UserProvider";
import { signInWithGoogle } from "../../firebase";
import { auth } from "../../firebase";
const SignInComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };
  const { user } = useContext(UserContext);
  if (user != null) return <Redirect to="/" />;
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };
  return (
    <div className="inputBlock text-center">
          <h3 className="text-center headerColor">Sign In</h3>    
      <div className="">
              
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
              
        <form className="">
                  
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
                  
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
                
          <br />
          <br />
            
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
              
          <br />
          <br />
              
          <button
            className=""
            onClick={(event) => {
              signInWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign in
          </button>
                
        </form>
              <p className="text-center my-3">or</p>      
        <button
          className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
          onClick={(event) => {
            signInWithGoogle();
          }}
        >
          Sign in with Google
        </button>
              
        <p className="text-center my-3">
                  Don't have an account?{" "}        
          <Link to="signup" className="headerColor">
            Sign up here
          </Link>
          <br />
          <Link to="reset" className="headerColor">
            Forgot Password?
          </Link>
                
        </p>
            
      </div>
        
    </div>
  );
};
export default SignInComponent;
