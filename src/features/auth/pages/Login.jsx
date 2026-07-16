
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFireBase } from "../../../shared/context/FireBaseContext";
import { Alert, Button } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [errorMessage,setErrorMessage]=useState("")

  const { loginWithEmailPassword } = useFireBase()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = email.trim();

    // Validation
    if (!userEmail || !password) {
        setErrorMessage("Please fill all fields.");
      return;
    }

    if (password.length < 8) {
        setErrorMessage("Password should be at least 8 characters.");
      return;
    }

    try {
      const result = await loginWithEmailPassword(email, password);

      Alert("User Login successfully!");
      setEmail("");
      setPassword("");
      setErrorMessage("")
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
            setErrorMessage("Email already exists.");
          break;

        case "auth/invalid-email":
            setErrorMessage("Invalid email address.");
          break;

        case "auth/weak-password":
            setErrorMessage("Password is too weak.");
          break;

        default:
            setErrorMessage(error.message);
      }
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

          {message && (
            <div className={`alert alert-${type}`} role="alert">
              {message}
            </div>
          )}

                  <form>
                      <div className="mb-3">
                          <label for="exampleInputEmail1" className="form-label">Email address</label>
                          <input type="email" className="form-control" placeholder="enter your email" aria-describedby="emailHelp" value={email}
                              onChange={(e) => setEmail(e.target.value)} id="email"
                              autoComplete="off" />
                          {errorMessage && <h6 className='customCss' style={customCss}>{errorMessage}</h6>}
                      </div>


                      <div className="mb-3">
                          <label for="exampleInputPassword1" className="form-label">Password</label>
                          <input type="password" className="form-control" value={password}
                              onChange={(e) => setPassword(e.target.value)} id="password"
                              autoComplete="off" />
                          {errorMessage && <h6 className='customCss' style={customCss}>{errorMessage}</h6>}
                      </div>
                      <Button variant="success" onClick={handleSubmit}>Login</Button>
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