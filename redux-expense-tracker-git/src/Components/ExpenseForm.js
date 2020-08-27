import React, { useState } from "react";
import moment from "moment";
// import { SingleDatePicker } from 'react-dates';
// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';

import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ExpenseForm = (props) => {
  //for edit form - form values have to be preloaded
  //so we check if the passed prop singleExpense exists, if the prop exists the data is an existing data because data is passed from as a prop
  //
  let [description, setDescription] = useState(
    props.singleExpense ? props.singleExpense.description : ""
  );
  let [note, setNote] = useState(
    props.singleExpense ? props.singleExpense.note : ""
  );
  let [amount, setAmount] = useState(
    props.singleExpense ? props.singleExpense.amount : ""
  );
  let [errorMsg, setErrorMsg] = useState("");
  // console.log(props.singleExpense.createdAt)
  //const getDateFromTimestampTest=moment(props.singleExpense.createdAt).format("DD MMM YYYY hh:mm a")
  const getDateFromTimestamp = () => {
    let createdAtDate;
    if (props.singleExpense) {
      createdAtDate = props.singleExpense.createdAt;
      // console.log("converted time",moment(createdAtDate).format('L'))
      return createdAtDate;
    } else {
      createdAtDate = Date.now();
      // console.log("converted time",moment(createdAtDate).format('L'))
      return createdAtDate;
    }
  };
  // console.log("getDateFromTimestamp",getDateFromTimestamp())
  const [selectedDate, setSelectedDate] = useState(
    props.singleExpense ? getDateFromTimestamp() : Date.now()
  );
  const now = moment();
  // console.log(now.format("MMM Do YYYY"));
  const onDescriptionChange = (e) => {
    //we have to use the description variable and set the value or use e.persist()
    //alternately we can set the onChange in the element itself like implemented in textArea
    const description = e.target.value;
    setDescription(description);
  };
  const onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      // regex101.com
      //we no longer allow just a decimal number
      //^-forces regex to start with a number
      //\d-matches a digit(0-9)
      // {1,}-low end we have 1 and high end we have infinity, we are forcing a number to start the expression
      //()?-optional group to check if a decimal no is used, decimal no is optional
      //\.\d{0,2}-
      //\. - a decimal
      //\d{0,2}-accepts two digits
      //$-regex ends here, no other characters
      setAmount(amount);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) {
      setErrorMsg("Please provide description and amount");
      // console.log("clicked");
    } else {
      setErrorMsg("");
      // Note:Make sure the submitted object matches the data mapped to the respective action (i.e) it has same name and position
      props.onSubmit({
        description: description,
        note: note,
        amount: parseFloat(amount, 10) * 100,
        createdAt: moment(selectedDate).valueOf(), //date stored as timestamp
      });
      // console.log("submitted");
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* description */}
        <input
          type="text"
          placeholder="Description"
          autoFocus
          value={description}
          onChange={onDescriptionChange}
        />
        {/* amount */}
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={onAmountChange}
        />
        {/* date */}
        {/* <SingleDatePicker 
        date={setCreatedAt}
        onDateChange={onDateChange}
        focussed={calendarFocussed}
        onFocusChange={onFocusChange}
        /> */}
        {/* onchange we get the date as a parameter and we set the date to state */}
        <Datepicker
          placeholderText="date"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          // we can pass the required date format as a string
          dateFormat="dd/MM/yyyy"
          // using minDate prop we can specify the minimum starting date
          //by default it uses current date
          //to set specific date we can pass a string
          // (i.e.)minDate={new Date('03/03/2020')}
          // minDate={new Date("03/03/2020")}
          // using maxDate prop we can specify the maximum ending date
          // maxDate={new Date()}
          // using filterDate we can filter specific dates (eg) no saturdays
          filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
          // using isClearable prop the selected date can be cleared
          isClearable
          // we can use the showYearDropdown and scrollableMonthYearDropdown
          // to display a year dropdown
          showYearDropdown
          scrollableMonthYearDropdown
        />
        {/* note */}
        <textarea
          placeholder="Add a note for your expense optional"
          onChange={(e) => {
            setNote(e.target.value);
          }}
        ></textarea>
        <br />
        {/* displaying dynamically error message */}
        {/* {errorMsg ? <p>{errorMsg}</p> : null} */}
        {errorMsg && <p>{errorMsg}</p>}
        <button>Add Expense</button>
      </form>
    </div>
  );
};
export default ExpenseForm;