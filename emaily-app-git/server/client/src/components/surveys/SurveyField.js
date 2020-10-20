// SurveyField contain logic to render a sigle label and text input
import React from "react";
// import { getFormMeta } from "redux-form";
const SurveyField = (props) => {
  //   console.log("props", props.input);
  return (
    <div>
      <label>{props.label}</label>
      {/* Redux forum can show these very basic elements for us but that's not really it's strength.
        It's strength is wiring up all the different event handlers for watching changes to this input. so we specifically say input tag*/}
      {/*...props.input means we are passing all props we recieved to input tag*/}
      {/* This is similar to passing all individual props values to the input
      <input onBlur={input.onBlur} onChange={input.onChange} />             
      */}
      <input {...props.input} style={{ marginBottom: "5px" }} />
      {/* meta property is passed through props and contains the error information */}
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {props.meta.touched === true ? props.meta.error : ""}
      </div>
      {/* es6 destructured error msg - {touched && error} */}
    </div>
  );
};
export default SurveyField;
