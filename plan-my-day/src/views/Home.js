import React, { Fragment } from "react";


class Home extends React.Component {
  state = {
    currentUser: localStorage.getItem("currentUser"),
    currentEmail: localStorage.getItem("currentUserEmail"),
    currentUserID: localStorage.getItem("currentUserID"),
    admin: localStorage.getItem('currentUserAdmin')
  }
  render() {
    console.log(this.state.currentUser)
    if (this.state.currentUser) {
      return (
        <div>
          <h1>Home</h1>
          <p>Hello, {this.state.currentUser}.</p>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Please Login</h1>
        </div>
      )

    }

  }

}

export default Home;
