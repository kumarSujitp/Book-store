
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFireBase } from "../../../shared/context/FireBaseContext";

const CreateBookLists = () => {
  const [bookName, setBookName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("")
  const [price, setPrice] = useState("")
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

//   const fireBaseHook = useFireBase();
  const {createBookStore} = useFireBase()
  const navigate=useNavigate()

  const createBooklists = async () => {
  try {
    console.log("Creating book...");
    if(!bookName || !isbnNumber || !price){
      setType("danger")
      setMessage("Please fill required fields!")
      return;
    }

    await createBookStore(bookName, isbnNumber, price);

    console.log("Navigating...");
    navigate("/");
  } catch (err) {
    console.error(err);
  }
};



  return (
    <>
      <div className="container-fliud vh-100 d-flex justify-content-center align-items-center">
        <div className="card shadow p-4" style={{ width: "400px" }}>
          <h2 className="text-center mb-4">Book Listing</h2>

          {message && (
            <div className={`alert alert-${type}`} role="alert">
              {message}
            </div>
          )}

          <form>
            <div className="mb-3">
              <label for="book" className="form-label">Book Name :</label>
              <input type="text" className="form-control" placeholder="Enter your Book name"  aria-describedby="emailHelp" value={bookName} required
                onChange={(e) => setBookName(e.target.value)} id="bookName"
                 autoComplete="off" />

            </div>
            <div className="mb-3">
              <label for="isbn" className="form-label">ISBN Number</label>
              <input type="number" className="form-control"  value={isbnNumber} placeholder="enter your ISBN Number" required
                onChange={(e) => setIsbnNumber(e.target.value)} id="isbn"
             autoComplete="off" />
            </div>
            <div className="mb-3">
              <label for="isbn" className="form-label">Price</label>
              <input type="number" className="form-control"  value={price} placeholder="Enter Price" required
                onChange={(e) => setPrice(e.target.value)} id="price"
             autoComplete="off" />
            </div>
            <button
              type="button"
              className="btn btn-success w-100"
              onClick={createBooklists}
            >
              Submit
            </button>
          </form>

         
        </div>
      </div>
    </>
  )
}

export default CreateBookLists;