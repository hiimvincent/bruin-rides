import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useContext, createContext, useEffect, useHistory, Redirect } from "react"; 

import Home from "./components/Home";
import Search from "./components/Search";
import AddRide from "./components/AddRide";
import RouteHeader from "./components/RouteHeader";
import ViewRide from "./components/ViewRide";


const RenderedWebpage = () => {
    return (
        <div>
            <Router>
                <RouteHeader/>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/add" element={<AddRide />} />
                    <Route path="/view" element={<ViewRide />} />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </Router>
        </div>
    )
}

export default RenderedWebpage;