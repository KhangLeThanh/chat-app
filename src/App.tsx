import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { Login, SignUp, NewThreadsForm, Threads } from "./views/index";
import ProtectedRoutes from "./RoutesComponent/ProtectedRoutes/ProtectedRoutes";
import PublicRoutes from "./RoutesComponent/PublicRoutes/PublicRoutes";

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" element={<Threads />} />
            <Route path="threads" element={<Threads />} />
            <Route path="/add-new-thread" element={<NewThreadsForm />} />
        </Route>
        <Route path="/" element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Route>
      </Routes>
    </>
  );
}
