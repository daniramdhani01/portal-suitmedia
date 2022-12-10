import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MasterLayout from "../../layout/MasterLayout";
import Ideas from "../../pages/Ideas";

function index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MasterLayout />}>
          <Route path="/ideas" index element={<Ideas />} />
          <Route path="/work" element={<div className="text-center my-5">This is work page</div>} />
          <Route path="/about" element={<div className="text-center my-5">This is about page</div>} />
          <Route path="/services" element={<div className="text-center my-5">This is services page</div>} />
          <Route path="/careers" element={<div className="text-center my-5">This is career page</div>} />
          <Route path="/contact" element={<div className="text-center my-5">This is contact page</div>} />
          <Route path="/*" element={<Navigate to={"/ideas"} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default index;
