import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useContext, createContext, useEffect, useHistory, Redirect } from "react"; 

import Home from "./components/Home";
import Search from "./components/Search";
import AddRide from "./components/AddRide";
import RouteHeader from "./components/RouteHeader";
import ViewRide from "./components/ViewRide";
import Login from "./components/Login";
import { AuthProvider, RequireAuth } from "./Auth";
import SignUp from "./components/SignUp";


const RenderedWebpage = () => {
    return (
        <div>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route element={<RouteHeader />}>
                            <Route exact path="/about" element={<Home />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/add" element={<AddRide />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route element={<RequireAuth />}>
                                <Route path="/view" element={<ViewRide />} />
                            </Route>
                            <Route
                                path="*"
                                element={<Navigate to="/search" replace />}
                            />
                        </Route>
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    )
}

export default RenderedWebpage;