import React, { Component } from "react";
import "./Auth.css";
import AuthContext from "../context/auth-context";
class AuthPage extends Component {
  state = {
    isLogin: true,
  };
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }
  switchModeHandler = () => {
    this.setState((prevState) => {
      return { isLogin: !prevState.isLogin };
    });
  };
  submitHandler = (event) => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
      query{
        login(email:"${email}",password:"${password}"){
          email
        }
      }
      `,
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
        mutation{
          createUser(userInput:{email:"${email}",password:"${password}"}){
            _id
            email
          }
        }
        `,
      };
    }

    fetch("https://nbbackend.onrender.com/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.data.login.email) {
          this.context.login(resData.data.login.email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <>
        <form className="auth-form" onSubmit={this.submitHandler}>
          <div className="form-control">
            <label htmlFor="email">E-Mail</label>
            <input type="email" id="email" ref={this.emailEl} />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={this.passwordEl} />
          </div>
          <div className="form-actions">
            <button type="Submit">Submit</button>
            <button type="button" onClick={this.switchModeHandler}>
              Switch to {this.state.isLogin ? "Signup" : "Login"}
            </button>
          </div>
        </form>
      </>
    );
  }
}
export default AuthPage;
