
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from './app/layout/Header';
import CreateBookLists from './features/book/pages/CreateBookLists';
import LogOut from './features/auth/pages/LogOut';
import HomePage from './features/auth/pages/HomePage';
import PublicRoute from './app/routes/PublicRoute';
import PrivateRoute from './app/routes/PrivateRoute';
import Login from './features/auth/pages/Login';
import RegisterUser from './features/auth/pages/RegisterUser';
import { useEffect, useState } from 'react';
import { useFireBase } from './shared/context/FireBaseContext';



function App() {
const {user}=useFireBase()

    console.log('rrrrrrrrrrrrrrrr',user)

    return (
        <Router>
            {user && <Header />}
            <Routes>

                <Route
                    path="/UserLogin"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register-user"
                    element={
                        <PublicRoute>
                            <RegisterUser />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/create-book-list"
                    element={
                        <PrivateRoute>
                            <CreateBookLists />
                        </PrivateRoute>
                    }
                />

            </Routes>


        </Router>

    );
}

export default App;
