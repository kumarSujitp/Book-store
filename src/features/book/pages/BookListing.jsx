
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFireBase } from "../../../shared/context/FireBaseContext";

const BookListing = () => {
  const [bookName, setBookName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("")
  const [price, setPrice] = useState("")
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

//   const fireBaseHook = useFireBase();
  const { createUserUsingEmailPassword ,data,createBookStore} = useFireBase()
  console.log('@@@@@@@@@@@@@@@@@@',useFireBase())

  const createBooklists=async()=>{
    await createBookStore(bookName,isbnNumber,price)
  }



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
              <input type="text" className="form-control" placeholder="Enter your Book name"  aria-describedby="emailHelp" value={bookName}
                onChange={(e) => setBookName(e.target.value)} id="bookName"
                 autoComplete="off" />

            </div>
            <div className="mb-3">
              <label for="isbn" className="form-label">ISBN Number</label>
              <input type="number" className="form-control"  value={isbnNumber} placeholder="enter your ISBN Number"
                onChange={(e) => setIsbnNumber(e.target.value)} id="isbn"
             autoComplete="off" />
            </div>
            <div className="mb-3">
              <label for="isbn" className="form-label">Price</label>
              <input type="number" className="form-control"  value={price} placeholder="Enter Price"
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

export default BookListing;