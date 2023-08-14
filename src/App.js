import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Main from "Layouts/Main/Main";
import AdminLayout from "Layouts/admin";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./views/auth/SignIn";
import AnalyseData from "Components/config/Analyse";
import ImportData from "Components/config/Import_data";
import SmsPanel from "Components/config/SmsPanel";
import Layout from "Layouts/Layout";
import Users from "Components/Users/Users";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        closeOnClick
        rtl={true}
        autoClose={3000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<SignIn />} />
          <Route element={<Layout />} >
          <Route path="main/*" element={<Main />} />
          <Route path="/users" element={<Users />} />
          <Route path="/analyse" element={<AnalyseData />} />
          <Route path="/importData" element={<ImportData />} />
          <Route path="/smsPanel" element={<SmsPanel />} />
          <Route path="admin/*" element={<AdminLayout />} />
          </Route>
      </Routes>
    </>
  );
};

export default App;
