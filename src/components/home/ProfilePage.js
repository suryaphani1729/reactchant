import React, { useState, useContext } from "react";
import { UserContext } from "../UserProvider";
import { auth, saveUserTodayCount, getUserCounts } from "../../firebase";
import { Redirect } from "react-router-dom";
const ProfilePage = () => {
  const [todayVal, setTodayVal] = useState("");
  const { user, data } = useContext(UserContext);
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
  const getDateFormat = (fullDate) => {
    const yeardata = fullDate.substring(0, 4);
    const monthdata = fullDate.substring(4, 6);
    const dat = fullDate.substring(6, 8);
    return dat + "-" + monthdata + "-" + yeardata;
  };
  const totalCount = () => {
    let total = 0;

    for (let i = 0; i < data.length; i++) {
      total += parseInt(data[i].data.dayKey);
    }
    return total * 108 + "(" + total + ")";
  };
  return (
    <div className="">
      <div className="">
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
        <div className="">
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
        className=""
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign out
      </button>
      <br />
      <button
        onClick={() => {
          getData();
        }}
      >
        Get Counts
      </button>
      <h3>Total: {totalCount()}</h3>
      <table>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{getDateFormat(item.id)}</td>
                  <td>{item.data.dayKey}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colspan="2">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
       
    </div>
  );
};
export default ProfilePage;
