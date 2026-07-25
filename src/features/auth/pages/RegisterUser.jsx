
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
  const [errorMessage, setErrorMessage] = useState("")


  const { createUserUsingEmailPassword, updateUserProfile, saveUserToFirestore } = useFireBase();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    // Trim values
    const firstName = fName.trim();
    const lName = lastName.trim();
    const userEmail = email.trim();

    // Validation
    if (!firstName || !lName || !userEmail || !password || !confirmPassword) {
      setMessage("Please fill all fields.");
      setType("danger");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setType("danger");

      return;
    }

    if (password.length < 8) {
      setMessage("Password should be at least 8 characters.");
      setType("danger");

      return;
    }

    try {
      const result = await createUserUsingEmailPassword(email, password);

      await updateUserProfile(result.user, fName, lastName);

      await saveUserToFirestore(result.user, fName, lastName);

      setMessage("User created successfully!");

      setFName("");
      setlastName("");
      setEmail("");
      setPassword("");
      setconfirmPassword("");
    }
    catch (error) {
      setType("danger");

      const errorCode = error?.response?.data?.error?.message || error?.message;
      if(errorCode==='EMAIL_EXISTS'){
          setMessage("Email already exists.");
      }

      switch (errorCode==='EMAIL_EXISTS') {
        case "EMAIL_EXISTS":
          break;

        case "INVALID_EMAIL":
          setMessage("Invalid email address.");
          break;

        case "WEAK_PASSWORD":
          setMessage("Password is too weak.");
          break;

        default:
          setMessage(errorCode || "Something went wrong.");
      }
    }
  };

  return (
    <>
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="card shadow p-4" style={{ width: "572px" }}>
          <h2 className="text-center mb-4">SignUp Here</h2>

          {message && (
            <div className={`alert alert-${type}`} role="alert">
              {message}
            </div>
          )}

          <form>
            <div className="mb-3">
              <Button variant="success" className="w-100">
                Sign In with Google
              </Button>
            </div>

            <div className="row mb-3 align-items-center">
              <label htmlFor="fName" className="col-sm-3 col-form-label">
                First Name
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="fName"
                  placeholder="Enter your first name"
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label htmlFor="lName" className="col-sm-3 col-form-label">
                Last Name
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="lName"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label htmlFor="email" className="col-sm-3 col-form-label">
                Email
              </label>
              <div className="col-sm-9">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label htmlFor="password" className="col-sm-3 col-form-label">
                Password
              </label>
              <div className="col-sm-9">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label htmlFor="confirmPass" className="col-sm-3 col-form-label">
                Confirm Password
              </label>
              <div className="col-sm-9">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPass"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </div>
            </div>


            <Button variant="success" className="w-100" onClick={handleSubmit}>
              Register
            </Button>
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