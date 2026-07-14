import logo from './logo.svg';
import './App.css';
import RegisterUser from './features/auth/pages/RegisterUser';
import { BrowserRouter as Router } from "react-router-dom";
import BookListing from './features/book/pages/BookListing';
import Home from './features/auth/pages/Home';
import Header from './app/layout/Header';


function App() {
  return (
    <Router>
      <div className="App">
        {/* <RegisterUser />
         */}
         {/* <BookListing/> */}
         <Header/>
         <Home/>
      </div>
    </Router>

  );
}

export default App;
