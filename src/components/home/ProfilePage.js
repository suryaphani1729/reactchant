import React, { useState, useContext } from "react";
import { UserContext } from "../UserProvider";
import { auth, saveUserTodayCount, getUserCounts } from "../../firebase";
import { Redirect } from "react-router-dom";
const ProfilePage = () => {
  const [todayVal, setTodayVal] = useState("");
  const user = useContext(UserContext);
  console.log("Know user", user);
  if (user === null || user === undefined) return <Redirect to="/signin" />;
  const { photoURL, displayName, email } = user;
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "todayCount") {
      setTodayVal(value);
    }
  };
  const onSubmitForToday = (event) => {
    event.preventDefault();
    saveUserTodayCount(user, todayVal);
  };
  const getData = async () => {
    const getData = await getUserCounts(user.uid);
    console.log("data...", getData);
  };
  return (
    <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
            
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
                
        <div
          style={{
            background: `url(${
              photoURL ||
              "https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png"
            })  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px",
          }}
          className="border border-blue-300"
        ></div>
                
        <div className="md:pl-4">
                  <h2 className="text-2xl font-semibold">{displayName}</h2>
                  <h3 className="italic">{email}</h3>        
          <br />
          <br />
                  
          <input
            type="number"
            name="todayCount"
            value={todayVal}
            onChange={(event) => {
              onChangeHandler(event);
            }}
          />
                  
          <button
            onClick={(event) => {
              onSubmitForToday(event);
            }}
          >
            Submit For Today
          </button>
                  
        </div>
              
      </div>
            
      <button
        className="w-full py-3 bg-red-600 mt-4 text-white"
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign out
      </button>
            
      <button
        onClick={() => {
          getData();
        }}
      >
        Get Counts
      </button>
           
    </div>
  );
};
export default ProfilePage;
