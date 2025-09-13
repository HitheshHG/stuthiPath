import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import About from "../pages/About";
import Home from "../pages/Home";

function ExternalRedirect({ to }) {
  window.location.href = to;
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/developer"
          element={<ExternalRedirect to="https://portfolio-chi-ashen-w6kjxvbkhd.vercel.app/" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
