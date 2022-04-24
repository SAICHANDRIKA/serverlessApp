import React from "react";
import Form from "./components/Form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Products from "./components/Products";
import TrackOrderStatus from "./components/TrackOrderStatus";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/products" element={<Products />} />
        <Route path="/trackorder" element={<TrackOrderStatus />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
