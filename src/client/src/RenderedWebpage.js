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
import Account from "./components/Account";
import EditAccount from "./components/EditAccount";

//Rerturn webpage as route header and page body, with endpoints further protected under RequireAuth component
const RenderedWebpage = () => {
    return (
        <div>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route element={<RouteHeader />}>
                            <Route exact path="/about" element={<Home />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route element={<RequireAuth />}>
                                <Route path="/account" element={<Account />} />
                                <Route path="/add" element={<AddRide />} />
                                <Route path="/view" element={<ViewRide />} />
                                <Route path="/edit" element={<EditAccount />} />
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