// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
// import redux form helper
import { reduxForm } from "redux-form";
class SurveyNew extends Component {
  //declaring state before creat-react-app
  // constructor(props) {
  //   super(props);
  //   this.state = { new: true };
  // }
  state = { showFormReview: false };
  renderContent() {
    if (this.state.showFormReview === true) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    } else {
      return (
        <SurveyForm
          onSurveySubmit={() => {
            this.setState({ showFormReview: true });
          }}
        />
      );
    }
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}
//In SurveyForm component we have specified destroyOnUnmount:false so values will not be removed when component unmounts
//When user navigates from the surveyNew component or unmounted then the values inside surveyForm will be dumped -  this is the default behaviour of redux-form
export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
