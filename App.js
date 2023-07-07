import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./Login.css"; 

const AppLayout = () => {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("test");

  const sendCredentialsRequest = () => {
    const user = {
      username: username,
      password: password,
    };
    //Fetch api
    fetch("http://localhost:8080/credentials", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response
            .text()
            .then((data) => {
              console.log(data); // Log the received data
              // Process the successful response data here
              alert(data);
            })
            .catch((error) => {
              console.error("Error parsing response as JSON:", error);
              throw error; // Re-throw the error to reach the catch block
            });
        } else {
          return response
            .text() // Retrieve the response body as text
            .then((errorResponse) => {
              console.log(errorResponse); // Log the error response
              alert(errorResponse);
              return Promise.reject(errorResponse);
            })
            .catch((error) => {
              console.error("Error parsing error response as text:", error);
            });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div>
      <div className="login-container">
        <div className="">
          <label>Username: </label>
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
        </div>
        <div>
          <label>Password: </label>
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
        </div>
        <div>
          <button
            onClick={() => {
              sendCredentialsRequest();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
const routeConfiguration = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
  },
]);

const reactDom = ReactDOM.createRoot(document.getElementById("root"));
reactDom.render(<RouterProvider router={routeConfiguration} />);
