import React, { useState } from 'react';

function LoginPage() {
  const [userN, userName] = useState('');
  const [userP, userPassword] = useState('');

  // This will show an error message (login fails)
  const [error, giveError] = useState(null);

  // This will change when the user logs in can be 'NO' or 'YES'
  const [isLoggedin, loginOccur] = useState('NO'); 

  // This runs when submitted
  function loginFun(event) {
    event.preventDefault(); // Stop the page from reloading

    // Check if the username and password are correct
    switch (true) {
      case userN === 'Diego' && userP === 'Diego12':
        loginOccur('YES'); // Mark user as logged in
        giveError(null); // Clear error messages
        break;
        case userN === 'Mitchell' && userP === 'Mitchell13':
        loginOccur('YES');
        giveError(null);
        break;
        case userN === 'Onel' && userP === 'Onel14':
        loginOccur('YES');
        giveError(null);
        break;
        case userN === 'Ian' && userP === 'Ian15':
        loginOccur('YES');
        giveError(null);
        break;
        case userN === 'Hobson' && userP === 'Hobson16':
        loginOccur('YES');
        giveError(null);
        break;
        case userN === 'Hassan' && userP === 'Hassan17':
        loginOccur('YES'); 
        giveError(null);
        break;
    

      default:
        giveError('Invalid username or password');
        loginOccur('NO');
        break;
    }
  }

  // Show logged in
  switch (isLoggedin) {
    case 'YES':
      return (
        <div>
          <h1>User page of {userN}</h1>
          <p>You are logged in</p>
        </div>
      );

    // Show not logged in
    default:
      return (
        <div className="login-page">
          <h1>Login</h1>
          {error && <div style={{ color: 'red' }}>{error}</div>}

          {/* Login form */}
          <form onSubmit={loginFun}>
            <input
              type="text"
              placeholder="Username"
              value={userN}
              onChange={e => userName(e.target.value)} // Save what the user types
              required
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={userP}
              onChange={e => userPassword(e.target.value)} // Save password input
              required
            />
            <br />
            <button type="submit">Log In</button>
          </form>
        </div>
      );
  }
}
export default LoginPage;