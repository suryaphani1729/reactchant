import React, { useState, useContext } from "react";
import "./styles.css";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../UserProvider";
import { auth, generateUserDocument } from "../../firebase";
const SignUpComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  if (user != null) return <Redirect to="/" />;

  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { displayName });
    } catch (error) {
      setError("Error Signing up with email and password");
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  return (
    <div className="inputBlock text-center">
            <h3 className="text-center headerColor">Sign Up</h3>
            
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
                
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
                        {error}          
          </div>
        )}
                
        <form className="">
                    
          <label htmlFor="displayName" className="block">
            Display Name:
          </label>
            
          <input
            type="text"
            className="my-1 p-1 w-full "
            name="displayName"
            value={displayName}
            placeholder="E.g: Faruq"
            id="displayName"
            onChange={(event) => onChangeHandler(event)}
          />
          <br />
          <br />
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
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
            onClick={(event) => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
                        Sign up          
          </button>
                  
        </form>
                <p className="text-center my-3">or</p>        
        <button className="bg-red-500 hover:bg-red-600 w-full py-2 text-white">
                    Sign In with Google        
        </button>
                
        <p className="text-center my-3">
                    Already have an account?{" "}          
          <Link to="/signin" className="headerColor">
            Sign in here
          </Link>
                  
        </p>
              
      </div>
          
    </div>
  );
};
export default SignUpComponent;
