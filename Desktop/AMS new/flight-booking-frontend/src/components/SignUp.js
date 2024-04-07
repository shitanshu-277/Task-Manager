import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Button, Alert, Card, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

import * as actions from "../actions";
import CustomInput from "./CustomInput";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  redirect() {
    if (this.props.flight.hasOwnProperty("_id")) {
      this.props.history.push("/book");
    } else this.props.history.push("/");
  }

  handleSignIn = () => {
    this.props.history.push("/signin");
  };

  async onSubmit(formData) {
    console.log(formData);
    const res = await this.props.validateSignUp(formData);
    console.log(res);
    if (res) {
      await this.props.signUp(formData);
    }
    if (!this.props.errorMessage) {
      this.redirect();
    }
  }

  async responseFacebook(response) {
    console.log(response);
    console.log(this.props.flight);
    await this.props.oauthFacebook(response.accessToken);
    if (!this.props.errorMessage) {
      this.redirect();
    }
  }

  async responseGoogle(response) {
    console.log(response);
    await this.props.oauthGoogle(response.accessToken);
    if (!this.props.errorMessage) {
      this.redirect();
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row" style={{margin: "4% 34%",width: "300px"}}>
          <Card>
          <b style={{textAlign:'center',fontSize:'30px'}}>SignUp</b>
            <Card.Body>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                  <Field
                    name="email"
                    type="email"
                    id="email"
                    label="Email address"
                    placeholder="Enter email"
                    required
                    component={CustomInput}
                  ></Field>
                </fieldset>
                <fieldset>
                  <Field
                    name="password1"
                    type="password"
                    id="password1"
                    label="Password"
                    placeholder="Password"
                    required
                    component={CustomInput}
                  ></Field>
                </fieldset>
                <fieldset>
                  <Field
                    name="password2"
                    type="password"
                    id="password2"
                    label="Confirm Password"
                    placeholder="Password"
                    required
                    component={CustomInput}
                  ></Field>
                </fieldset>
                {this.props.errorMessage ? (
                  <Alert variant="danger">{this.props.errorMessage} </Alert>
                ) : null}
                <Button variant="dark" type="submit" style={{marginTop: "10px",width: "243px"}}>
                  Sign Up
                </Button>
                <span style={{fontSize:"12px",textAlign:"right",display:"flex",justifyContent:"flex-end",marginTop:"10px"}}><p>Already Registered</p><a href="#" onClick={this.handleSignIn} style={{textDecoration: "none"}}>Login?</a></span>
              </form>
            </Card.Body>
          </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
    flight: state.flight.flight,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signup" })
)(SignUp);
