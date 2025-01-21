import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

export const Context = createContext();
const App = () => {
  const [globalEmail, setGlobalEmail] = useState("");
  return (
    <Context.Provider value={[globalEmail, setGlobalEmail]}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/home/:email" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </Context.Provider>
  );
};

export default App;
