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
                            <Route exact path="/" element={<Home />} />
                            <Route element={<RequireAuth />}>
                                <Route path="/search" element={<Search />} />
                            </Route>
                            <Route path="/add" element={<AddRide />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/view" element={<ViewRide />} />
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </Route>
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    )
}

export default RenderedWebpage;