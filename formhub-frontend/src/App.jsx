import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import FormsList from "./pages/FormsList";
import FormBuilder from "./pages/FormBuilder";
import SubmissionsList from "./pages/SubmissionsList";
import PrivateRoute from "./components/PrivateRoute";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <FormsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/builder/:id?"
          element={
            <PrivateRoute>
              <FormBuilder />
            </PrivateRoute>
          }
        />
        <Route
          path="/submissions/:id"
          element={
            <PrivateRoute>
              <SubmissionsList />
            </PrivateRoute>
          }
        />


        <Route path="/forms/:formId/submissions" element={<SubmissionsList />} />
      </Routes>



    </BrowserRouter>
  );
}
