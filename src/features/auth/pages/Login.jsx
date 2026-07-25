
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFireBase } from "../../../shared/context/FireBaseContext";
import { Alert, Button } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const { loginWithEmailPassword } = useFireBase()
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = email.trim();

    // Validation
    if (!userEmail || !password) {
      setMessage("Please fill all fields.");
      setType("danger")
      return;
    }

    if (password.length < 8) {
      setMessage("Password should be at least 8 characters.");
      setType("danger")
      return;
    }

    try {
      const result = await loginWithEmailPassword(email, password);
      setType("info")
      setMessage("User Login successfully!");
      localStorage.setItem("loggedInUser", true)
      setEmail("");
      setPassword("");
      setErrorMessage("")
      navigate("/")
    } catch (error) {
      setType("danger");
      const errorCode =error?.response?.data?.error?.message || error?.message;  
      setMessage("Invalid Credentials");
    }
  };

  const customCss = {
    marginLeft: '38%', maxWidth: '80%', fontSize: '12px', fontFamily: 'Segoe UI', color: '#f5222d', textAlign: 'left'
  }

  return (
    <>
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="card shadow p-4" style={{ width: "400px" }}>
          <h2 className="text-center mb-4">Login</h2>

          {/* {message && (
            <Alert variant={type}>
              {message}
            </Alert>
          )} */}
            {message && (
            <div className={`alert alert-${type}`} role="alert">
              {message}
            </div>
          )}

          <form>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="enter your email" aria-describedby="emailHelp" value={email}
                onChange={(e) => setEmail(e.target.value)} id="email"
                autoComplete="off" />
            </div>


            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" value={password} placeholder="enter your password"
                onChange={(e) => setPassword(e.target.value)} id="password"
                autoComplete="off" />
            </div>
            <Button
              variant="success"
              className="w-100"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </form>

          <div className="text-center mt-3">
            <small>
              Go To{" "}
              <Link to="/register-user">Register</Link>
            </small>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;