import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar3 from "./Components/Navbar3";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import Display from "./Components/Display";
import axios from "axios";
import PaymentPage from "./Components/Payment";
import PaymentDetails from "./Components/PaymentDetails";
import ForgetPassword from "./Components/Forgetpassword";
import Sidebar from "./Components/Sidebar";
import Table from "./Components/Table";
import UpdateUsername from "./Components/Usernameupdate";
import Dashboard from "./Components/Dashboard";
import CalendarComponent from "./Components/Calendar";
import Map from "./Components/Map";
const App = () => {
  const [back, setback] = useState("");
  const [click, setClick] = useState(false);

  const useAuth = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
  };
 
  const getbgurl = async () => {
    const userId=localStorage.getItem("userId")
   
    const response = await axios.post("http://localhost:3030/auth/getbgurl", {
    userId
    });
    setback(response.data.bgurl)
    console.log(response.data)
    // alert("meh hu dpppn")
  };
useEffect(()=>{
getbgurl()
},[back])

  return (
    <Router>

      <Navbar click={click} setClick={setClick } setback={setback} />
      <div style={{backgroundImage: `url(${back})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",height:"90vh"}}>
      <Routes>
        <Route path="/login" element={<Login setClick={setClick} />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Display />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/paymentdetails" element={<PaymentDetails />} />
          <Route path="/resetpassword" element={<ForgetPassword />} />
          <Route path="/updateusername" element={<UpdateUsername />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/table" element={<Table />} />
          <Route path="/calendar" element={<CalendarComponent />} />
          <Route path="/map" element={<Map />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
