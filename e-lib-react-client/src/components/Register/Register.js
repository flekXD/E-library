import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const Registrer = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async  (event) => {
    event.preventDefault();

    if (password === passwordConfirm) {
      setNickname("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    } else {
      alert("Password and password confirmation do not match");
    }
    try {
    await axios.post('http://localhost:5000/user/add', {
        nickname: nickname,
        email: email,
        password : password,
      });

      setNickname('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
    } catch (error) {
        console.error('Error posting data:', error);
      }
      navigate("/");
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
      margin: "5px",
      alignItems: "center",
    },
    input: {
      margin: "5px",
    },
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.form}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nickname"
            value={nickname}
            style={styles.input}
            onChange={(event) => setNickname(event.target.value)}
            fullWidth
          />
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
          <TextField
            label="Confirm Password"
            type="password"
            value={passwordConfirm}
            style={styles.input}
            onChange={(event) => setPasswordConfirm(event.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" style={styles.button} fullWidth>
            Register
          </Button>
          <Link to="/login">
            <Button type="button">Login</Button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Registrer;
