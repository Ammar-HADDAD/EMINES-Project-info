import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Dashboard from "./Components/dashboard";
import Produit from "./Components/Produit";
import Navbar from "./Components/navbar";
import Nomenclature from "./Components/Nomenclature";
import Stock from "./Components/Stock";
import Operation from "./Components/Operation";

function main() {
  return (

    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
    </Routes>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/produit" Component={Produit} />
          <Route path="/nomenclature" Component={Nomenclature} />
          <Route path="/stock" Component={Stock} />
          <Route path="/operation" Component={Operation} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default main;
