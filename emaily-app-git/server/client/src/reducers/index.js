import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
export default combineReducers({
  // auth piece of state is managed by authReducer
  auth: authReducer,
  //redux form has to be assigned to a very special key because redux form is going to assume that the value is being produced by this reducer, that key is very appropriately named as form.(don't change the key name always must be form)
  //    we assign the redux form reducer to the key of form because that is where redux form assumes all of its state or all of its data is going to be living
  form: reduxForm,
});
