import React,{Component} from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Landing from './Landing';
import {connect} from 'react-redux';
import * as actions from '../actions';
class App extends Component {
  componentDidMount(){
    // fetchUSer is the action created in \actions\index.js
    this.props.fetchUser();
  }
  surveysPage=()=>{
    return(
      <h2>Surveys Page</h2>
    )
  }
  render() {
    return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Route path="/" exact  component={Landing}/>
        <Route path="/surveys" exact component={this.surveysPage}/>
      </div>
    </BrowserRouter>
    )
  }
}
//connect uses two arguments
//-first is for mapStateToProps,second is all the action creators
//-once all this action are passed, they are assigned as props 
export default connect(null,actions)(App);
