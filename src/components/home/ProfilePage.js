import React, { useState, useContext } from "react";
import { UserContext } from "../UserProvider";
import { auth, saveUserTodayCount, getUserCounts } from "../../firebase";
import { Redirect } from "react-router-dom";
import SelfReportComponent from "../reports/self/SelfReportComponent";

const ProfilePage = () => {
  const getDateInStringFormat = (dateFormat) => {
    return (
      dateFormat.getFullYear().toString() +
      "-" +
      (dateFormat.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      dateFormat.getDate().toString().padStart(2, 0)
    );
  };
  console.log(getDateInStringFormat(new Date()));
  const [todayVal, setTodayVal] = useState("");
  const [countDate, setCountDate] = useState(getDateInStringFormat(new Date()));

  const { user, data, updateData } = useContext(UserContext);
  console.log("Know user", user);

  if (user === null || user === undefined) return <Redirect to="/signin" />;
  const { photoURL, displayName, email } = user;
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    console.log(value);
    if (name === "todayCount") {
      setTodayVal(value);
    } else if (name === "countDate") {
      setCountDate(value);
    }
  };

  const onSubmitForToday = (event) => {
    event.preventDefault();
    saveUserTodayCount(user, countDate, todayVal);
  };
  // const getData = async () => {
  //   const getData = await getUserCounts(user.uid);
  //   updateData(getData);
  // };
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
        <div className="">
          <h3 className="text-2xl font-semibold">{displayName}</h3>
          <SelfReportComponent />
          <br />
          <br />

          <input
            type="date"
            name="countDate"
            value={countDate}
            onChange={(event) => {
              onChangeHandler(event);
            }}
          />
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
            Submit
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
              <td colSpan="2">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
       
    </div>
  );
};
export default ProfilePage;
