import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
class App extends Component {
  componentDidMount() {
    // fetchUSer is the action created in \actions\index.js
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route path="/" exact component={Landing} />
          <Route path="/surveys" exact component={Dashboard} />
          <Route path="/surveys/new" exact component={SurveyNew} />
        </div>
      </BrowserRouter>
    );
  }
}
//connect uses two arguments
//-first is for mapStateToProps,second is all the action creators
//-once all this action are passed, they are assigned as props
export default connect(null, actions)(App);
