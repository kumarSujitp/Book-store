
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFireBase } from "../../../shared/context/FireBaseContext";

const RegisterUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

//   const fireBaseHook = useFireBase();
  const { createUserUsingEmailPassword ,data} = useFireBase()
  console.log('@@@@@@@@@@@@@@@@@@',data)


  const registerUser = async () => {
    try {
      const user = await createUserUsingEmailPassword(email, password);
      setType("success")
      setMessage("User Created Successfully")
      console.log('user created')
      setPassword('')
      setEmail('')
      setTimeout(() => {
        setMessage("");
      }, 1000);
    } catch (error) {
      setType("danger")

      switch (error.code) {
        case "auth/email-already-in-use":
          setMessage("Email already exists");
          break;
        case "auth/weak-password":
          setMessage("Password should be at least 8 characters");
          break;
        case "auth/invalid-email":
          setMessage("Invalid email");
          break;
        default:
          setMessage(error.message);
      }
      setTimeout(() => {
        setMessage("");
      }, 1000);
    }
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
              <label for="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" placeholder="enter your email" id="exampleInputEmail1" aria-describedby="emailHelp" value={email}
                onChange={(e) => setEmail(e.target.value)} id="email"
                type="email" autoComplete="off" />

            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" value={password}
                onChange={(e) => setPassword(e.target.value)} id="password"
                type="password" autoComplete="off" />
            </div>
            <button
              type="button"
              className="btn btn-success w-100"
              onClick={registerUser}
            >
              Register
            </button>
          </form>

          <div className="text-center mt-3">
            <small>
              Go To{" "}
              <Link to="/">Login</Link>
            </small>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterUser;