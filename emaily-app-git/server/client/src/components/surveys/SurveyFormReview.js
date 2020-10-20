// Survey Form Review shows their form inputs for review
import React from "react";
//we're going to use the connect helper to reach into the redux store from the survey form view and pull out all the different form values.
import { connect } from "react-redux";
import formFields from "./formFields";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
function SurveyFormReview(props) {
  const reviewFields = _.map(formFields, (field) => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{props.formValues[field.name]}</div>
      </div>
    );
  });
  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="yellow darken-3 btn-flat" onClick={props.onCancel}>
        Back
      </button>
      <button
        // to delay function and not execute it on component render we wrap the function in an arrow function
        //props.submitSurvey is the action creator and we pass our different form values to it
        onClick={() => props.submitSurvey(props.formValues, props.history)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
}
function mapStateToProps(state) {
  console.log("SurveyFormReview-->state", state);
  return { formValues: state.form.surveyForm.values };
}
// we call the actions using connect statement to recieve the action creators as props
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
