
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFireBase } from "../../../shared/context/FireBaseContext";
import { Alert, Button } from "react-bootstrap";

const RegisterUser = () => {
  const [fName, setFName] = useState("")
  const [lastName, setlastName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [errorMessage,setErrorMessage]=useState("")


  const { createUserUsingEmailPassword, updateUserProfile, saveUserToFirestore } = useFireBase()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Trim values
    const firstName = fName.trim();
    const lastName = lastName.trim();
    const userEmail = email.trim();

    // Validation
    if (!firstName || !lastName || !userEmail || !password || !confirmPassword) {
      Alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password should be at least 8 characters.");
      return;
    }

    try {
      const result = await createUserUsingEmailPassword(email, password);

      await updateUserProfile(result.user, fName, lastName);

      await saveUserToFirestore(result.user, fName, lastName);

      Alert("User created successfully!");

      setFName("");
      setlastName("");
      setEmail("");
      setPassword("");
      setconfirmPassword("");
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
          <h2 className="text-center mb-4">SignUp Here</h2>

          {message && (
            <div className={`alert alert-${type}`} role="alert">
              {message}
            </div>
          )}

          <form>
            <div className="mb-3">
              <Button>Sign In with Google</Button>
            </div>

            <div className="mb-3">
              <label for="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" placeholder="enter your first name" aria-describedby="fnameHelp" value={fName}
                onChange={(e) => setFName(e.target.value)} id="fName"
                autoComplete="off" />
                {errorMessage && <h6 className='customCss' style={customCss}>{errorMessage}</h6>}

            </div>

            <div className="mb-3">
              <label for="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control" placeholder="enter your last name" aria-describedby="lnameHelp" value={lastName}
                onChange={(e) => setlastName(e.target.value)} id="lName"
                autoComplete="off" />
                          {errorMessage && <h6 className='customCss' style={customCss}>{errorMessage}</h6>}

            </div>

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

            <div className="mb-3">
              <label for="confirmPass" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)} id="confirmPass"
                autoComplete="off" />
                          {errorMessage && <h6 className='customCss' style={customCss}>{errorMessage}</h6>}

            </div>

            <Button variant="success" onClick={handleSubmit}>Register</Button>

          </form>

          <div className="text-center mt-3">
            <small>
              Go To{" "}
              <Link to="/Userlogin">Login</Link>
            </small>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterUser;