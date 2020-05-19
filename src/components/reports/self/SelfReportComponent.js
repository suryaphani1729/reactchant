import React, { useState, useContext } from "react";
import { UserContext } from "../../UserProvider";
import { auth, getDataByMonthYear } from "../../../firebase";
import { Redirect } from "react-router-dom";

const SelfReportComponent = () => {
  const currentMonth =
    new Date().getMonth() + 1 >= 10
      ? new Date().getMonth() + 1 + ""
      : "0" + (new Date().getMonth() + 1);
  const currentYear = new Date().getFullYear() + "";

  const [selectedMonth, setSelectedMonth] = useState("" + currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { user, data, updateData } = useContext(UserContext);

  if (user === null || user === undefined) return <Redirect to="/signin" />;

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "selectedMonth") {
      setSelectedMonth(value);
    } else if (name === "selectedYear") {
      setSelectedYear(value);
    }
  };

  const getData = async (event) => {
    event.preventDefault();
    const data = await getDataByMonthYear(
      user.uid,
      selectedMonth,
      selectedYear
    );
    updateData(data);
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
        <div className="">
          <h3 className="text-2xl font-semibold">Self Report</h3>
          <br />
          <br />

          <select
            name="selectedMonth"
            defaultValue={selectedMonth}
            onChange={(event) => onChangeHandler(event)}
          >
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>

            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>

            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>

            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <br />
          <br />
          <select
            name="selectedYear"
            defaultValue={selectedYear}
            onChange={(event) => onChangeHandler(event)}
          >
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
          <button
            onClick={(event) => {
              getData(event);
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <br /> 
    </div>
  );
};
export default SelfReportComponent;
