// SurveyForm shows a form for a user to add input
import _ from "lodash";
import React, { Component } from "react";
//the reduxForm helper allows redux form to communicate with our redux store
//reduxForm helper can be thought of as being nearly identical to the connect helper that we've been using from the react redux library.
//Field helper is provided by redux form for rendering absolutely any type traditional HTML form element
import { reduxForm, Field } from "redux-form";
// custom field component
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";
class SurveyForm extends Component {
  renderFields() {
    // we are using lodash to map through an array of objects
    return _.map(formFields, (field) => {
      return (
        <Field
          key={field.name}
          component={SurveyField}
          type="text"
          label={field.label}
          name={field.name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        {/* The props.handleSubmit function is a function that is provided to us automatically by
            the redux form helper that we wired up at the bottom. If we call handle submit and pass it a function of our own, the function that we pass to it will be automatically called whenever a user attempts to submit our form.
        */}
        {/* The console.log inside handle submit will be called only when the form is successfully submitted */}
        <form
          // onSubmit={this.props.handleSubmit((values) => console.log(values))}
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}
// The validate key passed to the function takes a single argument of values and this values is the object containing all the different values that are coming off of our form. So in other words basically an object that looks identical to the object we see when we submit the form in console.log
//Now to communicate back to redux form whether or not these values are valid or not we have to return an object from this validate function.

function validate(values) {
  //if we return an empty errors object redux will assume there are no errors
  const errors = {};
  ////////////////////
  // using if condition to check the errors individually
  // if (!values.title) {
  //   //if any of the errors on this object like the error title or error property name  matches up with one of the fields that we are attempting to render. we have a name title here and we're passing that to the field with the name "name" right here. Then redux form will automatically take the error that we set in there and pass it as a prop to our custom field component.
  //   //And because the error that we set on our error object is title redux form will automatically connect the dots and pass this error message to just the instance of the field that is controlling the property or the input that's controlling the name.
  //   errors.title = "You must provide a title";
  // }
  ////////////////////Dynamically checking Errors
  //Email Validation
  // if any emails are invalid we set the errors object with a returned message from validateEmails
  //when our application first boots up ,when this form is first built by redux form, The validation automatically runs one time. And so right now we're attempting to validate emails on an empty string or something undefined because we have not yet provided any value in here whatsoever. So we're going to make sure that if no emails have been entered then we will instead provide an empty string to the validateEmails function(without the empty string there will be a crash in the console window) and they'll get that little crash to go away.
  errors.recipients = validateEmails(values.recipients || "");
  // we first check if the email is valid, and then do empty check because if we keep validate function below validate email error will be overwritten by empty check
  // Form Empty check validation
  // using lodash to iterate the field's object
  //use the loadash library to iterate over that field's object. Now the each loop works very similarly to the map. So for every field inside of the fields array we're going to run this arrow function, the object or the fields from the fields array will be passed in and we can reference the name property on there to look at the Values object.
  _.each(formFields, (field) => {
    // we use square braces to reference an object on the fly figure out what value of property name we are trying to look at using the ky of object
    if (!values[field.name]) {
      errors[field.name] = "You must provide a value";
    }
  });

  return errors;
}
//Rather than taking a couple of different arguments it only takes one single argument that contains a couple of different options
// The redux form helper only requires one option to be passed inside this object and that property or that option is called form
// If we pass in a function under the key validate that function will be automatically ran Any time the user attempts to submit the form and so we can use that as function to validate the different inputs so the user has added and provide feedback to the user
//destroyOnUnmount:false- the form values will not be dumped when the submit button is clicked, by default this value will be true and on submit button click the form values will be deleted
export default reduxForm({
  validate: validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
