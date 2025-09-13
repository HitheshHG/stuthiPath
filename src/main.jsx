import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="873386809834-9il34dn9is4pduoth5r8tvc83mtoi903.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>
)

