import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import "./index.css";

import ScrollToTop from "./components/ScrollToTop";

import { AuthProvider } from "./context/AuthContext";
createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >
      
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <App /> 
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>

  
);