import React, { useState } from "react";

function Login() {
  return (
    <div className="login-page">
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <br />
        <input type="password" placeholder="Password" />
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
export default Login;
