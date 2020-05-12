import React, { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
const PasswordResetComponent = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };
  const sendResetEmail = async (event) => {
    event.preventDefault();
    await auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {
          setEmailHasBeenSent(false);
        }, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  };
  return (
    <div className="inputBlock text-center">
            
      <h3 className="text-center headerColor">Reset your Password</h3>
            
      <div className="border border-blue-300 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
         
        <form action="">
          {emailHasBeenSent && (
            <div className="py-3 bg-green-400 w-full text-white text-center mb-3">
                            An email has been sent to you!            
            </div>
          )}
          {error !== null && (
            <div className="py-3 bg-red-600 w-full text-white text-center mb-3">
                            {error}            
            </div>
          )}
          <label htmlFor="userEmail" className="">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            value={email}
            placeholder="Input your email"
            onChange={onChangeHandler}
            className="mb-3 w-full px-1 py-2"
          />
          <br />
          <br />
          <button
            className="w-full bg-blue-400 text-white py-3"
            onClick={(event) => {
              sendResetEmail(event);
            }}
          >
            Send me a reset link
          </button>
                  
        </form>
                
        <br />
        <Link to="/" className="headerColor">
          &larr; back to sign in page
        </Link>
              
      </div>
          
    </div>
  );
};
export default PasswordResetComponent;
