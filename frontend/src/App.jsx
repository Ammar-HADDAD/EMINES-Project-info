import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Dashboard from "./Components/dashboard";
import Produit from "./Components/Produit";
import Navbar from "./Components/navbar";
import Nomenclature from "./Components/Nomenclature";
import Stock from "./Components/Stock";
import Operation from "./Components/Operation";
import Ordre from "./Components/OrdreDeFabrication";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {window.location.pathname !== "/" &&
        window.location.pathname !== "/signup" && <Navbar />}

      <div className="container">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/produit" element={<Produit />} />
          <Route path="/nomenclature" element={<Nomenclature />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/operation" element={<Operation />} />
          <Route path="/ordre" element={<Ordre />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
