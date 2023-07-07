import { useState, useEffect } from "react";
import Success from "./Success";

const Login = () => {
    const [username, setUsername] = useState("user");
    const [password, setPassword] = useState("test");
  
    
    validateDetails = async () => {
      const user = {
          'username':username,'password':password
      };
      // POST request using fetch with async/await
      const requestOptions = {
          method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body:  JSON.stringify(user)
      };
      const response = await fetch('https://localhost:8080/credentials', requestOptions);
      const data = await response.json();
      console.log(data);
      // this.setState({ postId: data.id });
  }
    return (
      <div className="login">
        <div className="form">
          <form noValidate>
            <span>Login</span>
  
            <input
              type="username"
              name="username"
              placeholder="Enter username"
              id="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
  
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              id="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
  
            <button
              onClick={() => {
                  validateDetails();
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
};

export default Login;
