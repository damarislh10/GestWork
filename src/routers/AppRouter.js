import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Login } from "../components/Login";
import { DashboardRoutes } from "./DashboardRoutes";
import PrivateRoute from "../routers/PrivateRoute";
import PublicRoute from "../routers/PublicRoute";
import { useEffect, useState } from "react";
import LandingPage from '../components/Landing/LandingPage'
import { Spinner } from "../components/accesories/Spinner";
import { Register } from "../components/Register/Register";

function AppRouter() {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setId(user.uid);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, []);

  if (checking) {
    return <Spinner />;
  }
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/landing" element={
      
      <PublicRoute>

      <LandingPage/>
      </PublicRoute>
      }
      />
        <Route
          path="/login"
          element={
            <PublicRoute isAuthenticated={isLoggedIn}>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute isAuthenticated={isLoggedIn}>
              <Register/>
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute isAuthenticated={isLoggedIn}>
              <DashboardRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
