import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import {connect} from 'react-redux';
import * as actions from '../actions';
class Payments extends Component {
  render() {
    //   debugger;
    return (
      // configuration items are passed as props
      <StripeCheckout 
      // description for the stripe payment modal
      name="Emaily"
      description="$5 for 5 email credits"
      //the currency must be set in stripe, amount is in cents
      //500 cents = 5 dollars
      amount={500} 
      //token is expecting to receive a callback function,
      //and that callback function will be called after we have successfully retrieved an authorization token from the stripe api
      token={token=>
        // console.log("payment.js --token",token)
       this.props.handleToken(token)      
      }
      //api key - publishable key defined in .env files
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
     >
       <button className="btn">Add Credits</button>
       </StripeCheckout>
    );
  }
}
// we don't have any mapstatetoprops so we pass null, but we need the action creators so we pass the action
export default connect(null,actions)(Payments);