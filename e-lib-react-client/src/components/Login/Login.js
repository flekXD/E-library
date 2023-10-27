import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import {Link} from "react-router-dom"
import log from "./log";
import {useDispatch} from "react-redux";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(log(email, password));
    setEmail('');
    setPassword('');
  };

  const styles = {
    formContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh", // Center vertically
    },
    form: {
      backgroundColor: "white",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      width: "300px",
    },
    button: {
      backgroundColor: "blue",
      margin: '5px',
      alignItems: "center",
    },
    input: {
        margin: '5px'
      },
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.form}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            style={styles.input}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            style={styles.input}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" style={styles.button} fullWidth>
            Login
          </Button>
          <Link to={`/register`}><Button type="button"  >Registration</Button></Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
