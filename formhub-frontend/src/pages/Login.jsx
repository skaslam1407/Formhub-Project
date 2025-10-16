import React, { useState } from "react";
import API from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "/auth/register" : "/auth/login";
    const { data } = await API.post(endpoint, { email, password });
    localStorage.setItem("token", data.token);
    window.location.href = "/";
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>{isRegister ? "Register" : "Login"}</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {isRegister ? "Register" : "Login"}
        </button>
        <p>
          {isRegister ? "Have an account?" : "New user?"}{" "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </form>
    </div>
  );
}
